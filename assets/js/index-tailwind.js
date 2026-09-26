    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            prophet: ['"UnifrakturMaguntia"', 'Cinzel', 'serif'],
            headline: ['"Playfair Display"', '"Noto Serif KR"', 'serif'],
            myeongjo: ['"Nanum Myeongjo"', '"Noto Serif KR"', 'serif'],
            serif: ['"Noto Serif KR"', '"IM Fell DW Pica"', 'serif'],
            cinzel: ['"Cinzel"', 'serif'],
            marauder: ['"MedievalSharp"', 'Cinzel', 'serif']
          },
          colors: {
            parchment: {
              50: '#faf4e4',
              100: '#f5ecd6',
              200: '#ebdab4',
              300: '#dfcaa5',
              400: '#cca971',
              800: '#4d391b',
              900: '#2d200f',
              950: '#1a1106',
            },
            ink: {
              DEFAULT: '#221509',
              dark: '#140c04',
              crimson: '#7a1717',
              gold: '#99732b'
            }
          }
        }
      }
    }
