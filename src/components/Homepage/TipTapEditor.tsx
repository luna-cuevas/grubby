"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { useState } from "react";

const limit = 100;

const Tiptap = () => {
  // const [content, setContent] = useState("");
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write something …",
      }),
      CharacterCount,
    ],
    content: ``,
  });

  if (!editor) {
    return null;
  }

  const percentage = editor
    ? Math.round((100 / limit) * editor.storage.characterCount.words())
    : 0;

  return (
    <div className="h-full relative group overflow-y-scroll flex flex-col">
      <button
        className={`absolute hidden ${
          editor.storage.characterCount.characters() > 0 && "group-hover:block"
        } top-4 lg:top-0 right-4 lg:right-0 text-black cursor-pointer z-10`}
        onClick={() => {
          editor.commands.clearContent();
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
        contentEditable={editor.storage.characterCount.words() < limit}
        className="text-black h-full focus:outline-none"
        editor={editor}
      />
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <div
          className={`flex items-center text-black my-2 gap-2 ${
            editor.storage.characterCount.characters() === limit
              ? "character-count--warning"
              : ""
          }`}>
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
          {/* {editor.storage.characterCount.characters()} / {limit} characters */}
          {`${editor.storage.characterCount.words()} / ${limit} `} words
        </div>
        <div className="flex items-center gap-x-4 self-end w-full lg:w-fit md:justify-between lg:gap-x-3">
          <button
            type="button"
            className="text-black text-sm w-full lg:w-fit px-2 py-2 transition-all duration-200 hover:text-white hover:bg-blue-600 border-blue-600 border-2 rounded-lg"
            // disabled=""
          >
            <span>Detect AI Text</span>
          </button>
          <button
            type="button"
            className="text-white text-sm w-full lg:w-fit px-2 py-2 hover:bg-blue-300 transition-all duration-200 bg-blue-600 border-2 rounded-lg"
            // disabled=""
          >
            <span>Humanize</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tiptap;
