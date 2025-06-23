import * as fs from 'fs';
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const contentPath = path.join(__dirname, "content")
const outputPath = path.join(contentPath, 'index.md');

function generateIndex(): void {
  const folders = fs.readdirSync(contentPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('_'))
    .map(dirent => dirent.name);

  const lines = [
    '# Index',
    '',
    ...folders.map(folder => `- [${folder.charAt(0).toUpperCase() + folder.slice(1)}](/${folder})`)
  ];

  fs.writeFileSync(outputPath, lines.join('\n'), 'utf8');
  console.log(`✅ Index generated at ${outputPath}`);
}

generateIndex();