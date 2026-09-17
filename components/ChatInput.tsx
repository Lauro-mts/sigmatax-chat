'use client';

import { useState, FormEvent } from 'react';

interface ChatInputProps {
  placeholder: string;
  onSubmit: (value: string) => void;
  mask?: (value: string) => string;
  inputMode?: 'text' | 'numeric' | 'tel';
  minLength?: number;
}

export default function ChatInput({
  placeholder,
  onSubmit,
  mask,
  inputMode = 'text',
  minLength = 1,
}: ChatInputProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed.length < minLength) return;
    onSubmit(trimmed);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 px-4 pb-4 pt-2">
      <input
        autoFocus
        value={value}
        onChange={(e) => setValue(mask ? mask(e.target.value) : e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        className="flex-1 rounded-full border border-[#e0e0e0] px-4 py-2.5 text-[15px] outline-none focus:border-[#6c4fd6]"
      />
      <button
        type="submit"
        className="shrink-0 rounded-full bg-[#3b2fa8] px-5 py-2.5 text-[15px] font-semibold text-white transition hover:bg-[#2f2586] disabled:opacity-40"
        disabled={value.trim().length < minLength}
      >
        Enviar
      </button>
    </form>
  );
}
