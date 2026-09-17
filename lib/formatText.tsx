import { Fragment, type ReactNode } from 'react';

// Suporta um subconjunto mínimo de markdown nas mensagens do bot:
// **negrito** e _itálico_. Usado só com texto estático definido no
// próprio código (não com input do usuário).
export function formatText(text: string): ReactNode {
  const parts = text.split(/(\*\*.+?\*\*|_.+?_)/g).filter(Boolean);

  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('_') && part.endsWith('_')) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
