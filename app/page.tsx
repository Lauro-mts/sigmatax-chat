import ChatFlow from '@/components/ChatFlow';

export default function Home() {
  return (
    <main className="flex min-h-screen justify-center bg-[#f7f7f9] px-0 sm:px-4 sm:py-8">
      <div className="flex w-full max-w-[560px] flex-col bg-white sm:min-h-[720px] sm:rounded-2xl sm:shadow-lg">
        <ChatFlow />
      </div>
    </main>
  );
}
