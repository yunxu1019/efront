"use strict";
describe("table_test",function(){
    var table
    it("init",function(){
        table=require("./table");
        var user=new table("user");
        console.log(user);
    });
});