#!/usr/bin/env -S ts-node --files

import { run } from 'typed-css-modules';
import { readFile } from 'fs/promises';
import less from 'less';

async function transform(path: string): Promise<string> {
  if (path.endsWith('.css')) {
    return await readFile(path, 'utf8');
  } else if (path.endsWith('.less')) {
    const lessText = await readFile(path, 'utf8');
    const lessRenderOutput = await less.render(lessText, {
      filename: path,
      sourceMap: {
        sourceMapFileInline: true,
        sourceMapRootpath: process.cwd(),
      },
    });
    return lessRenderOutput.css
  } else {
    throw new Error(`Unknown file type: ${path}`);
  }
}

run('.', {
  pattern: 'src/**/*.(css|less)',
  watch: process.argv.includes('--watch'),
  namedExports: process.argv.includes('--namedExports'),
  declarationMap: true,
  transform,
});
