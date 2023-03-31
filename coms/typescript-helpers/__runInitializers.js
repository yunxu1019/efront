/**
 * typescript:runInitializers
 * 这个文件由工具生成，请不要手动修改
 * 
 * Efront Authors
 * 2023-03-31T13:49:30.678Z
 */
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};