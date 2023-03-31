/**
 * typescript:setFunctionName
 * 这个文件由工具生成，请不要手动修改
 * 
 * Efront Authors
 * 2023-03-31T13:49:30.678Z
 */
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};