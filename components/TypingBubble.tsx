export default function TypingBubble() {
  return (
    <div className="flex items-end gap-2 px-4">
      <div className="h-8 w-8 shrink-0" />
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-[#EEEAFB] px-4 py-3">
        <span className="h-1.5 w-1.5 animate-typingDot rounded-full bg-[#8b7fb8] [animation-delay:-0.2s]" />
        <span className="h-1.5 w-1.5 animate-typingDot rounded-full bg-[#8b7fb8] [animation-delay:-0.1s]" />
        <span className="h-1.5 w-1.5 animate-typingDot rounded-full bg-[#8b7fb8]" />
      </div>
    </div>
  );
}
