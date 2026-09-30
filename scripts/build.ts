import {fileURLToPath} from 'node:url';

import {build} from 'tsdown';

const rootDir = new URL('../', import.meta.url);
const distDir = new URL('./dist/', rootDir);

await build({
  config: false,
  cwd: fileURLToPath(rootDir),
  entry: [fileURLToPath(new URL('./src/index.ts', rootDir))],
  tsconfig: fileURLToPath(new URL('./src/tsconfig.json', rootDir)),
  outDir: fileURLToPath(distDir),
  format: 'esm',
  platform: 'neutral',
  target: 'esnext',
  dts: true,
  minify: true,
  clean: true,
});

for (const file of ['./README.md', './LICENSE']) {
  await Bun.write(new URL(file, distDir), Bun.file(new URL(file, rootDir)));
}

const pkg = await Bun.file(new URL('./package.json', rootDir)).json();

delete pkg.private;
delete pkg.scripts;
delete pkg.devDependencies;
pkg.main = './index.js';
pkg.types = './index.d.ts';
pkg.exports = {
  '.': {
    types: './index.d.ts',
    default: './index.js',
  },
};

await Bun.write(new URL('./package.json', distDir), JSON.stringify(pkg, null, 2) + '\n');
