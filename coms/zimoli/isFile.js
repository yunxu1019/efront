var { File } = window;
function isFile(a) {
    if (File) {
        return a instanceof File;
    }
}