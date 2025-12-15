"use client";

interface ButtonMoodProps {
  emoji: string;
  label: string;
  color: string;
  selected: boolean;
  onClick: () => void;
}

export default function ButtonMood({
  emoji,
  label,
  color,
  selected,
  onClick,
}: ButtonMoodProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center
        min-w-[110px] h-[120px]
        rounded-2xl transition cursor-pointer
        ${selected ? "ring-4 ring-yellow-300" : ""}
        ${color}
      `}
    >
      <span className="text-4xl mb-2">{emoji}</span>
      <span className="text-sm font-semibold">{label}</span>
    </button>
  );
}
