export const DEBT_OPTIONS = [
  'Até R$100 mil',
  'De R$100 mil a R$300 mil',
  'De R$300 mil a R$500 mil',
  'De R$500 mil a R$1 milhão',
  'Acima de R$1 milhão',
] as const;

export type DebtOption = (typeof DEBT_OPTIONS)[number];

// Regra de negócio: dívida acima de R$100 mil é qualificada para a
// Transação Tributária e segue direto para o WhatsApp.
export function isQualified(divida: string): boolean {
  return divida !== DEBT_OPTIONS[0];
}
