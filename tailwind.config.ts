import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        gold: '#BA8859',
        ink: '#111111',
      },
      keyframes: {
        typingDot: {
          '0%, 60%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
          '30%': { transform: 'translateY(-4px)', opacity: '1' },
        },
      },
      animation: {
        typingDot: 'typingDot 1.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
