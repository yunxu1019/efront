/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var x6 = angular.module("x6", ["ngAnimate", "wyh"]);
x6.run(["api", "alert", "user", function (api, alert, user) {
        window.api = api;
        //\u914d\u7f6e\u63a5\u53e3
        var baseURL = "http://192.168.1.198/x3.0/api";
        var isDebug = /^https?:\/\/192.168.1./.test(baseURL);
        api.base = baseURL;
        api.onprevent = alert.warn;
        user.isLogin = function () {
            return api.headers.token;
        };
        api.headers.token = user().tokenid;
        user.login = function (data) {
            data.id = data.tokenid.split(":")[0];
            api.headers.token = data.tokenid;
            api.base = data.url + "/api";
            api("/x6/getcurruser.do", "\u83b7\u53d6\u7528\u6237\u4fe1\u606f").onsuccess(function (result) {
                var info = result.VO || result;
                info.user_id = info.id;
                delete info.id;
                for (var k in info) {
                    data[k] = info[k];
                }
                user(data);
            });
        };
        user.logout = function () {
            console.log("\u9000\u51fa\u767b\u5f55\uff01");
            api.base = baseURL;
            api.headers.token = "";
            user(null);
        };
        api.onerror = function (message, level) {
            switch (level) {
                case 0:
                    alert.warn(message);
                    break;
                default:
                    alert.error(message);
            }
        };
    }]);

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


x6.filter('cache', ["cache", function (cache) {
    var tree = {};
    return function (value, key, name) {
        name = name || 'name';
        if (tree[key]) {
            var v = tree[key];
            if (v[value]) {
                return v[value];
            }
        }
        if (cache[key]) {
            var v = {}, bm = {};
            var list = cache[key];
            list.forEach(function (o) {
                if (o.id) {
                    v[o.id] = o[name];
                    if (o.bm) {
                        v[o.bm] = o[name];
                    }
                }
            });
            tree[key] = v;
            if (v[value]) {
                return v[value];
            }
        }
        return value;
    };
}]);
yjkj.filter("spfilter",function(){
	return function(obj,type){
		var array=[];
		for(var i=0;i<obj.length;i++){
			if(obj[i].pztype==type){
				array.push(obj[i]);
			}
		}
		return array;
	}
});
yjkj.filter("qxfilter",function(){
	return function(input,type){
		//console.log(input)
		var array=[];
		for(var i=0;i<input.length;i++){
			if(input[i].lx==type){
				array.push(input[i]);
			}
		}
		console.log(array)
		return array;
	}
});
yjkj.filter("shopfilter",function(){
	return function(input,bm){
		//console.log(input)
		var array=[];
		for(var i=0;i<input.length;i++){
			if(input[i].bm.indexOf(bm)!=-1){
				array.push(input[i]);
			}
		}
		//console.log(array)
		return array;
	}
});
yjkj.filter("yysfilter",function(){
    return function(input,type){
        //console.log(input)
        var array=[];
        for(var i=0;i<input.length;i++){
            if(input[i].lx==type){
                array.push(input[i]);
            }
        }
        //console.log(array)
        return array;
    }
});
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


