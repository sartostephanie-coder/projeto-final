interface PlaylistProps {
    title: string;
    emoji: string;
    songs?: number;
    onClick: () => void
}

export default function PlaylistCard({ title, emoji, songs = 0 }: PlaylistProps) {
  return (
    <div className="bg-[#1f1f1f] p-5 rounded-xl flex items-center gap-4 cursor-pointer hover:bg-[#262626] transition">
      <div className="text-3xl">{emoji}</div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-400">{songs} músicas</p>
      </div>
    </div>
  );
}