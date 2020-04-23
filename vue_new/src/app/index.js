// app entry
import add from './myModule';

console.log('hello, world');

console.log(add(3, 3));
const a = { a: 1, b: 2 };
console.log({ ...a });
const b = null;
const x = b ?? 1;
console.log(a?.c?.d);
console.log(x);

Promise.resolve();
