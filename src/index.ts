import basicStyle from './less/basic.module.less';
import importStyle from './less/import.module.less';

export const a = 1;
export const b = 'text';

console.log(basicStyle.someStyles);
console.log(basicStyle.nestedClass);
console.log(basicStyle.nestedAnother);

console.log(importStyle.foo);
console.log(importStyle.bar);
console.log(importStyle.clearfix);
