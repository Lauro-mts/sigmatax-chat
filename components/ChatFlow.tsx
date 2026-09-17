'use client';

import { useEffect, useRef, useState } from 'react';
import ChatBubble from './ChatBubble';
import TypingBubble from './TypingBubble';
import ChoiceButtons from './ChoiceButtons';
import ChatInput from './ChatInput';
import { captureUTMs } from '@/lib/utm';
import { DEBT_OPTIONS, isQualified } from '@/lib/qualification';
import { sendLead } from '@/lib/sheets';
import { trackLead } from '@/lib/pixel';
import { maskCNPJ, maskPhone } from '@/lib/phone';

const WHATSAPP_URL =
  'https://wa.me/5511913759889?text=Ol%C3%A1%2C%20tenho%20d%C3%ADvida%20tribut%C3%A1ria%20e%20gostaria%20de%20agendar%20uma%20reuni%C3%A3o...';

const AUTO_REDIRECT_MS = 10000;

interface Message {
  id: string;
  role: 'bot' | 'user';
  text: string;
}

type InputStage = 'none' | 'nome' | 'divida' | 'cnpj' | 'whatsapp' | 'final-qualified';

let idCounter = 0;
const nextId = () => `m${idCounter++}`;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function ChatFlow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputStage, setInputStage] = useState<InputStage>('none');
  const qualifiedRef = useRef(false);
  const answersRef = useRef({ nome: '', divida: '', cnpj: '', whatsapp: '' });
  const startedRef = useRef(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, inputStage]);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    captureUTMs();
    runIntro();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function say(text: string) {
    setIsTyping(true);
    await delay(700);
    setIsTyping(false);
    setMessages((prev) => [...prev, { id: nextId(), role: 'bot', text }]);
    await delay(250);
  }

  function sayUser(text: string) {
    setMessages((prev) => [...prev, { id: nextId(), role: 'user', text }]);
  }

  async function runIntro() {
    await say(
      'Empresário, não deixe que as dívidas tributárias prejudiquem o crescimento da sua empresa!'
    );
    await say(
      'Descubra como reduzir sua dívida de maneira significativa e ainda parcelar o valor remanescente, evitando bloqueios.'
    );
    await say('Qual é o seu nome?');
    setInputStage('nome');
  }

  async function handleNome(value: string) {
    sayUser(value);
    answersRef.current.nome = value;
    setInputStage('none');
    await say('Aproximadamente, qual o valor da sua dívida até o momento?');
    setInputStage('divida');
  }

  async function handleDivida(value: string) {
    sayUser(value);
    answersRef.current.divida = value;
    setInputStage('none');
    await say('Qual o CNPJ da sua empresa?');
    setInputStage('cnpj');
  }

  async function handleCnpj(value: string) {
    sayUser(value);
    answersRef.current.cnpj = value;
    setInputStage('none');

    const qualified = isQualified(answersRef.current.divida);
    qualifiedRef.current = qualified;

    if (qualified) {
      await say('Ótimo, falta apenas um passo...');
      await say('Qual o seu número de WhatsApp?');
    } else {
      await say('Qual o seu número do whatsApp?');
    }
    setInputStage('whatsapp');
  }

  async function handleWhatsapp(value: string) {
    sayUser(value);
    answersRef.current.whatsapp = value;
    setInputStage('none');

    const { nome, divida, cnpj, whatsapp } = answersRef.current;
    const qualificado = qualifiedRef.current;

    void sendLead({ nome, divida, cnpj, whatsapp, qualificado });

    if (qualificado) {
      trackLead();
      await say(
        '🎉 Boa notícia: pelo que você nos contou, sua empresa tem indícios de elegibilidade para receber descontos de até 70%. Agende uma reunião com nosso time de especialistas:'
      );
      setInputStage('final-qualified');
      setTimeout(() => {
        window.location.href = WHATSAPP_URL;
      }, AUTO_REDIRECT_MS);
    } else {
      await say(
        'Recebemos suas informações e nossa equipe vai analisar o seu caso com atenção. Se identificarmos viabilidade para a Transação Tributária, um especialista da Sigmatax entrará em contato com você em breve.'
      );
      setInputStage('none');
    }
  }

  return (
    <div className="flex h-screen flex-col sm:h-[720px]">
      <div className="flex-1 space-y-3 overflow-y-auto py-4">
        {messages.map((m, i) => {
          if (m.role === 'user') {
            return (
              <ChatBubble key={m.id} role="user">
                {m.text}
              </ChatBubble>
            );
          }
          const next = messages[i + 1];
          const isLastInGroup = !next || next.role !== 'bot';
          return (
            <ChatBubble key={m.id} role="bot" showAvatar={isLastInGroup}>
              {m.text}
            </ChatBubble>
          );
        })}
        {isTyping && <TypingBubble />}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-[#eee]">
        {inputStage === 'nome' && (
          <ChatInput placeholder="Qual seu primeiro nome?" onSubmit={handleNome} />
        )}
        {inputStage === 'divida' && (
          <ChoiceButtons options={DEBT_OPTIONS} onSelect={handleDivida} />
        )}
        {inputStage === 'cnpj' && (
          <ChatInput
            placeholder="Digite o número"
            inputMode="numeric"
            mask={maskCNPJ}
            minLength={18}
            onSubmit={handleCnpj}
          />
        )}
        {inputStage === 'whatsapp' && (
          <ChatInput
            placeholder="(00) 00000-0000"
            inputMode="tel"
            mask={maskPhone}
            minLength={15}
            onSubmit={handleWhatsapp}
          />
        )}
        {inputStage === 'final-qualified' && (
          <div className="px-4 pb-4 pt-2">
            <a
              href={WHATSAPP_URL}
              className="block rounded-full bg-[#25D366] px-5 py-3 text-center text-[15px] font-semibold text-white transition hover:bg-[#1ebe5a]"
            >
              Agendar reunião agora
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
