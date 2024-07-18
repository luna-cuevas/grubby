import { NextResponse } from "next/server";
import {
  ChatCompletion,
  ChatCompletionCreateParamsNonStreaming,
} from "openai/resources/index";
import { backOff } from "exponential-backoff";
import { NoOpenAICreditsError } from "@/utils/NoOpenAICreditsError";
import { APIError } from "openai";
import { openai } from "@/lib/openAI";

export async function POST(request: Request) {
  const body = await request.json();

  async function processOpenAiRequestWithErrorHandling(
    request: ChatCompletionCreateParamsNonStreaming
  ): Promise<ChatCompletion> {
    return await backOff(() => openai.chat.completions.create(request), {
      maxDelay: 80000,
      numOfAttempts: 3,
      startingDelay: 10000,
      retry: async (e: unknown, attemptNumber: number): Promise<boolean> => {
        if (e instanceof APIError) {
          if (e.code === "insufficient_quota")
            throw new NoOpenAICreditsError(
              "OpenAI account has insufficient funds!"
            );
        }

        if (e instanceof Error) {
          console.log(`Error! ${e?.message}, next attempt #${attemptNumber}`);
        }

        console.log(
          `Unknown error! ${JSON.stringify(e)}, next attempt #${attemptNumber}`
        );
        return true;
      },
    });
  }

  try {
    const response = await processOpenAiRequestWithErrorHandling(body);
    console.log(response);
    return new NextResponse(JSON.stringify(response), {
      status: 200,
    });
  } catch (e: any) {
    if (e instanceof NoOpenAICreditsError) {
      return new NextResponse(e.message, { status: 402 });
    }
    return new NextResponse(e.message, { status: 500 });
  }
}
