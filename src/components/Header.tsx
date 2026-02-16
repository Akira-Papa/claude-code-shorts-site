import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#0f0f0f] border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
        {/* Logo & Title */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
            C
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-tight tracking-tight">
              Claude Code Shorts
            </h1>
            <p className="text-gray-400 text-xs">
              あきらパパのAI活用学習部屋
            </p>
          </div>
        </Link>

        {/* Social Links */}
        <nav className="flex items-center gap-3">
          <a
            href="https://www.youtube.com/@akira_papa_IT"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-red-500 transition-colors p-2"
            aria-label="YouTube"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
          <a
            href="https://x.com/akira_papa_IT"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors p-2"
            aria-label="X (Twitter)"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </nav>
      </div>
    </header>
  );
}
