"use strict";
/**
 * object转buffer
 * @param {Object} object 
 */
var object2buffer = function (object) {
    var id = object.id;
    delete object.id;
    var id_flag;
    if (typeof id === "number") {
        id = String(id);
        id_flag = id.length << 1;
    } else {
        id = id + "";
        id_flag = id.length << 1 + 1;
    }
    if (id_flag >= 256) throw new Error("Id data is too large!");
    var body = Buffer.from(JSON.stringify(object));
    var length = body.length;
    if (length >= 8192) throw new Error("object data is too large!");
    var ah = length >> 8;
    var al = length - (ah << 8);
    var head = Buffer.from([id]);
    return Buffer.concat([
        Buffer.from([0]),
        Buffer.from([id_flag]),
        Buffer.from([ah]),
        Buffer.from([al]),
        head,
        body
    ]);
};
/**
 * buffer转object
 * @param {Buffer} buffer 
 */
var buffer2object = function (buffer) {
    var id_flag = buffer[1];
    var ah = buffer[2] << 3 >> 3;
    var al = buffer[3];
    var head_length = id_flag >> 1;
    var head = buffer.slice(4, head_length + 4);
    var body_length = (ah << 8) + al;
    var body = buffer.slice(head.length, body_length + head_length + 4);
    var id;
    if (id_flag >> 1 << 1 === id_flag) {
        //number
        id = +head;
    } else {
        //string
        id = head;
    }
    var object = Object.parse(String(body));
    object.id = id;
    return object;
};
/**
 * 索引序列化
 * @param {Object} index_object 
 */
var index2buffer = function (index_object) {
    var index_array = Object.keys(index_array);
    var index_sizes = index_array.map(a => a.length);
    var size_buffer = Buffer.from(index_sizes);
    var data_buffer = Buffer.from(index_array.join(""));
    var data_length = data_buffer.length;
    var size_length = size_buffer.length;
    return Buffer.concat([
        size_buffer,
        data_buffer,
        Buffer.from([size_length >> 24, size_length << 8 >> 24, size_length << 16 >> 24, size_length << 24 >> 24]),
        Buffer.from([data_length >> 24, data_length << 8 >> 24, data_length << 16 >> 24, data_length << 24 >> 24]),
    ]);
};
/**
 * 索引反序列化
 * @param {Buffer} index_buffer 
 */
var buffer2index = function (index_buffer) {
    var index_length = index_buffer.length;
    var [size1, size2, size3, size4] = index_buffer.slice(index_length - 8, index_length - 4);
    var [data1, data2, data3, data4] = index_buffer.slice(index_length - 4, index_length - 0);
    var size_length = (size1 << 24) + (size2 << 16) + (size3 << 8) + size4;
    var data_length = (data1 << 24) + (data2 << 16) + (data3 << 8) + data4;
    if (size_buffer + data_length + 8 > index_length) throw new Error("invaild index buffer!");
    var size_buffer = index_buffer.slice(index_length - size_length - data_length - 8, index_length - data_length - 8);
    var data_buffer = data_buffer.slice(index_length - data_length - 8, index_length - 8);
    var sum = 0;
    size_buffer.forEach(a => sum += a);
    if (sum !== data_length) throw new Error("invaild index format!");
    var index_object = {}, index = 0, sum_size = 0;
    size_buffer.forEach(function (size) {
        var key = data_buffer.slice(sum_size, sum_size += size);
        index_object[String(key)] = index += 8192;
    });
    return index_object;
};


var fs = require("fs");
var path = require("path");
var __balance_directory = process.env.__BALANCE_DIRECTORY || "./data/balance";
var __balance_directory_inited;
var access_queue = [];//所有读写操作共享一个队列

