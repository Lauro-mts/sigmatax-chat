declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackLead(): void {
  if (typeof window === 'undefined') return;
  if (typeof window.fbq !== 'function') return;
  window.fbq('track', 'Lead');
}
