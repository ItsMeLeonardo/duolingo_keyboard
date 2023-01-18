import { useEffect, useState } from "react";

type Props = {
  word: string;
  onMatch: (word: string) => void;
  onSelected: (word: string) => void;
  selected?: boolean;
};

export default function WordBtn({
  word,
  onMatch,
  selected,
  onSelected,
}: Props) {
  const [wordSelected, setWordSelected] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const { key } = e;
      if (key < "a" || key > "z") return;

      setWordSelected((prev) => prev + key);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (wordSelected === word) {
      onMatch(word);
      setWordSelected("");
    }
  }, [wordSelected]);

  return (
    <button
      className="px-2 py-1 font-bold bg-slate-200 disabled:opacity-10"
      disabled={selected}
      onClick={() => onSelected(word)}
    >
      {[...word].map((letter, index) => (
        <span
          className={`text-slate-600 ${
            wordSelected[index] === letter ? "text-purple-500" : ""
          }`}
        >
          {letter}
        </span>
      ))}
    </button>
  );
}
