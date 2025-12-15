// PE 解析函数（从前文修正版）
function parsePE(buffer) {
    if (buffer.readUInt16LE(0) !== 0x5A4D) throw new Error('Invalid DOS header');
    const e_lfanew = buffer.readUInt32LE(0x3C);
    if (e_lfanew < 0x40 || e_lfanew > buffer.length - 0x100) throw new Error('Invalid NT header offset');

    const ntMagic = buffer.slice(e_lfanew, e_lfanew + 4);
    if (ntMagic.toString('ascii') !== 'PE\0\0') throw new Error('Invalid PE signature');

    const fileHeaderStart = e_lfanew + 4;
    const fileHeader = buffer.slice(fileHeaderStart, fileHeaderStart + 20);
    var numberOfSections = fileHeader.readUInt16LE(2);
    const sizeOfOptionalHeader = fileHeader.readUInt16LE(16);

    const optionalStart = e_lfanew + 24;
    const optionalHeader = buffer.slice(optionalStart, optionalStart + sizeOfOptionalHeader);
    var sectionTableStart = optionalStart + sizeOfOptionalHeader;
    var sectionsHeader = buffer.slice(sectionTableStart, sectionTableStart + numberOfSections * 40);
    var sections = [];
    for (var cx = 0, dx = sectionsHeader.length; cx < dx;) {
        var sectionHeader = sectionsHeader.subarray(cx, cx += 40);
        var sectionStart = sectionHeader.readUInt32LE(20);
        var sectionSize = sectionHeader.readUInt32LE(16);
        var name = String(sectionHeader.subarray(0, 8));
        sections.push({ name, start: sectionStart, size1: sectionHeader.readUInt32LE(8), size: sectionSize });
    }
    const magic = optionalHeader.readUInt16LE(0);
    const isPE32 = magic === 0x010B;
    const isPE32Plus = magic === 0x020B;
    if (!isPE32 && !isPE32Plus) throw new Error('Unsupported PE magic');

    const numberOfRvaOffset = isPE32 ? 92 : 108;
    const dataDirOffset = optionalStart + (isPE32 ? 96 : 112);
    const checksumOffset = optionalStart + 64;

    const numberOfRvaAndSizes = optionalHeader.readUInt32LE(numberOfRvaOffset);
    if (numberOfRvaAndSizes > 16) throw new Error('Invalid NumberOfRvaAndSizes');
    // 证书表：DataDirectory[4] RVA 和 Size（偏移 dataDirOffset + 32）
    const certDirOffset = dataDirOffset + 4 * 8;  // index 4 * 8
    let certTableRVA = buffer.readUInt32LE(certDirOffset);
    let certTableSize = buffer.readUInt32LE(certDirOffset + 4);
    // 如果 Size=0，新签名：分配在文件末尾
    if (certTableSize === 0) {
        certTableRVA = buffer.length;  // 新 RVA = 当前文件末尾
        certTableSize = 0;  // 暂设 0，后更新
    }

    const certTableOffset = certTableRVA;  // Authenticode: RVA 即文件偏移
    return {
        checksumOffset,
        fileHeader,
        sectionsHeader,
        sectionTableStart,
        numberOfSections,
        sections,
        optionalHeader,
        numberOfSections,
        certDirOffset,  // 用于更新 DataDir
        certTableSize,
        certTableOffset,
        dataDirOffset,
        e_lfanew,
        sizeOfOptionalHeader,
        isPE32,
        optionalStart,
        numberOfRvaAndSizes
    };
}