import Image from 'next/image';

export default function ChatHeader() {
  return (
    <div className="flex items-center gap-3 border-b border-[#eee] bg-white px-4 py-3">
      <Image
        src="/roberto.jpg"
        alt="Sigmatax"
        width={40}
        height={40}
        className="h-10 w-10 rounded-full object-cover"
      />
      <div className="min-w-0">
        <p className="truncate text-[15px] font-bold text-[#1a1a1a]">Sigmatax</p>
        <p className="truncate text-[13px] text-[#7a7a7a]">Especialista em Transação Tributária</p>
      </div>
    </div>
  );
}
