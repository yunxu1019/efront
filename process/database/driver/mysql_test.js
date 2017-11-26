"use strict";
describe("database_test", function () {
    require("../process/setupenv");
    var database;
    before(function () {
        var Database = require("./");
        database = new Database;
    })
    it("init", function () {
        return database.init();
    });
    it("delete_tables", function () {
        return database.delete();
    });
    it("create_tables", function () {
        return database.create();
    });
    it("delete_userinfo_table",function(){
        // return database.delete(database.entities.userinfo);
    });
    it("update_tables",function(){
        // return database.update();
    });
    it("insert into userinfo",function(){

    });
    it("select from userinfo",function(){

    });
    it("update userinfo",function(){

    });
    it("delete from userinfo",function(){

    });
});