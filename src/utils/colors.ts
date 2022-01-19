const colors: [ string, string ][] = [
  [ '#f87171', '#dc2626' ],
  [ '#fb923c', '#ea580c' ],
  [ '#fbbf24', '#d97706' ],
  [ '#facc15', '#ca8a04' ],
  [ '#a3e635', '#65a30d' ],
  [ '#4ade80', '#16a34a' ],
  [ '#34d399', '#059669' ],
  [ '#2dd4bf', '#0d9488' ],
  [ '#22d3ee', '#0891b2' ],
  [ '#38bdf8', '#0284c7' ],
  [ '#60a5fa', '#2563eb' ],
  [ '#818cf8', '#4f46e5' ],
  [ '#a78bfa', '#7c3aed' ],
  [ '#c084fc', '#9333ea' ],
  [ '#e879f9', '#c026d3' ],
  [ '#f472b6', '#db2777' ],
  [ '#fb7185', '#e11d48' ],
]

export const getRandomColor = (hash: string = 'ABC'): [ string, string ] => {
  const index = hash
    .split('')
    .map(it => it.charCodeAt(0))
    .reduce((sum, it) => sum + it, 0) % colors.length

  return colors[index]
}
