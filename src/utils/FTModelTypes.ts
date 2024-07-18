export type FTModelFull =
  | "ft:gpt-3.5-turbo-0125:killertutors:ed-mix-overtuned:9hT0dEUA"
  | "ft:gpt-3.5-turbo-0125:killertutors:ed-rand-mix-kelly:9glqwchX";

export type FTModelShort =
  | "ed-mix-overtuned"
  | "ed-rand-mix-kelly";

export const FTModelMap: Record<FTModelShort, FTModelFull> = {
  "ed-mix-overtuned": "ft:gpt-3.5-turbo-0125:killertutors:ed-mix-overtuned:9hT0dEUA",
  "ed-rand-mix-kelly": "ft:gpt-3.5-turbo-0125:killertutors:ed-rand-mix-kelly:9glqwchX"
};
