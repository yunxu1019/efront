"use strict";
var fs = require("fs");
var path = require("path");
var entity_folder = "./entity/";
var entity_path = path.join(__dirname, entity_folder);
var entities = {};
/**
 * 预置方法
 */
Database.prototype = {
    __create_table_structure() {
        var entity_name = this.entity_name;
        var prototype = this.prototype;
        var fields = Object.keys(prototype).map((key) => {
            var field = prototype[key];
            if (field instanceof Object)
                return;
            switch (typeof field) {
                case "string":
                    var value = +field;
                    if (value > 0 && value < 0x3fff)
                        return `${key} VARCHAR(${value})`;
                    if (field && !value)
                        return `${key} ${field}`;
                    return `${key} TEXT`
                    break;
                case "number":
                    var value = parseInt(field);
                    if (value === field) {
                        if (value >= 16)
                            return `${key} VARCHAR(${value})`;
                        if (value >= 10)
                            return `${key} BIGINT`;
                        if (value >= 5)
                            return `${key} INT`;
                        if (value >= 2)
                            return `${key} SMALLINT`;
                        if (value > 0)
                            return `${key} TINYINT`;
                        throw "Unknown integer type:" + field
                    } else if (value > 0) {
                        var decimal = +field.toString().split(".")[1];
                        if (value < decimal) throw "decimal's digits should be less than whole number's!";
                        return `${key} DECIMAL(${value},${decimal})`;
                    }
                    throw "Unknown number type!";
                    break;
                case "boolean":
                    return `${key} BOOLEAN`;
                    break;
                case "object": //null
                    return `${key} BLOB`
                    break;
            }
        }).filter(a => a).join(",\r\n\t");
        if (!fields) return Promise.resolve();
        var sql_string = `CREATE TABLE ${entity_name} (\r\n\t${fields}\r\n)ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
        return this.__execute_sql_string(sql_string);
    },
    __update_table_structure() {
        var entity_name
    },
    __execute_sql_string(sql_string, ...args) {
        console.log(sql_string);
        return new Promise((ok, oh) => connection_pool.query(sql_string, args, function (error, result, fields) {
            if (error) oh(error);
            ok({
                result,
                fields
            });
        }));
    },
    __execute_sql_strings(sql_strings) {
        var index = 0;
        var execute = () => {
            if (index >= sql_strings.length)
                return;
            return this.__execute_sql_string(sql_strings[index++]).then(execute);
        };
        return Promise.resolve(execute());
    }
};
/**
 * 读取存储类
 */
fs.readdirSync(entity_path).forEach(function (filename) {
    if (!/\.js$/i.test(filename)) return;
    var entity_name = filename.replace(/\.js$/, "");
    var entity = require(entity_folder + filename);
    Object.assign(entity, Database.prototype);
    entities[entity_name] = entity;
    entity.entity_name = entity_name;
});
var connection_pool;

function Database(db_name = process.env.DB_DATABASE) {
    this.entities = entities;
    this.database = db_name;
    this.init = function init() {
        if (!connection_pool) {
            var mysql = require("mysql");
            /**
             * 连接数据库
             */
            connection_pool = mysql.createPool({
                connectionLimit: 10,
                host: process.env.DB_HOST,
                user: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE
            });
        }
        return new Promise((ok, oh) => connection_pool.getConnection((err, connection) => err ? oh(err) : ok(connection)));
    };
    this.delete = function () {
        var sql_string = `SELECT table_name FROM information_schema.\`TABLES\` WHERE table_schema='${db_name}';`;
        return this.__execute_sql_string(sql_string).then(({
            result
        }) => {
            var sql_strings = result.map(({
                table_name
            }) => `DROP TABLE ${table_name};`);
            return this.__execute_sql_strings(sql_strings);
        });
    };
    this.create = function () {
        var entities = Object.keys(this.entities).map(k => this.entities[k]);
        var cx = 0;
        var create = function () {
            if (cx >= entities.length) return;
            return entities[cx++].__create_table_structure().then(create);
        }
        return Promise.resolve(create());
    };
    this.update = function () {
        var sql_string = `SELECT table_name FROM information_schema.\`TABLES\` WHERE table_schema='${db_name}';`;
        this.__execute_sql_string(sql_string).then(function ({
            result
        }) {
            var sql_strings = [];
            result.map(({
                table_name
            }) => {
                if (!this.entities[table_name]) return `DROP TABLE ${table_name};`;

            });
        });
        var sql_string = ``;
    };
    this.select = function () {
        var sql_string = ``
    };
    this.execute = function (sql_string, ...args) {
        if (sql_string instanceof Array) return this.__execute_sql_strings(sql_string);
        else return this.__execute_sql_string(sql_string, ...args);
    }
}
module.exports = Database;