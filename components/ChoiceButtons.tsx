interface ChoiceButtonsProps {
  options: readonly string[];
  onSelect: (value: string) => void;
}

export default function ChoiceButtons({ options, onSelect }: ChoiceButtonsProps) {
  return (
    <div className="flex flex-col gap-2 px-4 pb-2">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className="rounded-xl border border-[#d9d3f0] bg-white px-4 py-2.5 text-left text-[15px] text-[#1a1a1a] transition hover:border-[#6c4fd6] hover:bg-[#f5f2fc]"
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
