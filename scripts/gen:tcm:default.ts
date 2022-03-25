import DtsCreator from 'typed-css-modules';
import syntax from 'postcss-less';
import postcss from 'postcss';
import { readFile } from 'fs/promises';
import postcssPresetEnv from 'postcss-preset-env';
import postcssMixins from 'postcss-mixins';

const path = 'src/less/basic.module.less';

const creator = new DtsCreator();
const processor = postcss([postcssMixins, postcssPresetEnv({stage: 0}) as any]);

async function main() {
  const lessText = await readFile(path);
  const result = await processor.process(lessText, { syntax, from: path });
  const cssText = result.content;
  console.log({cssText});

  const dtsContent = await creator.create(path, cssText);
  console.log(dtsContent.tokens); // ['myClass']
  console.log(dtsContent.formatted); // 'export const myClass: string;'
  dtsContent.writeFile(); // writes this content to "src/style.css.d.ts"
}

main();