var initBalanceDirectory = function () {
    if (__balance_directory_inited) return Promise.resolve(__balance_directory_inited);
    else return __balance_directory_inited = new Promise(function (ok, oh) {
        var __balance_directory = this.__balance_directory;
        fs.exists(__balance_directory, function (exists) {
            if (exists) ok(__balance_directory);
            else fs.mkdir(__balance_directory, function (error) {
                if (error) oh(error);
                else ok(__balance_directory);
            });
        });
    }).then(function (__balance_directory) {
        return new Promise(function (ok, oh) {
            fs.stat(__balance_directory, function (stat) {
                if (stat.isDirectory()) ok(__balance_directory);
                else oh(new Error("__balance_directory exists but is not a directory!"));
            });
        });
    }).then(function (__balance_directory) {
        __balance_directory_inited = __balance_directory;
    });
};
/**
 * 合并输入到buffer
 * @param {Buffer} dst_buffer 
 * @param {Buffer} src_buffer 
 */
var merge_buffer = function (dst_buffer, src_buffer) {
    if (src_buffer.length >= dst_buffer.length) return src_buffer;
    src_buffer.copy(dst_buffer, 0, 0, src_buffer.length);
    return dst_buffer;
}

/**
 * 文件访问
 * @param {integer} handle 文件句柄
 * @param {integer} index 访问偏移量
 * @param {Buffer} buffer 为Buffer时是写操作，不存在是读操作
 */
var access = function (handle, index, buffer) {
    if (access_queue.length > 200000) return Promise.reject("please wait for a time!");
    var that = this;
    var is_read_access = arguments.length === 2;
    return new Promise(function (ok, oh) {
        if (!that.access_cache[index]) that.access_cache[index] = [];
        var access_cache = that.access_cache[index];
        if (access_cache.length && is_read_access && access_cache[access_cache.length - 1].length === 3) {
            //the last time is write access
            return ok(access_cache[access_cache.length - 1][2]);
        }
        access_cache.push(is_read_access ? [ok, oh] : [ok, oh, buffer]);
        if (access_cache.length > 1) return;
        that.init().then(function (handle) {
            that.handle = handle;
            access_queue.push([index, that]);
            if (access_queue.length > 1) return;
            var runner = function () {
                do {
                    var [index, that] = access_queue[0];
                    var access_caches = that.access_cache;
                    if (access_caches[index]) break;
                    access_queue.shift();
                } while (access_queue.length);
                if (!access_queue.length) return runner = null;
                var handle = that.handle;
                var is_read_access = access_caches[index][0].length === 2;
                if (is_read_access) {
                    var read_size = 0, upblank_size = 0, downblank_size = 0;
                    do {
                        if (upblank_size > 8192 && downblank_size > 8192) break;
                        index -= 8192;
                        read_size += 16384;
                        var access_cache = access_caches[index];
                        if (!access_cache || access_cache.length < 1 || access_cache[0].length !== 2) {
                            upblank_size += 8192;
                        } else {
                            upblank_size = 0;
                        }
                        var access_cache = access_caches[index + read_size];
                        if (!access_cache || access_cache.length < 1 || access_cache[0].length !== 2) {
                            downblank_size += 8192;
                        } else {
                            downblank_size = 0;
                        }
                    } while (read_size < 0xffffff);
                    index += upblank_size;
                    read_size -= upblank_size + downblank_size;
                    var buffer = new Buffer(read_size);
                    fs.read(handle, buffer, 0, buffer.length, index, function (err, buffer) {
                        for (var cx = index, dx = index + read_size; cx < dx; cx += 8192) {
                            var access_array = access_cache[cx];
                            if (!access_array || !access_array.length || access_array[0].length !== 2) continue;
                            if (access_array[access_array.length - 1].length === 2) {
                                delete access_cache[cx];
                            } else {
                                access_cache[cx] = access_array.splice(access_array.length - 1, 1);
                                access_queue.push([cx, that]);
                            }
                            var _buffer = buffer.slice(cx, cx + 8192);
                            access_array.forEach(function ([ok, oh]) {
                                if (err) oh(err);
                                else ok(_buffer);
                            });
                            access_queue.shift();
                        }
                        runner();
                    });
                } else {
                    var write_size = 0, upblank_size = 0, downblank_size = 0;
                    do {
                        if (upblank_size > 0 && downblank_size > 0) break;
                        index -= 8192;
                        write_size += 16384;
                        var access_cache = access_caches[index];
                        if (upblank_size || !access_cache || access_cache.length < 1 || access_cache[0].length !== 3) {
                            upblank_size += 8192;
                        }
                        var access_cache = access_caches[index + write_size];
                        if (downblank_size || !access_cache || access_cache.length < 1 || access_cache[0].length !== 3) {
                            downblank_size += 8192;
                        }
                    } while (write_size < 0xffffff);
                    index += upblank_size;
                    write_size -= upblank_size + downblank_size;
                    var buffer = new Buffer(write_size);
                    for (var cx = index, dx = index + write_size; cx < dx; cx += 8192) {
                        var access_array = access_cache[cx];
                        var temp_buffer = new Buffer(0);
                        access_array.forEach(function (buffered_array) {
                            var buffer = buffered_array.splice(2, 1)[0];
                            temp_buffer = merge_buffer(temp_buffer, buffer);
                        });
                        temp_buffer.copy(buffer, cx - index, 0, temp_buffer.length);
                    }
                    fs.write(handle, buffer, 0, buffer.length, index, function (err) {
                        for (var cx = index, dx = index + write_size; cx < dx; cx += 8192) {
                            var access_array = access_cache[cx];
                            if (!access_array || !access_array.length || access_array[0].length !== 2) continue;
                            if (access_array[access_array.length - 1].length === 2) {
                                delete access_cache[cx];
                            } else {
                                access_cache[cx] = access_array.splice(access_array.length - 1, 1);
                                access_queue.push([cx, that]);
                            }
                            var _buffer = buffer.slice(cx, cx + 8192);
                            access_array.forEach(function ([ok, oh]) {
                                if (err) oh(err);
                                else ok(_buffer);
                            });
                            access_queue.shift();
                        }
                        runner();
                    });
                }
            };
            setTimeout(runner);
        }).catch(oh);
    });
}

