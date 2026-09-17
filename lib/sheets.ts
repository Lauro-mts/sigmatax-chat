import { getUTMs } from './utm';

export interface LeadInput {
  nome: string;
  divida: string;
  cnpj: string;
  whatsapp: string;
  qualificado: boolean;
}

export interface LeadPayload extends LeadInput {
  eventoPixel: 'Lead' | '';
  timestamp: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
}

function getBrasiliaTimestamp(): string {
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date());
}

export async function sendLead(input: LeadInput): Promise<void> {
  const utms = getUTMs();

  const payload: LeadPayload = {
    ...input,
    eventoPixel: input.qualificado ? 'Lead' : '',
    timestamp: getBrasiliaTimestamp(),
    ...utms,
  };

  try {
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    // fire-and-forget: não bloqueia a experiência do usuário se a planilha falhar
  }
}
