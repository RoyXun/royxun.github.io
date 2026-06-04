import avatarUrl from '/avatar.jpg'

const NAV_ITEMS = [
  { label: 'Github', href: 'https://github.com/RoyXun' },
  { label: 'Blog', href: 'https://royxun.top/blog/' },
  { label: 'Tutorials', href: 'https://royxun.top/tutorials/' },
]

export default function ProfileOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center">
      {/* Offset upward slightly */}
      <div className="pointer-events-auto flex translate-y-[-6%] flex-col items-center gap-6">
        {/* Avatar */}
        <img
          src={avatarUrl}
          alt="Avatar"
          className="h-24 w-24 rounded-full border-2 border-white/30 shadow-lg shadow-blue-400/15 select-none"
          draggable={false}
        />

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-base font-medium tracking-wide select-none">
          {NAV_ITEMS.map((item) => (
            <span key={item.href} className="flex items-center">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/65 transition-all duration-200 hover:text-white/90"
              >
                {item.label}
              </a>
            </span>
          ))}
        </nav>
      </div>
    </div>
  )
}
