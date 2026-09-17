export interface UTMData {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
}

const UTM_KEYS: (keyof UTMData)[] = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
];

const SESSION_KEY = 'sigmatax_utms';

export function captureUTMs(): void {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const data: Partial<UTMData> = {};
  let hasAny = false;

  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) {
      data[key] = value;
      hasAny = true;
    }
  }

  if (hasAny) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
  }
}

export function getUTMs(): UTMData {
  const empty: UTMData = {
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_content: '',
    utm_term: '',
  };

  if (typeof window === 'undefined') return empty;

  try {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (!stored) return empty;
    const parsed = JSON.parse(stored) as Partial<UTMData>;
    return { ...empty, ...parsed };
  } catch {
    return empty;
  }
}
