import {
  ChatCompletion,
  ChatCompletionCreateParamsNonStreaming,
  ChatCompletionMessageParam,
  ChatModel,
} from "openai/resources/index";
import { FTModelMap, FTModelShort } from "./FTModelTypes";

export interface AiStepBase {
  frequencyPenalty?: number;
  temperature?: number;
  controlLengthTries?: number;
  controlLengthAllowance?: number;
}

export interface AiStepFineTuned extends AiStepBase {
  ftModel: FTModelShort;
}

export interface AiStepDefault extends AiStepBase {
  chatModel: ChatModel;
}

export interface AiStepResult {
  text: string;
  tokensInput: number;
  tokensOutput: number;
}

export interface AiStepLengthResult extends AiStepResult {
  success: boolean;
  lengthRetries: number;
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isAiStepFineTuned(step: AiStepBase): step is AiStepFineTuned {
  return (step as AiStepFineTuned).ftModel !== undefined;
}

async function processWithVerificationRaw(
  request: ChatCompletionCreateParamsNonStreaming,
  verificationCallback: (data: ChatCompletion) => boolean,
  retriesVerification = 2,
  delay = 20000
): Promise<ChatCompletion | null> {
  for (let i = 0; i < retriesVerification; i++) {
    const response = await fetch("/api/openAI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    const responseJson = await response.json();
    if (response && verificationCallback(responseJson)) return responseJson;

    await sleep(delay);
  }

  return null;
}

export async function processWithLengthCheck(
  desiredLength: number,
  messages: ChatCompletionMessageParam[],
  step: AiStepDefault | AiStepFineTuned
): Promise<AiStepLengthResult> {
  if (!step.controlLengthAllowance || !step.controlLengthTries)
    throw new Error(
      `Trying to use processWithLengthCheck when step has no length check config!`
    );

  const model = isAiStepFineTuned(step)
    ? FTModelMap[step.ftModel]
    : step.chatModel;
  let bestVersion = "";
  const maxDiff = desiredLength * (step.controlLengthAllowance / 100);
  let retries = 0;
  let tokensIn = 0;
  let tokensOut = 0;

  const verifyResult = (data: ChatCompletion): boolean => {
    const text = data.choices[0]?.message.content;
    tokensIn += data.usage?.prompt_tokens ?? 0;
    tokensOut += data.usage?.completion_tokens ?? 0;

    if (!text) {
      retries++;
      return false;
    }

    const diff = Math.abs(text.length - desiredLength);
    if (diff <= maxDiff) return true;
    console.log(`Length is way too different!`);
    retries++;
    if (!bestVersion || diff < Math.abs(bestVersion.length - desiredLength))
      bestVersion = text;
    return false;
  };

  let humanized = await processWithVerificationRaw(
    {
      model,
      max_tokens: 1400,
      messages,
      frequency_penalty: step.frequencyPenalty,
      temperature: step.temperature,
    },
    verifyResult,
    step.controlLengthTries
  );

  if (!humanized && !bestVersion)
    throw new Error(`Unable to complete request to AI!`);

  return {
    text: humanized?.choices[0]?.message.content
      ? humanized.choices[0].message.content
      : bestVersion,
    success: humanized !== null,
    tokensInput: tokensIn,
    tokensOutput: tokensOut,
    lengthRetries: retries,
  };
}

export async function processNoLengthCheck(
  messages: ChatCompletionMessageParam[],
  step: AiStepDefault | AiStepFineTuned
): Promise<AiStepResult> {
  if (!step.controlLengthAllowance || !step.controlLengthTries)
    throw new Error(
      `Trying to use processWithLengthCheck when step has no length check config!`
    );

  const model = isAiStepFineTuned(step)
    ? FTModelMap[step.ftModel]
    : step.chatModel;

  let humanized = await processWithVerificationRaw(
    {
      model,
      max_tokens: 1400,
      messages,
      frequency_penalty: step.frequencyPenalty,
    },
    () => true,
    step.controlLengthTries
  );

  if (!humanized || !humanized.choices[0]?.message.content)
    throw new Error(`Unable to complete request to AI!`);

  return {
    text: humanized.choices[0].message.content,
    tokensInput: humanized.usage?.prompt_tokens ?? 0,
    tokensOutput: humanized.usage?.completion_tokens ?? 0,
  };
}
