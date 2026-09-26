tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        prophet: ['"UnifrakturMaguntia"', 'Cinzel', 'serif'],
        headline: ['"Playfair Display"', '"Noto Serif KR"', '"Nanum Myeongjo"', 'serif'],
        myeongjo: ['"Noto Serif KR"', '"Nanum Myeongjo"', 'serif'],
        serif: ['"Noto Serif KR"', '"Nanum Myeongjo"', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        marauder: ['"MedievalSharp"', 'Cinzel', 'serif']
      },
      colors: {
        parchment: {
          50: '#fdfcf9',
          100: '#f7f1e3',
          200: '#ede2c8',
          300: '#dfcaa5',
          400: '#cca971',
          800: '#4d391b',
          900: '#2d200f',
          950: '#1a1106'
        },
        ink: {
          DEFAULT: '#140c04',
          dark: '#0c0702',
          crimson: '#7f1d1d',
          gold: '#b45309'
        }
      }
    }
  }
};
