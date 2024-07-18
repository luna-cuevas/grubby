import {
  AiStepFineTuned,
  AiStepLengthResult,
  AiStepResult,
  processNoLengthCheck,
  processWithLengthCheck,
} from "./StepsAI";
import { ChatCompletionMessageParam } from "openai/resources/index";
import { FTSystemPrompts } from "./FTSystemPrompts";

export interface HumanizeResponse {
  text: string;
  priceInput: number;
  priceOutput: number;
  priceTotal: number;
}

export type HumanizerModel = "ver1" | "ver2";

interface HumanizeResult extends AiStepResult {
  lengthRetries: number;
  lengthFailed: boolean;
}

interface HumanizeStep extends AiStepFineTuned {
  systemPrompt: string;
  useTextBefore?: boolean;
}

const stepsVer1: HumanizeStep[] = [
  {
    ftModel: "ed-rand-mix-kelly",
    controlLengthTries: 2,
    controlLengthAllowance: 35,
    frequencyPenalty: 0.12,
    systemPrompt: FTSystemPrompts["ed-rand-mix-kelly"],
  },
  {
    ftModel: "ed-rand-mix-kelly",
    controlLengthTries: 2,
    controlLengthAllowance: 35,
    frequencyPenalty: 0.07,
    systemPrompt: FTSystemPrompts["ed-rand-mix-kelly"],
  },
  {
    ftModel: "ed-rand-mix-kelly",
    controlLengthTries: 2,
    controlLengthAllowance: 35,
    frequencyPenalty: 0.03,
    systemPrompt: FTSystemPrompts["ed-rand-mix-kelly"],
  },
];

const stepsVer2: HumanizeStep[] = [
  {
    ftModel: "ed-rand-mix-kelly",
    controlLengthTries: 2,
    controlLengthAllowance: 35,
    frequencyPenalty: 0.13,
    systemPrompt: FTSystemPrompts["ed-rand-mix-kelly"],
  },
  {
    ftModel: "ed-mix-overtuned",
    controlLengthTries: 2,
    controlLengthAllowance: 35,
    frequencyPenalty: 0,
    systemPrompt: FTSystemPrompts["ed-mix-overtuned"],
  },
  {
    ftModel: "ed-rand-mix-kelly",
    controlLengthTries: 2,
    controlLengthAllowance: 35,
    frequencyPenalty: 0.04,
    systemPrompt: FTSystemPrompts["ed-rand-mix-kelly"],
  },
];

const modelStepsMap: Record<HumanizerModel, HumanizeStep[]> = {
  ver1: stepsVer1,
  ver2: stepsVer2,
};

function splitToParts(input: string) {
  const allNewLines = input.split("\n");
  const parts: string[] = [];

  let i = 0;
  while (i < allNewLines.length) {
    let line = allNewLines[i];

    if (line.length > 700) {
      parts.push(line);
    } else {
      let j = i + 1;
      while (
        j < allNewLines.length &&
        line.length + allNewLines[j].length <= 700
      ) {
        line += allNewLines[j];
        j++;
      }
      parts.push(line);
      i = j - 1;
    }
    i++;
  }

  return parts;
}

async function humanizePart(
  text: string,
  steps: HumanizeStep[],
  textBeforePart = ""
): Promise<HumanizeResult> {
  let result = "";
  let totalTokensIn = 0;
  let totalTokensOut = 0;
  let totalLengthRetries = 0;

  let lengthFailed = false;
  for (let step of steps) {
    const currentText = result ? result : text;
    if (textBeforePart.length > 1300)
      textBeforePart = "..." + textBeforePart.slice(-1300);
    let systemPrompt = step.systemPrompt;
    if (step.useTextBefore && textBeforePart.length > 10) {
      systemPrompt += `\n\n Please ensure your version connects with the text before, so it has different intro words and you're not talking about same thing again.

PART OF THE TEXT BEFORE CURRENT PART:

${textBeforePart}

PLEASE DON'T INCLUDE PREVIOUS PARTS IN YOUR RESPONSE.`;
    }
    const messages: ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
      { role: "user", content: currentText },
    ];
    let r: AiStepResult | AiStepLengthResult;
    if (step.controlLengthTries) {
      const res = await processWithLengthCheck(
        currentText.length,
        messages,
        step
      );
      if (!res.success) {
        console.log(`Unable to meet length limits, using best result!`);
        lengthFailed = true;
      }
      totalLengthRetries += res.lengthRetries;
      r = res;
    } else {
      r = await processNoLengthCheck(messages, step);
    }
    result = r.text;

    totalTokensIn += r.tokensInput;
    totalTokensOut += r.tokensOutput;
  }

  return {
    text: result,
    tokensInput: totalTokensIn,
    tokensOutput: totalTokensOut,
    lengthRetries: totalLengthRetries,
    lengthFailed,
  };
}

/**
 * Humanizes the given input text by applying a series of steps.
 * It first splits text into parts based on new lines and length, then humanizes evey part in parallel.
 *
 * @param {string} input - The input text to humanize.
 * @param {HumanizeStep[]} steps - An array of steps to apply to the input text.
 * @returns {Promise<HumanizeResponse>}
 */
async function humanizeText(
  input: string,
  steps: HumanizeStep[]
): Promise<HumanizeResponse> {
  const parts = splitToParts(input);

  const processedParts: HumanizeResult[] = [];
  const textResults: string[] = [];

  const executor = async (part: string, index: number) => {
    if (part.length < 50) {
      textResults[index] = part;
      return;
    }

    const humanized = await humanizePart(part, steps);
    processedParts[index] = humanized;
    textResults[index] = humanized.text;
  };

  const promises = [];

  for (let i = 0; i < parts.length; i++) {
    promises.push(executor(parts[i], i));
  }

  await Promise.all(promises);

  let totalTokensIn = 0;
  let totalTokensOut = 0;
  let totalLengthRetries = 0;

  for (let processedPart of processedParts) {
    totalTokensIn += processedPart.tokensInput;
    totalTokensOut += processedPart.tokensOutput;
    totalLengthRetries += processedPart.lengthRetries ?? 0;
  }

  const priceInput = (totalTokensIn / 1000) * 0.003;
  const priceOutput = (totalTokensOut / 1000) * 0.006;
  const priceTotal = priceInput + priceOutput;

  return {
    text: textResults.join("\n\n"),
    priceInput,
    priceOutput,
    priceTotal,
  };
}

/**
 * Humanizes the given text using the specified model.
 *
 * @param {string} text - The text to be humanized.
 * @param {HumanizerModel} model - The model to be used for humanization.
 * @return {Promise<HumanizeResponse>} - A promise that resolves with the humanized text and pricing info.
 */
export async function humanizerAPI(
  text: string,
  model: HumanizerModel
): Promise<HumanizeResponse> {
  return humanizeText(text, modelStepsMap[model]);
}
