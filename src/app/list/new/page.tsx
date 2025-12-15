"use client";
import React, { useState, useEffect } from "react";

export default function NewPlaylistPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [mood, setMood] = useState("Feliz");
  const [emoji, setEmoji] = useState("😄");
  const [message, setMessage] = useState("");
  const [playlists, setPlaylists] = useState([]);

  // Carregar playlists salvas
  useEffect(() => {
    const stored = localStorage.getItem("playlists");
    if (stored) setPlaylists(JSON.parse(stored));
  }, []);

  const moods = [
    { label: "Feliz", icon: "😄" },
    { label: "Triste", icon: "😢" },
    { label: "Festa", icon: "🎉" },
    { label: "Estudo", icon: "📚" },
    { label: "Relaxar", icon: "😴" }
  ];

  const emojis = [
    "🎵","🎶","🎤","🎧","🎸","🥁","🎻","📀","📻","✨",
    "🔥","❤️","💙","🌈","⚡","🌙","⭐","☀️","🌴","💪",
    "🧘","☕","🌸","🎀","🎁","🎹","📚","🌧️","🌞"
  ];

  // Criar playlist
  const handleCreatePlaylist = () => {
    if (!name.trim()) {
      setMessage("⚠️ O nome da playlist é obrigatório");
      return;
    }

    const newPlaylist = {
      id: Date.now(),
      nome: name,
      descricao: description,
      emoji: emoji,
      mood: mood,
      musicas: []
    };

    const stored = localStorage.getItem("playlists");
    const playlistsStored = stored ? JSON.parse(stored) : [];

    playlistsStored.push(newPlaylist);
    localStorage.setItem("playlists", JSON.stringify(playlistsStored));

    setPlaylists(playlistsStored);
    setMessage("🎉 Playlist criada com sucesso!");

    // limpar formulário
    setName("");
    setDescription("");
    setMood("Feliz");
    setEmoji("😄");
  };

  // Função para deletar playlist
  const handleDeletePlaylist = (id) => {
    const updated = playlists.filter((p) => p.id !== id);
    setPlaylists(updated);
    localStorage.setItem("playlists", JSON.stringify(updated));
  };

  return (
    <div style={{ padding: "32px", color: "white", fontFamily: "sans-serif" }}>
      <h2 style={{ fontSize: "28px", fontWeight: "600" }}>
        Criar Nova Playlist
      </h2>

      <p style={{ color: "#bbb", marginBottom: "20px" }}>
        Personalize sua playlist do seu jeito
      </p>

      {/* Preview da playlist */}
      <div style={{
        background: "#1f1f1f",
        padding: "20px",
        borderRadius: "16px",
        width: "320px",
        marginBottom: "30px"
      }}>
        <div style={{
          background: "#f1c40f",
          width: "100px",
          height: "100px",
          borderRadius: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "40px",
          marginBottom: "15px"
        }}>
          {emoji}
        </div>

        <h3 style={{ fontSize: "20px", margin: 0 }}>
          {name || "Nome da Playlist"}
        </h3>

        <p style={{ color: "#aaa", margin: "5px 0" }}>
          {description || "Descrição da playlist"}
        </p>

        <p style={{ fontSize: "14px", color: "#ddd" }}>
          Mood: {mood} {moods.find(m => m.label === mood)?.icon}
        </p>
      </div>

      {/* Formulário */}
      <label>Nome da Playlist *</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ex: Músicas para Estudar"
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "10px",
          border: "none",
          marginBottom: "20px",
          background: "#2a2a2a",
          color: "white"
        }}
      />

      <label>Descrição</label>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Ex: Músicas calmas para manter o foco"
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "10px",
          border: "none",
          marginBottom: "20px",
          background: "#2a2a2a",
          color: "white"
        }}
      />

      <p>Escolha um Mood</p>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {moods.map((m) => (
          <button
            key={m.label}
            onClick={() => setMood(m.label)}
            style={{
              padding: "10px 16px",
              borderRadius: "10px",
              border: mood === m.label ? "2px solid #f1c40f" : "1px solid #444",
              background: mood === m.label ? "#3a3a3a" : "#2a2a2a",
              color: "white",
              cursor: "pointer"
            }}
          >
            {m.icon} {m.label}
          </button>
        ))}
      </div>

      <p>Escolha um Emoji</p>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(8, 1fr)",
        gap: "10px",
        marginBottom: "20px"
      }}>
        {emojis.map((e) => (
          <button
            key={e}
            onClick={() => setEmoji(e)}
            style={{
              padding: "10px",
              fontSize: "22px",
              background: emoji === e ? "#3a3a3a" : "#2a2a2a",
              borderRadius: "10px",
              border: emoji === e ? "2px solid #f1c40f" : "1px solid #444",
              cursor: "pointer",
              color: "white"
            }}
          >
            {e}
          </button>
        ))}
      </div>

      {/* Mensagem */}
      {message && (
        <div style={{
          marginBottom: "20px",
          padding: "12px",
          borderRadius: "10px",
          background: "#2ecc71",
          color: "black",
          fontWeight: "600",
          textAlign: "center"
        }}>
          {message}
        </div>
      )}

      {/* Botões */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "40px" }}>
        <button
          style={{
            flex: 1,
            padding: "14px",
            background: "#333",
            color: "white",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer"
          }}
        >
          Cancelar
        </button>

        <button
          onClick={handleCreatePlaylist}
          style={{
            flex: 1,
            padding: "14px",
            background: "#f1c40f",
            color: "black",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          Criar Playlist
        </button>
      </div>

      {/* Lista de playlists criadas */}
      <div>
        <h3>Playlists Criadas</h3>

        {playlists.length === 0 && (
          <p style={{ color: "#bbb" }}>Nenhuma playlist criada.</p>
        )}

        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            style={{
              background: "#1f1f1f",
              padding: "16px",
              borderRadius: "12px",
              marginBottom: "12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div>
              <h3 style={{ margin: 0 }}>
                {playlist.emoji} {playlist.nome}
              </h3>

              <p style={{ color: "#aaa", margin: "5px 0" }}>
                {playlist.descricao}
              </p>

              <p style={{ fontSize: "14px", color: "#ddd" }}>
                Mood: {playlist.mood}
              </p>
            </div>

            <button
              onClick={() => handleDeletePlaylist(playlist.id)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "24px",
                color: "#e74c3c"
              }}
              title="Deletar playlist"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
