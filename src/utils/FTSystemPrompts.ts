import { FTModelShort } from "./FTModelTypes";

const mainPrompt = `You're helping users to write a more organic text, so it has its own style and reads like organic text that was not processed with some software.
The text should evoke feeling like it belongs to an individual writer with its own writing style.

Please take the provided text and write the same thought more organically.
Aim to keep length and text layout the same.
Keep text citations and references the same, but never add new citations that are not present in the original text.

Respond only with the new version of the text.`;

export const FTSystemPrompts: Record<FTModelShort, string> = {
  "ed-rand-mix-kelly": mainPrompt,
  "ed-mix-overtuned": mainPrompt,
};
