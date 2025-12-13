import {
    oid,
    utf8,
    integer,
    set,
    sequence,
    bitString,
    specific,
    octetString,
    CONSTRUCTED,
    CONTEXT_SPECIFIC,
    BOOLEAN,
    SEQUENCE,
    OCTETSTRING,
    OID,
    CONTEXT_SPECIFIC,
    utctime,
    generaltime,
    True,
    Null,
    INTEGER,
} from "../basic/ASN_1";
var crypto = require("node:crypto");


// 5. 解析 TimeStampResp (提取 TSTInfo)
function parseTimestampResp(derResp) {
    // 参考 https://github.com/CyberMind-FR/MeshCentral/blob/a05215e9bfd2e9dc9598345ad5517747f349b4d4/authenticode.js
    const SignedData = decodeASN1(derResp);
    if (SignedData.type !== SEQUENCE) throw new Error('无效数据');
    var [signedDataOid, signedContent] = SignedData.children;
    if (signedDataOid.type !== OID || signedDataOid.value !== "1.2.840.113549.1.7.2") throw new Error('无 SignedData');
    // require('fs').writeFileSync(require("path").join(__dirname, 'pe-sign_res_temp.js'), decodeASN1(encodeASN1(contentInfo)).toString());
    if (signedContent.class !== CONTEXT_SPECIFIC || signedContent.type !== 0) throw new Error('SignedData 上下文错误');
    const [signedData] = signedContent.children;
    // eContent: TSTInfo OCTET STRING in signedData.children[1].children[1] (encapContentInfo).children[1]
    var tsaCerts = signedData.children[3];
    var tsaSigner = signedData.children[4];
    return {
        tokenRaw: signedData.buff,  // DER bytes for embedding
        tsaCerts,
        tsaSigner,
    };
}

async function requestStamp(data) {
    const hash = crypto.createHash("sha256").update(Buffer.from(data)).digest();
    const http = require("http");
    const nonce = Math.random() * 0x100000000 >>> 0;

    // 构建微软 SpcTimeStampRequest 并编码为 DER
    // SpcTimeStampRequest ::= SEQUENCE {
    //   version INTEGER,
    //   messageImprint DigestInfo,
    //   requestPolicy OID OPTIONAL,
    //   nonce INTEGER OPTIONAL,
    //   certReq BOOLEAN DEFAULT FALSE
    // }
    const spcReq = sequence(// 4, 123
        oid("1.2.840.113549.1.7.1"),
        set(// 5, 108
            octetString(hash)
        )
    );

    // 在外层加上微软 SpcTimeStampRequest OID
    const reqSeq = sequence(
        oid("1.3.6.1.4.1.311.3.2.1"),
        sequence(
            oid("1.2.840.113549.1.7.1"),
            specific(
                octetString(data)
            )
        )
    );
    const reqBody = Buffer.from(reqSeq).toString("base64");

    var res = await new Promise(function (ok, oh) {
        var req = http.request({
            method: "POST",
            host: "timestamp.digicert.com",
            port: 80,
            headers: {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/octet-stream',
                "Content-Length": reqBody.length,
            }
        }, function (resp) {
            var chunks = [];
            resp.on('data', function (buff) {
                chunks.push(buff);
            });
            resp.on('end', function () {
                if (resp.statusCode === 200) ok(Buffer.from(String(Buffer.concat(chunks)), "base64"));
                else oh(resp.statusCode + " " + Buffer.concat(chunks));
            });
            resp.on("error", function (e) {
                console.error(`无法访问时间戳服务器，生成签名异常，错误代码：${e.status}`);
                oh(e)
            })
        });
        // 直接发送二进制 DER（不要 base64 编码）
        req.end(reqBody);
    });
    return parseTimestampResp(res);
}
// 构建 SignerIdentifier (issuerAndSerialNumber 示例：简化，用 serialNumber)

