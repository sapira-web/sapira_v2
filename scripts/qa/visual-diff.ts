import fs from 'fs'
import path from 'path'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'

const ROOT        = path.resolve(process.cwd(), 'qa-screenshots')
const BASELINE    = path.join(ROOT, 'baseline')
const CURRENT     = path.join(ROOT, 'current')
const DIFF_DIR    = path.join(ROOT, 'diff')

const FILES = [
  'home-mobile.png',
  'home-mobile-large.png',
  'home-tablet.png',
  'home-desktop.png',
  'home-large-desktop.png',
]

const THRESHOLD_PASS = 0.001  // < 0.1%
const THRESHOLD_WARN = 0.01   // < 1%

type Status = 'PASS' | 'WARN' | 'FAIL' | 'SKIP'

interface Result {
  file:        string
  status:      Status
  pixels?:     number
  total?:      number
  pct?:        string
  reason?:     string
}

function readPNG(filepath: string): PNG {
  const buf = fs.readFileSync(filepath)
  return PNG.sync.read(buf)
}

function diffLabel(status: Status): string {
  if (status === 'PASS') return '✓ PASS'
  if (status === 'WARN') return '△ WARN'
  if (status === 'FAIL') return '✗ FAIL'
  return '— SKIP'
}

async function run() {
  fs.mkdirSync(DIFF_DIR, { recursive: true })

  const results: Result[] = []

  for (const file of FILES) {
    const baselinePath = path.join(BASELINE, file)
    const currentPath  = path.join(CURRENT,  file)
    const diffPath     = path.join(DIFF_DIR, `diff-${file}`)

    if (!fs.existsSync(baselinePath)) {
      results.push({ file, status: 'SKIP', reason: 'missing in baseline' })
      continue
    }
    if (!fs.existsSync(currentPath)) {
      results.push({ file, status: 'SKIP', reason: 'missing in current' })
      continue
    }

    const baseline = readPNG(baselinePath)
    const current  = readPNG(currentPath)

    if (baseline.width !== current.width || baseline.height !== current.height) {
      results.push({
        file,
        status: 'SKIP',
        reason: `dimension mismatch — baseline ${baseline.width}×${baseline.height} vs current ${current.width}×${current.height}`,
      })
      continue
    }

    const { width, height } = baseline
    const total = width * height
    const diffPNG = new PNG({ width, height })

    const mismatch = pixelmatch(
      baseline.data,
      current.data,
      diffPNG.data,
      width,
      height,
      { threshold: 0.1 },
    )

    fs.writeFileSync(diffPath, PNG.sync.write(diffPNG))

    const ratio = mismatch / total
    const pct   = (ratio * 100).toFixed(3) + '%'
    const status: Status =
      ratio < THRESHOLD_PASS ? 'PASS' :
      ratio < THRESHOLD_WARN ? 'WARN' :
      'FAIL'

    results.push({ file, status, pixels: mismatch, total, pct })
  }

  // Summary table
  const SEP  = '─'.repeat(68)
  const COL1 = 26
  const COL2 = 10
  const COL3 = 12
  const COL4 = 12

  console.log(`\n${SEP}`)
  console.log('VISUAL DIFF REPORT')
  console.log(SEP)
  console.log(
    'File'.padEnd(COL1) +
    'Status'.padEnd(COL2) +
    'Pixels'.padEnd(COL3) +
    'Difference'.padEnd(COL4),
  )
  console.log(SEP)

  for (const r of results) {
    const label  = diffLabel(r.status)
    const pixels = r.pixels !== undefined ? String(r.pixels) : '—'
    const pct    = r.pct ?? (r.reason ?? '—')
    console.log(
      r.file.padEnd(COL1) +
      label.padEnd(COL2) +
      pixels.padEnd(COL3) +
      pct.padEnd(COL4),
    )
    if (r.reason && r.status === 'SKIP') {
      console.log(`${''.padEnd(COL1)}↳ ${r.reason}`)
    }
  }

  console.log(SEP)

  const counts = { PASS: 0, WARN: 0, FAIL: 0, SKIP: 0 }
  for (const r of results) counts[r.status]++

  console.log(
    `${counts.PASS} passed  ${counts.WARN} warnings  ${counts.FAIL} failed  ${counts.SKIP} skipped`,
  )
  console.log(SEP + '\n')

  if (counts.FAIL > 0) process.exit(1)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
