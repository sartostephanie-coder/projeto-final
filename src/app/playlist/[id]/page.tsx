"use client";

import { initalPlaylists } from "@/constants/initial";
import { IPlaylist } from "@/types/music";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function PlaylistPage() {
  const { id } = useParams()
  if (typeof id !== "string") {
    return <h1>Erro</h1>
  }
  const [playlist, setPlaylist] = useState<IPlaylist>(initalPlaylists.find((e) => e.titulo.toLowerCase() === id.split('-').join(" ")) as IPlaylist)

  const router = useRouter();
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ titulo: playlist?.titulo ?? "", descricao: playlist?.descricao ?? "" })

  const handleEditPlaylist = () => {
    setPlaylist((ps) => ({...ps, titulo: form.titulo, descricao: form.descricao}))
    setEditing(false)
  }

  return (
    <main className="max-w-[900px] mx-auto px-6 py-10 text-white space-y-10">

      {/* Header */}
      <header className="flex items-center gap-4 cursor-pointer" onClick={() => router.back()}>
        <span className="text-3xl">⬅️</span>
        <h2 className="text-lg font-medium">Voltar</h2>
      </header>

      {/* Capa */}
      <section className="flex items-center gap-6">
        <div className="bg-green-500/40 w-36 h-36 rounded-2xl flex items-center justify-center">
          <span className="text-6xl">📚</span>
        </div>

       <div>
    {editing ? (
    <>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={form.titulo}
          onChange={(e) =>
            setForm((ps) => ({ ...ps, titulo: e.target.value }))
          }
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
        ></input>

        <textarea
          value={form.descricao}
          onChange={(e) =>
            setForm((ps) => ({ ...ps, descricao: e.target.value }))
          }
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
        ></textarea>
      </div>

      <div className="flex gap-4 mt-3">
        <button
          onClick={handleEditPlaylist}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white"
        >
          Salvar
        </button>

        <button
          onClick={() => setEditing(false)}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white"
        >
          Cancelar
        </button>
      </div>
    </>
    ) : (
    <>
      <h1 className="text-3xl font-bold">{playlist?.titulo}</h1>
      <p className="text-gray-400 mt-1">{playlist?.descricao}</p>
      <p className="text-yellow-300 mt-2">
        🎵 {playlist?.musicas.length} músicas
      </p>

      <button
        onClick={() => setEditing(true)}
        className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
      >
        Edit
      </button>
    </>
  )}
</div>
</section>

<hr className="border-gray-700" />

      {/* Lista de músicas */}
      <section className="space-y-4">
        {playlist?.musicas.map((m, index) => (
          <div
            key={m.nome}
            className="flex justify-between items-center bg-gray-900 px-5 py-4 rounded-xl hover:bg-gray-800 transition cursor-pointer"
          >
            <div>
              <h3 className="font-semibold">{index + 1}. {m.nome}</h3>
              <p className="text-gray-400 text-sm">{m.autor}</p>
            </div>

            <button className="text-xl">▶️</button>
          </div>
        ))}
      </section>

      <footer className="text-center text-gray-500 py-10">
        Feito com ❤️ para Lucas organizar músicas.
      </footer>
    </main>
  );
}