// 构建 SignerInfo
async function buildSignerInfo(contentHash, privateKey, cert) {
    // 构建 SignedAttributes (SET { type=messageDigest OID, value=OCTET STRING hash })
    var authenticatedAttributes = specific(// SignedData.SingerInfo.authenticatedAttributes
        // 已认证属性集合（SET OF Attribute），
        // 这些属性会被签名，
        // 包括内容类型、消息摘要等。
        // 在 PE 签名中，
        // 常包含 SpcIndirectDataContent（指向 PE 文件的间接数据）。
        sequence(// 7, 16 //
            /* 在数字签名中嵌入软件发布者或签名者的可读元数据，帮助验证信任链和归属 */
            oid("1.3.6.1.4.1.311.2.1.12"),//spcPublisherAttr
            set(// 8, 2
                sequence(// 9, 0
                )
            )
        ),
        sequence(// 7, 25
            /* contentType（内容类型）的标准 OID */
            oid("1.2.840.113549.1.9.3"),// contentTypeAttr
            set(// 8, 12
                /* 微软软件发布 (SPC) 代码签名扩展，用于标识 SignedData 的内容类型 */
                oid("1.3.6.1.4.1.311.2.1.4")
            )
        ),
        sequence(// 7, 28
            /* 在 Authenticode 签名上下文中，用于标识软件发布语句类型（statement types），如个体代码签名或商业代码签名 */
            oid("1.3.6.1.4.1.311.2.1.11"),//spcStatementTypeAttr
            set(// 8, 14
                sequence(// 9, 12
                    /* 标识扩展密钥用法 (EKU) 用于个人软件发布者代码签名证书 */
                    oid("1.3.6.1.4.1.311.2.1.21")
                )
            )
        ),
        sequence(
            oid("1.2.840.113549.1.9.4"), // messageDigest OID
            set(
                octetString(contentHash)// sha256(SignedData.contentInfo.content)
            )
        )
    );
    var authenticatedAttributesBuff = Buffer.from(authenticatedAttributes);
    authenticatedAttributesBuff[0] = 0x31;
    var authenticatedHash = crypto.createHash('sha256').update(authenticatedAttributesBuff).digest();
    var decryptedDigest = Buffer.from(sequence(// 1, 33 
        sequence(// 2, 9
            oid("2.16.840.1.101.3.4.2.1"),
            Null
        ),
        octetString(authenticatedHash)
    ));
    var cryptedDigest = crypto.privateEncrypt(privateKey, decryptedDigest);
    var { tsaCerts, tsaSigner } = await requestStamp(cryptedDigest);
    const signerInfos = sequence(
        integer(1),// version
        sequence(// 6, 40 issuerAndSerialNumber
            sequence(// 7, 20
                set(// 8, 18
                    sequence(// 9, 16
                        /* 是 commonName（简称 CN）的标准 OID */
                        oid("2.5.4.3"),
                        utf8(cert.issuerCn)
                    )
                )
            ),
            integer(cert.serial)
        ),
        sequence(//DigestAlgorithmIdentifier用于计算内容和已认证属性的摘要（哈希）算法
            oid("2.16.840.1.101.3.4.2.1"),//，只 OID (SHA256)
            Null,
        ),
        authenticatedAttributes,// SingedData.SingerInfo.authenticatedAttributes

        sequence(
            /* rsaEncryption（RSA 加密算法）的标准 OID */
            oid("1.2.840.113549.1.1.1"),
            Null,
        ),
        octetString(cryptedDigest),// SingedData.SingerInfo.encryptedDigest=crypt(sha256(SignedData.SingerInfo.authenticatedAttributes))
        ASN1(CONTEXT_SPECIFIC | BOOLEAN | CONSTRUCTED, // [1] IMPLICIT UnsignedAttributes
            sequence( // 时间戳属性 (Attribute)
                oid("1.2.840.113549.1.9.6"),
                tsaSigner.buff,
            )
        )
    );
    return [signerInfos, tsaCerts];
}



// 主函数：生成 PKCS#7 SignedData DER
async function generatePKCS7(fileHash, privateKey, cert) {
    // var signature = signDigest(fileHash, privateKey);
    var contentInfo = Buffer.concat([//6
        sequence(//7
            oid('1.3.6.1.4.1.311.2.1.15'),// SpcPeImageData 用于标识和描述 PE 文件的映像数据。
            sequence(// 8, 9
                bitString([0]),
                specific(// 9, 4
                    ASN1(CONTEXT_SPECIFIC | INTEGER | CONSTRUCTED, [128, 0])
                )
            )
        ),
        sequence(//7
            sequence(//8 DigestAlgorithmIdentifier
                oid("2.16.840.1.101.3.4.2.1"), // sha256标识
                Null
            ),
            octetString(fileHash)// pe文件哈希值
        )
    ].map(a => Buffer.from(a)));
    var contentHash = crypto.createHash('sha256').update(contentInfo).digest();
    const [signerInfo, tsaCerts] = await buildSignerInfo(contentHash, privateKey, cert);
    var certDer = cert.der;
    const SignedData = sequence(//1
        oid("1.2.840.113549.1.7.2"),// 已签名数据 SignedData
        specific(//2
            sequence(//3
                integer(1),// 版本，整数，表示版本。v1 用于简单签名，v3 支持扩展属性。
                set(//4 // digestAlgorithms 列出用于哈希计算的算法 OID
                    sequence(// 5
                        oid("2.16.840.1.101.3.4.2.1"), // sha-256
                        Null,
                    )
                ),
                sequence(//4 encapContentInfo
                    oid("1.3.6.1.4.1.311.2.1.4"),// SpcIndirectDataContent 封装内容
                    specific(//5 SignedData.contentInfo.content
                        sequence(
                            contentInfo
                        )
                    )
                ),
                // certificates 证书链
                specific(
                    certDer, tsaCerts.data
                ),
                // crls 吊销信息忽略
                set(//4 signerInfos
                    signerInfo
                ),
            )
        )
    );
    // console.log(`生成 PKCS#7 DER 长度: ${SignedData.length} 字节`);
    // contentInfo.sign = signature;
    return SignedData;
}
