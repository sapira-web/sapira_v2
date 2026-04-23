import { chromium } from 'playwright'
import path from 'path'
import fs from 'fs'

const URL = 'http://localhost:3001'

const VIEWPORTS = [
  { name: 'mobile',         width: 375,  height: 812  },
  { name: 'mobile-large',   width: 430,  height: 932  },
  { name: 'tablet',         width: 768,  height: 1024 },
  { name: 'desktop',        width: 1440, height: 900  },
  { name: 'large-desktop',  width: 1728, height: 1117 },
]

function getMode(): 'baseline' | 'current' {
  const arg = process.argv.find((a) => a.startsWith('--mode='))
  const value = arg?.split('=')[1]
  if (value === 'baseline') return 'baseline'
  return 'current'
}

async function run() {
  const mode = getMode()
  const OUT_DIR = path.resolve(process.cwd(), 'qa-screenshots', mode)

  fs.mkdirSync(OUT_DIR, { recursive: true })

  console.log(`\nMode: ${mode}`)
  console.log(`Output: ${OUT_DIR}\n`)

  const browser = await chromium.launch()

  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
    })

    await page.goto(URL, { waitUntil: 'networkidle' })
    await page.waitForLoadState('load')

    const file = path.join(OUT_DIR, `home-${vp.name}.png`)
    await page.screenshot({ path: file, fullPage: true })
    console.log(`✓ home-${vp.name}.png  (${vp.width}×${vp.height})`)

    await page.close()
  }

  await browser.close()

  console.log(`\n✓ ${VIEWPORTS.length} screenshots saved to qa-screenshots/${mode}/`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
