const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function replaceInDir(dir, search, replace) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath, search, replace);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes(search)) {
        content = content.replaceAll(search, replace);
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

// Just an example of how I can do bulk replacements
replaceInDir(srcDir, "import { useStore } from '@/store/store';", "import { useAppStore, useThemeStore, useAIStore } from '@/store/store';\nconst useStore = (sel) => {\n  const app = useAppStore();\n  const theme = useThemeStore();\n  const ai = useAIStore();\n  return { ...app, ...theme, ...ai };\n}; // fallback");
