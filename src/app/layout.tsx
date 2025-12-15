import "./globals.css";

export const metadata = {
  title: "MusicMood",
  description: "Organize playlists de forma divertida",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className="bg-[#0f0f0f] text-white font-sans min-h-screen">
        {children}
      </body>
    </html>
  );
}