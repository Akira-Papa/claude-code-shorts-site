export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <p>© 2026 あきらパパのAI活用学習部屋</p>
        <div className="flex items-center gap-4">
          <a
            href="https://www.youtube.com/@akira_papa_IT"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-500 transition-colors"
          >
            YouTube
          </a>
          <a
            href="https://x.com/akira_papa_IT"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            @akira_papa_IT
          </a>
        </div>
      </div>
    </footer>
  );
}
