"use client";
import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToolTip } from "./ToolTip";
import { useAtom } from "jotai";
import { globalStateAtom } from "@/context/atoms";
import { humanizerAPI } from "@/utils/humanize";
import { Spinner } from "@material-tailwind/react";
import { useSearchParams, useRouter } from "next/navigation";

type Props = {};

const Results = (props: Props) => {
  const [copied, setCopied] = useState(false);
  const [state, setState] = useAtom(globalStateAtom);
  const searchParams = useSearchParams();
  const router = useRouter();
  const messageId = searchParams.get("id");

  const ResultsEditor = useEditor({
    extensions: [StarterKit, CharacterCount.configure()],
    content: state.openAIFetch.result ? state.openAIFetch.result.text : "",
    autofocus: false,
    editable: false,
  });

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (ResultsEditor && state.openAIFetch.result.text) {
      ResultsEditor.commands.setContent(state.openAIFetch.result.text);
    } else if (ResultsEditor) {
      ResultsEditor.commands.setContent("");
    }
  }, [state.openAIFetch]);

  if (!ResultsEditor) {
    return null;
  }

  const handleRetry = async () => {
    try {
      // Clear the search parameter
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.delete("id");
      router.replace(`?${newSearchParams.toString()}`);

      // Set loading state
      setState((prev) => ({
        ...prev,
        openAIFetch: {
          ...prev.openAIFetch,
          isLoading: true,
        },
      }));

      const result = await humanizerAPI(state.openAIFetch.message, "ver1");

      if (result && result.text) {
        setState((prev) => ({
          ...prev,
          openAIFetch: {
            ...prev.openAIFetch,
            isLoading: false,
            result: result,
            wordCount:
              prev.openAIFetch.wordCount +
              result.text.split(" ").filter((word) => word !== "").length,
          },
        }));

        await fetch("/api/setHistory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            result: result.text,
            userId: state.user.id,
            message: state.openAIFetch.message,
            words: result.text.split(" ").filter((word) => word !== "").length,
          }),
        });
      }
    } catch (e) {
      console.error(e);
      setState((prev) => ({
        ...prev,
        openAIFetch: {
          ...prev.openAIFetch,
          isLoading: false,
        },
      }));
    }
  };

  if (state.openAIFetch.isLoading) {
    return (
      <div className="w-fit h-full items-center flex mx-auto">
        <Spinner className="h-12 w-12" color="blue" />
      </div>
    );
  }

  return ResultsEditor.getText() !== "" ? (
    <div className="h-full flex flex-col p-4">
      <EditorContent
        key="2"
        className="text-gray-800 h-full focus:outline-none"
        editor={ResultsEditor}
      />
      <div className="flex items-center justify-between">
        <div
          className={`character-count flex items-center text-black my-2 gap-2`}>
          {`${ResultsEditor.storage.characterCount.words()}`} words
        </div>
        <div className="flex items-center gap-2">
          <ToolTip content={<div className="w-fit text-black">Retry</div>}>
            <button
              type="button"
              onClick={handleRetry}
              className="text-white py-1 rounded">
              <svg
                type="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="black"
                className="size-7 hover:bg-blue-200 p-1">
                <path
                  fillRule="evenodd"
                  d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </ToolTip>

          <CopyToClipboard text={ResultsEditor.getText()} onCopy={handleCopy}>
            <button
              type="button"
              className="copy-button  text-white py-1 rounded">
              {copied ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="green"
                  className="size-7 hover:bg-blue-200 p-1">
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <ToolTip content={<div className="w-fit text-black">Copy</div>}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="black"
                    className="size-7 hover:bg-blue-200 p-1">
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
                </ToolTip>
              )}
            </button>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex h-full w-full flex-col text-blue-600 items-center justify-center gap-y-3">
      <img
        alt="empty icon"
        loading="lazy"
        width="64"
        height="52"
        decoding="async"
        data-nimg="1"
        src="https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/ai-edit.png"></img>
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-6">
        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
      </svg> */}

      <span className="text-gray-700">
        Your humanized content will appear here.
      </span>
    </div>
  );
};

export default Results;
