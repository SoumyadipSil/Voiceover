import { useState } from 'react'

const entries = [
  { id: 1, snippet: 'In the sweltering autumn of 476 AD, the Western Roman Empire did not collapse...', voice: 'Kabir', lang: 'HI/EN', date: 'Sep 21, 2026', duration: '2:45', size: '8.2 MB' },
  { id: 2, snippet: 'The Mughal Empire at its zenith stretched from Kabul in the northwest to Dhaka in the east...', voice: 'Rohan', lang: 'EN (IN)', date: 'Sep 20, 2026', duration: '4:12', size: '12.4 MB' },
  { id: 3, snippet: 'আমাজন বর্ষারণ্য পৃথিবীর বৃহত্তম গ্রীষ্মমণ্ডলীয় বনভূমি...', voice: 'Ananya', lang: 'BN', date: 'Sep 19, 2026', duration: '1:58', size: '5.8 MB' },
  { id: 4, snippet: 'The black hole at the center of our galaxy — Sagittarius A* — contains the mass of 4 million suns...', voice: 'Dev', lang: 'EN (IN)', date: 'Sep 18, 2026', duration: '3:30', size: '10.2 MB' },
  { id: 5, snippet: 'Napoleon\'s 100 Days — the most dramatic comeback in military history...', voice: 'Kabir', lang: 'HI/EN', date: 'Sep 17, 2026', duration: '5:44', size: '17.1 MB' },
]

export default function History() {
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = entries.filter(e =>
    e.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.voice.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-5 p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="font-display font-bold text-xl"
            style={{ color: '#F0F4FF', letterSpacing: '-0.04em' }}
          >
            Generation History
          </h1>
          <p style={{ color: '#4f5a72', fontSize: '13px', marginTop: 2 }}>
            {entries.length} generations · 18m 9s total audio
          </p>
        </div>
        <div
          className="flex items-center gap-2 rounded-xl px-3 py-2"
          style={{ background: '#111520', border: '1px solid #1e2a40' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="6" cy="6" r="5" stroke="#4f5a72" strokeWidth="1.3" />
            <path d="M10 10l3 3" stroke="#4f5a72" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <input
            className="bg-transparent border-none outline-none text-sm"
            style={{ color: '#F0F4FF', width: 200 }}
            placeholder="Search generations..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ background: '#0D0F17', border: '1px solid #1e2a40' }}
      >
        {/* Header row */}
        <div
          className="grid grid-cols-12 px-5 py-3"
          style={{ borderBottom: '1px solid #151c2e' }}
        >
          {['Script preview', '', 'Voice', 'Date', 'Duration', ''].map((h, i) => (
            <div
              key={i}
              className={`${[7, 0, 2, 1, 1, 1][i] === 0 ? 'col-span-1' : ''}`}
              style={{
                gridColumn: `span ${[5, 2, 2, 2, 1, 0][i] || 1}`,
                color: '#4f5a72',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {h}
            </div>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: '#111520', border: '1px solid #1e2a40' }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="4" y="4" width="20" height="20" rx="4" stroke="#4f5a72" strokeWidth="1.5" />
                <line x1="9" y1="11" x2="19" y2="11" stroke="#4f5a72" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="9" y1="15" x2="15" y2="15" stroke="#4f5a72" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div style={{ color: '#8892aa', fontSize: '16px', fontWeight: 600, marginBottom: 8 }}>
              No generations yet
            </div>
            <p style={{ color: '#4f5a72', fontSize: '13px' }}>
              Your audio history will appear here after you generate voiceovers.
            </p>
          </div>
        ) : (
          filtered.map((entry, i) => (
            <div
              key={entry.id}
              className="grid px-5 py-4 items-center gap-2 transition-colors"
              style={{
                gridTemplateColumns: '5fr 2fr 2fr 2fr 1fr',
                borderBottom: i < filtered.length - 1 ? '1px solid #151c2e' : 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#111520')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {/* Script snippet */}
              <div className="flex flex-col gap-1 min-w-0">
                <p
                  style={{
                    color: '#F0F4FF',
                    fontSize: '13px',
                    lineHeight: 1.4,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {entry.snippet}
                </p>
                <span style={{ color: '#4f5a72', fontSize: '11px' }}>{entry.size}</span>
              </div>

              {/* Voice */}
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs"
                  style={{ background: '#1a1f2e' }}
                >
                  🎙️
                </div>
                <div>
                  <div style={{ color: '#F0F4FF', fontSize: '13px', fontWeight: 500 }}>{entry.voice}</div>
                  <div style={{ color: '#4f5a72', fontSize: '11px' }}>{entry.lang}</div>
                </div>
              </div>

              {/* Date */}
              <span style={{ color: '#8892aa', fontSize: '13px' }}>{entry.date}</span>

              {/* Duration */}
              <span style={{ color: '#00d2df', fontSize: '13px', fontFamily: 'monospace', fontWeight: 600 }}>
                {entry.duration}
              </span>

              {/* Actions */}
              <div className="flex items-center gap-1.5 justify-end">
                <button
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                  style={{ background: '#111520', border: '1px solid #1e2a40', color: '#4f5a72' }}
                  title="Play"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                    <path d="M2 1l7 4-7 4V1z" />
                  </svg>
                </button>
                <button
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                  style={{ background: '#111520', border: '1px solid #1e2a40', color: '#4f5a72' }}
                  title="Download"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M5 1v6M2 5l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    <line x1="1" y1="9" x2="9" y2="9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
