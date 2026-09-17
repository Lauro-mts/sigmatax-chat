interface ChoiceButtonsProps {
  options: readonly string[];
  onSelect: (value: string) => void;
}

export default function ChoiceButtons({ options, onSelect }: ChoiceButtonsProps) {
  return (
    <div className="flex flex-col items-end gap-2.5 px-4 pb-3">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className="rounded-2xl bg-[#2b4ee0] px-5 py-3 text-right text-[15px] font-bold text-white transition hover:bg-[#2340c2]"
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
