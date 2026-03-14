import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from '../src/App.jsx'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const distPath = path.join(rootDir, 'dist', 'index.html')

async function run() {
  const template = await fs.readFile(distPath, 'utf-8')

  const appHtml = renderToString(
    <React.StrictMode>
      <StaticRouter location="/">
        <App />
      </StaticRouter>
    </React.StrictMode>
  )

  const finalHtml = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  )

  await fs.writeFile(distPath, finalHtml, 'utf-8')
  console.log('Pre-rendered / successfully')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})