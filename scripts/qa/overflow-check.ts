import { chromium } from 'playwright'

const URL = 'http://localhost:3001'

const VIEWPORTS = [
  { name: 'mobile',         width: 375,  height: 812  },
  { name: 'mobile-large',   width: 430,  height: 932  },
  { name: 'tablet',         width: 768,  height: 1024 },
  { name: 'desktop',        width: 1440, height: 900  },
  { name: 'desktop-large',  width: 1728, height: 1117 },
]

interface OverflowingElement {
  tag: string
  id: string
  classes: string
  right: number
  overflowBy: number
}

async function run() {
  const browser = await chromium.launch()
  let totalIssues = 0

  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
    })

    await page.goto(URL, { waitUntil: 'networkidle' })
    await page.waitForLoadState('domcontentloaded')

    const result = await page.evaluate(() => {
      const bodyOverflow = document.body.scrollWidth > window.innerWidth
      const overflowing: OverflowingElement[] = []

      document.querySelectorAll('*').forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.right > window.innerWidth) {
          const htmlEl = el as HTMLElement
          overflowing.push({
            tag: htmlEl.tagName.toLowerCase(),
            id: htmlEl.id || '',
            classes: Array.from(htmlEl.classList).slice(0, 4).join(' '),
            right: Math.round(rect.right),
            overflowBy: Math.round(rect.right - window.innerWidth),
          })
        }
      })

      return { bodyOverflow, innerWidth: window.innerWidth, scrollWidth: document.body.scrollWidth, overflowing }
    })

    const label = `[${vp.name} ${vp.width}×${vp.height}]`
    const hasIssues = result.bodyOverflow || result.overflowing.length > 0

    if (!hasIssues) {
      console.log(`✓ ${label} no overflow`)
    } else {
      totalIssues++
      console.log(`\n✗ ${label} OVERFLOW DETECTED`)

      if (result.bodyOverflow) {
        console.log(`  body.scrollWidth (${result.scrollWidth}px) > innerWidth (${result.innerWidth}px) — overflow by ${result.scrollWidth - result.innerWidth}px`)
      }

      if (result.overflowing.length > 0) {
        console.log(`  ${result.overflowing.length} overflowing element(s):`)
        for (const el of result.overflowing) {
          const selector = [el.tag, el.id && `#${el.id}`, el.classes && `.${el.classes.replace(/ /g, '.')}`]
            .filter(Boolean)
            .join('')
          console.log(`    — <${selector}>  right: ${el.right}px  overflow by: ${el.overflowBy}px`)
        }
      }
    }

    await page.close()
  }

  await browser.close()

  console.log('\n' + '─'.repeat(48))
  if (totalIssues === 0) {
    console.log('✓ All viewports passed — no horizontal overflow.')
  } else {
    console.log(`✗ ${totalIssues} viewport(s) have overflow issues.`)
    process.exit(1)
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
