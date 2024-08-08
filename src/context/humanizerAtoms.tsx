import { atom } from "jotai";

type OpenAIFetchState = {
  isLoading: boolean;
  message: string;
  result: {
    priceInput?: number;
    priceOutput?: number;
    priceTotal?: number;
    text: string;
  };
  wordCount: number;
};

export const openAIFetchStateAtom = atom<OpenAIFetchState>({
  isLoading: false,
  message: "",
  result: {
    priceInput: 0,
    priceOutput: 0,
    priceTotal: 0,
    text: "",
  },
  wordCount: 0,
});

export const isLoadingAtom = atom(
  (get) => get(openAIFetchStateAtom).isLoading,
  (get, set, isLoading: boolean) => {
    set(openAIFetchStateAtom, { ...get(openAIFetchStateAtom), isLoading });
  }
);

export const messageAtom = atom(
  (get) => get(openAIFetchStateAtom).message,
  (get, set, message: string) => {
    set(openAIFetchStateAtom, { ...get(openAIFetchStateAtom), message });
  }
);

export const resultAtom = atom(
  (get) => get(openAIFetchStateAtom).result,
  (get, set, result: OpenAIFetchState["result"]) => {
    set(openAIFetchStateAtom, { ...get(openAIFetchStateAtom), result });
  }
);

export const wordCountAtom = atom(
  (get) => get(openAIFetchStateAtom).wordCount,
  (get, set, wordCount: number) => {
    set(openAIFetchStateAtom, { ...get(openAIFetchStateAtom), wordCount });
  }
);
