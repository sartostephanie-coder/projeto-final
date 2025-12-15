"use client";

import { useRouter } from "next/navigation";

export default function MyPlaylistsPage() {
  const router = useRouter();

  return (
    <main className="max-w-[900px] mx-auto px-6 py-10 text-white space-y-10">
      <h1 className="text-2xl font-bold mb-4">Minhas Playlists</h1>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Estudo Focado */}
        <div
          onClick={() => router.push("/playlist/estudo-focado")}
          className="bg-gray-900 px-5 py-4 rounded-xl cursor-pointer hover:bg-gray-800 transition"
        >
          <div className="bg-green-500/30 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
            <span className="text-3xl">📚</span>
          </div>
          <h3 className="text-lg font-semibold">Estudo Focado</h3>
          <p className="text-sm text-gray-400">Ambiente para foco total</p>
          <p className="text-sm mt-2 text-yellow-300">🎵 3 músicas</p>
        </div>

        {/* Festa Animada */}
        <div
          onClick={() => router.push("/playlist/festa-animada")}
          className="bg-gray-900 px-5 py-4 rounded-xl cursor-pointer hover:bg-gray-800 transition"
        >
          <div className="bg-pink-500/30 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
            <span className="text-3xl">🎉</span>
          </div>
          <h3 className="text-lg font-semibold">Festa Animada</h3>
          <p className="text-sm text-gray-400">As melhores para dançar</p>
          <p className="text-sm mt-2 text-yellow-300">🎵 2 músicas</p>
        </div>
      </div>
    </main>
  );
}
