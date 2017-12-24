var ia32 = {
    AX:"",
    BX:"",
    mov() {
        return Buffer.from([0x66, 0x8b, 0xc3]);
    }
};
module.exports = function (cpu) {
    return ia32;
};