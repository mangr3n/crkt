import { execSync } from 'child_process'
import { beforeAll } from 'vitest'
import { existsSync, unlinkSync } from 'fs'
import { join } from 'path'

const clearLockFile = () => {
  const lockFile = join(process.cwd(), '.bsb.lock')
  if (existsSync(lockFile)) {
    unlinkSync(lockFile)
  }
}

beforeAll(() => {
  // Clear any stale lock file
  clearLockFile()
  
  try {
    // Initial compilation
    execSync('npx rescript clean && npx rescript build', { 
      stdio: 'inherit',
      timeout: 10000 // 10 second timeout
    })
  } catch (error) {
    console.error('ReScript compilation failed:', error)
    throw error
  }
})

// Set up file watcher for .res files
if (process.env.VITEST_WATCH_MODE) {
  const { watch } = require('fs')
  let compileTimeout: NodeJS.Timeout | null = null

  watch('./src', { recursive: true }, (eventType: string, filename: string) => {
    if (filename?.endsWith('.res')) {
      // Debounce compilation
      if (compileTimeout) {
        clearTimeout(compileTimeout)
      }
      compileTimeout = setTimeout(() => {
        console.log('ReScript file changed, recompiling...')
        clearLockFile()
        try {
          execSync('npx rescript build', { stdio: 'inherit' })
        } catch (error) {
          console.error('ReScript compilation failed:', error)
        }
      }, 100)
    }
  })
}