/**
 * 表
 * @param {string} tablename 
 */
function Table(tablename) {
    if (typeof this !== "object") throw new Error("call Table from new please!");
    this.tablename = tablename;
    this.access_cache = {};
};

Table.prototype = {

    /**
     * 初始化文件句柄
     */
    init() {
        var that = this;
        if (this.inited) return Promise.resolve(this.inited);
        else return this.inited = new Promise(function (ok, oh) {
            initBalanceDirectory().then(function (__balance_directory) {
                var __balance__table = path.resolve(__balance_directory, that.tablename);
                fs.open(__balance__table, function (error, handle) {
                    if (error) return oh(error);
                    process.on("beforeExit", function () {
                        fs.close(that.inited);
                    });
                    ok(that.inited = handle);
                });
            }).catch(oh);
        });
    },

    /**
     * 文件访问缓冲
     */
    access_cache: {},
    /**
     * 读
     * @param {number} index 
     */
    read(index) {
        return access.call(this, index);
    },

    /**
     * 写
     * @param {number} index 
     * @param {Buffer} buffer 
     */
    write(index, buffer) {
        return access.call(this, index, buffer);
    },

    select(id) {
        if (this.index_object) {
            var index = this.index_object[id];
            if (index) return this.read(index);
        }
        return new Promise(function (ok, oh) {
            var load = function (scale, offset) {
                read(offset).then(function (buffer) {
                    var string = String(buffer);
                    var value = string.slice(62, 62 << 1);
                    if (value === id) return ok(value);
                    if (value < id) {
                        offset = scale + offset;
                    } else {
                        offset = scale + offset + 1;
                    }
                    load(scale + scale, offset);
                }).catch(oh);
            };
            load(1, 0);
        });
    },
    insert(object) {
        var id = object.id;
        var _buffer = object2buffer(object);
        return new Promise(function (ok, oh) {
            var load = function (scale, offset) {
                read(offset).then(function (buffer) {
                    var string = String(buffer);
                    var value = string.slice(62, 62 << 1);
                    if (value === id) return write(value);
                    var is_left_balance = buffer[0];
                    if (value < id) {
                        if (is_left_balance) {
                            var temp = _buffer;
                            _buffer = buffer;
                            return write(_buffer).then()
                        }
                        offset = scale + offset;
                    } else {
                        offset = scale + offset + 1;
                    }
                    load(scale + scale, offset);
                }).catch(oh);
            };
            load(1, 0);
        });
    },

};