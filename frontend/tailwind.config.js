export default {
  content: ['./src/**/*.{js,jsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        vesta: {
          bg:          '#0a0e1a',
          card:        '#111827',
          cardHover:   '#1a2235',
          surface:     '#0f1628',
          green:       '#00d4aa',
          greenDark:   '#00b894',
          border:      'rgba(255,255,255,0.08)',
          borderGreen: 'rgba(0,212,170,0.3)',
          text:        '#ffffff',
          muted:       '#8b9ab5',
          faint:       '#4a5568',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    }
  }
}
