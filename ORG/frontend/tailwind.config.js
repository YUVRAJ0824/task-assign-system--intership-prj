/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: 'var(--bg)',
          subtle: 'var(--bg-subtle)',
        },
        surface: 'var(--surface)',
        border: {
          DEFAULT: 'var(--border)',
          strong: 'var(--border-strong)',
        },
        text: {
          DEFAULT: 'var(--text)',
          muted: 'var(--text-muted)',
          faint: 'var(--text-faint)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          fg: 'var(--accent-fg)',
        },
        status: {
          success: {
            DEFAULT: '#2F7D5B',
            bg: 'var(--status-success-bg)',
          },
          warning: {
            DEFAULT: '#B7791F',
            bg: 'var(--status-warning-bg)',
          },
          danger: {
            DEFAULT: '#B4443C',
            bg: 'var(--status-danger-bg)',
          },
          info: {
            DEFAULT: '#3E5C8A',
            bg: 'var(--status-info-bg)',
          },
        },
      },
      borderRadius: {
        input: '8px',
        card: '12px',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        floating: '0 4px 20px -2px rgba(15, 23, 42, 0.08)',
        'floating-dark': '0 4px 24px -2px rgba(0, 0, 0, 0.35)',
      },
    },
  },
  plugins: [],
};
