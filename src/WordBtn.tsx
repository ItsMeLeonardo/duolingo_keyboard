import { useEffect, useState } from "react";
import { State } from "@hookstate/core";

import type { WordState } from "./App";

type Props = {
  word: string;
  onMatch: (word: string) => void;
  onSelected: (word: string) => void;
  selected?: boolean;
  wordState: State<WordState>;
};

export default function WordBtn(props: Props) {
  const { word, onMatch, selected, onSelected, wordState } = props;

  useEffect(() => {
    if (wordState.words.value === word) {
      onMatch(word);
    }
  }, [wordState.words.value]);

  return (
    <button
      className="px-2 py-1 font-bold bg-slate-200 disabled:opacity-10 rounded"
      disabled={selected}
      onClick={() => onSelected(word)}
    >
      {[...word].map((letter, index) => (
        <span
          key={index}
          className={`text-slate-600 ${
            wordState.words.value[index] === letter ? "text-purple-500" : ""
          }`}
        >
          {letter}
        </span>
      ))}
    </button>
  );
}
