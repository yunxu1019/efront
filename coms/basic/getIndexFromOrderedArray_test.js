if (getIndexFromOrderedArray([0, 0, 0], 0) !== 2) {
    throw new Error("expect getIndexFromOrderedArray([0,0,0],0) to be equal 2");
}
if (getIndexFromOrderedArray([0, 1, 2], 0) !== 0) {
    throw new Error("expect getIndexFromOrderedArray([0,1,2],0) to be equal 0");
}
if (getIndexFromOrderedArray([1, 2, 3], 0) !== -1) {
    throw new Error("expect getIndexFromOrderedArray([1,2,3],0) to be equal -1");
}
if (getIndexFromOrderedArray([1, 2, 3], 2) !== 1) {
    throw new Error("expect getIndexFromOrderedArray([1,2,3],2) to be equal 1");
}