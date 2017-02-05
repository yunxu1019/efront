
const DEVELOP_PATH="develop";
const PUBLIC_PATH="public";
const FUNCTION_PATH="process";
// 修改路径基地址，或修改文件后缀
const set_path=(pre="./",aft="")=>{
	pre=pre&&pre.replace(/\/*$/,"/");
	aft=aft&&aft.replace(/^\/+/,"/");
	const build=(path)=>{
		if(typeof path==="string"){
			path=pre&&path[0]!=='/'&&path[1]!==':'?pre+path:path;
			path=aft?path.replace(/\/*$/,"")+aft:path;
			return path;
		}
		if(path instanceof Array){
			path=[];
		}else if(typeof path==="object"){
			path=Object.create(path.__proto__);
		}
		for(let k in path){
			path[k]=build(path[k]);
		}
		return path;
	};
	return build;
};
// 在public模式下，去掉debug信息，压缩编译，生成文档
var public_mode=false;
// 加载依赖函数库
var functions=function(FUNCTION_PATH){
	var ARROW_ARG = /^([^\(]+?)=>/;
	var FN_ARGS = /^[^\(]*\(\s*([^\)]*)\)/m;
	var FN_ARG_SPLIT = /,/;
	var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
	var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
	var fs=require("fs");
	const read=function(dir){
		if(!fs.existsSync(dir)){
			return false;
		}
		var stat=fs.lstatSync(dir);
		if(stat.isDirectory()){
			let result={};
			fs.readdirSync(dir).forEach(d=>result[d.replace(/\.js$/,"")]=null);
			return result;
		}
		return String(fs.readFileSync(dir));
	};
	const seek=function(...dirs){
		var result=this;
		for(let dir of arguments){
			if(!result){
				if(result!==null){
					throw "不存在路径"+dirs.join("/");
				}
				return null;
			}
			result=result[dir];
		}
		return result;
	};
	const tree=read(FUNCTION_PATH);
	tree.__path__=FUNCTION_PATH;
	const get= function(name){
		var keys=name.replace(/[A-Z]/g,(match)=>"/"+match.toLowerCase()).split("/");
		if(!keys[0]){
			var tmp=this;
			let key0=keys[1];
			while(tmp&&tmp[key0]===undefined){
				tmp=tmp.__parent__;
			}
			if(!tmp){
				throw "找不到"+name;
			}
			keys.splice(0,1);
			return [tmp,keys];
		}
		return [tree,keys];
	};
	const init=function(string){
		var fnText = string.replace(STRIP_COMMENTS, ''),
			args = fnText.match(ARROW_ARG) || fnText.match(FN_ARGS);
			console.log(fnText)
		return [eval("(function(){return "+fnText+"}"+(args?"())":")")),args&&args[1]?args[1].split(FN_ARG_SPLIT):[]];
	};
	const build=function(name,onfinish=()=>{}){
		const that=this;
		const [object,keeys]=get.apply(that,[name]);
		const then=function(callback){
			onfinish=callback;
		}
		setTimeout(()=>{
			var realize=seek.apply(object,keeys);
			if(realize!==null){
				return onfinish(realize);
			}
			const key=keeys.splice(keeys.length-1)[0];
			const _init=()=>{
				const parent =seek.apply(object,keeys);
				let path=set_path(parent.__path__,".js")(key);
				let data=read(path);
				if(data===false){
					path=set_path(parent.__path__)(key);
					data=read(path);
				}
				if(typeof data ==="string"){
					let [f,base]= init(data);
					if(base instanceof Array){
						//单例模式
						let count=base.length;
						if(count===0){
							var res=f.apply(that,base);
							finish(parent,key,res);
							onfinish(res);
						}
						base.forEach((b,cx)=>{
							build(b)((res)=>{
								base[b]=res;
								if(count--!==1){
									return;
								}
								var data=f.apply(that,base);
								finish(parent,key,data);
								onfinish(res);
							});
						});
					}else{
						//常量模式
						finish(parent,key,f)
						onfinish(f);
					}
				}else {
					finish(parent,key,data);
					onfinish(data)
				}
			}
			if(seek.apply(object,keeys) instanceof Object){
				return _init();
			}else{
				return build(keeys.join("/"))(_init);
			}
		},0);
		return then;
	}
	const finish=function(parent,key,data){
		data.__parent__=parent;
		data.__path__=set_path(parent.__path__,"")(key);
		parent[key]=data;
	};
	return build;
}(FUNCTION_PATH);

// 提示任务
require("gulp").task('default',function(){
	console.log("你好！");
});
require("gulp").task("public",function(){
	public_mode=true;
});
require("gulp").task("test",function(){
	functions("isString")(function(isString){
		console.log(isString)
	console.log(isString("afd"),isString(23));
	})
});