import { execSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const QA_DIR = path.dirname(fileURLToPath(import.meta.url))

const SEP  = '─'.repeat(56)
const SEP2 = '═'.repeat(56)

type Status = 'pass' | 'fail'

interface StepResult {
  name:   string
  status: Status
  label:  string
}

function run(name: string, file: string, args = ''): StepResult {
  const scriptPath = path.join(QA_DIR, file)
  const cmd = `npx tsx "${scriptPath}"${args ? ' ' + args : ''}`

  console.log(`\n▶  ${name}`)
  console.log(SEP)

  try {
    execSync(cmd, { stdio: 'inherit' })
    return { name, status: 'pass', label: '✓ PASS' }
  } catch {
    return { name, status: 'fail', label: '✗ FAIL' }
  }
}

console.log(`\n${SEP2}`)
console.log('QA PIPELINE')
console.log(SEP2)

const results: StepResult[] = [
  run('Screenshots (current)',  'screenshots.ts',    '--mode=current'),
  run('Overflow Check',         'overflow-check.ts'                  ),
  run('Visual Diff',            'visual-diff.ts'                     ),
]

// Summary
const passed = results.filter((r) => r.status === 'pass').length
const failed = results.filter((r) => r.status === 'fail').length

console.log(`\n${SEP2}`)
console.log('SUMMARY')
console.log(SEP2)

const COL1 = 32
const COL2 = 10

for (const r of results) {
  console.log(r.name.padEnd(COL1) + r.label.padEnd(COL2))
}

console.log(SEP2)
console.log(`${passed} passed  ${failed} failed`)
console.log(SEP2 + '\n')

if (failed > 0) process.exit(1)
