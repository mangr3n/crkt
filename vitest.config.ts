import { defineConfig } from 'vitest/config'
import { execSync } from 'child_process'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['__tests__/**/*.{js,ts,res}'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,res}'],
      exclude: ['**/*.d.ts', '**/*.bs.js']
    },
    watchExclude: ['**/*.bs.js'],
    deps: {
      inline: [/@rescript/]
    },
    setupFiles: ['./vitest.setup.ts']
  }
})
