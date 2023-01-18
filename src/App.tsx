import { useState } from "react";
import "./App.css";
import WordBtn from "./WordBtn";

const words = [
  "apple",
  "banana",
  "cherry",
  // "dragonfruit",
  "elderberry",
  "appluu",
];

function App() {
  const [selected, setSelected] = useState<string[]>([]);

  const handleAddWord = (word: string) => {
    setSelected((prev) => [...prev, word]);
  };

  const handleRemoveWord = (word: string) => {
    setSelected((prev) => prev.filter((w) => w !== word));
  };

  const getWordSelected = (word: string) => {
    return selected.includes(word);
  };

  return (
    <div className="container flex flex-col gap-4 mx-auto">
      <div className="w-full border border-dashed border-indigo-600 max-w-[400px] mx-auto h-[40px] flex gap-3 items-center justify-center">
        {selected.map((word) => (
          <button
            className="text-indigo-600"
            onClick={() => handleRemoveWord(word)}
          >
            {word}
          </button>
        ))}
      </div>

      <div className="w-full  max-w-[400px] mx-auto flex gap-2">
        {words.map((word) => (
          <WordBtn
            word={word}
            onMatch={handleAddWord}
            onSelected={handleAddWord}
            selected={getWordSelected(word)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