x6.filter("posname",function(){
    return function(posList){
        return posList&&posList.map(function(pos){
            return pos.name;
        }).join(",");
    };
});
x6.service("album",["$timeout", function($timeout){
	function createAlbum(imgs,point){
		var _w=document.body.offsetWidth;
		var div=document.createElement("div");
		var close=document.createElement("div");
		var album=document.createElement("div");
		var img=document.createElement("img");
		var left=document.createElement("i");
		var right=document.createElement("i");
		div.style.width="100%";
		div.style.height="100%";
		div.style.background="rgba(0,0,0,.6)";
		div.style.display="flex";
		div.style.justifyContent="center";
		div.style.alignItems="center";
		div.style.position="absolute";
		div.style.top=0;
		div.style.left=0;
		div.style.transform="translateY(100%)";
		div.style.zIndex=9;
		div.style.transition="all .1s ease-out";
		album.style.width="100%";
		album.style.maxWidth="1000px";
		album.style.height="100%";
		album.style.maxHeight="600px";
		album.style.margin='0 20px';
		album.style.padding='30px 0';
		album.style.boxSizing="border-box";
		album.style.background="#000";
		album.style.borderRadius="5px";
		album.style.display="flex";
		album.style.alignItems="center";
		album.style.position="relative";
		img.style.height="100%";
		img.style.display="block";
		img.style.margin="0 auto";
		left.style.fontSize='35px';
		left.style.color='#fff';
		left.style.cursor='pointer';
		right.style.fontSize='35px';
		right.style.color='#fff';
		right.style.cursor='pointer';
		left.className='fa fa-chevron-circle-left';
		right.className='fa fa-chevron-circle-right';
		close.style.width='30px';
		close.style.height='30px';
		close.style.position='absolute';
		close.style.top='5px';
		close.style.right='5px';
		close.style.backgroundImage='url(./img/close.png)';
		close.style.backgroundSize='100%';
		close.style.cursor='pointer';
		close.style.transition='background-position .2s';
		img.setAttribute("src",imgs[point].url);
		album.appendChild(img);
		album.appendChild(close);
		//div.appendChild(left);
		div.appendChild(album);
		//div.appendChild(right);
		//div.appendChild(close);
		return div;
	}
	this.browse=function(imgs,index){
		var point=index;
		var length=imgs.length;
		var container=createAlbum(imgs,point);
		document.body.appendChild(container);
		$timeout(function(){
			container.style.transform="translateY(0)";
		});
		container.getElementsByTagName('div')[0].getElementsByTagName('div')[0].onclick=function(){
			container.style.transform='translateY(100%)';
			container.addEventListener('transitionend',function(){
				document.body.removeChild(container);
			});
		}
		container.getElementsByTagName('div')[0].onmousemove=function(e){
			var _w=container.getElementsByTagName('div')[0].offsetWidth;
			//console.log(_w)
			//console.log(e)
			if(e.layerX<_w/2-10){
				//console.log(e.offsetX)
				container.getElementsByTagName('div')[0].style.cursor='url(./img/left.ico),pointer';
				container.getElementsByTagName('div')[0].onclick=function(){
					point--;
					if(point<0)
						point=length-1;
					container.getElementsByTagName('img')[0].setAttribute("src",imgs[point].url);
				}
			}else{
				//console.log(e.offsetX)
				container.getElementsByTagName('div')[0].style.cursor='url(./img/right.ico),pointer';
				container.getElementsByTagName('div')[0].onclick=function(){
					point++;
					if(point>length-1)
						point=0;
					container.getElementsByTagName('img')[0].setAttribute("src",imgs[point].url);
				}
			}
		}
		//container.style.transition="all .3s"
	}
}])

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


x6.service("cache", ["api", "storage", function (api, storage) {
    var CACHE_NAME = "DATA_CACHE";
    var cache = storage.get(CACHE_NAME) || {};//\u6bcf\u4e2a\u4f1a\u8bdd\u91cd\u65b0\u52a0\u8f7d\u6570\u636e
    cache.clear = function () {
        for (var k in cache) {
            delete cache[k];
        }
        cache.save();
    };
    cache.save = function () {
        storage.set(CACHE_NAME, cache);
    };
    cache.apply = function (data) {
        angular.extend(cache, data);
        cache.save();
    };
    cache.refresh = function () {
        api("/x6/getAllCache.do", {}).success(function (result) {
            cache.apply(result);
        });
    };
    return cache;
}]);
yjkj.service('clone',function(){
	function cloneObject(obj){
		if(typeof obj!='object'){
			return obj;
		}
		if(obj==null){
			return obj;
		}
		var newObj={};
		for(var k in obj){
			newObj[k]=Object.prototype.toString.call(obj[k])==='[object Object]'?cloneObject(obj[k]):obj[k];
		}
		return newObj;
	}
	this.object=cloneObject;
})

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


