"use client";

import ButtonMood from "@/components/buttonMood";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import { IPlaylist } from "@/types/music";
import { initalPlaylists } from "@/constants/initial";

export default function Home() {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [playlist, setPlaylist] = useState<IPlaylist[]>(initalPlaylists)

  useEffect(() => {
    const localPlaylist = localStorage.getItem("playlists")
    if(localPlaylist) {
      setPlaylist(JSON.parse(localPlaylist))
    } else {
      localStorage.setItem("playlists", JSON.stringify(initalPlaylists))
    } 
  }, [])

  const moods = [
    { emoji: "😁", label: "Feliz", color: "bg-yellow-300" },
    { emoji: "🥲", label: "Triste", color: "bg-blue-300" },
    { emoji: "🎉", label: "Festa", color: "bg-pink-300" },
    { emoji: "📚", label: "Estudo", color: "bg-green-300" },
    { emoji: "😴", label: "Relaxar", color: "bg-purple-300" },
  ];

  const sugestoes = [
    { nome: "Chuva na Janela", emoji: "🌧️", cor: "bg-blue-400/60" },
    { nome: "Café da Manhã", emoji: "☕", cor: "bg-amber-700/40" },
    { nome: "Noite Estrelada", emoji: "✨", cor: "bg-purple-400/60" },
    { nome: "Caminhada ao Sol", emoji: "🌞", cor: "bg-yellow-600/40" },
    { nome: "Música Clássica", emoji: "🎻", cor: "bg-indigo-800/60" },
  ];

  const handlechangetheme = () => {
    // TODO
  }
  const handleMoodClick = (label: string) => {
    setSelectedMood(label);
    router.push(`list/new?mood=${encodeURIComponent(label)}`);
  };

  const handleSugestaoClick = (nome: string) => {
    router.push(`list/new?mood=${encodeURIComponent(nome)}`);
  };


  return (
    <main className="max-w-[1000px] mx-auto px-6 py-10 space-y-10 text-white">
      {/* HEADER */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          MusicMood <span>🎵</span>
        </h1>

        <div className="flex items-center gap-3">
          <button
            className="bg-gray-900 px-5 py-2 rounded-xl hover:bg-gray-700 transition"
            onClick={() => router.push("/my-playlists")}
          >
            My Playlists
          </button>

          {/* ícone do sol separado e depois do botão */}
          <button
            title="Ação do sol"
            className="rounded-full p-2 hover:bg-gray-800 transition"
            onClick={() => {
              handlechangetheme()
              console.log("Sol clicado");
            }}
          >
            <span className="text-2xl">☀️</span>
          </button>
        </div>
      </header>

      {/* COMO VOCÊ ESTÁ HOJE */}
      <section>
        <h2 className="text-lg font-medium mb-4">Como você está hoje?</h2>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {moods.map((m) => (
            <ButtonMood
              key={m.label}
              emoji={m.emoji}
              label={m.label}
              color={m.color}
              selected={selectedMood === m.label}
              onClick={() => handleMoodClick(m.label)}
            />
          ))}
        </div>
      </section>

      {/* PLAYLIST BASEADA EM PALAVRAS */}
      <section>
        <h2 className="text-lg font-medium mb-4">Playlist baseada em palavras</h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id="inputTema"
            placeholder="Ex: chuva, café, noite..."
            className="flex-1 bg-[#2a2a2a] px-4 py-3 rounded-xl outline-none text-white"
          />

          <button
            className="bg-green-200 text-black px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-yellow-200 transition"
            onClick={() => {
              const tema = (document.getElementById("inputTema") as HTMLInputElement)
                ?.value;
              if (tema) router.push("/list/new?tema=" + encodeURIComponent(tema));
            }}
          >
            💡 Gerar Tema
          </button>
        </div>
      </section>

      {/* SUGESTÕES AUTOMÁTICAS */}
      <section>
        <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
          🔮 Sugestões automáticas
        </h2>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {sugestoes.map((s) => (
            <div
              key={s.nome}
              className={`${s.cor} px-5 py-4 rounded-xl cursor-pointer hover:opacity-90 transition`}
              onClick={() => handleSugestaoClick(s.nome)}
            >
              <p className="text-3xl">{s.emoji}</p>
              <h3 className="text-lg font-semibold mt-2">{s.nome}</h3>
            </div>
          ))}
        </div>
      </section>

  
{/* RECENTES */}
<section>
  <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
    🕒 Recentes
  </h2>

  <div className="grid sm:grid-cols-2 gap-4">
    {playlist.map((e) => (
      <div
        key={e.id || e.titulo} 
        className="bg-gray-900 px-5 py-4 rounded-xl flex justify-between items-center cursor-pointer hover:bg-gray-800 transition"
      >
        {/* Conteúdo da playlist */}
        <div
          className="flex-1"
          onClick={() => {
            if (!e.titulo) return;
            router.push(`/playlist/${e.titulo.toLowerCase().split(" ").join("-")}`);
          }}
        >
          <div className="bg-green-500/30 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
            <span className="text-3xl">{e.icone || "🎵"}</span>
          </div>

          <h3 className="text-lg font-semibold">{e.titulo || "Sem Nome"}</h3>
          <p className="text-sm text-gray-400">{e.descricao || "Sem descrição"}</p>
          <p className="text-sm mt-2 text-yellow-300">🎵 {e.musicas?.length || 0} músicas</p>
        </div>

        {/* Botão deletar */}
        {!initalPlaylists.find((p) => p.titulo === e.titulo) && (
          <button
            onClick={(event) => {
              event.stopPropagation(); 
              const stored = localStorage.getItem("playlists");
              if (!stored) return;
              const updated = JSON.parse(stored).filter((p: any) => p.titulo !== e.titulo);
              localStorage.setItem("playlists", JSON.stringify(updated));
              setPlaylist([...initalPlaylists, ...updated]);
            }}
            className="ml-2 text-red-500 text-xl"
            title="Deletar playlist"
          >
            🗑️
          </button>
        )}
      </div>
    ))}
  </div>
</section>
      <Footer />
    </main>
  );
} 
