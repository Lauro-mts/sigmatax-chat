import Image from 'next/image';

interface ChatBubbleProps {
  role: 'bot' | 'user';
  children: React.ReactNode;
  showAvatar?: boolean;
}

export default function ChatBubble({ role, children, showAvatar }: ChatBubbleProps) {
  if (role === 'user') {
    return (
      <div className="flex justify-end px-4">
        <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-[#111111] px-4 py-2.5 text-[15px] leading-snug text-white">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-end gap-2 px-4">
      <div className="h-8 w-8 shrink-0">
        {showAvatar && (
          <Image
            src="/roberto.jpg"
            alt="Especialista Sigmatax"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
          />
        )}
      </div>
      <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-[#EEEAFB] px-4 py-2.5 text-[15px] leading-snug text-[#1a1a1a]">
        {children}
      </div>
    </div>
  );
}
