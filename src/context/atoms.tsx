import { atom } from "jotai";

type State = {
  isSignInOpen: boolean;
  isSubscribed: boolean;
  session: null | string;
  user: null | string;
  showMobileMenu: boolean;
  isScrolled: boolean;
  darkMode: boolean;
  firstVisit: boolean;
  wordLimitReached: boolean;
  limitReachPopup: boolean;
  openAIFetch: {
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
};

// A helper function to work with localStorage and JSON serialization for the entire application state
const atomWithLocalStorage = (key: string, initialValue: any) => {
  const getInitialValue = () => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem(key);
      if (item !== null) {
        try {
          return JSON.parse(item);
        } catch {
          console.error("Could not parse the stored value in localStorage.");
        }
      }
    }
    return initialValue;
  };

  const baseAtom = atom(getInitialValue());
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update: ((prevState: State) => State) | State) => {
      const nextValue =
        typeof update === "function" ? update(get(baseAtom)) : update;
      set(baseAtom, nextValue);
      localStorage.setItem(key, JSON.stringify(nextValue));
    }
  );

  return derivedAtom;
};

// Define your initial state
const initialState: State = {
  isSignInOpen: false,
  isSubscribed: false,
  session: null,
  user: null,
  showMobileMenu: false,
  isScrolled: false,
  darkMode: false,
  firstVisit: true,
  wordLimitReached: false,
  limitReachPopup: false,
  openAIFetch: {
    isLoading: false,
    message: "",
    result: {
      priceInput: 0,
      priceOutput: 0,
      priceTotal: 0,
      text: "",
    },
    wordCount: 0,
  },
};

// Create an atom with local storage persistence for the entire application state
export const globalStateAtom = atomWithLocalStorage(
  "GrubbyAppGlobalState-v6",
  initialState
);
