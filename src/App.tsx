import { useEffect } from "react";
import { useHookstate, none } from "@hookstate/core";

import "./App.css";
import WordBtn from "./WordBtn";

const words = [
  "apple",
  "banana",
  "cherry",
  "dragonfruit",
  "elderberry",
  "pineapple",
  "watermelon",
  "carrot",
];

export type WordState = {
  selectedWords: string[];
  words: string;
};

const initialState: WordState = {
  selectedWords: [],
  words: "",
};

function App() {
  const state = useHookstate<WordState>(initialState);

  const handleAddWord = (word: string) => {
    const exist = state.selectedWords.value.includes(word);
    if (exist) return;
    state.selectedWords.merge([word]);
    state.words.set("");
  };

  const handleRemoveWord = (word: string) => {
    const index = state.selectedWords.value.indexOf(word);
    if (index === -1) return;
    state.selectedWords.merge({ [index]: none });
  };

  const getWordSelected = (word: string) => {
    return state.selectedWords.value.includes(word);
  };

  const removeLastWord = () => {
    const index = state.selectedWords.value.length - 1;
    if (index === -1) return;
    state.selectedWords.merge({ [index]: none });
  };

  useEffect(() => {
    const getWordMatches = (letter: string) => {
      const matches = words
        .filter((word) => !state.selectedWords.value.includes(word))
        .filter((word) => word.startsWith(letter));
      return matches;
    };

    const handleBackspace = () => {
      if (state.words.value === "") {
        removeLastWord();
        return;
      }
      state.words.set((prev) => prev.slice(0, -1));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const { key } = e;
      if (key === "Backspace") {
        handleBackspace();
        return;
      }

      const matches = getWordMatches(`${state.words.value}${key}`);

      if (matches.length === 0) {
        return;
      }

      if (matches.length === 1) {
        const [word] = matches;
        handleAddWord(word);
        return;
      }

      state.words.set((prev) => prev + key);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="container flex flex-col gap-4 mx-auto">
      <div className="w-full border border-dashed border-indigo-600 max-w-[400px] mx-auto h-[40px] flex gap-3 items-center justify-center">
        {state.selectedWords.map((word) => (
          <button
            key={word.value}
            className="text-indigo-600"
            onClick={() => handleRemoveWord(word.value)}
          >
            {word.value}
          </button>
        ))}
      </div>

      <div className="w-full  max-w-[400px] mx-auto flex flex-wrap gap-2">
        {words.map((word) => (
          <WordBtn
            key={word}
            word={word}
            onMatch={handleAddWord}
            onSelected={handleAddWord}
            selected={getWordSelected(word)}
            wordState={state}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
