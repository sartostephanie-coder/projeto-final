import { IPlaylist } from "@/types/music";

export const initalPlaylists: IPlaylist[] = [
  {
    icone: "📚",
    titulo: "Estudo Focado",
    descricao: "Ambiente para foco total",
    musicas: [
      { nome: "Deep Focus", autor: "Calm Artist" },
      { nome: "Thinking Mode", autor: "Brain Beats" },
      { nome: "Coding Vibes", autor: "Focus Lab" },
    ],
    id: "estudo-focado" 
  },
  {
    icone: "🎉",
    titulo: "Festa Animada",
    descricao: "Playlist para dançar",
    musicas: [
      { nome: "Dance Boom", autor: "DJ Party" },
      { nome: "Night Lights", autor: "Electro Crew" },
    ],
    id: "festa-animada" 
  },
];
