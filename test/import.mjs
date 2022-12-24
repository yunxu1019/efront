// node --experimental-modules=enabled ./test/import.mjs
;; import { readFile as rf } from "fs"; import * as path from "path";
export * from "fs";
import fs from "fs.js";
var a = 2, f;
export default a;
export var b = 2;
export { fs as a };
console.log(rf, path, fs, c, b);
export class c { }
export var a = 1, b = 2, c = 3, q;