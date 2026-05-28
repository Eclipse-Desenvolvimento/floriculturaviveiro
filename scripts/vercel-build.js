import { execSync } from 'child_process';
import { cpSync, mkdirSync, writeFileSync, existsSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// Run vite build
console.log('Building with Vite...');
execSync('npm run build', { cwd: root, stdio: 'inherit' });

// Create .vercel/output structure
const outputDir = join(root, '.vercel', 'output');
const functionsDir = join(outputDir, 'functions', '__server.func');
const staticDir = join(outputDir, 'static');

// Clean previous output
if (existsSync(outputDir)) {
  rmSync(outputDir, { recursive: true, force: true });
}

// Create directories
mkdirSync(functionsDir, { recursive: true });
mkdirSync(staticDir, { recursive: true });

// Copy static files from dist/client
console.log('Copying static files...');
cpSync(join(root, 'dist', 'client'), staticDir, { recursive: true });

// Copy public folder
if (existsSync(join(root, 'public'))) {
  cpSync(join(root, 'public'), staticDir, { recursive: true });
}

// Copy server files
console.log('Copying server function...');
cpSync(join(root, 'dist', 'server'), functionsDir, { recursive: true });

// Create config.json for Vercel output
const config = {
  version: 3,
  routes: [
    {
      src: '/assets/(.*)',
      headers: { 'Cache-Control': 'public, max-age=31536000, immutable' }
    },
    {
      src: '/produtos/(.*)',
      headers: { 'Cache-Control': 'public, max-age=31536000, immutable' }
    },
    {
      handle: 'filesystem'
    },
    {
      src: '/(.*)',
      dest: '/__server'
    }
  ]
};

writeFileSync(join(outputDir, 'config.json'), JSON.stringify(config, null, 2));

console.log('Vercel output ready at .vercel/output');
