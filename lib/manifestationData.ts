export interface DailyRitual {
  day: number;
  song: {
    title: string;
    artist: string;
    lyricsSnippet?: string;
    url?: string; // Para Spotify/YouTube link
  };
  instructions: {
    part1: string; // 3 veces
    part2: string; // 6 veces
    part3: string; // 9 veces
  };
  quote?: string;
}

export const ritualDays: DailyRitual[] = [
  {
    day: 1,
    song: {
      title: "You've Got the Love",
      artist: "Florence + The Machine",
      lyricsSnippet: "Sometimes I feel like saying, 'Lord, I just don't care.' But you've got the love I need to see me through."
    },
    instructions: {
      part1: "Escribe 3 veces lo que deseas manifestar",
      part2: "Escribe 6 veces la intención de lo que deseas manifestar",
      part3: "Escribe 9 veces el resultado final de tu manifestación"
    }
  },
  {
    day: 2,
    song: {
      title: "Se explicará",
      artist: "Julieta Venegas",
      lyricsSnippet: "Y de repente todo es más fácil... La cuestión era llegar a él."
    },
    instructions: {
      part1: "Escribe 3 veces lo que deseas manifestar",
      part2: "Escribe 6 veces la intención de lo que deseas manifestar",
      part3: "Escribe 9 veces el resultado final de tu manifestación"
    }
  },
  {
    day: 3,
    song: {
      title: "Sunkissed", // Identificada por la letra del PDF
      artist: "Khai Dreams",
      lyricsSnippet: "Oh sun kissed skin when you kick in every color melts randomly"
    },
    instructions: {
      part1: "Escribe 3 veces lo que deseas manifestar",
      part2: "Escribe 6 veces la intención de lo que deseas manifestar",
      part3: "Escribe 9 veces el resultado final de tu manifestación"
    }
  },
  // ... Puedes pedirle a Cursor que genere los días 4 al 21 siguiendo este patrón
  // El PDF repite la misma instrucción para los días siguientes, pero cambia la música.
];

export const appConfig = {
  title: "Diario Ritual 3-6-9",
  author: "Carolina D'ante de Soli",
  welcomeMessage: "Nada está afuera de tu alcance.",
  totalDays: 21
};