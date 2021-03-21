var fetchPiece = function (url, start, end, onprocess) {
    var xhr = new XMLHttpRequest;
    xhr.open("get", url);
    xhr.responseType = "arraybuffer";
    xhr.setRequestHeader("Range", `bytes=${start}-${end - 1}`);
    xhr.send();
    xhr.onload = function () {
        onprocess(new Uint8Array(this.response), start);
    }
};
var getFile = function (url, onprocess) {
    var xhr = new XMLHttpRequest;
    xhr.open("get", url);
    xhr.responseType = "arraybuffer";
    xhr.onreadystatechange = function (a) {
        if (this.readyState === 4 && this.response) {
            return onprocess(new Uint8Array(this.response), 0, + this.getResponseHeader("Content-Length"));
        }
        var a = +this.getResponseHeader("Content-Length");
        if (a) {
            this.abort();
            onprocess(null, 0, a);
        }
    };
    xhr.send();
};

function test_file_parse() {
    // https://xiph.org/flac/format.html
    // https://blog.csdn.net/yu_yuan_1314/article/details/9491763
    var type = refilm`
    type 7bit [
      streaminfo{
        "min block size" int16
        maxblocksize int16
        minframesize int24
        maxframesize int24
        采样率/rate int20
        声道数/channels 3bit/raise
        采样位数  5bit/raise
        单声道采样数 int36
        原始信号签名/md5 128bit
      }
      padding 1bit
      application {
        id 32bit
        data -1bit
      }
      [seektable,cys=0]{
        序号/id 8byte/int
        偏移量/pyl 8byte/int
        采样数/cys 2byte/int
      }
      vorbis_commen{
        vender_length 32bit/small
        vender_text :vender_length/str
        user_length 32bit/small
        [user_comments] :user_length{
          length 32bit/small
          comment :length/str
        }
  
      }
      cuesheet{
        catalog 128bytes
        number  8bytes/int
        isdisc  1bit/bool
        padding 2071bits/zero
        songs_count 8bit
      }
      picture{
        type 32bit/int
        mime_length 32bit/int
        mime_text :mime_length/str
        description_length 32bit/int
        description_text :description_length/str
        width 32bit/int
        height 32bit/int
        color_depth 32bit/int
        colors_used 32bit/int
        data_length 32bit/int
        data_bunary :data_length
      }
      ...reserved
      无效
    ]
  `[0];
    console.log(type);
    var flac = refilm`
      f/flac 4B=fLaC/str
      [metas,isend=true]{
        isend 1bit/bool
        ${type}
        blocksize 24bit/int
        /meta_body -blocksize
        / .type
      }
      [frames]{
        code 14bit=0b11111111111110
        reserved1 1bit/bool
        blocking_strategy 1bit/bool
        blocksize int4 [,192,0b0010-0101:(576<<(@-2)),@,@,0b1000-1111:256<<(@-8)]
        sample_rate int4 [reserved,88.2,176.4,192,8,16,22.05,24,32,44.1,48,96,@,@,@,invalid]
        channel int4
        sample_size int3 [@,8,12,@,16,20,24,@]
        reserved2 1bit/bool
        coded_number utf8
        (blocksize,blocksize=0b0110) raise8
        (blocksize,blocksize=0b0111) raise16
        (sample_rate,0b0011) int8
        (sample_rate,0b1101,1110) int16
        crc int8
        [subframe] :blocksize{
          zero_padding int1
          subframe_type int6 [subframe_constant,subframe_verbatim,0b1000-1100:subframe_fixed,0b100000-111111:subframe_lpc]
          order =(subframe_type&0b11111)+1
          wasted_persample int1
          (wasted,wasted_persample=1) unary1
          (subframe_constant,subframe_type=0b000000) :sample_size
          (subframe_verbatim,subframe_type=0b000001) :sample_size*blocksize
          (subframe_fixed,subframe_type=0b001100,0010xx) :sample_size*order
          (subframe_lpc,subframe_type=0b1xxxxx) {
            [warmup] :order{
              / :sample_size
            }
            precision raise4
            shift_needed int5
            [confficients] :order{
              / :precision
            }
          }
          (resdual,subframe_type=0b1xxxxx,001100,0010xx) {
            coding_method int2 [rice,rice2]
            porder int4
            pcount =1<<porder
            psamples =blocksize>>porder
            [partions] :pcount{
              (params,coding_method=0) int4
              (params,0b1111) int5
              (params,coding_method=1) int5
              (params,0b11111) int5
              n =porder===0?blocksize-order:$index!==0?psamples:psamples-order
              data :n
            }
          }
  
        }
        foot_crc int16
      }
  `;
    flac.parse = refilm_parse;
    var flacurl = "/@/data/liangliang.flac";
    getFile(flacurl, function (data, start, total) {
        if (data) {
            console.log(data);
            var parsed = flac.parse(data);
            console.log(parsed);
        } else {

            fetchPiece(flacurl, start, 46000, function (data) {
                console.log(data);
                var parsed = flac.parse(data);
                console.log(parsed);
            })
        }
    });
    console.log(flac);
}
var console = window.console;
test_file_parse();