x6.service('menus', ["storage", function (storage) {
    var menu = {
    };
    var menus = function (_menu) {
        if (_menu) {
            angular.extend(menu, _menu);
        }
        return menu;
    };
    return menus;
}]);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.service('mime', function () {
    var mime = {
        doc: [
            "application/msword:doc|dot",
            "application/rtf:rtf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document:docx",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.template:dotx",
            "application/vnd.ms-word.document.macroEnabled.12:docm",
            "application/vnd.ms-word.template.macroEnabled.12:dotm",
            "application/kswps:wps|wpt|wpso|wpsx|wptx"//\u91d1\u5c71\u7684\u6a21\u677f\u6587\u4ef6\u6ca1\u6709mime\u7c7b\u578b
        ],
        xls: [
            "application/vnd.ms-excel:xla|xlc|xlm|xls|xlt|xltx|xlw",
            "application/vnd.ms-excel.sheet.binary.macroEnabled.12:xlsb",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:xlsx",
            "application/vnd.ms-excel.sheet.macroEnabled.12:xlsm",
            "application/vnd.ms-excel.template.macroEnabled.12:xltm",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:xlsx",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.template:xltx",
            "application/kset:et|ett|eto|etx|ettx"//\u91d1\u5c71\u7684\u6a21\u677f\u6587\u4ef6\u6ca1\u6709mime\u7c7b\u578b
        ],
        pptx: [
            "application/vnd.ms-powerpoint:pot|pps|ppt",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation:pptx",
            "application/vnd.openxmlformats-officedocument.presentationml.template:potx",
            "application/vnd.openxmlformats-officedocument.presentationml.slideshow:ppsx",
            "application/vnd.ms-powerpoint.presentation.macroEnabled.12:pptm",
            "application/vnd.ms-powerpoint.slideshow.macroEnabled.12:ppsm",
            "application/vnd.ms-powerpoint.template.macroEnabled.12:potm",
            "application/ksdps:dps|dpt|dpss|dpso|dpsx|dptx"//\u91d1\u5c71\u7684\u6a21\u677f\u6587\u4ef6\u6ca1\u6709mime\u7c7b\u578b
        ],
        pdf: ["application/pdf:pdf"],
        png: [
            //\u56fe\u50cf\u6587\u4ef6\u5ef6\u65f6\u592a\u91cd
            //"image/*:bmp|dib|png|cod|gif|ief|jpeg|jpe|jpeg|jpg|jfif|svg|tiff|tiff|ras|cmx|ico|pnm|pbm|pgm|ppm|rgb|xbm|xpm|xwd"
            "image/bmp:bmp",
            "image/gif:gif",
            "image/png:png",
            "image/jpeg:jpe|jpeg|jpg"
        ]
    };
    var getReg = function (regs) {
        return new RegExp("\.(" + regs.join("|") + ")$");
    };
    var gen = function () {
        var args = [].slice.apply(arguments, [0]);
        var regs = [];
        var accepts = [];
        var _reflect = {};
        args.forEach(function (k) {
            var v = mime[k];
            v.forEach(function (v) {
                var s = v.split(":");
                s[1].split("|").forEach(function (v) {
                    _reflect[v] = k;
                    regs.push(v);
                });
                accepts.push(s[0]);
            });
        });
        return {
            reg: getReg(regs),
            accept :accepts.join(","),
            reflect:_reflect
        };
    };
    return gen;
});
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


x6.service('tasks', ["storage", function (storage) {
    var taskname = "TASKS";
    var tasks=storage.get(taskname) || {};
    var routine = function () {
        var keys = Object.keys(tasks||{});
        return keys[keys.length - 1];
    }();
    var result = function (_tasks) {
        if (!routine) {
            throw "no routines!";
        }
        var q = _tasks || tasks[routine] || [];
        delete tasks[routine];
        tasks[routine] = q;
        return q;
    };
    result.routine = function (_routine) {
        routine = _routine;
        return result;
    };
    result.on = function (task) {
        var q = result.off(task);
        q.splice(0, 0, task);
        result.save();
        return q;
    };
    result.hit = function (task, friend) {
        var q = result();
        for (var dec = q.length - 1; dec >= 0; dec--) {
            var qdec = q[dec];
            if (qdec === friend || qdec.name === friend.name) {
                q.splice(dec + 1, 0, task);
                break;
            }
        }
        result.save();
        return q;
    };
    result.count = function () {
        var obj = {};
        for (var k in result) {
            obj[k] = result[k].length;
        }
        return obj;
    };
    result.off = function (task) {
        var q = result();
        for (var dec = q.length - 1; dec >= 0; dec--) {
            var qdec = q[dec];
            if (qdec === task || qdec.name === task.name) {
                q.splice(dec, 1);
            }
        }
        result.save();
        return q;
    };
    result.save = function () {
        storage.set(taskname,tasks);
    };
    return result;
}]);
yjkj.service('vertify',function(){
	return function(array,obj){
		var container=document.getElementsByClassName("popup-factory")[0].getElementsByClassName("Scroller-Container")[0];
		var domArray=document.getElementsByClassName("popup-factory")[0].getElementsByClassName("Scroller-Container")[0].children;
		for(var i=0;i<array.length;i++){ 
			if(!obj[array[i].name]){
				var point=getLocation(domArray[array[i].index].getElementsByTagName("div")[0]);
				createTips(point,array[i].msg,array[i].position);
				container.addEventListener('click',removeMsg);
				return false;
			}else{
				removeMsg();
			}
		}
		return true;
	}
	function getLocation(target){
		var top=target.getBoundingClientRect().top;
		var left=target.getBoundingClientRect().left;
		return {
			top:top,
			left:left
		}
	}
	function createTips(point,msg,position){
		if(document.getElementById("errorMsg")){
			return ;
		}
		var p=document.createElement("p");
		p.setAttribute("id","errorMsg");
		p.style.position="absolute";
		p.style.width=278+"px";
        p.style.height=28+"px";
        p.style.background="#ffefef";
        p.style.top=point.top+"px";
		//p.style.top=point.top+18+"px";
		p.style.left=point.left+"px";
		p.style.color="red";
		p.style.zIndex="999999999";
		p.innerText=msg;
		document.body.appendChild(p);
		return p;
	}
	function removeMsg(){
		if(document.getElementById("errorMsg")){
			document.body.removeChild(document.getElementById("errorMsg"));
		}
	}
})
