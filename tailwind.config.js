/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 主要顏色
        primary: '#2196F3',
        'text-primary': '#374151',
        'text-secondary': '#737373',
        'text-light': '#a7a7a7',

        // 背景顏色
        background: '#f5f5f5',
        surface: '#ffffff',
        border: '#e8dedd',

        // 評分顏色
        paw: '#ffc107c8',
        'paw-light': '#fff4d1',
        poop: '#8B5E3C',
        'poop-light': '#d9b8a3',

        // 狀態顏色
        success: '#008000da',
        danger: '#DC2626',
        error: '#F87171',
        disabled: '#D3D3D3',

        // Logo 顏色
        logo: '#646A6F',
      },
      borderRadius: {
        xs: '4px',
        sm: '6px',
        DEFAULT: '8px',
        lg: '12px',
        xl: '16px',
        xxl: '20px',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        xxl: '24px',
        xxxl: '32px',
      },
      boxShadow: {
        light: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 2px 8px 0 rgba(0, 0, 0, 0.1)',
        heavy: '0 4px 12px 0 rgba(0, 0, 0, 0.15)',
      },
      fontSize: {
        'h1': ['24px', { lineHeight: '1.3', fontWeight: '700' }],
        'h2': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        'h3': ['18px', { lineHeight: '1.4', fontWeight: '600' }],
        'body': ['15px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-large': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-small': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['12px', { lineHeight: '1.4', fontWeight: '400' }],
        'button': ['15px', { lineHeight: '1', fontWeight: '600' }],
      },
    },
  },
  plugins: [],
}
