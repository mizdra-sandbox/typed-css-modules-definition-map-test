import DtsCreator from 'typed-css-modules';
import { readFile } from 'fs/promises';
import less from 'less';

const creator = new DtsCreator();

async function gen(path: string, lang: 'css' | 'less') {
  let cssText: string;
  if (lang === 'css') {
    cssText = await readFile(path, 'utf8');
  } else {
    const lessText = await readFile(path, 'utf8');
    const lessRenderOutput = await less.render(lessText, {
      filename: path,
      sourceMap: {},
    });
    cssText = lessRenderOutput.css;
  }
  console.log({ cssText });

  const dtsContent = await creator.create(path, cssText);
  console.log(dtsContent.tokens); // ['myClass']
  console.log(dtsContent.formatted); // 'export const myClass: string;'
  dtsContent.writeFile(); // writes this content to "src/style.css.d.ts"
}

gen('src/css/basic.module.css', 'css');
// gen('src/less/basic.module.less', 'less');
