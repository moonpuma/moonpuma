import { createRequire } from 'module'
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { resolve, basename, join } from 'path'

const require = createRequire(import.meta.url)
const SVGSpriter = require('svg-sprite')

const root = new URL('..', import.meta.url).pathname
const iconsDir = resolve(root, 'src/shared/ui/icons')

const spriter = new SVGSpriter({
  dest: resolve(root, 'public'),
  shape: {
    id: { generator: '%s' },
  },
  mode: {
    symbol: {
      dest: '.',
      sprite: 'icon-sprite.svg',
    },
  },
  svg: {
    xmlDeclaration: false,
    doctypeDeclaration: false,
    namespaceIDs: true,
    namespaceClassnames: false,
  },
})

function findSvgFiles(dir) {
  const entries = readdirSync(dir)
  const files = []

  for (const entry of entries) {
    const full = join(dir, entry)
    
    if (statSync(full).isDirectory()) {
      files.push(...findSvgFiles(full))
    } else if (entry.endsWith('.svg')) {
      files.push(full)
    }
  }

  return files.sort()
}

const files = findSvgFiles(iconsDir)
const iconNames = []

for (const file of files) {
  const name = basename(file)
  iconNames.push(basename(file, '.svg'))
  spriter.add(resolve(file), name, readFileSync(file, 'utf-8'))
}

spriter.compile((error, result) => {
  if (error) {
    console.error(error)
    process.exit(1)
  }
  for (const type of Object.values(result)) {
    for (const resource of Object.values(type)) {
      writeFileSync(resource.path, resource.contents)
      console.log(`Generated: ${resource.path} (${resource.contents.length} bytes)`)
    }
  }

  const lines = iconNames.map((n) => `  | '${n}'`)
  const typesContent = `export type IconName =\n${lines.join('\n')}\n`
  const typesPath = resolve(root, 'src/shared/ui/icons/icon-names.ts')
  writeFileSync(typesPath, typesContent)
  console.log(`Generated: ${typesPath} (${iconNames.length} icons)`)
})
