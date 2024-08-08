"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { useEffect, useState } from "react";
import { humanizerAPI } from "@/utils/humanize";
import { useAtom } from "jotai";
import { globalStateAtom } from "@/context/atoms";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Spinner,
} from "@material-tailwind/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useSupabaseWithServiceRole } from "@/lib/supabase";
import Link from "next/link";
import { openAIFetchStateAtom } from "@/context/humanizerAtoms";

const Tiptap = () => {
  const [content, setContent] = useState("");
  const [state, setState] = useAtom(globalStateAtom);
  const [openAIFetchState, setOpenAIFetchState] = useAtom(openAIFetchStateAtom);
  const [inputLimit, setInputLimit] = useState(100);
  const [wordMax, setWordMax] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const searchParams = useSearchParams();
  const [messageCountError, setMessageCountError] = useState("");
  const [wordLimitExceededPopup, setWordLimitExceededPopup] = useState(false);
  const [freeTierRetries, setFreeTierRetries] = useState(0);

  const messageId = searchParams.get("id");
  const supabase = useSupabaseWithServiceRole();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write something …",
      }),
      CharacterCount,
    ],
    content: "",
    onUpdate: ({ editor }) => {
      const words = editor
        .getText()
        .trim()
        .split(/\s+/)
        .filter((word) => word).length;
      if (words > inputLimit) {
        // toast.error(`Word limit exceeded! Limit: ${inputLimit} words.`);
        // editor.commands.undo();
      } else {
        setContent(editor.getText());
      }
    },
  });

  const inputWordCount = editor && editor.storage.characterCount.words();

  const fetchWordLimit = async () => {
    const response = await fetch(`/api/getWordCount`, {
      method: "POST",
      body: JSON.stringify({
        id: state.user.id,
      }),
    });

    if (!response.ok) {
      console.error("Error fetching word limit:", response.statusText);
    }

    const data = await response.json();

    setInputLimit(data.inputMax);
    setWordMax(data.wordsMax);
    setWordCount(data.wordCount);
  };

  useEffect(() => {
    if (state.user) {
      fetchWordLimit();
    }
  }, []);

  const fetchMessage = async () => {
    const response = await fetch(`/api/getHistory`, {
      method: "POST",
      body: JSON.stringify({
        userId: state.user.id,
        messageId: messageId,
      }),
    });

    if (!response.ok) {
      console.error("Error fetching history:", response.statusText);
    }

    const data = await response.json();

    editor && editor.commands.setContent(data[0].message);

    setOpenAIFetchState((prev) => ({
      ...prev,
      message: data[0].message,
      result: {
        text: data[0].response,
      },
      wordCount: data[0].words,
    }));
  };

  useEffect(() => {
    if (messageId && state.user && editor) {
      fetchMessage();
    }
  }, [messageId, editor]);

  if (!editor) {
    return (
      <div className="w-fit h-full items-center flex mx-auto">
        <Spinner className="h-12 w-12" color="blue" />
      </div>
    );
  }

  const percentage = editor
    ? Math.round((100 / inputLimit) * editor.storage.characterCount.words())
    : 0;

  const handlePasteText = async () => {
    try {
      const text = await navigator.clipboard.readText();
      editor.commands.setContent(text);
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  };

  async function humanizer() {
    if (!state.session) {
      console.error("No session found.");
      setState({
        ...state,
        isSignUpModalOpen: true,
      });
      return;
    }

    if (
      (editor && editor.storage.characterCount.words() < 50) ||
      (editor && editor.storage.characterCount.words() === 0)
    ) {
      console.error("Please write at least 50 characters before humanizing.");
      setMessageCountError(
        "Please write at least 50 characters before humanizing."
      );
      // toast.error("Please write at least 50 characters before humanizing.");
      return;
    }

    if (inputWordCount > inputLimit) {
      console.error(`Word limit exceeded! Limit: ${inputLimit} words.`);
      // toast.error(`Word limit exceeded! Limit: ${inputLimit} words.`);
      setMessageCountError(`Plan word limit exceeded: ${inputLimit} words.`);
      setWordLimitExceededPopup(true);
      return;
    } else {
      setMessageCountError("");
      setWordLimitExceededPopup(false);
    }

    if (
      wordCount + content.split(" ").filter((word) => word !== "").length >=
      wordMax
    ) {
      setState((prev) => ({
        ...prev,
        limitReachPopup: true,
        wordLimitReached: true,
      }));
      return;
    }

    try {
      const result = await humanizerAPI(
        content,
        state.humanizerVersion,
        (isLoading) => {
          if (isLoading) {
            setOpenAIFetchState((prev) => ({
              ...prev,
              isLoading,
            }));
          } else {
            setOpenAIFetchState((prev) => ({
              ...prev,
              isLoading,
            }));
          }
        }
      )
        .then((response) => {
          return response;
        })
        .catch((e) => {
          console.error(e);
          toast.error("Failed to humanize text.");
        });

      if (result && result.text) {
        setOpenAIFetchState((prev) => ({
          ...prev,
          result: {
            text: result.text,
            priceInput: result.priceInput,
            priceOutput: result.priceOutput,
            priceTotal: result.priceTotal,
          },
          message: content,
          wordCount:
            prev.wordCount +
            result.text.split(" ").filter((word) => word !== "").length,
        }));
        const setHistory = await fetch("/api/setHistory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            result: result.text,
            userId: state.user.id,
            message: state.openAIFetch.message || content,
            words: content.split(" ").filter((word) => word !== "").length,
            wordMax: wordMax,
          }),
        });

        const setHistoryJson = await setHistory.json();

        if (state.isSubscribed.planName === "free") {
          setFreeTierRetries((prev) => prev + 1);
        }

        fetchWordLimit();
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to humanize text.");
      setOpenAIFetchState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  }

  return (
    <div className="h-full relative group overflow-y-scroll flex flex-col">
      <button
        className={`absolute hidden ${
          editor.storage.characterCount.words() > 0 && "group-hover:block"
        } top-4 lg:top-0 right-4 lg:right-0 text-black cursor-pointer z-10`}
        onClick={() => {
          editor.commands.clearContent();

          setOpenAIFetchState((prev) => ({
            ...prev,
            message: "",
            result: {
              text: "",
            },
            isLoading: false,
            wordCount: 0,
          }));
        }}
        type="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6">
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <EditorContent
        key="1"
        className="text-black h-full focus-visible:outline-0 overflow-y-scroll"
        editor={editor}
      />

      <div
        className={`
      ${inputWordCount > 0 ? "hidden" : "block"}
        absolute left-0 right-0 m-auto top-0 bottom-0 z-[3] w-[300px] h-fit  space-y-3 font-semibold md:w-[250px]`}>
        <div
          onClick={handlePasteText}
          className="text-blue-600 hover:bg-blue-600 flex items-center justify-center gap-2 rounded-lg bg-[#F4F5F9] px-4 py-3 transition-all hover:cursor-pointer hover:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6">
            <path
              fillRule="evenodd"
              d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
            />
          </svg>
          <span>Paste Text</span>
        </div>
      </div>

      <div
        className={`flex flex-col md:flex-row ${
          inputWordCount == 0 ? "lg:justify-end" : "justify-between"
        }`}>
        <div
          className={` items-center justify-center md:justify-start w-full lg:w-fit text-black my-2 gap-2 
            ${inputWordCount == 0 ? "hidden" : "flex"}
          `}>
          <svg height="15" width="15" viewBox="0 0 20 20">
            <circle r="10" cx="10" cy="10" fill="#e9ecef" />
            <circle
              r="5"
              cx="10"
              cy="10"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="10"
              strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
              transform="rotate(-90) translate(-20)"
            />
            <circle r="6" cx="10" cy="10" fill="white" />
          </svg>
          <span
            className={`
            ${
              editor.storage.characterCount.words() > inputLimit
                ? "text-red-600"
                : ""
            }`}>
            {editor.storage.characterCount.words()}
          </span>
          / {inputLimit > 10000 ? "unlimited" : inputLimit}
        </div>
        {messageCountError && (
          <span className="text-red-600 text-[12px] w-1/2 text-center items-center h-fit m-auto">
            {messageCountError}
          </span>
        )}
        <div className="flex items-center md:justify-end gap-x-4 self-end w-full lg:w-fit lg:gap-x-3">
          {/* <button
            type="button"
            className="text-black text-sm w-full lg:w-fit px-2 py-2 transition-all duration-200 hover:text-white hover:bg-blue-600 border-blue-600 border-2 rounded-lg"
            // disabled=""
          >
            <span>Detect AI Text</span>
          </button> */}

          <button
            type="button"
            className="text-white text-sm w-fit my-2 lg:my-0 mx-auto md:mx-0 md:mr-0  px-2 py-2 hover:bg-blue-600 transition-all duration-200 bg-blue-400 border-2 rounded-lg"
            onClick={humanizer}>
            Humanize
          </button>
        </div>
      </div>
      <div>
        <Dialog
          open={wordLimitExceededPopup}
          handler={() => setWordLimitExceededPopup(!wordLimitExceededPopup)}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}>
          <DialogHeader>Notification</DialogHeader>
          <DialogBody className="text-base font-bold">
            Unfortunately, your account can currently only handle up to{" "}
            {wordMax} words of input. To unlock a higher word limit, please
            consider upgrading your account.
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={() => setWordLimitExceededPopup(false)}
              className="mr-1">
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="light-blue">
              <Link
                href="/pricing"
                className="text-white"
                onClick={() => setWordLimitExceededPopup(false)}>
                Upgrade
              </Link>
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  );
};

export default Tiptap;
