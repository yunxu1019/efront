var yjkj = angular.module("wyh", []);
yjkj.run(["$rootScope", "storage", "popup", "alert", "$location", "$timeout", "views", "$document", "user", "back", function ($rootScope, storage, popup, alert, $location, $timeout, views, $document, user, back) {
    angular.extend($rootScope, {
        "popup": popup,
        "alert": alert,
        "user": user
    });
    var openedtimes = storage.get("openedtimes");
    if (!$location.path()) {
        openedtimes = 1;
    } else {
        if (typeof openedtimes === "number") {
            openedtimes++;
        } else {
            openedtimes = 1;
        }
    }
    var state = false;
    if (openedtimes === 1) {
        state = true;
        $document.ready(function () {
            location.hash = "";
            $timeout(function () {
                $location.path('/x6pt');
            });
        });
    }
    storage.set("openedtimes", openedtimes);
    back.pipe(function () {
        return views && views.main && views.main.back();
    },false);
    $rootScope.$on('$locationChangeStart', function (e, target) {
        if (state) {
            return;
        }
        var index = target.indexOf("#");
        if (index < 0 || index + 2 > target.length) {
            //\u7528\u6237\u70b9\u51fb\u8fd4\u56de\u7684\u4e8b\u4ef6
            back();
            e.preventDefault();
        }
    });
    $rootScope.$on('$locationChangeSuccess', function () {
        $document.ready(function () {
            state = false;
        });
    });
//    $document.on("selectstart", function (e) {
//        e.preventDefault();//\u7981\u6b62\u9009\u4e2d\u975e\u7f16\u8f91\u533a\u57df
//    });
}]);
yjkj.config(["$controllerProvider", "$compileProvider", "$filterProvider", "$provide", "$httpProvider", function ($controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider) {
    $provide.service('$register', function () {
        return {
            controller: $controllerProvider.register,
            has: $controllerProvider.has,
            directive: $compileProvider.directive,
            filter: $filterProvider.register,
            factory: $provide.factory,
            service: $provide.service
        };
    });

}]);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.directive('anniu', ["isie", function (isie) {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template: '<div class="anniu"><div></div><div ng-transclude></div><input ng-focus="ngFocus({$event:$event})" ng-blur="ngBlur({$event:$event})" ng-click="click($event)"></div>',
        scope: {
            inactive: '@',
            enabled: '=?',
            ngFocus: '&',
            ngBlur: '&',
            ngApi: '=?'
        },
        link: function (scope, elem, attr) {
            if (isie()) {
                var input=elem.children()[2];
                //\u4ec5ie\u4f7f\u7528\u53bb\u9664\u5149\u6807
                input.type = "button";
                //\u82f9\u679c\u4e0a\u8fd9\u4e48\u7528\u4f1a\u5931\u6548
            }
            var click = function () {
                if (scope.ngApi && scope.ngApi.ing) {
                    return;
                }
                scope.ngApi && scope.ngApi();
            };
            scope.$watch("ngApi.ing", function (ing) {
                if (ing) {
                    elem.addClass("ing");
                } else {
                    elem.removeClass('ing');
                }
            });
            var input = elem.children()[2];
            input.addEventListener("focus", function () {
                elem.addClass("focus");
            });
            input.addEventListener("blur", function () {
                elem.removeClass("focus");
            });
            scope.$watch(function () {
                return elem[0].innerText.trim();
            }, function (text) {
                if (text.length === 2) {
                    elem.addClass('space');
                } else {
                    elem.removeClass('space');
                }
            });
            elem.attr('ng-click', 'click()');
            if (attr.inactive === '' || attr.inactive) {
                elem.addClass('inactive');
            } else if (attr.green === '' || attr.green || attr.candidate === "" || attr.candidate) {
                elem.addClass("candidate");
            }
            scope.$watch(function () {
                if (elem.attr("enabled")) {
                    return false === scope.enabled;
                } else {
                    return attr.disabled === "" || attr.disabled;
                }
            }, function (a) {
                if (a) {
                    scope.click = function ($event) {
                        $event.stopPropagation();
                    };
                    elem.addClass("disabled");
                } else {
                    scope.click = click;
                    elem.removeClass('disabled');
                }
            });
        }
    };
}]);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.directive("baidu", ["alert", "getMatchList", function (alert, getMatchList) {
//    return function(scope,elem,attr){
//        var baidu=scope.$eval(attr.baidu);
//        var buidu_box=alert.point("<div class=baidu-box><div ng-repeat='t in tencent'><marker ng-if=$index<10 text=t.name mark=ngModel></marker></div></div>",elem[0],{scope:scope,height:300});
//        var add_button=alert.point("<div class=baidu-box-add></div>",elem[0],{scope:scope,height:elem[0].offsetHeight,width:elem[0].offsetHeight});
//        
//    };
    return {
        restrict: "E",
        template: function (elem, attr) {
            var color = attr.color || "ccc";
            var hover_color = attr.hoverColor || "f00";
            var active_color = attr.activeColor || "c22";
            return [
                "<div class='baidu'>",
                "<span class=hld ng-if='!ngModel' ng-style=style ng-bind='placeholder'></span>",
                "<input ng-class={'notreal':error_message} ng-model=ngModel ng-blur=blur() ng-focus=focus() />",
//                "<i icon=add color='" + color + "' hover-color='f00' active-color='" + active_color + "'></i>", //add
                "<i icon=search color='" + color + "' hover-color='" + hover_color + "' active-color='"+active_color+"'></i>", //search
                "</div>"
            ].join("");
        },
        replace: true,
        scope: {
            ngModel: "=?",
            source: "=?",
            onbaidu: "&",
            idKey: "@",
            field: "@"
        },
        link: function (scope, elem, attr) {
            var baidu_box = "<div class=baidu-list><div ng-repeat='t in tencent' ng-click=confirm(t) ng-class='{eql:t===model}'><marker text=t.name mark=ngModel></marker></div></div>";
            var search_box = alert.point(baidu_box, elem[0], {scope: scope, height: 360});
            var watch = function () {
                watch.cancel && watch.cancel();
                watch.cancel = scope.$watchGroup(["ngModel", "source"], function () {
                    var text = scope.ngModel;
                    var source = scope.source;
                    if (scope.onbaidu({$value: text}) === false) {
                        return;
                    }
                    var match_list = getMatchList(source, text || "", "name")//\u540d\u79f0\u3001\u52a9\u8bb0\u7801
                            .$onprocess(function (match_list, against_list) {
                                scope.tencent = match_list.slice(0, 10);
                            })
                            .$onend(function () {
                                scope.tencent = match_list.slice(0, 10);
                            })
                            .$init(scope.tencent);
                    if (text) {
                        if (!search_box.ing()) {
                            search_box.rebuild();
                        }
                    } else {
                        search_box.destroy();
                    }
                });
            };
            var children = elem.children();
            var input = children[children.length-2];
            var confirm = function (model) {
                watch.cancel && watch.cancel();
                search_box.destroy();
                scope.ngModel = model.name;
                var start = model.name;
                var watcher = scope.$watch("ngModel", function (model) {
                    if (start !== model) {
                        watcher();
                        watch();
                    }
                });
            };
            scope.confirm = confirm;
            input.onkeydown = function (event) {
                var code = event.which || event.code;
                if (code < 37 || code > 40) {//\u975e\u4e0a\u4e0b\u5de6\u53f3
                    if (code === 13 || code === 20) {
                        scope.model && confirm(scope.model);
                        scope.$apply();
                    }
                    return;
                }
                var source = scope.tencent || scope.source;
                var model = scope.model;
                if (!source) {
                    return;
                }
                switch (code) {
                    case 37://\u5de6
                        if (model !== source[0]) {
                            scope.model = source[0];
                        }
                        break;
                    case 38://\u4e0a
                        if (model !== source[0]) {
                            var flag = false;
                            for (var cx = 0, dx = source.length; cx < dx; cx++) {
                                if (source[cx] === model) {
                                    scope.model = source[cx - 1];
                                    flag = true;
                                    break;
                                }
                            }
                            if (!flag) {
                                scope.model = source[source.length - 1];
                            }
                        } else {
                            scope.model = scope.ngModel;
                        }
                        break;
                    case 39://\u53f3
                        if (model !== source[source.length - 1]) {
                            scope.model = source[source.length - 1];
                        }
                        break;
                    case 40://\u4e0b
                        if (model !== source[source.length - 1]) {
                            var flag = false;
                            for (var cx = source.length - 1; cx >= 0; cx--) {
                                if (source[cx] === model) {
                                    scope.model = source[cx + 1];
                                    flag = true;
                                    break;
                                }
                            }
                            if (!flag) {
                                scope.model = source[0];
                            }
                        } else {
                            scope.model = scope.ngModel;
                        }
                        break;
                }
                event.preventDefault();
                scope.$apply();
            };
            scope.blur = function () {
                watch.cancel && watch.cancel();
                search_box.destroy();
                elem.removeClass("focus");
            };
            scope.focus = function () {
                if (scope.ngModel && scope.ngModel !== scope.model) {
                    search_box.rebuild();
                }
                watch();
                elem.addClass("focus");
            };
            scope.tencent = [];
        }
    };
}]);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.directive('box', ["regexp", "$parse", "$compile", function (regexp, $parse, $compile) {
    var NG_GRID_REGEXP = regexp.NG_GRID;
    return {
        restrict: 'E',
        scope: {
            ngBox: '@',
            template: '=',
            width: '=',
            height: '=',
            rowMargin: '=',
            colMargin: '=',
            padding: "=",
            paddingLeft: "=",
            paddingTop: '=',
            paddingRight: '=',
            paddingBottom: '='
        },
        replace: true,
        transclude: true,
        template: function (elem, attr) {
            return  '<div class="box" ><scroll-content><div ng-style=style class="box-c c">' + '<div ng-repeat="a in appends" ng-style="genStyle($index)" ></div></div></scroll-content></div>';
        },
        compile: function (elem, attr, trans) {
            var pre = function (scope, elem, attr, ctrl, transclude) {
                var $scope = elem.scope();
                var _scope = $scope.$new();
                var padding = scope.padding || 20;
                padding = [padding, padding, padding, padding].join(" ").split(/\s+/g);
                var paddingLeft = parseInt(scope.paddingLeft || padding[3]);
                var paddingRight = parseInt(scope.paddingRight || padding[1]);
                var paddingTop = parseInt(scope.paddingTop || padding[0]);
                var paddingBottom = parseInt(scope.paddingBottom || padding[2]);
                scope.genStyle = function ($index) {
                    return _scope.genStyle($scope.$eval(dataName).length + $index);
                };
                _scope.genStyle = function ($index) {
                    var _style = {};
                    _style.width = parseInt(1000000 / colCount)/10000 + "%";
                    _style.height = height + 'px';
                    if ($index % colCount !== 0) {
                        _style.borderLeft = attr.grid;
                    }
                    if ($index < (rowCount - 1) * colCount) {
                        _style.borderBottom = attr.grid;
                    }
                    return _style;
                };
                scope.$watchGroup(['ngBox', 'template'], function () {
                    var ngBox = attr.ngBox;
                    var matchs = ngBox && ngBox.match(NG_GRID_REGEXP);
                    if (!matchs) {
                        throw 'ngBox\u683c\u5f0f\u4e0d\u6b63\u786e';
                    }
                    var repeat = angular.element("<div ng-repeat='" + ngBox + "' ng-style='genStyle($index)'></div>");
                    var template = scope.template;
                    repeat.html(template);
                    var repeater = elem[0].getElementsByClassName("box-c")[0];
                    $compile(repeat)(_scope);
                    repeater.insertBefore(repeat[0], repeater.childNodes[0]);
                    dataName = matchs[4];
                    setter = $parse(dataName).assign;
                    scope.$ScrollTopTo(0);
                });
                var dataName = "";
                var setter = null;
                var box = elem.children()[0];
                var currentIndex = 0;
                var default_width = 100;
                var default_height = 100;
                var default_rowMargin = 0;
                var default_colMargin = 0;
                var width, height, rowMargin, colMargin, rowCount, colCount;
                var reshape = function () {
                    var data = $scope.$eval(dataName);
                    if (!(data && data.length)) {
                        return false;
                    }
                    width = scope.width || default_width;
                    height = scope.height || default_height;
                    rowMargin = scope.rowMargin || default_rowMargin;
                    colMargin = scope.colMargin || default_colMargin;
                    colCount = parseInt(box.offsetWidth / (width + colMargin * 2)) || 1;
                    rowCount = parseInt((data.length + colCount - 1) / colCount);
                    scope.appends = " ".repeat(rowCount * colCount - data.length).split("").map(function (a, cx) {
                        return cx;
                    });
                    return data;
                };
                $scope.appends = [];
                var style = {
                    padding: [paddingTop, paddingRight, paddingBottom, paddingLeft].join("px ") + "px"
                };
                scope.style = style;
                scope.$ScrollH = function () {
                    var data = reshape();
                    if (data === false) {
                        return 10;
                    }
                    return elem[0].offsetHeight;
                };
                scope.$ScrollTH = function () {
                    var data = reshape();
                    if (data === false) {
                        return 10;
                    }
                    var th = rowCount * (height + rowMargin) + paddingTop + paddingBottom;
                    return th;
                };
                scope.$ScrollY = function (y) {
                    var data = reshape();
                    if (data === false) {
                        return 10;
                    }
                    var rowHeight = rowMargin * 2 + height;
                    if (typeof y === 'number') {
                        var rowIndex = -parseInt(y / 2 / rowHeight) * 2;
                        style.marginTop = y + rowIndex * rowHeight + 'px';
                        style.marginBottom = rowHeight * 15 + 'px';
                        var rowCount = parseInt((+colCount - 1) / colCount);
                        var data = $scope.$eval(dataName);
                        if (!(data && data.length)) {
                            return 10;
                        }
                        currentIndex = rowIndex * colCount;
                        var currentOffset = currentIndex + (rowCount + 15) * colCount;
                        setter(_scope, data.slice(currentIndex, currentOffset));
                    } else {
                        var rowIndex = currentIndex / colCount;
                        return (parseInt(style.marginTop) || 0) - rowIndex * rowHeight;
                    }
                };
            };
            return pre;
        },
        link: function () {

        }
    };
}]);
yjkj.directive('brand', function () {
    return {
        restrict: 'E',
        template:'<div class="brand" ng-class=class><div class="icon"></div><div class="name">{{data.brand}}</div><checkbox></checkbox></div>',
        scope:{
            data:'='
        },
        replace:true,
        link: function (scope) {
            scope.class = 'b';
        }
    };
});
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.directive('brands', ["$http", "$parse", "asyncEach", "$register", "$templateCache", "isChildElement", "alert", function ($http, $parse, asyncEach, $register, $templateCache,isChildElement,alert) {
    var brands = [];
    var colors = [];
    -function () {
        var c="\u9e28\u8272 #f7acbc \u8d64\u767d\u6a61 #deab8a \u6cb9\u8272 #817936 \u7ec0\u6854\u6897 #444693 \u8e2f\u8e85\u8272 #ef5b9c \u808c\u8272 #fedcbd \u4f3d\u7f57\u8272 #7f7522 \u82b1\u8272 #2b4490 \u685c\u8272 #feeeed \u6a59\u8272 #f47920 \u9752\u4e39 #80752c \u7460\u7483\u8272 #2a5caa \u8537\u8587\u8272 #f05b72 \u7070\u8336 #905a3d \u83ba\u8272 #87843b \u7409\u7483\u7ec0 #224b8f \u97e9\u7ea2 #f15b6c \u8336\u8272 #8f4b2e \u5229\u4e45\u8272 #726930 \u7ec0\u8272 #003a6c \u73ca\u745a\u8272 #f8aba6 \u6866\u8336\u8272 #87481f \u5a9a\u8336 #454926 \u9752\u84dd #102b6a \u7ea2\u6885\u8272 #f69c9f \u67af\u8336 #5f3c23 \u84dd\u6d77\u677e\u8336 #2e3a1f \u675c\u82e5\u8272 #426ab3 \u6843\u8272 #f58f98 \u7126\u8336 #6b473c \u9752\u949d #4d4f36 \u80dc\u8272 #46485f \u8584\u67ff #ca8687 \u67d1\u5b50\u8272 #faa755 \u62b9\u8336\u8272 #b7ba6b \u7fa4\u9752\u8272 #4e72b8 \u8584\u7ea2\u6885 #f391a9 \u674f\u8272 #fab27b \u9ec4\u7dd1 #b2d235 \u94c1\u7ec0 #181d4b \u66d9\u8272 #bd6758 \u871c\u67d1\u8272 #f58220 \u82d4\u8272 #5c7a29 \u84dd\u94c1 #1a2933 \u7ea2\u8272 #d71345 \u8910\u8272 #843900 \u82e5\u8349\u8272 #bed742 \u9752\u8910 #121a2a \u8d64\u4e39 #d64f44 \u8def\u8003\u8336 #905d1d \u82e5\u7dd1 #7fb80e \u8910\u8fd4 #0c212b \u7ea2\u8d64 #d93a49 \u9974\u8272 #8a5d19 \u840c\u9ec4 #a3cf62 \u85e4\u7eb3\u6238 #6a6da9 \u81d9\u8102\u8272 #b3424a \u4e01\u5b50\u8272 #8c531b \u82d7\u8272 #769149 \u6854\u6897\u8272 #585eaa \u771f\u8d6d #c76968 \u4e01\u5b50\u8336 #826858 \u8349\u8272 #6d8346 \u7ec0\u84dd #494e8f \u4eca\u69d8\u8272 #bb505d \u9ec4\u680c #64492b \u67f3\u8272 #78a355 \u85e4\u8272 #afb4db \u6885\u67d3 #987165 \u571f\u5668\u8272 #ae6642 \u82e5\u8349\u8272 #abc88b \u85e4\u7d2b #9b95c9 \u9000\u7ea2\u8272 #ac6767 \u9ec4\u67af\u8336 #56452d \u677e\u53f6\u8272 #74905d \u9752\u7d2b #6950a1 \u82cf\u82b3 #973c3f \u72d0\u8272 #96582a \u767d\u7dd1 #cde6c7 \u83eb\u8272 #6f60aa \u831c\u8272 #b22c46 \u9ec4\u6a61 #705628 \u8584\u7dd1 #1d953f \u9e20\u7fbd\u8272 #867892 \u7ea2 #a7324a \u94f6\u7164\u7af9 #4a3113 \u5343\u8349\u8272 #77ac98 \u8584\u8272 #918597 \u94f6\u6731 #aa363d \u6d85\u8272 #412f1f \u9752\u7dd1 #007d65 \u8584\u9f20 #6f6d85 \u8d64 #ed1941 \u80e1\u6843\u8272 #845538 \u6d45\u7dd1 #84bf96 \u9e20\u7fbd\u9f20 #594c6d \u6731\u8272 #f26522 \u9999\u8272 #8e7437 \u7dd1 #45b97c \u83d6\u84b2\u8272 #694d9f \u6d17\u6731 #d2553d \u56fd\u9632\u8272 #69541b \u8349\u8272 #225a1f \u6c5f\u6238\u7d2b #6f599c \u7ea2\u6866\u8272 #b4534b \u7ec3\u8272 #d5c59f \u6728\u8d3c\u8272 #367459 \u7d2b #8552a1 \u7ea2\u7eef #ef4136 \u8089\u8272 #cd9a5b \u5e38\u76d8\u8272 #007947 \u706d\u7d2b #543044 \u6866\u8272 #c63c26 \u4eba\u8272 #cd9a5b \u7dd1\u9752\u8272 #40835e \u8461\u8404\u9f20 #63434f \u94c5\u4e39\u8272 #f3715c \u571f\u8272 #b36d41 \u5343\u6b73\u7dd1 #2b6447 \u53e4\u4ee3\u7d2b #7d5886 \u8d6d #a7573b \u5c0f\u9ea6\u8272 #df9464 \u6df1\u7dd1 #005831 \u6697\u7ea2 #401c44 \u7eef\u8272 #aa2116 \u7425\u73c0\u8272 #b76f40 \u840c\u8471\u8272 #006c54 \u8461\u8404 #472d56 \u4e39 #b64533 \u6728\u5170\u8272 #ad8b3d \u9752\u767d\u6a61 #375830 \u8304\u5b50\u7ec0 #45224a \u571f #b54334 \u6800\u5b50\u8272 #dea32c \u9769\u8272 #274d3d \u7d2b\u7ec0 #411445 \u7126\u9999 #853f04 \u673d\u53f6 #d1923f \u9eb9\u5c18 #375830 \u6d53\u8272 #4b2f3d \u771f\u7ea2 #840228 \u8431\u8349\u8272 #c88400 \u4ed9\u658e\u8336 #27342b \u4e8c\u84dd #402e4c \u7eef #7a1723 \u9ec4\u91d1 #c37e00 \u82e5\u7af9\u8272 #65c294 \u83d6\u84b2\u8272 #c77eb5 \u7ea2\u6d77\u8001\u8336 #a03939 \u91d1\u8272 #c37e00 \u9752\u78c1\u8272 #73b9a2 \u7261\u4e39\u8272 #ea66a6 \u6d45\u82cf\u82b3 #8a2e3b \u91d1\u8336 #e0861a \u9752\u7af9\u8272 #72baa7 \u8d64\u7d2b #f173ac \u9e22\u8272 #8e453f \u5375\u8272 #ffce7b \u94c1\u8272 #005344 \u767d #fffffb \u5c0f\u8c46\u8272 #8f4b4a \u5c71\u5439\u8272 #fcaf17 \u9516\u9f20 #122e29 \u80e1\u7c89\u8272 #fffef9 \u5f01\u67c4\u8272 #892f1b \u9ec4\u571f\u8272 #ba8448 \u94c1\u5fa1\u7eb3\u6238 #293047 \u751f\u6210\u8272 #f6f5ec \u6817\u6885 #6b2c25 \u673d\u53f6\u8272 #896a45 \u9752\u7dd1 #00ae9d \u7070\u767d #d9d6c3 \u6d77\u8001\u8336 #733a31 \u7a7a\u4e94\u500d\u5b50\u8272 #76624c \u9516\u6d45\u8471 #508a88 \u77f3\u7af9\u8272 #d1c7b7 \u6df1\u7eef #54211d \u83ba\u8336 #6d5826 \u6c34\u6d45\u8471 #70a19f \u8c61\u7259\u8272 #f2eada \u8d64\u94dc\u8272 #78331e \u5411\u65e5\u8475\u8272 #ffc20e \u65b0\u6865\u8272 #50b7c1 \u4e73\u767d\u8272 #d3d7d4 \u8d64\u8910\u8272 #53261f \u90c1\u91d1\u8272 #fdb933 \u6d45\u8471\u8272 #00a6ac \u8584\u949d #999d9c \u91d1\u8d64 #f15a22 \u7802\u8272 #d3c6a6 \u767d\u7fa4 #78cdd1 \u94f6\u9f20 #a1a3a6 \u8d64\u8336 #b4533c \u82a5\u5b50\u8272 #c7a252 \u5fa1\u7eb3\u6238\u8272 #008792 \u8336\u9f20 #9d9087 \u8d64\u9516\u8272 #84331f \u6de1\u9ec4 #dec674 \u74ee\u8997 #94d6da \u9f20\u8272 #8a8c8e \u9ec4\u4e39 #f47a55 \u4e9c\u9ebb\u8272 #b69968 \u6c34\u8272 #afdfe4 \u8584\u58a8\u8272 #74787c \u8d64\u6a59 #f15a22 \u67af\u8272 #c1a173 \u84dd\u9f20 #5e7c85 \u5229\u4f11\u9f20 #7c8577 \u67ff\u8272 #f3704b \u9e1f\u5b50\u8272 #dbce8f \u79d8\u8272 #76becc \u94c5\u8272 #72777b \u8089\u6842\u8272 #da765b \u9ec4\u8272 #ffd400 \u7a7a\u8272 #90d7ec \u7070\u8272 #77787b \u6866\u8272 #c85d44 \u84b2\u516c\u82f1\u8272 #ffd400 \u9752 #009ad6 \u949d\u8272 #4f5555 \u70bc\u74e6\u8272 #ae5039 \u4e2d\u9ec4 #ffe600 \u84dd\u8272 #145b7d \u7164\u7af9\u8272 #6c4c49 \u9516\u8272 #6a3427 \u5208\u5b89\u8272 #f0dc70 \u6d53\u84dd #11264f \u9ed2\u8336 #563624 \u6867\u76ae\u8272 #8f4b38 \u9ec4\u6a97\u8272 #fcf16e \u52ff\u5fd8\u8349\u8272 #7bbfea \u9ed2\u6a61 #3e4145 \u6817\u8272 #8e3e1f \u7dd1\u9ec4\u8272 #decb00 \u9732\u8349\u8272 #33a3dc \u6d53\u9f20 #3c3645 \u9ec4\u8d64 #f36c21 \u9db8\u8272 #cbc547 \u7f25\u8272 #228fbd \u58a8 #464547 \u4ee3\u8d6d #b4532a \u6d77\u677e\u8272 #6e6b41 \u6d45\u7f25 #2468a2 \u9ed2 #130c0e \u9a86\u9a7c\u8272 #b7704f \u9db8\u8336 #596032 \u8584\u7f25 #2570a1 \u9ed2\u94c1 #281f1d \u9ec4\u8336 #de773f \u5c71\u9e20\u8272 #525f42 \u8584\u82b1\u8272 #2585a6 \u874b\u8272 #2f271d \u6d17\u67ff #c99979 \u751f\u58c1\u8272 #5f5d46 \u7ec0\u9752 #1b315e \u7d2b\u9ed2 #1d1626".split(' ');
        for (var cx = 0, dx = c.length; cx < dx; cx += 2) {
            var k = c[cx], v = c[cx + 1];
            colors.push(v);
            colors[v] = k;
        }
    }();

    $http.get("data/brands.json").success(function (data) {
                                console.log(colors)

        data.forEach(function (a) {
            var models = [];
            var brand={
                "models": models
            };
            models.push.apply(models, a.map(function (s) {
                return {
                    'name': s,
                    "color": function () {
                        var length = Math.random() * 3 + 3;
                        var c = [];
                        for (cx = 0; cx < length; cx++) {
                            c.push(colors[colors[parseInt(Math.random() * (colors.length - 0.1))]]);
                        }
                        return c;
                    }(),
                    "color_checked":'',
                    "brand":brand,
                    "deploy": ["2G", "7.2G", "16G", "32G"],
                    "deploy_checked":'',
                    "format": ["GSM", "CDMA", "WCDMA"],
                    "format_checked":''
                };
            }));
            brand.name=models[0].name,
            brands.push(brand);
        });
//        filters.forEach(function (v) {
//            var each = asyncEach();
//            var map = v[2];
//            each(brands, function (s) {
//                var a = $parse(v[0])(s);
//                if (a) {
//                    map[a] = s;
//                }
//            }).onend(function () {
//            });
//        });
    });
    var filters = [
//        ["brand", "\u54c1\u724c", {}],
//        ["model", "\u578b\u53f7", {}],
        ["color", "\u989c\u8272", {}],
        ["deploy", '\u914d\u7f6e', {}],
        ["format", "\u5236\u5f0f", {}]
    ];
    var create_element = function (tag, attrs, content) {
        return "<" + tag + ' ' + Object.keys(attrs).map(function (k) {
            return k.replace(/[A-Z]/g, function (m) {
                return '-' + m.toLowerCase();
            }) + '=' + '"' + String(attrs[k]).replace(/"/g, '\"') + '"';
        }).join(' ') + ">" + (content || "") + "</" + tag + ">";
    };
    var extras_tempalte = filters.map(function (v, k) {
        var field = v[0], label = v[1], source = "filters[" + k + "][2]", bind_tmpl = v[3] || 'selector';
        return "<field label='" + label + "\uff1a'>" + create_element(bind_tmpl, {
            "source": "model."+field+"",
            "ng-model": "model." + field + "_checked",
            "onblur": "refocus()",
            "addEmpty":"'\u5168\u90e8'",
        }) + "</field>";
    }).join('');
    $register.controller("Brands", function () {

    });
    $templateCache.put('builtin/directive/brands', function () {
        var title = '<div>' + extras_tempalte + '</div>';
        var body = '<list source="models" ></list>';
        return '<div class="brands"><div ><div></div><list source=source field="name" oncheck=check ></list></div><div><div></div><list source=models field=name ></list></div><div></div></div>';

    }());


    return {
        restrict: 'E',
        template: function (elem, attr) {
            if (attr.source) {
                return '<div class="brands"><div ><div>\u9009\u62e9\u54c1\u724c</div><list oncheck="check" source=source field="name" ng-model=brand filter=filter ></list></div><div><div>\u9009\u62e9\u578b\u53f7</div><list ng-model=ngModel source="brand.models" field="name+color_checked+deploy_checked+format_checked" multi-select=true oncheck=check2 ></list></div><div>' + extras_tempalte + '<anniu ng-click="confirm()" enabled="ngModel.length" class="m">\u786e\u5b9a</anniu></div></div>';
            } else {
                return '<div><selector field="name+color_checked+deploy_checked+format_checked" source=source template-name="brands" ng-model=ngModel input popup="false" multi-select=true ></selector></div>';
            }
        },
        replace: true,
        scope: {
            ngModel: "=?",
            filter: '=?',
            source: '=?',
            canblur:'=?',
        },
        compile: function (elem, attr) {
            if (attr.source) {
                return function (scope) {
                    scope.check = function (s) {
                        console.log(s,'check')
                        scope.brand = s;
                    };
                    var i=scope.ngModel;
                    scope.brand=i&&i[0]&&i[0].brand;
                    scope.check2=function(s,a){
                        if(a.length>20){
                            alert('','\u6700\u591a\u9009\u62e920\u9879').element.on('mousedown',function(event){
                                event.preventDefault();
                            });
                            return false;
                        }
                        scope.model=s;
                        scope.filters = filters;
                    }
                    scope.template = '<brand data=s ></brand>';
                    scope.confirm = function () {
                        if(input!==document.activeElement){
                            input.focus();
                        }
                        input.blur();
                    };
                    var input=document.activeElement;
                    scope.refocus = function () {
                        if(Date.now()-down_time>300){
                            input.focus();
                        }
                    }
                    var down_time=0;
                    Array.prototype.forEach.apply(elem.children()[2].children,[function(a){
                            a.addEventListener('mousedown',function(e){
                                if(isChildElement(e.target,a.children[1])){
                                    scope.canblur=false;
                                    scope.$apply();
                                    down_time=Date.now();
                                }
                            },true);
                    }]);
                };
            } else {
                return function (scope) {
                    scope.source = brands;
                };
            }
        }
    };
}]);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//String.prototype.trim=function(s){
//    s=s&&s.replace(/[\/\*\.\+\-\{\}\(\)\^\$\\\?\:]+/g,function(a){
//        return "\\"+a[0];
//    })||"\\s";
//    return this.replace(new RegExp("^(["+s+"]+)",""),"").replace(new RegExp("(["+s+"]+)$"),"");
//};

yjkj.directive('checkbox', ["$parse", function ($parse) {
    return{
        restrict: 'E',
        template: '<div class="checkbox" ng-class="{\'c1\':checked,\'c0\':!checked,\'c\':checked===0}"><div><div></div></div><div ng-transclude></div></div>',
        replace: true,
        transclude: true,
        scope: {
            ngModel: '@',
            bind: '@'
        },
        link: function (scope, elem, attr) {
            var ngModel = scope.ngModel;
            var bind = scope.bind;
            var $scope = elem.scope();
            var checked = false;
            elem.on("click", function () {
                if (typeof scope.checked === "number") {
                    scope.checked = scope.checked ? 0 : 1;
                } else {
                    scope.checked = !scope.checked;
                }
            });
            Object.defineProperty(scope, 'checked', {
                get: function () {
                    return (ngModel || bind) ? $scope.$eval(ngModel || bind) : checked;
                },
                set: function (v) {
                    if (attr.hasOwnProperty('disabled')) {
                        return;
                    }
                    var setter = $parse(ngModel).assign;
                    setter && setter($scope, v);
                    return checked = v;
                }
            });
        }
    };
}]);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.directive("colView", ["getScreenPosition", "$document", function (getScreenPosition, $document) {
    return function (scope, elem, attr) {
        elem.addClass('col-view');
        var adaptTarget = function (e) {
            var tmp = e.target, current;
            while (tmp && !(tmp.hasAttribute && tmp.hasAttribute('col-view'))) {
                current = tmp;
                tmp = tmp.parentNode;
            }
            if (current) {
                var position = getScreenPosition(current);
                position.right = position.left + current.offsetWidth;
                if (e.clientX - position.left < 7 && current.previousElementSibling) {
                    elem.css('cursor', 'w-resize');
                    return current.previousElementSibling;
                } else if (position.right - e.clientX < 7&&current.nextElementSibling) {
                    elem.css('cursor', 'e-resize');
                    return current;
                } else {
                    elem.css('cursor', '');
                }
            }
        };
        elem.on('mousemove', adaptTarget);
        var draging = null;
        var onmouseup = function () {
            $document.off('mouseup', onmouseup);
            $document.off('mousemove', onmousemove);
            elem.on('mousemove', adaptTarget);
            draging = null;
        };
        var onmousemove = function (e) {
            if (draging && draging.elem) {
                var deltax = e.clientX - draging.x;
                var elementA = draging.elem;
                var cs=getComputedStyle(elementA);
                var cur=deltax + elementA.offsetWidth;
                    var children = elementA.parentNode.children;
                    var elementB = children[children.length - 1];
                if ( cur>(parseInt(cs.minWidth)||70)&&cur<(parseInt(cs.maxWidth)||elem[0].offsetWidth-70)&&elementA!==elementB) {
                    draging.x = e.clientX;
                    elementA.style.width = parseInt(elementA.style.width || elementA.offsetWidth) + deltax + 'px';
                    elementB.style.left = parseInt(elementB.style.left || elementB.offsetLeft) + deltax + 'px';
                    scope.$apply();
                }
            }
        };

        elem.on('mousedown', function (e) {
            elem.off('mousemove', adaptTarget);
            $document.on('mousemove', onmousemove);
            $document.on("mouseup", onmouseup);
            var temp = adaptTarget(e);
            if (temp) {
                draging = {
                    elem: temp,
                    x: e.clientX,
                    y: e.clientY
                };
            }
        });
    };
}]);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.directive('dateInput', ["$parse", "alert", "isChildElement", function ($parse, alert, isChildElement) {
    var REGEXP = /^(\d{4})?\-?(\d{1,2})?\-?(\d{1,2})?\s?(\d{1,2})?\:?(\d{1,2})?\:?(\d{1,2})?$/;
    var model = "\u5e74\u6708\u65e5\u65f6\u5206\u79d2";
    var _format = "-- ::";
    var _model = ["FullYear", "Month", "Date", "Hours", "Minutes", "Seconds"];
    var _limits = [[-9999, 9999], [0, 11], [1], [0, 23], [0, 59], [0, 59]];
    String.prototype.repeat = String.prototype.repeat || function (length) {//ie\u4e0a
        var arr = [];
        for (var cx = 0; cx < length; cx++) {
            arr.push(this);
        }
        return arr.join("");
    };
    var genLength = function (number, length) {
        var str = String(number);
        if (str.length >= length) {
            return str;
        }
        return "0".repeat(length - str.length || 0) + str;
    };
    var bindValue = function (date) {
        var defineProperty = Object.defineProperty;
        Array.prototype.forEach.apply(model, [function (m, c) {
                var i = m === "\u6708" ? 1 : 0;
                var l = m === "\u5e74" ? 4 : 2;
                var trim = m === "\u65e5" ? function (value) {
                    if (!value) {
                        return 1;
                    }
                    if (value < 1) {
                        return 1;
                    }
                    var right_limit = getDatesCount(date.\u5e74, date.\u6708);
                    if (value > right_limit) {
                        return right_limit;
                    }
                    return parseInt(value);
                } : function (value) {
                    if (!value) {
                        return 0;
                    }
                    var limits = _limits[c];
                    if (value < limits[0]) {
                        return limits[0];
                    }
                    if (value > limits[1]) {
                        return limits[1];
                    }
                    return value;
                };
                defineProperty(date, m, {
                    get: function () {
                        return genLength(date['get' + _model[c]]() + i, l);
                    },
                    set: function (v) {
                        return date['set' + _model[c]](trim(v - i));
                    }
                });
            }]);
        return date;
    };
    var parseDate = function (dateString, dst, default_value) {
        var matchs = dateString.match(REGEXP);
        var dd = dst || bindValue(new Date());
        matchs && matchs.slice(1).forEach(function (i, cx) {
            i ? (dd[model[cx]] = i) : cx > 5 && (dd[model[cx]] = 0);
        });
        return dd;
    };


    var getDatesCount = function (year, month) {
        year = year + parseInt(month / 12);
        month = month % 12;
        if (month < 1) {
            month = month + 12;
            year = year - 1;
        }
        if (month > 12) {
            month = month - 12;
            year = year + 1;
        }
        if (month === 2 && !(year % 100 === 0 ? year % 400 : year % 4)) {
            return 29;
        }
        return [3, 0, 3, 2, 3, 3, 2, 3, 2, 3, 2, 3][month - 1] + 28;
    };
    var getDay = function (y, m, d) {
        return(d + 2 * m + parseInt(3 * (m + 1) / 5) + y + parseInt(y / 4) - parseInt(y / 100) + parseInt(y / 400)) % 7 + 1;
    };
    var buildDate = function (scope, date) {
        var year = parseInt(date.\u5e74);
        var month = parseInt(date.\u6708);
        var src = [];
        var srcCount = getDatesCount(year, month);
        for (var i = srcCount; i > 0; ) {
            src[i - 1] = i--;
        }
        var last_month = getDay(year, month, 1);
        var last_month_count = getDatesCount(year, month - 1);
        var last_src = [];
        while (last_month > 0) {
            last_src[--last_month] = last_month_count--;
        }
        var next_src = [];
        var next_month = 6 - (src.length + last_src.length - 1) % 7;
        while (next_month > 0) {
            next_src[next_month - 1] = next_month--;
        }
        scope.src = src;
        scope.last_src = last_src;
        scope.next_src = next_src;
        scope.title_src = '\u65e5\u4e00\u4e8c\u4e09\u56db\u4e94\u516d';
        scope.style = {
            width: (100 / 7).toFixed(7).slice(0, 7) + "%",
            height: (700 / (src.length + last_src.length + next_src.length + 7)).toFixed(7).slice(0, 7) + "%"
        };
    };
    var buildYear = function (scope, date) {
        var year = parseInt((parseInt(date.\u5e74) + 10) / 20) * 20;
        var src = [];
        for (var cx = -10, dx = 10; cx < dx; cx++) {
            src.push(year + cx);
        }
        scope.src = src;
        scope.last_src = [year - 12, year - 11];
        scope.next_src = [year + 10, year + 11];
        scope.style = {
            width: (100 / 6).toFixed(7).slice(0, 7) + "%",
            height: (100 / 4).toFixed(7).slice(0, 7) + "%"
        };
        return year - 11;
    };

    var buildMonth = function (scope) {
        var src = "\u4e00 \u4e8c \u4e09 \u56db \u4e94 \u516d \u4e03 \u516b \u4e5d \u5341 \u5341\u4e00 \u5341\u4e8c".split(" ").map(function (i) {
            return i + "\u6708";
        });
        scope.src = src;
        scope.style = {
            width: (100 / 4).toFixed(7).slice(0, 7) + "%",
            height: (100 / 3).toFixed(7).slice(0, 7) + "%"
        };
    };
    var buildHours = function (scope) {
        scope.src = " ".repeat(24).split("").map(function (i, cx) {
            return cx;
        });
        scope.style = {
            width: (100 / 6).toFixed(7).slice(0, 7) + "%",
            height: (100 / 4).toFixed(7).slice(0, 7) + "%"
        };
        return -1;
    };
    var buildMiSe = function (scope) {
        scope.src = " ".repeat(60).split("").map(function (i, cx) {
            return cx;
        });
        scope.style = {
            width: (100 / 10).toFixed(7).slice(0, 7) + "%",
            height: (100 / 6).toFixed(7).slice(0, 7) + "%"
        };
        return -1;
    };
    return {
        restrict: 'E',
        template: function (elem) {
            return ['<div class="date-input">',
                '<div><i ng-if="last_src.length"></i>',
                '<span><span ng-repeat="(i,s) in model"><input ng-focus="build(-i)" ng-blur="clean()" ng-model="value[s]"/><span ng-bind="format[i]"></span></span></span>',
                '<i ng-if="next_src.length"></i></div>',
                '</div>'].join("");
        },
        transclude: true,
        replace: true,
        scope: {
            ngModel: '@',
            accuracy: '@',
            format: '@',
            initDate: '@'
        },
        link: function (scope, elem) {
            var ngModel = scope.ngModel;
            var $scope = elem.scope();
            $scope.genLength = genLength;
            var _value;
            var date_container = alert.point(['<div class=date-container>',
                '<div class=chead>', //chead start
                '<i ng-if="last_src" ng-click=build.back(1)></i>',
                '<span><span ng-repeat="(i,s) in model" ng-click=build(-i)><span ng-bind=value[s]></span>&nbsp;<span ng-bind="s"></span>&nbsp;</span></span>',
                '<i ng-if="next_src" ng-click=build.next(1)></i>',
                '</div>', //chead end
                '<div class=cbody><div ng-style="style" class="title" ng-repeat="s in title_src">', //cbody start
                '<span ng-bind="s"></span></div>',
                '<div ng-style="style" class="last" ng-repeat="(i,s) in last_src" ng-click=build.back(last_src.length-i)><span ng-bind="s"></span></div>',
                '<div ng-style="style" ng-repeat="(i,s) in src" ng-click="build(i+1);" ng-class="{ing:src.ing===i}"><span ng-bind="s"></span></div>',
                '<div ng-style="style" class="next" ng-repeat="(i,s) in next_src" ng-click=build.next(i+1)><span ng-bind="s"></span></div><div></div>', //cbody end
                '</div>'].join(""), elem, {height: 200, scope: scope});

            Object.defineProperty(scope, 'value', {
                get: function () {
                    _value = parseDate($scope.$eval(ngModel) || "", _value);
                    return  _value;
                },
                set: function (v) {
                    var m = scope.model, length = m.length;
                    var _v = Array.prototype.map.apply(m, [function (i, cx) {
                            var val = genLength(v[model[cx]], m === "\u5e74" ? 4 : 2);
                            return cx + 1 === length ? val : val + _format[cx];
                        }]).join("");
                    return $parse(ngModel).assign($scope, _v);
                }
            });
            var accuracy = scope.accuracy || "\u65e5";
            scope.model = model.slice(0, model.indexOf(accuracy) + accuracy.length);
            scope.format = scope.format || scope.model.length > 2 ? _format.slice(0, scope.model.length - 1) : scope.model;
            var elements = elem.children();
            var title = elements[0];
            var inputs;
            elem.ready(function () {
                inputs = Array.prototype.map.apply(title.children[0].children, [function (e, cx) {
                        var input = e.children[0];
                        input.index = cx;
                        input.onblur = function () {
                            clean();
                            elem.removeClass("focus");
                            date_container.destroy();
                            if (!scope.$$phase && !scope.$root.$$phase) {
                                scope.$apply();
                            }
                        };
                        input.onfocus = function () {
                            elem.addClass("focus");
                            date_container.rebuild();
                            if (!scope.$$phase && !scope.$root.$$phase) {
                                scope.$apply();
                            }
                        };
                        input.onkeyup = function (e) {
                            var code = e.which || e.keyCode;
                            if (code === 13) {
                                build(-cx - 1);
                            }
                            scope.$apply();
                        };
                        return input;
                    }]);
            });
            var _index = 0, addon = 0;
            var clean = function (src) {
                angular.extend(scope, {
                    src: src || "",
                    last_src: "",
                    next_src: "",
                    title_src: ""
                });
            };
            var build = function (index, active_next) {
                watch_cancel();
                var value = scope.value;
                if (index - 0 > 0) {
                    value[model[_index]] = index + addon;
                    scope.value = value;
                    if (active_next !== false) {
                        _index++;
                    }
                } else if (index - 0 <= 0) {
                    _index = -index;
                } else {
                    _index = _index > 0 || 0;
                }
                clean([]);
                if (_index < scope.model.length) {
                    var builder = [buildYear, buildMonth, buildDate, buildHours, buildMiSe, buildMiSe][_index];
                    addon = builder && builder(scope, value) || 0;
                    scope.src.ing = value[model[_index]] - addon - 1;
                } else {
                    date_container.destroy();
                }
                var input = inputs[_index ];
                if (input !== document.activeElement && input) {
                    input.focus();
                }
                input && input.select();
                watch();
            };
            build.next = function (i) {
                addon += scope.src.length;
                build(i, false);
            };
            build.back = function (i) {
                addon -= i;
                build(1, false);
            };
            scope.build = build;
            scope.clean = clean;
            var watch_watcher;
            var watch_cancel = function () {
                watch_watcher && watch_watcher();
            };
            var watch = function () {
                watch_watcher = scope.$watch(function () {
                    var v = _value;
                    var m = scope.model, length = m.length;
                    var _v = v ? Array.prototype.map.apply(m, [function (i, cx) {
                            return cx + 1 === length ? v[model[cx]] : v[model[cx]] + _format[cx];
                        }]).join("") : "";
                    return _v;
                }, function (v) {
                    $parse(ngModel).assign($scope, v);
                });
            };

            elem.on("mousedown", function (e) {
                if (typeof e.target.index !== "number") {
                    e.preventDefault();
                }
                if (date_container.ing()) {
                    date_container.destroy();
                } else {
                    if (scope.src) {
                        date_container.rebuild();
                    } else {
                        var target = document.activeElement;
                        if (isChildElement(target, elem[0])) {
                            if (typeof target.index === "number") {
                                build(-target.index);
                            }
                        }
                    }
                }
                $scope.$apply();
            });

            title.onmouseup = function (e) {
                if (typeof e.target.index === "number") {
                    build(-e.target.index);
                } else {
                    var index = inputs.map(function (input, cx) {
                        return input === document.activeElement ? cx : "";
                    }).join("");
                    if (!index) {
                        build(0);
                    }
                }
                scope.$apply();
            };

        }
    };
}]);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.directive('field', ["$parse", function ($parse) {
    return {
        restrict: 'E',
        template: function () {
            return "<div class='field' ng-class=\"{'mao':mao,'must':must,'err':need_error||error_message}\"><span ng-show=!nolabel>{{name||label||holder}}</span><span ng-transclude></span><span class='err slide-left' ng-style=err_style ng-if=error_message ng-bind='error_message||name'></span></div>";
        },
        scope: {
            name: '@',
            label: '@',
            nolabel: '=?'
        },
        replace: true,
        transclude: true,
        link: function (scope, elem, attr) {
            if (attr.nolabel === "") {
                scope.nolabel = true;
            }
            var input_area = elem.children()[1];
            scope.$watch("name", function (name) {
                name = name && name.trim();
                var last = name && name[name.length - 1];
                if (last && last !== ':' && last !== ":") {
                    scope.mao = true;
                } else {
                    scope.mao = false;
                }
            });
            var models = [];
            var watcher = scope.$watch(function () {
                [].forEach.apply(input_area.children, [function (child) {
                        var ngModel = child.hasAttribute && child.hasAttribute("ng-model") && child.getAttribute("ng-model");
                        if (ngModel) {
                            models.push([ngModel, angular.element(child).scope(), child]);
                        }
                    }]);
                return models;
            }, function () {
                watcher();
                models.forEach(function (arr) {
                    var scp = arr[1], mdl = arr[0], ele = arr[2];
                    if (!scp.$eval(mdl + "_$name")) {
                        var holder = ele.getAttribute && (ele.getAttribute("placeholder") || ele.getAttribute("empty-label")) || scope.name || scope.label;
                        $parse(mdl + "_$name").assign(scp, holder && holder.replace(/[:\uff1a]\s*$/g, "").replace(/^\u8bf7(\u8f93\u5165|\u9009\u62e9)/, "").trim() || "");
                    }
                    scp.$watch(mdl + "_$error", function (error) {
                        scope.error_message = error && (typeof error === "string" ? error : scope.holder + "\u683c\u5f0f\u6709\u8bef");
                    });
                    scp.$watch(mdl + "_$need", function (error) {
                        scope.need_error = error;
                    });
                    scp.$watch(mdl + "_$name", function (name) {
                        scope.holder = name;
                    });
                    scp.$watch(mdl + "_$must", function (must) {
                        scope.must = must;
                    });
                    //\u683c\u5f0f\u9a8c\u8bc1
                    scp.$watch(mdl, function (value) {
                        var error = mdl + '_$error';
                        if (value) {
                            var test = scp.$eval(mdl + '_$test');
                            if (!test) {
                                $parse(error).assign(scp);
                            } else {
                                var test_result = test(value);
                                if (test_result) {
                                    $parse(error).assign(scp, test_result);
                                } else {
                                    $parse(error).assign(scp);
                                }
                            }
                        } else {
                            $parse(error).assign(scp);
                        }
                        $parse(mdl + "_$need").assign(scp);
                    });
                    scope.err_style = {'top': (ele.offsetTop + ele.offsetHeight + 2) + "px"};
                });
            });
        }
    };
}]);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.directive('grid', ["$register", "$templateCache", "popup", "regexp", "$document", "getMatchList", "$compile", "getScreenPosition", "$parse", "$timeout", "zIndex", "hashMap", "api", "storage", function ($register, $templateCache, popup, regexp, $document, getMatchList, $compile, getScreenPosition, $parse, $timeout, zIndex, hashMap, api, storage) {
    //\u8868\u683c\u914d\u7f6e
    $templateCache.put("builtin/directive/grid_setting.html", "<div style='width:auto;border:1px solid #fff;line-height:26px;padding:0 10px' ng-style={color:t.hide?'#ccc':'#333'} ng-if='t.name' ng-repeat='t in $Titles.leaf'><checkbox  ng-click='t.hide?showTitle(t):hideTitle(t)' bind=!t.hide disabled>{{t.name}}</checkbox><text-input style='vertical-align:top' ng-model=t.label></text-input></div>");
    $register.controller("DirectiveGrid_setting", ["$scope", function ($scope) {
        var hideTitle = function (title) {
            if (title.hide) {
                return;
            }
            title.width = (parseInt(title.width) || 80) + "px";
            title.style.width = 0;
            title.hide = true;
            title.checked = false;
            rebuildWidth(title.root);
        };
        var showTitle = function (title) {
            delete title.hide;
            title.style.width = title.style.width || title.width;
            rebuildWidth(title.root);
            title.checked = true;
        };
        $scope.showTitle = showTitle;
        $scope.hideTitle = hideTitle;
        $scope.$ViewTitle = "\u914d\u7f6e\u8868\u683c";
    }]);
    //\u52a0\u8f7d\u914d\u7f6e
    var init_setting = function () {
        var setting = storage.get("GRID_SETTINGS");
        var save = function () {
            storage.set("GRID_SETTINGS", setting);
        };
        var init = function (page_name, grid_name) {
            var callback;
            if (!setting[page_name]) {
                var set = setting[page_name] || {};
                api("/x6/getPageSetList.do", {
                    pageid: page_name
                }).success(function (result) {
                    result.pageSetList.forEach(function (s) {
                        set[s.pzid] = s;
                        s.data = JSON.parse(s.data);
                    });
                    setting[page_name] = set;
                }).onend(function () {
                    if (!set[grid_name]) {
                        set[grid_name] = {id: -1, data: []};
                    }
                    callback && callback(set[grid_name].data);
                });
                setting[page_name] = set;
            }
            if (!setting[page_name][grid_name]) {
                setting[page_name][grid_name] = {id: -1, data: []};
            }
            var result = function (_callback) {
                var psetting = setting[page_name];
                if (psetting) {
                    if (!psetting[grid_name]) {
                        psetting[grid_name] = {id: -1, data: []};
                    }
                    _callback(psetting[grid_name].data);
                } else {
                    callback = _callback;
                }
                return result;
            };
            result.save = function (data) {
                setting[page_name][grid_name].data = data;
                api("/x6/savePageSet.do", {
                    id: setting[page_name][grid_name].id || -1,
                    data: data,
                    pageid: page_name,
                    pzid: grid_name
                }).success(function () {
                    save();
                });
                return result;
            };
            return result;
        };
        return init;
    }();
    var NG_GRID_REGEXP = regexp.NG_GRID;
    //\u8fc7\u6ee4\u5668\u6a21\u7248
    var $filter;
    var filters = function (scope, $scope, moving) {
        var obj = moving.obj;
        var element = moving.elem;
        var position = getScreenPosition(element);
        var element = moving.elem;
        var obj = moving.obj;
        var array = $scope.$eval(scope.$DataName);
        var $ = $scope.$new();
        var key = scope.$KeyName;
        var value = scope.$ValueName;
        var v = obj.value;
        var setter = $parse(scope.$DataName).assign;
        var source = {};
        array && array.forEach(function (o, cx) {
            $[key] = cx;
            $[value] = o;
            var $value = $.$eval(v);
            source[$value] = cx;
        });
        var arr = [];
        for (var k in source) {
            var v = source[k];
            arr.push(array[v]);
        }
        setter($, arr);
        $.t = obj;

        var doFilter = function () {
            if (!array && array.length) {
                return $parse(scope.$DataName + '_filtered').assign(scope, null);
            }
            scope.$DataName && $parse(scope.$DataName + '_filtered').assign(scope, getMatchList(array, function (a) {
                var leaf = obj.root.leaf;
                for (var cx = 0, dx = leaf.length; cx < dx; cx++) {
                    var o = leaf[cx];
                    if (o.filter_reg && !o.filter_reg.test($parse(o.field)(a))) {
                        return 0;
                    }
                }
                return 1;
            }).$onend(function (a) {
                var array = scope.$eval(scope.$DataName + "_filtered") || $scope.$eval(scope.$DataName);
                var all_checked = !!array.length;
                for (var cx = 0, dx = array.length; cx < dx; cx++) {
                    if (!array[cx].checked) {
                        all_checked = false;
                        break;
                    }
                }
                obj.root.checked = all_checked;
            }));
        };
        $.doFilter = function () {
            $filter && $filter.remove();
        };
        $.$Sort = scope.$Sort;
        var a = (filters["normal" || obj.filter] || filters["normal"])($, obj, scope, doFilter);
        var width = element.offsetWidth - 27;
        var maxWidth = 188;
        if (width > maxWidth) {
            width = maxWidth;
        }
        var e = angular.element([
            "<div class=grid-filter>",
            "<div class='i' style='" + (width < maxWidth ? "left:" + width : "right:11") + "px'></div>",
            "<div class='sort'><div ng-click=$Sort(1,t) icon=icon color='#b5b8bf' hover-color='#4385f5' active-color='#b5b8bf'>\u5347\u5e8fA-Z</div>",
            "<div icon=icon ng-click=$Sort(-1,t) color='#b5b8bf' hover-color='#4385f5' active-color='#b5b8bf'>\u964d\u5e8fZ-A</div></div>",
            a,
            "<div class=opt ><anniu ng-click=doFilter() inactive>\u5173\u95ed</anniu></div>",
            "</div>"
        ].join(""));

        $compile(e)($);
        e.css({
            position: "fixed",
            margin: 0,
            padding: 0,
            zIndex: zIndex(),
            backgroundColor: '#ffffff'
        });
        if (width < maxWidth) {
            e.css({
                left: position.left + 'px'
            });
        } else {
            e.css({
                right: (window.innerWidth - (position.left + element.offsetWidth)) + "px"
            });
        }
        if (true || window.innerHeight > position.top + 360) {
            e.css('top', (position.top + element.offsetHeight) + 'px');
        } else {
            e.css('bottom', (window.innerHeight - position.top) + 'px');
        }
        e.css({
            'position': 'fixed'
        });
        return e[0];
    };
    filters["number"] = function ($, moving) {
        return "";
    };
    filters["normal"] = function ($, obj, scope, doFilter) {
        var first = 1;
        $.$watch("t.filter_arr.length", function (a, old) {
            if (first || typeof old !== "number") {
                first = 0;
                return;
            }
            var $$$$$$ = $.t.filter_arr;
            var v = obj.value;
            var key = scope.$KeyName;
            var value = scope.$ValueName;
            var filter = $$$$$$ && $$$$$$.length && new RegExp("^(" + $$$$$$.map(function (o, cx) {
                $[key] = cx;
                $[value] = o;
                var $value = $.$eval(v);
                return $value;
            }).join("|") + ")$") || null;
            obj.filter_reg = filter;
            doFilter();
        });
        return "<list ng-model='t.filter_arr' source='" + scope.$DataName + "' field='" + obj.field + (obj.format ? "' format=" + obj.format : "'") + " filterbox multi-select='true' filter='t.filter_str'></list>";
    };
    //\u91cd\u5efa\u5bbd\u5ea6
    var rebuildWidth = function (titles, delta) {
        var _leaf = titles.leaf;
        var _source = titles.source;
        _source.forEach(function (s) {
            if (s.children) {
                s.width = 0;
            }
        });
        titles.root.width = 0;

        _leaf.forEach(function (s) {
            var width = s.hide ? 0 : parseInt(s.style.width);
            while (s.parent) {
                s = s.parent;
                s.width += width;
            }
        });
        _source.forEach(function (s) {
            if (s.children) {
                s.style.width = s.hide ? 0 : s.width + "px";
            }
        });
        titles.style.width = titles.width + "px";
        var nowidth = [], sum_width = 0, cur_width = 0;
        var minwidth = 80;
        titles.leaf.forEach(function (t) {
            if (!t.fixwidth && !t.hide) {
                nowidth.push(t);
                sum_width += parseInt(t.minWidth || minwidth);
                cur_width += parseInt(t.style.width);
            }
        });
        var finalWidth = (delta || 0) + cur_width;
        var finalDelta = parseInt((finalWidth - sum_width) / nowidth.length);
        var countdelta = finalWidth - sum_width - finalDelta * nowidth.length;
        (finalDelta > 0) && nowidth.forEach(function (n) {
            var delta = finalDelta + parseInt(n.minWidth || minwidth) - parseInt(n.style.width);
            if (countdelta > 0) {
                delta++;
                countdelta--;
            }
            while (n) {
                n.style.width = parseInt(n.style.width) + delta + 'px';
                n = n.parent;
            }
        });
    };
    //\u91cd\u5efa\u7d22\u5f15
    var rebuildIndexAndOffset = function (titles) {
        var leaf = [];
        var f = function (t) {
            t.index = leaf.length;
            if (t.children) {
                t.children.forEach(f);
            } else {
                leaf.push(t);
            }
            t.offset = leaf.length - 1;
        };
        f(titles);
        titles.leaf = leaf;
    };
    //\u5e94\u7528\u914d\u7f6e
    var applyTitlesSettings = function (titles, settings) {
        var source = titles.source;
        var temp_setting = {};
        var temp_keys = [];
        settings.forEach(function (s) {
            var idlength = parseInt(s[0], 36);
            var widthlength = parseInt(s[1], 36);
            var id = s.slice(2, idlength + 2);
            var width = parseInt(s.slice(idlength + 2, idlength + widthlength + 2), 36);
            var hide = 0;
            if (width % 2 === 1) {
                hide = 1;
            }
            var name = s.slice(idlength + widthlength + 2);
            temp_setting[id] = {hide: hide, label: name, width: width >> 1};
            temp_keys.push(id);
            return s;
        });
        var _leaf = [];
        source.forEach(function (s) {
            if (!s.id) {
                return;
            }
            var setting = temp_setting[s.id];
            if (setting) {
                temp_setting[s.id] = angular.extend(s, setting);
                if (s.hide) {
                    s.style.width = 0;
                }
            }
        });
        temp_keys.forEach(function (k) {
            var s = temp_setting[k];
            if (s.parent) {
                _leaf.push(s);
            }
        });
        _leaf.forEach(function (s) {
            s.parent.children.splice(0);
        });
        _leaf.forEach(function (s) {
            s.parent.children.push(s);
        });
        rebuildIndexAndOffset(titles);
        rebuildWidth(titles);
        return titles;
    };
    //\u5bfc\u51fa\u914d\u7f6e
    var exportTitlesSettings = function (titles) {
        return titles.leaf.map(function (s) {
            var id = s.id;
            var name = s.label || "";
            var width = (((parseInt(s.width) || 80) << 1) + (s.hide ? 1 : 0)).toString(36);
            return (id.length).toString(36) + (width.length).toString(36) + id + width + name;
        });
    };
    //\u7f16\u8f91
    var $editor;
    $edit = function (e, editor) {
        var container = e.parentNode;
        $editor && $editor.remove();
        if (!editor) {
            return;
        }
        var $ = angular.element;
        var position = getScreenPosition(e);
        var div = $(editor());
        $(div.children()[0]).attr('ng-model', e.children[0].getAttribute("ng-bind"));
        $compile(div)($(e).scope());
        var eStyle = getComputedStyle(e);
        var outlinWidth = parseInt(eStyle.outlineWidth);
        var pPosition = getScreenPosition(e.offsetParent);
        div.css({
            display: "block",
            left: position.left - pPosition.left - outlinWidth + 'px',
            top: position.top - pPosition.top - outlinWidth + 'px',
            position: "absolute",
            width: e.offsetWidth + outlinWidth + 'px',
            height: e.offsetHeight + outlinWidth + 'px',
            backgroundColor: '#fff',
            border: '1px solid #7fa5ee'
        });
        div.addClass('editor');
        container.parentNode.appendChild(div[0]);
        var input = div[0].getElementsByTagName("input")[0];
        input && input.focus();
        $editor = {
            remove: function () {
                $editor = null;
                div.remove();
            },
            left: position.left,
            top: position.top,
            elem: e,
            width: e.offsetWidth,
            height: e.offsetHeight
        };
    };
//\u663e\u793a\u98ce\u683c\u4e0e\u7f16\u8f91\u5668\u98ce\u683c\u6620\u5c04
    var editors = {
        "text": "text-input",
        "number": "number-input",
        "date": "date-input",
        "age": "select-input",
        "select": "selector",
        "translate": "selector",
        "money": function () {
            var input = document.createElement("number-input");
            input.setAttribute("decimal", 2);
            return input;
        }
    };

    //\u7f16\u8f91\u5668
    var getEditor = function (type, model, source) {
        return function () {
            var _s;
            if (type && type.indexOf(":") >= 0) {
                var index = type.indexOf(":");
                _s = type.slice(index + 1);
                type = type.slice(0, index);
            }
            if (!source) {
                source = _s;
            }
            var editor = editors[type];
            if (angular.isFunction(editor)) {
                editor = editor();
            } else {
                editor = document.createElement(editor || editors.text);
            }
            editor.setAttribute('ng-model', model);
            source && editor.setAttribute("source", source);
            model && editor.setAttribute("model", model);
            return editor;
        };
    };
    //\u81ea\u52a8\u5bbd\u5ea6
    var widths = {
        "text": "200px",
        "date": "200px",
        "age": "60px",
        "number": "78px"
    };

    //\u5355\u5143\u683c\u6a21\u7248
    var cellTemplates = {
        text: function (field, format) {
            format = format || "text";
            return "<span ng-bind=" + field + "|" + format + "></span>";
        },
        checkbox: function (field, format) {
            return "<checkbox ng-model=$.checked disabled>" + (field !== "$" ? cellTemplates.text(field, format) : "") + "</checkbox>";
        },
        icon: function (field, format, title) {
            return "<span icon=\"$." + title.icon + "\" class='size30' >" + (field !== "$" ? cellTemplates.text(field, format) : "") + "</span>";
        },
        image: function (field, format, title) {
            return "<span icon=\"" + title.image + "\" class='size30' >" + (field !== "$" ? cellTemplates.text(field, format) : "") + "</span>";
        },
        options: function () {
            return "<i ng-if=onedit ng-click=onedit($,$index) icon='edit' color='#eea43b' hover-color='#ffb44b' active-color='#dd942b'></i><i icon='drop' ng-if=ondrop ng-click=ondrop($,$index)></i>";
        }
    };
    //\u663e\u793a\u98ce\u683c
    var parseFormat = function (title) {

        var template;
        if (title.checkbox) {
            template = "checkbox";
        } else if (title.icon) {
            template = "icon";
        } else if (title.image) {
            template = "image";
        } else {
            template = "text";
        }
        return (cellTemplates[template])(title.value, title.format, title);
    };


    //\u5bbd\u5ea6\u6c42\u548c
    var sum = function (collection) {
        if (!collection) {
            return 0;
        }
        var max = 0;
        collection.forEach(function (s) {
            max += parseInt(s);
        });
        return max;
    };
    /**
     * \u8868\u683c\u5934
     */
    $register.directive("gridTitle", function () {
        return {
            restrict: 'E',
            scope: {
                titles: "=",
                showFilter: "="
            },
            replace: true,
            template: ["<div class='grid-title' ",
                "ng-class=\"{'filter':showFilter}\"",
                " ng-style='{width:titles.style.width,height:titles.height,lineHeight:titles.lineHeight}'>",
                "<div tr-td='-{{t.offset}}-{{t.children?t.children.length:1}}' ",
                "ng-class='{sort:t.root.sort===t,s1:t.sort===1,s2:t.sort===-1,filter:t.filter,isset:t.isset,hover:t.hover}' ",
                "resizex ng-style='style(t)' ng-repeat='t in titles.children'>",
                "<checkbox ng-model=t.root.checked ng-if='t.checkbox' ",
                "disabled>{{t.name}}</checkbox>",
                "<span ng-if='!t.checkbox'>{{t.label||t.name}}</span><span icon=t.ticon ng-if=t.ticon hover-color={{t.thover}} active-color={{t.tactive}}></span>",
                "<i></i><b><input sort=filter value=''/></b>",
                "<div ng-if='t.children'>",
                "<grid-title titles='t'></grid-title>",
                "</div></div>"].join(""),
            link: function (scope, elem) {
                elem.ready(function () {
                    if (!/Safari/.test(navigator.userAgent)) {
                        //\u4ec5ie\u4f7f\u7528\u53bb\u9664\u5149\u6807
                        var inputs = elem[0].getElementsByTagName("input");
                        for (var cx = 0, dx = inputs.length; cx < dx; cx++) {
                            inputs[cx].type = 'button';
                        }
                        //\u82f9\u679c\u4e0a\u8fd9\u4e48\u7528\u4f1a\u5931\u6548
                    }
                });
                elem.on("dragstart", function (event) {
                    event.preventDefault();
                });

                scope.style = function (t) {
                    var style = {};
                    angular.copy(t.style, style);
                    if (t.parent.style.position === 'absolute') {
                        delete style.left;
                        delete style.position;
                    }
                    if (t.style.position === 'absolute' && t.pLeft) {
                        style.left = parseInt(t.style.left) - t.pLeft + 'px';
                    }
                    if (style.zIndex) {
                        style.zIndex++;
                    }
                    delete style.height;
                    delete style.textAlign;
                    return style;
                };
                var titles_watcher = scope.$watch("titles", function (titles) {
                    if (!titles) {
                        return;
                    }
                    titles_watcher();
                    var f = function (_titles, index) {
                        if (_titles.children) {
                            _titles.children.forEach(f);
                        } else if (index === 0) {
                            var h = height / _titles.deep;
                            var tmp = _titles;
                            while (tmp && tmp !== titles) {
                                tmp.lineHeight = h + 'px';
                                tmp.height = (_titles.deep - tmp.deep + 1) * h + 'px';
                                tmp = tmp.parent;
                            }
                        } else {
                            var h = height / _titles.deep + 'px';
                            _titles.lineHeight = h;
                            _titles.height = h;
                        }
                    };
                    if (titles && titles.root === titles) {
                        var height = parseInt(scope.titles.height);
                        f(titles, 0);
                        scope.$watch("titles.leaf", function (leaf) {
                            f(titles, 0);
                        });
                    }
                    scope.$watch("titles.children.length", function (length) {
                        if (!length) {
                            return;
                        }
                        var children = elem.children();
                        var titles_children = scope.titles.children;
                        for (var cx = 0; cx < titles_children.length; cx++) {
                            var e = children[cx];
                            e.style.height = titles_children[cx].height;
                            e.style.lineHeight = titles_children[cx].lineHeight;
                        }
                    });
                });
            }
        };
    });
    /**
     * \u8868\u683c
     */
    return {
        restrict: 'E',
        template: function (elem, attr) {
            return '<div class="grid"><scroll-content><grid-title titles="$Titles" show-filter=showFilter ></grid-title><grid-input></grid-input><div ng-if="$Titles.summary" style="bottom:0;position:absolute" ng-style="{width:$Titles.style.width}" class="grid-summary"><div ng-repeat="t in $Titles.leaf" ng-style="$Style(t)" ng-bind="$index===0?\'\u5408\u8ba1\':$Summary(t)"></div></div></scroll-content></div>';
        },
        transclude: true,
        replace: true,
        scope: {
            "ngModel": "@",
            "focus": "&",
            "onedit": "=",
            "ondrop": "=",
            "showFilter": "=",
            "multiSelect": '=',
            "oncol": "&",
            "onrow": "&",
            "checked": "=?"
        },
        link: function (scope, $element, attr, ctrl, transclude) {
            scope.options = function ($, $event, options) {
                var s = $scope.$new();
                s.$ = $;
                s.$data = $scope.$eval(scope.ngModel);
                s.$event = $event;
                return s.$eval(options);
            };
            var $scope = $element.scope();
            var grid = {
                getFormats: function () {

                },
                getData: function (row, col) {

                },
                getRowCounts: function () {

                }
            };
            if (!$scope.$Grids) {
                $scope.$Grids = [grid];
            } else {
                $scope.$Grids.push(grid);
            }
            var filter = function (moving) {
                if ($filter && $filter.elem === moving.elem) {
                    $filter.remove();
                    return;
                }
                $filter && $filter.remove();
                var obj = moving.obj;
                if (obj === obj.root.index) {
                    return;
                }
                if (moving.obj.children) {
                    return;
                }
                if (moving.obj.checkbox) {
                    return;
                }

                var e = filters(scope, $scope, moving);
                var remove = function () {
                    var tmp = $filter;
                    $filter = null;
                    tmp && e.parentNode && e.parentNode.removeChild(e);
                    angular.element(e).scope().$destroy();
                    //\u8c01\u8bf4js\u662f\u5355\u7ebf\u7a0b\u7684\uff0c\u8fd9\u91cc\u4e0d\u662f\u4e5f\u5e76\u53d1\u4e86\u5417\uff1f
                };
                $filter = {
                    elem: moving.elem,
                    remove: remove
                };
                var _input = moving.elem.getElementsByTagName("input")[0];
                _input.onblur = remove;
                _input.onmousedown = function () {
                    if ($filter) {
                        $filter.remove = remove;
                    }
                };
                e.onmousedown = function (e) {
                    if (e.target.tagName.toLowerCase() !== 'input') {
                        e.preventDefault();
                    } else {
                        var input = e.target;
                        e.target.onblur = remove;
                        _input.onblur = null;
                        input.focus();
                        _input.onblur = remove;
                    }
                };
//                moving.elem.parentNode.parentNode.appendChild(e);
                document.body.appendChild(e);
            };
            var $sort = function (moving, obj) {
                if (moving instanceof Object) {
                    obj = moving.obj;
                }
                if (obj === obj.root.index) {
                    return;
                }
                if (obj.children) {
                    return;
                }
                if (obj.checkbox) {
                    obj.root.checked = !obj.root.checked;
                    var array = scope.$eval(scope.$DataName + "_filtered") || $scope.$eval(scope.$DataName);
                    var checked = scope.checked || [];
                    checked.splice(0);
                    array && array.forEach(function (o) {
                        o.checked = moving.obj.root.checked;
                    });
                    if (moving.obj.root.checked) {
                        checked.push.apply(checked, array);
                    }
                    scope.checked = checked;
                    return;
                }
                if (obj.nosort) {
                    return;
                }
                var sort = moving === 1 || moving === -1 ? moving : obj.sort === 1 ? -1 : 1;
                obj.root.sort = obj;
                obj.sort = sort;
                var array = $scope.$eval(scope.$DataName);
                var $ = $scope.$new();
                var key = scope.$KeyName;
                var value = scope.$ValueName;
                var v = obj.value;
                var setter = $parse(scope.$DataName).assign;
                setter && setter($scope, array && array.map(function (o, cx) {
                    $[key] = cx;
                    $[value] = o;
                    o.$value = $.$eval(v);
                    o.$cx = cx;
                    return o;
                }).sort(function (o1, o2) {
                    var v1 = o1.$value;
                    var v2 = o2.$value;
                    var v = (v1 === v2 ? o1.$cx - o2.$cx : v1 > v2 ? 1 : -1);
                    return sort === 1 ? v : -v;
                }));
                scope.$ScrollTopTo(0);
            };
            var focus = function (index) {
                index = parseInt(index);
                var focus = scope.focus();
                var obj = scope.$Titles.focus;
                obj && (delete obj.focus);
                var o = scope.$eval(scope.$DataName);
                var c = o && o[index];
                if ((focus && focus(c, scope.$LineStart + index - 1)) !== false) {
                    scope.$Titles.focus = c;
                }
                scope.$apply();
            };
            scope.$watch("$Position[0]", function (row) {
                var position = scope.$Position;
                if (row >= 0) {
                    scope.onrow && scope.onrow({$row: row, $col: position[1]});
                }
            });
            scope.$watch("$Position[1]", function (col) {
                var position = scope.$Position;
                if (col >= 0) {
                    scope.oncol && scope.oncol({$row: position[0], $col: col});
                    scope.$Titles.leaf.forEach(function (obj, cx) {
                        obj.hover = cx === col;
                    });
                }
            });
            scope.$Sort = $sort;
            var adaptTarget = function (e) {
                var tmp = e.target;
                while (tmp && !(tmp.hasAttribute && tmp.hasAttribute('resizex'))) {
                    tmp = tmp.parentNode;
                }
                var result;
                if (tmp) {
                    var position = getScreenPosition(tmp);
                    position.right = position.left + tmp.offsetWidth;
                    var td = tmp.getAttribute("tr-td");
                    var td_tmp = td.split("-");
                    if (e.clientX - position.left < 7 || position.right - e.clientX < 7) {
                        if (position.right - e.clientX > 7) {//\u4f18\u5148\u54cd\u5e94\u53f3\u8fb9
                            td = td_tmp[1] - td_tmp[2];
                        } else {
                            td = td.split("-")[1] - 0;
                        }
                        if (td - 0 >= 0) {
                            $element.css({'cursor': 'e-resize'});
                            return td;
                        }
                    }
                    result = td_tmp;
                    result.push(tmp);
                    result.push(e);
                    $timeout(function () {
                        var pos = [parseInt(result[0]), parseInt(result[1]), parseInt(result[2]), tmp, e];
                        scope.$Position = pos;
                    });
                }
                $element.css({'cursor': 'default'});
                return result;
            };
            var draging, moving, downtime = 0;
            scope.$Summary = function (obj) {
                if (!obj.summary) {
                    return;
                }
                var array = $scope.$eval(scope.$DataName);
                var $ = $scope.$new();
                var key = scope.$KeyName;
                var value = scope.$ValueName;
                var v = obj.value;
                var summary = 0;
                array && array.map(function (o, cx) {
                    $[key] = cx;
                    $[value] = o;
                    summary += parseFloat($.$eval(v));
                });
                return $.$eval(summary + '|' + obj.format);
            };
            var $setting = function (t) {
                if ($setting.elem) {
                    return;
                }
                var elem = angular.element("<scroll-content></scroll-content>");
                var position = getScreenPosition($element[0]);
                popup("/Directive/grid_setting", {
                    $Titles: scope.$Titles,
                    $ViewStyle: {
                        right: window.innerWidth - (position.left + $element[0].offsetWidth) + "px",
                        top: (position.top + scope.$Titles.tHeight) + 'px',
                        left: 'auto',
                        height: "500px",
                        width: "300px",
                        boxShadow: '0 0 5px rgba(0,0,0,0.1)'
                    }
                }).right().onclose(function () {
                    var settings = exportTitlesSettings(scope.$Titles);
                    grid_setting.save(settings);
                });
                return;
            };
            $element.on("mousedown", function (e) {
                scope.$ScrollLock='x';
                $element.off("mousemove", adaptTarget);
                $document.on("mousemove", onmousemove);
                $document.on("mouseup", onmouseup);
                var tb = adaptTarget(e);
                moving=null;
                draging=null;
                if (angular.isNumber(tb)) {
                    //\u8c03\u6574\u5bbd\u5ea6
                    draging = {obj: scope.$Titles.leaf[tb], x: e.clientX, tb: tb};
                } else if (angular.isArray(tb)) {
                    if (tb[0] === "") {
                        downtime = Date.now();
                        //\u8c03\u6574\u4f4d\u7f6e
                        var obj = scope.$Titles.leaf[tb[1]];
                        var offset = -(-tb[2]) - 1;
                        while (obj && obj.offset !== obj.index + offset) {
                            obj = obj.parent;
                        }
                        var position1, position2;
                        if (tb[3].offsetParent) {
                            position1 = getScreenPosition(tb[3].offsetParent);
                        } else {
                            position1 = {left: 0, top: 0};
                        }
                        position2 = getScreenPosition(tb[3]);
                        moving = {
                            obj: obj,
                            task: obj.tclick ? obj.tclick : e.target.getAttribute('sort') === 'filter' ? filter : $sort,
                            x: e.clientX,
                            y: e.clientY,
                            base: {
                                left: position2.left - position1.left,
                                top: position2.top - position1.top
                            },
                            objs: scope.$Titles.leaf.slice(obj.index, obj.offset + 1),
                            elem: tb[3]
                        };
                    } else {
                        //\u7f16\u8f91
                        var obj = scope.$Titles.leaf[tb[1]];
                        if (obj.checkbox) {
                            var array = scope.$eval(scope.$DataName + "_filtered") || $scope.$eval(scope.$DataName);
                            var c = scope.$eval(scope.$DataName)[tb[0]];
                            c.checked = !c.checked;
                            var all_checked = true;
                            var checked = scope.checked || [];
                            checked.splice(0);
                            for (var cx = 0, dx = array.length; cx < dx; cx++) {
                                if (!array[cx].checked) {
                                    all_checked = false;
                                } else {
                                    checked.push(array[cx]);
                                }
                            }
                            obj.root.checked = all_checked;
                            scope.checked = checked;
                        } else {
                            $edit(tb[3], obj && obj.editor);
                        }
                        focus(tb[0]);
                    }
                }
            });

            var onmousemove = function (e) {
                if (draging) {
                    downtime = 0;
                    var deltaX = e.clientX - draging.x;
                    var tmp = draging.obj;
                    if (parseInt(tmp.style.width) + deltaX > 20) {
                        while (tmp) {
                            var style = angular.copy(tmp.style);
                            style.width = parseInt(style.width) + deltaX + 'px';
                            tmp.style = style;
                            tmp = tmp.parent;
                        }
                        draging.x = e.clientX;
                    }
                    scope.$apply();
                } else if (moving) {
                    var obj = moving.obj;
                    if (obj.nodrag) {
                        return;
                    }
                    var deltaX = e.clientX - moving.x;
                    if (obj.position !== 'absolute' && Math.abs(deltaX) < 10) {
                        return;
                    }
                    downtime = 0;
                    clearTimeout(moving.movingtime);
                    var elem = moving.elem;
                    var parent = elem.parentNode;
                    var elemWidth = elem.offsetWidth;
                    var parentLeft = getScreenPosition(parent).left;
                    var parentLeft2 = parentLeft - getScreenPosition(elem.offsetParent).left;
                    var parentWidth = parent.offsetWidth;
                    if (moving.base.left + deltaX + elemWidth / 2 > parentLeft2 + parentWidth) {
                        deltaX = parentLeft2 + parentWidth - moving.base.left - elemWidth / 2;
                    }
                    if (moving.base.left + deltaX < parentLeft2 - elemWidth / 2) {
                        deltaX = parentLeft2 - moving.base.left - elemWidth / 2;
                    }
                    var gridLeft = 0;
                    var gridWidth = $element[0].offsetWidth;
                    if (moving.base.left + deltaX + elemWidth > gridLeft + gridWidth) {
                        deltaX = gridLeft + gridWidth - moving.base.left - elemWidth;
//                        scope.$ScrollX(scope.$ScrollX() - 10);//\u591a\u7ba1\u95f2\u4e8b
                    }
                    if (moving.base.left + deltaX < gridLeft) {
                        deltaX = gridLeft - moving.base.left;
//                        scope.$ScrollX(scope.$ScrollX() + 10);
                    }
                    var tmp = elem;
                    var rootTitle;
                    while (tmp) {
                        if (tmp.className.indexOf('grid-title') >= 0) {
                            rootTitle = tmp;
                        }
                        tmp = tmp.offsetParent;
                    }
                    obj.pLeft = getScreenPosition(parent).left - getScreenPosition(rootTitle).left;

                    angular.extend(obj.style, {
                        left: moving.base.left + deltaX + obj.pLeft + 'px',
                        position: 'absolute',
                        opacity: 0.5,
                        boxShadow: "0 0 4px rgba(0,0,0,0.3)",
                        zIndex: 2,
                        margin: ""
                    });
                    var left = parseInt(obj.style.left);
                    moving.objs.forEach(function (o) {
                        var style = o.style;
                        style.left = left + 'px';
                        style.position = 'absolute';
                        style.opacity = 0.8;
                        style.boxShadow = "0 0 4px rgba(0,0,0,0.3)";
                        style.zIndex = 2;
                        left += parseInt(style.width);
                        o.style = style;
                    });
                    var spliter = -1, overindex = -1;
                    var _center = e.clientX;
                    var curLeft = parentLeft;
                    var floatChildren = obj.parent.children.filter(function (o, cx) {
                        var available = o === obj;
                        if (available) {
                            spliter = cx;
                        } else {
                            if (parseInt(o.style.width) / 2 + curLeft < _center) {
                                overindex = cx;
                            }
                        }
                        curLeft += parseInt(o.style.width);
                        return !available;
                    });
                    var finalIndex = overindex < spliter ? overindex + 1 : overindex;
                    var width = parseInt(obj.style.width);
                    if (moving.obj.parent.children[finalIndex].nodrag) {
                        return;
                    }
                    if (finalIndex === spliter) {
                        clearmargin(floatChildren);
                        splitobjs(floatChildren, finalIndex, width);
                    } else {
                        clearmargin(floatChildren);
                        splitobjs(floatChildren, finalIndex, width - 10);
                        splitobjs(floatChildren, spliter, 10);
                        scope.$apply();
                        //\u4ee5\u4e0b\u4ee3\u7801\u5ef6\u65f6\u9884\u89c8
//                        if (finalIndex !== moving.target) {
//                            clearmargin(floatChildren);
//                            splitobjs(floatChildren, finalIndex, 10);
//                            splitobjs(floatChildren, spliter, width - 10);
//                        } else {
//                            moving.movingtime = setTimeout(function () {
//                                clearmargin(floatChildren);
//                                splitobjs(floatChildren, finalIndex, width - 10);
//                                splitobjs(floatChildren, spliter, 10);
//                                scope.$apply();
//                            }, 500);
//                        }
                    }
                    moving.target = finalIndex;
                    moving.index = spliter;
                    scope.$apply();
                }
            };
            var clearmargin = function (objs) {
                objs.forEach(function (o) {
                    if (o.style.marginLeft || o.style.marginRight || o.style.boxShadow) {
                        var style = o.style;
                        delete style.boxShadow;
                        delete style.pLeft;
                        if (!o.lockxmargin) {
                            delete style.marginLeft;
                            delete style.marginRight;
                        }
                    }
                });
            };
            var splitobjs = function (objs, index, width) {
                if(objs[index].lockxmargin){
                    return ;
                }
                if (index === 0) {
                    var style = {};
                    angular.copy(objs[index].style, style);
                    style.marginLeft = width + "px";
                    style.boxShadow = "-4px 0 4px rgba(0,0,0,0.1)";
                    objs[index].style = style;
                } else if (index === objs.length) {
                    var style = {};
                    angular.copy(objs[index - 1].style, style);
                    style.marginRight = width + "px";
                    style.boxShadow = "4px 0 4px rgba(0,0,0,0.1)";
                    objs[index - 1].style = style;
                } else {
                    var style1 = {};
                    var style = {};
                    angular.copy(objs[index - 1].style, style1);
                    angular.copy(objs[index].style, style);

                    style1.boxShadow = "4px 0 4px rgba(0,0,0,0.1)";
                    style.marginLeft = width + "px";
                    style.boxShadow = "-4px 0 4px rgba(0,0,0,0.1)";
                    objs[index - 1].style = style1;
                    objs[index].style = style;
                }
            };
            scope.$Set = $setting;

            $element.on("mousemove", adaptTarget);
            var onmouseup = function () {
                $document.off("mousemove", onmousemove);
                $document.off("mouseup", onmouseup);
                $element.on("mousemove", adaptTarget);
                if (draging) {
                    var obj = draging.obj;
                    if (!obj.child) {
                        obj.width = obj.style.width;
                        var settings = exportTitlesSettings(scope.$Titles);
                        grid_setting.save(settings);
                    }
                }
                draging = null;
                if (moving) {
                    if (Date.now() - downtime < 500) {
                        if (moving.task) {
                            if (typeof moving.task === 'string') {
                                scope.$builtin = scope;
                                scope.$eval(moving.task);
                            } else if (typeof moving.task === 'function') {
                                moving.task(moving);
                            }
                        }
                    }
                    var obj = moving.obj;
                    var style = {};
                    angular.copy(obj.style, style);
                    style.left = '';
                    style.position = '';
                    style.opacity = "";
                    style.boxShadow = "";
                    style.zIndex = "";
                    obj.style = style;
                    moving.objs.forEach(function (o) {
                        var style = {};
                        angular.copy(o.style, style);
                        style.left = "";
                        style.position = '';
                        style.opacity = '';
                        style.boxShadow = "";
                        style.zIndex = "";
                        o.style = style;
                    });
                    if (moving.target !== moving.index) {
                        var children = moving.obj.parent.children;
                        if (!children[moving.target].nodrag) {
                            children.splice(moving.index, 1);
                            children.splice(moving.target, 0, moving.obj);
                            rebuildIndexAndOffset(scope.$Titles);
                            var settings = exportTitlesSettings(scope.$Titles);
                            grid_setting.save(settings);
                        }
                    }
                    clearTimeout(moving.movingtime);
                    clearmargin(moving.obj.parent.children);
                    scope.$apply();
                }
                moving = null;
                delete scope.$ScrollLock;
            };
            var init = function (valueName, keyName, dataName) {
                if (init.ed) {
                    throw 'already inited!';
                }
                init.ed = true;
                scope.$ValueName = valueName;
                scope.$KeyName = keyName;
                scope.$DataName = dataName;
                var deep = 0, _titles = [], _source = [];
                var Titles = {
                    style: {},
                    index: 0,
                    deep: 0,
                    height: $element.attr("title-height") || 0,
                    showIndex: $element[0].hasAttribute("show-index"),
                    showFoot: $element[0].hasAttribute("show-foot"),
                    tHeight: 44,
                    editable: $element[0].hasAttribute("editable"),
                    summary: $element[0].hasAttribute("summary"),
                    lHeight: $element.attr("line-height") || 44
                };
                var f = function (children, depth, parent) {
                    depth++;
                    if (deep < depth) {
                        deep = depth;
                    }
                    var titles = [];
                    for (var i = 0, d = children.length; i < d; i++) {
                        var r = children[i];
                        if (!r.tagName && !r.innerText) {
                            continue;
                        }
                        var template = r.getAttribute("template");
                        if (template && cellTemplates[template]) {
                            template = cellTemplates[template]();
                        } else {
                            template = $scope.$eval(template) || template;
                            -function () {
                                template = template && template.replace(/ng-\w+\s*=\s*("[^"]+"|'[^']+'|[^\s\/>]+)/g, function (match) {
                                    var ms = match.split("=");
                                    return ms[0] + "=options($,$event,'" + ms[1].replace(/^["']+|\s+|['"]+$/g, "").replace(/'/g, '\\\'') + "')";
                                });
                            }();
                        }

                        var title = {
                            deep: depth,
                            index: _titles.length,
                            style: {},
                            root: Titles,
                            name: r.getAttribute("name"),
                            field: r.getAttribute("field"),
                            format: r.getAttribute("format"),
                            summary: r.hasAttribute && r.hasAttribute("summary"),
                            editable: Titles.editable && !r.hasAttribute("editnone") || r.hasAttribute && r.hasAttribute("editable"),
                            sort: 0,
                            icon: r.hasAttribute("icon") && r.getAttribute("icon"),
                            image: r.hasAttribute("image") && r.getAttribute("image"),
                            nosort: r.hasAttribute("nosort"),
                            nodrag: r.hasAttribute("nodrag"),
                            width: r.getAttribute("width") || r.getAttribute("fixwidth") || r.getAttribute("min-width"),
                            fixwidth: r.hasAttribute("fixwidth"),
                            source: r.getAttribute('source'),
                            editor: r.getAttribute("editor"),
                            lockx: r.hasAttribute('onscroll-x-in-screen'),
                            checkbox: r.hasAttribute("checkbox"),
                            isset: r.hasAttribute("custom"),
                            ticon: r.getAttribute("ticon"),
                            thover: r.getAttribute("thover"),
                            tactive: r.getAttribute("tactive"),
                            tclick: r.getAttribute("tclick"),
                            template: template//\u81ea\u5b9a\u4e49\u5185\u5bb9
                        };
                        title.id = r.getAttribute("colid") || title.field || ("colid" + titles.length);

                        titles.push(title), _source.push(title);
                        if (r.tagName.toLowerCase() === 'grid:join') {
                            title.children = r.children && f(r.children, depth, title);
                            title.style.width = sum(title.children.map(function (t) {
                                return t.style.width;
                            })) + "px";
                        } else {
                            _titles.push(title);
                            title.value = title.field === '' ? scope.$KeyName + "+$LineStart" : title.field ? scope.$ValueName + "." + title.field : scope.$ValueName;
                            //\u6a21\u7248
                            title.template = title.template || parseFormat(title);
                            title.ng = function (outerHTML) {
                                var ng = null;
                                outerHTML && outerHTML.replace(/ng-\w+\s*=\s*("[^"]+"|'[^']+'|[^\s\/>]+)/g, function (match) {
                                    var ms = match.split("=");
                                    var k = ms[0];
                                    if (k === "ng-style") {
                                        angular.extend(title.style, $scope.$eval(ms[1].replace(/^["']+|\s+|['"]+$/g, "")));
                                    } else {
                                        if (!ng) {
                                            ng = {};
                                        }
                                        var opt = "options($,$event,'" + ms[1].replace(/^["']+|\s+|['"]+$/g, "").replace(/'/g, '\\\'') + "')";
                                        ng[k] = (opt);
                                    }
                                    return match;
                                });
                                return ng;
                            }(r.outerHTML);
                            title.style.width = function () {
                                var width = title.width;
                                width = width && width.trim();
                                if (!width) {
                                    return widths[title.format] || "78px";
                                }
                                var $elementWidth = $element.offsetWidth;
                                if (width[width.length] === "%") {
                                    return ($elementWidth * parseInt(width) / 100).toFixed(2) + 'px';
                                } else if (width.slice(0, 4) === 'calc') {
                                    return $scope.$eval(width.replace(/\d+%/g, function (match) {
                                        return parseInt(match) * $elementWidth / 100;
                                    }).replace(/px/g, "").replace(/rem|em/g, "*16")) + 'px';
                                }
                                return width;
                            }();
                            title.style.height = Titles.lHeight + 'px';
                            title.style.textAlign = r.getAttribute("align") || "center";
                            title.editor = title.editable && title.field && getEditor(title.editor || title.format, title.value, title.source);
                            title.filter = r.hasAttribute("nofilter") ? false : (title.checkbox || title.nosort) ? false : r.getAttribute("filter") || "normal";
                        }
                        title.offset = _titles.length - 1;
                        title.parent = parent;
                        Titles.summary = Titles.summary || !!title.summary;
                    }
                    return titles;
                };
                var addonCols = [], appendsCols = [];
                Titles.showIndex && addonCols.push(angular.element("<div colid=1 name=\u5e8f\u53f7 nodrag field fixwidth onscroll-x-in-screen ></div>")[0]);
                scope.multiSelect && addonCols.push(angular.element("<div colid=2 nodrag onscroll-x-in-screen width=68px fixwidth checkbox ></div>")[0]);
                (attr.onedit === "" || attr.ondrop === "" || attr.onedit || attr.ondrop) && appendsCols.push(function () {
                    return angular.element("<div colid=3 name='\u64cd\u4f5c' template='options' width=196px fixwidth nosort></div>")[0];
                }());
                (attr.custom !== 'false') && appendsCols.push(function () {
                    return angular.element("<div colid=4 name='' template='&nbsp;' width=96px fixwidth nosort nodrag thover='4c8bf5' tactive='3c7be5' tclick='$builtin.$Set()' custom ticon='set' nofilter></div>")[0];
                }());
                Titles.children = f((addonCols).concat(function () {
                    var result = [];
                    if (attr.fields) {
                        var o = $scope.$eval(attr.fields);
                        if (o && typeof o === "object") {
                            if (angular.isArray(o)) {
                                //\u652f\u6301\u5d4c\u5957\u7684
                                var isArray = angular.isArray;
                                var s = function (o) {
                                    if (isArray(o)) {
                                        var j = document.createElement("grid:join");
                                        for (var k in o) {
                                            var v = o[k];
                                            j.appendChild(s(o));
                                        }
                                    } else {
                                        var j = document.createElement("div");
                                        for (var k in o) {
                                            var v = o[k];
                                            j.setAttribute(k, v);
                                        }
                                    }
                                    result.push(j);
                                };
                                s(o);
                            } else {
                                //\u4e0d\u652f\u6301\u5d4c\u5957\u7684
                                for (var k in o) {
                                    var v = o[k];
                                    var div = document.createElement('div');
                                    div.setAttribute('name', k);
                                    typeof v === 'string' && div.setAttribute('field', v);
                                    result.push(div);
                                }
                            }
                        }
                    }
                    return result;
                }()).concat(Array.prototype.slice.apply(transclude(), [0])).concat(appendsCols), 0, Titles);
                Titles.style.width = sum(Titles.children.map(function (t) {
                    return t.style.width;
                })) + 'px';
                Titles.leaf = _titles;
                Titles.source = _source;
                Titles.index = Titles.showIndex ? _titles[0] : null;
                Titles.root = Titles;
                Titles.height = Titles.height || deep * parseInt(Titles.tHeight) + "px";
                scope.$Titles = Titles;
                var recount = function () {
                    var h = parseInt(scope.$Titles.height);
                    var bh = scope.$Titles.summary ? parseInt(scope.$Titles.height) : 0;
                    var lh = parseInt(scope.$Titles.lHeight);
                    scope.$Titles.lineCount = parseInt(($element[0].offsetHeight - h - bh) / lh);
                    scope.$ScrollY(scope.$ScrollY() || 0);
                };
                scope.$watch(function () {
                    return $element[0].offsetHeight;
                }, recount);
                $scope.$watch(scope.$DataName, function (array) {
                    var checked = scope.checked || [];
                    checked.splice(0);
                    array && array.forEach(function (a) {
                        if (a.checked) {
                            checked.push(a);
                        }
                    });
                    scope.checked = checked;
                    scope.$Titles.checked = checked.length && checked.length < array.length;
                    scope.$ScrollY(0);
                });
            };
            scope.$ScrollH = function () {
                if (!scope.$Titles) {
                    return 9;
                }
                return scope.$Titles.lineCount * scope.$Titles.lHeight || 0;
            };
            scope.$ScrollTH = function () {
                if (!scope.$Titles) {
                    return 10;
                }
                var data = scope.$eval(scope.$DataName + "_filtered") || $scope.$eval(scope.$DataName);
                return (data && data.length || 0) * scope.$Titles.lHeight;
            };
            scope.$ScrollX = function (x) {
                if (arguments.length) {
                    if (!scope.$Titles) {
                        return 0;
                    }
                    var left = x, marginLeft = 0, emptyLeft = 0, last;
                    scope.$Titles.leaf.forEach(function (a) {
                        if (left < marginLeft && a.lockx) {
                            a.style.marginLeft = marginLeft - x + 'px';
                            a.style.position = 'absolute';
                            a.style.zIndex = 2;
                            if (last) {
                                delete last.style.borderRight;
                            }
                            a.style.borderRight = '1px solid #ccc';
                            a.lockxmargin = true;
                            last = a;
                            marginLeft += parseInt(a.style.width);
                            emptyLeft += parseInt(a.style.width);
                        } else {
                            delete a.style.borderRight;
                            delete a.style.marginLeft;
                            delete a.style.position;
                            delete a.style.zIndex;
                            if (emptyLeft > 0) {
                                a.style.marginLeft = emptyLeft + 'px';
                                emptyLeft = 0;
                            }
                        }
                        left += parseInt(a.style.width);
                    });
                    if (!scope.$$phase && !scope.$root.$$phase) {
                        scope.$apply();
                    }
                    gridContainer.scrollLeft = -x;
                } else {
                    return -gridContainer.scrollLeft;
                }
            };
            scope.$ScrollY = function (y) {
                if (angular.isDefined(y)) {
                    if (!scope.$Titles) {
                        return 0;
                    }
                    var deltay = -parseInt(y / 2 / scope.$Titles.lHeight) * 2;
                    var data = scope.$eval(scope.$DataName + "_filtered") || $scope.$eval(scope.$DataName);
                    if (data) {
                        scope.$LineStart = 1 + deltay;
                        scope.$Titles.style.marginTop = y + deltay * scope.$Titles.lHeight + 'px';
                        scope.$Titles.style.marginBottom = -15 * scope.$Titles.lHeight + 'px';
                        data = data.slice(deltay, deltay + scope.$Titles.lineCount + 15);
                        var append = [];
                        if (data.length < scope.$Titles.lineCount + 15) {
                            for (var cx = data.length, dx = scope.$Titles.lineCount + 15; cx < dx; cx++) {
                                append.push({});
                            }
                        }
                        scope.$Append = append;
                        $parse(scope.$DataName).assign(scope, data);
                    }
                } else {
                    return (parseInt(scope.$Titles.style.marginTop) || 0) - ((scope.$LineStart - 1) * scope.$Titles.lHeight);
                }

            };
            var grid_setting = null;

            var model_watcher = scope.$watch(function () {
                return '(_,$) in ' + attr.ngModel;
            }, function (ngGrid) {
                scope.$NgGrid = ngGrid;
                var matchs = ngGrid && ngGrid.match(NG_GRID_REGEXP);
                if (!matchs) {
                    throw 'ngGrid\u683c\u5f0f\u4e0d\u6b63\u786e';
                }
                model_watcher();
                var valueName = matchs[1] || matchs[3], keyName = matchs[2] || '$index', dataName = matchs[4];
                grid_setting = init_setting($scope.$ViewRelative, dataName);
                grid_setting(function (setting) {
                    init(valueName, keyName, dataName);
                    applyTitlesSettings(scope.$Titles, setting);
                });
            });
            var firstTime = 1;
            scope.$watch(function () {
                return scope.$Titles && ($element[0].offsetWidth - parseInt(scope.$Titles.style.width));
            }, function (deltaWidth) {
                if (!deltaWidth) {
                    return;
                }
                if (typeof deltaWidth !== 'number') {
                    return;
                }
                var Titles = scope.$Titles;
                //grid\u5217\u5bbd\u9002\u5e94\u89c4\u5219\u53d8\u66f4\uff1a\u7b2c\u4e00\u6b21\u6253\u5f00grid\u975e\u9501\u5b9a\u5217\u5bbd\u5e73\u5747\u5206\u914d\uff0c\u624b\u52a8\u62d6\u52a8\u53ea\u6709\u53ea\u540e\u4e00\u5217\u6539\u53d8
                if (firstTime) {
                    firstTime = 0;
                    rebuildWidth(Titles, deltaWidth);
                    return;
                }
                var tmp = Titles.leaf[Titles.leaf.length - 1];
                if (deltaWidth + parseInt(tmp.style.width) > parseInt(tmp.minWidth || 80)) {
                    while (tmp) {
                        tmp.style.width = parseInt(tmp.style.width) + deltaWidth + "px";
                        tmp = tmp.parent;
                    }
                }
            });

            var gridContainer = $element[0].getElementsByClassName("Scroller-Container")[0];

            scope.$watch(function () {
                if ($editor) {
                    var e = $editor.elem;
                    var p = getScreenPosition(e);
                    if ($editor.left === p.left && $editor.top === p.top && e.offsetHeight === $editor.height && e.offsetWidth === $editor.width) {

                    } else {
                        $editor.remove();
                    }
                }
            }, function () {

            });

            scope.$Style = function (t) {
                if (!t) {
                    return;
                }
                var tmp = t;
                var _style = t.style;
                var _lineHeight = t.root.lHeight;
                var _baseStyle = t.basestyle || {};
                while (tmp.parent && tmp.parent.children[0] === tmp) {
                    tmp = tmp.parent;
                    if (tmp.style.boxShadow) {
                        var style = {};
                        angular.copy(_baseStyle, style);
                        angular.copy(_style, style);
                        style.boxShadow = tmp.style.boxShadow;
                        style.marginLeft = tmp.style.marginLeft;
                        style.lineHeight = _lineHeight + "px";
                        return style;
                    }
                }
                return t.style;
            };
        }
    };
}]);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.directive('gridInput', ["regexp", "$compile", "isChildElement", "getScreenPosition", function (regexp, $compile, isChildElement, getScreenPosition) {
    var NG_GRID_REGEXP = regexp.NG_GRID;
    return {
        restrict: 'E',
        template: '<div class="grid-input" ng-style="$Titles.style" ></div>',
        replace: true,
        scope: false,
        compile: function () {
            return function (scope, elem, attr) {
                var objs = [];
                /**
                 * \u83b7\u53d6\u6307\u5b9a\u5750\u6807\u7684\u5143\u7d20
                 */

                /**
                 * \u8bbe\u7f6e\u6307\u5b9a\u5750\u6807\u7684\u5143\u7d20
                 */
                var scp=null;
                scope.$watch('$Titles.leaf', function (leaf) {
                    if(!leaf){
                        return;
                    }
                    scp&&scp.$destroy();
                    scp=scope.$new();
                    var cols = scope.$Titles.leaf;
                    var template = "<div class='tr' ng-class=\"{'focus':" + scope.$ValueName + "===$Titles.focus}\" ng-repeat=\"" + scope.$NgGrid + "\" >" + cols.map(function (col, td) {
                        var ng=col.ng;
                        var arr=[];
                        for(var k in ng){
                            var v=ng[k];
                            arr.push(k+"="+v);
                        }
                        return "<div ng-style='$Style($Titles.leaf[" + td + "])' "+arr.join(" ")+(ng?" class=ng":"")+" resizex tr-td='{{" + scope.$KeyName + "}}-" + td + "-1' >" + col.template + "</div>";
                    }).join("") + "</div>" + '<div class="tr" ng-repeat="a in $Append" ng-style="{width:$Titles.style.width}"><div ng-repeat="t in $Titles.leaf" ng-style="$Style(t)">&nbsp;</div></div>';
                    elem.html(template);
                    $compile(elem.contents())(scp);
                });
            };
        }
    };
}]);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.directive("icon", function () {
    var scripts = document.getElementsByTagName("script");
    var isCrossDomain = function (url) {
        var origin = location.origin || (location.protocol + '//' + location.host);
        return url.slice(0, 4) === 'http' && url.slice(0, origin.length) !== origin;
    };
    var src = [].map.apply(scripts, [function (script) {
            return script.src;
        }]).filter(function (s) {
        return /yjkj.js/.test(s);
    })[0];
    var version = src.slice(src.indexOf("?") + 1);
    var isFile = function (url) {
        return url.slice(url.length - 4).match(/.svg|.png|.jpg|.gif/) || url.slice(0, 10) === "data:image";
    };
    var $ = function (name) {
        return document.createElement(name);
    };
    var getColor = function (color) {
        if (/^([a-fA-f0-9]{6,8})$/.test(color)) {//rgba,a\u53ef\u4ee5\u662f1\u4f4d\u62162\u4f4d
            return [parseInt(color.slice(0, 2), 16), parseInt(color.slice(2, 4), 16), parseInt(color.slice(4, 6), 16), parseInt((color.slice(6) + color.slice(6)).slice(0, 2) || "ff", 16)];
        }
        if (/^([a-fA-f0-9]{3,5})$/.test(color)) {//rgba\uff0ca\u53ef\u4ee5\u662f1\u4f4d\u62162\u4f4d
            return [parseInt(color[0] + color[0], 16), parseInt(color[1] + color[1], 16), parseInt((color.slice(2) + color.slice(2)).slice(0, 2), 16)];
        } else {
            var canvas = $("canvas");
            canvas.width = 1;
            canvas.height = 1;
            var ctx = canvas.getContext("2d");
            ctx.rect(0, 0, 1, 1);
            ctx.fillStyle = color;
            ctx.fill();
            return ctx.getImageData(0, 0, 1, 1).data;
        }
    };
    var toColor = function (canvas, color) {
        var context = canvas.getContext("2d");
        var pixels = context.getImageData(0, 0, canvas.width, canvas.height);
        var data = pixels.data;
        for (var cx = 0, dx = data.length >> 2; cx < dx; cx++) {
            var inc = cx << 2;
            data[inc] = color[0];
            data[inc + 1] = color[1];
            data[inc + 2] = color[2];
        }
        context.putImageData(pixels, 0, 0);
    };
    var svgToColor = function (svgText, color) {
        if (!color) {
//            console.log(svgText);
            return "data:image/svg+xml," + svgText;
        }
        return "data:image/svg+xml," + encodeURIComponent(svgText.replace(/<path[^>]*>/g, function (path) {
            path = path.replace(/\sfill(\s*=\s*[^\s>]+)?\s?/g, " ");
            path = path.slice(0, 5) + " fill=\"rgba(" + [].join.apply(color, [","]) + ")\"" + path.slice(5);
            return path;
        }));
    };

    return function (scope, elem, attr) {
        elem.addClass("icon");
        var color = attr.color && getColor(attr.color),
                hoverColor = attr.hoverColor && getColor(attr.hoverColor),
                activeColor = attr.activeColor && getColor(attr.activeColor);
        var image = new Image, hoverImage = new Image, activeImage = new Image, currentImage = image;
        var apply = function (image) {
            if (image) {
                currentImage = image;
            }
            currentImage.src && elem.css({
                backgroundImage: "url('" + currentImage.src + "')"
            });
        };
        if (hoverColor) {
            elem.on("mouseover", function () {
                apply(hoverImage);
            });
            elem.on("mouseleave", function () {
                apply(image);
            });
        }
        if (activeColor) {
            elem.on("mousedown", function () {
                apply(activeImage);
            });
            elem.on("mouseup", function () {
                apply(hoverImage);
            });
        }
        var init = function (icon_url) {
            var img = new Image;
            img.onload = function () {
                var canvas = $("canvas");
                var width = img.width;
                var height = img.height;
                canvas.width = width;
                canvas.height = height;
                var context = canvas.getContext("2d");
                context.drawImage(img, 0, 0, width, height);
                if (color) {
                    toColor(canvas, color);
                }
                image.src = canvas.toDataURL();
                if (hoverColor) {
                    toColor(canvas, hoverColor);
                    hoverImage.src = canvas.toDataURL();
                }
                if (activeColor) {
                    toColor(canvas, activeColor);
                    activeImage.src = canvas.toDataURL();
                }
                apply();
            };
            img.src = icon_url;

        };
        var watcher = scope.$watch(function () {
            return scope.$eval(attr.icon) || attr.icon;
        }, function (icon, last) {
            if (last && !isFile(last)) {
                elem.removeClass(last);
            }
            var versionicon = function () {
                if (icon.slice(0, 4) === 'http') {
                    icon = icon + "?" + version;
                }
            };
            if (icon && isFile(icon)) {
                if (icon.slice(icon.length - 4) === '.svg') {
                    //IE\u7cfb\u5217\uff0c\u7ed8\u5236svg\u540e\u7684cavans\uff0c\u65e0\u6cd5\u6267\u884cgetImageData\uff0ctoDataURL\u7b49\u65b9\u6cd5
                    versionicon();
                    var xhr = new XMLHttpRequest();
                    xhr.open('get', icon);
                    xhr.onload = function () {
                        var text = xhr.responseText;
                        image.src = svgToColor(text, color);
                        hoverImage.src = svgToColor(text, hoverColor);
                        activeImage.src = svgToColor(text, activeColor);
                        apply();
                    };
                    xhr.send();
                } else if (isCrossDomain(icon)) {
                    image.src = icon;
                    hoverImage.src = icon;
                    activeImage.src = icon;
                    apply();
                } else {
                    versionicon();
                    init(icon);
                }
            } else if(icon&&icon.indexOf(".")===-1||!attr.icon){
                icon && elem.addClass(icon);
                -function () {
                    var text = getComputedStyle(elem[0]).backgroundImage;
                    icon = text && text.replace(/^\s*url\s*\(\s*['"]?|['"]?\s*\)\s*$/g, "");
                    if (icon) {
                        watcher();
                        versionicon();
                        init(icon);
                    }
                }();
            }else{
                image.src="";
                hoverImage.src="";
                activeImage.src="";
                apply();
            }

        });
    };
});
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//yjkj.factory("$http2",function($http){
//        var pre_do=function(data){
//            return data;
//        };
//        var aft_do=function(data){
//            return data;
//        };
//    var http2=function(url,data){
//        pre_do(data);
//        var success,error;
//        $http.post(url,data).success(function(result){
//            var data=aft_do(result);
//            success&&success(data);
//        }).error(function(){
//            error&&error.apply(null,Array.prototype.slice.apply(arguments,[0]));
//        });
//        var res={
//            success:function(callback){
//                success=callback;
//                return res;
//            },
//            error:function(callback){
//                error=callback;
//                return res;
//            }
//        };
//        return res;
//    };
//    return http2;
//})

yjkj.directive('list', ["$parse", "getMatchList", "$register", "$templateCache", "hashMap", "popup", "$timeout", function ($parse, getMatchList, $register, $templateCache, hashMap, popup, $timeout) {
    $register.controller('DirectiveSelecteditor', function () {

    });
    $templateCache.put("builtin/directive/selecteditor.html", "<div>\u7f16\u8f91\u9009\u9879</div>");
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            ngModel: '=?',
            source: '=',
            filter: '=?',
            multiSelect: '=',
            editLabel: '@',
            editable: '=',
            oncheck: '=',
            confirm: '=',
            onitems: '&',
            addEmpty: '='
        },
        replace: true,
        template: function (elem, attr) {
            var genField = function (field, object_name) {
                return object_name + field.replace(/[\+\-\*\/\:]\s*[\w_\$][\w0-9]*/g, function (a) {
                    return a[0] + object_name + a.slice(1).trim();
                });
            };
            var model = (attr.field === "" ? "_" : attr.field ? genField(attr.field, '$.') : "$") + (attr.format ? "|" + attr.format : "");
            var edit = (attr.edit || attr.edit === "" || attr.editable) ? "<div ng-if='editable' class='add' ng-click='$edit(options)'><i></i><span ng-bind='editLabel'></span></div>" : "";
            var confirm = (attr.confirm || attr.confirm === "") ? "<div class='confirm'><anniu enabled='ngModel.length' class='m' ng-click='confirm($event)'>\u786e\u5b9a</anniu></div>" : "";
            var filter = (attr.filterbox || attr.filterbox === '') ? "<div class='text-input' icon hover-color='#f00' active-color='#f00'><input ng-model='filter'  placeholder='\u641c\u7d22'/></div>" : "";
            return "<div class='list' ng-class='{\"y\":$HasYScroll}'>"
                    + filter + "<scroll-content><div class='c' ng-style='style'>"
                    + filter + "<div class='item' ng-class={\"active\":active===''} ng-click='check(\"\")' ng-if='$LineStart===1&&addEmpty' ng-bind='empty_label'></div><div class='item' ng-class='{\"active\":active===$}' ng-repeat='(_,$) in data' ng-click='check($)'><checkbox bind='ischecked($)' ng-if='multiSelect'></checkbox><marker text="
                    + model + " mark=filter></marker></div></div>"
                    + edit + confirm + "</scroll-content>"
                    + edit + confirm + "</div>";
        },
        link: function (scope, elem, attr, ctrl, transclude) {
            scope.editLabel = scope.editLabel || "\u6dfb\u52a0";
            var filterBox = elem[0].getElementsByClassName("text-input")[0];
            var editLabel = elem[0].getElementsByClassName("add")[0];
            var confirmButton = elem[0].getElementsByClassName("confirm")[0];
            var filterBoxHeight = filterBox ? 45 : 0;
            var editLabelHeight = editLabel ? 29 : 0;
            var confirmButtonHeight = confirmButton ? 29 : 0;
            var ischecked = hashMap();
            var indexMap = hashMap();

            scope.$watch('source', function (source) {
                if (scope.multiSelect) {
                    if (!scope.ngModel) {
                        scope.ngModel = [];
                    }
                    var ngModel = scope.ngModel;
                    ngModel.splice(0);
                    ngModel.push.apply(ngModel, source.filter(function (v) {
                        return ischecked(v);
                    }));
                }
                indexMap = hashMap();
                var inc = 0;
                angular.forEach(source, function (value) {
                    indexMap(value, inc);
                    inc++;
                });
            });
            scope.$watch('ngModel', function (model) {
                if (scope.active === model) {
                    return;
                }
                if (scope.multiSelect) {
                    var active = model[0];
                    var source = scope.source;
                    source && angular.forEach(source, function (v) {
                        ischecked(v, false);
                    });
                    angular.forEach(model, function (v) {
                        ischecked(v, true);
                    });
                } else {
                    active = model;
                }
                elem.ready(function () {
                    if (!scope.multiSelect) {
                        scope.active = scope.ngModel;
                    }
                    var tmp = indexMap(active);
                    var max=tmp*lineHeight||0;
                    var min=(tmp-lineCount+6)*lineHeight;
                    var y= scope.$ScrollTopTo();
                    if(y<min){
                        return scope.$ScrollTopTo(-min);
                    }
                    if(y>max){
                        return scope.$ScrollTopTo(-max);
                    }
                     scope.$ScrollTopTo(-y);
               });
            });
            scope.$on("key_next", function () {
                var index = indexMap(scope.ngModel) + 1;
                var source = scope.items || scope.source;

                if (index) {
                    if (index < source.length) {
                        scope.ngModel = source[index];
                    }
                } else {
                    scope.ngModel = source[0];
                }
                scope.$apply();
            });
            scope.$on("key_pre", function () {
                console.log(scope.ngModel)
                var index = indexMap(scope.ngModel) - 1;
                var source = scope.items || scope.source;
                if (index >= 0) {
                    scope.ngModel = source[index];
                } else {
                    scope.ngModel = source[source.length - 1];
                }
                scope.$apply();
            });
            scope.$on("key_btm", function () {
                var source = scope.items || scope.source;
                scope.ngModel = source[source.length - 1];
                scope.$apply();
            });
            scope.$on("key_top", function () {
                var source = scope.items || scope.source;
                scope.ngModel = source[0];
                scope.$apply();
            });


            scope.ischecked = ischecked;
            scope.$edit = function (options) {
                popup("/Directive/selecteditor", {
                    $ViewTitle: '\u6807\u9898',
                    options: options
                }, options).onclose(function () {
                });
            };
            scope.check = function ($) {
                ischecked($, !ischecked($));
                var source = scope.source;
                var source_checked = source && angular.isFunction(source.filter) ? source.filter(function (s) {
                    return ischecked(s);
                }) : function () {
                    var a = {};
                    for (var k in source) {
                        if (ischecked(source[k])) {
                            a[k] = source[k];
                        }
                    }
                    return a;
                }();
                if (scope.oncheck && scope.oncheck($, source_checked, function (value) {
                    if (arguments.length === 1) {
                        ischecked($, value);
                        if (!scope.multiSelect) {
                            if (value) {
                                scope.ngModel = $;
                                scope.active = $;
                            }
                        } else {
                            scope.ngModel = source.filter(function ($) {
                                return ischecked($);
                            });
                        }
                    } else {
                        return ischecked($);
                    }
                }) === false) {
                    ischecked($, !ischecked($));
                    if (scope.multiSelect) {
                        scope.ngModel = source.filter(function ($) {
                            return ischecked($);
                        });
                        scope.active = scope.ngModel;
                    }
                    return;
                }
                if (!scope.multiSelect) {
                    scope.active && scope.active !== $ && (ischecked(scope.active, false));
                    scope.ngModel = $;
                } else {
                    scope.ngModel = source_checked;
                }
                scope.active = scope.ngModel;
            };
            elem.on('selectstart', function (e) {
                e.preventDefault();
                return false;
            });
            var build = function () {
                scope.items = getMatchList(scope.source || [], scope.filter || '', (attr.format?attr.field+"|"+attr.format:attr.field)).$onprocess(function (r) {
                    scope.keeys = Object.keys(scope.items || {});
                }).$onend(function (source) {
                    var computedStyle = getComputedStyle(elem[0]);
                    lineCount = 3 + parseInt((parseInt(computedStyle.maxHeight) || elem[0].offsetHeight) / lineHeight || 15);
                    if (lineCount < 18) {
                        lineCount = 18;
                    }
                    if (source) {
                        indexMap = hashMap();
                        var inc = 0;
                        angular.forEach(source, function (v) {
                            indexMap(v, inc++);
                        });
                    }
                    scope.onitems({$items:scope.items});
                    if(scope.filter){
                        scope.$ScrollTopTo(0);
                    }
                }).$init(scope.items);
                scope.keeys = Object.keys(scope.items || {});
            };
            scope.$watchGroup(['filter', 'source', 'field'], build);
            var lineHeight = 24, lineCount = 18;
            scope.$ScrollH = function () {
                return elem[0].offsetHeight - (editLabelHeight + confirmButtonHeight + filterBoxHeight) || 10;
            };
            var addEmpty = (scope.addEmpty ? 1 : 0);
            if (addEmpty && typeof scope.addEmpty !== 'string') {
                scope.empty_label = $parse(attr.field)(scope.addEmpty) || '\u8bf7\u9009\u62e9';
            } else {
                scope.empty_label = scope.addEmpty;
            }
            scope.$ScrollTH = function () {
                var sample = elem[0].getElementsByClassName("item")[0];
                lineHeight = sample && sample.offsetHeight || lineHeight;
                return lineHeight * (Object.keys(scope.items || {}).length + addEmpty) || 10;
            };
            scope.style = {};
            scope.$LineStart = 0;
            scope.$ScrollY = function (y) {
                if (angular.isDefined(y)) {
                    var deltay = -parseInt(y / 2 / lineHeight) * 2;
                    var data = scope.items;
                    if (data) {
                        scope.$LineStart = 1 + deltay;
                        scope.style.marginTop = y + deltay * lineHeight + 'px';
                        var startSlice = deltay - addEmpty < 0 ? 0 : deltay - addEmpty;
                        if (Array.isArray(data)) {
                            var _data = data.slice(startSlice, deltay + lineCount);
                        } else {
                            var _data = {};
                            var keys = scope.keeys.slice(startSlice, deltay + lineCount);
                            keys.forEach(function (k) {
                                _data[k] = data[k];
                            });
                        }
                        scope.data = _data;
                    } else {
                        scope.data = scope.items;
                    }
                } else {
                    return (parseInt(scope.style.marginTop) || 0) - ((scope.$LineStart - 1) * lineHeight);
                }
            };
        }
    };
}]);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.directive('marker', function () {
    var couple = function (marker,source) {
        var len1 = source.length;
        var len2 = marker.length;
        var match = "", begin1 = len1, begin2 = len2;
        for (var cx = -len1, dx = len2; cx < dx; cx++) {
            var c1 = cx >= 0 ? 0 : -cx;
            var c2 = cx >= 0 ? cx : 0;
            var d1 = len1 - c1;
            var d2 = len2 - c2;
            var start = 0, end = 0;
            for (var ct = 0, dt = d1 > d2 ? d2 : d1; ct < dt; ct++) {
                if (source[c1 + ct] === marker[c2 + ct]) {
                    end = ct + 1;
                    if (end === dt && end - start > match.length) {
                        match = source.slice(c1 + start, c1 + end);
                        begin1 = c1 + start;
                        begin2 = c2 + start;
                    }
                } else {
                    if (end - start > match.length) {
                        match = source.slice(c1 + start, c1 + end);
                        begin1 = c1 + start;
                        begin2 = c2 + start;
                    }
                    start = ct + 1;
                }
            }
        }
        return [match, begin1, begin2];
    };
    return {
        restrict: "E",
        template: "<span class=marker></span>",
        replace:true,
        scope: {
            text: '=',
            mark: '='
        },
        link: function (scope, elem, attr) {
            //\u4e00\u76f4\u53d6\u6700\u957f\u4e32\uff0c\u76f4\u5230\u65e0\u5339\u914d\u9879
            var text = scope.text || "";
            scope.$watch("mark", function (mark) {
                elem.html(build(text, mark || ""));
            });
            var MARK_PRE = "<b>";
            var MARK_AFT = "</b>";
            var build = function (text, mark) {
                if (!mark) {
                    return text;
                }
                var matchers = couple(text, mark);
                var match_text = matchers[0];
                var match_start2 = matchers[2];
                if (mark.length === 1) {
                    return text.replace(new RegExp(mark.replace(/[\\\*\?\+\(\)\[]/g, function (match) {
                        return "\\" + match;
                    }), "g"), MARK_PRE + mark + MARK_AFT);
                }
                if (match_text.length > 1) {
                    var match_text_pre = text.slice(0, match_start2);
                    var match_text_aft = text.slice(match_start2 + match_text.length);
                    if (match_text_pre.length > 1) {
                        match_text_pre = build(match_text_pre, mark);
                    }
                    if (match_text_aft.length > 1) {
                        match_text_aft = build(match_text_aft, mark);
                    }
                    return match_text_pre + MARK_PRE + match_text + MARK_AFT + match_text_aft;
                }
                return text;
            };
        }
    };
});
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.directive('ngDragable', ["dragable", function (dragable) {
    return {
        restrict: 'A',
        transclude: true,
        template: "<div ng-transclude></div>",
        replace: true,
        scope: {
            config: "&",
            lockx: '=',
            locky: '=',
            resizex: '=',
            resizey: '=',
            left: '=',
            top: '=',
            width: '=',
            height: '=',
            onResizeX: '&',
            onResizeY: '&'
        },
        link: function (scope, element) {
            dragable(scope,element,'ng-dragable');
        }
    };
}]);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.directive('numberInput', ["regexp", "$parse", function (regexp, $parse) {
    var NG_NUMBER_REGEXP = regexp.NG_NUMBER_REGEXP;
    return {
        restrict: 'E',
        template: "<div class='number-input'><input ng-focus='ngFocus({$event:$event})' ng-blur='ngBlur({$event:$event})' ng-model='value' placeholder='{{placeholder}}' /></div>",
        replace: true,
        scope: {
            ngModel: '@',
            decimal: '=',
            float: '@',
            onpress: '&',
            onconfirm: '&',
            ngFocus: '&',
            ngBlur: '&',
        },
        link: function (scope, elem, attr) {
            scope.placeholder = attr.placeholder;
            if (!scope.placeholder) {
                var holder_watcher = scope.$watch(function () {
                    return $scope.$eval(scope.ngModel + "_$name")||"";
                }, function (_$name) {
                    if (_$name) {
                        holder_watcher();
                        scope.placeholder = "\u8bf7\u8f93\u5165" + _$name;
                    }
                });
            }
            var input = elem.children()[0];
            var $scope = elem.scope();
            var ngModel = scope.ngModel;
            var Dot = '';
            var set = function (v) {
                var matchs = v.match(NG_NUMBER_REGEXP);
                if (!matchs) {
                    $parse(ngModel).assign($scope, void 0);
                    return;
                } else {
                    if (v.match(/^\d+\.0*$/)) {
                        Dot = v.slice(v.indexOf('.'));
                    } else {
                        Dot = '';
                    }
                    $parse(ngModel).assign($scope, scope.float ? (Number(v)) : Dot ? matchs[1] + Dot : v);
                }
            };
            Object.defineProperty(scope, "value", {
                get: function () {
                    var value = $scope.$eval(ngModel);
                    return (typeof value === 'undefined' ? '' : value) + Dot;
                },
                set: set
            });
            elem.on('keydown', function (e) {
                if (/^[\u0000-\uffff\.]$/.test(e.key) && !e.ctrlKey && !e.altKey) {
                    var selectStart = input.selectionStart;
                    var selectEnd = input.selectionEnd;
                    var select1 = Math.min(selectEnd, selectStart);
                    var select2 = Math.max(selectStart, selectEnd);
                    var value = input.value || "";
                    var value = value.slice(0, select1) + e.key + value.slice(select2);
                    var matchs = value.match(NG_NUMBER_REGEXP);
                    if (!matchs || matchs[3].length > scope.decimal || matchs[2] && (scope.decimal === false || scope.decimal === 0)) {
                        return e.preventDefault();
                    }
                }
            });
            elem.on('input', function (e) {
                var matchs = input.value.match(NG_NUMBER_REGEXP);
                if (!matchs || matchs[2] && (scope.decimal === false || scope.decimal === 0)) {//IE\u4e2d\u5c0f\u6570\u70b9\u7684\u4e8b\u4ef6\u4e0d\u4f1a\u901a\u77e5\u5230keydown\uff0c\u6240\u4ee5\u8fd9\u91cc\u52a0\u4e00\u4e2a\u517c\u5bb9\u5904\u7406
                    var value = input.value;
                    input.value = value.slice(0, value.length - 1);
                    scope.$apply();
                    return e.preventDefault();
                }
            });
            if (scope.onconfirm || scope.onpress) {
                input.addEventListener('keypress', function (event) {
                    //\u6309\u952e\u662f\u5426\u88ab\u5141\u8bb8
                    if (scope.onpress && scope.onpress({$event: event}) === false) {
                        event.preventDefault();
                        return false;
                    }
                    //\u7528\u6237\u6309\u4e0b\u56de\u8f66
                    if (event && event.key && event.key.toLowerCase && event.key.toLowerCase() === "enter") {
                        scope.onconfirm && scope.onconfirm({$event: event});
                        scope.$apply();
                    }
                });
            }
            input.onblur = function () {
                elem.removeClass('focus');
            };
            input.onfocus = function () {
                input.select();
                elem.addClass("focus");
            };
        }
    };
}]);
yjkj.directive('onOff', ["$parse", function ($parse) {
    return {
        restrict: "EA",
        replace: true,
        scope: {
            ngModel: '@',
            yxbz: "="
        },
        template: '<div class="on-off">' +
                '<div><div>' +
                '</div>',
        link: function (scope, elem, attr) {
            if (attr.ngModel) {
                //ngModel\u7684\u7248\u672c
                var $scope = elem.scope();
                elem.on('click', function () {
                    var value = $scope.$eval(scope.ngModel);
                    if (typeof value === "number") {
                        value = value ? 0 : 1;
                    } else {
                        value = !value;
                    }
                    $parse(scope.ngModel).assign($scope, value);
                    scope.$apply();
                });
                $scope.$watch(scope.ngModel, function (yxbz) {
                    if (yxbz) {
                        elem.css({"background":"#15a4fa"});
                        angular.element(elem.children()[0]).css({"left":elem[0].offsetWidth-elem.children()[0].offsetWidth+"px"});
                    } else {
                        elem.css("background", "#ccc");
                        angular.element(elem.children()[0]).css({"left": "0"});
                    }
                });
                return;
            }

            if (scope.yxbz) {
                angular.element(elem).css("background", "#ccc");
                angular.element(elem.children()[0]).css("transform", "translateX(100%)");
            }
            elem.on('click', function (e) {
                if (e.target.className.indexOf('on-off') !== -1) {
                    if (scope.yxbz) {
                        angular.element(elem).css("background", "#4385f5");
                        angular.element(elem.children()[0]).css("transform", "translateX(0)");
                        scope.yxbz = 0;
                    } else {
                        angular.element(elem).css("background", "#ccc");
                        angular.element(elem.children()[0]).css("transform", "translateX(100%)");
                        scope.yxbz = 1;
                    }
                }
                scope.$apply();
                //console.log(e.target.className)
            })
        }
    }
}])

yjkj.directive('paginator', function () {
	return {
		restrict:"E",
		replace:true,
		template:"<div id='paginator'>"+
					 "<div ng-click='pageTo(\"prev\")'><<</div>"+
					 "<div ng-click='pageTo(\"first\")'>\u9996\u9875</div>"+
					 "<div ng-repeat='num in pagenum' ng-class='{select:num==current}' ng-click='selectPage($event,num)'>{{num}}</div>"+
					 "<div class='paginator-input'>"+
					 	"<input type='text' title='\u8f93\u5165\u9875\u7801\u6309\u56de\u8f66\u5feb\u901f\u8df3\u8f6c' ng-focus='addlisten()' ng-blur='removelisten()' ng-model='searchNum'/>"+
					 	"<span ng-bind='current'></span><span>/</span><span ng-bind='pages'></span>"+
					 "</div>"+
					 "<div ng-click='pageTo(\"last\")'>\u5c3e\u9875</div>"+
					 "<div ng-click='pageTo(\"next\")'>>></div>"+
				  "</div>",
		scope:{
			pagesize:"@",
			total:"@",
			messages:"="
		},
	    link:function(scope,elem,attr){
	    	var pagearray=[];
	    	var start=0;
	    	var end=5;
	    	scope.pagenum=[];
	    	scope.current=1;
	    	var sign=false;
	    	scope.pages=Math.ceil(scope.total/scope.pagesize);
	    	console.log(scope.total+'=='+scope.pagesize)
	    	for(var i=0;i<scope.pages;i++){
	    		pagearray.push(i+1);
	    	}
	    	scope.pagenum=pagearray.slice(start,end);
	    	scope.selectPage=function(ev,cur){
	    		if(ev.target.className.indexOf("select")<0){
	    			sign=true;
	    			scope.current=cur;
	    			start=scope.current-2<1?1:scope.current-2;
	    			end=start+5;
	    			if(end>scope.pages){
	    				end=scope.pages+1;
	    				start=end-5;
	    			}
	    			scope.pagenum=pagearray.slice(start-1,end-1);
	    		}
	    	}
	    	scope.pageTo=function(type){
	    		sign=true;
	    		//\u9996\u9875
	    		if(type=="first"){
	    			scope.current=1;
	    			scope.pagenum=pagearray.slice(0,5);
	    		}
	    		//\u5c3e\u9875
	    		if(type=="last"){
	    			//console.log(444)
	    			scope.current=scope.pages;
	    			scope.pagenum=pagearray.slice(scope.pages-5,scope.pages);
	    		}
	    		//\u524d\u4e00\u9875
	    		if(type=="prev"){
	    			scope.current=scope.current-1<1?1:scope.current-1;
	    			start=scope.current-2<1?1:scope.current-2;
	    			end=start+5;
	    			if(end>scope.pages){
	    				end=scope.pages+1;
	    				start=end-5;
	    			}
	    			scope.pagenum=pagearray.slice(start-1,end-1);
	    		}
	    		//\u540e\u4e00\u9875
	    		if(type=="next"){
	    			scope.current=scope.current+1>scope.pages?scope.pages:scope.current+1;
	    			start=scope.current-2<1?1:scope.current-2;
	    			end=start+5;
	    			if(end>scope.pages){
	    				end=scope.pages+1;
	    				start=end-5;
	    			}
	    			scope.pagenum=pagearray.slice(start-1,end-1);
	    		}
				//\u9875\u7801\u8df3\u8f6c
	    		if(typeof type=="number"){
	    			scope.current=type;
	    			start=scope.current-2<1?1:scope.current-2;
	    			end=start+5;
	    			if(end>scope.pages){
	    				end=scope.pages+1;
	    				start=end-5;
	    			}
	    			scope.pagenum=pagearray.slice(start-1,end-1);
	    			scope.$apply();
	    		}
	    	}
	    	//
	    	scope.addlisten=function(){
	    		document.body.addEventListener('keydown',whenKeyDown);
	    	}
	    	scope.removelisten=function(){
	    		document.body.removeEventListener('keydown',whenKeyDown);
	    	}
	    	
	    	function whenKeyDown(e){
	    		if(e.keyCode==13){
	    			if(parseInt(scope.searchNum)){
	    				scope.searchNum=parseInt(scope.searchNum)>scope.pages?scope.pages:parseInt(scope.searchNum);
	    				scope.pageTo(scope.searchNum);
	    			}
	    		}
	    	}
	    	//\u8bf7\u6c42\u5bf9\u5e94\u9875\u9762\u6570\u636e
	    	scope.$watch("current",function(nv){
	    		if(sign){
	    			//console.log(444)
	    			console.log(scope.messages)
	    			//scope.messages.splice(0,1)
	    			//scope.messages=scope.messages.;
	    			console.log(scope.messages)
	    		}
	    	})
	    }
	}
})
yjkj.directive('printer', function () {
    return {
        restrict: 'E',
        template: '<div><div><anniu ng-click="print()">\u6253\u5370</anniu><span>\u6b63\u5728\u9884\u89c8</span></div><iframe class="frame"></iframe></div>',
        scope: {
            src: '@',
            srcDoc: '=',
        },
        replace: true,
        link: function (scope, elem, attr) {
            var frame = elem.children()[1];
            var object = elem.children()[2];
            scope.print = function () {
                frame.contentWindow.document.execCommand("Print", false);
            };
            // scope.save=function(){
            //     //\u53ea\u6709ie\u4e0a\u80fd\u7528
            //     frame.contentWindow.document.execCommand("SaveAs", false);
            // }
            scope.$watch("srcDoc", function () {
                var doc = frame.contentDocument || frame.document || frame.contentWindow.document;
                doc.write(scope.srcDoc);
            })
        }
    }
});
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



yjkj.directive('radio', ["$parse", function ($parse) {
    return{
        restrict: 'E',
        template: '<div class="radio" ng-click="checked=!checked" ng-class="checked?\'c1\':\'c0\'"><div><div></div></div><div ng-transclude></div></div>',
        replace: true,
        transclude: true,
        scope: {
            ngModel: '@'
        },
        link: function (scope, elem, attr) {
            var ngModel = scope.ngModel;
            var $scope = elem.scope();
            Object.defineProperty(scope, 'checked', {
                get: function () {
                    return $scope.$eval(ngModel);
                },
                set: function (v) {
                    if (attr.hasOwnProperty('disabled')) {
                        return;
                    }
                    $parse(ngModel).assign($scope, v);
                }
            });
        }
    };
}]);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.directive('rowView', ["$document", "getScreenPosition", function ($document, getScreenPosition) {
    return function (scope, elem, attr) {
        elem.addClass('row-view');
//        var adaptTarget = function (e) {
//            var tmp = e.target, current;
//            while (tmp && !(tmp.hasAttribute && tmp.hasAttribute('row-view'))) {
//                current = tmp;
//                tmp = tmp.parentNode;
//            }
//            if (current) {
//                var position = getScreenPosition(current);
//                position.bottom = position.top + current.offsetHeight;
//                if (e.clientY - position.top < 7 && current.previousElementSibling) {
//                    elem.css('cursor', 'n-resize');
//                    return current.previousElementSibling;
//                } else if (position.bottom - e.clientY < 7) {
//                    elem.css('cursor', 's-resize');
//                    return current;
//                } else {
//                    elem.css('cursor', '');
//                }
//            }
//        };
//        elem.on('mousemove', adaptTarget);
//        var draging = null;
//        var onmouseup = function () {
//            $document.off('mouseup', onmouseup);
//            $document.off('mousemove', onmousemove);
//            elem.on('mousemove', adaptTarget);
//            draging = null;
//        };
//        var onmousemove = function (e) {
//            if (draging && draging.elem) {
//                var deltay = e.clientY - draging.y;
//                var elementA = draging.elem;
//                var cs = getComputedStyle(elementA);
//                var cur = deltay + elementA.offsetHeight;
//                var children = elementA.parentNode.children;
//                var elementB = children[children.length - 1];
//                if (cur > (parseInt(cs.minHeight) || 70) && cur < (parseInt(cs.maxHeight) || elem[0].offsetHeight - 70) && elementA !== elementB) {
//                    draging.y = e.clientY;
//                    elementA.style.height = parseInt(elementA.style.height || elementA.offsetHeight) + deltay + 'px';
//                    elementB.style.top = parseInt(elementB.style.top || elementB.offsetTop) + deltay + 'px';
//                    scope.$apply();
//                }
//            }
//        };

        scope.$watch(function () {
            var children = elem.children();
            var top = 0;
            for (var cx = 0, dx = children.length - 1; cx < dx; cx++) {
                top += children[cx].offsetHeight;
            }
            return top;
        }, function (top) {
            var children = elem.children();
            var elementB = children[children.length - 1];
            var th = elem[0].offsetHeight;
            if (top < th) {
                elementB.style.top = top + 'px';
            } else {
                elementB.style.top = th + 'px';
            }
        });
//        elem.on('mousedown', function (e) {
//            elem.off('mousemove', adaptTarget);
//            $document.on('mousemove', onmousemove);
//            $document.on("mouseup", onmouseup);
//            var temp = adaptTarget(e);
//            if (temp) {
//                draging = {
//                    elem: temp,
//                    x: e.clientX,
//                    y: e.clientY
//                };
//            }
//        });
    };
}]);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.directive('scrollContent', ["getScreenPosition", "$document", "$timeout", function (getScreenPosition, $document, $timeout) {
    var EscListeners = [];
    var find = function (esc) {
        for (var k in EscListeners) {
            if (esc === EscListeners[k]) {
                return k;
            }
        }
    };
    EscListeners.pipe = function (doSomeThing) {
        var esc = function () {
            var index = find(esc);
            if (index >= 0) {
                EscListeners.splice(index, 1);
            }
            if (doSomeThing.apply(null, Array.prototype.slice.apply(arguments, [0]))) {

            }
        };
        EscListeners.push(esc);
        return esc;
    };
    $document.on('keydown', function (e) {
        if (e.which >= 37 && e.which <= 40) {
            if (EscListeners.length) {
                EscListeners[EscListeners.length - 1](["left", "up", "right", "down"][e.which - 37]);
            }
        }
    });
    //\u5148\u53ea\u652f\u6301\u4e00\u79cd\u5f39\u5b50\u7a97\u65b9\u5f0f\uff0c
    //\u4ece\u6307\u5b9a\u8def\u5f84\u52a0\u8f7d\u7a97\u53e3\u5185\u5bb9
    return {
        restrict: 'E',
        replace: true,
        template: "<div class='scroll-content' ng-class='{\"x\":$HasXScroll,\"y\":$HasYScroll}'><div class='Scroller-Container' ng-transclude></div><div class='scroll y'><div class='Scrollbar-Up'></div><div class='Scrollbar-Track'><div class='Scrollbar-Handle'></div></div><div class='Scrollbar-Down'></div></div><div class='scroll x'><div class='Scrollbar-Up'></div><div class='Scrollbar-Track'><div class='Scrollbar-Handle'></div></div><div class='Scrollbar-Down'></div></div></div>",
        scope: false,
        transclude: true,
        link: function (scope, $element, attr) {
            $element.ready(function () {
                var viewContent = $element[0];
                var children = $element.children();
                var xScroll = children[children.length - 1];
                var yScroll = children[children.length - 2];
                var scroll = angular.element(xScroll);
                scroll.css({
                    'visibility': 'hidden'
                });
                scroller = new jsScroller(viewContent, scope);
                xScrollBar = attr.autox === "" ? {
                    reset: function () {
                        var deltaX = scroller.totalWidth() - scroller.viewableWidth();
                        if (deltaX > 0) {
                            viewContent.style.width = deltaX + (parseInt(viewContent.style.width) || viewContent.offsetWidth) + 'px';
                        }
                        xScroll.style.height = 0;
                    }
                } : new jsScrollbar(xScroll, scroller, 'x');
                yScrollBar = attr.autoy === "" ? {
                    reset: function () {
                        var deltaY = scroller.totalHeight() - scroller.viewableHeight();
                        if (deltaY > 0) {
                            viewContent.style.height = deltaY + (parseInt(viewContent.style.height) || viewContent.offsetHeight) + 'px';
                        }
                        yScroll.style.width = 0;
                    }
                } : new jsScrollbar(yScroll, scroller, 'y');
                setTimeout(resize, 0);
            });
            var scroller = null;
            var xScrollBar = null;
            var yScrollBar = null;
            var resize_time = 0;
            var resize = function () {
                if (!$element.scope()) {
                    console.log('scroller_destroied');
                    unwatch();
                    window.removeEventListener('resize', resize);
                    return;
                }
                clearTimeout(resize_time);
                resize_time = setTimeout(function () {
                    var children = $element.children();
                    var xScroll = children[children.length - 1];
                    var yScroll = children[children.length - 2];
                    var lock = scope.$ScrollLock && scope.$ScrollLock.toLowerCase();
                    if (lock !== 'x') {
                        xScrollBar && xScrollBar.reset();
                    }
                    if (lock !== 'y') {
                        yScrollBar && yScrollBar.reset();
                    }
                    resize_time = setTimeout(function () {
                        if (xScrollBar && xScrollBar._disabled) {
                            yScroll.style.bottom = 0;
                            scope.$HasXScroll = false;
                        } else {
                            scope.$HasXScroll = true;
                            yScroll.style.bottom = xScroll.offsetHeight + 'px';
                        }
                        if (yScrollBar && yScrollBar._disabled) {
                            scope.$HasYScroll = false;
                            xScroll.style.right = 0;
                        } else {
                            scope.$HasYScroll = true;
                            xScroll.style.right = yScroll.offsetWidth + 'px';
                        }
                        xScrollBar && xScrollBar.reset();
                        yScrollBar && yScrollBar.reset();
                    }, 20);

                }, 20);
            };
            window.addEventListener('resize', resize);
            var sizer = function () {
                return scroller && scroller.totalHeight() + ',' + scroller.totalWidth();
            };
            var unwatch = scope.$watch(sizer, resize);
            scope.$on('$destroy', function () {
                unwatch();
                window.removeEventListener("resize", resize);
            });

            scope.$ScrollLeftTo = function (left) {
                if (arguments.length === 1) {
                    xScrollBar && xScrollBar.scrollBy(0, (scope.$ScrollLeftTo() - left) || 0);
                } else {
                    return -scroller._x;
                }
            };
            scope.$ScrollTopTo = function (top) {
                if (arguments.length === 1) {
                    yScrollBar && yScrollBar.scrollBy(0, scroller._y - top);
                } else {
                    return -scroller._y;
                }
            };
            scope.$ScrollTop = scope.$ScrollTopTo;
            scope.$ScrollLeft = scope.$ScrollLeftTo;
        }
    };


    /**
     * jsScroller
     * @param {type} o
     * @param {type} scope
     * @returns {popupL#14.jsScroller}
     */
    function jsScroller(o, scope) {
        var saved_element = o;
        var w = scope.$ScrollW || function () {
            return saved_element.offsetWidth;
        };
        var h = scope.$ScrollH || function () {
            return saved_element.offsetHeight;
        };
        var tw = scope.$ScrollTW || function () {

            return o.scrollWidth;
        };
        var th = scope.$ScrollTH || function () {
            return o.scrollHeight;
        };
        var self = this;
        var list = o.getElementsByClassName("Scroller-Container");
        o = list[0];
        var onscroll = function (event) {
            var y = event.target ? -event.target.scrollTop : event;
            Array.prototype.forEach.apply(o.children, [function (e) {
                    if (e.hasAttribute && e.hasAttribute("onscroll-y-in-screen")) {
                        var pH = h(), oH = e.offsetHeight;
                        var marginTop = pH - (oH + y);
                        if (pH < oH) {
                            if (marginTop > 0) {
                                if (e.style.marginTop !== marginTop) {
                                    e.style.marginTop = marginTop + 'px';
                                }
                            } else {
                                e.style.marginTop = "";
                            }
                        } else {
                            if (e.style.marginTop !== -y + 'px') {
                                e.style.marginTop = -y + 'px';
                            }
                        }
                    }
                }]);
        };
        o.onscroll = onscroll;
        //Private methods
        this._setPos = function (x, y) {
            var iebug = 1;//ie\u4e0a\u67091\u50cf\u7d20\u7684bug
            if (x <= this.viewableWidth() - this.totalWidth())
                x = this.viewableWidth() - this.totalWidth() + iebug;
            if (x > 0)
                x = 0;
            if (y <= this.viewableHeight() - this.totalHeight())
                y = this.viewableHeight() - this.totalHeight() + iebug;
            if (y > 0)
                y = 0;
            this._x = x;
            this._y = y;
            if (scope.$ScrollX) {
                scope.$ScrollX(this._x);
            } else {
                o.scrollLeft = -this._x;
            }
            if (scope.$ScrollY) {
                scope.$ScrollY(this._y);
            } else {
                onscroll(y);
                //\u8fd9\u91cc\u9632\u6b62IE Bug\uff0c\u6eda\u52a8\u653e\u540e\u9762
                o.scrollTop = -this._y;
            }
            $timeout(function () {});
        };
        this._x = -parseInt(scope.$ScrollL ? scope.$ScrollL() : o.scrollLeft) || 0;
        this._y = -parseInt(scope.$ScrollT ? scope.$ScrollT() : o.scrollTop) || 0;
        //Public Methods
        this.reset = function () {
        };
        this.scrollBy = function (x, y) {
            this._setPos(this._x + x, this._y + y);
        };
        this.scrollTo = function (x, y) {
            if (x === "_" || isNaN(x)) {
                x = -this._x;
            }
            if (y === "_" || isNaN(y)) {
                y = -this._y;
            }
            this._setPos(-x, -y);
        };
        this.stopScroll = function () {
            if (this.scrollTimer)
                window.clearInterval(this.scrollTimer);
        };
        this.startScroll = function (x, y) {
            this.stopScroll();
            this.scrollTimer = window.setInterval(
                    function () {
                        self.scrollBy(x, y);
                    }, 20
                    );
        };


        //variables
        this.content = o;
        this.viewableWidth = w;
        this.viewableHeight = h;
        this.totalWidth = tw;
        this.totalHeight = th;
        this.scrollTimer = null;
        this.reset();
    }
    /**
     * jsScrollbar
     * @param {type} o
     * @param {type} s
     * @param {type} a
     * @param {type} ev
     * @returns {popupL#14.jsScrollbar}
     */
    function jsScrollbar(o, s, a, ev) {
        this.destroy = function () {
            clearTimeout(run_timer);
        };
        var show_time = 0, hide_time = 0;
        var self = this;
        var Y = a && a.toUpperCase() === 'Y';
        var offsetHeight = Y ? 'offsetHeight' : 'offsetWidth';


        this._x = 0;
        this._y = 0;
        Object.defineProperty(this, '_ratio', {
            get: function () {
                return (self._src[Y ? "totalHeight" : "totalWidth"]() - self._src[Y ? "viewableHeight" : "viewableWidth"]()) / (self._yTrack[offsetHeight] - this._yHandle[offsetHeight]);
            }
        });

        this.reset = function () {
            //Arguments that were passed
            this._parent = o;
            this._src = s;
            this.auto = true;
            this.eventHandler = ev ? ev : function () { };
            //Component Objects
            this._up = this._findComponent("Scrollbar-Up", this._parent);
            this._down = this._findComponent("Scrollbar-Down", this._parent);
            this._yTrack = this._findComponent("Scrollbar-Track", this._parent);
            this._yHandle = this._findComponent("Scrollbar-Handle", this._yTrack);
            var _curTop = this._y * this._ratio || 0;
            this._yHandle.style[Y ? "height" : "width"] = Math.max((this._src[Y ? "viewableHeight" : "viewableWidth"]() / this._src[Y ? "totalHeight" : "totalWidth"]()) * this._yTrack[Y ? "offsetHeight" : "offsetWidth"], 60) + 'px';
            if (_curTop) {
                if (Y) {
                    this._y = _curTop / (this._src.totalHeight() - this._src.viewableHeight()) * (this._yTrack.offsetHeight - parseInt(this._yHandle.style.height));
                    this._yHandle.style.top = this._y + "px";
                } else {
                    this._y = _curTop / (this._src.totalWidth() - this._src.viewableWidth()) * (this._yTrack.offsetWidth - parseInt(this._yHandle.style.width));
                    this._yHandle.style.left = this._y + "px";
                }
            }
            //Height and position properties
            this._trackTop = function () {
                return findOffsetTop(this._yTrack);
            };
            //Misc. variables
            this._scrollDist = 5;
            this._scrollTimer = null;
            this._selectFunc = null;
            this._grabPoint = null;
            this._tempTarget = null;
            this._tempDistX = 0;
            this._tempDistY = 0;
            this._disabled = false;

            this._yHandle.ondragstart = function () {
                return false;
            };
            this._yHandle.onmousedown = function () {
                return false;
            };
            this._addEvent(this._src.content, "mousewheel", this._scrollbarWheel);
            this._src.content.addEventListener("DOMMouseScroll", this._scrollbarWheel);
            var moving = null;
            this._touchmove = function (event) {
                if (!moving) {
                    return;
                }

                var deltaX = moving.x - event.touches[0].clientX;
                var deltaY = moving.y - event.touches[0].clientY;
                moving.x = event.touches[0].clientX;
                moving.y = event.touches[0].clientY;
                if (!moving.direction) {
                    moving.direction = -1;
                    if (Y) {
                        if (Math.abs(deltaY / deltaX) > 0.57735) {
                            moving.direction = 1;
                        }
                    } else {
                        if (Math.abs(deltaX / deltaY) > 0.57735) {
                            moving.direction = 1;
                        }
                    }
                }
                if (moving.direction > 0) {
                    var tmp = event.target;
                    var $ = angular.element;
                    var delta = Y ? deltaY : deltaX;
                    while (tmp.parentNode) {
                        if (canUpCanDown(tmp, -delta)) {
                            break;
                        }
                        tmp = tmp.parentNode;
                    }
                    self.scrollBy(0, delta);
                }
            };
            this._touchstart = function (event) {

                moving = {
                    x: event.touches[0].clientX,
                    y: event.touches[0].clientY
                };
            };
            this._touchend = function () {
                moving = null;
            };
            this._addEvent(this._src.content, "touchmove", this._touchmove);
            this._addEvent(this._src.content, "touchstart", this._touchstart);
            this._addEvent(this._src.content, "touchend", this._touchend);
            this._removeEvent(this._parent, "mousedown", this._scrollbarClick);
            this._addEvent(this._parent, "mousedown", this._scrollbarClick);

            this._src.reset();
            this._moveContent();
            if (this._src[Y ? "totalHeight" : "totalWidth"]() <= this._src[Y ? "viewableHeight" : "viewableWidth"]()) {
                this._disabled = true;
                this._yHandle.style.visibility = "hidden";
                if (this.auto)
                    this._parent.style.visibility = "hidden";
                this.hide();
            } else {
                this._disabled = false;
                this._yHandle.style.visibility = "visible";
                this._parent.style.visibility = "visible";
                //\u9632\u95ea
                this.show();
            }

        };
        this.hide = function () {
            this._parent.style.opacity = '';
            var that = this;
        };
        this.show = function (time_out) {
            var that = this;
            clearTimeout(hide_time);
            hide_time = setTimeout(function () {
                that.hide();
            }, time_out || 2000);
            if (!this._src)
                return;

            that._parent.style.opacity = 1;
        };
        this._addEvent = function (o, t, f) {
            if (o.addEventListener)
                o.addEventListener(t, f, false);
            else if (o.attachEvent)
                o.attachEvent('on' + t, f);
            else
                o['on' + t] = f;
        };
        this._removeEvent = function (o, t, f) {
            if (o.removeEventListener)
                o.removeEventListener(t, f, false);
            else if (o.detachEvent)
                o.detachEvent('on' + t, f);
            else
                o['on' + t] = null;
        };
        this._findComponent = function (c, o) {
            var kids = o.childNodes;
            for (var i = 0; i < kids.length; i++) {
                if (kids[i].className && kids[i].className === c) {
                    return kids[i];
                }
            }
        };
        //Thank you, Quirksmode
        function findOffsetTop(o) {
            return Y ? getScreenPosition(o).top : getScreenPosition(o).left;
        }

        this._scrollbarClick = function (e) {
            if (self._disabled)
                return false;

            e = e ? e : event;
            if (!e.target)
                e.target = e.srcElement;

            if (e.target.className.indexOf("Scrollbar-Up") > -1)
                self._scrollUp(e);
            else if (e.target.className.indexOf("Scrollbar-Down") > -1)
                self._scrollDown(e);
            else if (e.target.className.indexOf("Scrollbar-Track") > -1)
                self._scrollTrack(e);
            else if (e.target.className.indexOf("Scrollbar-Handle") > -1)
                self._scrollHandle(e);

            self._tempTarget = e.target;
            self._selectFunc = document.onselectstart;
            document.onselectstart = function () {
                return false;
            };

            self.eventHandler(e.target, "mousedown");
            self._addEvent(document, "mouseup", self._stopScroll, false);

            return false;
        };
        this._scrollbarDrag = function (e) {
            e = e ? e : event;
            var t = parseInt(self._yHandle.style[Y ? "top" : "left"]);
            var v = e[Y ? "clientY" : "clientX"] - self._trackTop();
            var top;
            if (v >= self._yTrack[offsetHeight] - self._yHandle[offsetHeight] + self._grabPoint)
                top = self._yTrack[offsetHeight] - self._yHandle[offsetHeight] + "px";
            else if (v <= self._grabPoint)
                top = "0px";
            else
                top = v - self._grabPoint + "px";
            self._y = parseInt(top);
            self._yHandle.style[Y ? "top" : "left"] = top;

            self._moveContent();
        };
        var hasOverflow = function (cmp, name) {
            return cmp && (cmp.overflowX.indexOf(name) >= 0 || cmp.overflowY.indexOf(name) >= 0);
        };
        var canUpCanDown = function (tmp, delta) {
            var cmp = getComputedStyle(tmp);
            var h = void 0, th = void 0, y = void 0;
            if (hasOverflow(cmp, 'scroll') || hasOverflow(cmp, 'auto')) {
                th = tmp.scrollHeight;
                h = tmp.clientHeight;
                y = -tmp.scrollTop;
            }
            if ($(tmp).hasClass("Scroller-Container")) {
                var scp = $(tmp).scope();
                if (!scp) {
                    return;
                }
                if (!Y) {
                    if (scp.$ScrollW) {
                        h = scp.$ScrollW();
                    } else {
                        h = tmp.parentNode.offsetWidth;
                    }
                    if (scp.$ScrollTW) {
                        th = scp.$ScrollTW();
                    } else {
                        th = tmp.scrollWidth;
                    }
                    if (scp.$ScrollX) {
                        y = -scp.$ScrollX();
                    } else {
                        y = tmp.scrollLeft;
                    }
                } else {
                    if (scp.$ScrollH) {
                        h = scp.$ScrollH();
                    } else {
                        h = tmp.parentNode.offsetHeight;
                    }
                    if (scp.$ScrollTH) {
                        th = scp.$ScrollTH();
                    } else {
                        th = tmp.scrollHeight;
                    }
                    if (scp.$ScrollY) {
                        y = -scp.$ScrollY();
                    } else {
                        y = tmp.scrollTop;
                    }
                }
            }
            if (delta > 0 && h + y < th) {
                return delta + y + h < th ? delta : th - h - y; //candown
            } else if (delta < 0 && y > 0) {
                return delta + y < 0 ? -y : delta;//canup
            }
        };
        var $ = angular.element;
        this._scrollbarWheel = function (e) {
            e = e ? e : {};
            if (!e.wheelDelta) {
                e.wheelDelta = -e.detail * 40;
            }
            var tmp = e.target;

            while (tmp.parentNode) {
                if (canUpCanDown(tmp, -e.wheelDelta)) {
                    break;
                }
                tmp = tmp.parentNode;
            }
            if ((e.altKey ^ Y) && tmp === self._src.content) {
                e.preventDefault && e.preventDefault();
                var dir = -e.wheelDelta||0;
                //\u6eda\u52a8\u52a0\u901f
                var now_time = Date.now();
                var delta_time = now_time - scroll_time + 20;
                scroll_time = now_time;
                if (delta_time > 400) {
                    delta_time = 400;
                }
                delta_time = delta_time * delta_time;
                self.scrollBy(0, (dir * 1600) / (delta_time)+dir);
                e.returnValue = false;
            }
        };
        var scroll_time = 0;
        this._startScroll = function (x, y) {
            this._tempDistX = x;
            this._tempDistY = y;
            this._scrollTimer = window.setInterval(function () {
                self.scrollBy(self._tempDistX, self._tempDistY);
            }, 20);
        };

        this._stopScroll = function () {
            self._removeEvent(document, "mousemove", self._scrollbarDrag, false);
            self._removeEvent(document, "mouseup", self._stopScroll, false);

            if (self._selectFunc)
                document.onselectstart = self._selectFunc;
            else
                document.onselectstart = function () {
                    return true;
                };

            if (self._scrollTimer)
                window.clearInterval(self._scrollTimer);
            self.eventHandler(self._tempTarget, "mouseup");
        };
        this._scrollUp = function (e) {
            this._startScroll(0, -this._scrollDist);
        };
        this._scrollDown = function (e) {
            this._startScroll(0, this._scrollDist);
        };
        this._scrollTrack = function (e) {
            var curY = e[Y ? "clientY" : "clientX"] + document.body[Y ? "scrollTop" : "scrollLeft"];
            this._scroll(0, curY - this._trackTop() - this._yHandle[offsetHeight] / 2);
        };
        this._scrollHandle = function (e) {
            var curY = e[Y ? "clientY" : "clientX"] + document.body[Y ? "scrollTop" : "scrollLeft"];
            this._grabPoint = curY - findOffsetTop(this._yHandle);
            this._addEvent(document, "mousemove", this._scrollbarDrag, false);
        };
        this._scroll = function (x, y) {
            if (y > this._yTrack[offsetHeight] - this._yHandle[offsetHeight])
                y = this._yTrack[offsetHeight] - this._yHandle[offsetHeight];
            if (y < 0)
                y = 0;
            this._yHandle.style[Y ? "top" : "left"] = Math.round(y) + "px";
            this._y = y;
            this._moveContent();
        };

        this._moveContent = function () {
            if (this._ratio) {
                this.show();
                Y ? this._src.scrollTo("_", Math.round(this._y * this._ratio)) : this._src.scrollTo(Math.round(this._y * this._ratio), "_");
            }
        };
        var targetY = 0, targetDeltaY = 0, run_timer = 0;
        //\u5e73\u6ed1\u6eda\u52a8
        var run_scroll = function () {
            clearTimeout(run_timer);
            var ratio = that._ratio;
            var currentY = -(Y ? that._src._y : that._src._x);
            targetDeltaY = canUpCanDown(that._src.content, targetY - currentY);
            if (!ratio) {
                return;
            }
            var scale = (targetY - currentY) / targetDeltaY + 1;
            var deltaY;
            if (targetDeltaY > 2 || targetDeltaY < -2) {
                // \u6052\u5b9a\u52a0\u901f\u7b97\u6cd5\u5728\u8def\u7a0b\u8f83\u957f\u65f6\u6bd4\u8f83\u6162
//                deltaY = parseInt(Math.abs(targetDeltaY) - Math.pow(Math.sqrt(Math.abs(targetDeltaY), 2) - scale, 2));//ie\u4e0d\u652f\u6301Math.sign
//                if (deltaY * targetDeltaY < 0) {
//                    deltaY = -deltaY;
//                }
                if (Math.abs(targetDeltaY) > 800) {
                    deltaY = targetDeltaY / 3;
                } else {
                    deltaY = parseInt(Math.abs(targetDeltaY) - Math.pow(Math.sqrt(Math.abs(targetDeltaY), 2) - 1, 2));//ie\u4e0d\u652f\u6301Math.sign
                    if (deltaY * targetDeltaY < 0) {
                        deltaY = -deltaY;
                    }
                }
                targetDeltaY -= deltaY;
            } else {
                deltaY = targetDeltaY;
                targetDeltaY = 0;
            }
            that._scroll(0, (-(Y ? that._src._y : that._src._x) + deltaY) / ratio);
            if (targetDeltaY) {
                run_timer = setTimeout(run_scroll, 20);
            }
        };
        var that = this;
        var wait_scroll = 0, wait_scroll_count = 0;
        this.scrollBy = function (x, y) {
            if (targetDeltaY * y <= 0) {
                if (!that._src) {
                    clearTimeout(wait_scroll);
                    if (wait_scroll_count++ > 10) {
                        console.warn('scroll by abort!');
                        return;
                    }
                    ;
                    wait_scroll = setTimeout(function () {
                        that.scrollBy(x, y);
                    }, 20);
                    return;
                }
                targetY = -(Y ? that._src._y : that._src._x) + y;
            } else {
                targetY += parseInt(y);
            }
            run_scroll();
        };
        this.scrollTo = function (x, y) {
            this._scroll(0, y / this._ratio);
        };
    }
}]);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.directive('scrollPage',function(){
    return function(scope,elem,attr){
        var filter=scope.$eval(attr.scrollPage);
        scope.$watch("$ScrollTop()",function(){
            console.log(arguments)
        });
        console.warn(filter,scope)
        console.warn(scope.$ScrollTop())
    };
});
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.directive('searchbox', ["$parse", function ($parse) {
    return {
        restrict: 'E',
        template: function (elem, attr) {
            if (attr.label) {
                return "<field name=\"" + attr.field + "\"></field>";
            }
            return "<div class='searchbox'><span ng-if='!ngModel' ng-bind='placeholder'></span><input ng-model='ngModel'/></div>";
        },
        replace: true,
        scope: {
            ngModel: '=?',
            placeholder: '@'
        },
        link: function (scope, elem, attr) {
            var input = elem.children()[0];
            input.onfocus = function () {
                input.select();
                elem.addClass("focus");
            };
            input.onblur = function () {
                elem.removeClass('focus');
            };
        }
    };
}]);

/**
 * selectInput\uff0c\u7528\u6cd5\u4e0eangular\u4e2d\u7684select\u4e00\u81f4
 * @example 
 * <select-input ng-model="value" ng-options="s as i for (i,s) in data"></select-input>
 * \u5176\u4e2d\uff1aas\u540e\u9762\u662f\u663e\u793a\u7684\u5185\u5bb9\uff0cas \u524d\u9762\u662f\u552f\u4e00\u7d22\u5f15\uff0cdata\u662f\u6570\u636e\u6e90\uff0c(i,s)\u662fdata\u7684\u904d\u5386\u5668
 */
yjkj.directive('selector', ["$register", "zIndex", "$templateCache", "getScreenPosition", "getMatchList", "popup", "$compile", "$parse", "$timeout", "$animate", "hashMap", function ($register, zIndex, $templateCache, getScreenPosition, getMatchList, popup, $compile, $parse, $timeout, $animate, hashMap) {
    $register.controller("DirectiveSelectinput", ["$scope", function ($scope) {
        $scope.$ViewTitle = '\u8bf7\u9009\u62e9';
        $scope.$ViewOptions = {
            '\u786e\u5b9a': '',
            '\u53d6\u6d88': ""
        };
        var o = [];
        var options = $scope.options;
        for (var i in options) {
            o.push({$: options[i], _: i});
        }
        $scope.options = o;
        for (var k in $scope.fields) {
            var v = $scope.fields[k];
            if (v === "") {
                $scope.fields[k] = "_";
            } else if (v) {
                $scope.fields[k] = "$." + v;
            } else {
                $scope.fields[k] = "$";
            }

        }
        $scope.set = function (object, index) {
            $scope.$ViewOptions.\u786e\u5b9a = object.$;
        };
    }]);
    $register.directive("selectorPopup", ["$compile", function ($compile) {
        return {
            restrict: "E",
            template: "<div class='selector-popup'><div><text-input ng-model='word' placeholder='\u641c\u7d22'></text-input><i ng-click=\"word='';$CurrentFilter=''\"></i></div><div class='letter'><div ng-repeat=\"i in ['ABCDEFGHIJKLM','NOPQRSTUVWXYZ']\"><div ng-repeat='s in i' ng-click='filter(s)' ng-class=\"{'focus':$CurrentFilter===s}\">{{s}}</div></div></div></div>",
            scope: {
                fields: "=",
                options: "&",
                showIndex: "=",
                focus: "="
            },
            replace: true,
            link: function (scope, elem) {
                var parent = elem[0];
                var grid;
                scope.set = function (o, index) {
                    var focus = scope.focus;
                    return focus && focus(o, index);
                };
                scope.$CurrentFilter = '';
                scope.filter = function (i) {
                    scope.$CurrentFilter = i;
                    scope.word = "";
                };
                elem.children()[0].children[1].onmousedown = function (e) {
                    e.preventDefault();
                };


                scope.source = scope.options();
                scope.word = "";
                var build = function () {
                    var options = scope.options();
                    if (scope.word) {
                        scope.$CurrentFilter = "";
                        scope.source = getMatchList(options, scope.word, scope.fields);
                    } else if (scope.$CurrentFilter) {
                        scope.source = getMatchList(options, '^' + scope.$CurrentFilter, scope.fields);
                    } else {
                        scope.source = options;
                    }
                    grid && grid.remove();
                    grid = angular.element(document.createElement("grid"));
                    grid.attr("fields", "fields");
                    grid.attr("ng-model", "source");
                    grid.attr("show-index", "");
                    grid.attr('focus', 'set');
                    grid.attr("custom", "false");
                    grid.css({
                        "width": elem.offsetWidth
                    });
                    $compile(grid)(scope);
                    parent.appendChild(grid[0]);
                };
                var build_time;
                scope.$watchGroup(["fields", "word", "$CurrentFilter"], function () {
                    clearTimeout(build_time);
                    build_time = $timeout(build, 30);
                });
            }
        };
    }]);
    $templateCache.put("builtin/directive/selectinput.html", "<selector-popup fields='fields' options='options' focus='set'></selector-popup>");
    return {
        restrict: "E",
        template: function (elem, attr) {
            var template, dot, ddd;
            var initpopup = function (pop) {
                if (pop) {
                    dot = "<div ng-mousedown=$event.preventDefault() class='dot' ng-show='text&&editable&&items&&!items.length' ng-click='editor(text)'></div>";
                    ddd = "";
                } else {
                    dot = "";
                    ddd = "<div class='ddd'></div>";
                }
            };
            if (attr.input === '' || attr.input) {
                initpopup(true && attr.popup !== "false");
                template = "<span class=hld ng-bind='$Value||empty_label' ng-show='!text'></span>" + ddd + "<input ng-model='text' placeholder=''/>" + dot;
            } else {
                initpopup(attr.popup === "" || attr.popup === "true");
                template = "<span class=hld ng-bind=\"$Value||empty_label\">\u8bf7\u9009\u62e9</span>" + ddd + "<select></select>" + dot;
            }
            return "<div class='selector' ng-class=\"{'valued':$Value,'focus':focused,'uppack':isuppack}\">" + template + "</div>";
        },
        scope: {
            source: '=',
            idKey: "@",
            ngModel: "@",
            alertWidth: "@",
            alertHeight: "@",
            name: "@",
            edit: "=", //\u6dfb\u52a0
            onadd: "&", //\u6dfb\u52a0
            fields: '@',
            editLabel: "@",
            popup: '=?',
            multiSelect: '=',
            onblur: '&',
            onfocus: '&',
            addEmpty: '=',
            emptyLabel: '@',
            placeholder: '@',
            templateName: '@',
            ngChange: "&"
        },
        replace: true,
        link: function (scope, elem, attr) {
            if (scope.addEmpty && typeof scope.addEmpty !== 'string') {
                scope.empty_label = scope.placeholder || scope.emptyLabel || $parse(attr.field)(scope.addEmpty) || '\u8bf7\u9009\u62e9';
            } else {
                scope.empty_label = scope.placeholder || scope.emptyLabel || scope.addEmpty || '\u8bf7\u9009\u62e9';
            }
            if (!scope.empty_label) {
                var holder_watcher = scope.$watch(function () {
                    return $scope.$eval(scope.ngModel + "_$name") || "";
                }, function (_$name) {
                    if (_$name) {
                        holder_watcher();
                        scope.empty_label = "\u8bf7\u9009\u62e9" + _$name;
                    }
                });
            }
            scope.autoadd = attr.hasOwnProperty("autoadd");
            scope.editLabel = scope.editLabel || "\u6dfb\u52a0";
            var $scope = elem.scope();
            scope.text = "";
            var id_key = scope.idKey;
            var element = elem[0];
            Object.defineProperty(scope, 'model', {
                get: function () {
                    var value = $scope.$eval(scope.ngModel);
                    return (id_key ? id_map && id_map(value) : value) || null;
                },
                set: function (v) {
                    return $parse(scope.ngModel).assign($scope, id_key ? v && v[id_key] : v);
                }
            });
            var ngChange = null;
            scope.$watch("model", function () {
                if (!ngChange) {
                    ngChange = scope.ngChange;
                    return;
                }
                ngChange({});
            });
            var prevent_popup = attr.popup === 'false' || (attr.input !== "" && !attr.input);
            var input;
            var div;
            if (prevent_popup) {
                input = elem.children()[elem.children().length - 1];
                div = elem.children()[elem.children().length - 2];
            } else {
                input = elem.children()[elem.children().length - 2];
                div = elem.children()[elem.children().length - 1];
            }
            scope.$watch("source", function (s) {
                if (!s) {
                    return;
                }
                object_map = hashMap();
                id_map = hashMap();
                for (var k in s) {
                    var v = s[k];
                    object_map(v, k);
                    id_key && id_map(v[id_key], v);
                }
            });
            var object_map, id_map;
            Object.defineProperty(scope, '$Value', {
                get: function () {
                    var field = attr.field;
                    var model = scope.model;
                    var get = function (model) {
                        if (field === '') {
                            return  object_map && object_map(model);
                        } else if (field) {
                            return  $parse(field)(model);
                        } else {
                            return  model;
                        }
                    };
                    if (scope.multiSelect) {
                        var result;
                        if (Array.isArray(model)) {
                            result = model.map(get);
                        } else {
                            result = [];
                            angular.forEach(model, function (v, k) {
                                result.push(get(v));
                            });
                        }
                        return result.join();
                    } else {
                        return get(model);
                    }
                }
            });
            scope.view = function () {
                if (prevent_popup) {
                    return;
                }
                popup('/Directive/selectinput', {
                    options: scope.source,
                    fields: scope.fields || {'\u540d\u79f0': attr.field ? attr.field : void 0}
                }, {
                    width: parseInt(scope.alertWidth) || 496,
                    height: parseInt(scope.alertHeight) || 648
                }).onclose(function (o) {
                    if (angular.isDefined(o)) {
                        scope.model = o;
                    }
                });
            };
            var list, _list, position, scp;
            var hide = function () {
                list && list.parentNode && $animate.leave(angular.element(list)).then(function () {
                    scp && scp.$destroy();
                });
            };
            var build = function () {
                if (document.activeElement !== input) {
                    return;
                }
                if (list && list.parentNode) {
                    return;
                }
                _list = document.createElement('div');
                scp = scope.$new();
                scp.link_items = function (items) {
                    scope.items = items;
                };
                scope.check = function ($) {
                    if (!scope.multiSelect) {
                        scope.model = $;
                        if (input.tagName.toLowerCase() === 'input') {
                            scope.text = scope.$Value || "";
                        }
                        hide();
                    }
                };
                if (scope.options) {
                    var scroll = angular.element(function () {
                        var template_name = scope.templateName || "list";
                        return "<" + template_name + " class=selector-list ispopup onitems='link_items($items)' source=source add-empty=addEmpty canblur=canblur filter=text oncheck=check ng-model=model multi-select=multiSelect ></" + template_name + ">";
                    }());
                    typeof attr.field === 'string' && scroll.attr('field', attr.field);
                    $compile(scroll)(scp);
                    list = scroll[0];
                    position = getScreenPosition(element);
                    scroll.css({
                        position: "fixed",
                        margin: 0,
                        padding: 0,
                        minWidth: (element.offsetWidth) + 'px',
                        zIndex: zIndex(),
                        outline: '1px solid #dddddd',
                        backgroundColor: '#ffffff',
                        boxShadow: '0 2px 3px rgba(0,0,0,0.1)'
                    });
                    var maxHeight = Math.min(360, Math.max(window.innerHeight - position.top - elem[0].offsetHeight, position.top)) - 5;
                    scroll.children()[0].style.maxHeight = maxHeight + "px";
                    if (window.innerWidth > position.left * 2) {
                        scroll.css({
                            left: (position.left + 1) + 'px'
                        });
                    } else {
                        scroll.css({
                            right: window.innerWidth - (position.left + elem[0].offsetWidth + 1) + 'px'
                        });
                    }
                    if (window.innerHeight > position.top + maxHeight) {
                        scroll.css('top', (position.top + element.offsetHeight + 1) + 'px');
                    } else {
                        scroll.css('bottom', (window.innerHeight - position.top + 1) + 'px');
                    }
                    $animate.enter(list, null, document.body).then(function () {
                    });
                    scroll.on('mousedown', function (e) {
                        e.preventDefault();
                    });
                }
            };

            input.onmousedown = function (e) {
                if (prevent_popup) {
                    setTimeout(function () {
                        input.focus();
                    }, 0);
                    input.focus();
                    e.preventDefault();
                }
            };
            input.onkeydown = function (event) {
                var code = event.which || event.code;
                if (code < 37 || code > 40) {//\u975e\u4e0a\u4e0b\u5de6\u53f3
                    if (code === 13 || code === 20) {
                        scope.check(scope.$Value);
                        event.preventDefault();
                    }
                    return;
                }
                var source = scope.items || scope.source;
                var model = scope.model;
                if (!source) {
                    return;
                }
                event.preventDefault();
                switch (code) {
                    case 37://\u5de6
                        if (model !== source[0]) {
                            scope.$broadcast("key_top");
                        }
                        break;
                    case 38://\u4e0a
                        if (model !== source[0]) {
                            scope.$broadcast("key_pre");
                        } else {
                        }
                        break;
                    case 39://\u53f3
                        if (model !== source[source.length - 1]) {
                            scope.$broadcast("key_btm");
                        }
                        break;
                    case 40://\u4e0b
                        if (model !== source[source.length - 1]) {
                            scope.$broadcast("key_next");
                        } else {
                        }
                        break;
                }
            };
            input.onkeyup = function () {
                if (scope.text && !(list && list.parentNode)) {
                    build();
                }
            };
            scope.$watch(function () {
                if (!position) {
                    return;
                }
                var t = getScreenPosition(element);
                if (position.left !== t.left || position.top !== t.top) {
                    hide();
                }
            }, function () {});
            input.onfocus = function (event) {
                if (scope.onfocus() === false) {
                    return;
                }
                if (input.tagName.toLowerCase() === 'input') {
                    scope.isuppack = true;
                    scope.text = scope.$Value || "";
                }
                scope.focused = true;
                scope.canblur = true;
                scope.$apply();
            };
            input.onclick = function () {
                if (attr.hasOwnProperty("lazy")) {
                    if (scope.text && !(list && list.parentNode)) {
                        build();
                    } else if (list && list.parentNode && !scope.text) {
                        hide();
                    }
                } else {
                    if (list && list.parentNode) {
                        hide();
                    } else {
                        build();
                    }
                }
            };
            scope.$on('canblur', function () {
                scope.canblur = false;
            });
            input.onblur = function () {
                if (scope.onblur() === false || scope.canblur === false) {
                    return;
                }
                delete scope.isuppack;
                scope.text = "";
                hide();
                scope.focused = false;
                scope.$apply();
            };
            scope.canblur = true;
            scope.$watchGroup(['source', 'text', 'fields'], function () {
                scope.options = getMatchList(scope.source || [], scope.text, scope.fields || attr.field);
            });
            scope.editable = elem[0].hasAttribute('edit') || elem[0].hasAttribute("onadd");
            scope.editor = function (value) {
                if (value) {
                    if (scope.edit) {
                        return scope.edit(value);
                    }
                    scope.onadd({$value: value});
                }
            };
            scope.$on('$destroy', hide);
        }
    };
}]);
yjkj.directive('submitBtn',function(){
	return {
		restrict:'EA',
		//replace:true,
		transclude:true,
		template:'<div class="submit-btn"><span ng-transclude></span></div>',
		link:function(scope,elem,attr){
			console.log(scope)
		}
	}
})

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.directive('textInput', ["$parse", function ($parse) {
    return {
        restrict: 'E',
        template: function (elem, attr) {
            if (attr.label) {
                return "<field name=\"" + attr.field + "\"></field>";
            }
            var password = "";
            if (attr.type === 'password') {
                password = 'type=password';
            }
            if (attr.multiLine === "" || attr.multiLine) {
                var com = "<textarea ng-model='model'></textarea>";
            } else {
                var com = "<input ng-class={'notreal':error_message} ng-model='model' " + password + " />";
            }
            return [
                "<div class='text-input'>",
                "<span class=hld ng-if='!model' ng-style=style ng-bind='placeholder'></span>",
//                "<span class='err slide-left' ng-if=error_message ng-bind='error_message'></span>",
                com,
                "</div>"
            ].join("");
        },
        replace: true,
        scope: {
            ngModel: '@',
            ngFocus: "&",
            ngBlur: "&",
            onpress: '&',
            onconfirm: '&',
            autoheight: "="
        },
        link: function (scope, elem, attr) {
            scope.placeholder = attr.placeholder;
            if(!scope.placeholder){
                var holder_watcher=scope.$watch(function(){
                    return $scope.$eval(scope.ngModel+"_$name")||"";
                },function(_$name){
                    if(_$name){
                        holder_watcher();
                        scope.placeholder="\u8bf7\u8f93\u5165"+_$name;
                    }
                });
            }
            var $scope = elem.scope();
//            $scope.$watch(scope.ngModel + '_$error', function (error_message) {
//                scope.error_message=typeof error_message === "string" && error_message;
//            });
            Object.defineProperty(scope, 'model', {
                get: function () {
                    return $scope.$eval(scope.ngModel);
                },
                set: function (v) {
                    return $parse(scope.ngModel).assign($scope, v);
                }
            });
            var input = elem.children()[0];
            var gcs = getComputedStyle(input);
            scope.style = {
                paddingLeft: gcs.paddingLeft,
                paddingRight: gcs.paddingRight,
                paddingTop: gcs.paddingTop,
                paddingBottom: gcs.paddingBottom
            };
            input.onfocus = function (event) {
                input.select();
                elem.addClass("focus");
                scope.ngFocus({$event: event});
                scope.$apply();
            };
            input.onblur = function (event) {
                elem.removeClass('focus');
                scope.ngBlur({$event: event});
                scope.$apply();
            };
            if (input.tagName.toLowerCase() === "textarea") {
                var resize = function () {
                    var delta = input.scrollHeight - input.offsetHeight;
                    if (delta > 0) {
                        elem.css({
                            height: elem[0].offsetHeight + delta + 2 + 'px'
                        });
                    } else {
                        var savedHeight = 0;
                        while (delta < 2 && savedHeight !== input.offsetHeight) {
                            savedHeight = input.offsetHeight;
                            elem.css({
                                height: elem[0].offsetHeight + (delta - 2) + 'px'
                            });
                            delta = input.scrollHeight - input.offsetHeight;
                        }
                        elem.css({
                            height: elem[0].offsetHeight + (delta + 2) + 'px'
                        });
                    }
                };
                elem.css({
                    maxHeight: scope.autoheight + 'px'
                });
                "input change keyup".split(" ").forEach(function (event) {
                    input.addEventListener(event, resize);
                });
            } else {
                elem.css({
                    lineHeight: elem[0].offsetHeight + 'px'
                });
            }
            if (scope.onconfirm || scope.onpress) {
                input.addEventListener('keydown', function (event) {
                    var code=event.which||event.key;
                    //\u6309\u952e\u662f\u5426\u88ab\u5141\u8bb8
                    if (scope.onpress && scope.onpress({$event: event}) === false) {
                        event.preventDefault();
                        return false;
                    }
                    //\u7528\u6237\u6309\u4e0b\u56de\u8f66
                    if (code === 13) {
                        scope.onconfirm && scope.onconfirm({$event: event});
                        scope.$apply();
                    }
                });
            }
            $scope.$watch(function () {
                return elem[0].hasAttribute("disabled") || elem[0].getAttribute("disabled");
            }, function (disabled) {
                if (disabled) {
                    input.setAttribute("disabled", "");
                    elem.addClass("disabled");
                } else {
                    elem.removeClass("disabled");
                    input.removeAttribute("disabled");
                }
            });
        }
    };
}]);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * 
 * @\u6ce8\u610f \u53ea\u6709\u5728id-key\u4e0d\u5b58\u5728\u65f6\uff0c\u624d\u53ef\u4ee5\u7528\u591a\u9009
 */
yjkj.directive("treeInput", ["getScreenPosition", "$compile", "$animate", "$parse", "hashMap", "zIndex", function (getScreenPosition, $compile, $animate, $parse, hashMap, zIndex) {
    return {
        restrict: "E",
        template: "<div class='selector' ng-class=\"{'valued':selected,'focus':focused,'uppack':uppacked}\"><div class='ddd'></div><span class='hld' ng-bind='selected||placeholder' ng-if='!text'></span><input ng-model='text' /></div>",
        scope: {
            ngModel: '@',
            source: '=',
            config: '&',
            idKey: '@',
            field: '@',
            noicon: '@',
            unpack: '=',
            multiSelect: '='
        },
        replace: true,
        link: function (scope, elem, attr) {
            scope.placeholder = attr.placeholder;
            if (!scope.placeholder) {
                var holder_watcher = scope.$watch(function () {
                    return $scope.$eval(scope.ngModel + "_$name");
                }, function (_$name) {
                    if (_$name) {
                        holder_watcher();
                        scope.placeholder = "\u8bf7\u9009\u62e9" + _$name;
                    }
                });
            }
            var config = function () {
                return scope.config() || {};
            };
            var list, scp;
            var input = elem.children()[elem.children().length - 1];
            scope.selected = '';
            var source;
            scope.tconfig = {
                ondrag: function () {
                    return false;
                },
                ondrop: function () {
                    return false;
                },
                onmodel: function (s) {
                    if (!s.root) {
                        return;
                    }
                    s.root.opened = true;
                    source = s;
                },
                oncheck: function (s) {
                    var oncheck = config().oncheck;
                    if (oncheck && oncheck(s) === false) {
                        return false;
                    }
                    if (source) {
                        if (scope.multiSelect) {
                            var s = source.root.source;
                            scope.model = s.filter(function (s) {
                                return s.checked && !(s.parent && s.parent.checked);
                            });
                        } else {
                            scope.model = s.root.$active;
                            scope.text = "";
                            input.blur();
                            s.checked = !s.checked;//\u8fd8\u539fcheck
                            return false;
                        }
                    }
                }
            };
            var id_key = scope.idKey;
            var $scope = elem.scope();
            Object.defineProperty(scope, 'model', {
                get: function () {
                    var value = $scope.$eval(scope.ngModel);
                    return (id_key ? id_map && id_map(value) : value) || null;
                },
                set: function (v) {
                    return $parse(scope.ngModel).assign($scope, id_key ? v && v[id_key] : v);
                }
            });
            scope.$watch("source", function (s) {
                if (!s) {
                    return;
                }
                id_map = hashMap();
                for (var k in s) {
                    var v = s[k];
                    id_key && id_map(v[id_key], v);
                }
            });
            var id_map;
            Object.defineProperty(scope, 'selected', {
                get: function () {
                    var v = scope.model;
                    return scope.multiSelect ? v && v.map(function (s) {
                        return s.name;
                    }).join(',') : v && v.name;
                }
            });

            var hide = function () {
                list && list.parentNode && $animate.leave(angular.element(list)).then(function () {
                    scope.text = "";
                    scp && scp.$destroy();
                });

//                list && list.parentNode && list.parentNode.removeChild(list);
            };
            var position;
            var build = function () {
                position = getScreenPosition(elem[0]);
                //source && filter(source.root.source, '');
                list = list || document.createElement('div');
                var maxHeight = Math.min(360, Math.max(window.innerHeight - position.top - elem[0].offsetHeight, position.top)) - 5;

                if (window.innerHeight > position.top + maxHeight) {
                    angular.extend(list.style, {
                        top: (position.top + elem[0].offsetHeight + 1) + 'px',
                        bottom: ''
                    });
                } else {
                    angular.extend(list.style, {
                        top: '',
                        bottom: (window.innerHeight - position.top + 1) + 'px'
                    });
                }
                if (window.innerWidth > position.left * 2) {
                    angular.extend(list.style, {
                        left: (position.left + 1) + 'px',
                        right: ''
                    });
                } else {
                    angular.extend(list.style, {
                        left: '',
                        right: window.innerWidth - (position.left + elem[0].offsetWidth + 1) + 'px'
                    });
                }
                var _list = angular.element(list);
                _list.attr("class", "select-input-container");
                list.onmousedown = function (e) {
                    e.preventDefault();
                };
                _list.css({
                    minWidth: elem[0].offsetWidth + 'px',
                    boxShadow: "0 2px 3px rgba(0,0,0,0.1)",
                    position: 'fixed',
                    zIndex: zIndex()
                });
                _list.html("<scroll-content ispopup autox><tree-view ng-model='source' filter=text unpack=unpack multi-select=" + scope.multiSelect
                        + (attr.noicon || attr.noicon === "" ? " noicon" : "") + " link config='tconfig'></tree-view></scroll-content>");
                scp = scope.$new();
                $compile(_list)(scp);
                _list.children()[0].children[0].style.maxHeight = maxHeight + 'px';
                $animate.enter(_list, null, document.body);
                if (scope.multiSelect) {
                } else {
                    var value = scope.model;
                    scope.source.forEach(function (s) {
                        s.active = s === value;
                    });
                }
                _list.on("mousedown", function (e) {
                    e.preventDefault();
                });
            };
            input.onblur = function () {
                scope.focused = false;
                hide();
                delete scope.uppacked;
            };
            input.onfocus = function () {
                scope.focused = true;
                if (input.tagName.toLowerCase() === 'input') {
                    scope.uppacked = true;
                    $scope.$apply();
                }
            };
            input.onclick = function () {
                if (list && list.parentNode) {
                    hide();
                } else {
                    build();
                }
            };
            scope.$watch(function () {
                if (!position) {
                    return;
                }
                var t = getScreenPosition(elem[0]);
                if (position.left !== t.left || position.top !== t.top) {
                    hide();
                }
            }, function () {});

        }
    };
}]);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.directive('treeView', ["$document", "isChildElement", "getScreenPosition", "getMatchList", "hashMap", function ($document, isChildElement, getScreenPosition, getMatchList, hashMap) {
    var treeViews = [];
    var parsefile = function (object, $index, $parent, $root, unpack) {
        return {
            checked: false,
            opened: unpack || false,
            name: typeof object === 'string' && Array.isArray($parent.value) ? object : $index,
            value: object,
            haschild: 0,
            children: [],
            parent: $parent,
            root: $root
        };
    };
    var add = function (file, parent, index) {
        free(file);
        if (parent.children) {
            if (typeof index === 'undefined') {
                index = parent.children.length;
            }
            parent.children.splice(index, 0, file);
            parent.haschild = parent.children.length;
            file.parent = parent;
        } else {
            parent.children = [file];
        }
    };
    var free = function (file) {
        if (!file) {
            throw 'file\u4e0d\u5b58\u5728';
        }
        var parent = file.parent;
        if (parent && parent.children) {
            var children = parent.children;
            var index = find(file, children);
            if (index - 0 >= 0) {
                var _ = children.splice(index, 1);
                parent.haschild = children.length;
            }
            file.parent = null;
            return true;
        }
        return false;
    };
    var isfolder = function (object) {
        return object && typeof object === "object";
    };
    var getfiles = function (value) {
        var result = [];
        if (isfolder(value)) {
            for (var k in value) {
                result.push(parsefile(value[k], k));
            }
        }
        return result;
    };
    var parseArray = function (object) {
        var root = parsefile(object);
        var result = [root], cx = 0, dx = 1;
        while (cx < dx) {
            for (var i = cx; i < dx; i++) {
                var obj = result[i];
                var children = [];
                var o = obj.value;
                if (isfolder(o)) {
                    for (var k in o) {
                        var file = parsefile(o[k], k, obj, root);
                        result.push(file);
                        children.push(file);
                    }
                }
                obj.children = children;
                obj.haschild = children.length;
            }
            cx = dx;
            dx = result.length;
        }
        return result;
    };

    var _parseTree = function (obj, nocopy, unpack) {
        var object;
        if (nocopy) {
            object = obj;
        } else {
            object = {};
            angular.copy(obj, object);
        }
        var _result = [];
        function f(o, _, $) {
            var children = [];
            var result = parsefile(o, _, $, _result[0], unpack);
            _result.push(result);
            result.children = children;
            if (isfolder(o)) {
                for (var k in o) {
                    children.push(f(o[k], k, result));
                }
            }
            result.haschild = children.length;
            return result;
        }
        f(object);
        _result[0].root = _result[0];
        return _result[0];
    };
    var _parseYJ = function (arr1, nocopy, unpack) {
        if (!(arr1 && Array.isArray(arr1) && arr1.length)) {
            return [parsefile()];
        }
        var arr = [];
        nocopy ? arr = arr1 : angular.copy(arr1, arr);
        var _ = {};
        arr.forEach(function (a) {
            a.children = [];
            if (!a.pbm) {
                var match = a.bm.match(/^([\s\S]*)\d{4}$/m);
                a.pbm = match && match[1];
            }
            _[a.bm] = a;
        });
        var root = {
            children: [arr[0]],
            opened: true,
            source: arr
        };
        arr[0].parent = root;
        root.root = root;
        arr.forEach(function (a) {
            var p = _[a.pbm];
            p && add(a, p);
        });
        arr.forEach(function (a) {
            a.opened = unpack || a.opened || false;
            a.checked = a.checked || false;
            a.root = root;
            a.haschild = a.children && a.children.length;
        });
        return root;
    };

    var parseTree = function (object, nocopy, unpack) {
        //\u9012\u5f52\u548c\u5faa\u73af\u7684\u533a\u522b\u662f\uff0c\u9012\u5f52\u5403\u5185\u5b58\uff0c\u8dd1\u7684\u6162\uff0c\u601d\u7ef4\u7b80\u5355\uff0c\u4e0d\u8ba1\u540e\u679c\uff0c\u5bb9\u6613\u6ea2\u51fa
//        test(parseArray, [object], 10);
//        test(_parseTree, [object], 10);
//        test(parseArray, [object], 100);
//        test(_parseTree, [object], 100);
//        test(parseArray, [object], 1000);
//        test(_parseTree, [object], 1000);
//        return _parseTree(object)[0];
//        test(_parseYJ,[object],1000);
//console.log(object);
        if (object.root === object) {
            return object;
        }
        return Array.isArray(object) ? _parseYJ(object, nocopy, unpack) : _parseTree(object, nocopy, unpack);
        //
    };
    var test = function (f, a, time) {
        var start = Date.now();
        for (var cx = 0; cx < time; cx++) {
            f.apply(f, a);
        }
        var end = Date.now();
        return end - start;
    };

    var checkTree = function (object, autoCheckParent) {
        var value = !isTreeChecked(object);
        function f(o, value) {
            if (o && o.children) {
                for (var k in o.children) {
                    f(o.children[k], value);
                }
            }
            return o && (o.checked = value);
        }
        function f2(o, v) {
            if (!v) {
                var tmp = o;
                while (tmp.parent) {
                    tmp = tmp.parent;
                    tmp.checked = false;
                }
            } else if (autoCheckParent) {
                if (o.parent) {
                    var temp = o.parent.children;
                    for (var c in temp) {
                        if (!isTreeChecked(temp[c])) {
                            o.parent.checked = false;
                            return f2(o.parent, false);
                        }
                    }
                    o.parent.checked = true;
                    return f2(o.parent, true);
                }
            }
        }
        f(object, value);
        f2(object, value);
        return;
    };
    var isTreeChecked = function (object) {
        return object && object.checked;
    };
    var find = function (dst, arr) {
        for (var i in arr) {
            if (arr[i] === dst) {
                return i;
            }
        }
    };
    var $template = function (elem, attr) {
        var drag;
        if (attr.edit === "" || attr.edit) {
            drag = " ng-dragable";
        } else {
            drag = "";
        }
        var e = function (str) {
            if (!attr.scroll && attr.scroll !== "" && !attr.height && !attr.width) {
                return str;
            } else {
                var height = attr.height || '360px';
                var width = attr.width || '100%';
                return "<div class='select-input-container' style='width:" + width + ";" + "max-width:" + width + "'><scroll-content style='max-height:" + height + ";height:" + height + ";'>" + str + "</scroll-content></div>";
            }
        };
        var noicon = function () {
            return (attr.noicon || attr.noicon === '' ? 'noicon' : "");
        }();
        var tree = "<div ng-hide='s.show===false' config='dragconfig'" + drag + " ng-repeat='(i,s) in data.children' ng-class=\"{'checked':s.checked,'opened':s.opened,'haschild':s.haschild,'active':s.active}\" ng-style='s.style' >"
                + "<div class=item  ng-click='check(s,$event)'><div ><div class=ddd></div><div class=icon"
                + "></div></div><div><checkbox ng-show='multiSelect' disabled ng-model='s.checked'></checkbox><marker text=s.name mark=filter></marker></div></div>"
                + "<tree-view " + noicon + " ng-if='s.opened' ng-model='s' oncheck='oncheck' config='tconfig' auto-check-parent='autoCheckParent' multi-select='multiSelect' is-child='true' filter=filter></tree-view></div>";
        if (attr.isChild) {
            return e('<div class="tree-view ' + (noicon) + '" ' + noicon + '>' + tree + '</div>');
        } else {
            return e('<div class="tree-view root ' + (noicon) + '" ' + noicon + '>' + tree + '</div>');
        }
    };
    var filter = function (values, value, unpack) {
        if (!value) {
            values.forEach && values.forEach(function (v) {
                v.opened = unpack || false;
                delete v.show;
            });
        } else {
            var init_data = [];
            values.forEach(function (v) {
                if (v.show !== false) {
                    init_data.push(v);
                }
                v.opened = unpack || false;
            });
            getMatchList(values, value, 'name').$onprocess(function (arr, brr) {
                brr.forEach(function (v) {
                    v.show = false;
                });
                arr.forEach(function (v) {
                    delete v.show;
                    while (v.parent) {
                        delete v.show;
                        v = v.parent;
                        v.opened = true;
                    }
                });
            }).$init(init_data);
        }
        return values;
    };

    return {
        restrict: "E",
        template: $template,
        replace: true,
        scope: {
            ngModel: "&", //\u6811
            config: "&",
            autoCheckParent: "=",
            multiSelect: "=", //\u662f\u5426\u652f\u6301\u591a\u9009
            isChild: "=",
            oncheck: '=',
            unpack: '=',
            filter: '=?'
        },
        link: function (scope, elem, attr) {
            function config() {
//            ondrag: '&', //\u662f\u4e0d\u662f\u53ef\u4ee5\u5f00\u59cb\u62d6\u52a8
//            ondrop: '&', //\u62d6\u52a8\u5230\u4e00\u4e2a\u65b0\u7684\u4f4d\u7f6e
//            oncheck:'&',//\u5355\u51fb\u65f6\u7684\u4e8b\u4ef6\u901a\u77e5
//            onmodel:'&',//\u6a21\u578b\u88ab\u5efa\u7acb\u6216\u91cd\u5efa
                return scope.config() || {};
            }
            Object.defineProperty(scope, 'tconfig', {
                get: function () {
                    return config();
                }
            });
            var ngModel = scope.ngModel;
            //linkscroll
            if (!scope.isChild) {
                scope.$watch(function () {
                    return ngModel();
                }, function () {
                    scope.data = parseTree(ngModel(), attr.link === "" || attr.link || true, scope.unpack);//ng-model\u53cc\u5411\u7ed1\u5b9a\uff0c
                    var onmodel = config().onmodel;
                    if (onmodel && onmodel(scope.data) === false) {
                        return;
                    }
                    scope.data.opened = true;
                });
                scope.$watchGroup(["ngModel()", "filter"], function (arr) {
                    var model = arr[0], f = arr[1];
                    filter(model, f, scope.unpack);
                });
            } else {
                scope.data = ngModel();
            }

            var last_time_mousedown = 0;
            -function () {
                var open = function (s) {
                    if (s.haschild) {
                        var onopen = config().onopen;
                        if (onopen && onopen(s) === false) {
                            return;
                        }
                        s.opened = !s.opened;
                    } else {
                        check(s);
                    }
                };
                var check = function (s) {
                    var oncheck = scope.oncheck || config().oncheck;
                    checkTree(s, scope.autoCheckParent);
                    active(s);
                    if (oncheck && oncheck(s) === false) {
                        return;
                    }
                };
                scope.check = function (s, $event) {
                    if (Date.now() - last_time_mousedown > 300) {
                        return;
                    }
                    var $ = angular.element;
                    var target = $event.target;
                    var temp = null;
                    while (target) {
                        if (target && $(target).hasClass("item")) {
                            break;
                        }
                        temp = target;
                        target = target.parentNode;
                    }
                    if(target&&target.children[0]===temp){
                        open(s);
                    }else{
                        check(s);
                    }
                };
            }();
            var active = function (s) {
                scope.data.root.$active && (scope.data.root.$active.active = false);
                scope.data.root.$active = s;
                s.active = true;
            };
            elem.on("mousedown", function () {
                last_time_mousedown = Date.now();
            });

            elem.ready(build);
            function build() {
                var drag = function (file) {
                    if (!(file && file.parent)) {
                        throw '\u65e0\u6cd5\u62d6\u52a8\u6839\u7ed3\u70b9';
                    }
                    var ondrag = config().ondrag;
                    if (ondrag && ondrag(file) === false) {
                        scope.data.draging = false;
                        return console.log("\u7981\u6b62\u62d6\u52a8\uff01");
                    }
                    var parent = file.parent;
                    var index = find(file, parent.children);
                    add(file, scope.data.root);
                    scope.data.root.draging = {
                        parent: parent,
                        index: parseInt(index),
                        file: file
                    };
                };
                var drop = function (parent, index) {
                    var draging = scope.data.root.draging;

                    var ondrag = config().ondrag;
                    var file = draging.file;
                    if (file === parent || typeof parent === 'undefined') {
                        parent = draging.parent;
                        index = draging.index;
                    }
                    delete scope.data.root.draging;
                    delete file.draging;
                    if (ondrag && ondrag(file, parent, index) === false) {
                        add(draging.flie, draging.parent, draging.index);
                        return console.log('\u62d6\u52a8\u53d6\u6d88');
                    }
                    add(file, parent, index);
                };

                var data = {
                    data: function () {
                        return scope.data;
                    },
                    elem: elem
                };
                var split = function (cols, index, height) {
                    var element = angular.element;
                    var e;
                    if (index === 0) {
                        e = element(cols[index]);
                        e.css({marginTop: height + 'px', boxShadow: "0 -4px 4px rgba(0,0,0,0.1)"});
                    } else if (index === cols.length) {
                        element(cols[index - 1]).css({marginBottom: height + 'px', boxShadow: "0 4px 4px rgba(0,0,0,0.1)"});
                    } else {
                        e = element(cols[index]);
                        element(cols[index - 1]).css({marginBottom: height + 'px', boxShadow: "0 4px 4px rgba(0,0,0,0.1)"});
                        e.css({marginTop: height + 'px', boxShadow: "0 -4px 4px rgba(0,0,0,0.1)"});
                    }
                    return e;
                };
                var reshape = function (fe, _center, clear) {
                    var children = fe.data().children;
                    var elem = fe.elem;
                    var target = scope.data.root.draging.file;
                    var element = angular.element;
                    var left = 'top', offset = 'offset', Width = 'Height';
                    var cols = elem.children();
                    var overindex = -1, spliter = cols.length;
                    var cs = Array.prototype.filter.apply(cols, [function (col, cx) {
                            var available = children[cx] === target;
                            var e = element(col);
                            if (available) {
                                spliter = cx;
                            } else {
                                if (getScreenPosition(col)[left] + col[offset + Width] / 2 < _center) {
                                    overindex = cx;
                                }
                                e.css({margin: "", boxShadow: ""});
                            }
                            return !available;
                        }]);

                    /**
                     * \u5982\u679c\u5f53\u524d\u4f4d\u7f6e\u521a\u597d\u662f\u539f\u4f4d\u7f6e
                     * \u90a3\u4e48\u4f4d\u7f6e\u5bbd\u5ea6\u4e3a\u6b63\u5728\u62d6\u52a8\u7684\u5143\u7d20\u7684\u5bbd\u5ea6
                     * \u5982\u662f\u5f53\u524d\u4f4d\u7f6e\u4e0d\u662f\u539f\u4f4d\u7f6e
                     * \u90a3\u4e48\u4f4d\u7f6e\u5bbd\u5ea6\u662f10
                     * \u539f\u4f4d\u7f6e\u7684\u5bbd\u5ea6\u4e3a\u6b63\u5728\u62d6\u52a8\u7684\u5143\u7d20\u7684\u5bbd\u5ea6-10
                     */
                    if (!clear) {
                        var finalIndex = overindex < spliter ? overindex + 1 : overindex;
                        if (finalIndex === spliter) {
                            split(cs, finalIndex, 2);
                        } else {
                            split(cs, finalIndex, 2);
                        }
                        return [finalIndex, spliter];
                    }
                }
                var finder = function (left, top, tree) {
                    tree = tree || treeViews;
                    var min = null;
                    for (var i in tree) {
                        var e = tree[i];
                        var point = getScreenPosition(e.elem[0]);
                        var w = e.elem[0].offsetWidth;
                        var h = e.elem[0].offsetHeight;
                        var lr = (left - point.left) / w;
                        var lt = (top - point.top) / h;
                        if (lr > -0.5 && lr < 1.5 && lt > -0.5 && lt < 1.5) {
                            if (min && isChildElement(min.e.elem[0], e.elem[0])) {
                            } else {
                                min = {
                                    w: w,
                                    h: h,
                                    lr: lr,
                                    lt: lt,
                                    e: e
                                };
                            }
                        }
                    }
                    return min;
                };
                treeViews.push(data);
                scope.$on("$destroy", function () {
                    var index = find(data, treeViews);
                    if (index >= 0) {
                        treeViews.splice(index, 1);
                    }
                });
                var target = null;
                var thinktime = 0;
                var think = function () {
                    var data = scope.data.root.draging.target;
                    if (data && data.parent) {
                        var index = data.index;
                        var target = data.parent.children[index - 1];
                        if (target && target !== scope.data.root.draging.file) {
                            target.parent && target.parent.children.forEach(function (e) {
                                e.opened = e === target;
                            });
                            active(target);
                            data.parent = target;
                            data.index = 0;
                            scope.$apply();
                        }
                    }
                };
                var fe;

                var onmousemove = function (e) {

                    var index = find(target, elem.children());
                    if (!scope.data.root.draging) {
                        var file = scope.data.children[index];
                        drag(file);
                        if (!scope.data.root.draging) {
                            return;
                        }
                        file.style = {
                            margin: "", boxShadow: "0 0 4px rgba(0,0,0,0.4)",
                            position: 'fixed',
                            width: target.offsetWidth + 'px',
                            height: target.offsetHeight + 'px'
                        };
                        var position = getScreenPosition(target);
                        scope.data.root.draging.deltaX = e.screenX - position.left;
                        scope.data.root.draging.deltaY = e.screenY - position.top;
                    } else {
                        var draging = scope.data.root.draging;
                        angular.extend(draging.file.style, {
                            left: e.screenX - draging.deltaX + 'px',
                            top: e.screenY - draging.deltaY + 'px'
                        });
                    }
                    treeViews.forEach(function (fe) {
                        reshape(fe, 0, true);
                    });

                    scope.$apply();
                    var f = finder(e.clientX, e.clientY);
                    if (f) {
                        fe = f.e;
                        var a = reshape(fe, e.clientY);
                        scope.data.root.draging.target = {parent: fe.data(), index: a[0]};
                        fe.data().children.forEach(function (e) {
                            e.opened = false;
                        });
                        active(fe.data());
                        clearTimeout(thinktime);
                        thinktime = setTimeout(function () {
                            think();
                        }, 500);
                    } else {
                        delete scope.data.root.draging.target;
                    }

                };
                var onmouseup = function () {
                    $document.off("mousemove", onmousemove);
                    $document.off("mouseup", onmouseup);
                    if (scope.data.root.draging) {
                        var file = scope.data.root.draging.file;
                        delete file.style;
                        var target = scope.data.root.draging.target;
                        treeViews.forEach(function (fe) {
                            reshape(fe, 0, true);
                        });
                        if (target) {
                            drop(target.parent, target.index);
                        } else {
                            drop();
                        }
                        scope.$apply();
                    }
//                    scope.data.root.source.forEach(function(s){
//                        delete s.style;
//                    });
                    clearTimeout(thinktime);
                };
                scope.dragconfig = {
                    dragstart: function (e) {
                        target = e;
                        $document.on("mousemove", onmousemove);
                        $document.on("mouseup", onmouseup);
                        return false;
                    }
                };
            }
        }
    };
}]);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.directive('viewContent', ["$animate", "require", "$controller", "$compile", "$timeout", "storage", "views", function ($animate, require, $controller, $compile, $timeout, storage, views) {
    //\u5148\u53ea\u652f\u6301\u4e00\u79cd\u5f39\u5b50\u7a97\u65b9\u5f0f\uff0c
    //\u4ece\u6307\u5b9a\u8def\u5f84\u52a0\u8f7d\u7a97\u53e3\u5185\u5bb9
    var _views = views;
    var $template = function (template, noscroll) {
        var scroll_content = noscroll ? "<div class='noscroll-content' ng-class={'fullscreen':$ViewFullScreen}>" + template + "</div>" : "<scroll-content>" + template + "</scroll-content>";
        return "<div class='title' ng-if='$ViewTitle'><span ng-bind='$ViewTitle'></span><i ng-if='$CloseButton!==false' ng-click='$CloseView()'></i></div>" + scroll_content + "<div class='option' ng-if='$ViewOptions'><div><anniu class='m' ng-click='$CloseView(s,i)' ng-class=\"{'inactive':$index>0}\" enabled=s.enabled ng-repeat='(i,s) in $ViewOptions'>{{i}}</anniu></div></div>";
    };
    var find = function (view) {
        for (var i in views) {
            if (views[i] === view) {
                return i;
            }
        }
    };
    var view_history = function () {
        var view_history_name = "HISTORY", view_history_object = storage.get(view_history_name) || {};
        var view_routine = function () {
            var routines = Object.keys(view_history_object);
            return routines[routines.length - 1];
        }();
        var result = function (key, value) {
            if (arguments.length === 1 || typeof value === "number") {
                return result.get(key, value);
            } else {
                return result.set(key, value);
            }
        };
        result.routine = function (routine_key) {
            view_routine = routine_key;
            result.save();
        };
        result.save = function (history) {
            history = history || view_history_object[view_routine];
            delete view_history_object[view_routine];
            view_history_object[view_routine] = history;
            storage.set(view_history_name, view_history_object);
        };
        result.set = function (key, value) {
            var history = view_history_object[view_routine] || {};
            var paths = history[key] || [];
            -function () {
                for (var dec = paths.length - 1; dec >= 0; dec--) {
                    if (paths[dec] === value) {
                        paths.splice(dec);
                        break;
                    }
                }
            }();
            paths.push(value);
            history[key] = paths;
            result.save(history);
            return paths[paths.length - 1];
        };

        result.get = function (key, index) {
            var history = view_history_object[view_routine] || {};
            var paths = history[key] || [];
            if (typeof index === "undefined") {
                index = paths.length - 1;
            } else if (index < 0) {
                index = paths.length + index;
            }
            return paths[index];
        };
        return result;
    }();
    return {
        restrict: 'E',
        replace: true,
        template: '<div class="view-content" ng-style=\"$GenViewStyle()\"></div>',
        scope: false,
        link: function (scope, $element, attr) {
            if (!scope.$ViewRelative) {
                scope.$ViewRelative = '/';
            }


//            dragable(scope, $element, 'view-content');

            var window_name = attr.name;
            var genScope = function () {
                return window_name ? scope.$new() : scope;
            };

            var view = {
                scope: genScope(),
                element: $element,
                name: window_name,
                path: '',
                routine: function (name, home_path) {
                    view_history.routine(name);
                    init(home_path);
                    return view;
                },
                flush: function (template, controller) {
                    if (view.last_view) {
                        view.last_view.$destroy();
                    }
                    var $scope = view.scope;
                    var hasSaveFunction = !!scope.hasOwnProperty("$Save");
                    var hasCloseFunction = !!scope.hasOwnProperty("$CloseView");
                    if (!(hasSaveFunction ^ hasCloseFunction)) {
                        $scope.$CloseView = function () {
                            view.close();
                        };
                    }
                    var storage_key = 'state/' + controller;
                    var long_time_parameters_version = "longtime_parameters";
                    var saved_data = storage.get(storage_key, long_time_parameters_version) || {};
                    angular.extend(saved_data, storage.get(storage_key));
                    $scope.$Save = function () {
                        var result = {};
                        Array.prototype.forEach.apply(arguments, [function (a) {
                                result[a] = $scope[a];
                            }]);
                        var use_localStorage = false;
                        setTimeout(function () {
                            if (use_localStorage) {
                                var saved_data = storage.get(storage_key, long_time_parameters_version) || {};
                                angular.extend(saved_data, result);
                                storage.set(storage_key, saved_data, long_time_parameters_version);
                            } else {
                                var saved_data = storage.get(storage_key) || {};
                                angular.extend(saved_data, result);
                                storage.set(storage_key, saved_data);
                            }
                        }, 0);
                        storage.set(storage_key, result);
                        var options = {
                            local: function () {
                                use_localStorage = true;
                                return options;
                            }
                        };
                        return options;
                    };
                    angular.extend($scope, saved_data);
                    $element.html($template(template, attr.noscroll === "" || attr.noscroll));
                    var link = $compile($element.contents());
                    var locals = view;
                    locals.$scope = $scope;
                    if (controller) {
                        var _class = controller.replace(/[A-Z]/g, function (w) {
                            return "-" + w.toLowerCase();
                        });
                        $element.addClass(_class);
                        $scope.$on('$destroy', function () {
                            $element.removeClass(_class);
                        });
                        controller = $controller(controller, locals);
                        $element.data('$ngControllerController', controller);

                        $element.children().data('$ngControllerController', controller);
                        $scope['$resolve'] = locals;
                    }
                    link($scope);
                    view.currentView = $scope;
                    $element.ready(function () {
                        var element = $element[0].getElementsByClassName("autofocus")[0];
                        if (element) {
                            element = element.getElementsByTagName("input")[0]
                                    || element.getElementsByTagName("textarea")[0]
                                    || element.getElementsByTagName("select")[0]
                                    || element.getElementsByTagName("button")[0];
                        }
                        element && element.focus();
                    });
                    if ($scope.$ScrollTopTo) {
                        $scope.$ScrollTopTo(0);
                    }

                    if (view.flush.then) {
                        view.flush.then();
                        delete view.flush.then;
                    }
                    return view;
                },
                open: function (path, parameters) {
                    if (window_name) {
                        view_history(window_name, path);
                    }
                    //format(path)
                    if (path === view.path) {
                        view.data(parameters);
                        $timeout(function () {
                            if (view.flush.then) {
                                view.flush.then();
                                delete view.flush.then;
                            }
                        });
                        return view;
                    }
                    var parameter_key = 'parameter' + path;
                    var last_parameter = storage.get(parameter_key) || {};
                    angular.extend(last_parameter, parameters);
                    view.last_view = view.scope;
                    var $scope = genScope();
                    view.scope = $scope;
                    view.data(parameters);
                    $element.attr('ng-view', path);
                    return view;
                },
                remove: function () {
                    return scope.$destroy();
                },
                close: function () {
                    $element.attr("style", "");
                    view.open("");
                },
                data: function (parameters) {
                    var $scope = view.scope;
                    for (var k in parameters) {
                        $scope[k] = parameters[k];
                    }
                    return view;
                },
                then: function (call) {
                    view.flush.then = call;
                }
            };
            var init = function (home_path) {
                if (window_name) {
                    views[window_name] = view;
                    var history_path = view_history(window_name) || home_path;
                    if (history_path) {
                        view.open(history_path);
                    }
                    view.back = function () {
                        var history_path = view_history(window_name, -2);
                        if (history_path) {
                            view.open(history_path);
                        }
                    };
                }
            };
            init();
            views.push(view);
            scope.$watch(function () {
                return $element.attr('ng-view');
            }, function (path) {
                view.path = path;
                if (path) {
                    if (typeof path === 'string' && path[0] !== '/') {
                        path = "/" + path;
                    }
                    if (view.scope !== scope) {
                        view.scope.$ViewRelative = path;
                    }
                    if (window_name)
                        console.log(window_name + ":" + "%c" + path, "background-color:#000;color:#fff");
                    require(path)(view.flush);
                } else {
                    var contents = $element.contents();
                    contents.length && $animate.leave(contents).then(function () {
                        //\u4e0d\u660e\u6240\u4ee5
                    });
                }
            });
            scope.$on('$destroy', function () {
                delete _views[window_name];
                views.splice(find(view), 1);
            });
        }
    };
}]);
/**
 * alert
 * @param {sting} title \u663e\u793a\u5728\u6807\u9898\u533a\u57df\u7684\u5185\u5bb9
 * @param {string} content \u663e\u793a\u5728\u6b63\u6587\u533a\u57df\u7684\u5185\u5bb9
 * @param {object} annius \u53ef\u9009\u6309\u94ae\u7ec4
 * @param {function} callback \u56de\u8c03\u51fd\u6570
 * @param {number} timeout \u81ea\u52a8\u5173\u95ed\u65f6\u95f4
 * @argument {boolean} closeanniu \u662f\u5426\u63d0\u4f9b\u5173\u95ed\u6309\u94ae\uff0c\u9ed8\u8ba4\u4e3ature
 * \u5982\u679c\u53ea\u8f93\u5165\u4e00\u4e2a\u5b57\u7b26\u4e32\u7c7b\u578b\u7684\u53c2\u6570\uff0c\u5219\u6b64\u5b57\u7b26\u4e32\u4f1a\u663e\u793a\u5728content\u533a\u57df
 * \u5982\u679c\u8f93\u5165\u4e24\u4e2a\u5b57\u7b26\u4e32\u7c7b\u578b\u7684\u53c2\u6570\uff0c\u5219\u524d\u4e00\u4e2a\u663e\u793a\u5728title\u533a\u57df\uff0c\u540e\u4e00\u4e2a\u663e\u793a\u5728content\u533a\u57df
 * \u5176\u4ed6\u6240\u6709\u53c2\u6570\u4e0d\u533a\u5206\u5148\u540e\u987a\u5e8f
 * @example 
 * var content="\u5185\u5bb9";
 * callback=function(opt,index){};
 * annius=["opt1","opt2"]||{opt1:0,opt2:1}
 * alert(content,annius,callback);
 * @example \u4e0d\u663e\u793a\u6309\u94ae\u7ec4
 * var content="\u5185\u5bb9",title="\u6807\u9898";
 * alert(title||content);
 * @example \u56de\u8c03\u51fd\u6570\u7684\u53e6\u4e00\u79cd\u65b9\u5f0f
 * alert("\u4f60\u597d").onclose(callback);
 */
yjkj.factory("alert", ["popup", "$templateCache", "$register", "$rootScope", "$animate", "hashMap", "$compile", "$window", "getScreenPosition", "zIndex", function (popup, $templateCache, $register, $rootScope, $animate, hashMap, $compile, $window, getScreenPosition, zIndex) {
    $register.controller("FactoryAlert", ["$scope", function ($scope) {
        var content = $scope.content || '';
        var title = $scope.$ViewTitle || '';
        var length = title.length;
        if (length < content.length) {
            length = content.length;
        }
        var a = Math.sqrt(length * 14 * 20);

    }]);
    $templateCache.put("builtin/factory/alert.html", "<div class='alert-factory'>{{content}}</div>");
    $register.service("tips", ["alert", function (alert) {
        return alert;
    }]);
    var alert = function () {
        var title, content, annius = {"\u786e\u5b9a": 0}, callback, timeout, closeanniu;
        var adapter = {
            'string': function (arg) {
                if (typeof content === 'string') {
                    title = content;
                } else {
                    title = arg;
                }
                content = arg;
            },
            'object': function (arg) {
                if (Array.isArray(arg)) {
                    annius = {};
                    arg.forEach(function (value, key) {
                        annius[value] = key;
                    });
                } else {
                    annius = arg;
                }
            },
            'function': function (arg) {
                callback = arg;
            },
            "boolean": function (arg) {
                closeanniu = arg;
            },
            "number": function (arg) {
                timeout = true;
                setTimeout(function () {
                    close && close();
                }, arg > 0 ? arg * 1000 : ("" + content + title).length * 200 + 400);
            }
        };
        Array.prototype.forEach.apply(arguments, [function (arg) {
                adapter[typeof arg](arg);
            }]);
        var pop_result = popup("/Factory/alert", {
            $ViewTitle: title,
            $CloseButton: closeanniu,
            content: content,
            $ViewOptions: annius
        }).onclose(function (v, k) {
            callback && callback(v, k);
        }).solid();
        var close = pop_result.close;
        var result = {
            element: pop_result.element,
            onclose: function (_callback) {
                callback = _callback;
                return result;
            },
            info: function () {
                pop_result.addClass("info");
                return result;
            },
            warn: function () {
                pop_result.addClass("warn");
                return result;
            },
            error: function () {
                pop_result.addClass("error");
                return result;
            },
            autoclose: function (time) {
                setTimeout(close, time > 0 ? time * 1000 : ("" + content + title).length * 200 + 400);
                return result;
            }
        };
        return result;
    };
    -function () {
        var messageTypes = {
            log: "#2a53cd",
            info: "#228B22",
            warn: "#dd6a16",
            error: "#dc352e"
        };
        messageTypes.success = messageTypes.info;
        var $scope = $rootScope.$new();
        var messages = hashMap();
        $scope.messages = messages;
        var show = function (msg, color, icon) {
            var obj = messages(msg) || {count: 0};
            obj.icon = icon;
            obj.text = msg;
            obj.color = color;
            obj.count++;
            var winWidth = $window.innerWidth, width = winWidth;
            if (width > 600) {
                width = 600;
            }
            console.log(msg.color);
            obj.width = width;
            messages(msg, obj);
            clearTimeout(obj.show_timer);
            obj.show_timer = setTimeout(function () {
                hide(msg);
                $scope.$apply();
            }, msg.length * 150 + 2800);
        };
        var hide = function (msg) {
            var obj = messages(msg);
            if (!obj) {
                return;
            }
            clearTimeout(obj.show_timer);
            messages.drop(msg);
        };
        $scope.close_alert = hide;
        var dom = angular.element("<div class='slide-down alert-factory' ng-repeat='msg in messages.values()' ng-style=\"{backgroundColor:msg.color,top:$index*50+'px',width:msg.width+'px',marginLeft:-(msg.width/2)+'px'}\"><i icon=msg.icon color='#fff' ></i>&nbsp;&nbsp;<span ng-bind=msg.text></span><i ng-click=close_alert(msg.text) style='position:absolute;right:0px;top:0;height:100%;width:40px;' ><i icon='close' style=top:50%;position:absolute;left:50%;margin-left:-8px;margin-top:-8px; color=#fff></i></i></div>");
        dom.css({
            zIndex: 0xffffffff,
            color: "#fff",
            height: "50px",
            left: "50%",
            lineHeight: '40px',
            position: "fixed",
            padding: "5px 10px"
        });
        $compile(dom)($scope);
        $animate.enter(dom, document.body, null);
        angular.forEach(messageTypes, function (str, k) {
            var color = str.slice(0, 7);
            var icon = str.slice(7) || k;
            alert[k] = function (msg) {
                return show(msg, color, icon);
            };
        });
    }();
    alert.point = function (template, target, max) {
        var elem = angular.element(target);
        var element = angular.element(template);
        var scope = max && max.scope || elem.scope();
        if (!scope) {
            throw "only elements inside document.body can use as target!";
        }
        var set_position = function () {
            if (!element) {
                return;
            }
            var position = getScreenPosition(elem[0]);
            var maxHeight = Math.min(max && max.height || 360, Math.max($window.innerHeight - position.top - elem[0].offsetHeight, position.top)) - 5;
            var maxWidth = Math.min(max && max.width || $window.innerWidth - 10, Math.max($window.innerWidth - position.left - elem[0].offsetWidth, position.left) - 5);
            var fixTop = max.fix ? 0 : elem[0].offsetHeight;
            var fixHeight = max.fix ? elem[0].offsetHeight : 0;
            if ($window.innerWidth > maxWidth * 2) {
                element.css({
                    left: (position.left + 1) + 'px'
                });
            } else {
                element.css({
                    right: $window.innerWidth - (position.left + elem[0].offsetWidth + 1) + 'px'
                });
            }
            if ($window.innerHeight > position.top + maxHeight) {
                element.css({
                    'top': (position.top + fixTop + 1) + 'px',
                    'bottom': 'auto'
                });
            } else {
                element.css({
                    'top': 'auto',
                    'bottom': ($window.innerHeight - fixHeight - position.top + 1) + 'px'
                });
            }
            element.css({
                position: "fixed",
                margin: 0,
                padding: 0,
                minWidth: (elem[0].offsetWidth) + 'px',
                zIndex: zIndex(),
                maxHeight: maxHeight + 'px',
                maxWidth: maxWidth + 'px'
            });
        };
        var build = function () {
            element && destroy();
            element = angular.element(template);
            var $scope = scope.$new();
            $scope.$watch(function () {
                var position = getScreenPosition(elem[0]);
                return position.left + "," + position.top + "," + $window.innerWidth + "," + $window.innerHeight;
            }, set_position);
            $compile(element)($scope);
            css_args.length && element.css.apply(element, [].slice(css_args, [0]));
            element.attr("ispopup", "");
            element.on("mousedown", function (event) {
                event.preventDefault();
            });
            $animate.enter(element, document.body, null).then(function () {
            });
        };
        var destroy = function () {
            if (!element) {
                return;
            }
            var $scope = element.scope();
            $animate.leave(element).then(function () {
                $scope && $scope.$destroy();
            });
            element = null;
        };
        var css_args = [];
        var result = {
            destroy: destroy,
            rebuild: build,
            css: function () {
                css = arguments;
            },
            ing: function () {
                return element;
            }
        };
        return result;
    };
    window.alert = alert;
    return alert;
}]);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.factory("api", ["$timeout", "user", function ($timeout, user) {
    var defineHiddenProperty = function (o, k, v) {
        if (o instanceof Object) {
            if (!o.hasOwnProperty((k))) {
                Object.defineProperty(o, k, {
                    value: v,
                    writable: true,
                    configurable: true,
                    enumerable: false
                });
            } else {
                o[k] = v;
            }
        }
    };
    var runner = null;
    var api = function (uri, parameters, prefix) {
        if (!uri) {
            throw '\u4e0d\u5b58\u5728uri';
        }
        if (typeof parameters === "string") {
            prefix = parameters;
            parameters = "";
        }
        prefix = prefix || "";
        var req = function () {
            onstart && onstart();
            prefix && console.log("\u6b63\u5728" + prefix);
            var url = api.base + uri;
            var clear = function () {
                user(20 * 60 * 1000);//10\u5206\u949f\u81ea\u52a8\u9501\u5b9a
                req.ing = false;
                api.count--;
                api.inqueue--;
                if (runner === req) {
                    runner = null;
                }
                onend && onend();
            };
            var xhr = new XMLHttpRequest();
            xhr.open('post', url);
            xhr.onload = function () {
                $timeout(clear);
                var text = xhr.responseText;
                if (text) {
                    try {
                        var result = JSON.parse(text);
                        if (result.result === "error") {
                            prefix && console.error(prefix + "\u5931\u8d25\uff01");
                            return onerror && onerror(result.message || prefix + "\u5931\u8d25\uff01", 0);
                        }
                        if (result.result === "timeout") {
                            return onlogout && onlogout(result);
                        }
                        try {
                            onsuccess && onsuccess(result);
                        } catch (e) {
                            onerror && onerror(prefix + "\u5904\u7406\u8fd4\u56de\u7ed3\u679c\u5931\u8d25\uff01");
                            console.error('\u5904\u7406\u7ed3\u679c\u5931\u8d25\uff01', e);
                        }
                        prefix && console.info(prefix + "\u6210\u529f\uff01");
                    } catch (e) {
                        prefix && console.error(prefix + "\u5931\u8d25\uff01", e);
                        onerror && onerror(prefix + "\u63a5\u53e3\u8fd4\u56de\u4fe1\u606f\u5f02\u5e38\uff01", 1);
                    }
                } else {
                    prefix && console.error(prefix + "\u5931\u8d25\uff01");
                    onerror && onerror(prefix + "\u63a5\u53e3\u672a\u8fd4\u56de\u4fe1\u606f\uff01", 2);
                }
            };
            xhr.upload.onprogress = function (event) {
                onupload && onupload(event, xhr);
                req.up_total = event.total;
                req.up_loaded = event.loaded;
                req.up_scale = event.loaded / event.total;
                $timeout(function () {
                });
            };
            xhr.onabort = function (event) {
                $timeout(clear);
                onerror && onerror("\u8bf7\u6c42\u53d6\u6d88\uff01");
                return xhr;
            };
            xhr.onprogress = function (event) {
                $timeout(function () {
                    ondownload && ondownload(event);
                });
            };
            xhr.ontimeout = function () {
                $timeout(clear);
                onerror && onerror("\u8bf7\u6c42\u8d85\u65f6\uff01");
            };
            xhr.onerror = function () {
                $timeout(clear);
                if (!navigator.onLine) {
                    onerror && onerror("\u8bf7\u6c42\u7f51\u7edc\u5931\u8d25\uff0c\u8bf7\u786e\u8ba4\u7f51\u7edc\u8fde\u63a5\u6b63\u5e38\uff01", -1);
                } else {
                    onerror && onerror("\u65e0\u6cd5\u8bbf\u95ee\u670d\u52a1\u5668\uff01", xhr);
                }
                prefix && console.error(prefix + "\u5931\u8d25\uff01");
            };
            if (typeof parameters !== "string") {
                switch ( {
                    }.toString.call(parameters)){
                    case "[object FileList]":
                        var temp = new FormData();
                        for (var cx = 0, dx = parameters.length; cx < dx; cx++) {
                            temp.append('files', parameters[cx]);
                        }
                        parameters = temp;
                        break;
                    case "[object File]":
                        var temp = new FormData();
                        temp.append('file', parameters);
                        parameters = temp;
                        break;
                    case "[object Object]":
                        parameters = JSON.stringify(parameters);
                    case "[object Undefined]":
                        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                        break;
                    case "[object FormData]":
                        break;
                    default:
                        console.warn("\u4e0d\u652f\u6301\u7684\u6570\u636e\u683c\u5f0f", {}.toString.call(parameters));
                }
            }
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            var headers = api.headers;
            for (var k in headers) {
                xhr.setRequestHeader(k, headers[k]);
            }
            req.up_scale = 0;
            xhr.send(parameters || "");
            req.cancel = function () {
                xhr.abort();
            };
        };

        var onsuccess = api.onsuccess,
                onerror = api.onerror,
                onupload, onlogout, ondownload, onstart, onend;
        req.onsuccess = function (_success) {
            onsuccess = _success;
            return req;
        };
        req.onlogout = function (_logout) {
            onlogout = _logout;
            return req;
        };
        req.onstart = function (_onsend) {
            onstart = _onsend;
            return req;
        };
        req.onerror = function (_error) {
            onerror = _error;
            return req;
        };
        req.onupload = function (_onprogress) {
            onupload = _onprogress;
            return req;
        };
        req.ondownload = function (_onprogress) {
            ondownload = _onprogress;
            return req;
        };
        req.cancel = function () {};

        req.success = req.onsuccess;
        req.error = req.onerror;
        api.count++;
        api.inqueue++;
        var wait = function () {
            if (isqueue) {
                if (runner) {
                    return $timeout(wait, 100);
                }
                runner = req;
                req();
                console.log("\u961f\u5217\u6709" + api.inqueue + "\u4e2a\u8bf7\u6c42");
            } else {
                if (req.ing) {
                    return;
                }
                req.ing = true;
                req();
            }
        };
        $timeout(wait);
        var isqueue = false;
        req.queue = function (q) {
            isqueue = q !== false;
            return req;
        };
        req.onend = function (f) {
            onend = f;
            return req;
        };
        return req;
    };
    api.adapt = function (data_object, parameters, uri, apiName) {
        if (!apiName) {
            apiName = "\u8bf7\u6c42" + uri;
        }
        var needs = [], inputs = [], selects = [];
        for (var k in parameters) {
            var v = parameters[k];
            var test = "", default_value = "", name = null;
            if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") {
                default_value = v;
            } else if (typeof v === "function" || v instanceof RegExp) {
                test = v;
            } else {
                v && v.forEach && v.forEach(function (v) {
                    if (typeof v === "function" || v instanceof Object) {
                        test = v;
                    } else if (typeof v === "number" || typeof v === "boolean") {
                        default_value = v;
                    } else if (typeof v === "string") {
                        if (name !== null) {
                            default_value = v;
                        } else {
                            name = v;
                        }
                    }
                });
            }

            if (k[0] === '_') {//\u5fc5\u8f93
                k = k.slice(1);
                defineHiddenProperty(data_object, k + "_$must", true);
                inputs.push(k);
            } else if (k[0] === "$") {//\u5fc5\u9009
                k = k.slice(1);
                selects.push(k);
                defineHiddenProperty(data_object, k + "_$must", true);
            }
            needs.push(k);
            defineHiddenProperty(data_object, k + "_$name", data_object[k + "_$name"] || name || "");
            data_object[k] = data_object[k] || default_value;
            if (test && typeof test === "function") {
                defineHiddenProperty(data_object, [k + '_$test'], test);
            } else if (test && typeof test.test === "function") {
                defineHiddenProperty(data_object, [k + '_$test'], function () {
                    var reg = test;
                    return function (value) {
                        return !reg.test(value);
                    };
                }());
            }
        }

        var request = function () {
            request.test();
            //\u68c0\u67e5\u53c2\u6570
            var message = request.messages;
            if (message.length) {
                return onprevent && onprevent(message.join("\uff01") + "\uff01");
            }
            //\u6784\u5efa\u53c2\u6570
            var datas = {};
            needs.forEach(function (key) {
                var value = data_object[key];
                if (value !== null && typeof value !== "undefined") {
                    datas[key] = value;
                }
            });
            //\u8bf7\u6c42
            if (onpost && onpost(datas) === false) {
                return;
            }
            request.ing = true;
            return api(uri, datas, apiName).onsuccess(function (result) {
                request.ing = false;
                onsuccess && onsuccess(result);
            }).onerror(function (err) {
                onerror && onerror(err);
                request.ing = false;
            }).queue(isqueue).onend(onend);
        };
        var onpost = api.onpost, onsuccess = api.onsuccess, onerror = api.onerror, onprevent = api.onprevent, isqueue = false, onend;
        request.onsuccess = function (f) {
            onsuccess = f;
            return request;
        };
        request.onerror = function (f) {
            onerror = f;
            return request;
        };
        request.onpost = function (f) {
            onpost = f;
            return request;
        };
        request.onprevent = function (f) {
            onprevent = f;
            return request;
        };
        request.queue = function () {
            isqueue = true;
            return request;
        };
        request.onend = function (f) {
            onend = f;
            return request;
        };
        request.test = function () {
            needs.forEach(function (need) {
                var value = data_object[need];
                var error = need + '_$error';
                if (value) {
                    var test = data_object[need + '_$test'];
                    if (!test) {
                        delete data_object[error];
                    } else {
                        var test_result = test(value);
                        if (test_result) {
                            data_object[error] = test_result;
                        } else {
                            delete data_object[error];
                        }
                    }
                } else {
                    delete data_object[error];
                }
                delete data_object[need + "_$need"];
            });
            var inputs_error = needs.filter(function (need) {
                return data_object[need] && data_object[need + "_$error"];
            }).map(function (key) {
                return data_object[key + '_$name'];
            }).join("\u3001");
            var inputs_lack = inputs.filter(function (key) {
                return data_object[key] === "" || data_object[key] === null || data_object === undefined;
            }).map(function (key) {
                data_object[key + "_$need"] = "\u8bf7\u8f93\u5165" + data_object[key + '_$name'];
                return data_object[key + '_$name'];
            }).join("\u3001");
            var selects_lack = selects.filter(function (key) {
                return !data_object[key];
            }).map(function (key) {
                data_object[key + "_$need"] = "\u8bf7\u9009\u62e9" + data_object[key + '_$name'];
                return data_object[key + '_$name'];
            }).join("\u3001");
            var message = [];
            inputs_lack && message.push("\u8bf7\u8f93\u5165" + inputs_lack);
            selects_lack && message.push("\u8bf7\u9009\u62e9" + selects_lack);
            inputs_error && message.push("\u60a8\u8f93\u5165\u7684" + inputs_error + "\u683c\u5f0f\u6709\u8bef");
            request.messages = message;
            return request;
        };
        return request;
    };
    api.headers = {};
    api.base = "";
    api.count = 0;
    api.inqueue = 0;
    return api;
}]);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.factory('asyncEach', ["hashMap", "$timeout", function (hashMap,$timeout) {

    var each = function (progress_size, auto_start) {
        progress_size = progress_size || 100;
        var map = hashMap();
        return function (sources, method) {
            if (typeof sources !== 'object') {
                return '';
            }
            var last_running = map(sources);
            if (last_running) {
                last_running.end();
            }
            var array_mode = Array.isArray(sources);
            var runner, isend, onend, onprogress, process;
            if (array_mode) {
                runner = function (start, end) {
                    for (var cx = start, dx = end; cx < dx; cx++) {
                        method(sources[cx], cx, sources);
                    }
                    return sources.slice(start, end);
                };
                isend = function (index) {
                    return index > sources.length;
                };
            } else {
                var keeys = Object.keys(sources);
                runner = function (start, end) {
                    for (var cx = start, dx = Math.min(keeys.length, end); cx < dx; cx++) {
                        var key = keeys[cx];
                        method(sources[key], key, sources);
                    }
                };
                isend = function (index) {
                    return index > keeys.length;
                };
            }
            var run = function (source_index) {
                if (run.yield_time) {
                    return;
                }
                if (isend(source_index)) {
                    onend && onend();
                    return;
                }
                runner(source_index, source_index + progress_size);
                onprogress && onprogress();
                $timeout(function () {
                    run(source_index + progress_size);
                }, 0);
            };
            var process = {
                onend: function (_onend) {
                    onend = _onend;
                    return process;
                },
                onprocess: function (_) {
                    onprocess = _;
                    return process;
                },
                start: function () {
                    if (!process.start_time) {
                        process.start_time = Date.now();
                        $timeout(function () {
                            run(0);
                        }, 0);
                    }
                    return process;
                },
                end: function () {
                    map.drop(sources);
                    run.yield_time = Date.now();
                    return process;
                }
            };
            map(sources, process);
            auto_start !== false && process.start();
            return process;
        };
    };
    return each;
}]);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.directive('asyncFilter', ["asyncEach", "hashMap", function (asyncEach,hashMap) {
    var filter = function () {
        //\u6709\u65f6\u5019js\u4e5f\u8981\u624b\u52a8\u6e05\u5185\u5b58\uff0c\u771f\u5751\u554a\u3002
//        hashMap
        return function (src,method,last_map) {
            var map=last_map||hashMap();
            var each = asyncEach();
            var process=each(src,function(v,k,data){
                if(method(v,k,data)){
                    map(data,k);
                    map(data);
                }else{
                    
                }
            });
            process.map=map;
            return process;
        };
    };
    return filter;
}]);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.factory("back", function () {
    var BackListeners = [];
    var find = function (esc) {
        for (var k in BackListeners) {
            if (esc === BackListeners[k]) {
                return k;
            }
        }
    };
    var back = function () {
        var v = BackListeners[BackListeners.length - 1];
        return v.apply(null,[].slice.call(arguments,[0]));
    };
    back.pipe = function (doSomeThing, AutoRelease) {
        var esc = function () {
            if (doSomeThing.apply(null, Array.prototype.slice.apply(arguments, [0])) === false) {
                return false;
            }
            if (AutoRelease === false) {
                return false;
            }
            esc.release();
        };
        esc.release=function(){
            var index = find(esc);
            if (index >= 0) {
                BackListeners.splice(index, 1);
            }
        };
        BackListeners.push(esc);
        return esc;
    };
    return back;
});
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

yjkj.factory('clone', ["getScreenPosition", function (getScreenPosition) {
    var _css = function (dst, node, offset) {
        var nodeType = {}.toString.call(node);
        console.log(nodeType);
        if (nodeType.slice(nodeType.length - 8) === "Element]") {
        } else if (nodeType.slice(nodeType.length - 5) === "Text]") {
            return document.createTextNode(node.textContent);
        } else {
            return ;
        }
        var gcs = getComputedStyle(node);
        if(gcs.display==="none"||gcs.type==="hidden"||gcs.visible==="hidden"){
            return;
        }
        var psn = getScreenPosition(node);
        if (!offset) {
            offset = {left: 0, top: 0};
        }
        var css = {
            width: node.offsetWidth + "px",
            height: node.offsetHeight + "px",
            top: psn.top - offset.top + "px",
            left: psn.left - offset.left + "px",
            boxSizing: "borderBox",
            position: "absolute"
        };
        ["border", "background", "outline", "color", "font"].forEach(function (k) {
            css[k] = gcs[k];
        });
        if (!dst) {
            dst = document.createElement(node.tagName);
        }
        angular.element(dst).css(css);
        var childNodes = node.childNodes;
        if (childNodes && childNodes.length) {
            for (var cx = 0, dx = childNodes.length; cx < dx; cx++) {
                var nd = _css(null, childNodes[cx], psn);
                nd && dst.appendChild(nd);
            }
        }
        return dst;
    };
    var clone = function (node) {
        var cln = _css(null, node, {left: -10, top: -10});
        cln.style.zIndex = 100;
        document.body.appendChild(cln);
    };
    window.clone = clone;
    return clone;
}]);

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.factory('context', ["getScreenPosition", function (getScreenPosition) {
    return function (target, context,_remove) {
        var position = getScreenPosition(target);
        context.css({
            position: "fixed",
            margin: 0,
            padding: 0,
            left: position.left + 'px',
            width: (target.offsetWidth) + 'px',
            zIndex: 9,
            backgroundColor: '#ffffff'
        });
        var hide=function(){
            _remove&&_remove();
            context[0].parentNode&&context[0].parentNode.removeChild(context[0]);
        };
        context.scope().$watch(function () {
            if (!position) {
                return;
            }
            var t = getScreenPosition(target);
            if (position.left !== t.left || position.top !== t.top) {
                hide();
            }
        });
        if (window.innerHeight > position.top + 360) {
            context.css('top', (position.top + target.offsetHeight) + 'px');
        } else {
            context.css('bottom', (window.innerHeight - position.top) + 'px');
        }
        return hide;
    };
}]);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.factory('dragable', ["$compile", "$document", "getScreenPosition", function ($compile,$document, getScreenPosition) {
    return function (scope, element, attrName) {
        attrName = attrName || 'ng-dragable';
        var config = function () {
//            dragstart: '&', //\u662f\u4e0d\u662f\u53ef\u4ee5\u5f00\u59cb\u62d6\u52a8
//            dragmove: '&',
//            dragpause: "&",
//            dragstop: '&', //\u62d6\u52a8\u7ed3\u675f\u4e86
            return scope.config && scope.config() || {};
        };
        // valiables
        var canDrag = false;
        var startX = 0;
        var startY = 0;
        var left = scope.left || 0;
        var top = scope.top || 0;
        scope.onResizeX = scope.onResizeX && scope.onResizeX() || angular.noop;
        scope.onResizeY = scope.onResizeY && scope.onResizeY() || angular.noop;
        var e = element.children()[0];
        // event handlers
        var last_mouse_stop_time = 0;
        var initPause = function (e) {
            clearTimeout(last_mouse_stop_time);
            var tmp_left = left;
            var tmp_top = top;
            last_mouse_stop_time = setTimeout(function () {
                if (tmp_left === left && tmp_top === top) {
                    var dragpause = config().dragpause;
                    savedCss && dragpause && dragpause(canDrag);
                }
            }, 500);
        };
        var onMouseMove = function (e) {
            if (canDrag === false) {
                return;
            }
            if (!savedCss) {
                savedCss = {
                    "box-shadow": element.css("position") || "",
                    position: element.css("position") || "",
                    opacity: element.css('opacity') || "",
                    zIndex: element.css("zIndex") || null,
                    top: element.css("top") || null,
                    left: element.css("left") || null,
                    width: element.css("width") || null,
                    height: element.css("height") || null
                };
                element.css({
                    position: 'fixed',
                    top: top + 'px',
                    left: left + 'px',
                    width: element[0].offsetWidth + "px",
                    height: element[0].offsetHeight + "px",
                    zIndex: "1",
                    "box-shadow": "0 0 5px rgba(0,0,0,0.3)",
                    opacity: "0.5"
                });
            }
            left = e.screenX - startX;
            top = e.screenY - startY;
            if (angular.isDefined(scope.left) && !scope.lockx) {
                scope.left = left;
            }
            if (angular.isDefined(scope.top) && !scope.locky) {
                scope.top = top;
            }
            var dragmove = config().dragmove;
            dragmove && dragmove(canDrag);
            scope.$apply();
            if (!scope.lockx) {
                element.css({left: left + 'px'});
            }
            if (!scope.locky) {
                element.css({top: top + 'px'});
            }
            initPause();
        };
        var onMouseUp = function (e) {
            $document.off('mousemove', onMouseMove);
            $document.off('mouseup', onMouseUp);
            if (savedCss) {
                e.preventDefault();
                var dragstop = config().dragstop;
                dragstop && dragstop(canDrag);
                console.log(savedCss);
                element.css(savedCss);
                savedCss = null;
            }
        };
        var onMouseDown = function (e) {
            // Prevent default dragging of selected content
            var tmp = e.target;
            while (tmp && tmp !== document.body) {
                if (tmp.hasAttribute && (tmp.hasAttribute(attrName) || tmp.hasAttribute('prevent-drag'))) {
                    break;
                }
                tmp = tmp.parentNode;
            }
            canDrag = tmp === element[0] ? tmp : false;
            var dragstart = config().dragstart;
            if (canDrag) {
                canDrag = dragstart && dragstart(tmp);
                if (!canDrag && canDrag !== false) {
                    canDrag = tmp;
                }
            }
            if (canDrag !== false) {
                e.preventDefault();
            }
            var position = getScreenPosition(element[0]);
            top = position.top;
            left = position.left;
            startX = e.screenX - left;
            startY = e.screenY - top;
            $document.on('mousemove', onMouseMove);
            $document.on('mouseup', onMouseUp);
        };
        var savedCss;
        // style

        if (angular.isDefined(scope.width)) {
            element.css({width: scope.width + 'px'});
        }
        if (angular.isDefined(scope.height)) {
            element.css({height: scope.height + 'px'});
        }

        // event handler binding
        element.on('mousedown', onMouseDown);
        // resize handler x-axis
        if (scope.resizex) {
            // valiables
            var xHandleStart = 0;
            // handle jqlite object
            var xHandleRight = angular.element('<div/>');
            var xHandleLeft = angular.element('<div/>');
            // styles
            xHandleRight.css({
                zIndex: 90, cursor: 'e-resize', width: '7px', right: '0px', top: 0, height: '100%',
                position: 'absolute', display: 'block', touchAction: 'none'
            });
            xHandleLeft.css({
                zIndex: 90, cursor: 'w-resize', width: '7px', left: '-7px', top: 0, height: '100%',
                position: 'absolute', display: 'block', touchAction: 'none'
            });
            // event handler
            var xHandleMouseMoveRight = function (e) {
            var width = element.prop('offsetWidth');
                var diff = e.screenX - xHandleStart;
                width = +width + diff;
                if (angular.isDefined(scope.width)) {
                    scope.width = width;
                    scope.$apply();
                }

                xHandleStart = e.screenX;
                element.css({width: width + 'px'});
            };
            var xHandleMouseMoveLeft = function (e) {
            var width = element.prop('offsetWidth');
                var diff = e.screenX - xHandleStart;
                left = left + diff;
                width = +width - diff;
                if (angular.isDefined(scope.width)) {
                    scope.width = width;
                    scope.$apply();
                }

                xHandleStart = e.screenX;
                element.css({width: width + 'px', left: left + 'px'});
            };
            var xHandleMouseUpRight = function () {
                try {
                    scope.onResizeX();
                } catch (ex) {
                    console.log('ResizeY callback has following error :: ' + e.message);
                } finally {
                    $document.off('mousemove', xHandleMouseMoveRight);
                    $document.off('mouseup', xHandleMouseUpRight);
                }
            };
            var xHandleMouseUpLeft = function () {
                try {
                    scope.onResizeX();
                } catch (ex) {
                    console.log('ResizeY callback has following error :: ' + e.message);
                } finally {
                    $document.off('mousemove', xHandleMouseMoveLeft);
                    $document.off('mouseup', xHandleMouseUpLeft);
                }
            };
            var xHandleMouseDownRight = function (e) {
                e.preventDefault();
                e.stopPropagation();
                // set default positions
                xHandleStart = e.screenX;
                // add handler
                $document.on('mousemove', xHandleMouseMoveRight);
                $document.on('mouseup', xHandleMouseUpRight);
            };
            var xHandleMouseDownLeft = function (e) {
                e.preventDefault();
                e.stopPropagation();
                // set default positions
                xHandleStart = e.screenX;
                // add handler
                $document.on('mousemove', xHandleMouseMoveLeft);
                $document.on('mouseup', xHandleMouseUpLeft);
            };
            // bind handlers
            xHandleRight.bind('mousedown', xHandleMouseDownRight);
            xHandleLeft.bind('mousedown', xHandleMouseDownLeft);
            // compile and append to html
            $compile(xHandleRight)(scope);
            element.append(xHandleRight);
            $compile(xHandleLeft)(scope);
            element.append(xHandleLeft);
        }

        // resize handler y-axis
        if (scope.resizey) {
            // valiables
            var height = scope.height || element.prop('offsetHeight');
            var yHandleStart = 0;
            // handle jqlite object
            var yHandleBottom = angular.element('<div/>');
            var yHandleTop = angular.element('<div/>');
            // styles
            yHandleBottom.css({
                zIndex: 90, cursor: 's-resize', height: '7px', bottom: '-5px', left: 0, width: '100%',
                position: 'absolute', display: 'block', touchAction: 'none'
            });
            yHandleTop.css({
                zIndex: 90, cursor: 'n-resize', height: '7px', top: '-5px', left: 0, width: '100%',
                position: 'absolute', display: 'block', touchAction: 'none'
            });
            // event handler
            var yHandleTopMouseMove = function (e) {
                var diff = e.screenY - yHandleStart;
                height = +height - diff;
                top = top + diff;
                if (angular.isDefined(scope.height)) {
                    scope.height = height;
                    scope.$apply();
                }
                yHandleStart = e.screenY;
                element.css({height: height + 'px', top: top + 'px'});
            };
            var yHandleBottomMouseMove = function (e) {
                height = +height + e.screenY - yHandleStart;
                if (angular.isDefined(scope.height)) {
                    scope.height = height;
                    scope.$apply();
                }
                yHandleStart = e.screenY;
                element.css({height: height + 'px'});
            };
            var yHandleTopMouseUp = function () {
                try {
                    scope.onResizeY();
                } catch (ex) {
                    console.log('ResizeY callback has following error :: ' + ex.message);
                } finally {
                    $document.off('mousemove', yHandleTopMouseMove);
                    $document.off('mouseup', yHandleTopMouseUp);
                }
            };
            var yHandleBottomMouseUp = function () {
                try {
                    scope.onResizeY();
                } catch (ex) {
                    console.log('ResizeY callback has following error :: ' + e.message);
                } finally {
                    $document.off('mousemove', yHandleBottomMouseMove);
                    $document.off('mouseup', yHandleBottomMouseUp);
                }
            };
            var yHandleTopMouseDown = function (e) {
                e.preventDefault();
                e.stopPropagation();
                // set default positions
                yHandleStart = e.screenY;
                // add handler
                $document.on('mousemove', yHandleTopMouseMove);
                $document.on('mouseup', yHandleTopMouseUp);
            };
            var yHandleBottomMouseDown = function (e) {
                e.preventDefault();
                e.stopPropagation();
                // set default positions
                yHandleStart = e.screenY;
                // add handler
                $document.on('mousemove', yHandleBottomMouseMove);
                $document.on('mouseup', yHandleBottomMouseUp);
            };
            // bind handlers
            yHandleTop.bind('mousedown', yHandleTopMouseDown);
            yHandleBottom.bind('mousedown', yHandleBottomMouseDown);
            // compile and append to html
            $compile(yHandleTop)(scope);
            element.append(yHandleTop);
            $compile(yHandleBottom)(scope);
            element.append(yHandleBottom);
        }

    };
}]);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.factory('excel', function () {
    var excel = function (grid) {
        var result = [];
        var a = document.createElement("a");
        a.download="hello png.png";
        a.href = "data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wAARCAB5AHkDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD8LlAC7mPbgURum/MoJAPIBwT+NMJ4ApxC9yPwrZ7mgOVJG31o8sKRvbn0HUVJZWk95dJaWsDSSyHCIgySa9D8H/CGGAJea6RNJ1EP8Cn0P94/p9adjWjRqVn7pxuheE/EXiBgNJsG2E4MpG1R+J612Ol/Ai7cB9Y1VlJGSsIwPplv8K9a8O+Bm+yL56NAoUbY41+bH0/hH1NdHB4Z0nSozMbaNcgESXLbvyzgH8AatLQ9ejlsLXlqeOWXwY8JwnZJayTMO7ysf5Yq9/wp7wmQA+iYB7kP/jXrgY+WDBHPImOGt7Ztn06AVKsmpyRDy7K7we4Qn/2aix1rB0VokvuPFL/4KeEGG0WssJI4KSsP55FYGrfA69hVpNG1QSKORHcJj/x4f4V9Bak8ip/ptoyZGR9oiI3f99A1jXen6bdgsbcQsf44zx/PH8qVkzKpgKMun6HzTrPh3XPD83l6tpjxpzsfAZSPZhwaoS2+2ISq6ncTwGHb27V9E6v4bVomhlgWaJz8ymPOfqprzfxd8JrfEl74ZKxuRk2rZKt67Sfun2/lRotzza+BnDWOp50ZZfLWAyMUBJCZ4BOMkD8B+QpjKB1OakuIJraVoJ4ijxsVZWGGBH8qNvmJk9qm9zz9SMnAIB6io6mljby2ZVyFPOO1Q1cdgFAJIx2qxZ2Nxf3EdpbQF5JGwir3NQxDdx6GvQ/hr4dOl2P9t3kGZ5x/o4K8onr9T/L60kk2zWjSdWfKjV8E+B4dAhRAglu5R88g/h9h6D+dekeGdJitSt5LOABy0xP3fYen16+lYWkRCFAW4YDMj+g/wH6nit2z1d7TYyoBJ1hRxkR/7TY6t/L+Vnu0IQppJHWJdJZwIryrFGxzFGFBkb3x/D9Tlu/SrOmwaxqim50jTRGMnfdOMtn13k/KfofwrI0aKzsm+260GuJn/wCWJPB9N3/xI4rdn1C/v4w91P5MSD5FXChB6AdB/Opdup6EHcbJ4cQky6v4riQkfMELSH/x3A/U1BLovhhI+PE0hPcG3f8A+LqCeO2kQmKy83BzvbLbvxNVbi2jMZ3WCY6gDH+NTdFOyLM2lTxuG0TxKj548szFGP4N/jWZfxz27+XqmnmNyeJYF2n8uh+vWq14baJhGFaFs+65/pRHqmqWMJVmW6tyfmjkGcfh2/CmmjKTI5RJGv2hLhHj/vqMbfqv8P8AKsnVdLF6TPbgK4GWAHyt/n8q1LnyLkG80p2U4y8TDJA/qP1qlJNiHzbdSAnDpnO33Ht/n6V5GMtTzn4heAV16I3VpEFv4xw3TzAP4W9/Q/5HmEkE8ErW88RR1JDKw5BHUV9C6qpmgNyUG9eCo6kf5/SvMvil4XVz/wAJLYRDOQLsAcHsH/kD+FQ42eh5WMw6a9pH5nBuCqsB+GeuKiqd84IGcbeQT0qCqhseWanhTRv7c1q3sCTsLFpiOyDk/wCfevV7GWCOYELtVVAQY4H0+lcT8KtPH2e61RkJORFGR+bf0rtIYVwgLcd+KND08JDlp83c14L0wsG3DC4IUjqew/Dr9TV/TLpomW9k+aQ8xg9B23f0H51+lv7JH/BsX4//AGmf2c/BP7Qmr/tY6b4ah8Y6HFqo0qTwfLPLZxSjcm5muIw3yFWzgDDAgkYJ9q8Lf8GkCR2l7/wk/wC2w5nCsNNbT/BI8vhmCGQPdZ+6EJA7kgE4ycpYmhF2cjf61Ri9WfkXp1zFAours7pWPyr7/wCf89SOm0LTf7TX+0NSkEcKch36f8BXufc19Xf8FIv+CGXxk/4J3+HNP+LCfE228c+D5p/s+oapa6U1jJpsjMqxJLE0sgIkLYDKxOVOQODX3f8ADD/g2f8A2WvHPwV8La/8SvjN8SbPXdV0GyutUsdLvrCOGC5khR5YY1e1ZgoJZRliQBk5putSte+51LG0KdNSb0ex+M2sePPBvh+IQwWn2iQDHmytuz6YHQD8Kw5PiVZ3bFo9EtdnX/j39/pX2D/wVU/4J7/sufsR/tLWXwS+BuoeJ9SS28O213r8niC/jneK5meRgqtFHFu/deW2DwS3avpb/gm//wAG8GjftC/D/TPjZ+1RfS+HtB1e0iu9F8P6DbwrfXlu43JNNO6MIFdcEIAXKsCSh4quaLSkazxahRVWTsnsfk5P4i8Oa0hjEP2aQnkoTtJ9x/8AWrQ8K/D+TxJJJHZeIIFunmht9L0pVZp9QmmLKixZwiqHChyzjaHBUPggf0Mw/wDBDb/gj/ompzfDLwx+zfo2ueJ4beGe7sNS8canJd21vIxUXUqrdB40+V9pCgMy7VIzkfPv/BR3/g36/Yo+Cf7MHjn9o34L3/i3Qr/wl4dmv4tBh1RbyxuJUKn5luVaVVALZAlPGDzjBj2kW7HJDMaNSSi003sfix4l0+fwl5vhvVdHkg1WGaKX7T5rqI43iDbBGVAOdynd0IHGQQaxb+7tZXWaytXhxGFljeQNl8fMRwPlY5IHOOmT1r+h/wD4It/8E4PhND/wT/8AD+qftW/sv+H9Z8Ta9rl/q80Hj3wsk93CjSCCEul2jFS0MKMCAuUdeD1PvEnw2/4Jj/A79pzwv+z7F+zP8PtH8e+PtMvLzQ7bTfANtslhtUBlBdIdsXyxkjO0MVbHJOT2qTszGePipuMYt2P5WZJEU7FyVK5TOenp+FZOpWtnPHJYyqHilQqynuD1r+mX/grt/wAEwv2JfF37CvxH8eeFv2f/AAR4S8T+FfC91rWj+ItB8Pw2MyyWqGdomNuI/NEiRvHh9wBcNjKiv5pdQtYYmZ2J+9gZrSMlPY0o1o4im2keIa5YPpN3PpMwO+GUgtjr6H6Ec1nV3HxdsI1vIdVWPBuICjEDqycfyI/KuHqlsePVh7Oo4nonw7jEPhaBlPMksjH67sf0rtvCWi33irxRp/hrT4Q8+oXkVtbop5Z5HCqPzIrjPAEefCdox4+Z+ev/AC0avpP/AIJqfCfUvjf+3Z8L/h3plil09x4stbqSCS/jtQ8VsTcSDzZFdU+SJuqtk8bSTgzeyZ6lGypL0P6wvhR4R8O/B/4Z+GfhDp19bx2/h3wzaWFrH5oDeTbwxwg49MLXzv8As9/Dz9rLRv8Ago98cfjf8YdW1Ox+HuoaPpOl/DzRJtbSe2uSsS+bdi2jkKwsZInUZCuRKeMcn2PSNNtdG07UNT1zX9F0c6Uv2q7g0dnmeCAb2UyTT8sjIIyWCIC6OcmvmP8A4Jb/ALcfxf8A2xPgz/w0T8XfDWo6QNe8fX+kaLd+GdLubuyurO2jLRSXMUhlFsAd0Zli2CR41Bxg58iSnJvQ8+nF8smjb/4KS2el/wDBQPwVH+wT+zp8Q/Cms+J/+Eg07VvH9u+txsdE0i1u0aUyImXE7ybEWIgHG7cUGCfsxNOjmtGgt5XgAi8qJolHyAccBgV7dwa+S/jr8Ivhjqv/AAUy/Z+8Z/Djw7plj4iXR/Fd/wCIdT0fFtLqGnw2ltAkVy8PMyLPdxMqvkAg4Ir6uv8AVbXw/wCGbnWtenW3t7G0knu5WOAiIpZmJycAAE5zW8FypLoZ1X7kYr+v6sfiF+2NZ+P/AI7f8Fx4fDvh9NQ0hNZ8cafo2mXz2jKJbK3VLK6mi3riSMeTcgkZUlWHY1+4Gj3PhnSo4vCmj3VlF9it0jhsIJVDRRqoCgIOQAMCvwU/4JUaj4r/AGhP+Co1x8RrEyS6nDY+Jte0vz5DIsN3PBcCIktnA866Bz6nPevprxR+2xp+h3E/w78D3Opy/FLSTLM/hqO0lGo2d1EpklkuAwGxVwzPI5C7dxJIOa7PZuWnZHq4rDuq4U725Uv6/A+iP+Cd2uXPxU/4KA/tUfG2e7kltYvFOneFdOOcpiwSeJwvp/q0P/Aj616T/wAFdBr17/wTq+KHhvwi9kdV1zQ10vTor7UIrZJpbiaOLyhJKyr5jBiqLnLuVRcswFeX/wDBA7wjfL+xjqHxp19S2qfEXx1qut30pzhz5oh/9DikPP8AeNV/+C2slj8TvC/wg/Y+svED20nxG+L2j2+sWtlchZTp6zgSMVBzgPJG4JGN0ee1ZNO9jinHmx/Kvs2/8lX/AAD6q/Zd8M+KPBX7PHgXwd49guU1/TPB2nQ60lzdTXBjuhboJU86V5Gk2yBhlndsAEk5yecv/wBk74M+Kf2yLL9s2TW76/8AGfh3wy/hu2tPt8b2emwSM8zMIVAZJnExBZmPyOMKOterWk1yYI544v3HkZCN98Y6fXI/l3r43/4JgfAP44+Fv2gv2j/2qfjl4U1DQW+J3xGQeFtJ1bKzHSrMzLb3DJ1TfHMiqrAMPKIIFSnpdHLG7U53t+t2eR/8HIfxe/bE+Hf7Hmp+Ffhv8MtHHw41x7aw8V+M4dbZ7+BJHGLc2hjUQxyOqoZVeXKuVITfz/O9OJ7iBxKOcZ9K/oc/4OkfjhoHgj9hLQvg3HqMY1Txr4zgaO0Djc1paI8ssmPQStbj6uK/nqZ0kiLEbQM5GK6KKXKetgV/s+xxPxXt9/hKO7XA2T44YZwVJPH5f5FeX16p8UWj/wCEPlC8qZ1xz0ODXldbHFjf43yPSvh20cvhC1I48uWRGOO+/P8AIiv0L/4N+4fg7pP7bF941+M3xR8I+FdM0bwNqUtrd+MNXt7SC4uZPLgEUZmdQz+XJK2FyQEJxxX5yfCm887T7rSmcgofOT6dG/8AZa7PT7qS0u47tJEYo3AljBBx6g5BH1rOUeeLiddF89BK5/Vnd/tv/wDBMXxt4fT4C+If2t/h9dNrGlx6bcWOjeNIi99H8wWH7RaMDvweURwR5mOhGcrwd+31/wAErv2ZvgbPpnwZ/ah+GGk+Cfh/pzrH4b8OagLuaGWViyLDGkpluNztKSqIzMWyWXac/wAv/h/4j+O/A3i+18e/D7xHLoOsWOqrqWmX2jEW8thco5ZGhdMNFgngKQOF4OBWV/bWr6vfXGoavqEtxd3Fw011czOWeV2JJdieSSSSSe5rn+ra7k/U4bNs/p0/ZE8YfFj9of8A4KA/EP8AbV8afD6/0n4baT8L7LSPhLq91p0trFrum3M32ybUE+0LGQz/AGeMlW2lUaIHIwx+p7zwF4e+M/hnxVp3ivV7DWfDHjbR1sbcaTOyrJpsluRnzFchnczSsJEx8pjxkjNfzKwf8Fnf+Cjlz8EJv2cT+0Nc2fhWXSLTS7aDTNLtbSa0s7eJIkignhjWSIFI1D4bLfNk/M2fIJ/2mP2nbdbCG4+PXjK9s9Ot/IsbS78TXckMMGAPKRGkwiYAGBgcD0FUqMxSwMpu/Nb07H77XX7PH/BO7/gjP+0J4N+Mnla9pq+Lbi90ZdSvNXluY9MiMMT+Y6A5aMshUkqSPMJ/hFfSP7T/AO1V+xU/7KGveM/iP8adLm8GeKtDudM+1eHdRjmu75J42ieO1CEl5QHPGCF6tgA1/Mlp/wAW28f3ENx4m8ZXkl4sQiCaxfOxRRnCpI5xt5JwxXGT16nrYLcTQq7+JdHEY6KdftCT+ctX7O9rvU7v7NjW5ZTm21u/62P1L8Of8FqpvDnwY0r9lL9gD9lTX7bULLSW07wldX16mo3KeWu9pjbRxN50mzzJWG7AYgkFQVPyH8T/APgr38W/+Gp/hn+1b8fvBmm+MNV8IP8A8S/w5ZS/2dHPGiyqJ3YJLsYzOH4XaTCQFUV82v8AGDwz8N5RqHhzxBNqWuR7vs8WkzyRpGxBU+ZOu045IxH94EjetcjZ+Gdf8Y6xceP/AB9LulJDOxQKsSgALGqjhQAAAoHAA4HAqlCNzqWFoQuoRu3u+uu+p+m3i3/g6v8AjRYvbz+D/wBjvw3ZwPu8y21DxLcXBIyAu0pHGEwoxjBBJzx0r6f+LP7an/BYe7/ZO174x+HfgV8E/C+p2/gGXxJdeFrnxjeXXiTT9LeJ2F8tsFWJSqqzKHc/NGV2lgUr8QfhF4AtfjF+0D4S8BybYbTWfFNhpzl+AiS3CR8k8DAbJr9vf+CgWs+I/hF4A/bO+PXijw5eaVZXPw88P/D/AMB3l7btEl9FNayLN9mLAeYom1IglcjMLDqpxE4RjokeZicPRpVIxjFf00v1PzC+M37Mn/BRb/goD+y14m/4Kqftb/Euxg8M+HtGiXw/Jq5WJtTgFwbfyrK2t12wp55wWkCb2ct83Jr4PaIKohQcqPm61+oPirXtc+Ef/BtVa6Pq+tXlzP8AFD4uraWS3dy0nl2Fo5by4wxOyJZNPbCjABkJ71+YN4jImMHqADjrjk/0rWGzXY3pOTTT6OyOK+LYih8KrArHc9zkAjsFOf5ivLK9P+NoWFIrADBjty5BHduv8hXmFaNWPJxcr12bfgvW10PVoLudmEJcpOFxkoeG/wAfqBXpkMIaURIQQ33Wz19Dn3rx2M7VDV6F8O/EJ1SwGjzy/v7Zf3RPV09Pqv8AL6Vm37xphKlnyPqddJE8wZzKWZVCklskYHB/T9Ki8u4tp/tiJyRh19R/npUttchCXbkkfNkfeBq/Bbi4ADnjGEkx09jVPY9NK4lgft6r5LHp8h71vaJfNaMttqcCsjdSfun/AArIj0meCffYuI5VHKsOH/L+dbuiazbwkWuu2/lsTjLD5T+PT86RvTTubNr4Q8Ja4VdLkW7sOA44H48it3S/g34cl2C48R24BOfmnwv5Yr33Sv8AgmfrGofsZ6X+2kvxQ0vTtK1GPeukTQ3AnOdRaxQIY1fzCXAbgDCnuRivK9f+Edz4PWN9R8YbwbiaCSOMywvFLEVEkciyxo6sCwByOuR1BoUlLY6afsp30JPD/gb4deF4/tUsn2gxngopVSf99hx+FRa9eX/idxDpyLBZocRLGpCL/u5+8ffFQKng/R4DcaleROyjh5ZTJg/jwPxrH1z4kS6kp0/wtBLK5JUy7MIo7YPf6Dj3oudDcYxtsZ/ibWI/CUe2zuSl1GwMbRPhlYdCCO/v/k7/AIz/AGmf2qfjv4attN+P37Q3jTxRpOnN52n6d4h8SXN3bwMBtDqkrkBgpKhsZ561z+n/AA6uRKde8VXGXI3eXLxgfT+Efqaqa7dya2PIsPksovvv083HoPTH+fV2Td2c8o3fM16GXrPjrxpr+h23hvUPFGp3Oj2Ds2laVPfSPb2xYks0cTHam4sSSAM5NcXq+q2sTyXEzgQQIWY44IHJP49vwrd8TX/2aNrS2jIZl2kjqi/4n9M15Z8TPEyxQjQrIjOR55z37L+Hf3x6Un2Rw4ioqMWzJ8Za1Lr2ipd3QHmbZSOc/KXJUfhkj8K4mugv7lrvSWGxVKxdh2Ax/Oufq2eBUlzyuSKMxgflVrSdSl0u7W8t3ZZIzlCjY5qqmSg+bp0FAAL/AOFYt6kXa2PW/DXiC08Q2i3sbbZgCJIwOh7ke3t2/U9Ro90VYRbBhuCD3rw7QtevvDt4l7ZPnGN8TZ2uB2OD+o5HavW/BOv6T43iA0OX/TUBMmnSN++46lP+eg/3eRySoAzV6o9bDYlVNJbnd6fbwzbVVBKBgiNjhh/utWzbabZ3AFu9wjZ/5Z3A2OPUehrjrC/uLeQBizHHQnn/AANdLpPiaGVBBelW4+7IACPz6fnRzanq03F6H6VaT+0/+yn4d/Y6+Fnw98Ia5/a2s+FtS8O3niPwyLk6eJvsokvJkE1zGsOBeLEjbWbcrEgMBXyR+1jBpfxX+Muq+O9D1S5htdc1nVdXW1OpJM0H2vU7qdUdoC6FxE0WcMQK8kg1HSJFWOKaeLnpCWAB/CtSG607ZtbV7oZ5ws7dPp1rNQSdzSnShF3L1n8L/DcGLnUZXk28lpVJJ/Fzj9DV9dY8I+HV8vRLAXNwAVRYU3EH/exgfQYrEkk0IAGeS4uBwT9pZtv64H61SuvGNhYZSw8tWH90bz+nA/EkVpdG94x8i5rEupazCZfElwsFvu+S1iPU+56sfb/9dcj4j8RQQKbaziA2HCgdF9z2J9qZqniPUdZnMNu8hZjtG05cgnGM/wAOSegri/iB4w0vwCr2GoTJLq3zAabEwLQt/wBNSP8AVn/Z/wBZweEyGp77HJXxEIK9zO8eeMIfD1sxMxN5MPlB52epPv04/E9gfJtRunvJ3eeQM5YksDnOffvUmq65d65eSXuoSh3J/Ad8D/Pf8aoMMyDDbVPfGaZ85iK7rS8i9eQNFpHmlyNykBSPasWt+8h8/S2JlVUghwMfxMRmsCmzBokh5+Q/xe9OKFJAAc9wRUafwfU/zqZPvr/u1lf3rCHSBTk/zpsFxNbTieGRkdWDKynBBHTBpbn7h+tRr/qh9KJSYHo/hf8AaI1uwRLLxzo0XiC3QYE00phu0HtOAdx/66LJjtiu/wDDnxM+CnikBV8ez+H5T9628QabJJCnss1uJC/1aNB9K+em/wBWPrQ/Vv8Ae/pRz3d7HVTxlan1ufVNl4dgv2Wbw9458I6hGeVNv4vtI5CP+uUkqyD/AL5rRXwj4rWDLTWKrj7z69b7fz34r5GH+pH+7SN1H1oUo9jqjmUne8fxPq2/0rT9G+fxL8RfB9gn8bP4rtblx/2ygkkk/Dbn2rmvEHxg+BXhqFgvijVPE90jf6jRrNrW1kH/AF3uQJFP/bBga+fW+/8AnUM3Q/Q020uhnPMar2Vj0fxj+0z4v1i2k0fwTp8HhnT3yHXTXY3Uy9P3lwx3nI4Kp5aHuledh3lBZ3wcdTUB++PpT06/hU8zOKdSdR3k7k6Ngc/gM0j5dsAfQUkf3h9afb/e/wCAmrTuQW7uYJpptVxgLliO5rHq/df6p/8Ad/pVCrbuB//Z";
        document.body.appendChild(a);//\u5982\u679c\u662fIE\u8981\u5148\u6dfb\u52a0\u5230DOM
        var result=a.dispatchEvent ? function () {
            var e = document.createEvent("MouseEvents");
            e.initEvent("click", true, true);
            return a.dispatchEvent && a.dispatchEvent(e);
        }() : a.click&&a.click();
        document.body.removeChild(a);
        console.log(result);
        var result = {
            xlsx: function () {

            },
            xls: function () {

            }
        };
        return result;
    };
    return excel;
});
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.factory('formatField',function(){
    return function(field){
        return field === "" ? "_" : field ? '$.' + field : "$";
    };
})
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

yjkj.service("getfile", ["$timeout", "alert", function ($timeout,alert) {
    var input = angular.element("<input type=file multiple style=display:none/>")[0];
    return function (accept, callback,multiple) {
        input.onchange = function () {
            $timeout(function(){});
            if (!window.FormData) {
                alert.warn("\u5f53\u524d\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u6587\u4ef6\u4e0a\u4f20\uff01");
                return;
            }
            callback(multiple?input.files:input.files[0]);
            input.value = "";
            delete input.onchange;
        };
        input.accept=accept;
        if(multiple){
            input.setAttribute('multiple',"");
        }else{
            input.removeAttribute("multiple");
        }
        input.click();
    };
}]);

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.factory('getHashCode',function(){
    var $selectorkey = 1;
    var hashname='__object_hash_key__';
    var getHashCode = function (o) {
        switch (typeof o) {
            case 'object':
                if (o === null) {
                    return 'o:null';
                }
            case 'function':
                if (!o[hashname]) {
                    Object.defineProperty(o,hashname,{
                        value:$selectorkey++
                    });
                }
                return 'o:' + o[hashname];
            default:
                return typeof o + ':' + o;
        }
    };
    window.getHashCode=getHashCode;
    return getHashCode;
});
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.factory('getMatchList', ["pinyin", "$parse", "$timeout", "formatField", "hashMap", function (pinyin, $parse, $timeout, formatField, hashMap) {
    var getReg = function (search, py, pinyin) {
        return new RegExp(Array.prototype.map.apply(search, [function (s) {
                var s_py = py(s);
                if (s_py === s) {//\u53ea\u6709\u62fc\u97f3
                    var l = s.toLowerCase();
                    if (l === s) {
                        return s;
                    } else {
                        return ('[' + s + s.toLowerCase() + ']');
                    }
                }
                return s;//\u53ea\u5339\u914d\u6c49\u5b57
//                var s_pinyin = pinyin(s);
//                if (s_pinyin === s_py) {//\u62fc\u97f3+
//                    return '(' + s + '|' + s_py + ')';
//                }
//                return '(' + s + '|' + s_py + '|' + s_pinyin + ')';//\u5339\u914d\u7b80\u62fc
//                return '(' + s + '|' + s_pinyin + ')';//\u4e0d\u5339\u914d\u7b80\u62fc
            }]).join(''));
    };
    var genTests = function (search) {
        var gen = [function (s) {
                return s;
            }, pinyin.parsePy, pinyin.parsePinyin];
        var regs = [];
        if (typeof search === "function") {
            return [{"exec": search}, gen[0]];
        }
        for (var i in gen) {
            regs.push(getReg(search, pinyin.py, pinyin.pinyin), gen[i]);
        }
        return regs;
    };
    var matching = [];
    var find = function (s) {
        for (var k in matching) {
            if (matching[k].running === s) {
                return k;
            }
        }
    };
    var off = function (sources) {
        var f = find(sources);
        if (f) {
            var run = matching.splice(f, 1)[0];
            delete run.running;
        }
    };
    var on = function (sources, run) {
        off(sources);
        run.running = sources;
        matching.push(run);
    };

    var getMatchList = function (sources, search, field) {
        var r_result, onend, onprocess, array_mode = Array.isArray(sources), b_result;
        if (!search) {
            r_result = sources;
        } else {
            if (array_mode) {
                r_result = [], b_result = [];
            } else {
                r_result = {}, b_result = {};
            }
        }
        var map = {};
        var pop = array_mode ? function (v) {
            b_result.push(v);
        } : function (v, k) {
            b_result[k] = v;
        };
        var push = array_mode ? function (power, v) {
            if (power < 0) {
                return;
            }
            if (!map[power]) {
                map[power] = [];
            }
            map[power].push(v);
        } : function (power, v, k) {
            if (power < 0) {
                return;
            }
            if (!map[power]) {
                map[power] = {};
            }
            map[power][k] = v;
        };
        var isObject = angular.isObject;
        var match = function (field, scope, regs) {
            for (var cx = 0, dx = regs.length; cx < dx; cx += 2) {
                var r = null;
                var test = regs[cx];
                var parser = regs[cx + 1];
                if (isObject(field)) {
                    for (var k in field) {
                        var _result = test.exec(parser($parse(formatField(field[k]))(scope)));
                        if (!(r && r.index < _result.index)) {
                            r = _result;
                        }
                    }
                } else {
                    var _result = test.exec(parser($parse(formatField(field))(scope)));
                    if (!(r && r.index < _result.index)) {
                        r = _result;
                    }
                }
                if (r) {
                    map = result[cx >> 1];
                    return r;
                }
            }
        };
        var get = function (sources, regs, field) {
            for (var k in sources) {
                var v = sources[k];
                var result = match(field, {
                    _: k,
                    $: v
                }, regs);
                if (result) {
                    var power = result.index;
                    push(power, v, k);
                } else {
                    pop(v,k);
                }
            }
        };

        var regs = genTests(search);
        var result = [{}, {}, {}, {}];
        var keeys = Object.keys(sources);
        var run = function (source_index) {
            var progress_size = 100;
            if (!run.running || !keeys.length) {
                //\u8fdb\u7a0b\u5df2\u6b7b\uff0c\u88ab\u65b0\u7684\u4efb\u52a1\u66ff\u4ee3
                return;
            }
            pro();
            //\u524d\u4e00\u4e2a\u53c2\u6570\u662f\u5df2\u68c0\u67e5\u4e3a\u5339\u914d\u9879\u7684\uff0c\u540e\u4e00\u4e2a\u53c2\u6570\u662f\u5df2\u68c0\u67e5\u4e3a\u4e0d\u5339\u914d\u9879\u7684
            if(onprocess && onprocess(r_result, b_result)===false){
                return;
            }
            if (source_index >= sources.length) {
                onend && onend(sources);
                return;
            }

            var _sources;
            if (array_mode) {
                _sources = sources.slice(source_index, source_index + progress_size);
            } else {
                _sources = {};
                for (var cx = source_index, dx = Math.min(keeys.length, source_index + progress_size); cx < dx; cx++) {
                    var key = keeys[cx];
                    _sources[key] = sources[key];
                }
            }
            get(_sources, regs, field);
            $timeout(function () {
                run(source_index + progress_size);
            }, 0);
        };
        var end = function () {

            var _result = {};
            result.forEach(function (o) {
                for (var k in o) {
                    var v = _result[k];
                    if (v) {
                        v.push.apply(o[k]);
                    } else {
                        _result[k] = o[k];
                    }
                }
            });
            var results = Object.keys(_result).sort(function (a, b) {
                return  a - b;
            }).map(function (k) {
                return _result[k];
            });
            if (Array.isArray(r_result)) {
                results.forEach(function (o) {
                    r_result.push.apply(r_result, o);
                });
            } else {
                results.forEach(function (o) {
                    angular.extend(r_result, o);
                });
            }
        };
        //\u8fdb\u7a0b\u4e2d
        r_result.$onprocess = function (on) {
            onprocess = on;
            return r_result;
        };
        //\u7ed3\u675f\u540e
        r_result.$onend = function (on) {
            onend = on;
            return r_result;
        };
        //\u521d\u59cb\u503c
        r_result.$init = function (items) {
            var map = hashMap();
            if (array_mode) {
                items && items.forEach && items.forEach(function (item) {
                    map(item, true);
                });
                sources.forEach(function (source) {
                    map(source, true);
                });
                sources = map.keys();
            } else {
                for (var k in items) {
                    var v = items[k];
                    map(v, k);
                }
                for (var k in sources) {
                    map(v, k);
                }
                sources = {};
                map.keys().forEach(function (v) {
                    sources[map(v)] = v;
                });
            }
            run(0, 0);
            return r_result;
        };
        var init = function () {
            if (!r_result.$init) {
                return;
            }
            delete r_result.$onprocess;
            delete r_result.$onend;
            delete r_result.$init;
            if (!find(sources)) {
                return;
            }
            if (r_result === sources) {
                onend && onend(r_result);
            } else {
                run(0, 0);
            }
        };
        $timeout(init, 0);
        var pro = function () {
            if (array_mode) {
                r_result.splice(0);
            } else {
                for (var i in r_result) {
                    delete r_result[i];
                }
            }
            end();
        };
        on(sources, run);
        return r_result;
    };

    return getMatchList;
}]);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.factory('getMatchPower',["pinyin", function(pinyin){
    
    //\u6c42\u4e24\u4e2a\u5b57\u7b26\u4e32\u7684\u6700\u957f\u516c\u5171\u5b50\u4e32
    var couple = function (str1, str2) {
        var len1 = str1.length;
        var len2 = str2.length;
        var match = "", begin1 = len1, begin2 = len2;
        for (var cx = -len1, dx = len2; cx < dx; cx++) {
            var c1 = cx >= 0 ? 0 : -cx;
            var c2 = cx >= 0 ? cx : 0;
            var d1 = len1 - c1;
            var d2 = len2 - c2;
            var start = 0, end = 0;
            for (var ct = 0, dt = d1 > d2 ? d2 : d1; ct < dt; ct++) {
                if (str1[c1 + ct] === str2[c2 + ct]) {
                    end = ct + 1;
                    if (end === dt && end - start > match.length) {
                        match = str1.slice(c1 + start, c1 + end);
                        begin1 = c1 + start;
                        begin2 = c2 + start;
                    }
                } else {
                    if (end - start > match.length) {
                        match = str1.slice(c1 + start, c1 + end);
                        begin1 = c1 + start;
                        begin2 = c2 + start;
                    }
                    start = ct + 1;
                }
            }
        }
        return [match, begin1, begin2];
    };

    //\u5339\u914d\u5f3a\u5ea6
    var getMatchPower = function (text, value) {
        text = text || "";
        value = value || "";
        var match1 = couple(text, value);
        var match2 = couple(pinyin.parsePy(text), pinyin.parsePy(value.toLowerCase()));
        var match3 = couple(pinyin.parsePinyin(text), pinyin.parsePinyin(value.toLowerCase()));
        
        return [
            match1[0].length * match1[0].length * 100 + match2[0].length * match2[0].length * 20 + match3[0].length * match3[0].length,
            Math.min(match1[1], match2[1], match3[1]),
            Math.min(match1[2], match2[2], match3[2])
        ];
    };
    return getMatchPower;
}]);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.factory("getParentByClass",function(){
    return function(e,className){
        while(e){
            if(e.className){
                
            }
        }
    };
});
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.factory('getRootElementInPopup',function(){
    //return whether if dst belong to src; 
    return function(dst){
        while (dst.parentNode){
            if(dst.hasAttribute("ispopup")){
                return dst;
            }
            dst=dst.parentNode;
        };
        return false;
    };
});
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.factory("getScreenPosition", function () {
    //\u5143\u7d20\u76f8\u5bf9\u4e8e\u7a97\u53e3\u7684\u5750\u6807
    var getScreenPosition = function (elem) {
        var top = elem.offsetTop;
        var left = elem.offsetLeft;
        var tmp=elem;
        while (elem.offsetParent !== null) {
            elem = elem.offsetParent;
            top = top + elem.offsetTop;
            left = left + elem.offsetLeft;
        }
        while(tmp.parentNode){
            top=top-tmp.scrollTop;
            left=left-tmp.scrollLeft;
            tmp=tmp.parentNode;
        }
        return {top: top, left: left};
    };
    return getScreenPosition;
});
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.factory("getScrollPage", ["$parse", function ($parse) {
    /**
     * 
     * @param {type} pageSize \u9875\u9762\u5927\u5c0f
     * @param {type} api \u5c01\u88c5\u597d\u7684\u8bf7\u6c42\u63a5\u53e3\u7684\u4e00\u4e2a\u51fd\u6570\uff0c\u6b64\u51fd\u6570\u5e94\u5904\u7406\u4e24\u4e2a\u53c2\u6570api(params,callback);
     * @param {type} src \u8bf7\u6c42\u5b8c\u6570\u636e\u5b58\u653e\u7684\u4f4d\u7f6e
     * @param {type} pageSizeName \u9875\u9762\u5927\u5c0f\u7684\u5b57\u6bb5\u540d
     * @param {type} pageNoName \u5f53\u524d\u9875\u9762\u7684\u5b57\u6bb5\u540d
     * @returns {undefined}
     */
    var scroll = function (src, api, pageSize, pageSizeName, pageNoName) {
        pageSize = pageSize || 5;
        pageSizeName = pageSizeName || "pageSize";
        pageNoName = pageNoName || "pageNo";
        var resultSrcPath = "pageInfo.rows";
        var totalCountPath = "pageInfo.totalPages";
        var filter = null;//\u9644\u52a0\u53c2\u6570;
        src = src || [];
        var currentPage = 0, totalCount = 0, pageCount = 0;
        var skipLength = 0;
        var result = function (index) {
            var delta = (pageSize + 1) >> 1;
            var endIndex = Math.min(index + delta, Math.max(1, totalCount));
            currentPage = parseInt((index - 1) / pageSize);
            if (!src[index]) {
                getpage(currentPage);
            } else if (!src[endIndex]) {
                getpage(currentPage + 1, filter);
            }
        };
        result.totalCountPath = function (path) {
            totalCountPath = path;
        };
        result.resultSrcPath = function (path) {
            resultSrcPath = path;
        };
        var getpage = function (pageno,callback) {
            var param = filter || {};
            param[pageSizeName] = pageSize;
            param[pageNoName] = pageno;
            api(param, function (result) {
                totalCount = $parse(totalCountPath)(result);
                var rows = $parse(resultSrcPath)(result);
                var rowStart = pageSize * (pageno - 1) - skipLength;
                if (pageno === 1) {
                    src.splice(0);
                }
                for (var cx = 0, dx = rows.length; cx < dx; cx++) {
                    src[cx - rowStart] = rows[cx];
                }
                result.pageCount = totalCount / pageSize;
                result.totalCount = totalCount;
                callback(rows);
            });
        };
        result.refresh = function (_filter,callback) {
            if (arguments.length) {
                filter = _filter;
            }
            getpage(1,callback);
        };
        result.src = function (_src) {
            src = _src || src;
            return src;
        };
        return result;
    };
    window.scroll = scroll;
    return scroll;
}]);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.factory('hashMap', ["getHashCode", function (getHashCode) {
    return function () {
        var values = {}, keys = {};
        var result = function (oKey, oValue) {
            if (arguments.length === 1) {
                return result.get(oKey);
            }
            result.set(oKey, oValue);
        };
        result.drop = function (oKey) {
            result.size--;
            delete keys[getHashCode(oKey)];
            delete values[getHashCode(oKey)];
        };
        result.get = function (oKey) {
            return values[getHashCode(oKey)];
        };
        result.set = function (oKey, oValue) {
            var key = getHashCode(oKey);
            if (!values.hasOwnProperty(key)) {
                result.size++;
            }
            keys[key] = oKey;
            values[key] = oValue;
        };
        result.keys = function () {
            var ks = Object.keys(keys).map(function (k) {
                return keys[k];
            });
//            var ks = [];
//            for (var k in keys) {
//                ks.push(keys[k]);
//            }
            return ks;
        };
        result.values = function () {
            var vs = Object.keys(values).map(function (k) {
                return values[k];
            });
//            var vs = [];
//            for (var k in values) {
//                vs.push(values[k]);
//            }
            return vs;
        };
        result.clear=function(){
            values={};
            keys={};
            result.size=0;
        };
        result.size = 0;
        return result;
    };
}]);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.factory('isChildElement',function(){
    //return whether if dst belong to src; 
    return function(dst,src){
        while (dst.parentNode){
            dst=dst.parentNode;
            if(dst===src){
                return true;
            }
        };
        return false;
    };
});
/* 
 * \u4e0d\u679d\u96c0
 * 2017-3-11 2:01:52
 */


yjkj.factory("isie",function(){
  return function(userAgent){
      userAgent=userAgent||navigator.userAgent;
      return !/Safari/.test(userAgent)||/Edge/.test(userAgent);
  };
});
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.factory('pickArgs',function(){
    var pick=function(args){
        var typeofs={},toStrings={};
        var res= function(name,object){
            
        };
        res.obj=function(){
            
        };
        res.str=function(){
            
        };
        res.num=function(){
            
        };
        res.arr=function(){
            
        };
        res.dom=function(){
            
        };
        res.ele=function(){
            
        };
        res.event=function(){
            
        };
        return res;
    };
});
/**
 * \u8c03\u7528\u65b9\u5f0f
 * @example 
 * var pop=popup("/path/name",{keys:values});
 * pop.onclose(function(){})
 * pop.close();
 * \u5728pop\u7684$scope\u4e2d
 * \u53ef\u4ee5\u8bbe\u7f6e\u5f53\u524d\u7a97\u53e3\u7684\u6807\u9898
 * $scope.title=[\u6807\u9898]
 * $scope.$closeView()\uff0c\u5173\u95ed\u5f53\u524d\u7a97\u53e3
 * $closeView\u53ef\u4ee5\u4f20\u9012\u53c2\u6570\u7ed9\u7236\u7a97\u53e3\u4e2d\u76d1\u542conclose\u7684\u51fd\u6570
 * $scope\u4e0d\u53ef\u4ee5\u76f4\u63a5\u64cd\u4f5c\u7236\u7a97\u53e3\u4e2d\u7684\u6570\u636e
 */
yjkj.factory('popup', ["$animate", "zIndex", "$compile", "$rootScope", "$window", "$document", "back", "$timeout", function ($animate, zIndex, $compile, $rootScope, $window, $document, back, $timeout) {
    //\u5148\u53ea\u652f\u6301\u4e00\u79cd\u5f39\u5b50\u7a97\u65b9\u5f0f\uff0c
    //\u4ece\u6307\u5b9a\u8def\u5f84\u52a0\u8f7d\u7a97\u53e3\u5185\u5bb9
    var EscListeners = [];
    var find = function (esc) {
        for (var k in EscListeners) {
            if (esc === EscListeners[k]) {
                return k;
            }
        }
    };
    EscListeners.pipe = function (doSomeThing) {
        var esc = function () {
            if (doSomeThing.apply(null, Array.prototype.slice.apply(arguments, [0])) === false) {
                return false;
            }
            var index = find(esc);
            if (index >= 0) {
                EscListeners.splice(index, 1);
            }
        };
        EscListeners.push(esc);
        return esc;
    };
    $document.on('keydown', function (e) {
        if (e.which === 27) {
            if (EscListeners.length) {
                EscListeners[EscListeners.length - 1]();
            }
        }
    });
    /**
     * \u5f39\u51fa\u5b50\u7a97\u53e3\u7684\u51fd\u6570
     * @param {type} path \u7a97\u53e3\u8def\u5f84\u7684\u552f\u4e00\u7d22\u5f15
     * @param {type} parameters \u7ed9\u7a97\u53e3\u7684\u4f5c\u57df\u9884\u5148\u8d4b\u503c
     * @param {type} style \u81ea\u5b9a\u4e49\u6837\u5f0f\uff0c\u4e3b\u8981\u662fwidth,height\u7b49\u4f4d\u7f6e\u53c2\u6570
     * @returns {popupL#14.popup.result} \u7ed9\u8c03\u7528\u5f39\u7a97\u7684\u547d\u4ee4\u66b4\u9732\u7684\u53ef\u9009\u65b9\u6cd5
     */
    var popup = function (path, parameters, style) {
        var viewsPath = "views";
        if (path.indexOf(".") >= 0) {
            path = path.replace(/\./g, '');
            viewsPath = "builtin";
        }

        /**
         * mask\u662f\u534a\u900f\u660e\u7684\u906e\u7f69\u5c42
         * @type Element
         */
        var mask = angular.element(document.createElement("div"));
        mask.css({
            "z-index": zIndex()
        });
        mask.addClass("popup-factory");
        //\u5982\u679c\u4e0d\u6307\u5b9a\u8def\u5f84\uff0c\u5219\u76f4\u63a5\u5173\u95ed\u5f53\u524d\u5f39\u7a97
        if (!path) {
            return $animate.leave(mask);
        }
        var position = {
            width: 400,
            height: 300
        };
        angular.extend(position, style);
        position.left = angular.isNumber(position.left) ? position.left : "calc(50% - " + (parseInt(position.width) / 2).toFixed(0) + 'px)';
        position.top = angular.isNumber(position.top) ? position.top : "calc(50% - " + (parseInt(position.height) / 2).toFixed(0) + 'px)';

        var controllerName = path.replace(/\/[A-Za-z]/g, function (match, cx) {
            return cx === 0 ? match[1] : match[1].toUpperCase();
        });
        var templateUrl = viewsPath + path.replace(/[A-Z]/g, function (match) {
            return match.toLowerCase();
        }) + '.html';
        var view = angular.element(mask).html("<view-content ispopup ng-view='" + path + "'></viewcontent>");

        var newScope = $rootScope.$new();
        var $Calc = function (a) {
            if (angular.isNumber(a)) {
                return a + 'px';
            } else {
                return a;
            }
        };
        newScope.$GenViewStyle = function () {
            var style = newScope.$ViewStyle;
            var result = {};
            for (var k in style) {
                result[k] = $Calc(style[k]);
            }
            return result;
        };
        newScope.$ViewStyle = newScope.$ViewStyle || {};
        angular.extend(newScope, parameters);
        var _onclose;
        var $closeView = back.pipe(EscListeners.pipe(function (call) {
            if (angular.isFunction(call) && call($closeView) === false) {
                return false;
            }
            if (angular.isFunction(_onclose)) {
                if (_onclose.apply(null, Array.prototype.slice.apply(arguments, [0])) === false) {
                    return false;
                }
            }
            view.addClass("ng-leave");
            $animate.leave(mask).then(function () {
                newScope.$destroy();
            });
            input && input.focus();
        }));
        newScope.$CloseView = $closeView;
        $compile(view)(newScope);
        view.addClass("ng-enter");

        var viewWindow = angular.element(view.children()[0]);

        //\u5728safari5.x\u4e2dcalc\u4e0d\u88ab\u652f\u6301\uff0c\u4ee5\u4e0b\u4e24\u884c\u505a\u517c\u5bb9
        viewWindow[0].style.left = (($window.innerWidth - parseInt(position.width)) / 2).toFixed(0) + 'px';
        viewWindow[0].style.top = (($window.innerHeight - parseInt(position.height)) / 2).toFixed(0) + 'px';

        angular.forEach(position, function (value, key) {
            viewWindow[0].style[key] = angular.isNumber(value) ? value + 'px' : value;
        });
        var input = document.activeElement;

        $timeout(function () {
            $animate.enter(view, document.body, null).then(function () {
                view.removeClass("ng-enter");
            });
        }, 0);

        /**
         * \u5904\u7406\u62d6\u52a8
         */
        var saved_position;
        view.on('mousedown', function (event) {
            $document.on("mousemove", onmousemove);
            $document.on('mouseup', onmouseup);

            var viewTitle = viewWindow.children()[0];
            if (event.target !== viewTitle && event.target.parentNode !== viewTitle) {
                return;
            }
            if (newScope.$ViewDragable === false) {
                return;
            }
            saved_position = {
                x: event.clientX,
                y: event.clientY
            };
        });
        var onmousemove = function (event) {
            if (!saved_position) {
                return;
            }
            var v = viewWindow[0];
            var deltaX = event.clientX - saved_position.x;
            var deltaY = event.clientY - saved_position.y;
            saved_position.x = event.clientX;
            saved_position.y = event.clientY;
            v.style.left = v.style.left.replace(/[\+\s\-\d\.]+px/g, function (match) {
                var left = deltaX + parseInt(match.replace(/\s/g, ""));
                if (/[\+\-]+\s+/.test(match)) {
                    return left >= 0 ? (" + " + left + "px") : (" - " + (-left) + "px");
                }
                return left + "px";
            });
            v.style.top = v.style.top.replace(/[\+\s\-\d\.]+px/g, function (match) {
                var top = deltaY + parseInt(match.replace(/\s/g, ""));
                if (/[\+\-]+\s+/.test(match)) {
                    return top >= 0 ? (" + " + top + "px") : (" - " + (-top) + "px");
                }
                return top + "px";
            });
        };
        var onmouseup = function () {
            saved_position = null;
            $document.off('onmouseup', onmouseup);
            $document.off('onmousemove', onmousemove);
        };
        var result = {
            close: $closeView,
            element: view,
            data: function (data) {
                angular.extend(newScope, data);
            },
            css: function (css) {
                view.css(css);
                return result;
            },
            nobackground: function () {
                view.addClass("no-background");
                return result;
            },
            solid: function () {
                viewWindow.addClass("title-solid");
                viewWindow.addClass("option-solid");
                return result;
            },
            onclose: function (callback) {
                _onclose = callback;
                return result;
            },
            addClass: function (className) {
                viewWindow.addClass(className);
                return result;
            },
            right: function () {
                view.addClass('popup-right');
                return result;
            }
        };
        return result;
    };
    window["popup"] = popup;
    return popup;
}]);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.factory('require', ["$templateCache", "$register", "$http", "$timeout", "storage", function ($templateCache, $register, $http, $timeout, storage) {
    var versions = {}, menus = {};
    var doPageVersionResult=function (result) {
        for (var k in result) {
            var v = result[k];
            var tmp = menus;
            versions['/' + k] = result[k];
            k.split('/').forEach(function (i, cx, arr) {
                if (!tmp[i]) {
                    tmp[i] = {};
                }
                cx + 1 === arr.length && (tmp[i] = k + '?' + v);
                tmp = tmp[i];
            });
        }
    };
    var doVersionResult=function(result){
        for(var k in result){
            versions['/'+k]=result[k];
        }
    };
    $http.get('views/version.json?' + Date.now()).success(doPageVersionResult);
    $http.get('version.json?'+Date.now()).success(doVersionResult);
    var require_js=function(path){
        var result={
            
        };
        return result;
    };
    var require = function (path) {
        if(path.slice(path.length-3)===".js"){
            return require_js(path);
        }
        var _flush, _json;
        var viewsPath = "views";
        if (path[0] !== '/') {
            path = '/' + path;
        }
        if (path.indexOf('?') >= 0) {
            var tmp = path.indexOf('?');
            var version = path.slice(tmp + 1);
            path = path.slice(0, tmp);
        } else {
            var version = versions[path];
        }
        if (path[1] && path[1].toLowerCase() !== path[1]) {
            viewsPath = "builtin";
        }
        var controllerName = path.replace(/\/[A-Za-z]/g, function (match, cx) {
            return cx === 0 ? match[1] : match[1].toUpperCase();
        });
        var templateUrl = viewsPath + path.replace(/[A-Z]/g, function (match) {
            return match.toLowerCase();
        });
        var templateJson = templateUrl + '.json';
        var templateUrl = templateUrl + '.html';
        $timeout(function () {
            if ($templateCache.get(templateUrl) && $register.has(controllerName)) {
                _flush && _flush($templateCache.get(templateUrl), controllerName);
                _json && _json(storage.get(templateJson, version), version);
            } else {
                var json = storage.get(templateJson, version);
                var call = function (o) {
                    $templateCache.put(templateUrl, o.template);
                    try {
                        $register.controller(controllerName, eval('(' + o.controller + ')'));
                    } catch (e) {
                        console.log(o.controller);
                    }
                    _flush && _flush($templateCache.get(templateUrl), controllerName);
                };
                json ? call(json) : $http.get(templateJson + (version ? '?' + version : '?' + Date.now())).success(function (o) {
                    storage.set(templateJson, o, version);
                    call(o);
                }).error(function () {
                    _flush && _flush('404');
                });
            }
        }, 0);
        var result = function (flush) {
            _flush = flush;
        };
        result.json = function (call) {
            _json = call;
        };
        return result;
    };
    require.menu = menus;
    require.versions = versions;
    return require;
}]);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

yjkj.factory("splitElements", ["getScreenPosition", function (getScreenPosition) {
    var element = angular.element;
    var splitY = function (cols, index, width) {
        var e;
        if (index === 0) {
            e = element(cols[index]);
            e.css({marginLeft: width + 'px', boxShadow: "-4px 0 4px rgba(0,0,0,0.1)"});
        } else if (index === cols.length) {
            element(cols[index - 1]).css({marginRight: width + 'px', boxShadow: "4px 0 4px rgba(0,0,0,0.1)"});
        } else {
            e = element(cols[index]);
            element(cols[index - 1]).css({marginRight: width / 2 + 'px', boxShadow: "4px 0 4px rgba(0,0,0,0.1)"});
            e.css({marginLeft: width / 2 + 'px', boxShadow: "-4px 0 4px rgba(0,0,0,0.1)"});
        }
        return e;
    };
    var splitX = function (cols, index, height) {
        var e;
        if (index === 0) {
            e = element(cols[index]);
            e.css({marginTop: height + 'px', boxShadow: "0 -4px 4px rgba(0,0,0,0.1)"});
        } else if (index === cols.length) {
            element(cols[index - 1]).css({marginBottom: height + 'px', boxShadow: "0 4px 4px rgba(0,0,0,0.1)"});
        } else {
            e = element(cols[index]);
            element(cols[index - 1]).css({marginBottom: height / 2 + 'px', boxShadow: "0 4px 4px rgba(0,0,0,0.1)"});
            e.css({marginTop: height / 2 + 'px', boxShadow: "0 -4px 4px rgba(0,0,0,0.1)"});
        }
        return e;
    };
    var reshape = function (split, elem) {
        var Width, Left, left, offset = 'offset';
        if (split === splitX) {
            Width = 'Height';
            Left = 'Top';
            left = 'top';
        } else {
            Width = 'Width';
            Left = 'Left';
            left = 'left';
        }
        return function (target, _center, isstop) {
            var cols = elem.children();
            var overindex = -1, spliter = -1;
            _center = _center || target && (target[offset + Width] / 2 + getScreenPosition(target)[left]);
            var cs = Array.prototype.filter.apply(cols, [function (col, cx) {
                    var available = col === target;
                    var e = element(col);
                    if (available) {
                        spliter = cx;
                        e.css({boxShadow: "0 0 5px rgba(0,0,0,0.5)"});
                    } else {
                        if (getScreenPosition(col)[left] + col[offset + Width] / 2 < _center) {
                            overindex = cx;
                        }
                        e.css({margin: "", boxShadow: ""});
                    }
                    return !available;
                }]);

            /**
             * \u5982\u679c\u5f53\u524d\u4f4d\u7f6e\u521a\u597d\u662f\u539f\u4f4d\u7f6e
             * \u90a3\u4e48\u4f4d\u7f6e\u5bbd\u5ea6\u4e3a\u6b63\u5728\u62d6\u52a8\u7684\u5143\u7d20\u7684\u5bbd\u5ea6
             * \u5982\u662f\u5f53\u524d\u4f4d\u7f6e\u4e0d\u662f\u539f\u4f4d\u7f6e
             * \u90a3\u4e48\u4f4d\u7f6e\u5bbd\u5ea6\u662f10
             * \u539f\u4f4d\u7f6e\u7684\u5bbd\u5ea6\u4e3a\u6b63\u5728\u62d6\u52a8\u7684\u5143\u7d20\u7684\u5bbd\u5ea6-10
             */
            if (target) {
                var width = target[offset + Width];
                width < 40 && (width = 40);
                var finalIndex = overindex < spliter ? overindex + 1 : overindex;
                if (finalIndex === spliter) {
                    split(cs, finalIndex, isstop ? width : 20);
                } else {
                    split(cs, finalIndex, isstop ? width - 10 : 10);
                    split(cs, spliter, isstop ? 10 : 20);
                }
                return [finalIndex, spliter, (getScreenPosition(target)[left] + width < getScreenPosition(elem[0])[left] || getScreenPosition(target)[left] > getScreenPosition(elem[0])[left] + elem[0][offset + Width])];
            }
        };
    };
    return function (elem) {
        var cols = elem.children();
        if (!(cols && cols[1] && cols[0])) {
            return angular.noop;
        }
        if (cols[1].offsetLeft > cols[0].offsetLeft) {
            return reshape(splitY, elem);
        } else if (cols[1].offsetTop > cols[0].offsetTop) {
            return reshape(splitX, elem);
        } else {
            return angular.noop;
        }
    };
}]);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.service('storage', ["$window", "$location", function ($window, $location) {
    var Storage = function () {
        var storage = {
            __proto__: {
                getItem: function (k) {
                    return storage[k];
                },
                setItem: function (k, v) {
                    return storage[k] = v;
                },
                removeItem: function (k) {
                    return delete storage[k];
                },
                clean: function () {
                    for (var k in storage) {
                        delete storage[k];
                    }
                }
            }
        };
        return storage;
    };
    var localStorage = $window.localStorage || Storage();
    var sessionStorage = $window.sessionStorage || Storage();
//    var stringifyFunction=function(keey,object,usekey){
//        return ((object&&typeof object==="object")?object:typeof object==='function'?object.toString():String(object));
//    };
//    var parseFunction=function(k,v){
//        if(v&&v.slice(0,8)==="function"){
//            return eval(v);
//        }
//        return v;
//    };
//    console.log(JSON.parse(JSON.stringify({
//        a:{
//            a:'wq',
//            c:{c:{}},
//            b:function(){
//                console.log("q","b");
//            }
//        }
//    },stringifyFunction),parseFunction));
    var prefix = location.pathname;
    var storage = {
        prefix: function (k) {
            prefix = k;
        },
        set: function (k, v, version) {
            k = prefix + k;
            var storage = arguments.length === 3 ? localStorage : sessionStorage;
            if (v === null) {
                storage.removeItem(k);
            } else {

                if (storage === localStorage) {
                    if (!version) {
                        return;
                    }
                    version = String(version);
                    storage.setItem(k, version + JSON.stringify(v));
                } else {
                    storage.setItem(k, JSON.stringify(v));
                }
            }
        },
        get: function (k, version) {
            k = prefix + k;
            var storage = arguments.length === 2 ? localStorage : sessionStorage;
            if (storage === localStorage) {
                if (!version) {
                    return;
                }
                version = String(version);
                var data = storage.getItem(k);
                if (data && data.slice(0, version.length) === version) {
                    return JSON.parse(data.slice(version.length) || "{}");
                }
            } else {
                return JSON.parse(storage.getItem(k) || "{}");
            }
        },
        session: sessionStorage,
        local: localStorage
    };
    window.storage = storage;
    return storage;

}]);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.factory("tipBox", function () {
//    template,$event,target,position,template
    var tip = function (template) {
        console.log(template);
        var args=[].slice.apply(arguments,[0]);
        args.forEach(function(arg){
            console.log({}.toString.call(arg));
        });
        return args;
    };
    window.tipBox = tip;
    return tip;
    console.log(tip);
});
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

yjkj.filter("age",function(){
    return function(date_str){
        var dateNow=new Date();
        var dateBirth=new Date(date_str);
        dateNow.setFullYear(dateBirth.getFullYear());
        if(dateNow<dateBirth){
            return new Date().getFullYear()-dateBirth.getFullYear()+1;
        }else{
            return new Date().getFullYear()-dateBirth.getFullYear();
        }
    };
});
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.filter('gender',function(){
    return function(is_man){
        return is_man?"\u7537":'\u5973';
    };
});
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.filter('money', function () {
    return function (number) {
        return parseFloat(number).toFixed(2) || number;
    };
});
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.filter('number',function(){
    return function(number,dicimal){
        return parseFloat(number).toFixed(dicimal)||number;
    };
});
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.filter('prefixUrl',function(){
    var baseUrl='http://www.x6pt.cn/';
    return function(uri){
        return baseUrl+uri;
    };
});
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.filter("random", ["$http", function ($http) {
    var source = {
        color: [
            function () {
                return "\u9e28\u8272 #f7acbc \u8d64\u767d\u6a61 #deab8a \u6cb9\u8272 #817936 \u7ec0\u6854\u6897 #444693 \u8e2f\u8e85\u8272 #ef5b9c \u808c\u8272 #fedcbd \u4f3d\u7f57\u8272 #7f7522 \u82b1\u8272 #2b4490 \u685c\u8272 #feeeed \u6a59\u8272 #f47920 \u9752\u4e39 #80752c \u7460\u7483\u8272 #2a5caa \u8537\u8587\u8272 #f05b72 \u7070\u8336 #905a3d \u83ba\u8272 #87843b \u7409\u7483\u7ec0 #224b8f \u97e9\u7ea2 #f15b6c \u8336\u8272 #8f4b2e \u5229\u4e45\u8272 #726930 \u7ec0\u8272 #003a6c \u73ca\u745a\u8272 #f8aba6 \u6866\u8336\u8272 #87481f \u5a9a\u8336 #454926 \u9752\u84dd #102b6a \u7ea2\u6885\u8272 #f69c9f \u67af\u8336 #5f3c23 \u84dd\u6d77\u677e\u8336 #2e3a1f \u675c\u82e5\u8272 #426ab3 \u6843\u8272 #f58f98 \u7126\u8336 #6b473c \u9752\u949d #4d4f36 \u80dc\u8272 #46485f \u8584\u67ff #ca8687 \u67d1\u5b50\u8272 #faa755 \u62b9\u8336\u8272 #b7ba6b \u7fa4\u9752\u8272 #4e72b8 \u8584\u7ea2\u6885 #f391a9 \u674f\u8272 #fab27b \u9ec4\u7dd1 #b2d235 \u94c1\u7ec0 #181d4b \u66d9\u8272 #bd6758 \u871c\u67d1\u8272 #f58220 \u82d4\u8272 #5c7a29 \u84dd\u94c1 #1a2933 \u7ea2\u8272 #d71345 \u8910\u8272 #843900 \u82e5\u8349\u8272 #bed742 \u9752\u8910 #121a2a \u8d64\u4e39 #d64f44 \u8def\u8003\u8336 #905d1d \u82e5\u7dd1 #7fb80e \u8910\u8fd4 #0c212b \u7ea2\u8d64 #d93a49 \u9974\u8272 #8a5d19 \u840c\u9ec4 #a3cf62 \u85e4\u7eb3\u6238 #6a6da9 \u81d9\u8102\u8272 #b3424a \u4e01\u5b50\u8272 #8c531b \u82d7\u8272 #769149 \u6854\u6897\u8272 #585eaa \u771f\u8d6d #c76968 \u4e01\u5b50\u8336 #826858 \u8349\u8272 #6d8346 \u7ec0\u84dd #494e8f \u4eca\u69d8\u8272 #bb505d \u9ec4\u680c #64492b \u67f3\u8272 #78a355 \u85e4\u8272 #afb4db \u6885\u67d3 #987165 \u571f\u5668\u8272 #ae6642 \u82e5\u8349\u8272 #abc88b \u85e4\u7d2b #9b95c9 \u9000\u7ea2\u8272 #ac6767 \u9ec4\u67af\u8336 #56452d \u677e\u53f6\u8272 #74905d \u9752\u7d2b #6950a1 \u82cf\u82b3 #973c3f \u72d0\u8272 #96582a \u767d\u7dd1 #cde6c7 \u83eb\u8272 #6f60aa \u831c\u8272 #b22c46 \u9ec4\u6a61 #705628 \u8584\u7dd1 #1d953f \u9e20\u7fbd\u8272 #867892 \u7ea2 #a7324a \u94f6\u7164\u7af9 #4a3113 \u5343\u8349\u8272 #77ac98 \u8584\u8272 #918597 \u94f6\u6731 #aa363d \u6d85\u8272 #412f1f \u9752\u7dd1 #007d65 \u8584\u9f20 #6f6d85 \u8d64 #ed1941 \u80e1\u6843\u8272 #845538 \u6d45\u7dd1 #84bf96 \u9e20\u7fbd\u9f20 #594c6d \u6731\u8272 #f26522 \u9999\u8272 #8e7437 \u7dd1 #45b97c \u83d6\u84b2\u8272 #694d9f \u6d17\u6731 #d2553d \u56fd\u9632\u8272 #69541b \u8349\u8272 #225a1f \u6c5f\u6238\u7d2b #6f599c \u7ea2\u6866\u8272 #b4534b \u7ec3\u8272 #d5c59f \u6728\u8d3c\u8272 #367459 \u7d2b #8552a1 \u7ea2\u7eef #ef4136 \u8089\u8272 #cd9a5b \u5e38\u76d8\u8272 #007947 \u706d\u7d2b #543044 \u6866\u8272 #c63c26 \u4eba\u8272 #cd9a5b \u7dd1\u9752\u8272 #40835e \u8461\u8404\u9f20 #63434f \u94c5\u4e39\u8272 #f3715c \u571f\u8272 #b36d41 \u5343\u6b73\u7dd1 #2b6447 \u53e4\u4ee3\u7d2b #7d5886 \u8d6d #a7573b \u5c0f\u9ea6\u8272 #df9464 \u6df1\u7dd1 #005831 \u6697\u7ea2 #401c44 \u7eef\u8272 #aa2116 \u7425\u73c0\u8272 #b76f40 \u840c\u8471\u8272 #006c54 \u8461\u8404 #472d56 \u4e39 #b64533 \u6728\u5170\u8272 #ad8b3d \u9752\u767d\u6a61 #375830 \u8304\u5b50\u7ec0 #45224a \u571f #b54334 \u6800\u5b50\u8272 #dea32c \u9769\u8272 #274d3d \u7d2b\u7ec0 #411445 \u7126\u9999 #853f04 \u673d\u53f6 #d1923f \u9eb9\u5c18 #375830 \u6d53\u8272 #4b2f3d \u771f\u7ea2 #840228 \u8431\u8349\u8272 #c88400 \u4ed9\u658e\u8336 #27342b \u4e8c\u84dd #402e4c \u7eef #7a1723 \u9ec4\u91d1 #c37e00 \u82e5\u7af9\u8272 #65c294 \u83d6\u84b2\u8272 #c77eb5 \u7ea2\u6d77\u8001\u8336 #a03939 \u91d1\u8272 #c37e00 \u9752\u78c1\u8272 #73b9a2 \u7261\u4e39\u8272 #ea66a6 \u6d45\u82cf\u82b3 #8a2e3b \u91d1\u8336 #e0861a \u9752\u7af9\u8272 #72baa7 \u8d64\u7d2b #f173ac \u9e22\u8272 #8e453f \u5375\u8272 #ffce7b \u94c1\u8272 #005344 \u767d #fffffb \u5c0f\u8c46\u8272 #8f4b4a \u5c71\u5439\u8272 #fcaf17 \u9516\u9f20 #122e29 \u80e1\u7c89\u8272 #fffef9 \u5f01\u67c4\u8272 #892f1b \u9ec4\u571f\u8272 #ba8448 \u94c1\u5fa1\u7eb3\u6238 #293047 \u751f\u6210\u8272 #f6f5ec \u6817\u6885 #6b2c25 \u673d\u53f6\u8272 #896a45 \u9752\u7dd1 #00ae9d \u7070\u767d #d9d6c3 \u6d77\u8001\u8336 #733a31 \u7a7a\u4e94\u500d\u5b50\u8272 #76624c \u9516\u6d45\u8471 #508a88 \u77f3\u7af9\u8272 #d1c7b7 \u6df1\u7eef #54211d \u83ba\u8336 #6d5826 \u6c34\u6d45\u8471 #70a19f \u8c61\u7259\u8272 #f2eada \u8d64\u94dc\u8272 #78331e \u5411\u65e5\u8475\u8272 #ffc20e \u65b0\u6865\u8272 #50b7c1 \u4e73\u767d\u8272 #d3d7d4 \u8d64\u8910\u8272 #53261f \u90c1\u91d1\u8272 #fdb933 \u6d45\u8471\u8272 #00a6ac \u8584\u949d #999d9c \u91d1\u8d64 #f15a22 \u7802\u8272 #d3c6a6 \u767d\u7fa4 #78cdd1 \u94f6\u9f20 #a1a3a6 \u8d64\u8336 #b4533c \u82a5\u5b50\u8272 #c7a252 \u5fa1\u7eb3\u6238\u8272 #008792 \u8336\u9f20 #9d9087 \u8d64\u9516\u8272 #84331f \u6de1\u9ec4 #dec674 \u74ee\u8997 #94d6da \u9f20\u8272 #8a8c8e \u9ec4\u4e39 #f47a55 \u4e9c\u9ebb\u8272 #b69968 \u6c34\u8272 #afdfe4 \u8584\u58a8\u8272 #74787c \u8d64\u6a59 #f15a22 \u67af\u8272 #c1a173 \u84dd\u9f20 #5e7c85 \u5229\u4f11\u9f20 #7c8577 \u67ff\u8272 #f3704b \u9e1f\u5b50\u8272 #dbce8f \u79d8\u8272 #76becc \u94c5\u8272 #72777b \u8089\u6842\u8272 #da765b \u9ec4\u8272 #ffd400 \u7a7a\u8272 #90d7ec \u7070\u8272 #77787b \u6866\u8272 #c85d44 \u84b2\u516c\u82f1\u8272 #ffd400 \u9752 #009ad6 \u949d\u8272 #4f5555 \u70bc\u74e6\u8272 #ae5039 \u4e2d\u9ec4 #ffe600 \u84dd\u8272 #145b7d \u7164\u7af9\u8272 #6c4c49 \u9516\u8272 #6a3427 \u5208\u5b89\u8272 #f0dc70 \u6d53\u84dd #11264f \u9ed2\u8336 #563624 \u6867\u76ae\u8272 #8f4b38 \u9ec4\u6a97\u8272 #fcf16e \u52ff\u5fd8\u8349\u8272 #7bbfea \u9ed2\u6a61 #3e4145 \u6817\u8272 #8e3e1f \u7dd1\u9ec4\u8272 #decb00 \u9732\u8349\u8272 #33a3dc \u6d53\u9f20 #3c3645 \u9ec4\u8d64 #f36c21 \u9db8\u8272 #cbc547 \u7f25\u8272 #228fbd \u58a8 #464547 \u4ee3\u8d6d #b4532a \u6d77\u677e\u8272 #6e6b41 \u6d45\u7f25 #2468a2 \u9ed2 #130c0e \u9a86\u9a7c\u8272 #b7704f \u9db8\u8336 #596032 \u8584\u7f25 #2570a1 \u9ed2\u94c1 #281f1d \u9ec4\u8336 #de773f \u5c71\u9e20\u8272 #525f42 \u8584\u82b1\u8272 #2585a6 \u874b\u8272 #2f271d \u6d17\u67ff #c99979 \u751f\u58c1\u8272 #5f5d46 \u7ec0\u9752 #1b315e \u7d2b\u9ed2 #1d1626".split(' ').filter(function(a){
                    return a[0] !== "#";
                })
            }()
        ],
        deploy: [
            ["2G ", "3G ", "4G ", "6G "],
            ["16G", "32G", "64G", "128G"]
        ],
        format: [
            ["WCDMA", "TD-LTE", "GSM", "TD-SCDMA", "TD-LTE", "CDMA", "CDMA2000", "FDD-LTE", "TD-LTE"]
        ],
        brand: [function () {
                var src = [];
                [
                    ["\u963f\u739b\u5c3c", "\u963f\u8fea\u8fbe\u65af", "\u7231\u9a6c\u4ed5", "\u5b89\u8e0f", "amd", "\u7231\u8fea\u751f", "\u7231\u4ed6\u7f8e", "\u7231\u4e3d\u5c0f\u5c4b", "\u827e\u683c", "\u7231\u666e\u751f", "\u5965\u514b\u65af", "\u5965\u8fea", "ABB", "\u827e\u739b", "\u963f\u8299", "\u963f\u65af\u5229\u5eb7", "\u963f\u5e03", "\u5c0f\u718a", "\u7231\u7acb\u4fe1", "\u7231\u56fd\u8005", "a2", "\u5965\u5eb7", "\u5b89\u5b89", "\u5b89\u4f73", "\u6fb3\u4f18", "\u5965\u8389", "\u827e\u7f8e\u7279"],
                    ["\u4f70\u8349\u96c6", "\u8d1d\u56e0\u7f8e", "\u5df4\u5b9d\u8389", "\u5b9d\u683c\u4e3d", "\u78a7\u6b27\u6cc9", "Blue", "\u535a\u4e16", "\u767e\u4e3d", "\u5df4\u9ece\u4e16\u5bb6", "\u5df4\u8d1d", "\u5b9d\u7f07\u5609", "\u5f6a\u9a6c", "\u6cca\u7f8e", "\u767d\u8272\u604b\u4eba", "\u5e2e\u5b9d\u9002", "\u672c\u7530", "\u522b\u514b", "\u6bd4\u4e9a\u8fea", "\u767e\u8fbe\u7fe1\u4e3d", "\u516b\u54e5", "\u535a\u58eb", "\u767d\u4e91\u5c71", "\u767d\u7389\u5802", "\u78a7\u6c34\u6e90", "\u62dc\u8033", "\u5bbe\u5f97", "\u535a\u6717"],
                    ["\u5ba0\u7231\u4e4b\u540d", "\u8d85\u4eba", "\u8d22\u7ecf", "\u74f7\u808c", "\u8336\u82b1", "\u8d85\u661f", "CK", "Crocs", "Cisco", "\u6f6e\u5b8f\u57fa", "\u91c7\u4e50", "\u866b\u866b", "\u957f\u5bff\u82b1", "\u957f\u57ce\u8461\u8404\u9152", "\u957f\u8679", "\u957f\u57ce\u6da6\u6ed1\u6cb9", "\u7c97\u7cae", "\u57ce\u91ce\u533b\u751f", "\u957f\u57ce", "\u8f66\u524d\u8349", "\u5ba0\u7231", "\u6625\u79cb", "Chanel", "CREEK", "contigo", "cyclax", "CTRLPA"],
                    ["\u8fea\u5965", "dw", "\u675c\u857e\u65af", "\u5fb7\u8d5b\u897f\u5a01", "\u4e1c\u98ce", "\u8bfb\u8005", "\u6735\u552f", "\u7a3b\u8349\u4eba", "\u6234\u5c14", "\u8fea\u58eb\u5c3c", "\u8fea\u5de7", "\u675c\u53ef", "Dell", "DE", "\u5927\u660e\u5c71", "\u8fbe\u4e50", "\u8fbe\u8299\u59ae", "\u7239\u5730\u5b9d\u8d1d", "\u5fb7\u8299", "\u591a\u591a", "\u9053\u5c14\u987f", "DADA", "\u8482\u8299\u5c3c", "\u5927\u5b9d", "\u5fb7\u5c14\u60e0", "\u5927\u81ea\u7136\u5730\u677f", "\u7a3b\u9999\u6751"],
                    ["\u5a25\u4f69\u5170", "emoi", "\u6069\u5c1a", "ENVOY", "epos", "e\u8def\u822a", "EMINENCE", "Ettusais", "EVERGREEN", "evo", "\u4fc4\u7ea2", "EVA", "Evisu", "ELLE", "eys", "\u8033\u795e", "EAROBE", "E\u4e4b\u97f3", "Elizavecca", "elixir", "\u5c14\u5fc5\u8fbe", "\u9cc4\u9c7c\u5b9d\u5b9d", "esprit", "Ecco", "Eagle", "eno", "EURO"],
                    ["\u6cd5\u62c9\u5229", "\u98de\u5229\u6d66", "\u8303\u601d\u54f2", "\u65b9\u592a", "fila", "\u6cd5\u5170\u7433\u5361", "\u83f2\u8bd7\u5c0f\u94fa", "\u6590\u8baf", "\u5bcc\u58eb", "\u83f2\u62c9\u683c\u6155", "\u98de\u6b4c", "\u83f2\u6797\u683c\u5c14", "\u98de\u9e64", "\u798f\u7279", "\u65b9\u6b63", "\u5bcc\u5149", "\u4f5b\u7f57\u4f26\u8428", "\u82ac\u8fbe", "\u51e4\u51f0\u57ce", "\u98de\u79d1", "\u6cd5\u6069\u838e", "\u798f\u4e34\u95e8", "\u98de\u6bdb\u817f", "\u83f2\u7075", "\u8d39\u5217\u7f57", "\u83f2\u5229\u666e", "\u98de\u50b2"],
                    ["\u683c\u529b", "Gap", "\u53e4\u9a70", "\u9ad8\u5c14\u592b", "\u7518\u9732", "\u679c\u6562", "\u683c\u62c9\u82cf\u8482", "\u53e4\u5947", "\u9ad8\u901a", "\u8c37\u6b4c", "\u8d35\u4eba\u9e1f", "\u8d35\u5dde\u767e\u7075", "\u6b4c\u5e1d\u68b5", "\u683c\u96f7", "\u5188\u672c", "\u987e\u5bb6", "\u683c\u83b1\u7f8e", "\u56fd\u73cd", "\u9ad8\u5cf0", "\u9ad8\u4e1d", "\u5495\u549a", "\u9499\u5c14\u5947", "gmt", "gate", "\u9ad8\u6d01\u4e1d", "\u679c\u90e1\u738b", "\u56fd\u5bb6\u5730\u7406"],
                    ["\u534e\u7855", "\u6d77\u5e95\u635e", "\u6d77\u9a6c", "\u7ea2\u8c46", "\u60e0\u666e", "\u6d77\u4fe1", "\u608d\u9a6c", "\u706b\u72d0", "\u9ed1\u6d1e", "\u6d77\u5c14", "\u6d77\u5eb7\u5a01\u89c6", "\u54c8\u54c8", "\u6d77\u4f26\u51ef\u52d2", "\u534e\u5e1d", "\u8774\u8776", "\u7ea2\u725b", "\u7ea2\u8896", "\u7ea2\u873b\u8713", "\u9e3f\u96c1", "\u97e9\u675f", "\u97e9\u540e", "\u7ea2\u82f9\u679c", "\u6052\u6e90\u7965", "\u82b1\u82b1\u516c\u5b50", "\u5b8f\u7881", "HM", "\u54c8\u5c14\u6ee8"],
                    ["iope", "Inse", "icom", "ie\u70b9", "iTheater", "ICON", "Ivory", "IBM", "IDO", "ING", "Intel", "invons", "IPF", "iSTA", "Ikonna", "i\u679ci\u5bb6", "iFiona", "IAI", "ITCEO", "ISK", "IAIZO", "ICREO", "ieemk", "Itsskin", "Ibao", "iwo", "INBIKE"],
                    ["\u91d1\u7acb", "\u7eaa\u68b5\u5e0c", "\u4f73\u80fd", "\u7532\u58f3\u866b", "\u6377\u5b89\u7279", "\u4e5d\u7267", "\u6770\u514b\u743c\u65af", "\u5a07\u97f5\u8bd7", "\u91d1\u661f", "\u4e45\u77f3\u8ba9", "\u4e5d\u534e\u5c71", "\u91d1\u81f3\u5c0a", "\u91d1\u838e", "\u52a0\u591a\u5b9d", "\u4e5d\u9633", "\u5a07\u5170", "\u91d1\u58eb\u987f", "\u91d1\u6c99", "\u6c5f\u8bd7\u4e39\u987f", "\u4f73\u58eb\u5f97", "\u7cbe\u5de5", "\u4f73\u8d1d\u827e\u7279", "\u6c5f\u5c71", "\u91d1\u4e1d\u7334", "\u4eca\u4e16\u7f18", "\u4e5d\u7267\u738b\u7537\u88c5", "\u6377\u6ce2\u6717"],
                    ["\u5361\u5730\u4e9a", "\u5361\u897f\u6b27", "\u9177\u6d3e", "\u5eb7\u5b9d\u83b1", "\u79d1\u52d2", "\u79d1\u6bd4", "\u9177\u6bd4\u9b54\u65b9", "\u79d1\u6c83\u65af", "\u9177\u777f", "\u5361\u8bd7", "\u5361\u592b", "\u9177\u4e50\u89c6", "\u5eb7\u4f73", "\u79d1\u58eb\u8fbe", "\u67ef\u5c3c\u5361\u7f8e\u80fd\u8fbe", "\u79d1\u6069", "\u51ef\u8fea", "\u67ef\u8fbe", "\u5feb\u9c7c", "\u5eb7\u5b81", "\u73c2\u5170\u94bb\u77f3", "\u5eb7\u5229", "\u79d1\u9f99", "\u51ef\u4e50\u77f3", "\u5361\u8428\u5e1d", "\u5eb7\u738b", "\u72c2\u795e"],
                    ["lv\u98df\u54c1", "\u826f\u54c1\u94fa\u5b50", "\u674e\u5b81", "\u5170\u853b", "\u6d6a\u7434", "\u9ece\u59ff", "\u9a86\u9a7c", "\u96f7\u9706", "\u72fc\u722a", "\u7406\u80a4\u6cc9", "\u516d\u798f\u73e0\u5b9d", "\u51cc\u5ea6", "\u9f99\u5377\u98ce", "\u84dd\u5b9d\u77f3", "\u9f99\u738b", "\u6765\u4f0a\u4efd", "\u8001\u51e4\u7965", "\u6d6a\u6f6e", "\u4e50\u89c6", "\u6d6a\u6f2b\u6ee1\u5c4b", "\u5170\u535a\u57fa\u5c3c", "\u96f7\u795e", "\u52b3\u529b\u58eb", "\u516d\u798f", "\u5170\u9999\u7f18", "\u78ca\u79d1", "\u8001\u4e2d\u533b"],
                    ["\u7f8e\u7684", "\u6469\u6258\u7f57\u62c9", "\u73ab\u7433\u51ef", "\u8499\u725b", "\u8305\u53f0", "\u7f8e\u4e50\u5bb6", "\u8499\u5a1c\u4e3d\u838e", "\u9a6c\u53ef\u6ce2\u7f57", "\u7f8e\u7d20\u4f73\u513f", "\u9b45\u65cf", "\u739b\u96c5", "\u7f8e\u4e9a", "\u8c1c\u5c1a", "\u68a6\u5de5\u5382", "\u739b\u6c0f", "\u6469\u6069", "\u7f8e\u5229\u8fbe", "\u739b\u4e3d\u9edb\u4f73", "\u6885\u6377", "\u9a6c\u514b\u897f\u59c6", "\u7267\u7ae5", "\u94ed\u7444", "\u6885\u6797", "\u8109\u52a8", "\u660e\u57fa", "\u68a6\u9f99", "\u7f8e\u5473\u4e03\u4e03"],
                    ["\u8010\u514b", "\u5c3c\u5eb7", "\u725b\u680f", "\u5c3c\u91c7", "nike", "\u7537\u5de6\u5973\u53f3", "Newbalance", "\u5357\u975e", "\u7ebd\u66fc", "\u5357\u901a", "\u5973\u5973\u574a", "\u5357\u5c71", "\u5ff5\u6148\u5eb5", "\u7ebd\u5d14\u83b1", "\u8bfa\u4e1d", "\u7ebd\u8d1d\u6ecb", "\u8bfa\u4f18\u80fd", "\u90a3\u4e9b\u82b1\u513f", "\u7ebd\u5eb7\u7279", "\u7ebd\u5229\u5179", "\u5357\u5b5a", "\u52aa\u5361", "\u7ebd\u829d\u5170", "\u8bfa\u745e", "\u5948\u65af", "\u8bfa\u8bd7\u5170", "\u7eb3\u6770"],
                    ["\u6b27\u6587", "\u6b27\u7f07\u4e3d", "\u6b27\u745e\u83b2", "\u6b27\u73c0\u83b1", "\u6b27\u6811", "\u6b27\u666e", "\u6b27\u83b1\u96c5", "osa", "\u6b27\u4f4d", "\u6b27\u897f\u4e9a", "\u6b27\u83f2", "\u6b27\u745e\u8bd7", "\u6b27\u8fbe", "\u6b27\u857e", "\u6b27\u4e50", "\u6b27\u7c73\u8304", "\u6b27\u5fb7\u5821", "\u6b27\u610f", "\u6b27\u5b87", "\u6b27\u5b81", "ORBIS", "\u6b27\u559c\u95e8", "\u6b27\u5c3c\u58eb", "\u6b27\u82ae\u6cc9", "\u6b27\u795e\u8bfa", "\u6b27\u96c5", "\u6b27\u5229\u8428\u65af"],
                    ["\u6c9b\u7eb3\u6d77", "\u73c0\u83b1\u96c5", "\u7247\u4ed4\u7640", "\u54c1\u8272", "\u6d3e\u62c9\u8499", "\u54c1\u80dc", "PCS", "\u54c1\u5c1a\u7ea2\u9152", "\u5339\u514b", "\u6f8e\u6e43", "\u5e73\u5b89\u4fdd\u9669", "Prada", "\u5e73\u5b89", "\u54c1\u80fd", "\u6f58\u9ad8\u5bff", "\u76ae\u76ae\u72d7", "\u57f9\u829d", "\u54c1\u5ba2", "\u70f9\u4e50", "\u6ce1\u6cab\u4e4b\u590f", "\u6500\u9ad8", "\u54c1\u6728\u5ba3\u8a00", "Patrick", "\u78d0\u6b63", "Papillon", "Proscenic", "\u666e\u745e\u6765"],
                    ["\u4e54\u4e39", "\u5c48\u81e3\u6c0f", "\u79cb\u6c34\u4f0a\u4eba", "\u9752\u82b1\u74f7", "\u4f01\u9e45", "\u96c0\u5de2", "\u5029\u78a7", "\u9f50\u5fc3", "\u4e03\u5f69\u8679", "\u4e03\u6ce2\u8f89", "\u66f2\u7f8e", "\u5de7\u8fea\u5c1a\u60e0", "\u6e05\u534e\u540c\u65b9", "\u9752\u5c9b\u5564\u9152", "\u6e05\u548c", "\u4e54\u5b89", "\u67d2\u724c", "\u9752\u5e74\u6587\u6458", "\u5168\u53cb\u5bb6\u5c45", "\u6e05\u626c", "\u8da3\u591a\u591a", "\u52e4\u594b", "\u66f2\u7f8e\u5bb6\u5177", "\u4e03\u5339\u72fc", "\u5343\u7ea4\u8349", "\u96c0\u6c0f", "\u4eb2\u5b9d"],
                    ["\u9510\u817e", "\u745e\u4e3d", "\u4eba\u4e4b\u521d", "\u4eba\u672c", "\u5982\u65b0", "\u9510\u5ea6", "\u5bb9\u58f0", "\u8363\u4e8b\u8fbe", "\u745e\u58eb\u83b2", "\u65e5\u5eb7", "\u65e5\u9ad8", "\u65e5\u666e", "roxy", "\u745e\u6c83", "\u745e\u5947", "\u8363\u6cf0", "\u65e5\u52a0\u6ee1", "\u9510\u6fb3", "\u745e\u86d9", "RCA", "\u5bb9\u5a01", "\u65e5\u7cbe", "\u65e5\u6cf0", "\u745e\u8d1d\u5361", "Rosdn", "\u745e\u58eb\u98ce", "\u745e\u683c"],
                    ["\u7d22\u5c3c", "\u4e09\u83f1", "\u677e\u4e0b", "\u5c1a\u54c1\u5b85\u914d", "\u68ee\u9a6c", "\u82cf\u6cca\u5c14", "\u81b3\u9b54\u5e08", "\u641c\u540c", "\u7533\u82b1", "\u65bd\u534e\u6d1b\u4e16\u5947", "\u68ee\u6d77\u585e\u5c14", "\u838e\u58eb\u6bd4\u4e9a", "\u6c34\u661f", "\u65bd\u534e\u853b", "\u59cb\u7956\u9e1f", "\u4e09\u6bdb", "\u4e1d\u5854\u8299", "\u4e1d\u8574", "\u56db\u7ef4", "\u82cf\u83f2", "\u58eb\u529b\u67b6", "\u820d\u5f97", "\u7855", "\u8212\u5c14", "\u795e\u821f", "\u53cc\u7acb\u4eba", "\u76db\u5927"],
                    ["\u5929\u8bed", "\u7279\u6b65", "\u592a\u5e73\u9e1f", "\u6c64\u81e3\u500d\u5065", "\u63a2\u8def\u8005", "\u592a\u6781", "\u5929\u5802", "Target", "\u5929\u738b\u8868", "time", "\u5510\u5b81", "\u94c1\u4e09\u89d2", "ThinkPad", "\u592a\u5e73\u6d0b", "\u5510\u4eba", "\u7279\u4ed1\u82cf", "\u7279\u767e\u60e0", "\u7edf\u4e00", "\u5929\u7a7a\u4e4b\u57ce", "\u6cf0\u8fea", "\u53f0\u7535", "\u6843\u4e50\u4e1d", "\u5929\u9645", "\u5929\u4f7f\u4e4b\u97f3", "\u5929\u9f99", "\u53f0\u8fbe", "th"],
                    ["up", "UKOEO", "Umme", "UR", "umi", "udjat", "UNTEL", "Ugg", "UFAX2", "UN", "UX", "ULAC\u9501\u5177", "UV100", "Uotime", "\u897f\u739b\u7535\u5de5", "UCC\u56fd\u9645\u6d17\u8863", "Ueraydy", "UltraZone", "Unisec", "UGEE", "ULAC", "UNOPOWER", "uninukoo", "UME\u8054\u4f17", "UB", "UCC\u81ea\u884c\u8f66", "UFT"],
                    ["VV", "Vuzix", "Vov", "Versace", "Varesi", "virgo", "VELO", "VIISHOW", "Victor", "vivicolor", "vsm", "VitaminWorld", "VA", "VICKIVICKI", "VR1", "VGT", "vorson", "vancl", "VVLUX", "VISIONS", "VANS", "VPP", "Volkl", "\u536b\u535a\u58eb", "Vecozuivel\u4e50\u8377", "VERLY", "VEXG"],
                    ["\u4e07\u5b9d\u9f99", "\u65fa\u65fa", "\u6211\u7231\u6211\u5bb6", "\u5b8c\u7f8e", "\u4e07\u56fd", "\u65e0\u5370\u826f\u54c1", "\u4e07\u80fd", "\u5fae\u76df", "\u7f51\u7403\u738b\u5b50", "\u4e07\u4e8b\u8fbe", "\u4e07\u548c", "\u5916\u5a46\u5bb6", "\u5a01\u9732\u58eb", "\u4e4c\u6c5f", "\u5fd8\u4e0d\u4e86", "\u5473\u5168", "\u6211\u4e70\u7f51", "\u5a03\u54c8\u54c8", "\u4e94\u6708\u82b1", "\u8587\u8bfa\u5a1c", "\u86d9", "\u7ef4\u591a\u5229\u4e9a\u7684\u79d8\u5bc6", "\u5fae\u8f6f", "\u4e07\u7231", "\u5a01\u8fc8", "\u7ef4\u8bfa\u5361\u592b", "\u6b66\u9675"],
                    ["\u718a\u51fa\u6ca1", "\u96ea\u4f5b\u5170", "\u73b0\u4ee3\u7535\u5b50", "\u661f\u5df4\u514b", "\u96ea\u82b1\u79c0", "\u96ea\u808c\u7cbe", "\u590f\u666e", "\u534f\u548c", "\u661f\u661f", "\u65b0\u767e\u4f26", "\u5148\u950b", "\u559c\u9a6c\u62c9\u96c5", "\u76f8\u5b9c\u672c\u8349", "\u65b0\u4e1c\u65b9", "\u5c0f\u738b\u5b50", "\u897f\u8499", "\u5c0f\u72d7", "\u96ea\u8389", "\u5c0f\u718a\u7ef4\u5c3c", "\u897f\u94c1\u57ce", "\u897f\u6e38\u8bb0", "\u5c0f\u62a4\u58eb", "\u559c\u5b9d", "\u8c22\u745e\u9e9f", "\u4e60\u9152", "\u661f\u7f51\u9510\u6377", "\u563b\u5530\u5530"],
                    ["\u96c5\u8bd7\u5170\u9edb", "\u4e9a\u9a6c\u900a", "\u6a31\u82b1", "\u4ee5\u7eaf", "\u60a6\u6728\u4e4b\u6e90", "\u7389\u5170\u6cb9", "\u96c5\u9a6c\u54c8", "\u96c5\u6f3e", "\u4f0a\u5229", "\u4f18\u6b65", "\u6c38\u751f", "\u5f71\u9a70", "\u626c\u5b50", "\u82f1\u7279\u5c14", "\u96c5\u57f9", "\u5fa1\u6ce5\u574a", "\u4e0e\u72fc\u5171\u821e", "\u4e00\u5e26\u4e00\u8def", "\u60a6\u8bd7\u98ce\u541f", "\u517b\u751f\u5802", "\u96c5\u56fe", "\u96c5\u82b3", "\u591c\u7684\u94a2\u7434\u66f2", "\u96c5\u987f", "\u53cb\u90a6", "\u6c38\u4e45", "\u4e91\u5f69"],
                    ["\u4e2d\u56fd\u8054\u901a", "\u873b\u8713", "\u5468\u751f\u751f", "\u68b5\u514b\u96c5\u5b9d", "\u732a\u732a\u4fa0", "\u5f20\u98de", "\u6800\u5b50\u82b1\u5f00", "\u603b\u7edf", "\u4e2d\u7cae", "\u81ea\u7136\u5802", "\u94bb\u77f3", "\u4e2d\u56fd\u4eba\u5bff", "\u6218\u9b42", "\u81ea\u7136\u4e50\u56ed", "\u5fd7\u9ad8", "\u7eb5\u6a2a", "\u73cd\u5b9d\u9601", "\u5f81\u670d\u8005", "\u7ae0\u5149101", "\u7efd\u653e", "\u4e2d\u667a", "\u5a75\u771f", "\u771f\u7ef4\u65af", "\u5468\u9ed1\u9e2d", "\u6b63\u5b98\u5e84", "\u5cab\u5ca9", "\u767e\u4e50"],
                    ["999", "2B\u5f69\u5986", "1028", "1928", "314", "361", "090", "21\u91d1\u7ef4\u4ed6", "6\u5206\u5b50", "1938IRPOLOCLUB", "7D", "3A", "76", "5100", "3COM", "80\u8336\u5ba2", "100Pure", "1GSHOP", "9101", "365\u8c37", "8\u53f7\u94fa", "5\u5ea6VEEDEE", "3615", "80\u5bfb\u6a59", "8zuma", "85\u5ea6C", "3\u70b9\u4e00\u523b"]
                ].forEach(function (arr) {
                    src.push.apply(src, arr);
                });
                return src;
            }()],
        goods_type: [
            ["\u624b\u673a", "\u914d\u4ef6", "\u5305\u88c5\u76d2", "\u5957\u9910", "\u5176\u4ed6"]
        ],
        ssbm: [
            ["\u9500\u552e", "\u5f00\u53d1", "\u751f\u4ea7", "\u4eba\u4e8b", "\u8d28\u68c0"],
            ["\u90e8"]
        ],
        role:[
            ["\u9500\u552e", "\u5f00\u53d1", "\u751f\u4ea7", "\u4eba\u4e8b", "\u8d28\u68c0","\u91c7\u8d2d"],
            ["\u4e3b\u4efb","\u5de5\u7a0b\u5e08","\u90e8\u957f","\u7ecf\u7406","\u603b\u76d1","\u8d85\u4eba","\u4e13\u5458"]
        ],
        name: {
            \u59d3: "\u8d75\u94b1\u5b59\u674e\u5468\u5434\u90d1\u738b\u51af\u9648\u696e\u536b\u848b\u6c88\u97e9\u6768\u6731\u79e6\u5c24\u8bb8\u4f55\u5415\u65bd\u5f20\u5b54\u66f9\u4e25\u534e\u91d1\u9b4f\u9676\u59dc\u621a\u8c22\u90b9\u55bb\u67cf\u6c34\u7aa6\u7ae0\u4e91\u82cf\u6f58\u845b\u595a\u8303\u5f6d\u90ce\u9c81\u97e6\u660c\u9a6c\u82d7\u51e4\u82b1\u65b9\u4fde\u4efb\u8881\u67f3\u9146\u9c8d\u53f2\u5510\u8d39\u5ec9\u5c91\u859b\u96f7\u8d3a\u502a\u6c64\u6ed5\u6bb7\u7f57\u6bd5\u90dd\u90ac\u5b89\u5e38\u4e50\u4e8e\u65f6\u5085\u76ae\u535e\u9f50\u5eb7\u4f0d\u4f59\u5143\u535c\u987e\u5b5f\u5e73\u9ec4\u548c\u7a46\u8427\u5c39\u59da\u90b5\u6e5b\u6c6a\u7941\u6bdb\u79b9\u72c4\u7c73\u8d1d\u660e\u81e7\u8ba1\u4f0f\u6210\u6234\u8c08\u5b8b\u8305\u5e9e\u718a\u7eaa\u8212\u5c48\u9879\u795d\u8463\u6881\u675c\u962e\u84dd\u95fd\u5e2d\u5b63\u9ebb\u5f3a\u8d3e\u8def\u5a04\u5371\u6c5f\u7ae5\u989c\u90ed\u6885\u76db\u6797\u5201\u953a\u5f90\u4e18\u9a86\u9ad8\u590f\u8521\u7530\u6a0a\u80e1\u51cc\u970d\u865e\u4e07\u652f\u67ef\u661d\u7ba1\u5362\u83ab\u7ecf\u623f\u88d8\u7f2a\u5e72\u89e3\u5e94\u5b97\u4e01\u5ba3\u8d32\u9093\u90c1\u5355\u676d\u6d2a\u5305\u8bf8\u5de6\u77f3\u5d14\u5409\u94ae\u9f9a\u7a0b\u5d47\u90a2\u6ed1\u88f4\u9646\u8363\u7fc1\u8340\u7f8a\u65bc\u60e0\u7504\u9eb9\u5bb6\u5c01\u82ae\u7fbf\u50a8\u9773\u6c72\u90b4\u7cdc\u677e\u4e95\u6bb5\u5bcc\u5deb\u4e4c\u7126\u5df4\u5f13\u7267\u9697\u5c71\u8c37\u8f66\u4faf\u5b93\u84ec\u5168\u90d7\u73ed\u4ef0\u79cb\u4ef2\u4f0a\u5bab\u5b81\u4ec7\u683e\u66b4\u7518\u659c\u5389\u620e\u7956\u6b66\u7b26\u5218\u666f\u8a79\u675f\u9f99\u53f6\u5e78\u53f8\u97f6\u90dc\u9ece\u84df\u8584\u5370\u5bbf\u767d\u6000\u84b2\u90b0\u4ece\u9102\u7d22\u54b8\u7c4d\u8d56\u5353\u853a\u5c60\u8499\u6c60\u4e54\u9634\u90c1\u80e5\u80fd\u82cd\u53cc\u95fb\u8398\u515a\u7fdf\u8c2d\u8d21\u52b3\u9004\u59ec\u7533\u6276\u5835\u5189\u5bb0\u90e6\u96cd\u90e4\u74a9\u6851\u6842\u6fee\u725b\u5bff\u901a\u8fb9\u6248\u71d5\u5180\u90cf\u6d66\u5c1a\u519c\u6e29\u522b\u5e84\u664f\u67f4\u77bf\u960e\u5145\u6155\u8fde\u8339\u4e60\u5ba6\u827e\u9c7c\u5bb9\u5411\u53e4\u6613\u614e\u6208\u5ed6\u5ebe\u7ec8\u66a8\u5c45\u8861\u6b65\u90fd\u803f\u6ee1\u5f18\u5321\u56fd\u6587\u5bc7\u5e7f\u7984\u9619\u4e1c\u6b27\u6bb3\u6c83\u5229\u851a\u8d8a\u5914\u9686\u5e08\u5de9\u538d\u8042\u6641\u52fe\u6556\u878d\u51b7\u8a3e\u8f9b\u961a\u90a3\u7b80\u9976\u7a7a\u66fe\u6bcb\u6c99\u4e5c\u517b\u97a0\u987b\u4e30\u5de2\u5173\u84af\u76f8\u67e5\u540e\u8346\u7ea2\u6e38\u7afa\u6743\u9011\u76d6\u76ca\u6853\u516c\u4e07\u4fdf\u53f8\u9a6c\u4e0a\u5b98\u6b27\u9633\u590f\u4faf\u8bf8\u845b\u95fb\u4eba\u4e1c\u65b9\u8d6b\u8fde\u7687\u752b\u5c09\u8fdf\u516c\u7f8a\u6fb9\u53f0\u516c\u51b6\u5b97\u653f\u6fee\u9633\u6df3\u4e8e\u5355\u4e8e\u592a\u53d4\u7533\u5c60\u516c\u5b59\u4ef2\u5b59\u8f69\u8f95\u4ee4\u72d0\u953a\u79bb\u5b87\u6587\u957f\u5b59\u6155\u5bb9\u9c9c\u4e8e\u95fe\u4e18\u53f8\u5f92\u53f8\u7a7a\u4e0c\u5b98\u53f8\u5bc7\u4ec9\u7763\u5b50\u8f66\u989b\u5b59\u7aef\u6728\u5deb\u9a6c\u516c\u897f\u6f06\u96d5\u4e50\u6b63\u58e4\u9a77\u516c\u826f\u62d3\u62d4\u5939\u8c37\u5bb0\u7236\u8c37\u6881\u664b\u695a\u960e\u6cd5\u6c5d\u9122\u6d82\u94a6\u6bb5\u5e72\u767e\u91cc\u4e1c\u90ed\u5357\u95e8\u547c\u5ef6\u5f52\u6d77\u7f8a\u820c\u5fae\u751f\u5cb3\u5e05\u7f11\u4ea2\u51b5\u540e\u6709\u7434\u6881\u4e18\u5de6\u4e18\u4e1c\u95e8\u897f\u95e8\u5546\u725f\u4f58\u4f74\u4f2f\u8d4f\u5357\u5bab\u58a8\u54c8\u8c2f\u7b2a\u5e74\u7231\u9633\u4f5f",
            \u540d: ["\u529b", "\u6167", "\u4ea6\u6587", "\u5efa\u82b9", "\u5c0f\u71d5", "\u6866", "\u96ea\u7434", "\u6d01\u7fa4", "\u5a9a\u5a49", "\u6167\u8389", "\u6587\u5e73", "\u7389\u73cd", "\u6620\u79cb", "\u56fd\u9e4f", "\u4f0a\u5a05", "\u6d2a\u6ce2", "\u5bb6\u946b", "\u601d\u601d", "\u671d\u7ea2", "\u6d77\u71d5", "\u7ee7\u7ea2", "\u821f", "\u5e86", "\u4f1f\u73b2", "\u5723\u5a74", "\u5029", "\u548f\u6885", "\u548f\u6885", "\u4f69\u5229", "\u96ea\u6885", "\u5f64", "\u521a", "\u631a", "\u5a49", "\u5c0f\u82f1", "\u5c0f\u654f", "\u840d", "\u5a9b\u5a9b", "\u8273", "\u56fd\u5b8f", "\u5065\u79cb", "\u7b11\u60a6", "\u99a8\u857e", "\u743c\u5b87", "\u5a77", "\u6615", "\u8587", "\u65ed\u534e", "\u654f", "\u6d77\u5f3a", "\u5fd7\u65b9", "\u745c\u6d01", "\u4e9a\u73b2", "\u5a9a\u5a49", "\u96ea", "\u84c9\u534e", "\u4e3d", "\u5065\u82f1", "\u52c7", "\u68a6\u9633", "\u9896", "\u6653\u52c7", "\u8f9b\u57f9", "\u5a1c", "\u6653\u5c9a", "\u9896", "\u6653", "\u751c", "\u4fca", "\u51b0\u5fc3", "\u5168\u534e", "\u8c6b", "\u6625\u71d5", "\u8273\u67ab", "\u83b9", "\u6653\u822a", "\u534e", "\u971e", "\u6bc5", "\u6cfd\u745e", "\u73ae\u5a1f", "\u5c0f\u53cc", "\u73b2", "\u58ee", "\u6d77\u82f1", "\u6d01\u747e", "\u7af9", "\u5f6c\u5f6c", "\u73b2", "\u7acb\u7ea2", "\u79cb\u9999", "\u536b", "\u96c5\u68cb", "\u8d1e", "\u743c\u5b87", "\u4e3d", "\u8559", "\u73b0", "\u5149", "\u7389\u6ce2", "\u96ea", "\u6021", "\u5143\u9f99", "\u71d5\u5a1c", "\u8679\u660e", "\u5b81", "\u99a8\u857e", "\u8679\u660e", "\u5fd7\u5a1f", "\u6c81", "\u777f\u667a", "\u65f6\u6765", "\u519b\u82f1", "\u6b27", "\u5a9b", "\u57f9\u677e", "\u6d01", "\u4e3d\u8fdc", "\u5e86\u6885", "\u534e\u4e91", "\u5b87", "\u7ef4\u514b", "\u5a77", "\u654f\u6167", "\u6708", "\u840d", "\u8587\u8587", "\u71d5\u8339", "\u6653\u6587", "\u6653\u6587", "\u9e23\u6d69", "\u5b81", "\u51ac\u6885", "\u9f0e\u52e4", "\u519b", "\u4f1f\u5e73", "\u82b9", "\u96ea\u5a77", "\u777f\u667a", "\u5e7c\u73e0", "\u598d", "\u9759", "\u4f69\u73e9", "\u52a0\u6d32", "\u626c", "\u6656\u6656", "\u5a67", "\u7533\u51e4", "\u59dd", "\u6590", "\u6055", "\u4e9a\u6167", "\u676d\u82f1", "\u9633", "\u65ed\u6656", "\u6653\u8f69", "\u53f6\u6960", "\u6676\u6676", "\u6995\u6885", "\u6676", "\u9759", "\u5cb3\u5e73", "\u8587", "\u5b81", "\u840d", "\u6210\u79cb", "\u6c49\u5bbe", "\u82f7\u8343", "\u5ce5", "\u534e", "\u6653\u7433", "\u971e", "\u6653\u7433", "\u971e", "\u6866", "\u6d77\u9e70", "\u4e9a\u73b2", "\u8fce\u5c4f", "\u4ea6\u6587"]
        },
        phone:[
            ["153","134","177","170","188","189","180","181","152","133","182","155","151","139","130","131","138","156","136","137","158","159","132","186"],
            function(random){
                return random.toString(36).slice(2,6);
            },
            function(random){
                return random.toString(36).slice(2,6);
            }
        ],
        queue:function(string){
            var result=[];
            if(arguments.length>1){
                string=arguments;
            }
            var inc=0;
            while(inc<string.length){
                start=String(string[inc++]).charCodeAt(0);
                end=String(string[inc++]).charCodeAt(1);
                for(var cx=start,dx=end+1;cx<dx;cx++){
                    result.push(cx);
                }
            }
            return String.fromCharCode.apply(result);
        },
        str:function(length,src){
            src=src||source.queue('0','9','A','Z','a','z');
            var result=[];
            for(var cx=0;cx<length;cx++){
                result.push(src[parseInt(src.length*Math.random())]);
            }
            return result.join("")
        },
        addr: {
            country: ["\u4e2d\u56fd", "\u8499\u53e4", "\u671d\u9c9c", "\u97e9\u56fd", "\u65e5\u672c", "\u83f2\u5f8b\u5bbe", "\u8d8a\u5357", "\u8001\u631d", "\u67ec\u57d4\u5be8", "\u7f05\u7538", "\u6cf0\u56fd", "\u9a6c\u6765\u897f\u4e9a", "\u6587\u83b1", "\u65b0\u52a0\u5761", "\u5370\u5ea6\u5c3c\u897f\u4e9a", "\u4e1c\u5e1d\u6c76", "\u5c3c\u6cca\u5c14", "\u4e0d\u4e39", "\u5b5f\u52a0\u62c9\u56fd", "\u5370\u5ea6", "\u5df4\u57fa\u65af\u5766", "\u65af\u91cc\u5170\u5361", "\u9a6c\u5c14\u4ee3\u592b", "", "\u54c8\u8428\u514b\u65af\u5766", "\u5409\u5c14\u5409\u65af\u65af\u5766", "\u5854\u5409\u514b\u65af\u5766", "\u4e4c\u5179\u522b\u514b\u65af\u5766", "\u571f\u5e93\u66fc\u65af\u5766", "\u963f\u5bcc\u6c57", "\u4f0a\u62c9\u514b", "\u4f0a\u6717", "\u53d9\u5229\u4e9a", "\u7ea6\u65e6", "\u9ece\u5df4\u5ae9", "\u4ee5\u8272\u5217", "\u5df4\u52d2\u65af\u5766", "\u6c99\u7279\u963f\u62c9\u4f2f", "\u5df4\u6797", "\u5361\u5854\u5c14", "\u79d1\u5a01\u7279", "\u963f\u62c9\u4f2f\u8054\u5408\u914b\u957f\u56fd\uff08\u963f\u8054\u914b\uff09", "\u963f\u66fc", "\u4e5f\u95e8", "\u683c\u9c81\u5409\u4e9a", "\u4e9a\u7f8e\u5c3c\u4e9a", "\u963f\u585e\u62dc\u7586", "\u571f\u8033\u5176", "\u585e\u6d66\u8def\u65af", "\u82ac\u5170", "\u745e\u5178", "\u632a\u5a01", "\u51b0\u5c9b", "\u4e39\u9ea6", "\u6cd5\u7f57\u7fa4\u5c9b\uff08\u4e39\uff09", "\u7231\u6c99\u5c3c\u4e9a", "\u62c9\u8131\u7ef4\u4e9a", "\u7acb\u9676\u5b9b", "\u767d\u4fc4\u7f57\u65af", "\u4fc4\u7f57\u65af", "\u4e4c\u514b\u5170", "\u6469\u5c14\u591a\u74e6", "\u6ce2\u5170", "\u6377\u514b", "\u65af\u6d1b\u4f10\u514b", "\u5308\u7259\u5229", "\u5fb7\u56fd", "\u5965\u5730\u5229", "\u745e\u58eb", "\u5217\u652f\u6566\u58eb\u767b", "\u82f1\u56fd", "\u7231\u5c14\u5170", "\u8377\u5170", "\u6bd4\u5229\u65f6", "\u5362\u68ee\u5821", "\u6cd5\u56fd", "\u6469\u7eb3\u54e5", "\u7f57\u9a6c\u5c3c\u4e9a", "\u4fdd\u52a0\u5229\u4e9a", "\u585e\u5c14\u7ef4\u4e9a", "\u9a6c\u5176\u987f", "\u963f\u5c14\u5df4\u5c3c\u4e9a", "\u5e0c\u814a", "\u65af\u6d1b\u6587\u5c3c\u4e9a", "\u514b\u7f57\u5730\u4e9a", "\u6ce2\u65af\u5c3c\u4e9a\u548c\u58a8\u585e\u54e5\u7ef4\u90a3", "\u610f\u5927\u5229", "\u68b5\u8482\u5188", "\u5723\u9a6c\u529b\u8bfa", "\u9a6c\u8033\u4ed6", "\u897f\u73ed\u7259", "\u8461\u8404\u7259", "\u5b89\u9053\u5c14", "\u57c3\u53ca", "\u5229\u6bd4\u4e9a", "\u82cf\u4e39", "\u7a81\u5c3c\u65af", "\u963f\u5c14\u53ca\u5229\u4e9a", "\u6469\u6d1b\u54e5", "\u4e9a\u901f\u5c14\u7fa4\u5c9b\uff08\u8461\uff09", "\u9a6c\u5fb7\u62c9\u7fa4\u5c9b\uff08\u8461\uff09", "\u57c3\u585e\u4fc4\u6bd4\u4e9a", "\u5384\u7acb\u7279\u91cc\u4e9a", "\u7d22\u9a6c\u91cc", "\u5409\u5e03\u63d0", "\u80af\u5c3c\u4e9a", "\u5766\u6851\u5c3c\u4e9a", "\u4e4c\u5e72\u8fbe", "\u5362\u65fa\u8fbe", "\u5e03\u9686\u8fea", "\u585e\u820c\u5c14", "\u4e4d\u5f97", "\u4e2d\u975e", "\u5580\u9ea6\u9686", "\u8d64\u9053\u51e0\u5185\u4e9a", "\u52a0\u84ec", "\u521a\u679c\u5171\u548c\u56fd\uff08\u5373\uff1a\u521a\u679c\uff08\u5e03\uff09\uff09", "\u521a\u679c\u6c11\u4e3b\u5171\u548c\u56fd\uff08\u5373\uff1a\u521a\u679c\uff08\u91d1\uff09\uff09", "\u5723\u591a\u7f8e\u53ca\u666e\u6797\u897f\u6bd4", "\u6bdb\u91cc\u5854\u5c3c\u4e9a", "\u897f\u6492\u54c8\u62c9\uff08\u6ce8\uff1a\u672a\u72ec\u7acb\uff0c\u8be6\u7ec6\u8bf7\u770b\uff1a\uff09", "\u585e\u5185\u52a0\u5c14", "\u5188\u6bd4\u4e9a", "\u9a6c\u91cc", "\u5e03\u57fa\u7eb3\u6cd5\u7d22", "\u51e0\u5185\u4e9a", "\u51e0\u5185\u4e9a\u6bd4\u7ecd", "\u4f5b\u5f97\u89d2", "\u585e\u62c9\u5229\u6602", "\u5229\u6bd4\u91cc\u4e9a", "\u79d1\u7279\u8fea\u74e6", "\u52a0\u7eb3", "\u591a\u54e5", "\u8d1d\u5b81", "\u5c3c\u65e5\u5c14", "\u52a0\u90a3\u5229\u7fa4\u5c9b\uff08\u897f\uff09", "\u8d5e\u6bd4\u4e9a", "\u5b89\u54e5\u62c9", "\u6d25\u5df4\u5e03\u97e6", "\u9a6c\u62c9\u7ef4", "\u83ab\u6851\u6bd4\u514b", "\u535a\u8328\u74e6\u7eb3", "\u7eb3\u7c73\u6bd4\u4e9a", "\u5357\u975e", "\u65af\u5a01\u58eb\u5170", "\u83b1\u7d22\u6258", "\u9a6c\u8fbe\u52a0\u65af\u52a0", "\u79d1\u6469\u7f57", "\u6bdb\u91cc\u6c42\u65af", "\u7559\u5c3c\u65fa\uff08\u6cd5\uff09", "\u5723\u8d6b\u52d2\u62ff\uff08\u82f1\uff09", "\u6fb3\u5927\u5229\u4e9a", "\u65b0\u897f\u5170", "\u5df4\u5e03\u4e9a\u65b0\u51e0\u5185\u4e9a", "\u6240\u7f57\u95e8\u7fa4\u5c9b", "\u74e6\u52aa\u963f\u56fe", "\u5bc6\u514b\u7f57\u5c3c\u897f\u4e9a", "\u9a6c\u7ecd\u5c14\u7fa4\u5c9b", "\u5e15\u52b3", "\u7459\u9c81", "\u57fa\u91cc\u5df4\u65af", "\u56fe\u74e6\u5362", "\u8428\u6469\u4e9a", "\u6590\u6d4e\u7fa4\u5c9b", "\u6c64\u52a0", "\u5e93\u514b\u7fa4\u5c9b\uff08\u65b0\uff09", "\u5173\u5c9b\uff08\u7f8e\uff09", "\u65b0\u5580\u91cc\u591a\u5c3c\u4e9a\uff08\u6cd5\uff09", "\u6cd5\u5c5e\u6ce2\u5229\u5c3c\u897f\u4e9a", "\u76ae\u7279\u51ef\u6069\u5c9b\uff08\u82f1\uff09", "\u74e6\u5229\u65af\u4e0e\u5bcc\u56fe\u7eb3\uff08\u6cd5\uff09", "\u7ebd\u57c3\uff08\u65b0\uff09", "\u6258\u514b\u52b3\uff08\u65b0\uff09", "\u7f8e\u5c5e\u8428\u6469\u4e9a", "\u5317\u9a6c\u91cc\u4e9a\u7eb3\uff08\u7f8e\uff09", "\u52a0\u62ff\u5927", "\u7f8e\u56fd", "\u58a8\u897f\u54e5", "\u683c\u9675\u5170\uff08\u4e39\uff09", "\u5371\u5730\u9a6c\u62c9", "\u4f2f\u5229\u5179", "\u8428\u5c14\u74e6\u591a", "\u6d2a\u90fd\u62c9\u65af", "\u5c3c\u52a0\u62c9\u74dc", "\u54e5\u65af\u8fbe\u9ece\u52a0", "\u5df4\u62ff\u9a6c", "\u52a0\u52d2\u6bd4\u6d77\u5730\u533a\uff1a\u5df4\u54c8\u9a6c", "\u53e4\u5df4", "\u7259\u4e70\u52a0", "\u6d77\u5730", "\u591a\u7c73\u5c3c\u52a0\u5171\u548c\u56fd", "\u5b89\u63d0\u74dc\u548c\u5df4\u5e03\u8fbe", "\u5723\u57fa\u8328\u548c\u5c3c\u7ef4\u65af", "\u591a\u7c73\u5c3c\u514b", "\u5723\u5362\u897f\u4e9a", "\u5723\u6587\u68ee\u7279\u548c\u683c\u6797\u7eb3\u4e01\u65af", "\u683c\u6797\u7eb3\u8fbe", "\u5df4\u5df4\u591a\u65af", "\u7279\u7acb\u5c3c\u8fbe\u548c\u591a\u5df4\u54e5", "\u6ce2\u591a\u9ece\u5404\uff08\u7f8e\uff09", "\u82f1\u5c5e\u7ef4\u5c14\u4eac\u7fa4\u5c9b", "\u7f8e\u5c5e\u7ef4\u5c14\u4eac\u7fa4\u5c9b", "\u5b89\u572d\u62c9\uff08\u82f1\uff09", "\u8499\u7279\u585e\u62c9\u7279\uff08\u82f1\uff09", "\u74dc\u5fb7\u7f57\u666e\uff08\u6cd5\uff09", "\u9a6c\u63d0\u5c3c\u514b\uff08\u6cd5\uff09", "\u8377\u5c5e\u5b89\u7684\u5217\u65af", "\u963f\u9c81\u5df4\uff08\u8377\uff09", "\u7279\u514b\u65af\u548c\u51ef\u79d1\u65af\u7fa4\u5c9b\uff08\u82f1\uff09", "\u5f00\u66fc\u7fa4\u5c9b\uff08\u82f1\uff09", "\u767e\u6155\u5927\uff08\u82f1\uff09", "\u54e5\u4f26\u6bd4\u4e9a", "\u59d4\u5185\u745e\u62c9", "\u572d\u4e9a\u90a3", "\u6cd5\u5c5e\u572d\u4e9a\u90a3", "\u82cf\u91cc\u5357", "\u5384\u74dc\u591a\u5c14", "\u79d8\u9c81", "\u73bb\u5229\u7ef4\u4e9a", "\u5df4\u897f", "\u667a\u5229", "\u963f\u6839\u5ef7", "\u4e4c\u62c9\u572d", "\u5df4\u62c9\u572d"]
        }
    };
    return function (type, decimal) {
        var str = "";
        if (typeof type === 'number') {
            return (Math.random() * type).toFixed(decimal) || "";
        }
        var s = source[type];
        var isFunction=angular.isFunction;
        for (var k in s) {
            var v = s[k];
            if(isFunction(v)){
                str+=v(Math.random());
            }else{
                str += v[parseInt(v.length * Math.random())];
            }
        }
        return str;
    };
}]);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

yjkj.filter("size", function () {
    var gensize = function (size) {
        return [].slice.apply("BKMGT", [0]).map(function (b) {
            var res = "";
            if (size >= 1 && size < 1024) {
                res = size.toFixed(2).replace(/(.00)$/, "") + b;
            }
            size /= 1024;
            return res;
        }).join("");
    };
    return gensize;
});
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.filter("text",function(){
    return function(data){
        if(angular.isDefined(data)){
            return String(data);
        }
    };
});
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.filter('translate',function(){
    return function(value,map){
        return map&&map[value]||value;
    };
});
/*\u673a\u5668\u6700\u597d\u9884\u70ed\uff0c\u7206\u70b8\u540e\u679c\u81ea\u8d1f*/
yjkj.service("loading",["$timeout", function($timeout){
	//\u6c14\u6ce1\u52a8\u753b
	var bubble_div=document.createElement("div");
	this.bubble=function(){
		bubble_div.style.transform="translateX(0)";
		//loading\u5bb9\u5668
		var load=document.createElement("div");
		//\u7ed8\u5236\u6c14\u6ce1\u5321
		var qipao=document.createElement("div");
		//\u7ed8\u5236\u65cb\u8f6c\u7684\u5706\u5708
		var xz=document.createElement("div");
		//\u7ed8\u5236\u52fe\u53f7
		var i=document.createElement("i");
		//\u7ed8\u5236\u9634\u5f71
		var shadow=document.createElement("div");
		
		i.className="iconfont icon-gouhao";
		bubble_div.className="bubble-container";
		bubble_div.appendChild(load);
		qipao.className="qipao";
		load.appendChild(qipao);
		xz.className="xz";
		qipao.appendChild(xz);
		qipao.appendChild(i);
		shadow.className="shadow";
		load.appendChild(shadow);
		document.body.appendChild(bubble_div);
	}
	this.bubbleEnd=function(time){
		$timeout(function(){
			var xz=bubble_div.getElementsByClassName("xz")[0];
			var gh=bubble_div.getElementsByTagName("i")[0];
			xz.style.animation="sx .2s";
			gh.style.animation="fd .2s";
			//safari&&chrome
			gh.addEventListener('webkitAnimationEnd',function(){
				bubble_div.style.transform="translateY(100%)";
				bubble_div.addEventListener("transitionend",function(){
					bubble_div.innerHTML="";
					document.body.removeChild(bubble_div);
				})

			});
			//ie10+
			bubble_div.addEventListener('MSAnimationEnd',function(){
				bubble_div.style.transform="translateY(100%)";
				bubble_div.innerHTML="";
				document.body.removeChild(bubble_div);
			});
		},time);
	}
	//\u5496\u5561\u52a8\u753b
	var coffee_div=document.createElement("div");
	this.coffee=function(){
		coffee_div.className="coffee_container";
		coffee_div.style.opacity=1;
		//\u7ed8\u5236\u5706\u5708
		var load=document.createElement("div");
		//\u7ed8\u5236\u676f\u5b50
		var cap=document.createElement("div");
		//\u7ed8\u5236\u5e95\u5ea7
		var bottom=document.createElement("div");
		cap.className="cap";
		load.className="load";
		load.appendChild(cap);
		bottom.className="bottom";
		load.appendChild(bottom);
		load.style.animation="coffee-sx .8s forwards";
		cap.style.animation="cap-down .8s forwards";
		bottom.style.animation="bottom-up .8s forwards";
		coffee_div.appendChild(load);
		document.body.appendChild(coffee_div);
	}
	this.coffeeEnd=function(time){
		$timeout(function(){
			var load=coffee_div.getElementsByClassName("load")[0];
			var cap=coffee_div.getElementsByClassName("cap")[0];
			var bottom=coffee_div.getElementsByClassName("bottom")[0];
			load.style.animation="coffee-fd .5s ";
			cap.style.animation="cap-up .5s ";
			bottom.style.animation="bottom-down .5s ";
			coffee_div.style.opacity=0;
			bottom.addEventListener("webkitAnimationEnd",function(){
				coffee_div.innerHTML="";
				document.body.removeChild(coffee_div);
			});
			bottom.addEventListener("MSAnimationEnd",function(){
				coffee_div.innerHTML="";
				document.body.removeChild(coffee_div);
			});
		},time);
	}
}])

/**
 * pinyin\u670d\u52a1\uff0c\u63d0\u4f9b\u6c49\u5b57\u8f6c\u62fc\u97f3\u7684\u529f\u80fd\uff0c\u5728\u667a\u80fd\u641c\u7d22\u65f6\u4f7f\u7528
 * @example \u4ec5\u8f93\u51fa\u9996\u5b57\u6bcd
 * pinyin.parsePy("\u60a8\u597d\uff0c\u6211\u662fwyh\uff0c\u8fd8\u672a\u8bf7\u6559\u60a8\u7684\u9ad8\u59d3\u5927\u540d\uff1f")
 * \u8fd4\u56de\u7ed3\u679c\u662f
 * "nh\uff0cwswyh\uff0chwqjndgxdm"
 * @example  \u8f93\u51fa\u5168\u90e8\u62fc\u97f3
 * pinyin.parsePinyin("my name is \u738b\u5927\u5175")
 * \u8fd4\u56de\u7ed3\u679c\u662f
 * "my name is wangdabing"
 */
yjkj.service('pinyin', function () {
//    var xhr = new XMLHttpRequest();
//    xhr.onload=function(){
//        source=xhr.responseText;
//    };
//    xhr.open("GET", "data/pinyin.json", true);
//    xhr.overrideMimeType("text/plain; charset=utf-8");
//    xhr.send(null);

    var source = {
        "ling": "\u3007\u4ee4\u4f36\u51cc\u5222\u53e6\u5464\u546c\u56f9\u577d\u580e\u590c\u59c8\u5a48\u5b41\u5cad\u5cba\u5dba\u5f7e\u601c\u6395\u6624\u670e\u67c3\u68c2\u68f1\u6afa\u6b1e\u6ce0\u6de9\u6faa\u7075\u70a9\u71ef\u7227\u72d1\u73b2\u740c\u74f4\u768a\u7756\u7831\u7890\u797e\u79e2\u7adb\u7b2d\u7d37\u7dbe\u7eeb\u7f9a\u7fce\u8046\u8232\u82d3\u83f1\u8576\u8626\u86c9\u8851\u888a\u88ec\u8a45\u8dc9\u8ee8\u8f18\u9143\u91bd\u9234\u9302\u94c3\u959d\u963e\u9675\u96f6\u970a\u971b\u971d\u9748\u9818\u9886\u99d6\u9b7f\u9bea\u9cae\u9d12\u9e30\u9e77\u9ea2\u9f61\u9f62\u9f84\u9f97",
        "yi": "\u4e00\u4e41\u4e42\u4e49\u4e59\u4e84\u4ea6\u4ebf\u4ee1\u4ee5\u4eea\u4f07\u4f0a\u4f3f\u4f5a\u4f7e\u4f87\u4f9d\u4fcb\u501a\u506f\u5100\u5104\u517f\u519d\u5208\u5293\u52ae\u52da\u52e9\u531c\u533b\u541a\u5453\u546d\u5479\u54a6\u54bf\u5508\u55cc\u566b\u56c8\u571b\u572f\u57bc\u57f6\u57f8\u58bf\u58f1\u58f9\u5901\u5937\u5955\u59e8\u5ad5\u5adb\u5b11\u5b1f\u5b90\u5b9c\u5ba7\u5bf1\u5bf2\u5c3e\u5c79\u5cc4\u5cd3\u5d3a\u5da7\u5dac\u5db7\u5df2\u5df8\u5e1f\u5e20\u5e46\u5ea1\u5ed9\u5f02\u5f08\u5f0b\u5f0c\u5f2c\u5f5b\u5f5c\u5f5d\u5f5e\u5f79\u5fc6\u6008\u6021\u603f\u605e\u6092\u6098\u60a5\u610f\u61b6\u61cc\u61ff\u6245\u6246\u6291\u62b4\u6339\u6359\u6396\u639c\u63d6\u648e\u6561\u6581\u65d1\u65d6\u6613\u6672\u6679\u6686\u66c0\u66ce\u66f3\u6759\u675d\u678d\u67bb\u67c2\u6818\u6827\u684b\u68ed\u6905\u6938\u698f\u69f7\u69f8\u6a8d\u6aa5\u6ab9\u6b2d\u6b39\u6b4b\u6b5d\u6b94\u6baa\u6bb9\u6bc5\u6bc9\u6c82\u6cb6\u6cc6\u6d02\u6d1f\u6d22\u6d42\u6d65\u6d73\u6db2\u6e59\u6ea2\u6eb0\u6f2a\u6f69\u6fba\u7037\u7088\u7132\u71a0\u71a4\u71aa\u71bc\u71da\u71e1\u71f1\u7317\u7348\u73b4\u73c6\u747f\u74f5\u7570\u7591\u75ab\u75cd\u75ec\u7617\u761e\u7631\u7654\u76ca\u7719\u7724\u7731\u7796\u77e3\u7912\u794e\u7995\u79c7\u79fb\u7a26\u7a53\u7ad3\u7ad5\u7ae1\u7ae9\u7b16\u7bb7\u7c03\u7dc6\u7e0a\u7e44\u7e76\u7e79\u7ece\u7f22\u7f9b\u7fa0\u7fa9\u7fbf\u7fca\u7fcc\u7ff3\u7ffc\u8084\u808a\u8094\u80e3\u80f0\u814b\u8189\u81c6\u8223\u8257\u8264\u827a\u827e\u8285\u82c5\u82d0\u82e1\u82e2\u8351\u8413\u84fa\u858f\u85d9\u85dd\u8619\u8649\u8675\u8681\u86c7\u86dc\u86e1\u86e6\u86fe\u8734\u8794\u8798\u87a0\u87fb\u8863\u8864\u886a\u8898\u88a3\u88b2\u88d4\u88db\u8939\u897c\u89fa\u8a11\u8a32\u8a33\u8a52\u8a63\u8abc\u8b1a\u8b3b\u8b69\u8b6f\u8b70\u8b89\u8b9b\u8bae\u8bd1\u8bd2\u8be3\u8c0a\u8c59\u8c5b\u8c77\u8ca4\u8cbd\u8d3b\u8dc7\u8de0\u8efc\u8f22\u8f59\u8f76\u8fc6\u8fe4\u8ffb\u9018\u9038\u9057\u907a\u9091\u90fc\u914f\u91ab\u91b3\u91b7\u91d4\u91f4\u9218\u9220\u9236\u926f\u9295\u92a5\u93b0\u943f\u9487\u94f1\u9552\u9571\u961d\u9623\u966d\u96bf\u972c\u977e\u97a5\u9809\u9824\u9825\u984a\u9857\u9861\u9890\u98df\u98f4\u990f\u9950\u9974\u99c5\u9a5b\u9a7f\u9aae\u9ba7\u9be3\u9ce6\u9dc1\u9dd6\u9de7\u9dfe\u9e03\u9e5d\u9e62\u9e65\u9ed3\u9edf\u9ef3\u9f6e\u9f78",
        "ding": "\u4e01\u4ec3\u53ee\u5576\u5975\u5a17\u5b9a\u5d7f\u5e04\u5fca\u639f\u6917\u6a99\u6fce\u738e\u753a\u753c\u7594\u76ef\u77f4\u7887\u78a0\u78f8\u8035\u815a\u8423\u85a1\u8670\u8a02\u8ba2\u914a\u91d8\u92cc\u9320\u9424\u9489\u94e4\u952d\u976a\u9802\u9841\u9876\u98e3\u9964\u9f0e\u9f11",
        "zheng": "\u4e01\u4e89\u4f42\u57e9\u59c3\u5ce5\u5d22\u5e40\u5f81\u5fb0\u5fb4\u5fb5\u6014\u6138\u628d\u62ef\u6323\u6399\u63c1\u649c\u653f\u6574\u6b63\u6c36\u70a1\u70dd\u722d\u72f0\u7319\u75c7\u7665\u7710\u7741\u775c\u7b5d\u7b8f\u7bdc\u7cfd\u8047\u84b8\u8a3c\u8acd\u8b49\u8bc1\u8be4\u8e2d\u90d1\u912d\u9266\u931a\u93f3\u9441\u94b2\u94ee\u9b07\u9bd6\u9cad\u9d0a",
        "kao": "\u4e02\u5c3b\u62f7\u6537\u6832\u69c0\u6d18\u70e4\u718c\u71fa\u7292\u7a01\u8003\u85a7\u92ac\u94d0\u9760\u9adb\u9bb3\u9c93\u9df1",
        "qi": "\u4e03\u4e5e\u4e93\u4e9d\u4e9f\u4f01\u4fdf\u501b\u50db\u5176\u51c4\u5258\u542f\u5447\u546e\u54a0\u5518\u552d\u5553\u5554\u555f\u5601\u5650\u5668\u573b\u57fc\u5898\u5921\u5947\u5951\u59bb\u5a38\u5a4d\u5c7a\u5c82\u5c90\u5c93\u5d0e\u5d5c\u5e3a\u5f03\u5f9b\u5fd4\u608a\u60bd\u6112\u612d\u617c\u617d\u6187\u61a9\u61e0\u621a\u637f\u6391\u6456\u6532\u6567\u6589\u658a\u65c2\u65d7\u6675\u66a3\u671e\u671f\u675e\u679d\u67d2\u6814\u6816\u6864\u687c\u68c4\u68ca\u68cb\u68e8\u68f2\u69bf\u69e3\u69ed\u6ab1\u6ac0\u6b2b\u6b39\u6b3a\u6b67\u6c14\u6c17\u6c23\u6c54\u6c7d\u6c8f\u6ce3\u6dc7\u6dd2\u6e46\u6e47\u6eaa\u6f06\u6fdd\u7081\u710f\u7309\u7382\u7398\u7426\u742a\u7482\u7508\u7541\u7566\u75b7\u76c0\u76f5\u77f5\u780c\u7881\u7895\u789b\u78b6\u78dc\u78e7\u78e9\u7918\u7941\u7947\u7948\u797a\u79a5\u7a18\u7a3d\u7ad2\u7ae2\u7c31\u7c4f\u7cb8\u7d2a\u7da5\u7da6\u7da8\u7dae\u7dba\u7dc0\u7ddd\u7e83\u7eee\u7f09\u7fd7\u8006\u8110\u81cd\u8269\u8291\u829e\u82aa\u8360\u8401\u840b\u8415\u847a\u8572\u85ba\u85c4\u8604\u8691\u8694\u869a\u86f4\u871d\u871e\u87ff\u8810\u8879\u88ff\u8a16\u8ac6\u8aec\u8aff\u8bab\u8c3f\u8c48\u8d77\u8dc2\u8e11\u8e26\u8e4a\u8edd\u8fc4\u8fc9\u9094\u90ea\u913f\u91ee\u9321\u9324\u93da\u951c\u95d9\u970b\u9754\u980e\u9863\u9880\u9a0e\u9a0f\u9a90\u9a91\u9b10\u9b3f\u9b4c\u9ba8\u9bd5\u9c2d\u9caf\u9ccd\u9d78\u9d80\u9d88\u9e02\u9e92\u9ea1\u9f1c\u9f4a\u9f50",
        "shang": "\u4e04\u4e0a\u4ee9\u4f24\u50b7\u51c3\u5546\u57a7\u5892\u59e0\u5c19\u5c1a\u616f\u6244\u664c\u6b87\u6ba4\u6c64\u6e6f\u6ef3\u6f21\u71b5\u7219\u7dd4\u7ef1\u850f\u87aa\u88f3\u89de\u89f4\u8b2a\u8cde\u8d4f\u9284\u945c\u9b3a",
        "xia": "\u4e05\u4e0b\u4fa0\u4fe0\u5084\u51be\u5323\u53a6\u5413\u5477\u552c\u5687\u590f\u5913\u5ce1\u5cfd\u5ec8\u61d7\u633e\u6433\u656e\u659c\u6687\u67d9\u6b31\u6d3d\u70a0\u70da\u7175\u72ce\u72ed\u72f9\u73e8\u7455\u759c\u75a8\u7615\u7771\u778e\u7856\u7864\u78ac\u78cd\u796b\u7b1a\u7b6a\u7e16\u7f45\u7fc8\u821d\u823a\u8290\u8578\u867e\u8766\u8d6e\u8f44\u8f96\u9050\u935c\u938b\u93ec\u9595\u965d\u971e\u98ac\u9a22\u9b7b\u9c15\u9db7\u9ee0",
        "none": "\u4e06\u4e37\u4e44\u4e4a\u4e5b\u4e64\u4e65\u4e67\u4e6c\u4e6e\u4e6f\u4e72\u4e7a\u4e7b\u4e7c\u4e7d\u4e87\u4eaa\u4ebd\u4ed2\u4f66\u4f68\u4fa4\u4fe7\u503f\u50a6\u510f\u516f\u517a\u51a7\u51e7\u51e9\u51ea\u5301\u5302\u5307\u5381\u5391\u53bc\u53fe\u545a\u54d6\u54d8\u54db\u551c\u551f\u5525\u5579\u55b8\u55ed\u55f4\u560a\u5625\u567a\u5691\u5692\u56a1\u56ce\u56d5\u56d6\u5726\u5737\u5738\u5788\u578a\u57aa\u57b0\u57b3\u57d6\u580f\u5812\u5840\u5870\u589b\u58b9\u58d7\u58ea\u58ed\u5908\u5911\u591e\u593b\u594d\u5a10\u5a54\u5a6e\u5a72\u5a88\u5a98\u5aab\u5af2\u5b04\u5b1c\u5b2b\u5b33\u5b36\u5b67\u5c21\u5c57\u5c76\u5c77\u5c83\u5cbc\u5cbe\u5cc5\u5ce0\u5d0a\u5d75\u5d76\u5d7b\u5db6\u5dbf\u5dea\u5dec\u5ded\u5dfc\u5e49\u5e65\u5e92\u5ee4\u5eed\u5f41\u5f45\u5f94\u5f9a\u603a\u603d\u603e\u6077\u6125\u6131\u6150\u61f3\u6256\u62a3\u6318\u6327\u6364\u63b5\u63b6\u63b9\u63fb\u63fc\u6457\u64b6\u64dc\u64dd\u651a\u657e\u65c0\u65d5\u6683\u66d5\u66e2\u6711\u6725\u6730\u6741\u6762\u6763\u6764\u67a0\u67a4\u67e8\u6803\u6806\u680d\u6836\u685b\u685d\u685e\u68ba\u68bb\u691a\u691b\u6921\u6923\u6926\u6927\u6928\u6929\u692c\u697e\u6981\u698a\u698b\u698c\u69dd\u69e1\u6a2d\u6a2e\u6a30\u6a72\u6a73\u6a74\u6a75\u6a78\u6a7a\u6a7b\u6ab2\u6aca\u6ad4\u6ae4\u6ae6\u6af5\u6af7\u6b0c\u6b0d\u6b15\u6b1f\u6b44\u6b5a\u6b9d\u6bdc\u6bdd\u6bdf\u6bee\u6bf6\u6c1e\u6c62\u6c63\u6c7c\u6d1c\u6d4c\u6da5\u6e0f\u6e6a\u6e6d\u6e84\u6e8a\u6e8b\u6f48\u6f49\u6f71\u6f9d\u6ff8\u702d\u702e\u7050\u705c\u7073\u70bf\u70e5\u70ea\u70ee\u7101\u7111\u7112\u7139\u713d\u713e\u713f\u7140\u716f\u7176\u7177\u718d\u7195\u7196\u71b4\u71dd\u71de\u71f5\u71f6\u720e\u7218\u7220\u7233\u7257\u7320\u7347\u7364\u73ef\u7412\u743b\u7461\u748d\u7493\u74a4\u74b4\u74e7\u74f0\u74f1\u74f2\u74f8\u74fc\u7505\u752e\u7553\u7560\u7569\u7666\u7677\u7775\u781b\u783d\u7853\u7858\u785b\u7867\u7873\u7874\u7878\u78b5\u78b7\u78d7\u78ee\u7922\u794d\u7999\u79a3\u7a24\u7a25\u7a43\u7a52\u7a5d\u7a66\u7a6f\u7aa4\u7aa7\u7abd\u7b02\u7b39\u7b3d\u7b7d\u7bae\u7bd0\u7bd2\u7c13\u7c2f\u7c42\u7c4e\u7c61\u7c82\u7c90\u7ca9\u7cad\u7cc0\u7cd8\u7d9b\u7dd3\u7dd5\u7e05\u7e07\u7e4c\u7e67\u7e90\u7f40\u7f49\u7f56\u7ff6\u8002\u8041\u8053\u8062\u8063\u807a\u80ff\u810c\u8126\u8192\u8224\u823f\u8248\u8254\u825d\u8260\u82c6\u8310\u8312\u833e\u8362\u83bb\u8419\u841e\u841f\u8421\u8422\u8485\u848a\u848f\u84c3\u84d9\u84dc\u84de\u84e4\u85d4\u85f5\u8612\u8615\u8630\u8644\u8645\u8672\u86ef\u874a\u87a6\u87a7\u87a9\u87d0\u87f5\u8834\u8850\u88a5\u88ae\u88b0\u88c3\u88c4\u88c7\u8904\u891c\u891d\u8945\u8968\u8977\u897d\u8984\u8985\u8aae\u8b03\u8b09\u8d0c\u8d18\u8db0\u8e0e\u8eae\u8eb5\u8ebb\u8ebc\u8ebe\u8ec5\u8ec8\u8f4c\u8faa\u8fb7\u8fbb\u8fbc\u8fcc\u8fda\u8ff2\u9027\u9056\u9064\u909c\u90a4\u90ee\u915b\u915c\u91fb\u9228\u922a\u922b\u92af\u92e2\u92f2\u92f4\u933b\u933f\u9342\u9345\u9386\u93ba\u93bc\u93bd\u93be\u93ef\u93f1\u93f2\u9422\u9423\u9466\u9467\u958a\u959a\u95aa\u95c1\u95ce\u95cf\u95e7\u9679\u9717\u973b\u974d\u97b0\u97d5\u98aa\u98ca\u99ef\u99f2\u9af8\u9b78\u9b79\u9b96\u9b97\u9b98\u9bb1\u9bb2\u9bb4\u9bc2\u9bce\u9bcf\u9bd0\u9bd1\u9bf1\u9bf2\u9bf3\u9c18\u9c1a\u9c30\u9c5b\u9c69\u9c6a\u9c70\u9cf0\u9d2b\u9d46\u9d47\u9d48\u9d64\u9d65\u9d8d\u9d8e\u9d91\u9dab\u9ebf",
        "wan": "\u4e07\u4e38\u4ef4\u5007\u5213\u525c\u534d\u5350\u5558\u57e6\u5846\u5a29\u5a49\u5a60\u5b8c\u5b9b\u5c8f\u5e35\u5f2f\u5f4e\u5fe8\u60cb\u628f\u633d\u6365\u665a\u6669\u667c\u689a\u6900\u6c4d\u6d63\u6db4\u6e7e\u6f6b\u7063\u70f7\u73a9\u7413\u742c\u7579\u7696\u76cc\u76f6\u774c\u7755\u7897\u7d08\u7d84\u7da9\u7db0\u7ea8\u7efe\u7feb\u8115\u8118\u8155\u8284\u839e\u83c0\u8416\u842c\u8442\u8513\u873f\u87c3\u8c4c\u8ca6\u8d0e\u8e20\u8f13\u92c4\u92d4\u933d\u93ab\u9794\u9811\u987d",
        "mo": "\u4e07\u5190\u5192\u5298\u52b0\u55fc\u561c\u563f\u569c\u56a4\u56a9\u56b0\u573d\u587b\u58a8\u59ba\u5aeb\u5afc\u5bde\u5e1e\u5e85\u6154\u61e1\u62b9\u62ba\u6469\u6478\u6479\u64f5\u65e0\u6629\u66af\u672b\u67ba\u6a21\u6a45\u6b7e\u6b7f\u6b81\u6c92\u6ca1\u6cab\u6e50\u6f20\u7121\u7205\u72e2\u734f\u763c\u768c\u771c\u773d\u7799\u781e\u78e8\u7933\u79e3\u7c96\u7ce2\u7e38\u7e86\u8031\u8108\u8109\u819c\u8309\u8388\u83ab\u842c\u84e6\u85e6\u8611\u86e8\u87d4\u8847\u88b9\u899b\u8b28\u8b29\u8c1f\u8c83\u8c89\u8c8a\u8c98\u9286\u93cc\u9546\u964c\u9722\u977a\u9786\u9943\u995d\u998d\u9a40\u9acd\u9b15\u9b54\u9b69\u9ebc\u9ebd\u9ed8\u9ed9",
        "zhang": "\u4e08\u4ec9\u4ed7\u50bd\u50df\u514f\u5887\u5adc\u5d82\u5e10\u5e33\u5e5b\u5f20\u5f35\u5f63\u5f70\u615e\u6259\u638c\u66b2\u6756\u6a1f\u6da8\u6db1\u6f32\u6f33\u7350\u748b\u75ee\u762c\u7634\u7795\u7903\u7ae0\u7c80\u80c0\u8139\u8501\u87d1\u8cec\u8d26\u9067\u9123\u9577\u9578\u957f\u969c\u979d\u9926\u9a3f\u9c46\u9e9e",
        "san": "\u4e09\u4ed0\u4f1e\u4f61\u4fd5\u5098\u53c1\u53c3\u53c4\u5607\u5f0e\u6515\u6563\u6bf5\u6bff\u7299\u7cc1\u7cc2\u7cdd\u7ce3\u7ce4\u7e56\u93fe\u9401\u9590\u9730\u994a\u9993\u9b16",
        "ji": "\u4e0c\u4e2e\u4e69\u4e9f\u4ebc\u4f0b\u4f0e\u4f76\u5048\u506e\u5176\u517e\u5180\u51e0\u51fb\u5209\u520f\u5242\u525e\u5264\u5291\u52e3\u5359\u5373\u537d\u53ca\u53dd\u53fd\u5403\u5409\u54ad\u54dc\u5527\u559e\u55d8\u5630\u568c\u573e\u5756\u578d\u57fa\u5832\u5848\u5849\u588d\u58bc\u5947\u5980\u5993\u59de\u59eb\u59ec\u5ac9\u5b63\u5bc2\u5bc4\u5c10\u5c45\u5c50\u5c8c\u5cdc\u5d46\u5d47\u5d74\u5daf\u5df1\u5e7e\u5eb4\u5f50\u5f51\u5f76\u5fcc\u5fe3\u6025\u60b8\u60ce\u61fb\u621f\u6222\u6280\u6324\u638e\u63e4\u6483\u64a0\u64ca\u64e0\u64ee\u6589\u658a\u65e1\u65e2\u65e3\u66a8\u66c1\u671e\u671f\u673a\u6781\u6785\u689e\u68d8\u6956\u696b\u6975\u69c9\u6a0d\u6a5f\u6a76\u6a95\u6a9d\u6ab5\u6ac5\u6b1a\u6b9b\u6bc4\u6c72\u6cf2\u6d0e\u6d4e\u6e08\u6e52\u6f03\u6f08\u6f57\u6fc0\u6fc8\u6fdf\u7031\u7284\u72e4\u7391\u74a3\u74be\u7578\u757f\u75be\u75f5\u7608\u7620\u7658\u7660\u766a\u768d\u77a1\u77c2\u77f6\u78ef\u790f\u796d\u799d\u79a8\u79ef\u7a18\u7a29\u7a37\u7a3d\u7a44\u7a4a\u7a4d\u7a56\u7a67\u7ad2\u7b04\u7b08\u7b53\u7b95\u7bbf\u7c0a\u7c4d\u7cfb\u7d00\u7d1a\u7d66\u7d99\u7ddd\u7e3e\u7e4b\u7e6b\u7e7c\u7ea7\u7eaa\u7ed9\u7ee7\u7ee9\u7f09\u7f7d\u7f81\u7f87\u7f88\u8024\u802d\u807b\u808c\u810a\u818c\u81ee\u82a8\u82b0\u8360\u838b\u8401\u8415\u846a\u84ba\u84df\u84fb\u8507\u8540\u857a\u858a\u85ba\u85c9\u860e\u862e\u863b\u8640\u866e\u86e3\u874d\u878f\u87e3\u8871\u88da\u8900\u8940\u894b\u8989\u898a\u89ac\u89ca\u89d9\u89ed\u8a08\u8a18\u8a8b\u8ac5\u8b4f\u8b64\u8ba1\u8ba5\u8bb0\u8bd8\u8ceb\u8cf7\u8d4d\u8de1\u8dfb\u8dfd\u8e16\u8e50\u8e5f\u8e8b\u8eb8\u8f2f\u8f5a\u8f91\u8ff9\u90c6\u9212\u9288\u92a1\u9353\u93f6\u9416\u9447\u9459\u9645\u969b\u96ae\u96c6\u96de\u96e6\u96e7\u9701\u9719\u9735\u973d\u9769\u978a\u97bf\u97f2\u98e2\u9951\u9965\u9a0e\u9a65\u9aa5\u9afb\u9b3e\u9b55\u9b5d\u9b62\u9b86\u9bda\u9bfd\u9c02\u9c36\u9c3f\u9c40\u9c6d\u9c7e\u9c9a\u9cab\u9cee\u9d36\u9d4b\u9d8f\u9dba\u9dc4\u9e04\u9e21\u9e61\u9e82\u9f4c\u9f4d\u9f4e\u9f4f\u9f50\u9f51",
        "bu": "\u4e0d\u4f48\u52cf\u535c\u535f\u5498\u54fa\u57d4\u57d7\u57e0\u5821\u5cec\u5e03\u5eaf\u6016\u6091\u6355\u6357\u6661\u6b65\u6b68\u6b69\u735b\u74ff\u7bf0\u7c3f\u8379\u8500\u8514\u8865\u88dc\u900b\u90e8\u90f6\u91ad\u9208\u923d\u949a\u94b8\u9914\u9922\u9cea\u9d4f",
        "fou": "\u4e0d\u527b\u5426\u54f9\u6b95\u7d11\u7f36\u7f39\u7f3b\u7f58\u82a3\u88e6\u96ec\u9d00",
        "yu": "\u4e0e\u4e88\u4e8e\u4e90\u4f03\u4f1b\u4f59\u4fc1\u4fde\u4fe3\u4ffc\u504a\u50b4\u516a\u532c\u53de\u5401\u5539\u5585\u5590\u55a9\u55bb\u564a\u5673\u5704\u5709\u572b\u57df\u5809\u5823\u582c\u59a4\u59aa\u5a1b\u5a2f\u5a31\u5a80\u5ad7\u5b29\u5b87\u5bd3\u5bd9\u5c09\u5c7f\u5cea\u5cff\u5d33\u5d4e\u5d5b\u5d8e\u5dbc\u5ebd\u5ebe\u5f67\u5fa1\u5fec\u6086\u6087\u60d0\u6108\u6109\u611a\u617e\u61d9\u622b\u625c\u6275\u63c4\u6554\u6594\u659e\u65bc\u65df\u6631\u6745\u682f\u6859\u68db\u68dc\u68eb\u6940\u6961\u6970\u6986\u6af2\u6b0e\u6b1d\u6b24\u6b25\u6b32\u6b48\u6b5f\u6b76\u6bd3\u6bfa\u6d74\u6de2\u6de4\u6def\u6e14\u6e1d\u6e61\u6eea\u6f01\u6f4f\u6f9e\u6fa6\u706a\u7134\u715c\u71a8\u71cf\u71e0\u7229\u72f1\u72f3\u7344\u735d\u7389\u7397\u7399\u7419\u7440\u745c\u74b5\u756c\u756d\u7600\u7609\u7610\u7652\u76c2\u76d3\u776e\u77de\u7821\u7862\u7872\u7907\u7916\u791c\u7964\u79a6\u79b9\u79ba\u79d7\u7a22\u7a36\u7a65\u7a7b\u7a8a\u7aac\u7ab3\u7afd\u7b8a\u7bfd\u7c45\u7c5e\u7c72\u7ca5\u7cd3\u7d06\u7dce\u7df0\u7e58\u7ea1\u7f6d\u7fad\u7fbd\u8065\u807f\u8080\u80b2\u8174\u81fe\u8201\u8206\u8207\u8245\u828b\u828c\u831f\u8330\u83c0\u842d\u842e\u8438\u84ae\u84e3\u84f9\u851a\u854d\u8577\u8581\u860c\u861b\u865e\u8676\u871f\u872e\u8753\u87a4\u87b8\u8867\u88ac\u88d5\u8915\u89a6\u89ce\u8a89\u8a9e\u8adb\u8aed\u8b23\u8b7d\u8bed\u8c00\u8c15\u8c37\u8c6b\u8c90\u8e30\u8ec9\u8f0d\u8f3f\u8f5d\u8fc2\u8fc3\u9033\u903e\u9047\u9079\u9098\u90c1\u9103\u9105\u9151\u91a7\u91ea\u923a\u9289\u92ca\u9325\u935d\u942d\u94b0\u95be\u9608\u9683\u9685\u96a9\u96d3\u96e8\u96e9\u96fd\u9731\u9810\u9884\u98eb\u9918\u9947\u996b\u9980\u99ad\u9a1f\u9a48\u9a6d\u9aac\u9ac3\u9b30\u9b31\u9b3b\u9b4a\u9b5a\u9b63\u9bbd\u9c05\u9c7c\u9cff\u9d25\u9d2a\u9d4c\u9d52\u9de0\u9df8\u9e06\u9e12\u9e46\u9e6c\u9ee6\u9f6c\u9f75\u9f89",
        "mian": "\u4e0f\u4fdb\u506d\u514d\u5195\u52c9\u52d4\u5595\u5a29\u5a42\u5a94\u5b35\u5b80\u6110\u68c9\u6ab0\u6acb\u6c45\u6c94\u6e11\u6e4e\u6fa0\u7704\u7720\u77c8\u77ca\u77cf\u7cab\u7cc6\u7d7b\u7dbf\u7ddc\u7dec\u7ef5\u7f05\u817c\u81f1\u8287\u8752\u9762\u9763\u9766\u9bb8\u9eaa\u9eab\u9eb5\u9eba\u9efd\u9efe",
        "gai": "\u4e10\u4e62\u4f85\u5303\u5304\u5793\u59df\u5cd0\u5fcb\u6224\u6461\u6539\u653a\u6650\u6982\u69e9\u69ea\u6e89\u6f11\u74c2\u7561\u76d6\u7974\u7d60\u80f2\u82a5\u8344\u84cb\u8a72\u8be5\u8c65\u8cc5\u8ccc\u8d45\u90c2\u9223\u9499\u9654\u9691\u9b6a",
        "chou": "\u4e11\u4e12\u4ec7\u4fb4\u4fe6\u5114\u541c\u568b\u5a64\u5b26\u5e31\u5e6c\u60c6\u6101\u61b1\u61e4\u62bd\u640a\u677b\u677d\u6826\u6906\u6ba0\u71fd\u72a8\u72ab\u7574\u7587\u7633\u7697\u7785\u77c1\u7a20\u7b79\u7bd8\u7c4c\u7d2c\u7d52\u7da2\u7ef8\u81ed\u81f0\u83a5\u83d7\u85b5\u88ef\u8a76\u8b8e\u8b90\u8e0c\u8e8a\u9167\u916c\u919c\u91bb\u96d4\u96e0\u970c\u9714\u9b57\u9bc8",
        "zhuan": "\u4e13\u4f20\u50b3\u50ce\u5278\u53c0\u556d\u56c0\u581f\u587c\u5ae5\u5c02\u5c08\u64b0\u6c8c\u7077\u7451\u747c\u750e\u7816\u78da\u7af1\u7bc6\u7bff\u7c51\u7e33\u8011\u815e\u819e\u8483\u87e4\u8948\u8b54\u8cfa\u8d03\u8d5a\u8ee2\u8f49\u8f6c\u911f\u9853\u989b\u994c\u9994\u9c44\u9dd2",
        "qie": "\u4e14\u4f3d\u5207\u5327\u5951\u59be\u602f\u608f\u60ec\u611c\u614a\u6308\u6705\u6d2f\u6dc1\u767f\u780c\u7a55\u7a83\u7aca\u7b21\u7ba7\u7bcb\u8304\u85d2\u86ea\u8d84\u8e25\u90c4\u9365\u9532\u9bdc",
        "ju": "\u4e14\u4e3e\u4f62\u4fb7\u4ff1\u5028\u5036\u5177\u51e5\u521f\u5267\u5287\u52ee\u530a\u53e5\u5480\u57e7\u57fe\u58c9\u59d6\u5a35\u5a45\u5be0\u5c40\u5c45\u5c66\u5c68\u5ca0\u5d0c\u5dc8\u5de8\u5f06\u6007\u601a\u60e7\u6133\u61fc\u6285\u62d2\u62d8\u62e0\u6319\u6336\u636e\u63ac\u63df\u64da\u64e7\u65aa\u661b\u67b8\u67dc\u6854\u68ae\u6907\u6908\u6910\u6940\u6989\u6998\u6a58\u6a8b\u6ac3\u6af8\u6b05\u6b6b\u6be9\u6bf1\u6cae\u6cc3\u6ce6\u6d30\u6dba\u6dd7\u6e68\u6fbd\u70ac\u7117\u7123\u728b\u7291\u72ca\u72d9\u741a\u75bd\u75c0\u7717\u77bf\u77e9\u79ec\u7aad\u7ab6\u7abc\u7ad8\u7b65\u7ba4\u7c34\u7c94\u7cb7\u7d47\u7f5d\u801f\u805a\u8152\u8209\u824d\u82e3\u82f4\u8392\u83ca\u8445\u849f\u861c\u8661\u86b7\u86c6\u871b\u877a\u8893\u88fe\u8a4e\u8aca\u8bb5\u8c97\u8d84\u8d9c\u8db3\u8dd4\u8dd9\u8ddd\u8dfc\u8e18\u8e19\u8e1e\u8e3d\u8e6b\u8e86\u8eb9\u8eca\u8f02\u8f0b\u8f66\u907d\u90ad\u90f9\u9113\u91b5\u9245\u92e6\u92f8\u943b\u949c\u9514\u952f\u9671\u96ce\u97a0\u97ab\u98b6\u98d3\u99cf\u99d2\u99f6\u9a67\u9a79\u9b88\u9b94\u9bfa\u9d02\u9d21\u9d59\u9d74\u9d8b\u9daa\u9f33\u9f5f\u9f83",
        "pi": "\u4e15\u4ef3\u4f3e\u50fb\u5288\u5339\u5421\u5426\u5564\u567c\u567d\u568a\u56ad\u572e\u574f\u576f\u57e4\u58c0\u58ca\u58de\u5ab2\u5ad3\u5c41\u5d25\u5e80\u600c\u6036\u61b5\u6279\u62ab\u62b7\u63ca\u64d7\u65c7\u6707\u6787\u6911\u6bd7\u6bd8\u6bde\u6de0\u6e12\u6f4e\u6fbc\u708b\u7137\u72a4\u72c9\u72d3\u7308\u73ad\u7435\u7513\u758b\u75b2\u75de\u7656\u76ae\u7764\u7765\u7812\u78c7\u7914\u7915\u79db\u79e0\u7b13\u7d15\u7eb0\u7f74\u7f77\u7f86\u7fcd\u801a\u80b6\u8134\u813e\u8157\u818d\u8298\u82c9\u85e3\u868d\u86bd\u8731\u87b7\u882f\u88ab\u88e8\u8ac0\u8b6c\u8c7c\u8c7e\u8c94\u8f9f\u90b3\u90eb\u91fd\u921a\u9239\u925f\u9294\u930d\u94cd\u95e2\u9630\u9642\u9674\u96a6\u9739\u99d3\u9aec\u9af2\u9b6e\u9b7e\u9b8d\u9c8f\u9d04\u9dff\u9e0a\u9f19",
        "shi": "\u4e16\u4e17\u4e68\u4e6d\u4e8a\u4e8b\u4ec0\u4ed5\u4f3c\u4f40\u4f7f\u4f8d\u5158\u5159\u519f\u52bf\u52e2\u5319\u5341\u534b\u5376\u53d3\u53f2\u545e\u5469\u55b0\u55dc\u5618\u5653\u566c\u57d8\u5852\u58eb\u5931\u596d\u59cb\u5a9e\u5b15\u5b9e\u5b9f\u5ba4\u5ba9\u5bd4\u5be6\u5c04\u5c38\u5c4d\u5c4e\u5cd5\u5cd9\u5d3c\u5e02\u5e08\u5e2b\u5f0f\u5f11\u5f12\u5fa5\u6043\u6220\u623a\u62ed\u62fe\u63d0\u63d3\u65bd\u65f6\u65f9\u662f\u6630\u6642\u67be\u67f9\u67ff\u69af\u6b96\u6c0f\u6d49\u6e41\u6e5c\u6e64\u6e7f\u6ea1\u6eae\u6ebc\u6fa8\u6fd5\u70bb\u70d2\u72ee\u7345\u7702\u770e\u7757\u77e2\u77f3\u78a9\u793a\u793b\u794f\u7acd\u7ad5\u7b36\u7b6e\u7bb7\u7c2d\u7d41\u7fe8\u8210\u8213\u83b3\u8479\u8492\u8494\u84cd\u8671\u8680\u8755\u8768\u8784\u87ab\u884b\u8906\u8937\u896b\u8979\u8996\u89c6\u8a4d\u8a66\u8a69\u8a93\u8adf\u8ae1\u8b1a\u8b58\u8bc6\u8bd5\u8bd7\u8c25\u8c55\u8cb0\u8d33\u8de9\u8efe\u8f7c\u9002\u901d\u9048\u9069\u907e\u90bf\u917e\u91c3\u91c8\u91ca\u91cb\u921f\u9230\u9242\u9243\u9250\u927d\u92b4\u92ec\u94c8\u98df\u98e0\u98fe\u9919\u991d\u9963\u9970\u99db\u9a76\u9bf4\u9c23\u9c24\u9ca5\u9cba\u9cf2\u9cfe\u9db3\u9e24\u9f2b\u9f2d\u9f5b",
        "qiu": "\u4e18\u4e20\u4e80\u4ec7\u4fc5\u5062\u50cb\u53b9\u53f4\u56da\u5775\u5a9d\u5d37\u5def\u5df0\u6058\u624f\u641d\u6739\u6882\u6978\u6b8f\u6bec\u6c42\u6c53\u6cc5\u6d57\u6e1e\u6e6b\u716a\u72b0\u738c\u7403\u7486\u76b3\u76da\u79cb\u79cc\u7a50\u7bcd\u7cd7\u7d0c\u7d7f\u7de7\u808d\u8119\u82ec\u838d\u8429\u84f2\u866c\u866f\u86af\u86f7\u8764\u8775\u87d7\u8824\u88d8\u89e9\u8a04\u8a05\u8cd5\u8d47\u8da5\u900e\u9011\u9052\u90b1\u914b\u9194\u91da\u92b6\u97a6\u97a7\u9b82\u9bc4\u9c0c\u9c0d\u9c3d\u9c43\u9cc5\u9d96\u9e59\u9f9c\u9f9d\u9f9f",
        "bing": "\u4e19\u4e26\u4ecc\u4f75\u5002\u504b\u50a1\u5175\u51ab\u51b0\u5bce\u5c4f\u5e76\u5e77\u5eb0\u6032\u62a6\u63a4\u6452\u661e\u663a\u67c4\u681f\u6824\u68b9\u68c5\u69df\u6ab3\u6c37\u70b3\u7415\u75c5\u772a\u7980\u79c9\u7a1f\u7a89\u7add\u82ea\u86c3\u90b4\u9235\u927c\u9643\u9750\u979e\u9905\u9920\u997c\u9ba9\u9d67",
        "ye": "\u4e1a\u4e5f\u4eb1\u503b\u505e\u50f7\u51b6\u53f6\u5414\u54bd\u54d7\u5622\u5629\u564e\u57dc\u58b7\u58c4\u591c\u5c04\u5ceb\u5daa\u5dab\u5fe6\u62fd\u6353\u6396\u63f6\u64db\u64e8\u64ea\u64eb\u6654\u66c4\u66c5\u66d7\u66f3\u67bc\u6930\u696d\u6b97\u6b9c\u6db2\u6f1c\u6fb2\u70e8\u7160\u71c1\u7237\u723a\u740a\u7458\u76a3\u77b1\u77b8\u8036\u814b\u8449\u882e\u8b01\u8c12\u90aa\u90ba\u9134\u91ce\u91fe\u92e3\u9371\u9381\u9391\u9437\u94d8\u9765\u9768\u9801\u9875\u9923\u9941\u998c\u9a5c\u9d7a\u9e08",
        "cong": "\u4e1b\u4ece\u5306\u53e2\u56ea\u56f1\u5a43\u5b6e\u5f93\u5f96\u5f9e\u60a4\u60b0\u6152\u66b0\u679e\u68c7\u6a05\u6a2c\u6a37\u6b09\u6dd9\u6f0e\u6f17\u6f40\u7047\u7127\u719c\u71ea\u721c\u742e\u747d\u7481\u779b\u7bf5\u7e71\u8061\u8066\u806a\u8070\u82c1\u8471\u84ef\u8525\u85c2\u87cc\u8ab4\u8b25\u8ce8\u8ce9\u931d\u9350\u93e6\u9a18\u9a44\u9aa2",
        "dong": "\u4e1c\u4f97\u5032\u50cd\u51ac\u51bb\u51cd\u52a8\u52d5\u549a\u578c\u57ec\u58a5\u5a3b\u5b1e\u5cbd\u5cd2\u5d20\u5d2c\u606b\u61c2\u6219\u630f\u6638\u6771\u680b\u68df\u6c21\u6c2d\u6d1e\u6db7\u70b5\u7850\u7b17\u7bbd\u80e8\u80f4\u8156\u82f3\u83c4\u8463\u8740\u9718\u99e7\u9bdf\u9d87\u9e2b\u9f15",
        "si": "\u4e1d\u4e96\u4f3a\u4f3c\u4f40\u4fdf\u4fec\u5072\u5129\u5155\u51d8\u5395\u53a0\u53ae\u53b6\u53b7\u53f8\u549d\u55b0\u55e3\u5636\u565d\u56db\u59d2\u5a30\u5aa4\u5b60\u5bfa\u5df3\u5edd\u601d\u6056\u6495\u65af\u676b\u67f6\u6952\u69b9\u6b7b\u6c5c\u6cc0\u6cd7\u6ce4\u6d0d\u6d98\u6f8c\u7003\u71cd\u726d\u78c3\u7940\u7997\u79a9\u79c1\u7ae1\u7ae2\u7b25\u7d72\u7de6\u7f0c\u7f73\u801c\u8082\u8086\u856c\u857c\u86f3\u8724\u8784\u87d6\u87f4\u8997\u8b15\u8c84\u8cdc\u91f2\u923b\u9270\u92d6\u9376\u9536\u98b8\u98d4\u98df\u98e0\u98e4\u98fc\u9963\u9972\u99df\u9a26\u9a77\u9de5\u9e36\u9f36",
        "cheng": "\u4e1e\u4e57\u4e58\u4fb1\u5041\u5448\u564c\u57ce\u57d5\u57e5\u5818\u584d\u5856\u5863\u5a0d\u5bac\u5cf8\u5d1d\u5eb1\u5f8e\u609c\u60e9\u6186\u6195\u61f2\u6210\u627f\u6330\u6381\u63e8\u645a\u6490\u6491\u665f\u67a8\u67fd\u68d6\u68e6\u6909\u6a55\u6a59\u6a89\u6cdf\u6d06\u6d7e\u6f82\u6f84\u7013\u725a\u725c\u73f5\u73f9\u7424\u757b\u76db\u7748\u77a0\u79e4\u79f0\u7a0b\u7a31\u7a6a\u7a9a\u7ac0\u7b6c\u7d7e\u7dfd\u8100\u812d\u837f\u86cf\u87f6\u88ce\u8aa0\u8bda\u8d6a\u8d6c\u901e\u90d5\u9172\u92ee\u93ff\u943a\u94d6\u94db\u9637\u9757\u9819\u9833\u9953\u9a01\u9a2c\u9a8b",
        "diu": "\u4e1f\u4e22\u4e63\u92a9\u94e5",
        "liang": "\u4e21\u4e24\u4eae\u4fe9\u5006\u501e\u5169\u51c9\u54f4\u5521\u5562\u55a8\u589a\u60a2\u639a\u667e\u6881\u690b\u6a11\u6dbc\u6e78\u7c17\u7cae\u7cb1\u7ce7\u7da1\u7dc9\u813c\u826f\u83a8\u873d\u88f2\u8ad2\u8c05\u8e09\u8f0c\u8f1b\u8f2c\u8f86\u8f8c\u91cf\u9344\u9753\u975a\u99fa\u9b49\u9b4e",
        "you": "\u4e23\u4eb4\u4f18\u4f51\u4f91\u5064\u512a\u5363\u53c8\u53cb\u53f3\u5466\u54ca\u5500\u5698\u56ff\u59f7\u5ba5\u5c22\u5c23\u5c24\u5cb0\u5cdf\u5cf3\u5e7c\u5e7d\u5eae\u5fe7\u6023\u602e\u60a0\u6182\u61ee\u6538\u65bf\u6709\u67da\u6884\u6962\u69f1\u6acc\u6afe\u6c8b\u6cb9\u6cd1\u6d5f\u6e38\u6e75\u6efa\u7000\u7256\u7270\u72b9\u72d6\u7336\u7337\u7531\u75a3\u7950\u7989\u79de\u7cff\u7e47\u7e8b\u7f90\u7f91\u8030\u8048\u80ac\u811c\u82c3\u839c\u83a0\u83a4\u83b8\u8555\u86b0\u86b4\u870f\u8763\u8764\u8a27\u8a98\u8bf1\u8c81\u8f0f\u8f36\u8ff6\u900c\u9030\u904a\u908e\u90ae\u90f5\u913e\u9149\u916d\u91c9\u923e\u92aa\u94c0\u94d5\u99c0\u9b77\u9b8b\u9c7f\u9c89\u9d22\u9e80\u9edd\u9f2c",
        "yan": "\u4e25\u4e75\u4fe8\u5043\u5050\u5063\u50bf\u513c\u5156\u5157\u5261\u5266\u533d\u538c\u53a3\u53ad\u53b3\u53b4\u54bd\u5501\u5571\u55ad\u565e\u5688\u56a5\u56b4\u5724\u5830\u5869\u5895\u58b1\u58db\u58e7\u5935\u5944\u598d\u599f\u59f2\u59f6\u59f8\u5a2b\u5a2e\u5a69\u5ae3\u5b0a\u5b2e\u5b3f\u5b4d\u5bb4\u5ca9\u5d26\u5d43\u5d52\u5d53\u5d96\u5dcc\u5dd6\u5dd7\u5dd8\u5dda\u5ef6\u5f07\u5f65\u5f66\u6079\u60d4\u611d\u61d5\u61e8\u622d\u624a\u6281\u63a9\u63c5\u63dc\u6565\u6616\u664f\u66a5\u66e3\u66ee\u68ea\u693b\u693c\u694c\u6a90\u6abf\u6ae9\u6bb7\u6c87\u6cbf\u6df9\u6e30\u6e37\u6e6e\u6e7a\u6edf\u6f14\u6f39\u704e\u7054\u7067\u7069\u708e\u70df\u7109\u7114\u7130\u7131\u7138\u7159\u71c4\u71d5\u7213\u7217\u726a\u72ff\u7312\u73da\u7402\u7430\u7517\u764c\u76d0\u773c\u7814\u781a\u784f\u786f\u787d\u789e\u7939\u7b75\u7bf6\u7c37\u7d96\u7f68\u80ed\u814c\u81d9\u8273\u8276\u8277\u82ab\u839a\u83f8\u8412\u8455\u8505\u8664\u8712\u8758\u884d\u88fa\u8917\u898e\u89c3\u89fe\u8a00\u8a01\u8a7d\u8afa\u8b8c\u8b9e\u8ba0\u8c1a\u8c33\u8c53\u8c54\u8d0b\u8d17\u8d5d\u8ebd\u9043\u90d4\u90fe\u9122\u9140\u9153\u917d\u9183\u91b6\u91bc\u91c5\u9206\u925b\u94c5\u9586\u95b0\u95b9\u95bb\u95bc\u95eb\u9609\u960e\u960f\u963d\u9681\u9692\u96c1\u9843\u984f\u9854\u989c\u990d\u995c\u99a3\u9a10\u9a13\u9a34\u9a57\u9a60\u9a8c\u9b47\u9b58\u9c0b\u9ceb\u9d08\u9d33\u9da0\u9dc3\u9df0\u9e7d\u9e99\u9ea3\u9ee1\u9ee4\u9eed\u9ef6\u9f34\u9f39\u9f3d\u9f91",
        "sang": "\u4e27\u55aa\u55d3\u6421\u67bd\u6851\u6852\u78c9\u892c\u939f\u9859\u98a1",
        "shu": "\u4e28\u4e66\u4fb8\u4fde\u500f\u5010\u5135\u516a\u51c1\u53d4\u5715\u57f1\u587e\u5885\u59dd\u5a4c\u5b70\u5c0c\u5c17\u5c5e\u5c6c\u5eb6\u5ebb\u6055\u620d\u6292\u6352\u6393\u6445\u6474\u6504\u6570\u6578\u6691\u66d9\u66f8\u672f\u675f\u6778\u67a2\u6811\u68b3\u6a17\u6a1c\u6a1e\u6a39\u6a7e\u6b8a\u6bb3\u6bf9\u6cad\u6dd1\u6f31\u6f44\u6f7b\u6f8d\u6fd6\u7102\u719f\u74b9\u758b\u758e\u758f\u7659\u794b\u79eb\u7ad6\u7aea\u7cec\u7d13\u7d49\u7d80\u7ebe\u7f72\u7fdb\u8167\u8212\u83fd\u8481\u852c\u85a5\u85af\u85f2\u85f7\u866a\u8700\u8853\u88cb\u8961\u8969\u8c4e\u8d16\u8d4e\u8dfe\u8e08\u8ed7\u8f38\u8f93\u8ff0\u9265\u9330\u93e3\u9483\u964e\u97e3\u9d68\u9d90\u9e00\u9ecd\u9f20\u9f21",
        "jiu": "\u4e29\u4e45\u4e46\u4e5d\u50e6\u52fc\u5313\u531b\u5336\u53a9\u548e\u557e\u597a\u5aa8\u5c31\u5ec4\u5ecf\u5ed0\u6166\u6344\u63c2\u63ea\u63eb\u6551\u65e7\u673b\u67e9\u67fe\u6855\u6a1b\u6e6b\u7078\u725e\u7396\u759a\u7a76\u7cfa\u7cfe\u7d24\u7ea0\u81fc\u8205\u820a\u820f\u841b\u89d3\u8d73\u8f47\u9152\u9579\u9604\u97ed\u97ee\u9b0f\u9b2e\u9be6\u9ce9\u9df2\u9e20\u9e6b\u9e94\u9f68",
        "ge": "\u4e2a\u4ee1\u4f6e\u500b\u5272\u530c\u5404\u5408\u5444\u54af\u54e5\u54ff\u55dd\u55f0\u572a\u5865\u5c79\u6105\u6208\u6213\u6228\u630c\u6401\u643f\u64d6\u64f1\u6546\u654b\u683c\u69c5\u6b4c\u6e2e\u6ed2\u7366\u7599\u76d6\u784c\u7b34\u7b87\u7d07\u7ea5\u8090\u80f3\u8188\u81f5\u8238\u8316\u845b\u8462\u84cb\u867c\u86d2\u86e4\u88bc\u88d3\u89e1\u8afd\u8b0c\u8f35\u8f55\u927b\u9398\u93b6\u94ec\u9549\u95a3\u95a4\u9601\u9694\u9769\u97b7\u97d0\u97da\u988c\u9a14\u9abc\u9b32\u9b7a\u9baf\u9c2a\u9d1a\u9d3f\u9dae\u9e3d\u9ea7\u9f43",
        "ya": "\u4e2b\u4e9a\u4e9c\u4e9e\u4f22\u4ff9\u529c\u5339\u538a\u538b\u5393\u5440\u54d1\u5516\u555e\u5720\u5727\u57ad\u57e1\u5810\u58d3\u5a05\u5a6d\u5b72\u5c88\u5d15\u5d16\u5e8c\u5e98\u62bc\u631c\u6397\u63e0\u6792\u6860\u690f\u6c29\u6c2c\u6daf\u6f04\u7146\u7259\u72bd\u731a\u7330\u73a1\u740a\u758b\u75d6\u7602\u775a\u77a7\u7811\u7a0f\u7aab\u7b0c\u8050\u82bd\u8565\u869c\u8859\u897e\u8a1d\u8bb6\u8c3a\u8ecb\u8f67\u8fd3\u930f\u94d4\u96c3\u96c5\u9d09\u9d28\u9d76\u9e26\u9e2d\u9f56\u9f7e",
        "qiang": "\u4e2c\u50b8\u50b9\u52e5\u545b\u5534\u55c6\u588f\u5899\u58bb\u5af1\u5b19\u5c06\u5c07\u5d88\u5ee7\u5f1c\u5f37\u5f3a\u5f4a\u6215\u6217\u6227\u62a2\u6436\u65a8\u67aa\u690c\u69cd\u6a2f\u6aa3\u6eac\u6f12\u709d\u7197\u723f\u7244\u7246\u7310\u73b1\u7437\u7472\u77fc\u78e2\u7bec\u7e48\u7e66\u7f8c\u7f97\u7f9f\u7fa5\u7fab\u7fbb\u8154\u8262\u8503\u8537\u8594\u8620\u8723\u8941\u8b12\u8dc4\u8e4c\u8e61\u8ed6\u9306\u9397\u93d8\u93f9\u9453\u9516\u9535\u956a",
        "pan": "\u4e2c\u51b8\u5224\u53db\u5643\u5762\u5964\u5abb\u5e4b\u6273\u62da\u642b\u6500\u69c3\u6c9c\u6cee\u6ebf\u6f58\u700a\u708d\u723f\u7249\u7554\u7568\u756a\u76d8\u76e4\u76fc\u7705\u7819\u78d0\u78fb\u7e0f\u80d6\u822c\u84b0\u87e0\u88a2\u897b\u8a4a\u8dd8\u8e2b\u8e52\u8e63\u939c\u947b\u97b6\u9804\u9816",
        "zhong": "\u4e2d\u4e51\u4ef2\u4f00\u4f17\u5045\u51a2\u5223\u55a0\u57eb\u5839\u585a\u5990\u5995\u5a91\u5c30\u5e52\u5f78\u5fe0\u5fea\u67ca\u6b71\u6c77\u6cc8\u6e69\u6f68\u7082\u7144\u72c6\u7607\u76c5\u773e\u79cd\u7a2e\u7b57\u7c66\u7d42\u7ddf\u7ec8\u80bf\u816b\u822f\u833d\u8520\u869b\u87bd\u8846\u8873\u8876\u8877\u8ae5\u8e35\u8e71\u91cd\u9221\u92bf\u937e\u9418\u949f\u953a\u9d24",
        "jie": "\u4e2f\u4ecb\u4ef7\u4fa1\u501f\u5022\u5048\u5055\u507c\u5091\u5226\u5227\u523c\u52ab\u52bc\u5369\u536a\u5424\u5536\u5551\u5588\u55bc\u55df\u5826\u583a\u59d0\u5a55\u5a8e\u5b51\u5bb6\u5c46\u5c4a\u5c8a\u5c95\u5d28\u5d51\u5d65\u5dc0\u5e6f\u5e8e\u5fa3\u6088\u6212\u622a\u62ee\u6377\u63a5\u63b2\u63e4\u63ed\u6429\u64d1\u64f3\u6605\u6770\u6840\u6854\u6904\u6950\u696c\u6976\u6977\u69a4\u6adb\u6aed\u6d01\u6d2f\u6e5d\u6ed0\u6f54\u7004\u7297\u72b5\u73a0\u743e\u754c\u754d\u7596\u75a5\u75ce\u7664\u7686\u776b\u780e\u78a3\u7974\u79f8\u7a2d\u7aed\u7bc0\u7d12\u7d50\u7d5c\u7dc1\u7df3\u7e72\u7ed3\u7faf\u813b\u8149\u8265\u8282\u82a5\u83ad\u83e8\u84f5\u85c9\u86a7\u8710\u8754\u8818\u881e\u883d\u8857\u8871\u88ba\u892f\u89e3\u89e7\u8a10\u8a70\u8aa1\u8ab1\u8ba6\u8bd8\u8beb\u8d8c\u8e15\u8ea4\u8ffc\u9263\u937b\u9385\u9411\u9636\u968e\u9821\u9889\u98f7\u9a14\u9ab1\u9b40\u9b9a\u9c92\u9d9b",
        "feng": "\u4e30\u4ef9\u4ff8\u5051\u50fc\u51af\u51e4\u51e8\u51ec\u51ee\u552a\u5838\u5906\u5949\u59a6\u5bf7\u5c01\u5cef\u5cf0\u5d36\u6340\u6453\u67ab\u687b\u6953\u6a92\u6ca3\u6ca8\u6d72\u6e22\u6e57\u6f28\u7043\u70fd\u7128\u7148\u71a2\u728e\u7326\u75af\u760b\u76fd\u781c\u78b8\u7bc8\u7d98\u7e2b\u7f1d\u8242\u8391\u8451\u8634\u8702\u882d\u8982\u8af7\u8bbd\u8c4a\u8c50\u8cf5\u8d57\u9022\u9137\u9146\u92d2\u93e0\u950b\u974a\u98a8\u98cc\u98ce\u99ae\u9cef\u9cf3\u9d0c\u9eb7",
        "guan": "\u4e31\u500c\u5173\u51a0\u550d\u5715\u5b98\u60b9\u60ba\u60ef\u6163\u63bc\u645c\u68fa\u6a0c\u6bcc\u6cf4\u6dab\u6f45\u704c\u721f\u742f\u74d8\u75ef\u761d\u764f\u76e5\u77d4\u77dc\u7936\u797c\u7b66\u7ba1\u7db8\u7eb6\u7f46\u7f50\u8218\u839e\u8484\u898c\u89b3\u89c0\u89c2\u8b34\u8cab\u8d2f\u8f28\u9066\u9327\u93c6\u9475\u95a2\u95d7\u95dc\u96da\u9928\u9986\u9c25\u9c5e\u9c79\u9ccf\u9ce4\u9e1b\u9e73",
        "chuan": "\u4e32\u4f20\u50b3\u50e2\u524f\u5598\u583e\u5ddb\u5ddd\u66b7\u693d\u6b42\u6c1a\u6c4c\u7240\u7394\u744f\u7a7f\u7a93\u7bc5\u821b\u8221\u8229\u8239\u8348\u8aef\u8cd7\u8f32\u9044\u91e7\u9409\u948f",
        "chan": "\u4e33\u4ea7\u50dd\u5133\u5181\u522c\u5257\u5277\u5296\u5355\u5358\u5574\u55ae\u563d\u56b5\u56c5\u58e5\u5a75\u5b0b\u5b13\u5b68\u5b71\u5d7c\u5dc9\u5e5d\u5edb\u5fcf\u60c9\u61f4\u61fa\u63ba\u6400\u644c\u647b\u6519\u65f5\u68b4\u68ce\u6b03\u6bda\u6d50\u6e79\u6efb\u6f79\u6f7a\u6fb6\u700d\u703a\u705b\u7158\u71c0\u7351\u7522\u7523\u785f\u78db\u7985\u79aa\u7c05\u7dfe\u7e5f\u7e75\u7e8f\u7e92\u7f20\u7fbc\u826c\u8487\u8546\u8749\u87ec\u87fe\u88a9\u895c\u8998\u89c7\u8a97\u8ac2\u8b42\u8b87\u8b92\u8c04\u8c17\u8e94\u8fbf\u913d\u9141\u92cb\u92d3\u93df\u9414\u9471\u94f2\u9561\u9575\u95b3\u95e1\u9610\u97c2\u986b\u98a4\u995e\u998b\u9aa3",
        "lin": "\u4e34\u4e83\u50ef\u51db\u51dc\u53b8\u541d\u5549\u58e3\u5d99\u5ee9\u5eea\u6061\u608b\u60cf\u61cd\u61d4\u62ce\u649b\u65b4\u667d\u66bd\u6797\u6a49\u6a81\u6aa9\u6dcb\u6f7e\u6f9f\u7036\u711b\u71d0\u735c\u7433\u7498\u7510\u7584\u75f3\u765b\u765d\u77b5\u77dd\u7884\u78f7\u79d8\u7b96\u7ca6\u7cbc\u7d9d\u7e57\u7f67\u7ff7\u81a6\u81e8\u83fb\u853a\u85fa\u8cc3\u8d41\u8e78\u8e8f\u8e99\u8eaa\u8f54\u8f65\u8f9a\u9074\u90bb\u9130\u93fb\u95b5\u96a3\u9716\u9a4e\u9c57\u9cde\u9e90\u9e9f",
        "zhuo": "\u4e35\u502c\u5262\u5285\u5353\u5544\u5545\u5734\u5f74\u62d9\u6349\u64af\u64c6\u64e2\u6580\u65ab\u65ae\u65b1\u65b2\u65b5\u666b\u684c\u68b2\u68c1\u68f3\u68f9\u6913\u69d5\u6c4b\u6cce\u6d4a\u6d5e\u6dbf\u6fc1\u6fef\u7042\u707c\u70aa\u70f5\u712f\u7422\u7438\u7740\u787a\u799a\u7a5b\u7be7\u7c71\u7e73\u7f34\u7f6c\u8301\u8457\u8743\u8817\u8ad1\u8b36\u8bfc\u914c\u92dc\u9323\u942f\u9432\u956f\u9ddf",
        "zhu": "\u4e36\u4e3b\u4f2b\u4f47\u4f4f\u4f8f\u529a\u52a9\u52af\u5631\u56d1\u577e\u58f4\u5b4e\u5c5e\u5c6c\u5d40\u62c4\u65b8\u672e\u672f\u6731\u677c\u67f1\u67f7\u682a\u69e0\u6a26\u6a65\u6ae1\u6ae7\u6aeb\u6b18\u6bb6\u6ce8\u6d19\u6e1a\u6f74\u6fd0\u7026\u705f\u70a2\u70b7\u70db\u7151\u716e\u71ed\u7225\u732a\u73e0\u75b0\u7603\u771d\u77a9\u77da\u782b\u7843\u795d\u7969\u79fc\u7a8b\u7ada\u7af9\u7afa\u7b01\u7b1c\u7b51\u7b6f\u7bb8\u7bc9\u7beb\u7d35\u7d38\u7d51\u7ebb\u7f5c\u7f9c\u7fe5\u8233\u82a7\u82ce\u82e7\u8331\u833f\u8387\u8457\u84eb\u85f7\u85f8\u86c0\u86db\u876b\u880b\u8829\u883e\u8853\u88be\u891a\u89f0\u8a3b\u8a5d\u8a85\u8ad4\u8af8\u8bdb\u8bf8\u8c6c\u8caf\u8d2e\u8d89\u8dd3\u8e85\u8ef4\u8ef8\u9010\u90be\u9252\u9296\u92f3\u9444\u94e2\u94f8\u967c\u98f3\u99b5\u99d0\u9a7b\u9ba2\u9c41\u9d38\u9e86\u9e88\u9f04",
        "dian": "\u4e36\u4f43\u508e\u5178\u53a7\u56b8\u576b\u57ab\u588a\u58c2\u594c\u5960\u5a5d\u5a70\u5d6e\u5dc5\u5dd3\u5dd4\u5e97\u60e6\u6242\u6382\u6527\u6541\u655f\u69c7\u69d9\u6a42\u6bbf\u6dc0\u6ec7\u6fb1\u70b9\u73b7\u7414\u7420\u7535\u7538\u75c1\u7628\u765c\u766b\u7672\u7898\u78f9\u7c1f\u8547\u8714\u8e2e\u8e4e\u923f\u932a\u94bf\u963d\u96fb\u975b\u985a\u985b\u98a0\u9ede\u9f7b",
        "dan": "\u4e39\u4e3c\u4eb6\u4f46\u50e4\u510b\u5210\u52ef\u5330\u5355\u5358\u5556\u5557\u557f\u55ae\u563e\u5649\u56aa\u5989\u5a85\u5e0e\u5e68\u5f39\u5f3e\u5f48\u60ee\u619a\u61ba\u62c5\u63b8\u64a2\u64a3\u64d4\u65e6\u66ba\u67e6\u6b9a\u6bab\u6c2e\u6c8a\u6cf9\u6de1\u6f6c\u6fb8\u6fb9\u7057\u72da\u73ac\u74ed\u7514\u758d\u75b8\u7605\u7649\u765a\u7708\u77f3\u7803\u7a9e\u7baa\u7c1e\u7d1e\u803c\u803d\u8043\u8078\u80c6\u8145\u81bd\u8215\u840f\u86cb\u8711\u8874\u894c\u89db\u8a95\u8bde\u8ce7\u8d55\u8ead\u90f8\u9132\u9156\u972e\u9815\u994f\u99be\u99f3\u9ae7\u9d20\u9ef5",
        "wei": "\u4e3a\u4eb9\u4f1f\u4f2a\u4f4d\u5049\u504e\u507d\u50de\u5130\u536b\u5371\u5473\u552f\u5582\u55a1\u55b4\u56d7\u56f2\u56f4\u570d\u5729\u58dd\u59d4\u5a01\u5a13\u5a81\u5a99\u5aa6\u5b12\u5bea\u5c09\u5c3e\u5cd7\u5d23\u5d34\u5d54\u5d6c\u5dcd\u5e0f\u5e37\u5e43\u5fab\u5fae\u5fbb\u60df\u6104\u6107\u6170\u61c0\u63cb\u6596\u6690\u672a\u6845\u68b6\u6932\u6933\u6972\u6b08\u6ca9\u6d08\u6d27\u6d58\u6da0\u6e28\u6e2d\u6e4b\u6ea6\u6ebe\u6f4d\u6f59\u6f7f\u6ff0\u6ffb\u7022\u709c\u70ba\u70d3\u7152\u7168\u7179\u71ad\u71f0\u7232\u729a\u72a9\u7325\u732c\u73ae\u741f\u744b\u748f\u754f\u75cf\u75ff\u7653\u77c0\u784a\u7859\u78a8\u78c8\u78d1\u7a4c\u7dad\u7ded\u7def\u7eac\u7ef4\u7f7b\u80c3\u8172\u8249\u829b\u82c7\u82ff\u8371\u83cb\u840e\u8466\u8468\u8473\u848d\u84f6\u851a\u853f\u8587\u8589\u85b3\u85ef\u8624\u8636\u8732\u873c\u875b\u875f\u87b1\u885b\u885e\u893d\u89a3\u89b9\u8ac9\u8b02\u8b86\u8b8f\u8bff\u8c13\u8d00\u8e13\u8e97\u8e9b\u8ece\u8f4a\u8fdd\u9036\u9055\u9057\u907a\u912c\u9180\u9317\u934f\u9361\u93cf\u95c8\u95f1\u9687\u9688\u9697\u9728\u973a\u97cb\u97d1\u97d9\u97e1\u97e6\u97ea\u9820\u98b9\u9927\u9935\u9aa9\u9aaa\u9aab\u9b4f\u9b87\u9ba0\u9baa\u9c03\u9c04\u9c94\u9cc2\u9cda",
        "jing": "\u4e3c\u4e95\u4eac\u4eb0\u4fd3\u501e\u5106\u5162\u51c0\u51c8\u51ca\u522d\u5244\u52a4\u52b2\u52c1\u5755\u5759\u5883\u598c\u5a59\u5a5b\u5a67\u5b91\u5de0\u5f2a\u5f33\u5f84\u5f91\u60ca\u61ac\u61bc\u64cf\u656c\u65cc\u65cd\u666f\u6676\u66bb\u66d4\u6871\u68b7\u6c6c\u6cfe\u6d44\u6d87\u6de8\u6fea\u701e\u70f4\u71db\u7304\u734d\u749f\u74a5\u75c9\u75d9\u775b\u79d4\u7a09\u7a7d\u7ade\u7adf\u7ae7\u7aeb\u7af6\u7af8\u7cb3\u7cbe\u7d4c\u7d93\u7ecf\u8059\u80bc\u80eb\u811b\u8148\u830e\u8346\u834a\u8396\u83c1\u845d\u87fc\u8aa9\u8b66\u8ff3\u9015\u93e1\u955c\u9631\u9753\u9756\u9759\u975a\u975c\u981a\u9838\u9888\u9a5a\u9be8\u9cb8\u9d5b\u9d81\u9d84\u9e96\u9ea0\u9ee5\u9f31",
        "li": "\u4e3d\u4f8b\u4fd0\u4fda\u4fea\u5088\u512e\u5137\u5163\u51d3\u5215\u5229\u5253\u527a\u5299\u529b\u52b1\u52f5\u5386\u5389\u5398\u53a4\u53af\u53b2\u540f\u5456\u54e9\u550e\u5533\u55b1\u569f\u56a6\u56c4\u56c7\u575c\u585b\u58e2\u5a0c\u5a33\u5a6f\u5ae0\u5b4b\u5b77\u5c74\u5ca6\u5cdb\u5ce2\u5cf2\u5dc1\u5ef2\u609d\u60a1\u60a7\u60b7\u6144\u623b\u623e\u642e\u6521\u6526\u652d\u6584\u66a6\u66c6\u66de\u6738\u674e\u67a5\u680e\u6817\u681b\u6835\u68a8\u68a9\u68b8\u68c3\u68d9\u6a06\u6aaa\u6adf\u6aea\u6b10\u6b1a\u6b74\u6b77\u6c02\u6ca5\u6cb4\u6d6c\u6d70\u6d96\u6ea7\u6f13\u6f26\u6fa7\u6fff\u701d\u7055\u7204\u720f\u7281\u7282\u729b\u72a1\u72f8\u7301\u730d\u73d5\u7406\u740d\u746e\u7483\u74c5\u74c8\u74d1\u74e5\u75a0\u75ac\u75e2\u7658\u7667\u76aa\u76ed\u775d\u77cb\u7805\u782c\u783a\u783e\u78ff\u792a\u792b\u7930\u793c\u79ae\u79b2\u79bb\u79dd\u7a72\u7acb\u7b20\u7b63\u7be5\u7bf1\u7c6c\u7c8d\u7c92\u7c9a\u7c9d\u7cb4\u7cce\u7cf2\u7d9f\u7e2d\u7e85\u7f21\u7f79\u8137\u8243\u82c8\u82d9\u8318\u8354\u8385\u8389\u83de\u849e\u84e0\u853e\u85d3\u85dc\u85f6\u861a\u863a\u86b8\u86ce\u86e0\u870a\u8727\u8777\u87cd\u87f8\u8807\u8821\u8823\u882b\u88cf\u88e1\u8935\u89fb\u8a48\u8b27\u8b88\u8c4a\u8c8d\u8d72\u8dde\u8e92\u8f62\u8f63\u8f79\u9026\u908c\u9090\u90e6\u9148\u91a8\u91b4\u91cc\u91d0\u91d9\u925d\u92eb\u92f0\u9305\u93eb\u9457\u9502\u96b6\u96b7\u96b8\u96e2\u96f3\u96f4\u9742\u974b\u9a39\u9a6a\u9a8a\u9b01\u9b32\u9bc9\u9bec\u9c67\u9c71\u9c73\u9c7a\u9ca1\u9ca4\u9ce2\u9ce8\u9d17\u9d79\u9dc5\u9dd1\u9e1d\u9e42\u9e97\u9e9c\u9eb6\u9ece\u9ed0\u9ee7",
        "pie": "\u4e3f\u6486\u6487\u66bc\u6c15\u77a5\u82e4\u9405",
        "fu": "\u4e40\u4e76\u4ecf\u4ed8\u4f0f\u4f15\u4f5b\u4fcc\u4fd8\u4fef\u5069\u5085\u51a8\u51b9\u51eb\u521c\u526f\u5310\u544b\u5488\u5489\u5490\u5638\u577f\u5798\u590d\u592b\u5987\u598b\u59c7\u5a4f\u5a66\u5a8d\u5b5a\u5b75\u5bcc\u5c03\u5caa\u5cca\u5dff\u5e17\u5e45\u5e5e\u5e9c\u5f17\u5f23\u5f7f\u5fa9\u6024\u602b\u61ef\u6255\u6276\u629a\u62c2\u62ca\u636c\u64ab\u6577\u65a7\u65c9\u6632\u668a\u670d\u678e\u67b9\u67ce\u67eb\u6874\u68f4\u6931\u6991\u6c1f\u6cb7\u6ced\u6d11\u6d6e\u6daa\u6ecf\u6f93\u70a5\u70f0\u7124\u7236\u739e\u73b8\u7408\u74b7\u752b\u7536\u7549\u7550\u7641\u76d9\u7806\u7829\u7953\u7954\u798f\u79ff\u7a03\u7a2a\u7ace\u7b26\u7b30\u7b5f\u7b99\u7bbb\u7c20\u7cb0\u7cd0\u7d28\u7d31\u7d3c\u7d65\u7d8d\u7d92\u7dee\u7e1b\u7ec2\u7ecb\u7f1a\u7f58\u7f66\u7fc7\u80a4\u80d5\u812f\u8150\u8151\u8179\u819a\u8240\u8274\u8299\u82be\u82fb\u8300\u832f\u8374\u83a9\u83d4\u842f\u844d\u8567\u8659\u86a5\u86a8\u86b9\u86d7\u8705\u8709\u875c\u8760\u876e\u886d\u889a\u889d\u88b1\u8907\u8914\u8986\u8a03\u8a42\u8ae8\u8ba3\u8c67\u8ca0\u8ce6\u8cfb\u8d1f\u8d4b\u8d59\u8d74\u8dba\u8dd7\u8e3e\u8ef5\u8f14\u8f39\u8f3b\u8f85\u8f90\u909e\u90d9\u90db\u911c\u91dc\u91e1\u9207\u9258\u925c\u9351\u9362\u961c\u961d\u9644\u965a\u97cd\u97e8\u982b\u98ab\u99a5\u99d9\u9a78\u9af4\u9b34\u9b84\u9b92\u9bc6\u9c12\u9c8b\u9cc6\u9ce7\u9cec\u9cfa\u9d14\u9d69\u9d95\u9d9d\u9ea9\u9eac\u9eb1\u9eb8\u9efb\u9efc",
        "ai": "\u4e42\u4f0c\u4f41\u50fe\u51d2\u53c6\u5446\u54c0\u54ce\u5509\u5540\u55cc\u55f3\u566f\u57c3\u5828\u5867\u5a3e\u5ad2\u5b21\u5d16\u5d66\u611b\u61d3\u61dd\u6328\u6371\u6571\u6573\u6639\u66a7\u66d6\u6b38\u6bd0\u6fed\u7231\u7477\u74a6\u764c\u7691\u769a\u76a7\u775a\u77b9\u77ee\u7839\u784b\u788d\u7919\u827e\u853c\u8586\u85f9\u8b6a\u8bf6\u8cf9\u8eb7\u92b0\u9384\u9440\u953f\u9698\u972d\u9744\u9749\u99a4\u9a03\u9c6b\u9d31",
        "nai": "\u4e43\u4f74\u5037\u54ea\u5948\u5976\u59b3\u5b2d\u5b7b\u5efc\u6468\u67f0\u6c16\u6c1d\u6e3f\u718b\u7593\u8010\u827f\u8418\u879a\u8926\u8ffa\u91e2\u933c\u9f10",
        "tuo": "\u4e47\u4f57\u4f82\u4fbb\u5483\u553e\u5768\u5836\u59a5\u5aa0\u5af7\u5cae\u5eb9\u5f75\u6258\u6265\u62d3\u62d5\u62d6\u6329\u635d\u64b1\u67c1\u67dd\u692d\u6955\u69d6\u6a50\u6a62\u6be4\u6bfb\u6c51\u6cb0\u6cb1\u6db6\u72cf\u77fa\u7823\u7824\u78a2\u7ba8\u7c5c\u7d3d\u812b\u8131\u8235\u841a\u8600\u8889\u8a17\u8a51\u8bac\u8dc5\u8dce\u8ff1\u9161\u91f6\u9247\u9248\u94ca\u9624\u9640\u9641\u9781\u98e5\u9966\u99b1\u99b2\u99c4\u99dd\u99de\u9a28\u9a52\u9a5d\u9a6e\u9a7c\u9b44\u9b60\u9b80\u9c16\u9d15\u9d4e\u9e35\u9f09\u9f0d\u9f27",
        "me": "\u4e48\u9ebc\u9ebd",
        "ma": "\u4e48\u508c\u5417\u551b\u55ce\u561b\u561c\u5988\u5abd\u5b24\u5b37\u5e13\u62b9\u6469\u64f5\u6769\u69aa\u6ea4\u7298\u72b8\u7341\u739b\u746a\u75f2\u7770\u7801\u78bc\u7943\u79a1\u7f75\u8534\u8682\u879e\u87c6\u87c7\u93b7\u9581\u99ac\u99e1\u9a6c\u9a82\u9c22\u9dcc\u9ebb\u9ebc",
        "yao": "\u4e48\u4ef8\u4fa5\u5004\u5060\u509c\u50e5\u5406\u54ac\u5593\u55c2\u579a\u582f\u592d\u5996\u59da\u5a79\u5ab1\u5acd\u5b8e\u5c27\u5c2d\u5c86\u5ce3\u5d24\u5d3e\u5da2\u5da4\u5e7a\u5fad\u612e\u62ad\u62d7\u63fa\u6416\u6447\u669a\u66dc\u6773\u6796\u67fc\u6946\u699a\u69a3\u6b80\u6bbd\u6dc6\u6e94\u70d1\u718e\u71ff\u723b\u7307\u733a\u735f\u73e7\u7464\u7476\u759f\u7627\u7711\u77c5\u7945\u7a7e\u7a85\u7a88\u7a91\u7a94\u7aaf\u7ab0\u7b44\u7d04\u7e47\u7ea6\u8000\u80b4\u8170\u8200\u825e\u82ed\u836f\u846f\u847d\u84d4\u85ac\u85e5\u8628\u888e\u8981\u899e\u8a1e\u8b20\u8b21\u8b91\u8c23\u8dad\u8efa\u8f7a\u9059\u9065\u9080\u929a\u9443\u9470\u94a5\u94eb\u95c4\u9676\u977f\u9864\u98bb\u98d6\u9906\u991a\u9a15\u9c29\u9cd0\u9dc2\u9dd5\u9e5e\u9f3c",
        "zhi": "\u4e4b\u4e7f\u4f84\u5001\u5024\u503c\u506b\u5128\u5236\u5295\u52a7\u536e\u538e\u5394\u53ea\u5431\u54ab\u5740\u5741\u5767\u5781\u57f4\u57f7\u588c\u5902\u59b7\u59ea\u5a21\u5b02\u5bd8\u5cd9\u5d3b\u5df5\u5e0b\u5e19\u5e1c\u5e5f\u5ea2\u5ea4\u5f58\u5f8f\u5f9d\u5fb5\u5fd7\u5fee\u6049\u6179\u6184\u61e5\u61eb\u6267\u627a\u62a7\u6303\u6307\u631a\u63b7\u6418\u6431\u646d\u646f\u64f2\u64ff\u652f\u65d8\u65e8\u664a\u667a\u679d\u67b3\u67e3\u6800\u6809\u683a\u684e\u6894\u68bd\u690d\u6925\u69b0\u6a34\u6acd\u6adb\u6b62\u6b96\u6c0f\u6c41\u6c65\u6c9a\u6cbb\u6cdc\u6d14\u6d37\u6ddb\u6dfd\u6ecd\u6ede\u6eef\u6f10\u6f4c\u7099\u71ab\u7286\u72fe\u7302\u7318\u74c6\u74e1\u7564\u7590\u75bb\u75d4\u75e3\u7608\u76f4\u77e5\u780b\u7929\u7947\u7949\u7951\u7957\u796c\u7983\u79d3\u79d6\u79e9\u79ea\u79f2\u79f7\u7a19\u7a1a\u7a3a\u7a49\u7a92\u7ad3\u7ad5\u7b6b\u7d19\u7d29\u7d77\u7d95\u7dfb\u7e36\u7e54\u7eb8\u7ec7\u7f6e\u7fd0\u8040\u804c\u8077\u80a2\u80d1\u80dd\u80f5\u8102\u815f\u81a3\u81b1\u81f3\u81f4\u81f8\u8296\u829d\u82b7\u85e2\u8635\u8652\u86ed\u8718\u87b2\u87c4\u87d9\u8879\u887c\u889f\u88a0\u88fd\u8901\u8967\u899f\u89d7\u89e2\u89ef\u89f6\u8a28\u8a8c\u8b58\u8bc6\u8c51\u8c52\u8c78\u8cad\u8cea\u8d04\u8d28\u8d3d\u8dbe\u8dd6\u8df1\u8e2c\u8e2f\u8e60\u8e62\u8e91\u8e93\u8ec4\u8ef9\u8f0a\u8f75\u8f7e\u8fe3\u9070\u90c5\u916f\u91de\u928d\u92d5\u9455\u94da\u9527\u962f\u965f\u9666\u96b2\u96bb\u96c9\u99b6\u99bd\u99e4\u9a2d\u9a3a\u9a47\u9a98\u9bef\u9cf7\u9d19\u9d1f\u9d29\u9d32\u9dd9\u9e37\u9ef9\u9f05",
        "wu": "\u4e4c\u4e94\u4ea1\u4ef5\u4f0d\u4fae\u4fc9\u5035\u511b\u5140\u5166\u526d\u52a1\u52d9\u52ff\u5348\u537c\u5433\u5434\u543e\u5449\u545c\u5514\u554e\u55da\u5641\u572c\u575e\u57e1\u580a\u5862\u5966\u59a9\u5a2a\u5a2c\u5a7a\u5a89\u5af5\u5be4\u5c4b\u5c7c\u5c89\u5cff\u5d4d\u5d68\u5deb\u5e91\u5ee1\u5f19\u5fe2\u5fe4\u6003\u6076\u609e\u609f\u60aa\u60ae\u60e1\u61ae\u620a\u6264\u6342\u6440\u6544\u65bc\u65e0\u65ff\u6664\u6747\u674c\u68a7\u6a46\u6b4d\u6b66\u6bcb\u6c59\u6c5a\u6c61\u6c95\u6d16\u6d3f\u6d6f\u6ea9\u6f55\u70cf\u7110\u7121\u715f\u7183\u7269\u727e\u739d\u73f7\u73f8\u7466\u7491\u7512\u75e6\u77b4\u77f9\u7894\u7966\u7991\u7a8f\u7ab9\u7bbc\u7c85\u815b\u821e\u829c\u82b4\u8323\u8381\u84e9\u856a\u8601\u8708\u8790\u87f1\u8a88\u8aa3\u8aa4\u8b55\u8bec\u8bef\u8e8c\u8fd5\u901c\u907b\u90ac\u90da\u9114\u9125\u92c8\u92d8\u92d9\u93a2\u94a8\u94fb\u9622\u9653\u9696\u96fe\u971a\u9727\u9770\u9a16\u9a9b\u9bc3\u9c1e\u9d2e\u9d50\u9d61\u9da9\u9de1\u9e40\u9e49\u9e5c\u9e8c\u9f2f\u9f40",
        "zha": "\u4e4d\u5067\u5273\u5284\u538f\u5412\u548b\u549c\u54a4\u54f3\u558b\u55b3\u5bb1\u624e\u62af\u62c3\u6313\u63f8\u643e\u6463\u672d\u67de\u67e4\u67e5\u67f5\u67fb\u6805\u6942\u69a8\u6a1d\u6e23\u6ea0\u7079\u70b8\u7534\u75c4\u76b6\u76bb\u7728\u781f\u7b9a\u7c0e\u7d25\u7d2e\u82f2\u832c\u86b1\u86bb\u8721\u874b\u881f\u883f\u8a50\u8b2f\u8b57\u8bc8\u8e37\u8ecb\u8f67\u91a1\u9358\u94e1\u9598\u95f8\u9705\u9b93\u9c8a\u9c9d\u9f44\u9f47",
        "hu": "\u4e4e\u4e55\u4e92\u51b1\u51b4\u5322\u532b\u5430\u547c\u548c\u552c\u553f\u5552\u5596\u5611\u561d\u569b\u56eb\u5780\u58f6\u58f7\u58fa\u5a5f\u5aa9\u5aed\u5aee\u5be3\u5cb5\u5cd8\u5e0d\u5e60\u5f16\u5f27\u5ffd\u6018\u6019\u6057\u60da\u620f\u622f\u6232\u6236\u6237\u6238\u623d\u6248\u6287\u62a4\u6430\u6462\u659b\u6608\u6612\u66f6\u6791\u6838\u695b\u695c\u69f2\u69f4\u6b3b\u6b51\u6b58\u6c7b\u6c8d\u6caa\u6cd8\u6d52\u6df2\u6df4\u6e56\u6eec\u6ef8\u6ef9\u702b\u70c0\u70fc\u7100\u7173\u71a9\u72d0\u7322\u7324\u7425\u745a\u74e0\u74f3\u795c\u7b0f\u7bb6\u7c04\u7cca\u7d57\u7d94\u7e20\u80e1\u81b4\u81db\u82f8\u8400\u846b\u851b\u8530\u864d\u864e\u8656\u865d\u8774\u879c\u885a\u89f3\u8a31\u8b22\u8b3c\u8b77\u8c70\u8ee4\u8f77\u9120\u9190\u9378\u96d0\u9800\u9836\u992c\u9b0d\u9b71\u9c17\u9ce0\u9cf8\u9d60\u9d98\u9da6\u9dbb\u9e0c\u9e44\u9e55\u9e58\u9e71\u9f13",
        "fa": "\u4e4f\u4f10\u4f71\u50a0\u53d1\u57a1\u59c2\u5f42\u6830\u683f\u6a43\u6cd5\u704b\u726b\u73d0\u743a\u75ba\u767a\u767c\u7782\u781d\u7b29\u7b4f\u7f5a\u7f70\u7f78\u8337\u855f\u85c5\u9166\u9197\u91b1\u95a5\u9600\u98b0\u9aea\u9aee",
        "le": "\u4e50\u4e86\u4ec2\u52d2\u53fb\u54f7\u57d2\u5fc7\u6250\u697d\u6a02\u6c3b\u6cd0\u738f\u7833\u7afb\u7c15\u808b\u827b\u961e\u9831\u990e\u9979\u9c33\u9cd3",
        "yue": "\u4e50\u5216\u54d5\u5666\u599c\u5c84\u5cb3\u5dbd\u6071\u6085\u60a6\u6209\u6288\u6373\u66dc\u66f0\u66f1\u6708\u6782\u680e\u697d\u6a02\u6a3e\u6aaa\u6adf\u6ce7\u7039\u7125\u721a\u72d8\u73a5\u793f\u79b4\u7bb9\u7bd7\u7c46\u7c65\u7c70\u7ca4\u7cb5\u7d04\u7ea6\u8000\u85e5\u8625\u868e\u868f\u8aaa\u8aac\u8bf4\u8d8a\u8daf\u8dc0\u8dc3\u8e8d\u8ecf\u9205\u925e\u9470\u94a5\u94ba\u95b1\u95b2\u9605\u9e11\u9e19\u9fa0\u9fa5",
        "ping": "\u4e52\u4fdc\u51af\u51ed\u51f4\u546f\u576a\u5a09\u5c4f\u5c5b\u5e21\u5e32\u5e48\u5e73\u617f\u6191\u67b0\u6cd9\u6d34\u70be\u7129\u73b6\u74f6\u7501\u7539\u782f\u7aee\u7bb3\u7c08\u7d63\u7f3e\u8060\u80d3\u8275\u82f9\u8353\u840d\u84f1\u860b\u86b2\u86e2\u89ae\u8a55\u8bc4\u8eff\u8f27\u90f1\u9829\u99ae\u9b83\u9c86",
        "pang": "\u4e53\u5390\u5396\u55d9\u5ace\u5c28\u5e9e\u5eac\u5f77\u5fac\u65c1\u6ec2\u7090\u78c5\u7be3\u802a\u80a8\u80d6\u80ee\u8180\u8196\u823d\u84a1\u8783\u89ab\u9004\u96f1\u9736\u9a2f\u9c1f\u9cd1\u9f8e\u9f90",
        "qiao": "\u4e54\u4fa8\u4fcf\u50d1\u50fa\u5281\u52ea\u55ac\u563a\u5859\u589d\u58bd\u58f3\u5af6\u5ce4\u5ced\u5d6a\u5da0\u5da3\u5de7\u5e29\u5e67\u6084\u6100\u6194\u64ac\u64bd\u6572\u657f\u6865\u69d7\u6a35\u6a47\u6a4b\u6bbb\u6bbc\u71c6\u7644\u77a7\u7857\u785a\u78fd\u7904\u7a8d\u7ac5\u7c25\u7e51\u7e70\u7f32\u7fd8\u7ff9\u835e\u8549\u854e\u85ee\u8a9a\u8b59\u8bee\u8c2f\u8dab\u8dac\u8df7\u8e7a\u8e7b\u8e88\u90fb\u9121\u91e5\u936b\u936c\u93d2\u9408\u9430\u9539\u9657\u96c0\u9792\u9798\u97bd\u97d2\u981d\u9866\u9ab9\u9ada\u9adc\u9d72",
        "guai": "\u4e56\u53cf\u592c\u5b94\u5ee5\u602a\u6060\u62d0\u63b4\u6451\u65dd\u67b4\u67fa\u7650\u7b89",
        "sheng": "\u4e57\u4e58\u5057\u5269\u5270\u52dd\u5347\u544f\u5723\u58ad\u58f0\u5d4a\u61b4\u6598\u6607\u665f\u6660\u66fb\u6909\u69ba\u6b85\u6ce9\u6e11\u6e66\u6e97\u6fa0\u713a\u7272\u72cc\u72d5\u73c4\u741e\u751f\u7525\u76db\u7701\u771a\u7acd\u7acf\u7ad3\u7ad4\u7ad5\u7ae1\u7b19\u7bb5\u7e04\u7e69\u7ef3\u8056\u8072\u80dc\u82fc\u8542\u8b5d\u8cb9\u8cf8\u924e\u9629\u965e\u9c66\u9d7f\u9f2a",
        "yin": "\u4e5a\u4f8c\u5198\u51d0\u5370\u541f\u542c\u5432\u552b\u5591\u5656\u567e\u569a\u56d9\u56e0\u5701\u573b\u5794\u57a0\u57bd\u5819\u5924\u59fb\u5a63\u5a6c\u5bc5\u5c39\u5cfe\u5d1f\u5d2f\u5dbe\u5ed5\u5ef4\u5f15\u6114\u6147\u616d\u6196\u6197\u61da\u647f\u65a6\u6704\u6a83\u6a90\u6aad\u6abc\u6afd\u6b45\u6ba5\u6bb7\u6c24\u6cff\u6d07\u6d15\u6deb\u6dfe\u6e5a\u6e6e\u6eb5\u6edb\u6fe5\u6fe6\u70ce\u70df\u72fa\u730c\u748c\u7616\u763e\u764a\u766e\u7892\u78e4\u798b\u79f5\u7aa8\u7b43\u7c8c\u7d16\u7d6a\u7df8\u7e2f\u7eec\u80e4\u82c2\u831a\u8335\u836b\u8376\u8491\u8529\u852d\u861f\u8693\u87be\u87eb\u88c0\u8a14\u8a1a\u8a21\u8abe\u8af2\u8b94\u8d9b\u911e\u9173\u91ff\u920f\u921d\u9280\u92a6\u93d4\u94df\u94f6\u95c9\u9625\u9634\u9670\u967b\u9682\u9690\u96a0\u96b1\u9720\u972a\u9777\u9787\u97f3\u97fd\u97fe\u98ee\u98f2\u996e\u99bb\u99f0\u9a83\u9ba3\u9de3\u9eeb\u9f66\u9f82\u9f88",
        "mie": "\u4e5c\u5400\u54a9\u5b6d\u5e6d\u61f1\u6423\u6ad7\u6ec5\u700e\u706d\u7923\u7bfe\u7f8b\u8511\u858e\u881b\u8849\u884a\u8995\u9456\u9c74\u9d13",
        "nie": "\u4e5c\u556e\u55a6\u55eb\u565b\u5699\u56c1\u56d3\u573c\u5b7c\u5b7d\u5d72\u5dd5\u5e07\u60d7\u634f\u63d1\u655c\u67bf\u68ff\u6af1\u6d85\u6e7c\u758c\u75c6\u7bde\u7cf1\u7cf5\u8042\u8076\u81ec\u81f2\u82f6\u83cd\u8616\u8617\u8825\u8e02\u8e17\u8e51\u8ea1\u9222\u931c\u93b3\u9448\u9477\u9480\u954a\u954d\u95d1\u9667\u9689\u9873\u989e\u9f67\u9f69",
        "xi": "\u4e60\u4e74\u4fc2\u4fd9\u5092\u50c1\u50d6\u516e\u51de\u531a\u5338\u534c\u5365\u5380\u5438\u54a5\u550f\u553d\u559c\u55ba\u563b\u564f\u56b1\u56cd\u5915\u595a\u5a2d\u5a90\u5ab3\u5b06\u5b09\u5c43\u5c53\u5c56\u5c63\u5c6d\u5d60\u5d8d\u5dc2\u5dc7\u5e0c\u5e2d\u5f86\u5f99\u5faf\u5fda\u5fe5\u602c\u6037\u6038\u6044\u6053\u606f\u6089\u6095\u60c1\u60dc\u6198\u6199\u620f\u622f\u6231\u6232\u6271\u6278\u637f\u6461\u651c\u657c\u6614\u665e\u6670\u6673\u66bf\u66e6\u6790\u67b2\u6816\u6878\u68e4\u68f2\u691e\u693a\u69bd\u69e2\u6a28\u6a40\u6a84\u6b2f\u6b37\u6b56\u6b59\u6c25\u6c50\u6d17\u6d60\u6dc5\u6e13\u6eaa\u6eca\u6f06\u6f07\u6f1d\u6f5d\u6f5f\u6f99\u70ef\u7108\u711f\u712c\u7155\u7182\u7184\u7188\u7199\u71b9\u71ba\u71bb\u71e8\u7214\u727a\u7280\u7294\u72a0\u72a7\u72f6\u7365\u73ba\u740b\u74bd\u74d7\u7566\u75a7\u7604\u761c\u7699\u76fb\u774e\u77a6\u77d6\u77fd\u7852\u78ce\u78f6\u7902\u798a\u79a7\u7a00\u7a27\u7a78\u7ab8\u7c01\u7c9e\u7cfb\u7d30\u7d8c\u7e18\u7e30\u7e4b\u7e65\u7e6b\u7e9a\u7ec6\u7ee4\u7fb2\u7fd2\u7fd5\u7fd6\u80b8\u80b9\u814a\u819d\u81c8\u81d8\u8203\u8204\u823e\u831c\u8383\u83e5\u8448\u8478\u84a0\u84b5\u84c6\u84f0\u856e\u8582\u8669\u8725\u8777\u8785\u8786\u8787\u879d\u87cb\u87e2\u8835\u88ad\u88fc\u8936\u8972\u897f\u8980\u89a1\u89a4\u89cb\u89f9\u89fd\u89ff\u8af0\u8b11\u8b35\u8b46\u8c3f\u8c40\u8c68\u8c6f\u8c95\u8d65\u8d69\u8d98\u8e4a\u8e5d\u8ea7\u90cb\u90d7\u90e4\u910e\u9145\u91af\u91d0\u91f3\u91f8\u9269\u9291\u932b\u938e\u93b4\u93ed\u9474\u94e3\u9521\u95df\u960b\u9699\u969f\u96b0\u96b5\u972b\u973c\u98c1\u993c\u9969\u997b\u9a31\u9a3d\u9a68\u9b29\u9c13\u9c3c\u9c5a\u9cdb\u9d57\u9eca\u9ed6\u9f37\u9f42",
        "xiang": "\u4e61\u4eab\u4f6d\u50cf\u52e8\u53a2\u5411\u54cd\u554c\u56ae\u5905\u5d91\u5df7\u5ea0\u5ec2\u5fc0\u6066\u60f3\u6651\u66cf\u6819\u6a61\u6b00\u6e58\u6f52\u73e6\u74d6\u76f8\u7965\u7bb1\u7d74\u7dd7\u7e95\u7f03\u7fd4\u8297\u842b\u8459\u858c\u8683\u87d3\u8801\u8944\u8950\u8a73\u8be6\u8c61\u8ded\u90f7\u9109\u910a\u9115\u940c\u9472\u9576\u95c0\u95c2\u964d\u97ff\u9805\u9879\u98e8\u9909\u9957\u995f\u9977\u9999\u9a64\u9aa7\u9b9d\u9bd7\u9c4c\u9c5c\u9c76\u9c9e\u9e98",
        "nang": "\u4e6a\u513e\u56a2\u56ca\u56d4\u652e\u66e9\u6b1c\u7062\u9962\u9995\u9f49",
        "jia": "\u4e6b\u4eee\u4ef7\u4f3d\u4f73\u4f7c\u4fa1\u4fa5\u5047\u50a2\u50f9\u527f\u52a0\u53da\u550a\u55e7\u5609\u560f\u573f\u57c9\u590f\u5939\u593e\u5a7d\u5ac1\u5bb6\u5cac\u5e4f\u5fa6\u5fbc\u605d\u621b\u621e\u6274\u62c1\u631f\u6322\u633e\u6341\u6405\u649f\u64b9\u652a\u656b\u659a\u659d\u67b6\u67b7\u689c\u6935\u698e\u69a2\u69da\u6a9e\u6a9f\u6be0\u6cc7\u6d43\u6d79\u6e6b\u728c\u72e1\u7333\u73be\u73c8\u7532\u75c2\u7615\u768e\u77eb\u77ef\u7848\u7a3c\u7b33\u7b74\u7d5e\u7e00\u7e73\u7ede\u7f34\u801e\u80db\u811a\u8175\u823a\u8304\u835a\u83a2\u846d\u86f1\u86fa\u8888\u88b7\u88cc\u89d2\u8c6d\u8c91\u8cc8\u8d3e\u8dcf\u8df2\u8e0b\u8fe6\u90cf\u90df\u9240\u926b\u9278\u927f\u92cf\u93b5\u94be\u94d7\u94f0\u9553\u9782\u9788\u982c\u9830\u988a\u9903\u9904\u997a\u99d5\u9a7e\u9d10\u9d4a\u9e9a",
        "mai": "\u4e70\u4f45\u52a2\u52f1\u5356\u562a\u57cb\u58f2\u773f\u8108\u8109\u836c\u8552\u85b6\u8750\u8cb7\u8ce3\u8fc8\u9081\u9721\u973e\u9df6\u9ea5\u9ea6",
        "luan": "\u4e71\u4e82\u5375\u571d\u571e\u5a08\u5b4c\u5b6a\u5b7f\u5ce6\u5dd2\u631b\u6523\u66eb\u683e\u6b12\u6ee6\u7053\u7064\u7674\u7675\u7f89\u8114\u81e0\u858d\u864a\u91e0\u92ae\u947e\u9d49\u9e1e\u9e3e",
        "ru": "\u4e73\u4f9e\u5089\u5112\u5165\u55d5\u5685\u5973\u5982\u5ab7\u5b7a\u5e24\u6310\u64e9\u66d8\u6847\u6c5d\u6d33\u6e2a\u6ebd\u6fe1\u71f8\u7b4e\u7e1f\u7f1b\u8097\u81d1\u8339\u84d0\u8560\u85b7\u8815\u88bd\u8925\u8966\u8fb1\u909a\u910f\u91b9\u92a3\u94f7\u986c\u98a5\u9c6c\u9d3d",
        "sha": "\u4e77\u503d\u50bb\u510d\u5239\u53a6\u553c\u5565\u55a2\u55c4\u5e34\u5e39\u5ec8\u6332\u644b\u6740\u6749\u699d\u6a27\u6b43\u6bba\u6c99\u715e\u7300\u75e7\u7802\u7b91\u7c86\u7d17\u7eb1\u7fe3\u838e\u8410\u8531\u88df\u93a9\u94e9\u95af\u970e\u9aff\u9b66\u9bca\u9bcb\u9ca8",
        "na": "\u4e78\u5357\u5436\u5450\u5462\u54ea\u55f1\u59a0\u5a1c\u6290\u62cf\u62ff\u6310\u637a\u7b1d\u7d0d\u7eb3\u80ad\u84b3\u8872\u88a6\u8a25\u8abd\u8c7d\u8edc\u90a3\u9209\u93bf\u94a0\u954e\u96eb\u9b76",
        "gan": "\u4e79\u4e7e\u4e81\u4ee0\u501d\u51ce\u51f2\u5481\u5769\u5c32\u5c34\u5c35\u5c36\u5c37\u5d45\u5e72\u5e79\u5fd3\u611f\u64c0\u653c\u6562\u65f0\u6746\u67d1\u687f\u69a6\u6a44\u6a8a\u6c75\u6cd4\u6dbb\u6de6\u6f89\u7068\u7395\u7518\u75b3\u76af\u76f0\u77f8\u79c6\u7a08\u7aff\u7b78\u7c33\u7c93\u7d3a\u7ec0\u809d\u8289\u82f7\u8677\u872c\u8866\u8a4c\u8d11\u8d1b\u8d63\u8d76\u8d95\u8fc0\u9150\u9aad\u9c64\u9ce1\u9cf1",
        "qian": "\u4e79\u4e7e\u4edf\u4ef1\u4f65\u5029\u5042\u5094\u50c9\u5119\u515b\u520b\u524d\u5343\u55db\u5731\u5732\u5811\u5879\u58cd\u5977\u59cf\u5a5c\u5a8a\u5c8d\u5c92\u5d4c\u5d70\u5ff4\u6093\u60ad\u6106\u614a\u6173\u6266\u6272\u62d1\u62ea\u6394\u63ae\u63f5\u6434\u6481\u6510\u6511\u6513\u6744\u68c8\u6920\u69a9\u69cf\u69e7\u6ab6\u6acf\u6b20\u6b26\u6b49\u6b6c\u6c58\u6c67\u6d45\u6dfa\u6f27\u6f5b\u6f5c\u6ff3\u704a\u71c2\u7275\u727d\u728d\u74e9\u7698\u7acf\u7ad3\u7b7e\u7b9d\u7b9e\u7bcf\u7bdf\u7c3d\u7c56\u7c64\u7c81\u7daa\u7e34\u7e7e\u7ea4\u7f31\u7fa5\u80b7\u8181\u81e4\u828a\u82a1\u831c\u8368\u8465\u84a8\u8533\u8541\u8654\u8688\u8699\u8738\u8930\u8ad0\u8b19\u8b63\u8b74\u8c26\u8c34\u8c38\u8ee1\u8f24\u8fc1\u9063\u9077\u91fa\u9210\u9257\u925b\u92ad\u9322\u9431\u948e\u94a4\u94b1\u94b3\u94c5\u9621\u97c6\u9845\u9869\u9a1a\u9a2b\u9a9e\u9b08\u9b1c\u9b1d\u9b35\u9c2c\u9cf9\u9d6e\u9e50\u9e89\u9ed4\u9eda",
        "gui": "\u4e80\u4f79\u5080\u523d\u523f\u528a\u528c\u5326\u532d\u53ac\u572d\u579d\u59ab\u59fd\u5aaf\u5ae2\u5b00\u5b84\u5da1\u5ddc\u5e30\u5e8b\u5eaa\u5f52\u6051\u646b\u6530\u6531\u660b\u6677\u66a9\u67dc\u6842\u6867\u691d\u697f\u69fb\u69fc\u6a9c\u6ac3\u6b78\u6c3f\u6e88\u6e8e\u7085\u7094\u73ea\u7470\u749d\u74cc\u7678\u7688\u7845\u796a\u7a90\u7b40\u7c0b\u81ad\u84d5\u86eb\u87e1\u88bf\u898f\u89c4\u89e4\u8a6d\u8be1\u8cb4\u8d35\u8dea\u8ecc\u8f68\u90bd\u90cc\u95a8\u95fa\u9652\u97bc\u9b36\u9b39\u9b3c\u9bad\u9c56\u9c65\u9c91\u9cdc\u9f9c\u9f9f",
        "jun": "\u4e80\u4fca\u5101\u519b\u541b\u5441\u56f7\u5747\u57c8\u59f0\u5bef\u5cfb\u61cf\u6343\u6358\u6508\u651f\u6659\u687e\u6c6e\u6d5a\u6fec\u710c\u73fa\u756f\u76b2\u76b8\u76b9\u7885\u7a98\u7ae3\u7b60\u7b98\u7b9f\u8399\u83cc\u8470\u8528\u8548\u8690\u8720\u8880\u89a0\u8ecd\u90e1\u921e\u9281\u929e\u94a7\u9656\u96bd\u96cb\u9835\u9915\u9982\u99ff\u9a8f\u9bb6\u9caa\u9d58\u9e87\u9e8f\u9e95\u9f9c\u9f9f",
        "jue": "\u4e85\u5014\u5095\u50ea\u51b3\u5214\u5282\u53a5\u55df\u5658\u5671\u56bc\u5800\u5b52\u5b53\u5c69\u5c6b\u5d1b\u5d2b\u5da5\u5f21\u5f4f\u61a0\u61b0\u6204\u6289\u6317\u6354\u6398\u6485\u64a7\u652b\u658d\u6877\u6a5b\u6a5c\u6b14\u6b2e\u6b8c\u6c12\u6c7a\u7106\u7133\u71a6\u7211\u721d\u7234\u7235\u7357\u73a6\u73a8\u73cf\u7474\u75a6\u761a\u77cd\u77e1\u7804\u7a71\u7d55\u7d76\u7edd\u811a\u81c4\u82b5\u855d\u8568\u8697\u87e8\u87e9\u8990\u899a\u89ba\u89c9\u89d2\u89d6\u89fc\u8a23\u8b4e\u8bc0\u8c32\u8c3b\u8d7d\u8db9\u8e0b\u8e76\u8e77\u8ea9\u902b\u920c\u940d\u941d\u9481\u9562\u9c4a\u9d03\u9de2\u9fa3",
        "liao": "\u4e86\u50da\u5639\u5afd\u5be5\u5bee\u5c1e\u5c25\u5c26\u5c6a\u5d7a\u5d9a\u5d9b\u5ed6\u5eeb\u6180\u61ad\u644e\u6482\u64a9\u6579\u6599\u66b8\u6f3b\u6f66\u7093\u71ae\u71ce\u7212\u7360\u7499\u7597\u7642\u77ad\u7ab2\u7ab7\u7c1d\u7e5a\u7f2d\u804a\u818b\u81ab\u84fc\u87c9\u87df\u8c42\u8cff\u8e58\u8e7d\u8fbd\u907c\u911d\u91d5\u9410\u948c\u9563\u957d\u985f\u98c2\u98c9\u9ace\u9dda\u9def\u9e69",
        "er": "\u4e8c\u4f74\u4f95\u513f\u5150\u5152\u5235\u54a1\u5532\u5c12\u5c13\u5c14\u5ccf\u5f0d\u5f10\u682d\u682e\u6a32\u6abd\u6be6\u6d0f\u6d31\u723e\u73e5\u7732\u800c\u800f\u8033\u804f\u80f9\u834b\u85be\u8848\u88bb\u8a80\u8cae\u8cb3\u8d30\u8f00\u8f5c\u8fe9\u9087\u927a\u94d2\u9651\u96ad\u990c\u9975\u99ec\u9af5\u9b9e\u9c95\u9d2f\u9e38",
        "chu": "\u4e8d\u4ff6\u5097\u50a8\u510a\u5132\u51e6\u51fa\u520d\u521d\u53a8\u58b8\u5904\u5c80\u5e6e\u5eda\u6035\u61b7\u62c0\u6410\u654a\u65b6\u66ef\u6775\u6918\u695a\u696e\u6a17\u6a71\u6a9a\u6ac9\u6ae5\u6b2a\u6b5c\u6ccf\u6ec0\u6ec1\u6fcb\u7293\u7421\u755c\u77d7\u7840\u790e\u7acc\u7ad0\u7be8\u7d40\u7ecc\u8021\u81c5\u82bb\u8372\u84a2\u84ad\u854f\u8655\u870d\u891a\u89e6\u89f8\u8a58\u8c56\u8c99\u8d8e\u8de6\u8e00\u8e70\u8e87\u8e95\u905a\u9110\u924f\u92e4\u9504\u95a6\u9664\u96cf\u96db\u9db5\u9edc\u9f63\u9f6d\u9f7c",
        "kui": "\u4e8f\u5080\u5232\u532e\u5331\u559f\u55b9\u5633\u5645\u5914\u594e\u5abf\u5c2f\u5cbf\u5cde\u5dcb\u609d\u6126\u6127\u6192\u6223\u63c6\u648c\u6646\u668c\u6922\u694f\u6951\u69f6\u6a3b\u6ac6\u6e40\u6e83\u6f70\u7143\u72aa\u76d4\u777d\u7786\u77b6\u784a\u7aa5\u7aba\u7bd1\u7c00\u7c23\u7c44\u8067\u8069\u806d\u8075\u8325\u8475\u8489\u852e\u8562\u85c8\u862c\u8637\u8667\u8770\u8dec\u8e5e\u8ea8\u9035\u9108\u9368\u9377\u9400\u944e\u95da\u9697\u97b9\u980d\u982f\u993d\u994b\u9988\u9997\u9a24\u9a29\u9a99\u9b41",
        "yun": "\u4e91\u4f1d\u508a\u5141\u52fb\u5300\u5458\u54e1\u5597\u56e9\u5747\u593d\u596b\u5998\u5b55\u607d\u60f2\u6120\u612a\u614d\u628e\u6600\u6655\u6688\u6783\u679f\u6985\u69b2\u6a52\u6b92\u6b9e\u6c32\u6c33\u6c84\u6da2\u6eb3\u6f90\u7174\u717e\u7185\u7189\u71a8\u72c1\u72c7\u73a7\u7547\u7703\u78d2\u79d0\u7b60\u7b7c\u7bd4\u7d1c\u7df7\u7dfc\u7e15\u7e1c\u7ead\u7f0a\u8018\u803a\u816a\u82b8\u837a\u8480\u8495\u84b7\u8553\u8574\u8580\u85f4\u860a\u8779\u891e\u8c9f\u8cf1\u8d07\u8d20\u8d5f\u8f11\u8fd0\u904b\u90d3\u90e7\u9106\u9116\u915d\u9196\u919e\u9217\u92c6\u962d\u9668\u9695\u96f2\u9723\u97de\u97eb\u97f5\u97fb\u9942\u9da4",
        "sui": "\u4e97\u54f8\u57e3\u590a\u595e\u5a1e\u5b18\u5c3f\u5c81\u5d57\u5db2\u5dc2\u65de\u6a85\u6a96\u6b72\u6b73\u6bf8\u6d7d\u6ed6\u6fbb\u6fc9\u7021\u716b\u71a3\u71e7\u74b2\u74cd\u772d\u775f\u7762\u7815\u788e\u795f\u79ad\u7a42\u7a57\u7a5f\u7c8b\u7d8f\u7e40\u7e78\u7ee5\u81b8\u8295\u837d\u837e\u867d\u895a\u8ab6\u8b62\u8c07\u8ce5\u9040\u9042\u9083\u9406\u9429\u968b\u968f\u96a7\u96a8\u96d6\u96df\u9743\u9796\u9ac4\u9ad3",
        "gen": "\u4e98\u4e99\u522f\u54cf\u6839\u826e\u831b\u8ddf",
        "geng": "\u4e99\u54fd\u57c2\u5829\u5cfa\u5e9a\u632d\u63ef\u6404\u6685\u66f4\u6897\u6d6d\u754a\u7cb3\u7d59\u7d5a\u7d86\u7dea\u7e06\u7ee0\u7fae\u7fb9\u8015\u803f\u8384\u83ee\u8ce1\u8d53\u90e0\u981a\u9838\u9888\u9abe\u9bc1\u9ca0\u9d8a\u9e52",
        "xie": "\u4e9b\u4eb5\u4f33\u5055\u5070\u5199\u51a9\u52a6\u52f0\u534f\u5354\u5368\u5378\u53f6\u55cb\u57a5\u586e\u594a\u5951\u598e\u5a0e\u5a9f\u5beb\u5c51\u5c5f\u5c67\u5db0\u5ee8\u5fa2\u604a\u6136\u6140\u61c8\u62f9\u631f\u633e\u63f3\u641a\u643a\u64b7\u64d5\u64f7\u651c\u659c\u65ba\u65ea\u66ac\u68b0\u6954\u698d\u69ad\u6b47\u6cc4\u6ce3\u6cfb\u6d29\u6e2b\u6fa5\u7009\u7023\u707a\u710e\u7181\u71ee\u71f2\u7215\u7332\u736c\u744e\u75b6\u7944\u79bc\u7c7a\u7ccf\u7d32\u7d4f\u7d5c\u7d6c\u7d8a\u7de4\u7e88\u7ec1\u7f2c\u7f37\u7fd3\u80c1\u8105\u8107\u810b\u8125\u818e\u8449\u85a4\u85db\u874e\u8762\u87f9\u880d\u880f\u8840\u8878\u887a\u8909\u893b\u896d\u89e3\u89e7\u8ae7\u8b1d\u8c10\u8c22\u8e9e\u8ea0\u9082\u90aa\u978b\u97a2\u97b5\u97f0\u9821\u9889\u99ed\u99f4\u9ab1\u9bad\u9c91\u9f58\u9f65\u9fa4",
        "tou": "\u4ea0\u5077\u5078\u5744\u5934\u59b5\u5a7e\u5aae\u6295\u65a2\u724f\u7250\u7d0f\u8623\u900f\u9158\u9204\u94ad\u982d\u9ab0\u9ec8",
        "wang": "\u4ea1\u4ebe\u4efc\u509f\u5166\u5984\u5c22\u5c23\u5c29\u5c2a\u5c2b\u5f7a\u5f80\u5f83\u5f8d\u5fd8\u5ff9\u60d8\u65fa\u6680\u671b\u6722\u6789\u68e2\u6c6a\u7007\u738b\u7db2\u7f51\u7f53\u7f54\u81e6\u8292\u83a3\u83f5\u869f\u86e7\u8744\u8ab7\u8f1e\u8f8b\u8fcb\u8fec\u9b4d",
        "kang": "\u4ea2\u4f09\u531f\u56e5\u5add\u5eb7\u5ffc\u6177\u625b\u6297\u69fa\u6f2e\u7095\u72ba\u780a\u7a45\u7c87\u7ce0\u8ebf\u909f\u9227\u93ee\u94aa\u958c\u95f6\u9c47",
        "ta": "\u4ea3\u4ed6\u509d\u55d2\u5683\u56ba\u584c\u5854\u5896\u5979\u5b83\u5d09\u6135\u62d3\u631e\u6428\u64bb\u6999\u69bb\u6a7d\u6bfe\u6c93\u6dbe\u6e9a\u6ebb\u6f2f\u6fbe\u6fcc\u7260\u72e7\u736d\u737a\u7942\u79a2\u7f8d\u891f\u8abb\u8b76\u8dbf\u8e0f\u8e4b\u8e79\u8e82\u8ea2\u8fd6\u905d\u9062\u91f6\u9247\u9248\u9314\u9389\u939d\u9449\u94ca\u95d2\u95e5\u95fc\u9618\u979c\u97b3\u9b99\u9c28\u9cce\u9f96\u9f98",
        "jiao": "\u4ea4\u4f7c\u4fa5\u50e5\u50ec\u510c\u527f\u528b\u52e6\u53eb\u544c\u5602\u5604\u5626\u564d\u566d\u56bc\u59e3\u5a07\u5b0c\u5b42\u5ce4\u5ce7\u5d95\u5da0\u5fba\u5fbc\u618d\u61bf\u630d\u6322\u6341\u6405\u649f\u64b9\u652a\u654e\u6559\u656b\u657d\u65a0\u6648\u669e\u66d2\u6821\u6912\u6d47\u6e6b\u6e6c\u6ed8\u6f05\u6f16\u6f50\u6f86\u705a\u70c4\u7126\u714d\u71cb\u721d\u72e1\u73d3\u74ac\u768e\u76a6\u76ad\u77eb\u77ef\u7901\u7a5a\u7a8c\u7a96\u7b4a\u7d5e\u7e73\u7ede\u7f34\u80f6\u811a\u8173\u81a0\u81b2\u81eb\u827d\u8281\u832d\u832e\u8549\u85e0\u8660\u86df\u87c2\u87dc\u87ed\u8990\u899a\u89ba\u89c9\u89d2\u8a06\u8a68\u8b51\u8b65\u8ccb\u8de4\u8e0b\u8f03\u8f4e\u8f7f\u8f83\u90ca\u9175\u91ae\u91c2\u9278\u940e\u94f0\u9903\u997a\u9a55\u9a84\u9bab\u9c4e\u9c9b\u9d35\u9d41\u9dcd\u9de6\u9dee\u9e6a",
        "hai": "\u4ea5\u548c\u548d\u54b3\u55d0\u55e8\u563f\u5b69\u5bb3\u6c26\u6d77\u70f8\u7d6f\u80f2\u8fd8\u9084\u917c\u91a2\u9900\u995a\u99ed\u9a87\u9ab8",
        "heng": "\u4ea8\u4eaf\u4f77\u54fc\u5548\u583c\u59ee\u6046\u6052\u6099\u63d8\u6494\u6841\u697b\u6a2a\u6a6b\u6f8b\u73e9\u7d4e\u811d\u8605\u884c\u8861\u8a99\u8afb\u9445\u9d34\u9e3b",
        "mu": "\u4ea9\u4eeb\u52df\u5776\u5893\u58b2\u59c6\u59e5\u5a12\u5cd4\u5e55\u5e59\u6048\u6155\u62c7\u66ae\u6728\u6958\u6a21\u6a45\u6bcd\u6be3\u6bea\u6c01\u6c90\u7091\u725f\u7261\u7267\u7273\u7546\u7552\u755d\u755e\u756e\u76ee\u7766\u782a\u7a46\u80df\u82dc\u83af\u869e\u9267\u926c\u94bc\u96ee\u9702\u97aa\u9da9",
        "ting": "\u4ead\u4fb9\u505c\u5385\u539b\u542c\u5722\u5a77\u5d49\u5e81\u5ead\u5ef0\u5ef3\u5ef7\u633a\u673e\u686f\u6883\u695f\u69b3\u6c40\u6d8f\u6e1f\u70c3\u70f4\u70f6\u73fd\u753a\u753c\u7b73\u7d8e\u8013\u8064\u8074\u807c\u807d\u8121\u8247\u827c\u839b\u8476\u8713\u874f\u8a94\u8aea\u9092\u92cc\u94e4\u95ae\u9706\u9793\u9832\u988b\u9bc5\u9f2e",
        "qin": "\u4eb2\u4fb5\u512c\u52e4\u53aa\u5422\u5423\u551a\u55ea\u5659\u5745\u5a87\u5ac0\u5bd1\u5bdd\u5be2\u5bf4\u5d5a\u5d94\u5e88\u5ed1\u61c3\u61c4\u628b\u6366\u63ff\u6407\u64b3\u64d2\u65b3\u6611\u66cb\u6a8e\u6b3d\u6c81\u6eb1\u6fbf\u7019\u73e1\u7434\u7439\u77dc\u79bd\u79e6\u7d85\u8039\u80a3\u82a9\u82b9\u83e3\u83e6\u8793\u87bc\u8804\u887e\u8983\u89aa\u8a9b\u8d7a\u8d7e\u9219\u92df\u94a6\u9513\u96c2\u9772\u9849\u99f8\u9a8e\u9bbc\u9d6d",
        "qing": "\u4eb2\u503e\u50be\u51ca\u5260\u52cd\u537f\u5568\u570a\u591d\u5bc8\u5e86\u5ebc\u5ece\u60c5\u6176\u6385\u64ce\u6674\u6692\u6a08\u6aa0\u6abe\u6b91\u6bb8\u6c22\u6c2b\u6c30\u6c6b\u6df8\u6e05\u6f00\u72c5\u7520\u7883\u78d8\u78ec\u7b90\u7dae\u7f44\u7f4a\u82d8\u873b\u89aa\u8acb\u8b26\u8bf7\u8efd\u8f15\u8f7b\u90ec\u9306\u944b\u9516\u9751\u9752\u9758\u9803\u9877\u9bd6\u9cad\u9ee5",
        "bo": "\u4eb3\u4f2f\u4fbc\u50f0\u525d\u5265\u52c3\u535a\u535c\u5575\u5b5b\u5b79\u5ca5\u5d8f\u5d93\u5e1b\u613d\u61ea\u62e8\u6300\u632c\u63b0\u640f\u64a5\u64ad\u64d8\u6540\u67cf\u67ed\u6822\u6872\u6a97\u6b02\u6cca\u6ce2\u6d61\u6e24\u717f\u7254\u72b1\u72bb\u72db\u733c\u73bb\u7588\u7676\u767e\u76cb\u7835\u7886\u7921\u7934\u7b94\u7ba5\u7c19\u7c38\u7cea\u7e74\u7f3d\u80c9\u8116\u818a\u822c\u8236\u824a\u82e9\u83e0\u8467\u8514\u8543\u8584\u859c\u8617\u86be\u889a\u88af\u894f\u896e\u8b08\u8b52\u8db5\u8ddb\u8e04\u8e23\u8e73\u90e3\u9251\u9262\u92cd\u939b\u946e\u94b5\u94b9\u94c2\u9548\u9911\u993a\u997d\u998e\u999e\u99c1\u99ca\u99ee\u9a4b\u9a73\u9ab2\u9ac6\u9ac9\u9b44\u9c4d\u9c8c\u9d53\u9e14\u9e41",
        "lian": "\u4eb7\u50c6\u5286\u5332\u5333\u55f9\u5652\u581c\u5941\u5969\u5971\u5aa1\u5afe\u5b1a\u5e18\u5ec9\u601c\u604b\u6169\u6190\u6200\u6459\u655b\u6582\u68bf\u695d\u69e4\u6ae3\u6b5b\u6b93\u6bae\u6d9f\u6e45\u6e93\u6f23\u6f4b\u6fb0\u6fb5\u6fc2\u6fd3\u7032\u70bc\u7149\u7191\u71eb\u740f\u7453\u7489\u78cf\u7a34\u7c3e\u7c62\u7c68\u7df4\u7e3a\u7e9e\u7ec3\u7fb7\u7ff4\u8054\u8068\u806b\u806e\u806f\u8138\u81c1\u81c9\u83b2\u8430\u84ee\u8539\u8595\u859f\u861d\u861e\u878a\u880a\u88e2\u88e3\u8933\u895d\u899d\u8b30\u8b67\u8e65\u8fde\u9023\u913b\u932c\u934a\u938c\u93c8\u942e\u94fe\u9570\u9b11\u9c0a\u9c31\u9ca2",
        "duo": "\u4eb8\u51d9\u5234\u5241\u525f\u526b\u5484\u54c6\u54da\u5689\u56b2\u579b\u579c\u57f5\u5815\u58ae\u58af\u591a\u591b\u593a\u596a\u5c2e\u5d1c\u5d9e\u5ea6\u60f0\u619c\u6305\u6306\u6387\u6553\u655a\u6560\u656a\u6735\u6736\u67c1\u67ee\u6857\u692f\u6bf2\u6cb2\u70a7\u70a8\u75d1\u75e5\u7d9e\u7f0d\u814f\u8235\u8324\u838c\u88f0\u8957\u8c80\u8d93\u8de5\u8dfa\u8e31\u8eb1\u8eb2\u8ec3\u922c\u9438\u94ce\u964a\u964f\u98ff\u9973\u99b1\u99c4\u9a6e\u9b0c\u9bb5\u9d7d",
        "ren": "\u4eba\u4ebb\u4ec1\u4ede\u4eed\u4efb\u5203\u5204\u58ec\u598a\u59d9\u5c7b\u5fc8\u5fcd\u5fce\u6041\u6732\u6752\u6820\u6823\u6895\u68ef\u7263\u7268\u79c2\u79f9\u7a14\u7d09\u7d1d\u7d4d\u7eab\u7eb4\u8095\u814d\u82a2\u834f\u8375\u845a\u887d\u88b5\u8a12\u8a8d\u8ba4\u8bb1\u8cc3\u8ed4\u8ee0\u8f6b\u9213\u928b\u976b\u976d\u9771\u9779\u97cc\u97e7\u98ea\u9901\u996a\u9b5c\u9d39\u9d40",
        "shen": "\u4ec0\u4f38\u4f81\u4fba\u4fe1\u53c2\u53c3\u53c5\u547b\u54c2\u59bd\u5a20\u5a76\u5b38\u5ba1\u5bb7\u5bc0\u5be9\u5c7e\u5cf7\u5f1e\u613c\u614e\u625f\u62bb\u6552\u661a\u67db\u6939\u6c20\u6c81\u6c88\u6d81\u6df1\u6e16\u6e17\u6ef2\u700b\u71ca\u73c5\u751a\u7521\u7527\u7533\u7606\u760e\u762e\u7712\u7718\u77ab\u77e4\u77e7\u7837\u795e\u7c76\u7c78\u7cc1\u7cc2\u7cdd\u7d33\u7ec5\u80be\u80c2\u8124\u814e\u8398\u845a\u8460\u8593\u8703\u88d1\u89be\u8a20\u8a37\u8a75\u8ad7\u8b85\u8bdc\u8c02\u8c09\u8eab\u90a5\u926e\u92e0\u9620\u9823\u99ea\u9b6b\u9cb9\u9d62",
        "she": "\u4ec0\u4f58\u538d\u5399\u5953\u5962\u5c04\u5f3d\u6151\u61fe\u6298\u62fe\u6351\u6368\u63f2\u6442\u6444\u651d\u6aa8\u6b07\u6b59\u6d89\u6e09\u6ee0\u7044\u731e\u751a\u7572\u793e\u820c\u820d\u820e\u8449\u850e\u8675\u86c7\u86e5\u8802\u8a2d\u8b47\u8bbe\u8cd2\u8cd6\u8d4a\u8d66\u9248\u9366\u94ca\u95cd\u9607\u97d8\u9a07\u9e9d",
        "ze": "\u4ec4\u4fa7\u5074\u5219\u5247\u548b\u5567\u5616\u5928\u5d31\u5e3b\u5e58\u5e82\u600e\u629e\u62e9\u64c7\u6603\u6617\u6c44\u6ca2\u6cfd\u6fa4\u769f\u7794\u7a04\u7a84\u7b2e\u7ba6\u7c00\u802b\u8234\u8434\u8536\u8808\u880c\u8ace\u8b2e\u8cac\u8cca\u8cfe\u8d23\u8d5c\u8fee\u9f5a",
        "jin": "\u4ec5\u4eca\u4f12\u4fad\u50c5\u50f8\u5118\u5153\u51da\u52b2\u52c1\u537a\u53aa\u5664\u568d\u57d0\u5807\u5890\u5997\u5ae4\u5b27\u5bd6\u5c3d\u5d9c\u5df9\u5dfe\u5ed1\u60cd\u616c\u6422\u65a4\u6649\u664b\u69ff\u6b4f\u6ba3\u6d25\u6d55\u6d78\u6e8d\u6f0c\u6fc5\u6fdc\u70ec\u71fc\u73d2\u740e\u7467\u7468\u747e\u74a1\u74b6\u763d\u76e1\u77dc\u7972\u7981\u7b4b\u7d1f\u7d27\u7dca\u7e09\u7f19\u80b5\u8355\u8369\u83eb\u83f3\u84f3\u85ce\u887f\u895f\u89b2\u89d0\u89d4\u8b39\u8c28\u8cee\u8d10\u8d46\u8fd1\u8fdb\u9032\u91d1\u91d2\u9326\u9485\u9526\u9773\u9949\u9991\u9e76\u9ec5\u9f7d",
        "pu": "\u4ec6\u50d5\u530d\u5657\u5703\u5711\u57d4\u5821\u58a3\u6251\u62aa\u64b2\u64c8\u666e\u669c\u66b4\u66dd\u6734\u6a38\u6a8f\u6c06\u6d66\u6ea5\u6f7d\u6fee\u7011\u70f3\u749e\u75e1\u77a8\u7a59\u7b81\u7e80\u812f\u8216\u8217\u8386\u83d0\u83e9\u8461\u84b1\u84b2\u8946\u8965\u8aa7\u8ae9\u8b5c\u8c31\u8e7c\u8f50\u917a\u92ea\u93f7\u9420\u94fa\u9564\u9568\u9660\u9bac",
        "ba": "\u4ec8\u4f2f\u516b\u53d0\u53ed\u5427\u54f5\u575d\u577a\u57bb\u58a2\u58e9\u593f\u59ad\u5c9c\u5df4\u5f1d\u6252\u628a\u629c\u62d4\u634c\u6733\u6777\u6b1b\u705e\u70a6\u7238\u72ae\u7308\u7390\u7436\u75a4\u79e1\u7b06\u7c91\u7d26\u7f62\u7f77\u7f93\u8019\u80c8\u82ad\u8307\u83dd\u8987\u8a59\u8c5d\u8dcb\u8ef7\u91df\u9200\u9238\u94af\u9738\u9776\u999b\u9b43\u9b5e\u9b81\u9b8a\u9c83\u9c85\u9c8c\u9f25",
        "reng": "\u4ecd\u6254\u793d\u82bf\u8fb8\u967e",
        "fo": "\u4ecf\u4f5b\u5772\u9af4",
        "lun": "\u4ed1\u4f26\u4f96\u502b\u55e7\u56f5\u5707\u57e8\u5a68\u5d18\u5d19\u60c0\u62a1\u6384\u68c6\u6ca6\u6dea\u6ea3\u7896\u7a10\u7db8\u7eb6\u8023\u8140\u83d5\u8726\u8ad6\u8bba\u8e1a\u8f2a\u8f6e\u9300\u966f\u9be9",
        "cang": "\u4ed3\u4efa\u4f27\u5009\u5096\u51d4\u5328\u5d62\u6ca7\u6ec4\u8231\u8259\u82cd\u84bc\u8535\u85cf\u87a5\u8cf6\u9476\u9dac\u9e27",
        "zi": "\u4ed4\u5033\u5179\u525a\u5407\u5431\u5470\u5472\u54a8\u5559\u55de\u59c9\u59ca\u59d5\u59ff\u5b50\u5b56\u5b57\u5b5c\u5b73\u5b76\u5d30\u5d6b\u6063\u627b\u674d\u6825\u6893\u6914\u699f\u6d13\u6dc4\u6e0d\u6e7d\u6ecb\u6ed3\u6f2c\u6fac\u7278\u7386\u7725\u7726\u77f7\u7920\u798c\u79c4\u79ed\u79f6\u7a35\u7b2b\u7c7d\u7ca2\u7d0e\u7d2b\u7dc7\u7f01\u8014\u80cf\u80d4\u80fe\u81ea\u8293\u8308\u830a\u8321\u8332\u8457\u8458\u8678\u87d5\u8800\u89dc\u8a3e\u8a3f\u8aee\u8c18\u8cb2\u8cc7\u8d40\u8d44\u8d91\u8da6\u8f1c\u8f3a\u8f8e\u9111\u91e8\u922d\u9319\u937f\u93a1\u9531\u9543\u983e\u983f\u9aed\u9bd4\u9c26\u9cbb\u9d1c\u9d85\u9dbf\u9f12\u9f4d\u9f5c\u9f87",
        "zai": "\u4ed4\u4fa2\u50a4\u510e\u518d\u54c9\u5728\u5bb0\u5d3d\u6257\u683d\u6e3d\u707d\u707e\u70d6\u753e\u7e21\u83d1\u8cf3\u8f09\u8f7d",
        "xian": "\u4ed9\u4eda\u4f23\u4fd4\u50ca\u50e9\u50f2\u50f4\u5148\u51bc\u53bf\u549e\u54b8\u54ef\u550c\u5563\u5615\u57b7\u597e\u59ed\u59fa\u5a0a\u5a28\u5a34\u5a39\u5a71\u5acc\u5afa\u5afb\u5b10\u5b45\u5baa\u5c1f\u5c20\u5c73\u5c98\u5cf4\u5d04\u5dae\u5e70\u5eef\u5f26\u5ffa\u61aa\u61b2\u61b8\u6326\u6380\u641f\u648a\u648f\u6507\u663e\u665b\u66b9\u6774\u67ae\u6a4c\u6af6\u6be8\u6c19\u6d17\u6d80\u6d8e\u6f96\u7017\u7066\u70cd\u71c5\u71f9\u72dd\u7303\u732e\u736b\u736e\u737b\u7381\u73b0\u73d7\u73fe\u7509\u75c3\u75eb\u7647\u764e\u766c\u770c\u774d\u77af\u7925\u7946\u7992\u79c8\u7b45\u7bb2\u7c7c\u7caf\u7d43\u7d64\u7dab\u7dda\u7e23\u7e4a\u7e8e\u7e96\u7ea4\u7ebf\u7f10\u7fa1\u7fa8\u7fac\u80d8\u817a\u81d4\u81fd\u8237\u82cb\u82ee\u83a7\u83b6\u8474\u84d2\u859f\u85d3\u85d6\u861a\u86ac\u86bf\u86dd\u8706\u8854\u8858\u893c\u8973\u898b\u89c1\u8a2e\u8aa2\u8af4\u8c4f\u8ce2\u8d12\u8d24\u8d7b\u8de3\u8df9\u8e6e\u8e9a\u8f31\u8f5e\u9170\u918e\u9291\u929b\u929c\u92e7\u930e\u9341\u934c\u94e3\u94e6\u9528\u9591\u9592\u95f2\u9650\u9665\u9669\u9677\u967a\u96aa\u9730\u97c5\u97ef\u97f1\u9855\u986f\u9921\u9985\u99a6\u9bae\u9c7b\u9c9c\u9df3\u9df4\u9dfc\u9e47\u9e79\u9eb2\u9f38\u9f74",
        "cha": "\u4edb\u4f98\u505b\u5239\u524e\u53c9\u55b3\u55cf\u5693\u579e\u597c\u59f9\u5ac5\u5bdf\u5c94\u5d56\u5dee\u6260\u6268\u633f\u63d2\u63f7\u643d\u6748\u67e5\u67fb\u6942\u69ce\u6aab\u6c4a\u7339\u7580\u78b4\u79c5\u7d01\u809e\u81ff\u8256\u832c\u8336\u8869\u8a0d\u8a67\u8a6b\u8be7\u8e45\u929f\u9364\u9388\u9454\u9538\u9572\u9937\u9987",
        "hong": "\u4edc\u53ff\u543d\u544d\u54c4\u54c5\u55ca\u57ac\u5985\u5a02\u5b8f\u5b96\u5cf5\u5f18\u5f4b\u63c8\u664e\u6c5e\u6c6f\u6cd3\u6d2a\u6d64\u6e31\u6e39\u6f42\u6f92\u7074\u70d8\u7122\u7392\u739c\u74e8\u7854\u7861\u7ad1\u7ae4\u7bca\u7ca0\u7d05\u7d18\u7d2d\u7d8b\u7ea2\u7eae\u7fc3\u7fdd\u803e\u823c\u82f0\u836d\u8452\u8453\u857b\u85a8\u8679\u8a07\u8a0c\u8ba7\u8c39\u8c3c\u8c3e\u8ee3\u8f37\u8f5f\u8f70\u921c\u9277\u92d0\u9359\u9367\u958e\u95a7\u95f3\u971f\u9783\u986d\u9b28\u9b5f\u9d3b\u9e3f\u9ec9\u9ecc",
        "tong": "\u4edd\u4f5f\u4f97\u50ee\u52ed\u540c\u54c3\u55f5\u578c\u59db\u5cc2\u5cd2\u5cdd\u5e9d\u5f64\u606b\u6078\u615f\u6185\u6345\u664d\u66c8\u6723\u6850\u6876\u6a0b\u6a66\u6c03\u6d75\u6f7c\u70b5\u70d4\u70d5\u71d1\u721e\u729d\u72ea\u735e\u75cc\u75db\u772e\u77b3\u783c\u79f1\u7a5c\u7ae5\u7b52\u7b69\u7ca1\u7d67\u7d71\u7d82\u7edf\u7f7f\u81a7\u825f\u833c\u84ea\u856b\u8633\u8855\u8a77\u8ff5\u901a\u916e\u9256\u9275\u9285\u94dc\u9907\u9ba6\u9c96\u9f28",
        "di": "\u4ee2\u4efe\u4f4e\u5059\u50c0\u5467\u54cb\u5519\u5547\u5572\u5600\u5681\u5730\u5754\u5758\u577b\u57ca\u57de\u5824\u5886\u5891\u5943\u5a23\u5ae1\u5d7d\u5db3\u5e1d\u5e95\u5ef8\u5f1f\u5f24\u5f7d\u601f\u6178\u62b5\u62de\u638b\u63d0\u6455\u654c\u6575\u65f3\u6755\u67e2\u688a\u6891\u68e3\u6974\u6a00\u6c10\u6da4\u6e27\u6ecc\u6ef4\u6f6a\u710d\u7208\u7274\u7292\u72c4\u7393\u73f6\u750b\u7684\u7721\u7747\u7825\u78b2\u78fe\u7976\u7998\u7b1b\u7b2c\u7bf4\u7c74\u7cf4\u7d88\u7de0\u7ee8\u7f14\u7f9d\u7fdf\u805c\u8091\u8163\u82bd\u82d6\u830b\u837b\u83c2\u83e7\u8482\u850b\u8510\u8515\u85cb\u85e1\u8673\u87ae\u889b\u89bf\u89cc\u89dd\u8a46\u8ae6\u8bcb\u8c1b\u8c74\u8d86\u8e36\u8e62\u8ed1\u8ee7\u8fea\u9012\u9013\u905e\u90b8\u91f1\u926a\u9349\u93d1\u955d\u963a\u976e\u97ae\u9814\u99b0\u9ab6\u9e10",
        "dai": "\u4ee3\u50a3\u53c7\u5446\u5454\u57ed\u5927\u5cb1\u5e12\u5e26\u5e2f\u5e36\u5ed7\u5f85\u5fd5\u6020\u61db\u6234\u66c3\u67cb\u6b79\u6b7a\u6b86\u6c4f\u703b\u7343\u73b3\u7447\u7519\u7c24\u7d3f\u7dff\u7ed0\u825c\u888b\u8976\u8cb8\u8d37\u8de2\u8e5b\u8eda\u8ee9\u8f6a\u8fe8\u902e\u9168\u9734\u9746\u9a80\u9edb\u9ef1",
        "chao": "\u4ee6\u4eef\u527f\u52e6\u5435\u5632\u5dd0\u5de2\u5de3\u5f28\u600a\u6284\u6641\u671d\u6a14\u6b29\u6f6e\u7092\u712f\u717c\u7727\u7ef0\u7f7a\u8016\u89d8\u8a2c\u8b3f\u8d85\u8f48\u911b\u9214\u949e\u9ea8\u9f02\u9f0c",
        "chang": "\u4ee7\u4f25\u5000\u5018\u5021\u507f\u50d8\u511f\u514f\u5382\u5388\u53b0\u5531\u5617\u5690\u573a\u5834\u5872\u5a3c\u5ae6\u5c1d\u5e38\u5ee0\u5f9c\u6005\u60b5\u60dd\u655e\u660c\u6636\u667f\u66a2\u6c05\u6dd0\u713b\u7316\u739a\u7429\u747a\u74fa\u751e\u7545\u757c\u7cbb\u80a0\u8178\u8193\u82cc\u83d6\u8407\u88ee\u88f3\u8aaf\u92f9\u92ff\u9329\u93db\u9520\u9577\u9578\u957f\u95b6\u960a\u97d4\u9b2f\u9be7\u9c68\u9cb3\u9cbf\u9f1a",
        "sa": "\u4ee8\u5345\u6332\u6492\u6503\u6ad2\u6d12\u6f75\u7051\u810e\u8428\u85a9\u8a2f\u9491\u96a1\u9778\u98af\u98d2\u99ba",
        "men": "\u4eec\u5011\u60b6\u61d1\u61e3\u626a\u636b\u66aa\u6a20\u7116\u71dc\u7a48\u83db\u864b\u9346\u9494\u9580\u9585\u95e8\u95f7",
        "yang": "\u4ef0\u4f52\u4f6f\u517b\u52b7\u536c\u5771\u579f\u592e\u59ce\u5a78\u5c9f\u5d35\u5f89\u600f\u6059\u6143\u61e9\u626c\u62b0\u63da\u6501\u656d\u65f8\u661c\u6698\u6768\u67cd\u6837\u694a\u69d8\u6a23\u6b83\u6c27\u6c31\u6cf1\u6d0b\u6f3e\u7001\u7080\u70b4\u70ca\u716c\u739a\u73dc\u7452\u75a1\u75d2\u760d\u7662\u770f\u773b\u7993\u79e7\u7d3b\u7f8a\u7f8f\u7f95\u7faa\u80e6\u86d8\u8746\u8a47\u8af9\u8f30\u9260\u935a\u940a\u9496\u9626\u9633\u967d\u96f5\u9737\u9785\u98ba\u98cf\u990a\u990b\u99da\u9c11\u9d26\u9e09\u9e2f",
        "jian": "\u4ef6\u4f9f\u4fed\u4ff4\u5039\u5065\u50ed\u5109\u517c\u51bf\u51cf\u5251\u5263\u526a\u5271\u528d\u528e\u5292\u5294\u56cf\u56dd\u575a\u5805\u583f\u5978\u59e6\u59e7\u5b6f\u5bcb\u5c16\u5e75\u5ecc\u5efa\u5f3f\u5fa4\u60e4\u620b\u6214\u6229\u622c\u62e3\u6338\u6361\u63c0\u63c3\u641b\u64bf\u64f6\u65d4\u6695\u67a7\u67ec\u682b\u6898\u68c0\u691c\u6937\u6957\u6997\u69db\u6a2b\u6aa2\u6abb\u6afc\u6b7c\u6bb1\u6bb2\u6bfd\u6d0a\u6d45\u6da7\u6dfa\u6e10\u6e1b\u6e54\u6e55\u6e85\u6f38\u6f97\u6ffa\u7010\u7033\u7038\u703d\u714e\u719e\u71b8\u724b\u726e\u728d\u730f\u73aa\u73d4\u7450\u76d1\u76e3\u7751\u7777\u77b7\u77bc\u7877\u788a\u78b1\u78f5\u7900\u7906\u791b\u7b15\u7b3a\u7b67\u7b80\u7b8b\u7bad\u7bef\u7c21\u7c5b\u7ccb\u7cee\u7d78\u7dd8\u7e11\u7e5d\u7e6d\u7e7f\u7f04\u7f23\u7fe6\u80a9\u8171\u81f6\u8230\u8266\u8270\u8271\u8327\u8350\u83c5\u83fa\u844c\u84b9\u852a\u8551\u8573\u85a6\u85c6\u8643\u87b9\u8812\u88e5\u8947\u8949\u897a\u898b\u89b5\u89b8\u89c1\u8a43\u8acc\u8ad3\u8aeb\u8b07\u8b2d\u8b56\u8b7c\u8b7e\u8c0f\u8c2b\u8c2e\u8c5c\u8c63\u8cce\u8ce4\u8d31\u8d9d\u8dbc\u8df5\u8e10\u8e3a\u8e47\u91f0\u91fc\u9203\u9274\u92fb\u9373\u9375\u93e9\u9417\u9427\u9451\u9452\u946c\u946f\u9473\u950f\u952e\u9593\u95f4\u976c\u97ac\u97af\u97c0\u97c9\u98e6\u991e\u9930\u996f\u99a2\u9a1d\u9b0b\u9b50\u9c0e\u9c14\u9c1c\u9c39\u9ca3\u9cd2\u9cfd\u9d73\u9dbc\u9e63\u9e78\u9e7b\u9e7c\u9e89",
        "fen": "\u4efd\u507e\u50e8\u515d\u5206\u5429\u5746\u574b\u575f\u58b3\u594b\u596e\u59a2\u5c8e\u5e09\u5e69\u5f05\u5fff\u6124\u61a4\u6610\u6706\u678c\u68a4\u68fb\u68fc\u6a68\u6c1b\u6c7e\u6fc6\u7035\u7083\u711a\u71cc\u71d3\u73a2\u780f\u79ce\u7ad3\u7ad5\u7c89\u7caa\u7cde\u7d1b\u7eb7\u7f92\u7fb5\u7fc2\u81b9\u82ac\u84b6\u8561\u86a0\u86a1\u886f\u8a1c\u8c6e\u8c76\u8f52\u915a\u9216\u943c\u96ab\u96f0\u9934\u9959\u999a\u99a9\u9b75\u9c5d\u9cbc\u9cfb\u9ec2\u9efa\u9f16\u9f22",
        "fang": "\u4eff\u5023\u531a\u574a\u57c5\u59a8\u5f77\u623f\u653e\u65b9\u65ca\u6609\u6618\u678b\u6c78\u6dd3\u7265\u74ec\u7706\u7d21\u7eba\u80aa\u822b\u82b3\u8684\u8a2a\u8bbf\u8dbd\u90a1\u9201\u94ab\u9632\u9ae3\u9b74\u9c82\u9d0b\u9dad",
        "pei": "\u4f02\u4f69\u5478\u574f\u57ba\u57f9\u599a\u59f5\u5a1d\u5caf\u5e14\u65be\u65c6\u6622\u67f8\u6bf0\u6c9b\u6d7f\u73ee\u7423\u7fc7\u80a7\u80da\u82dd\u8356\u8843\u88f4\u88f5\u8ce0\u8d54\u8f61\u8f94\u914d\u9185\u9307\u952b\u962b\u966a\u966b\u9708\u99b7",
        "diao": "\u4f04\u51cb\u5201\u53fc\u540a\u595d\u5c4c\u5f14\u5f34\u5f6b\u625a\u6389\u6ba6\u6c48\u7431\u7639\u7797\u7889\u7a8e\u7ab5\u7ae8\u84e7\u866d\u86c1\u8a0b\u8a82\u8abf\u8c03\u8c82\u91e3\u929a\u92b1\u92fd\u9443\u9493\u94de\u94eb\u96d5\u9b61\u9b89\u9bdb\u9cb7\u9ced\u9d70\u9e1f\u9f26",
        "dun": "\u4f05\u5428\u5678\u56e4\u5749\u58a9\u58aa\u5d38\u5e89\u60c7\u627d\u6489\u64b4\u6566\u696f\u6c8c\u6f61\u7096\u71c9\u729c\u76f9\u76fe\u7818\u7905\u815e\u8733\u8db8\u8e32\u8e72\u8e7e\u8e89\u9007\u9041\u906f\u920d\u9413\u949d\u9566\u9813\u987f\u9a50\u9da8",
        "wen": "\u4f06\u514d\u520e\u543b\u5461\u554f\u586d\u598f\u6286\u63fe\u6435\u6587\u6637\u687d\u6b9f\u6c76\u6e02\u6e29\u6eab\u7086\u7193\u739f\u73f3\u741d\u7465\u74ba\u7612\u761f\u7783\u7a33\u7a4f\u7a69\u7d0a\u7d0b\u7eb9\u805e\u80b3\u8117\u82a0\u83ac\u8570\u8689\u868a\u87a1\u87c1\u8c71\u8f3c\u8f40\u8f92\u95ba\u95bf\u95c5\u95e6\u95ee\u95fb\u960c\u96ef\u99a7\u99bc\u99c7\u9b70\u9c1b\u9c2e\u9cc1\u9cfc\u9d0d\u9d16\u9f24",
        "xin": "\u4f08\u4f29\u4fe1\u4ffd\u515f\u5342\u5677\u56df\u59a1\u5b5e\u5bfb\u5c0b\u5ede\u5fc3\u5fc4\u5ffb\u60de\u6533\u65b0\u6615\u677a\u6a33\u6b23\u6b46\u7098\u709b\u712e\u7161\u76fa\u812a\u81b7\u820b\u82af\u8398\u85aa\u8845\u8951\u8a22\u8a2b\u8ed0\u8f9b\u9129\u91c1\u920a\u92c5\u9414\u946b\u950c\u9561\u9620\u9856\u99a8\u99b8",
        "xiu": "\u4f11\u4fe2\u4fee\u54bb\u55c5\u5bbf\u5cab\u5cc0\u5ea5\u673d\u6a07\u6ba0\u6eb4\u6eeb\u6f43\u70cc\u73db\u7407\u79c0\u7cd4\u7d87\u7d89\u7e4d\u7e61\u7ee3\u7f9e\u8129\u81ed\u81f0\u81f9\u8320\u84da\u84e8\u8791\u8896\u890e\u890f\u8c85\u929d\u92b9\u9380\u93c5\u93e5\u93fd\u9508\u9948\u9990\u9ae4\u9af9\u9d42\u9e3a\u9f45",
        "bei": "\u4f13\u4ffb\u4ffe\u500d\u505d\u5079\u5099\u50c3\u5317\u5351\u5457\u54f1\u5504\u57e4\u5907\u5970\u5b5b\u5eb3\u6096\u60b2\u60eb\u6102\u618a\u63f9\u6601\u676f\u686e\u6896\u6911\u7119\u726c\u7295\u72c8\u72fd\u73fc\u7432\u76c3\u7891\u789a\u7986\u7ae1\u7cd2\u7d34\u7dbc\u80cc\u81c2\u8406\u84d3\u88ab\u88e8\u8919\u8a96\u8c9d\u8d1d\u8ef0\u8f29\u8f88\u90b6\u90e5\u9101\u9273\u92c7\u9303\u943e\u94a1\u9642\u9781\u97b4\u97db\u9d6f\u9e4e",
        "chen": "\u4f14\u4f27\u512d\u55d4\u56ab\u5814\u5875\u588b\u5926\u5a20\u5bb8\u5c18\u5c52\u5ff1\u6116\u62bb\u6375\u6437\u6550\u6668\u66df\u68fd\u6987\u6a04\u6a59\u6aec\u6c88\u6c89\u7141\u741b\u75a2\u778b\u7876\u789c\u78e3\u79e4\u79f0\u7a31\u7a6a\u81e3\u831e\u8380\u8390\u852f\u85bc\u85fd\u87b4\u886c\u88d6\u896f\u8a26\u8ac3\u8af6\u8b13\u8b96\u8c0c\u8c36\u8cdd\u8d02\u8d81\u8d82\u8dbb\u8e38\u8ed9\u8fb0\u8fe7\u90f4\u9202\u9356\u9648\u9673\u9703\u9dd0\u9e8e\u9f53\u9f54\u9f80",
        "tang": "\u4f16\u4f25\u5018\u5052\u508f\u50a5\u513b\u528f\u5510\u557a\u5621\u5763\u5802\u5858\u5e11\u6203\u642a\u6465\u655e\u66ed\u68e0\u69b6\u6a18\u6a56\u6c64\u6dcc\u6e6f\u6e8f\u6f1f\u70eb\u717b\u71d9\u7223\u746d\u77d8\u78c4\u799f\u7bd6\u7cc3\u7cd6\u7cdb\u7fb0\u8025\u8185\u819b\u84ce\u859a\u876a\u8797\u87b3\u8d6f\u8d9f\u8e3c\u8e5a\u8eba\u910c\u91a3\u9395\u93b2\u93dc\u940b\u9482\u94f4\u954b\u9557\u95db\u969a\u97ba\u9933\u9939\u9944\u9967\u9db6\u9f1e",
        "huo": "\u4f19\u4f78\u5268\u5290\u548a\u548c\u549f\u55c0\u5684\u56af\u56bf\u58d1\u5925\u596f\u5f5f\u5f60\u60d1\u6216\u6347\u639d\u64ed\u6509\u65e4\u66e4\u6947\u6ab4\u6c8e\u6d3b\u6e71\u6f37\u6fe9\u7016\u706b\u7372\u74c1\u7668\u7713\u77c6\u77d0\u77f1\u7845\u790a\u7978\u798d\u79f3\u7a6b\u8020\u802f\u81d2\u8267\u83b7\u843f\u84a6\u85ff\u8816\u8b0b\u8b97\u8c41\u8ca8\u8d27\u90a9\u9225\u9343\u936f\u93d3\u944a\u94ac\u952a\u956c\u9584\u96d8\u970d\u9743\u97c4\u9a1e\u9c6f",
        "hui": "\u4f1a\u50e1\u5136\u532f\u5349\u54b4\u54d5\u5599\u5612\u5655\u5666\u5667\u5696\u56d8\u56de\u56ec\u571a\u5815\u58ae\u5a4e\u5b07\u5bed\u5e51\u5ec6\u5efb\u5efd\u5f57\u5f59\u5f5a\u5f8a\u5fbd\u605a\u605b\u6062\u6075\u6094\u60e0\u6167\u6193\u62fb\u6325\u63ee\u649d\u6656\u6666\u6689\u66b3\u6703\u6867\u69e5\u6a5e\u6a93\u6a9c\u6ad8\u6ba8\u6bc0\u6bc1\u6bc7\u6c47\u6ccb\u6d03\u6d04\u6d4d\u6e83\u6ed9\u6f53\u6f70\u6fae\u6fca\u7008\u7070\u70e0\u70e3\u70e9\u7147\u71ec\u71f4\u7369\u73f2\u743f\u74af\u75d0\u7773\u77ba\u7988\u79ac\u79fd\u7a62\u7bf2\u7d75\u7e50\u7e62\u7e6a\u7ed8\u7f0b\u7fd9\u7fda\u7fec\u7ffd\u8294\u8334\u835f\u8527\u8559\u8588\u85f1\u866b\u867a\u8698\u86d4\u86d5\u8716\u87ea\u8886\u890c\u8918\u8958\u8a6f\u8a74\u8a7c\u8aa8\u8af1\u8b53\u8b6d\u8b7f\u8bb3\u8bd9\u8bf2\u8c57\u8cc4\u8d3f\u8f1d\u8f89\u8ff4\u9025\u93f8\u942c\u95e0\u9613\u9693\u96b3\u9767\u97e2\u982e\u986a\u9892\u992f\u9956\u9bb0\u9c34\u9ebe\u9f3f",
        "kuai": "\u4f1a\u4fa9\u5108\u51f7\u54bc\u54d9\u558e\u5672\u5757\u584a\u58a4\u5feb\u64d3\u6703\u6a9c\u6b33\u6d4d\u6fae\u72ef\u736a\u7b77\u7ce9\u810d\u81be\u84af\u90d0\u9136\u99c3\u9b20\u9c60\u9c99",
        "cui": "\u4f1c\u5005\u50ac\u51d7\u5550\u555b\u55fa\u5894\u5d14\u5ff0\u60b4\u615b\u6467\u69b1\u69ef\u6a47\u6bf3\u6dec\u6f3c\u6fe2\u7120\u712b\u7355\u7417\u7480\u75a9\u7601\u76a0\u78ea\u7ac1\u7c8b\u7cb9\u7d23\u7db7\u7f1e\u7fc6\u7fe0\u8103\u8106\u813a\u81ac\u81b5\u81ce\u8403\u8870\u8da1\u93d9\u96b9\u9847",
        "zu": "\u4f1c\u4fce\u50b6\u5346\u5352\u54eb\u55fe\u5d12\u5d2a\u637d\u65cf\u723c\u73c7\u7956\u79df\u7d44\u7ec4\u83f9\u84a9\u8a5b\u8bc5\u8db3\u8e24\u8e3f\u8e75\u9390\u93c3\u955e\u963b\u977b",
        "che": "\u4f21\u4fe5\u5056\u52f6\u5513\u577c\u5972\u5c3a\u5c6e\u5f7b\u5fb9\u626f\u63a3\u64a4\u64a6\u6f88\u70f2\u7221\u77ae\u7817\u7868\u7869\u8045\u8397\u86fc\u8eca\u8f4d\u8f66\u8fe0",
        "xun": "\u4f28\u4f9a\u5071\u52cb\u52db\u52f2\u52f3\u5640\u565a\u5743\u57d9\u5864\u58e6\u5bfb\u5c0b\u5ccb\u5de1\u5dfa\u5dfd\u5ef5\u5f87\u5faa\u6042\u65ec\u66db\u674a\u6794\u6812\u686a\u69c6\u6a41\u6b89\u6bbe\u6be5\u6c5b\u6d35\u6d54\u6d5a\u6f6f\u7104\u7105\u718f\u71d6\u71fb\u720b\u736f\u73e3\u7495\u7543\u77c4\u7aa8\u7d03\u7e81\u81d0\u8340\u8364\u8368\u8477\u8512\u8541\u8548\u85ab\u85b0\u860d\u87f3\u8a0a\u8a13\u8a19\u8a62\u8bad\u8baf\u8be2\u8cd0\u8fc5\u8fff\u900a\u905c\u90c7\u91ba\u9442\u97d7\u9868\u99b4\u99e8\u9a6f\u9c4f\u9c58\u9c9f\u9d54\u9d55",
        "chi": "\u4f2c\u4f88\u4f99\u4fff\u5082\u50ba\u52c5\u5319\u53f1\u53fa\u5403\u544e\u54e7\u557b\u55ab\u55e4\u5644\u577b\u5791\u5880\u599b\u59fc\u5ab8\u5c3a\u5cbb\u5f1b\u5f68\u5f72\u5f73\u5fa5\u5fb2\u5fef\u6040\u605c\u6065\u6157\u618f\u61d8\u6220\u6261\u62b6\u62f8\u6301\u645b\u6470\u6555\u65a5\u6758\u6818\u683b\u6b3c\u6b6d\u6b6f\u6c60\u6c66\u6dd4\u707b\u70bd\u70fe\u71be\u74fb\u75d3\u75f4\u75f8\u761b\u7661\u7735\u779d\u79a0\u7afe\u7b1e\u7b42\u7b88\u7b8e\u7bea\u7c8e\u7ce6\u7d7a\u7fc4\u7fc5\u7fe4\u801b\u803b\u830c\u834e\u8687\u8694\u86a9\u86b3\u87ad\u88b3\u88ed\u892b\u8a35\u8a83\u8aba\u8b18\u8c49\u8cbe\u8d64\u8d7f\u8d8d\u8da9\u8dee\u8e1f\u8fdf\u9045\u905f\u9072\u9253\u9279\u9290\u98ed\u994e\u996c\u99b3\u9a70\u9b51\u9d1f\u9d44\u9d92\u9dd8\u9e31\u9eb6\u9ed0\u9f52\u9f5d\u9f79\u9f7f",
        "xuan": "\u4f2d\u4f61\u5107\u5238\u5405\u54ba\u55a7\u57cd\u5847\u5864\u58ce\u59b6\u5a97\u5ad9\u5b1b\u5ba3\u5f32\u6030\u60ac\u6103\u610b\u61f8\u63ce\u65cb\u660d\u6621\u6645\u6684\u66b6\u688b\u6965\u6966\u6a88\u6ceb\u6e32\u6f29\u70ab\u70dc\u714a\u7156\u7384\u73b9\u7401\u7444\u7487\u74bf\u75c3\u7663\u766c\u7729\u7734\u777b\u77ce\u78b9\u79a4\u79ab\u7d62\u7e23\u7e3c\u7e4f\u7eda\u7fe7\u7ffe\u8431\u8432\u8519\u857f\u85fc\u8610\u8701\u8756\u8809\u8852\u88a8\u8ab8\u8ae0\u8afc\u8b5e\u8b82\u8c16\u8d19\u8ed2\u8f69\u9009\u9078\u9084\u9249\u92d7\u9379\u93c7\u94c9\u955f\u9799\u98b4\u99fd\u9db1",
        "nao": "\u4f2e\u52aa\u5318\u5476\u57b4\u5816\u5912\u5b6c\u5cf1\u5da9\u5dce\u5dd9\u6013\u607c\u60a9\u60f1\u61b9\u6320\u6493\u6a48\u6dd6\u7331\u7376\u737f\u7459\u7847\u78af\u7e77\u8111\u8133\u8166\u81d1\u8641\u86f2\u87ef\u8a49\u8b4a\u9403\u94d9\u9599\u95f9\u9ad0\u9b27",
        "nu": "\u4f2e\u52aa\u5974\u5b65\u5f29\u6012\u6419\u782e\u7b2f\u80ec\u8498\u99d1\u9a7d\u9d11",
        "bai": "\u4f2f\u4f70\u5161\u5457\u5504\u5e8d\u62dc\u62dd\u636d\u63b0\u6446\u64d8\u64fa\u6557\u67cf\u6822\u767d\u767e\u77f2\u7a17\u7ae1\u7ca8\u7cba\u7d54\u85ad\u86fd\u896c\u8d01\u8d25",
        "gu": "\u4f30\u50f1\u51c5\u51f8\u53e4\u543f\u544a\u5471\u5495\u5502\u5503\u560f\u56fa\u580c\u5903\u59d1\u5af4\u5b64\u5bb6\u5c33\u5d13\u5d2e\u6132\u6262\u6545\u675a\u67e7\u688f\u68dd\u6996\u69be\u6a6d\u6bc2\u6c69\u6cbd\u6cd2\u6dc8\u6ed1\u6ff2\u7014\u726f\u7271\u727f\u72dc\u75fc\u76b7\u76bc\u76ec\u77bd\u797b\u7a12\u7a40\u7b1f\u7b8d\u7b9b\u7cd3\u7e0e\u7f5b\u7f5f\u7f96\u80a1\u8135\u81cc\u82fd\u83c7\u83f0\u84c7\u85a3\u86c4\u86ca\u86cc\u8831\u89da\u8a41\u8bc2\u8c37\u8cc8\u8d3e\u8ef1\u8ef2\u8f42\u8f71\u8f9c\u9164\u9232\u9237\u932e\u94b4\u9522\u96c7\u980b\u9867\u987e\u9936\u9989\u9aa8\u9b95\u9bdd\u9cb4\u9d23\u9d60\u9dbb\u9e2a\u9e44\u9e58\u9f13\u9f14",
        "ni": "\u4f31\u4f32\u4f60\u502a\u5117\u511e\u533f\u5462\u576d\u57ff\u5804\u59ae\u59b3\u59c4\u5a57\u5adf\u5b3a\u5b74\u5c3c\u5c3f\u5c54\u5c70\u6029\u60c4\u615d\u62b3\u62df\u64ec\u65ce\u6635\u66b1\u67c5\u6ab7\u6c3c\u6ce5\u6de3\u6eba\u72cb\u72d4\u730a\u7768\u7962\u79b0\u79dc\u7c7e\u7e0c\u80d2\u817b\u81a9\u81e1\u82e8\u85bf\u86ad\u873a\u89ec\u8b7a\u8c8e\u8ddc\u8f17\u8fe1\u9006\u90f3\u922e\u9268\u94cc\u96ac\u9713\u999c\u9bd3\u9be2\u9cb5\u9d82\u9dc1\u9dca\u9e91\u9f6f",
        "ban": "\u4f34\u529e\u534a\u5742\u59c5\u5c85\u6011\u626e\u6273\u62cc\u642c\u653d\u6591\u6592\u6604\u670c\u677f\u67c8\u6e74\u723f\u7248\u73ed\u74e3\u74ea\u7622\u764d\u79da\u7c84\u7d46\u7eca\u80a6\u8228\u822c\u8668\u8742\u878c\u8929\u8fa6\u8fac\u9211\u9261\u94a3\u95c6\u962a\u977d\u9812\u9881",
        "xu": "\u4f35\u4f90\u4fc6\u5020\u5066\u5194\u52d6\u52d7\u5379\u53d9\u5401\u5474\u55a3\u5618\u563c\u5653\u5729\u57bf\u589f\u58fb\u59c1\u5a7f\u5aad\u5b03\u5b2c\u5e41\u5e8f\u5f90\u6034\u6064\u6149\u620c\u63df\u654d\u6558\u65ed\u65f4\u662b\u6647\u6702\u6829\u6948\u69d2\u6b28\u6b30\u6b54\u6b88\u6c7f\u6c80\u6d2b\u6d52\u6e4f\u6e51\u6e86\u6ef8\u6f35\u6f4a\u70c5\u7166\u73dd\u73ec\u755c\u759e\u76e2\u76e8\u76f1\u7781\u77b2\u7809\u7a30\u7a38\u7aa2\u7c72\u7cc8\u7d6e\u7d9a\u7dd2\u7dd6\u7e03\u7e7b\u7e8c\u7eea\u7eed\u805f\u80e5\u84a3\u84c4\u84ff\u8566\u85c7\u85da\u8657\u865a\u865b\u8751\u8a0f\u8a31\u8a39\u8a61\u8add\u8b43\u8bb8\u8be9\u8c1e\u8cc9\u9126\u9157\u9191\u928a\u9450\u9700\u9808\u980a\u987b\u987c\u9a49\u9b1a\u9b46\u9b56\u9c6e",
        "zhou": "\u4f37\u4f9c\u4ffc\u50fd\u5191\u5468\u546a\u5492\u54ae\u5541\u558c\u5663\u59af\u59b0\u5a64\u5b99\u5dde\u5e1a\u5f9f\u601e\u663c\u665d\u666d\u6d00\u6d32\u6dcd\u70d0\u73d8\u7503\u759b\u76b1\u76ba\u76e9\u776d\u77ea\u78a1\u7b92\u7c40\u7c52\u7c55\u7c99\u7ca5\u7d02\u7e10\u7e47\u7ea3\u7ec9\u8098\u80c4\u821f\u836e\u83f7\u8464\u8a4b\u8b05\u8b78\u8bcc\u8bea\u8cd9\u8d52\u8ef8\u8f08\u8f16\u8f74\u8f80\u9031\u914e\u9282\u99ce\u9a06\u9a5f\u9aa4\u9bde\u9d43\u9e3c",
        "qu": "\u4f39\u4f49\u51f5\u521e\u52ac\u5324\u5337\u533a\u5340\u53ba\u53bb\u53d6\u547f\u5765\u5a36\u5c48\u5c96\u5ca8\u5cb4\u5d87\u5fc2\u6188\u61c5\u620c\u6235\u62be\u657a\u65aa\u66f2\u6710\u6b0b\u6c0d\u6d40\u6ded\u6e20\u6f06\u7048\u710c\u7383\u7496\u74a9\u766f\u77bf\u7820\u78f2\u795b\u7aec\u7b41\u7c67\u7cac\u7d36\u7fd1\u7ff5\u801d\u80ca\u80e0\u81de\u82e3\u83c3\u844b\u8556\u8627\u86c6\u86d0\u87b6\u87dd\u8837\u883c\u8862\u88aa\u89b0\u89b7\u89bb\u89d1\u8a53\u8a58\u8ab3\u8bce\u8c66\u8c9c\u8d8b\u8da3\u8da8\u8ea3\u8eaf\u8ec0\u8ee5\u947a\u957c\u95b4\u95c3\u9612\u9639\u99c6\u99c8\u9a45\u9a71\u9af7\u9b7c\u9c38\u9c4b\u9d1d\u9d8c\u9e1c\u9e32\u9eae\u9eaf\u9eb4\u9eb9\u9ee2\u9f01\u9f29\u9f72\u9f8b",
        "ci": "\u4f3a\u4f4c\u4f7d\u5179\u523a\u523e\u5472\u5790\u5b28\u5dee\u5e9b\u5ec1\u6148\u673f\u67cc\u6828\u6b21\u6b64\u6cda\u6fe8\u73bc\u73c1\u74f7\u7506\u75b5\u7689\u78c1\u7960\u7ca2\u7ccd\u7d58\u8308\u8328\u83bf\u858b\u86d3\u8a5e\u8bcd\u8cdc\u8d50\u8d7c\u8d80\u8dd0\u8f9d\u8f9e\u8fa4\u8fad\u96cc\u98fa\u9908\u9ab4\u9dc0\u9e5a",
        "beng": "\u4f3b\u5623\u57f2\u580b\u5874\u595f\u5d29\u5d6d\u5f38\u69f0\u6cf5\u73a4\u742b\u750f\u752d\u794a\u7d63\u7db3\u7e43\u7ef7\u83f6\u868c\u872f\u8a81\u8df0\u8e66\u8ff8\u902c\u93f0\u955a\u958d\u979b",
        "ga": "\u4f3d\u5496\u560e\u5620\u5676\u5939\u5c15\u5c1c\u5c2c\u65ee\u738d\u80f3\u8ecb\u8f67\u91d3\u9337\u9486",
        "qia": "\u4f3d\u5361\u5736\u5e22\u6070\u6118\u62e4\u6390\u6b8e\u6d3d\u845c\u88b7\u8dd2\u9160\u9ac2",
        "tian": "\u4f43\u500e\u5172\u553a\u5861\u586b\u5929\u5a56\u5c47\u5fdd\u606c\u60bf\u63ad\u666a\u6b84\u6c97\u6cba\u6ddf\u6dfb\u6e49\u7154\u7471\u74b3\u751b\u751c\u7530\u754b\u7551\u75f6\u76f7\u7753\u78cc\u7ab4\u80cb\u8146\u8214\u821a\u83fe\u8695\u89a5\u89cd\u8cdf\u915f\u923f\u94bf\u95d0\u9617\u975d\u9766\u9902\u9dc6\u9ec7",
        "han": "\u4f44\u50bc\u51fd\u51fe\u5382\u5383\u542b\u54fb\u5505\u558a\u5682\u5705\u57be\u5a22\u5ae8\u5bd2\u5c7d\u5d21\u608d\u61a8\u61be\u625e\u634d\u6496\u64bc\u650c\u65f1\u6657\u6658\u6665\u66b5\u6892\u69a6\u6c49\u6c57\u6d5b\u6d6b\u6d86\u6db5\u6dca\u6f22\u6f8f\u701a\u70b6\u710a\u7113\u71af\u72b4\u72be\u7305\u7400\u751d\u7694\u7745\u7b68\u7f55\u7ff0\u839f\u83e1\u850a\u86b6\u86ff\u872d\u8792\u8b40\u8c3d\u8c43\u8c7b\u9097\u90af\u9163\u91ec\u92b2\u92ce\u92e1\u9588\u95de\u95ec\u961a\u96d7\u97d3\u97e9\u9807\u981c\u9837\u9844\u9878\u9894\u99a0\u99af\u99fb\u9b7d\u9dbe\u9f3e",
        "bi": "\u4f4a\u4f56\u4ffe\u506a\u5315\u5421\u5489\u54d4\u555a\u55f6\u5752\u57e4\u581b\u58c1\u5936\u59a3\u59bc\u5a62\u5af3\u5b16\u5c44\u5e01\u5e63\u5e64\u5e87\u5eb3\u5ee6\u5f0a\u5f3b\u5f3c\u5f43\u5f7c\u5fc5\u602d\u610a\u610e\u6255\u62c2\u655d\u6583\u6707\u673c\u6788\u67c0\u67eb\u67f2\u6890\u6945\u6a98\u6bd4\u6bd5\u6bd6\u6bd9\u6bf4\u6c98\u6ccc\u6e62\u6ed7\u6eed\u6f77\u6fde\u714f\u719a\u72f4\u7358\u7359\u73cc\u74a7\u7540\u7562\u7595\u75aa\u75f9\u75fa\u7680\u7695\u7765\u78a7\u79d5\u79d8\u7a17\u7a2b\u7b14\u7b46\u7b5a\u7b84\u7b85\u7b86\u7be6\u7bf3\u7c83\u7c8a\u7e2a\u7f7c\u805b\u8177\u81c2\u822d\u8298\u82fe\u835c\u8378\u8406\u84d6\u84fd\u853d\u859c\u870c\u8795\u8890\u88e8\u8952\u895e\u8963\u89f1\u8a56\u8bd0\u8c4d\u8c8f\u8cb1\u8cc1\u8d14\u8d32\u8d51\u8df8\u8e55\u8e83\u8e84\u8f9f\u903c\u907f\u90b2\u9119\u9128\u912a\u924d\u939e\u93ce\u9434\u94cb\u9587\u9589\u959f\u95e2\u95ed\u965b\u97b8\u97e0\u98f6\u9946\u999d\u99dc\u9a46\u9ab3\u9ac0\u9b53\u9b85\u9c0f\u9cbe\u9d56\u9ddd\u9de9\u9f0a\u9f3b",
        "shao": "\u4f4b\u52ad\u52fa\u5372\u53ec\u54e8\u5734\u5a0b\u5c11\u5f30\u634e\u65d3\u6753\u68a2\u6f72\u70e7\u713c\u71d2\u724a\u73bf\u7744\u7a0d\u7af0\u7b72\u7d39\u7da4\u7ecd\u8244\u828d\u82d5\u83a6\u8571\u86f8\u8891\u8f0e\u90b5\u9798\u97f6\u98b5\u9afe\u9bb9",
        "zuo": "\u4f50\u4f5c\u505a\u51ff\u5497\u5511\u5528\u562c\u5750\u590e\u5c9e\u5de6\u5ea7\u600d\u64ae\u6628\u67de\u690a\u6bd1\u7422\u781f\u795a\u79e8\u7a13\u7b2e\u7b70\u7cf3\u7e53\u80d9\u8443\u8444\u888f\u9162\u923c\u947f\u963c",
        "ti": "\u4f53\u4fe4\u4ff6\u501c\u504d\u5243\u5254\u5397\u557c\u55c1\u568f\u5694\u5824\u5a82\u5a9e\u5c49\u5c5c\u5d39\u608c\u6090\u60d5\u60d6\u60ff\u632e\u63a6\u63d0\u63e5\u66ff\u68af\u6b52\u6ba2\u6d95\u6f3d\u710d\u73f6\u7445\u777c\u78ae\u7994\u79b5\u7a0a\u7c4a\u7d88\u7df9\u7ee8\u7f07\u7f64\u82d0\u8351\u855b\u8599\u876d\u88fc\u8905\u8da7\u8e22\u8e44\u8e4f\u8eb0\u8ec6\u8fcf\u9016\u9037\u9046\u918d\u92bb\u9357\u941f\u9511\u9684\u984c\u9898\u9a20\u9ab5\u9ad4\u9ae2\u9af0\u9b00\u9b04\u9bb7\u9bf7\u9cc0\u9d3a\u9d5c\u9d97\u9d99\u9dc8\u9dc9\u9e48",
        "ben": "\u4f53\u5034\u574c\u592f\u5932\u5954\u5959\u6379\u64aa\u672c\u681f\u6873\u694d\u6ccd\u6e00\u7287\u7356\u755a\u7b28\u82ef\u8cc1\u8d32\u8f3d\u9029\u931b\u951b",
        "zhan": "\u4f54\u5061\u5360\u546b\u5661\u5af8\u5c55\u5d2d\u5d83\u5d84\u5d98\u5da6\u6218\u6226\u6230\u640c\u65a9\u65ac\u65c3\u65dc\u66ab\u6808\u6834\u685f\u68e7\u693e\u6990\u6a3f\u6a4f\u6be1\u6c08\u6c0a\u6cbe\u6e5b\u7416\u76bd\u76cf\u76de\u77bb\u7ad9\u7c98\u7dbb\u7efd\u83da\u859d\u8638\u8665\u8666\u8998\u89b1\u8a40\u8a79\u8b60\u8b6b\u8b9d\u8c35\u8d88\u8e4d\u8e54\u8f1a\u8f3e\u8f4f\u8f97\u9085\u9186\u9246\u9711\u986b\u98a4\u98ad\u98d0\u9958\u9a4f\u9a59\u9aa3\u9b59\u9c63\u9e07\u9e6f",
        "he": "\u4f55\u4f6b\u4ff0\u52be\u5408\u5413\u5475\u548a\u548c\u54ec\u555d\u559d\u55c3\u55ec\u5687\u58d1\u59c0\u5bc9\u5cc6\u5d51\u5ec5\u60d2\u62b2\u668d\u66f7\u67c7\u6838\u6941\u6bfc\u6cb3\u6db8\u6ec6\u6f95\u7142\u7186\u7187\u7200\u72e2\u7332\u764b\u76ac\u76c7\u76c9\u76cd\u76d2\u788b\u7909\u79be\u79f4\u7bd5\u7d07\u7ea5\u7fee\u7fef\u8377\u83cf\u8402\u849a\u84cb\u86b5\u874e\u879b\u881a\u8894\u8910\u8988\u8a36\u8a38\u8a65\u8bc3\u8c88\u8c89\u8cc0\u8d3a\u8d6b\u8db7\u90c3\u91db\u924c\u95a1\u95a4\u95d4\u9602\u9616\u96ba\u974e\u974f\u97a8\u981c\u988c\u9932\u9978\u9b7a\u9da1\u9db4\u9e16\u9e56\u9e64\u9f55\u9f81\u9fa2",
        "tu": "\u4f59\u514e\u5154\u51f8\u5410\u550b\u56f3\u56fe\u5715\u5716\u5717\u571f\u5721\u580d\u5817\u5857\u5b8a\u5c60\u5cf9\u5d5e\u5d80\u5ea9\u5edc\u5f92\u6022\u6348\u6378\u63ec\u688c\u6d82\u6d8b\u6e65\u6f73\u7479\u75dc\u760f\u79bf\u79c3\u7a0c\u7a81\u7b61\u816f\u837c\u83b5\u83df\u8456\u84a4\u8dff\u9014\u9174\u91f7\u922f\u92f5\u934e\u948d\u999f\u99fc\u9d5a\u9d75\u9d9f\u9dcb\u9df5\u9f35",
        "die": "\u4f5a\u53e0\u54a5\u558b\u57a4\u581e\u5ccc\u5d80\u604e\u60f5\u621c\u6315\u63f2\u6633\u66e1\u696a\u6c0e\u7239\u7245\u7252\u74de\u7573\u7582\u7589\u758a\u7723\u7730\u789f\u7d70\u7ed6\u800a\u800b\u8051\u80c5\u81f7\u8253\u82f5\u8728\u8776\u890b\u893a\u8a44\u8adc\u8c0d\u8d83\u8dcc\u8dd5\u8e2e\u8e40\u8fed\u957b\u9c08\u9cbd",
        "gou": "\u4f5d\u508b\u5193\u52fe\u53e5\u5526\u5778\u57a2\u591f\u5920\u59e4\u5abe\u5ca3\u5f40\u6406\u6480\u6784\u67b8\u69cb\u6c9f\u6e9d\u72d7\u73bd\u7b31\u7bdd\u7c3c\u7df1\u7f11\u8007\u8008\u8009\u82b6\u82df\u830d\u8329\u86bc\u8920\u89af\u89cf\u8a3d\u8a6c\u8bdf\u8c7f\u8cfc\u8d2d\u9058\u920e\u9264\u94a9\u96ca\u97b2\u97dd",
        "ning": "\u4f5e\u4fab\u51dd\u549b\u5680\u5b23\u5b81\u5bcd\u5bd5\u5bd7\u5bdc\u5be7\u62e7\u64f0\u67e0\u6a63\u6ab8\u6cde\u6fd8\u72de\u7370\u752f\u77c3\u804d\u8079\u82ce\u82e7\u944f\u9b21\u9e0b",
        "yong": "\u4f63\u4fd1\u509b\u50ad\u52c7\u52c8\u548f\u5581\u55c8\u5670\u57c7\u584e\u5889\u58c5\u5ac6\u5ade\u5d71\u5eb8\u5ef1\u5f6e\u607f\u6080\u60e5\u6111\u6139\u6142\u6175\u62e5\u6408\u64c1\u67e1\u6810\u69e6\u6c38\u6cf3\u6d8c\u6e67\u6efd\u6fad\u7049\u724e\u7528\u752c\u75c8\u7655\u7670\u799c\u81c3\u856f\u86f9\u8a60\u8e0a\u8e34\u9095\u90fa\u9118\u919f\u92a2\u93de\u955b\u96cd\u96dd\u9852\u9899\u9954\u9bd2\u9c45\u9cac\u9cd9",
        "wa": "\u4f64\u51f9\u52b8\u5471\u5493\u54c7\u55e2\u576c\u5a03\u5a32\u5aa7\u5c72\u6316\u6432\u6528\u6d3c\u6e9b\u6f25\u74e6\u74e9\u7556\u7a75\u7aaa\u8049\u817d\u8183\u86d9\u889c\u896a\u90b7\u97c8\u97e4\u9f03",
        "ka": "\u4f67\u5361\u5494\u5496\u54af\u54b3\u54c8\u5580\u80e9\u9272",
        "huai": "\u4f6a\u5212\u54b6\u574f\u58ca\u58de\u5f8a\u6000\u61d0\u61f7\u69d0\u6af0\u6dee\u7024\u7af5\u8032\u8639\u863e\u8922\u8931\u8ad9\u8e1d",
        "lao": "\u4f6c\u50d7\u52b3\u52b4\u52de\u54be\u54f0\u5520\u562e\u59e5\u5aea\u5d02\u5d97\u6045\u61a5\u61a6\u635e\u6488\u6833\u6a51\u6a6f\u6d76\u6d9d\u6f66\u6f87\u70d9\u7262\u72eb\u75e8\u7646\u78f1\u7a82\u7c29\u7d61\u7edc\u8001\u8022\u802e\u8356\u843d\u87e7\u8ec2\u8f51\u916a\u91a6\u91aa\u92a0\u9412\u94d1\u94f9\u9add",
        "ming": "\u4f72\u51a5\u51d5\u540d\u547d\u59f3\u5ac7\u614f\u660e\u669d\u6719\u69a0\u6d3a\u6e9f\u7190\u733d\u76df\u7700\u7733\u7791\u8317\u84c2\u879f\u89ad\u8a7a\u910d\u9169\u9298\u94ed\u9cf4\u9e23",
        "quan": "\u4f7a\u5168\u5238\u529d\u52e7\u52f8\u5377\u545f\u5573\u5708\u570f\u59fe\u5a58\u5b49\u5cd1\u5dcf\u5f2e\u606e\u609b\u60d3\u62f3\u643c\u6743\u68ec\u6a29\u6b0a\u6c71\u6cc9\u6d24\u6e76\u7065\u70c7\u7276\u7277\u7288\u72ac\u72ad\u7404\u7454\u753d\u754e\u75ca\u7842\u7b4c\u7d5f\u7d6d\u7da3\u7e13\u7efb\u8343\u8472\u8647\u8737\u8838\u89e0\u8a6e\u8be0\u8de7\u8e21\u8f07\u8f81\u919b\u9293\u94e8\u9874\u98a7\u99e9\u9a21\u9b08\u9c01\u9cc8\u9f64",
        "tiao": "\u4f7b\u5b25\u5ba8\u5ca7\u5cb9\u5ea3\u604c\u6311\u65a2\u65eb\u6640\u6713\u6761\u689d\u6a24\u773a\u7952\u7967\u7a95\u7ab1\u7b24\u7c9c\u7cf6\u7d69\u804e\u8101\u8280\u82d5\u8414\u8729\u899c\u8a82\u8abf\u8c03\u8d92\u8df3\u8fe2\u929a\u92da\u93a5\u94eb\u9797\u9aeb\u9ba1\u9c37\u9ca6\u9f60\u9f86",
        "xing": "\u4f80\u5016\u5174\u5211\u5753\u578b\u57b6\u59d3\u5a5e\u5b39\u5e78\u5f62\u6027\u60bb\u60fa\u61ec\u64e4\u661f\u66d0\u674f\u6d10\u6dac\u6e3b\u6ece\u6fda\u6ff4\u70c6\u714b\u7329\u7446\u76a8\u7701\u7772\u784e\u7bc2\u7dc8\u80fb\u8165\u81d6\u8208\u8347\u8365\u8395\u86f5\u884c\u89ea\u89f2\u8e01\u90a2\u90c9\u9192\u9276\u9292\u92de\u935f\u9498\u94cf\u9649\u9658\u9933\u9939\u9967\u99a8\u99ab\u9a02\u9a8d\u9b8f\u9bf9",
        "kan": "\u4f83\u5058\u519a\u51f5\u520a\u52d8\u574e\u57f3\u582a\u586a\u5888\u5d01\u5d41\u5d4c\u60c2\u6221\u681e\u69db\u6abb\u6b3f\u6b41\u6b5e\u770b\u77b0\u77d9\u780d\u78e1\u7af7\u7e7f\u83b0\u884e\u8f21\u8f57\u95de\u961a\u9851\u9b2b\u9f95\u9f9b",
        "kai": "\u4f85\u51ef\u51f1\u5240\u5274\u52d3\u54b3\u5605\u57b2\u584f\u58d2\u5952\u5f00\u5ffe\u607a\u6112\u6137\u613e\u6168\u63e9\u669f\u6977\u6b2c\u708c\u708f\u70d7\u8488\u8c48\u8f06\u9347\u93a7\u9426\u94e0\u950e\u9534\u958b\u95d3\u95ff\u98bd",
        "lai": "\u4f86\u4feb\u5008\u52d1\u553b\u5a15\u5a61\u5d03\u5d0d\u5eb2\u5f95\u5fa0\u6765\u68be\u68f6\u6af4\u6d9e\u6df6\u6fd1\u7028\u702c\u741c\u765e\u7669\u7750\u775e\u7b59\u7b82\u7c41\u7c5f\u83b1\u840a\u85fe\u8970\u8cda\u8cf4\u8d49\u8d56\u90f2\u9338\u94fc\u983c\u9842\u9a0b\u9be0\u9d86\u9eb3",
        "kua": "\u4f89\u54b5\u57ae\u5938\u59f1\u630e\u6647\u80ef\u8342\u8a87\u8de8\u9299\u9abb",
        "guang": "\u4f8a\u50d9\u5149\u54a3\u5799\u59ef\u5e7f\u5e83\u5ee3\u6844\u6ace\u6d38\u706e\u7097\u709a\u70e1\u72b7\u7377\u73d6\u77cc\u80f1\u81e6\u81e9\u832a\u8f04\u901b\u92a7\u9ec6",
        "mi": "\u4f8e\u5196\u519e\u51aa\u54aa\u54f6\u5627\u5853\u58d0\u5b4a\u5b93\u5bbb\u5bc6\u5cda\u5e42\u5e4e\u5e66\u5f25\u5f2d\u5f4c\u6202\u64df\u6520\u6549\u6993\u6a12\u6ab7\u6ac1\u6c68\u6cb5\u6ccc\u6d23\u6de7\u6dff\u6e33\u6ef5\u6f1e\u6fd4\u6fd7\u7030\u7056\u7222\u7315\u737c\u74d5\u772b\u772f\u7787\u7955\u7962\u79b0\u79d8\u7c1a\u7c4b\u7c73\u7cdc\u7cf8\u7cf9\u7e3b\u7e9f\u7f59\u7f83\u8112\u8288\u845e\u84be\u851d\u8524\u85cc\u862a\u863c\u871c\u8820\u8993\u8994\u89c5\u8a78\u8b0e\u8b10\u8c1c\u8c27\u8ff7\u919a\u91be\u91bf\u91c4\u92a4\u957e\u9761\u9e0d\u9e8a\u9e8b\u9e9b\u9f0f",
        "an": "\u4f92\u4ffa\u5111\u530e\u533c\u5382\u5388\u53b0\u5535\u557d\u57b5\u57ef\u5813\u5837\u5a69\u5a95\u5b89\u5cb8\u5cd6\u5e7f\u5e83\u5eb5\u5ee0\u5ee3\u6309\u63de\u667b\u6697\u6848\u6849\u6c28\u6d1d\u72b4\u73b5\u75f7\u76e6\u76eb\u7f6f\u80fa\u8164\u834c\u83f4\u843b\u844a\u84ed\u8a9d\u8af3\u8c19\u8c7b\u8c8b\u92a8\u930c\u94f5\u95c7\u968c\u96f8\u978c\u978d\u97fd\u9b9f\u9d6a\u9e4c\u9eec\u9eef",
        "lu": "\u4f93\u50c7\u516d\u5279\u52ce\u52e0\u5362\u5364\u565c\u5695\u56a7\u5725\u5786\u578f\u5876\u5877\u58da\u5a3d\u5ccd\u5e90\u5ed8\u5eec\u5f54\u5f55\u622e\u63b3\u645d\u64b8\u64c4\u64fc\u650e\u66e5\u67a6\u680c\u6902\u6a10\u6a1a\u6a79\u6ad3\u6ae8\u6c07\u6c0c\u6cf8\u6dd5\u6de5\u6e0c\u6ef7\u6f09\u6f5e\u6f9b\u7002\u7018\u7089\u719d\u7210\u7379\u7388\u742d\u7490\u74d0\u752a\u76dd\u76e0\u76e7\u7769\u77d1\u7849\u7875\u788c\u78df\u78e0\u797f\u7984\u7a11\u7a4b\u7b93\u7c0f\u7c2c\u7c36\u7c59\u7c5a\u7cb6\u7e91\u7eff\u7f4f\u80ea\u8194\u81da\u822e\u823b\u8263\u826a\u826b\u82a6\u83c9\u84fc\u84fe\u850d\u8557\u8606\u8642\u864f\u865c\u87b0\u8826\u89ee\u8cc2\u8d42\u8da2\u8def\u8e1b\u8e57\u8f05\u8f46\u8f64\u8f73\u8f82\u8f98\u902f\u9181\u9229\u9304\u9332\u9334\u93c0\u93d5\u93f4\u942a\u9465\u946a\u9565\u9646\u9678\u9732\u9871\u9885\u9a04\u9a3c\u9ad7\u9b6f\u9b72\u9be5\u9c78\u9c81\u9c88\u9d66\u9d71\u9dfa\u9e15\u9e2c\u9e6d\u9e75\u9e7f\u9e93\u9ef8",
        "mou": "\u4f94\u5187\u52ba\u5463\u54de\u6048\u6117\u67d0\u6d20\u725f\u7738\u7e46\u7f2a\u86d1\u8b00\u8c0b\u8e07\u927e\u936a\u9d3e\u9eb0",
        "gong": "\u4f9b\u516c\u5171\u529f\u5311\u551d\u55d7\u5868\u5bab\u5bae\u5de5\u5de9\u5e4a\u5efe\u5f13\u606d\u6129\u62f1\u62f2\u6443\u653b\u675b\u6831\u6c5e\u73d9\u7598\u78bd\u7926\u7a6c\u7acd\u7acf\u7ad3\u7ad4\u7ad5\u7ae1\u7be2\u7cfc\u7d05\u7ea2\u7fbe\u80b1\u86a3\u86ec\u89e5\u89f5\u8ca2\u8d21\u8eac\u8eb3\u91ed\u92be\u92db\u978f\u9790\u9f8f\u9f94\u9f9a",
        "lu:|lv": "\u4fa3\u4fb6\u507b\u50c2\u5122\u52f4\u535b\u5415\u5442\u5a41\u5bfd\u5c61\u5c62\u5c65\u5d42\u5f8b\u616e\u617a\u6314\u634b\u635b\u65c5\u68a0\u6988\u6ad6\u6ada\u6c00\u6c2f\u6ee4\u6f0a\u6ffe\u7209\u7387\u7963\u7a06\u7a5e\u7a6d\u7d7d\u7da0\u7dd1\u7e37\u7eff\u7f15\u8182\u8190\u819f\u81a2\u83c9\u844e\u844f\u85d8\u8651\u891b\u8938\u90d8\u92c1\u9462\u94dd\u95ad\u95fe\u99bf\u9a62\u9a74",
        "zhen": "\u4fa6\u4fb2\u5075\u5733\u583b\u5866\u5a20\u5a9c\u5ac3\u5bca\u5e27\u5e2a\u5e40\u5f2b\u628c\u62ae\u630b\u632f\u63d5\u6438\u6576\u659f\u6623\u6678\u6715\u6795\u6815\u681a\u6862\u686d\u6939\u6968\u699b\u69c7\u6a3c\u6d48\u6e5e\u6eb1\u6f67\u7349\u73cd\u73ce\u744a\u7504\u755b\u75b9\u7715\u771e\u771f\u7739\u7827\u78aa\u796f\u7973\u798e\u799b\u7a39\u7b09\u7bb4\u7c48\u7d3e\u7d7c\u7e1d\u7e25\u7ebc\u7f1c\u8044\u80d7\u81fb\u8496\u84a7\u84c1\u85bd\u8704\u8897\u8a3a\u8aab\u8bca\u8c9e\u8cd1\u8d1e\u8d48\u8eeb\u8f43\u8f78\u8fb4\u9049\u9156\u9159\u91dd\u9241\u9331\u936e\u937c\u93ad\u93ae\u9488\u9547\u9635\u9663\u9707\u9755\u99d7\u9b12\u9c75\u9d06\u9dcf\u9e29\u9ed5\u9ef0",
        "ce": "\u4fa7\u5074\u518a\u518c\u5395\u53a0\u5884\u5ae7\u5ec1\u607b\u60fb\u61a1\u62fa\u6547\u6d4b\u6e2c\u6ead\u755f\u77e0\u7b27\u7b56\u7b5e\u7b74\u7ba3\u7ca3\u8326\u835d\u8417\u84db\u906a",
        "zhai": "\u4fa7\u503a\u50b5\u5b85\u5be8\u5c9d\u629e\u62e9\u635a\u6458\u64c7\u658b\u658e\u69b8\u7635\u7826\u790b\u796d\u7a84\u7fdf\u8cac\u9259\u98f5\u9f4a\u9f4b",
        "chai": "\u4faa\u5068\u5115\u558d\u56c6\u5dee\u62c6\u67f4\u72b2\u7625\u7961\u8286\u831d\u867f\u8806\u8883\u8c7a\u91f5\u9497",
        "nong": "\u4fac\u5102\u519c\u54dd\u5665\u5f04\u630a\u6335\u6a82\u6b01\u6d53\u6fc3\u7651\u79af\u79fe\u7a60\u8113\u81bf\u895b\u8fb2\u8fb3\u91b2\u9b1e\u9f48",
        "hou": "\u4faf\u5019\u539a\u540e\u543c\u5589\u5795\u5820\u5e3f\u5f8c\u6d09\u72bc\u7334\u760a\u777a\u77e6\u7bcc\u7cc7\u7f3f\u7fed\u8454\u8c5e\u9005\u90c8\u9107\u9297\u936d\u9931\u9aba\u9b9c\u9bf8\u9c5f\u9c8e\u9c98\u9f41",
        "jiong": "\u4fb0\u50d2\u5182\u518b\u518f\u56e7\u5770\u57db\u5e5c\u6243\u6cc2\u6f83\u7085\u70af\u70f1\u715a\u715b\u71b2\u769b\u7a98\u7d45\u7d97\u860f\u8614\u8927\u8fe5\u9008\u9848\u988e\u99c9\u99eb",
        "cuo": "\u4fb3\u5249\u5252\u539d\u5d6f\u5d73\u632b\u63aa\u6413\u64ae\u6b75\u7473\u75e4\u7625\u7749\u77ec\u7870\u78cb\u7e12\u811e\u839d\u83a1\u84ab\u84cc\u8516\u8658\u8e49\u902a\u9073\u9142\u919d\u92bc\u932f\u9509\u9519\u9aca\u9e7a\u9e7e\u9f70",
        "nan": "\u4fbd\u5357\u5583\u56dd\u56e1\u597b\u5a1a\u5a7b\u6201\u63c7\u6694\u678f\u67ac\u67df\u6960\u6e73\u7537\u7558\u8169\u83ae\u8433\u877b\u8af5\u8d67\u96be\u96e3",
        "hao": "\u4fbe\u5090\u512b\u52c2\u53f7\u54e0\u55e5\u5637\u5651\u5686\u568e\u58d5\u597d\u5cfc\u604f\u608e\u660a\u6626\u6667\u66a4\u66ad\u66cd\u6903\u6beb\u6d69\u6db8\u6dcf\u6ec8\u6f94\u6fe0\u7025\u704f\u705d\u72e2\u7346\u734b\u7354\u7693\u769c\u769e\u76a1\u76a5\u79cf\u7c47\u8017\u8055\u84bf\u8583\u8585\u865f\u869d\u8814\u8ad5\u8b79\u8c6a\u8c89\u90dd\u9117\u93ac\u9550\u9865\u98a2\u9c1d\u9db4",
        "bian": "\u4fbf\u533e\u535e\u53d8\u5909\u5f01\u5fa7\u5fed\u60fc\u6241\u6283\u63d9\u662a\u67c9\u6944\u6c73\u6c74\u709e\u7178\u7251\u7335\u7371\u73a3\u7502\u782d\u78a5\u7a28\u7a86\u7b3e\u7baf\u7c69\u7cc4\u7de8\u7df6\u7f0f\u7f16\u8251\u82c4\u8439\u85ca\u8759\u890a\u898d\u8b8a\u8cb6\u8d2c\u8fa1\u8fa7\u8fa8\u8fa9\u8fab\u8fae\u8faf\u8fb9\u8fba\u904d\u9089\u908a\u91c6\u937d\u959e\u97ad\u9bfe\u9bff\u9cca\u9d18",
        "pian": "\u4fbf\u504f\u56e8\u5aa5\u6241\u6969\u7247\u728f\u7bc7\u7df6\u7f0f\u7fe9\u80fc\u8141\u8439\u8991\u8ada\u8ade\u8c1d\u8cb5\u8cc6\u8e41\u904d\u9828\u99e2\u9a08\u9a17\u9a19\u9a88\u9a97\u9abf\u9da3",
        "tui": "\u4fc0\u50d3\u5a27\u5f1a\u5fd2\u63a8\u6a54\u717a\u7a68\u817f\u84f7\u85ec\u8608\u86fb\u8715\u892a\u8e46\u8e6a\u9000\u96a4\u9839\u983a\u983d\u9893\u99fe\u9abd\u9b4b",
        "cu": "\u4fc3\u5352\u5648\u5f82\u6880\u69ed\u6b82\u6ba7\u731d\u762f\u7c07\u7c97\u7e2c\u8128\u851f\u89d5\u8c60\u8d97\u8da3\u8da8\u8e27\u8e59\u8e74\u9162\u918b\u932f\u93c3\u9e81\u9e84\u9ea4\u9f00",
        "e": "\u4fc4\u5054\u50eb\u537e\u5384\u542a\u5443\u545d\u54a2\u54b9\u54e6\u5669\u56ee\u5714\u57a9\u580a\u5828\u582e\u59b8\u59bf\u5a25\u5a3f\u5a40\u5c59\u5c75\u5c8b\u5cc9\u5ce8\u5ce9\u5d3f\u5dad\u6076\u60aa\u60e1\u6115\u6239\u627c\u6424\u6439\u6799\u6aee\u6d90\u6e42\u73f4\u7427\u75fe\u7692\u774b\u7810\u7828\u7846\u78c0\u816d\u82ca\u83aa\u843c\u855a\u8601\u8685\u86fe\u8741\u89a8\u8a1b\u8a7b\u8a90\u8ae4\u8b4c\u8b8d\u8bb9\u8c14\u8c5f\u8c96\u8edb\u8ef6\u8f6d\u8fd7\u904c\u904f\u9102\u920b\u92e8\u9312\u9354\u9469\u9507\u9537\u95bc\u960f\u9628\u9638\u963f\u981e\u981f\u984d\u984e\u989a\u989d\u9913\u9929\u997f\u9a00\u9b64\u9c10\u9c77\u9cc4\u9d5d\u9d5e\u9d83\u9d9a\u9e45\u9e57\u9f76",
        "kuang": "\u4fc7\u5123\u5164\u51b5\u52bb\u5321\u5329\u535d\u54d0\u5739\u58d9\u593c\u5cb2\u5f49\u6047\u61ed\u6282\u65f7\u663f\u66c2\u66e0\u6846\u6cc1\u6d2d\u720c\u72c2\u7716\u7736\u77ff\u783f\u7844\u7926\u7b50\u7b7a\u7d4b\u7d56\u7e8a\u7ea9\u8a86\u8a91\u8bd3\u8bf3\u8cba\u8d36\u8e80\u8eed\u909d\u90bc\u913a\u9271\u945b\u9d5f\u9ecb",
        "ku": "\u4fc8\u5233\u54ed\u55be\u56b3\u5710\u5800\u5e93\u5eab\u625d\u67af\u684d\u695b\u6a6d\u7614\u77fb\u79d9\u7a9f\u7d5d\u7ed4\u80d0\u82e6\u88b4\u88e4\u8932\u8db6\u8dcd\u90c0\u9177\u985d\u9ab7",
        "zun": "\u4fca\u50d4\u5642\u58ab\u58ff\u5c0a\u5d9f\u6499\u6a3d\u71c7\u7e5c\u7f47\u8b50\u9075\u940f\u9c52\u9cdf\u9df7",
        "juan": "\u4fca\u5026\u5101\u5276\u52b5\u52cc\u52ec\u5377\u5708\u570f\u57e2\u5946\u59e2\u5a1f\u5dfb\u5e23\u6081\u617b\u6350\u6372\u6718\u684a\u6d93\u6dc3\u72f7\u7367\u74f9\u7737\u774a\u7760\u7d79\u7ee2\u7f65\u7f82\u8127\u8143\u81c7\u83e4\u8832\u88d0\u8eab\u9104\u9308\u93b8\u942b\u9529\u954c\u96bd\u96cb\u97cf\u98ec\u9b33\u9d51\u9e43",
        "lang": "\u4fcd\u52c6\u5577\u57cc\u5871\u5acf\u5cce\u5d00\u5eca\u658f\u6716\u6717\u6724\u6879\u6994\u6a03\u6b34\u6d6a\u70fa\u7103\u72fc\u7405\u746f\u7860\u7a02\u7b64\u8246\u83a8\u8497\u84c8\u84e2\u870b\u8782\u8a8f\u8eb4\u90ce\u90d2\u90de\u92c3\u9512\u95ac\u9606",
        "hun": "\u4fd2\u5031\u5702\u581a\u5a5a\u5ff6\u60db\u60fd\u6141\u656f\u660f\u662c\u68d4\u68de\u694e\u6b99\u6d51\u6dbd\u6df7\u6e3e\u6eb7\u711d\u73f2\u743f\u7754\u7767\u776f\u7e49\u8364\u8477\u8ae2\u8be8\u8f4b\u95bd\u960d\u9850\u991b\u992b\u9984\u9b42\u9bf6\u9f32",
        "pai": "\u4fd6\u4ff3\u54cc\u5f98\u62cd\u6392\u68d1\u6c56\u6d3e\u6e43\u724c\u77f2\u7bfa\u7c30\u7c32\u848e\u8f2b\u8feb\u9383",
        "su": "\u4fd7\u5083\u50f3\u55c9\u56cc\u5850\u5851\u5919\u5aca\u5bbf\u612b\u612c\u619f\u681c\u69a1\u6a15\u6a5a\u6aef\u6b90\u6cdd\u6d2c\u6d91\u6eaf\u6eb8\u6eb9\u6f5a\u6f65\u738a\u73df\u749b\u7526\u78bf\u7a23\u7a4c\u7aa3\u7c0c\u7c9b\u7c9f\u7d20\u7e24\u7e2e\u7f29\u8083\u8085\u8186\u82cf\u84ff\u850c\u85d7\u8607\u8613\u8736\u89eb\u8a34\u8a8e\u8b16\u8bc9\u8c21\u8d9a\u8e5c\u901f\u9061\u906b\u906c\u9165\u92c9\u9917\u9a4c\u9a95\u9c50\u9deb\u9e54",
        "bao": "\u4fdd\u5124\u5228\u5265\u52f9\u52fd\u5305\u5697\u5821\u5822\u5831\u5aac\u5ad1\u5b62\u5b9d\u5bb2\u5bda\u5bf3\u5bf6\u5fc1\u6009\u62a5\u62b1\u66b4\u66d3\u66dd\u67b9\u7011\u70ae\u7172\u7206\u72a6\u73e4\u74dd\u7a87\u7b23\u7de5\u80de\u82de\u83e2\u8446\u8554\u8584\u8663\u86ab\u888c\u8912\u8913\u8943\u8c79\u8cf2\u8db5\u924b\u9464\u94c7\u96f9\u974c\u98fd\u9971\u99c2\u9b91\u9c8d\u9cf5\u9d07\u9e28\u9f59\u9f85",
        "lia": "\u4fe9\u5006",
        "xiao": "\u4ff2\u509a\u524a\u52b9\u547a\u54b2\u54d3\u54ee\u554b\u5578\u560b\u5610\u5628\u562f\u5635\u56a3\u56bb\u56c2\u5a4b\u5b5d\u5b78\u5baf\u5bb5\u5c0f\u5d24\u5ea8\u5f47\u6054\u61a2\u64a8\u6548\u6569\u6586\u6653\u6681\u66c9\u67ad\u67b5\u6821\u689f\u6af9\u6b4a\u6b57\u6bca\u6d28\u6d88\u6d8d\u6dc6\u6ee7\u6f47\u6f5a\u701f\u7071\u7072\u70cb\u7107\u71bd\u7362\u75da\u75df\u76a2\u785d\u7863\u7a58\u7a99\u7b05\u7b11\u7b71\u7b7f\u7bab\u7be0\u7c18\u7c2b\u7d83\u7ee1\u8096\u81ae\u8427\u8437\u856d\u85a2\u85c3\u8648\u8653\u86f8\u87cf\u87f0\u8828\u8a24\u8a9f\u8ab5\u8b0f\u8e03\u8e0d\u900d\u90e9\u9175\u92b7\u9500\u9704\u97a9\u9a4d\u9a81\u9ac7\u9b48\u9d1e\u9e2e",
        "biao": "\u4ff5\u5126\u52fa\u5882\u5a4a\u5e56\u5f6a\u647d\u6753\u6807\u6a19\u6aa6\u6eee\u700c\u706c\u719b\u7202\u730b\u762d\u78e6\u7a6e\u7f86\u813f\u8198\u81d5\u8508\u85e8\u8868\u88f1\u893e\u8ad8\u8b24\u8d06\u9336\u93e2\u9463\u9556\u9573\u98a9\u98ae\u98b7\u98c6\u98c7\u98c8\u98cd\u98d1\u98d9\u98da\u9a43\u9a6b\u9a89\u9aa0\u9adf\u9c3e\u9cd4\u9e83",
        "fei": "\u4ff7\u5255\u532a\u539e\u5420\u5561\u595c\u5983\u5a53\u5c5d\u5e9f\u5ec3\u5ee2\u602b\u60b1\u6249\u6590\u6632\u66ca\u670f\u676e\u68d0\u69a7\u6ae0\u6cb8\u6ddd\u6e04\u6ff7\u72d2\u7306\u75bf\u75f1\u7648\u7829\u7bda\u7dcb\u7eef\u7fe1\u80a5\u80ba\u80c7\u8153\u82be\u83f2\u8409\u855c\u871a\u8730\u87e6\u88f6\u8ab9\u8bfd\u8cbb\u8d39\u9428\u9544\u970f\u9745\u975e\u975f\u98db\u98dd\u98de\u9925\u99a1\u9a11\u9a1b\u9be1\u9cb1\u9f23",
        "zan": "\u5003\u507a\u50aa\u5127\u5139\u5142\u54b1\u5592\u5647\u56cb\u5bc1\u62f6\u63dd\u648d\u6505\u6512\u6522\u661d\u6682\u66ab\u685a\u6b11\u6caf\u7052\u74c9\u74d2\u74da\u7938\u79b6\u7a73\u7c2a\u7c2e\u7ccc\u8978\u8b83\u8b9a\u8cdb\u8d0a\u8d5e\u8db1\u8db2\u913c\u9147\u933e\u93e8\u9415\u9961",
        "zong": "\u500a\u5027\u506c\u50af\u582b\u5b97\u5d4f\u5d55\u5d78\u5f9e\u5fe9\u6031\u603b\u60e3\u60fe\u6121\u6181\u6374\u63d4\u6403\u6460\u662e\u6721\u679e\u68d5\u6936\u6a05\u71a7\u7314\u7323\u75ad\u7632\u7882\u78eb\u7a2f\u7cbd\u7cc9\u7ced\u7d9c\u7dc3\u7dcf\u7deb\u7df5\u7e02\u7e26\u7e31\u7e3d\u7eb5\u7efc\u7fea\u8159\u8250\u847c\u84d7\u876c\u8c75\u8e28\u8e2a\u8e64\u9a0c\u9a23\u9a94\u9b03\u9b09\u9b37\u9bee\u9bfc",
        "dao": "\u5012\u5200\u5202\u5230\u53e8\u5675\u58d4\u5bfc\u5c0e\u5c9b\u5cf6\u5d8b\u5d8c\u5db9\u5e31\u5e4d\u5e6c\u5fc9\u60bc\u6363\u636f\u6417\u64e3\u6737\u6aa4\u6c18\u7118\u71fe\u74d9\u76d7\u76dc\u7977\u7982\u79b1\u7a32\u7a3b\u7e9b\u7fff\u8220\u83ff\u885c\u885f\u8e48\u8ec7\u9053\u91d6\u969d\u96af\u9b5b\u9c7d",
        "tan": "\u5013\u53f9\u5574\u55ff\u5606\u574d\u575b\u5766\u57ee\u58b0\u58b5\u58c7\u58dc\u5a52\u5f39\u5f3e\u5f48\u5fd0\u6039\u619b\u61b3\u61bb\u62a9\u63a2\u644a\u64f9\u6524\u6619\u66c7\u6983\u6a5d\u6a80\u6b4e\u6bef\u6e60\u6ee9\u6f6d\u6fb9\u7058\u70ad\u74ae\u75f0\u762b\u7671\u78b3\u7dc2\u7f48\u7f4e\u8211\u83fc\u85eb\u8892\u88e7\u8962\u8983\u8ac7\u8b5a\u8c08\u8c2d\u8c9a\u8caa\u8d09\u8d2a\u90ef\u9188\u9193\u91b0\u926d\u931f\u9414\u94bd\u952c\u9561\u9924\u9a28\u9a54\u9de4\u9eee",
        "chui": "\u5015\u5439\u570c\u5782\u57c0\u5a37\u6376\u6425\u68f0\u690e\u69cc\u6e77\u708a\u7500\u7ba0\u8144\u83d9\u8ac8\u9318\u939a\u9524\u9672\u9840\u9fa1",
        "peng": "\u5017\u50b0\u5309\u562d\u57c4\u580b\u585c\u5873\u5f6d\u6026\u6072\u6189\u62a8\u6337\u6367\u63bd\u6412\u670b\u6888\u68da\u6916\u692a\u6a25\u6dce\u6ddc\u6f30\u6f8e\u70f9\u75ed\u768f\u7830\u7851\u787c\u78b0\u78de\u7a1d\u7afc\u7bf7\u7e84\u81a8\u8283\u84ec\u87da\u87db\u8eef\u8f23\u930b\u945d\u959b\u97f8\u97fc\u99cd\u9a61\u9afc\u9b05\u9b14\u9d6c\u9e4f",
        "kong": "\u5025\u57ea\u5b54\u5d06\u6050\u60be\u63a7\u6db3\u787f\u7a7a\u7b9c\u9313\u979a\u9d7c",
        "wo": "\u502d\u5053\u5367\u54e6\u5529\u5594\u5a50\u5e44\u6211\u631d\u6370\u637e\u63e1\u64be\u65a1\u6943\u6c83\u6da1\u6db9\u6e25\u6e26\u6fe3\u7327\u786a\u7912\u7a9d\u7aa9\u809f\u81e5\u83b4\u8435\u8717\u8778\u8e12\u9f77\u9f8c",
        "luo": "\u502e\u5138\u5246\u54af\u5570\u55e0\u56c9\u5bfd\u5cc8\u634b\u645e\u651e\u66ea\u6924\u6b0f\u6cfa\u6d1b\u6f2f\u6ffc\u6ffd\u70d9\u7296\u7321\u7380\u73de\u7630\u7673\u784c\u7b3f\u7ba9\u7c6e\u7d61\u7e99\u7edc\u7f57\u7f85\u8136\u8161\u81dd\u8366\u841d\u843d\u84cf\u8502\u863f\u87ba\u8803\u88f8\u8999\u89b6\u89bc\u8dde\u8eb6\u903b\u908f\u916a\u93af\u93cd\u947c\u9523\u9559\u96d2\u97f7\u9960\u99f1\u9a3e\u9a58\u9a86\u9aa1\u9ba5\u9d3c\u9d45\u9e01",
        "song": "\u502f\u50b1\u51c7\u5a00\u5b8b\u5d27\u5d69\u5d77\u5eba\u5fea\u6002\u609a\u612f\u616b\u61bd\u677e\u6780\u67a9\u67d7\u68a5\u6964\u6aa7\u6dde\u6fcd\u7879\u7ae6\u8038\u8073\u83d8\u8719\u8a1f\u8aa6\u8bbc\u8bf5\u9001\u980c\u9882\u9938\u99f7\u9b06",
        "leng": "\u5030\u51b7\u580e\u5844\u5d1a\u6123\u68f1\u695e\u7a1c\u8506\u8590\u8e1c",
        "cai": "\u5038\u5072\u57f0\u5a47\u5bc0\u5f69\u621d\u624d\u63a1\u6750\u68cc\u6ea8\u731c\u776c\u7db5\u7e29\u7e94\u83dc\u8521\u88c1\u8ca1\u8d22\u8df4\u8e29\u91c7",
        "ying": "\u5040\u50cc\u55b6\u5624\u565f\u56b6\u584b\u5a74\u5a96\u5ab5\u5ac8\u5b30\u5b34\u5b46\u5b7e\u5dc6\u5dca\u5e94\u5eee\u5f71\u5fdc\u61c9\u646c\u6484\u650d\u6516\u6620\u666f\u668e\u6720\u685c\u68ac\u6967\u6979\u6a31\u6afb\u6aff\u6d67\u6e36\u6e81\u6ece\u6ee2\u6f41\u6f46\u6fd9\u6fda\u7005\u701b\u7020\u702f\u7034\u7150\u7192\u71df\u73f1\u745b\u7469\u7484\u748e\u74d4\u7507\u7516\u763f\u766d\u76c1\u76c8\u77e8\u786c\u78a4\u792f\u7a4e\u7c5d\u7c6f\u7e08\u7e93\u7f28\u7f42\u7f43\u7f4c\u81a1\u81ba\u82f1\u8314\u8365\u8367\u83b9\u83ba\u8424\u8425\u8426\u843e\u84e5\u85c0\u8621\u86cd\u8747\u8767\u877f\u87a2\u8805\u8833\u892e\u8b0d\u8b4d\u8b7b\u8ccf\u8d0f\u8d62\u8fce\u90e2\u9348\u93a3\u941b\u944d\u9533\u9712\u9719\u9795\u97fa\u9834\u988d\u9895\u9896\u9d2c\u9da7\u9daf\u9dea\u9df9\u9e0e\u9e1a\u9e66\u9e70",
        "nuan": "\u5044\u6696\u6e1c\u7156\u7157\u992a",
        "chun": "\u5046\u5507\u5a8b\u60f7\u618c\u65fe\u6625\u6699\u6776\u693f\u6ac4\u6d71\u6df3\u6e7b\u6ee3\u6f18\u711e\u7443\u7776\u7bba\u7d14\u7eaf\u8123\u81a5\u83bc\u8405\u8436\u8493\u84f4\u877d\u8822\u8e33\u8f34\u9187\u9195\u931e\u9659\u9bd9\u9c06\u9d89\u9d9e\u9e51",
        "ruo": "\u504c\u53d2\u5f31\u6949\u7207\u7bac\u7bdb\u82e5\u84bb\u9100\u9c19\u9c2f\u9db8",
        "huang": "\u505f\u51f0\u55a4\u569d\u582d\u5843\u58b4\u595b\u5a93\u5bba\u5d32\u5ddf\u5e4c\u5fa8\u6033\u604d\u60f6\u6130\u614c\u6497\u6643\u6644\u671a\u69a5\u6d38\u6e5f\u6ec9\u6f62\u714c\u7180\u71bf\u735a\u745d\u749c\u7640\u7687\u769d\u76a9\u78fa\u7a54\u7bc1\u7c27\u7e28\u8093\u824e\u8352\u845f\u8757\u87e5\u8841\u8a64\u8b0a\u8c0e\u8daa\u8ee6\u9051\u9360\u93a4\u9404\u953d\u968d\u97f9\u992d\u9a1c\u9c09\u9c51\u9cc7\u9dec\u9ec3\u9ec4",
        "duan": "\u5073\u526c\u5845\u5a8f\u65ad\u65b7\u6934\u6bb5\u6bc8\u7145\u7456\u77ed\u78ab\u7aef\u7c16\u7c6a\u7dde\u7f0e\u8011\u8176\u846e\u890d\u8e96\u935b\u9374\u953b",
        "ou": "\u5076\u533a\u5340\u5418\u543d\u5455\u5614\u5878\u6004\u616a\u6ad9\u6b27\u6b50\u6bb4\u6bc6\u6ca4\u6f1a\u71b0\u74ef\u750c\u8026\u8162\u84f2\u8545\u85d5\u8b33\u8bb4\u9d0e\u9dd7\u9e25",
        "za": "\u507a\u531d\u5482\u548b\u54b1\u56d0\u5dbb\u5e00\u624e\u62b8\u62f6\u6742\u6c9e\u7838\u78fc\u7d2e\u81dc\u81e2\u894d\u8fca\u9254\u96d1\u96dc\u96e5\u97f4\u9b73\u9bba",
        "lou": "\u507b\u50c2\u5245\u55bd\u560d\u587f\u5a04\u5a41\u5c5a\u5d5d\u5d81\u5ed4\u6402\u645f\u697c\u6a13\u6e87\u6f0a\u6f0f\u71a1\u750a\u7618\u763a\u763b\u779c\u7bd3\u7c0d\u8027\u802c\u825b\u848c\u851e\u877c\u87bb\u8b31\u8ec1\u9071\u93e4\u941a\u9542\u964b\u9732\u97bb\u9ac5\u9acf\u9ddc",
        "sou": "\u5081\u53dc\u53df\u55d6\u55fd\u55fe\u5ec0\u5ecb\u635c\u641c\u6449\u64de\u64fb\u6ae2\u6eb2\u7340\u7636\u778d\u7c54\u8258\u8490\u85ae\u85ea\u878b\u8b0f\u910b\u9199\u93aa\u953c\u98bc\u98d5\u993f\u998a\u9a2a",
        "yuan": "\u5086\u5143\u5186\u51a4\u5248\u539f\u53a1\u53b5\u5458\u54e1\u566e\u56e6\u56ed\u5706\u570e\u5712\u5713\u571c\u57a3\u57b8\u586c\u5917\u59a7\u59b4\u5a9b\u5ab4\u5ac4\u5b3d\u5b9b\u5bc3\u5c1b\u6028\u60cc\u613f\u63be\u63f4\u676c\u68e9\u699e\u69ac\u6a7c\u6ade\u6c85\u6df5\u6e01\u6e06\u6e0a\u6e15\u6e72\u6e90\u6e92\u7041\u7230\u7328\u732d\u733f\u7342\u7457\u7722\u7990\u7b0e\u7ba2\u7de3\u7e01\u7f18\u7fb1\u8099\u82ab\u82d1\u847e\u849d\u84ac\u8597\u8696\u870e\u8735\u875d\u876f\u8788\u884f\u8881\u88eb\u88f7\u8911\u8924\u8b1c\u8c9f\u8d20\u8f45\u8f95\u8fdc\u903a\u9060\u908d\u90a7\u92fa\u93b1\u9662\u9858\u99cc\u9a35\u9b6d\u9cf6\u9d1b\u9d77\u9da2\u9db0\u9e22\u9e33\u9e53\u9eff\u9f0b\u9f18\u9f1d",
        "rong": "\u5087\u5197\u5ab6\u5b82\u5bb9\u5d58\u5d64\u5db8\u620e\u6411\u66e7\u6804\u6995\u69ae\u69b5\u6be7\u6c04\u6eb6\u701c\u70ff\u7194\u7203\u72e8\u7462\u7a41\u7d68\u7e19\u7ed2\u7fa2\u809c\u8319\u8338\u8357\u8363\u84c9\u877e\u878d\u878e\u8811\u8923\u8ef5\u9394\u93b9\u9555\u99e5\u9af6\u9c2b\u9d27\u9ddb",
        "bang": "\u508d\u57b9\u585d\u5e2e\u5e47\u5e5a\u5e6b\u6360\u6412\u65c1\u6886\u68d2\u68d3\u699c\u6d5c\u7253\u7255\u78c5\u7a16\u7d81\u7e0d\u7ed1\u8180\u8255\u84a1\u868c\u872f\u8b17\u8c24\u90a6\u90ab\u938a\u9551\u97a4\u9ac8",
        "shan": "\u5093\u50d0\u5103\u5220\u522a\u5261\u527c\u5355\u5584\u55ae\u57cf\u58a0\u58a1\u59cd\u59d7\u5b17\u5c71\u5f61\u6247\u633b\u639e\u63b8\u63ba\u6427\u6472\u647b\u64a3\u64c5\u6671\u6749\u6766\u6805\u6919\u692b\u6a86\u6c55\u6f78\u6f98\u70fb\u717d\u72e6\u73ca\u759d\u7752\u78f0\u7985\u79aa\u7a47\u7b18\u7e3f\u7e55\u7f2e\u7fb4\u7fb6\u8120\u81b3\u81bb\u8222\u829f\u82eb\u87ee\u87fa\u886b\u89a2\u8a15\u8b06\u8b71\u8baa\u8d0d\u8d61\u8d78\u8dda\u8ed5\u9096\u912f\u91e4\u928f\u9425\u9490\u9583\u95ea\u9655\u965c\u965d\u967f\u994d\u9a38\u9a9f\u9adf\u9c53\u9c54\u9cdd\u9ce3",
        "suo": "\u509e\u5506\u5522\u55cd\u55e6\u55e9\u5a11\u6240\u6331\u6332\u644d\u6475\u669b\u686b\u686c\u68ad\u6a0e\u6e91\u7410\u7411\u7463\u7485\u7637\u7743\u7c11\u7c14\u7d22\u7e2e\u7f29\u7fa7\u838e\u838f\u84d1\u8928\u8d96\u9024\u938d\u9396\u93bb\u93c1\u93fc\u9501\u9bbb",
        "bin": "\u50a7\u5110\u5bbe\u5f6c\u6448\u64ef\u658c\u68b9\u6915\u69df\u6ab3\u6ba1\u6baf\u6c43\u6ee8\u6fd2\u6ff1\u6ff5\u6ff9\u7015\u73a2\u7478\u74b8\u77c9\u7e7d\u7f24\u8191\u81cf\u8819\u8c69\u8c73\u8cd3\u8cd4\u90a0\u944c\u9554\u9726\u986e\u99aa\u9a5e\u9acc\u9ad5\u9ae9\u9b02\u9b13\u9b22\u9da3",
        "nuo": "\u50a9\u513a\u558f\u5a1c\u611e\u61e6\u61e7\u632a\u633c\u637c\u63bf\u6426\u643b\u689b\u6992\u6a60\u7808\u7a2c\u7a64\u7cd1\u7ce5\u7cef\u8afe\u8bfa\u8e43\u903d\u90cd\u9369\u9518",
        "lei": "\u50ab\u5121\u513d\u52d2\u53bd\u561e\u5792\u5841\u58d8\u58e8\u5ad8\u64c2\u6502\u6a0f\u6a91\u6ad0\u6ad1\u6b19\u6cea\u6d21\u6d99\u6dda\u7045\u74c3\u757e\u7623\u7657\u78ca\u78e5\u790c\u7927\u7928\u79b7\u7c7b\u7d2f\u7d6b\u7e32\u7e87\u7e8d\u7e9d\u7f27\u7f4d\u7fb8\u8012\u808b\u854c\u857e\u85df\u8631\u8632\u863d\u8646\u881d\u8a84\u8b84\u8bd4\u8f60\u9179\u9287\u9311\u9433\u9458\u9478\u956d\u96f7\u9741\u981b\u982a\u985e\u98a3\u9e13\u9f3a",
        "zao": "\u50ae\u51ff\u5515\u5523\u566a\u6165\u65e9\u67a3\u688d\u68d7\u6fa1\u7076\u71e5\u74aa\u7681\u7682\u7ac3\u7ac8\u7ac9\u7c09\u7cdf\u7e70\u7f32\u8241\u85bb\u85fb\u86a4\u8b5f\u8dae\u8e67\u8e81\u9020\u906d\u91a9\u947f\u9ade",
        "ao": "\u50b2\u51f9\u53ab\u55f7\u55f8\u56a3\u56c2\u5773\u5787\u58ba\u5961\u5965\u5967\u5aaa\u5abc\u5aef\u5c99\u5d85\u5db4\u5ed2\u6160\u61ca\u6277\u629d\u62d7\u646e\u64d9\u6556\u67ea\u688e\u6ef6\u6f9a\u6fb3\u71ac\u720a\u7352\u7353\u7488\u78dd\u7ff1\u7ffa\u8071\u82ba\u851c\u87af\u8884\u8956\u8a4f\u8b37\u8b38\u8eea\u9068\u93ca\u93d6\u957a\u969e\u9a41\u9a9c\u9c32\u9ccc\u9dd4\u9f07",
        "piao": "\u50c4\u527d\u52e1\u560c\u5ad6\u5f6f\u5fb1\u6153\u65da\u6734\u6b8d\u6df2\u6f02\u72a5\u74e2\u76ab\u779f\u7968\u7ac2\u7bfb\u7e39\u7f25\u7ff2\u83a9\u8508\u85b8\u87b5\u91a5\u95dd\u9860\u98c3\u98c4\u98d8\u9a43\u9aa0\u9b52\u9dc5",
        "man": "\u50c8\u57cb\u5881\u5ada\u5c58\u5e54\u6097\u6162\u6172\u6471\u66fc\u69fe\u6e80\u6ee1\u6eff\u6f2b\u6fab\u6fb7\u71b3\u734c\u748a\u7792\u779e\u77d5\u7e35\u7f26\u8504\u8513\u86ee\u87a8\u87ce\u883b\u8954\u8b3e\u8c29\u8e63\u93cb\u93dd\u9558\u9794\u9862\u989f\u9945\u9992\u9b17\u9b18\u9c3b\u9cd7",
        "deng": "\u50dc\u51f3\u5654\u58b1\u5b01\u5d9d\u6225\u6729\u6ac8\u6f82\u6f84\u706f\u71c8\u7492\u767b\u77aa\u78f4\u7af3\u7b49\u7c26\u857d\u89b4\u8c4b\u8e6c\u9086\u9093\u9127\u9419\u956b\u96a5\u972f",
        "fan": "\u50e0\u51e1\u51e2\u51e3\u52eb\u5325\u53cd\u58a6\u597f\u5b0e\u5b0f\u5b14\u5e06\u5e61\u5fdb\u61a3\u65d9\u65db\u674b\u67c9\u68b5\u68e5\u6a0a\u6a4e\u6c3e\u6c4e\u6cdb\u6efc\u702a\u703f\u70e6\u7169\u71d4\u72af\u74a0\u7548\u756a\u76d5\u77fe\u792c\u7b32\u7b35\u7bc4\u7c53\u7c75\u7dd0\u7e41\u7e59\u7fb3\u7ffb\u81b0\u8227\u8303\u8543\u85a0\u85e9\u8629\u881c\u894e\u8a09\u8ca9\u8d29\u8e6f\u8ed3\u8eec\u8f53\u8fd4\u9124\u91e9\u9407\u9492\u98bf\u98dc\u98ef\u98f0\u996d\u9b6c\u9c55\u9ded",
        "tie": "\u50e3\u5e16\u6017\u841c\u86c8\u8cbc\u8d34\u9244\u9421\u9435\u94c1\u98fb\u992e\u9a56",
        "seng": "\u50e7\u9b19",
        "zhuang": "\u50ee\u58ee\u58ef\u58f5\u5958\u5986\u599d\u5a24\u5e62\u5e84\u5f09\u6206\u6207\u649e\u6869\u6889\u6a01\u710b\u72b6\u72c0\u7ca7\u7cda\u8358\u838a\u88c5\u88dd",
        "jiang": "\u50f5\u531e\u5320\u58c3\u5956\u5968\u596c\u59dc\u5c06\u5c07\u5d79\u5f36\u5f37\u5f3a\u5f4a\u646a\u647e\u6868\u69f3\u6a7f\u6bad\u6c5f\u6d1a\u6d46\u6ef0\u6f3f\u729f\u734e\u74e8\u7555\u757a\u7585\u7586\u7913\u7ce1\u7ce8\u7d73\u7e6e\u7edb\u7f30\u7fde\u8029\u8199\u8333\u8441\u848b\u8523\u8591\u8679\u8780\u87bf\u88b6\u8b1b\u8b3d\u8bb2\u8c47\u9171\u91a4\u91ac\u964d\u97c1\u985c\u9c42\u9cc9",
        "min": "\u50f6\u51ba\u5221\u52c4\u5cb7\u5d0f\u5fde\u5fdf\u600b\u60af\u610d\u615c\u61ab\u62bf\u636a\u6543\u654f\u656f\u65fb\u65fc\u668b\u6c11\u6cef\u6e63\u6f63\u6fa0\u739f\u73c9\u7418\u7449\u75fb\u76bf\u76ff\u7807\u7888\u7b22\u7c22\u7dcd\u7de1\u7f17\u7f60\u82e0\u9231\u9309\u9372\u9594\u9596\u95a9\u95ba\u95f5\u95fd\u9c35\u9cd8\u9efd\u9efe",
        "sai": "\u50ff\u55ee\u567b\u585e\u601d\u6056\u6122\u63cc\u6be2\u7c3a\u816e\u8cfd\u8d5b\u984b\u9c13\u9cc3",
        "dang": "\u5105\u515a\u51fc\u5679\u5735\u57b1\u58cb\u5b95\u5d63\u5f53\u6113\u6321\u64cb\u6529\u6863\u6a94\u6b13\u6c39\u6fa2\u7059\u73f0\u7497\u74ab\u74fd\u7576\u76ea\u778a\u7800\u78ad\u7911\u7b5c\u7c1c\u7c39\u8261\u8361\u83ea\u8569\u862f\u87f7\u88c6\u8960\u8b61\u8b9c\u8c20\u8da4\u903f\u943a\u9441\u94db\u95e3\u96fc\u9ee8",
        "tai": "\u5113\u51ad\u53f0\u5454\u56fc\u576e\u592a\u5933\u5b2f\u5b61\u5ff2\u6001\u614b\u62ac\u64e1\u65f2\u67b1\u6aaf\u6c70\u6cf0\u6e99\u70b1\u70b2\u71e4\u79ee\u7c49\u7c8f\u80bd\u80ce\u81fa\u8226\u82d4\u83ed\u85b9\u8dc6\u90b0\u915e\u9226\u949b\u98b1\u99d8\u9a80\u9b90\u9c90",
        "lan": "\u5116\u5170\u53b1\u56d2\u58c8\u58cf\u5a6a\u5b3e\u5b44\u5b4f\u5c9a\u5d50\u5e71\u61d2\u61e2\u61f6\u62e6\u63fd\u64e5\u6514\u652c\u6593\u6595\u680f\u6984\u6b04\u6b16\u6b17\u6d68\u6ee5\u6f24\u6f9c\u6feb\u703e\u7046\u7060\u7061\u70c2\u71d7\u71e3\u71f7\u7201\u721b\u7224\u7226\u722b\u74bc\u74d3\u7937\u7bee\u7c43\u7c63\u7cf7\u7e9c\u7f06\u7f71\u847b\u84dd\u85cd\u862b\u862d\u8934\u8955\u8964\u8974\u89a7\u89bd\u89c8\u8b4b\u8b95\u8c30\u8e9d\u9182\u946d\u9484\u9567\u95cc\u9611\u97ca\u9872",
        "meng": "\u511a\u51a1\u52d0\u5922\u5923\u5b5f\u5e6a\u61dc\u61de\u61f5\u66da\u6726\u68a6\u6a57\u6aac\u6c0b\u6c13\u6e95\u6fdb\u731b\u7374\u74fe\u750d\u753f\u76df\u77a2\u77c7\u77d2\u791e\u824b\u8268\u8394\u840c\u8420\u8499\u8544\u867b\u8722\u8771\u8813\u9133\u9138\u9333\u9530\u96fa\u9725\u973f\u9740\u995b\u9bcd\u9bed\u9e0f\u9e72",
        "neng": "\u511c\u6fd8\u80fd\u85b4",
        "qiong": "\u511d\u5314\u536d\u5b1b\u5b86\u60f8\u684f\u68fe\u6a69\u712a\u712d\u7162\u743c\u749a\u74ca\u7758\u778f\u7a77\u7a79\u7aae\u7ac6\u7b3b\u7b47\u8315\u8486\u85d1\u85ed\u86e9\u8d79\u8deb\u8f01\u909b\u928e",
        "lie": "\u5120\u51bd\u5217\u52a3\u52bd\u54a7\u57d2\u57d3\u59f4\u5de4\u6312\u6369\u64f8\u6d0c\u6d56\u70c8\u716d\u72a3\u730e\u731f\u7375\u7759\u8057\u811f\u8322\u86da\u86f6\u88c2\u8d94\u8e90\u8ffe\u98b2\u9b1b\u9b23\u9ba4\u9c72\u9d37",
        "du": "\u5125\u51df\u5335\u53be\u55a5\u561f\u5835\u5992\u59ac\u5b3b\u5e3e\u5ea6\u6581\u668f\u675c\u691f\u6add\u6bac\u6bb0\u6bd2\u6d9c\u6e0e\u6e21\u7006\u724d\u7258\u728a\u72a2\u72ec\u7368\u743d\u74c4\u76be\u7763\u7779\u79fa\u7b03\u7be4\u7c35\u7e9b\u809a\u828f\u8370\u8773\u8799\u8827\u8839\u88fb\u89a9\u8aad\u8b80\u8b9f\u8bfb\u8c44\u8ced\u8d15\u8d4c\u90fd\u918f\u9316\u934d\u945f\u9540\u95cd\u9607\u976f\u97c7\u97e5\u9813\u987f\u9a33\u9ad1\u9ee9\u9ef7",
        "teng": "\u512f\u5e50\u6ed5\u6f1b\u71a5\u75bc\u7c50\u7c58\u7e22\u817e\u81af\u85e4\u87a3\u8a8a\u8b04\u99e6\u9a30\u9a63\u9c27\u9f1f",
        "long": "\u5131\u5499\u54e2\u56a8\u5784\u5785\u58df\u58e0\u5c78\u5d90\u5dc3\u5dc4\u5f04\u5fbf\u62e2\u630a\u6335\u650f\u663d\u66e8\u6727\u680a\u6887\u69de\u6af3\u6cf7\u6e70\u6edd\u6f0b\u7027\u7216\u73d1\u74cf\u7643\u772c\u77d3\u783b\u7866\u7931\u7932\u7abf\u7adc\u7b3c\u7bed\u7c60\u804b\u807e\u80e7\u830f\u8622\u882a\u882c\u8856\u8971\u8c45\u8d1a\u8e98\u93e7\u9468\u9647\u9686\u96b4\u9733\u9747\u9e17\u9f8d\u9f92\u9f93\u9f99",
        "rang": "\u5134\u52f7\u56b7\u58cc\u58e4\u61f9\u6518\u703c\u7219\u737d\u74e4\u79b3\u7a63\u7a70\u8618\u8830\u8b72\u8b93\u8ba9\u8e9f\u9b24",
        "zuan": "\u5139\u6525\u7c6b\u7e64\u7e82\u7e89\u7e98\u7f35\u8cfa\u8d5a\u8e9c\u8ea6\u945a\u947d\u94bb\u9961",
        "r": "\u513f",
        "xiong": "\u5144\u5147\u51f6\u5308\u54c5\u5910\u5ff7\u605f\u657b\u6c79\u6d36\u718a\u80f7\u80f8\u828e\u8a29\u8a57\u8a7e\u8bbb\u8bc7\u8cef\u8d68\u96c4",
        "chong": "\u5145\u51b2\u5603\u5ba0\u5bf5\u5d07\u5d08\u5fb8\u5fe1\u61a7\u63f0\u644f\u6c96\u6d7a\u6d8c\u6e67\u6f34\u73eb\u75cb\u794c\u79cd\u7a2e\u7fc0\u8202\u825f\u833a\u866b\u8769\u87f2\u885d\u8908\u8e56\u91cd\u9283\u94f3\u9680",
        "zhao": "\u5146\u53ec\u5541\u5632\u5797\u59b1\u5df6\u627e\u62db\u6477\u65d0\u662d\u6641\u66cc\u671d\u679b\u67d6\u68f9\u6ac2\u6cbc\u70a4\u7167\u71f3\u722a\u722f\u72e3\u7475\u76c4\u7740\u77be\u7b0a\u7b8c\u7f69\u7f84\u8081\u8087\u8088\u83ec\u8457\u8a54\u8bcf\u8d75\u8d99\u91d7\u924a\u9363\u948a\u96ff\u99cb\u9d6b",
        "dui": "\u514a\u514c\u5151\u5796\u5806\u5860\u5bf9\u5bfe\u5c0d\u5d5f\u603c\u619d\u619e\u61df\u6566\u6fe7\u6ffb\u7029\u75fd\u7893\u78d3\u7d90\u85b1\u8b48\u8f5b\u9413\u941c\u9566\u961f\u966e\u968a\u9827",
        "ke": "\u514b\u5159\u5161\u523b\u524b\u52c0\u52ca\u5392\u53ef\u5475\u54b3\u5580\u55d1\u5777\u578e\u5801\u58f3\u5a14\u5ba2\u5c05\u5ca2\u5cc7\u5d59\u5db1\u606a\u6119\u63e2\u6415\u6564\u67ef\u68f5\u69bc\u6a16\u6bbb\u6bbc\u6c2a\u6e07\u6e34\u6e98\u70a3\u7241\u7290\u73c2\u75b4\u778c\u7822\u78a6\u78d5\u790d\u791a\u79d1\u7a1e\u7aa0\u7c3b\u7dd9\u7f02\u80e2\u82db\u842a\u8596\u86b5\u874c\u8ab2\u8bfe\u8efb\u8f72\u9198\u9233\u94b6\u951e\u959c\u9826\u9846\u988f\u9897\u9a0d\u9a92\u9ac1\u9c84",
        "dou": "\u515c\u5160\u543a\u5517\u551e\u6296\u6568\u6597\u65a3\u6793\u67a1\u68aa\u6a77\u6bed\u6d62\u75d8\u7aa6\u7ac7\u7bfc\u8130\u8373\u8538\u86aa\u8aad\u8b80\u8bfb\u8c46\u9017\u90d6\u90fd\u92c0\u9597\u95d8\u9627\u9661\u9916\u997e\u9b25\u9b26\u9b2a\u9b2c\u9b2d",
        "mao": "\u515e\u5183\u5187\u5190\u5192\u536f\u5825\u5918\u5a8c\u5aa2\u5af9\u5cc1\u5e3d\u61cb\u623c\u65c4\u6634\u6693\u6786\u67d5\u6959\u6bdb\u6bf7\u6cd6\u6e35\u7266\u732b\u7441\u7683\u770a\u7780\u7790\u77db\u7b37\u7f5e\u8004\u8252\u82bc\u8302\u8305\u8306\u843a\u8765\u87ca\u88a4\u8992\u8c8c\u8c93\u8cbf\u8d38\u8ede\u911a\u912e\u9155\u925a\u9328\u94c6\u951a\u9ae6\u9af3\u9d9c",
        "nei": "\u5167\u5185\u54ea\u6c1d\u812e\u8147\u90a3\u9912\u9981\u9bbe\u9bd8",
        "liu": "\u516d\u5218\u5289\u56a0\u5774\u586f\u5ab9\u5b3c\u5d67\u5ec7\u61f0\u65c8\u65d2\u67f3\u6801\u687a\u69b4\u6a4a\u6a6e\u6ca0\u6d41\u6d4f\u6e9c\u6f91\u700f\u7198\u73cb\u7409\u7460\u746c\u74a2\u7542\u7544\u7559\u7571\u7581\u7624\u7645\u786b\u788c\u78c2\u7db9\u7efa\u7f76\u7f80\u7fcf\u84a5\u84c5\u85f0\u88d7\u8e53\u905b\u925a\u92f6\u938f\u93a6\u93d0\u9402\u950d\u954f\u9560\u9646\u9678\u96e1\u9724\u98c0\u98c5\u98d7\u98f9\u993e\u998f\u99e0\u99f5\u9a2e\u9a51\u9a9d\u9b38\u9c21\u9db9\u9dce\u9dda\u9e60\u9e68\u9e8d",
        "shou": "\u517d\u53ce\u53d7\u552e\u57a8\u58fd\u5900\u5b88\u5bff\u624b\u624c\u6388\u63b1\u6536\u6dad\u719f\u72e9\u7363\u7378\u75e9\u7626\u7dac\u7ef6\u8184\u824f\u834d\u93c9\u9996",
        "ran": "\u5184\u5189\u5465\u562b\u59cc\u5aa3\u5ae8\u67d3\u6a6a\u7136\u71c3\u73c3\u7e4e\u80b0\u82d2\u8692\u86a6\u86ba\u86c5\u887b\u8887\u88a1\u9ae5\u9aef",
        "gang": "\u5188\u51ae\u521a\u525b\u5808\u583d\u5842\u5c97\u5ca1\u5d17\u6205\u6206\u625b\u6386\u6760\u68e1\u69d3\u6e2f\u7135\u7285\u7598\u7899\u7b10\u7b7b\u7db1\u7eb2\u7f38\u7f41\u7f52\u7f61\u809b\u91ed\u92fc\u93a0\u94a2",
        "gua": "\u518e\u522e\u5250\u526e\u5280\u5366\u53e7\u5471\u5569\u5be1\u61d6\u62ec\u6302\u639b\u681d\u7171\u74dc\u7611\u7b48\u7d53\u7dfa\u7f63\u7f6b\u8052\u80cd\u8161\u81bc\u8440\u8778\u8902\u8a7f\u8bd6\u8d8f\u8e3b\u92bd\u9822\u98b3\u9a27\u9afa\u9d30\u9e39",
        "zui": "\u51a3\u539c\u5480\u5634\u567f\u5806\u58ac\u5d89\u5d8a\u5db5\u666c\u6700\u6718\u682c\u69dc\u6a36\u6a87\u6a8c\u6d05\u6fe2\u74bb\u797d\u7a21\u7d4a\u7e97\u7f6a\u855e\u894a\u89dc\u8fa0\u9028\u9154\u917b\u9189\u92f7\u930a",
        "kou": "\u51a6\u527e\u52b6\u53e3\u53e9\u5bbc\u5bc7\u5f44\u6010\u6263\u62a0\u6473\u6542\u6ef1\u770d\u7789\u7798\u7a9b\u7b58\u7c06\u82a4\u8532\u853b\u88a7\u91e6\u93c2\u9dc7",
        "mei": "\u51c2\u5445\u5833\u587a\u59b9\u5a84\u5a92\u5a9a\u5aba\u5b0d\u5bd0\u5d44\u5d4b\u5fbe\u6334\u6517\u6627\u679a\u6802\u6885\u6963\u6973\u69d1\u6bce\u6bcf\u6c92\u6ca1\u6cac\u6d7c\u6e3c\u6e44\u6e48\u715d\u7164\u71d8\u7338\u73ab\u73fb\u7441\u7442\u75d7\u7709\u771b\u7742\u7778\u7959\u7996\u7bc3\u7cdc\u7f8e\u8104\u8122\u815c\u82fa\u8393\u847f\u875e\u8882\u8b0e\u8c1c\u8dca\u90ff\u9176\u92c2\u9382\u9387\u9541\u9545\u9709\u97ce\u9b3d\u9b45\u9da5\u9e5b\u9ee3\u9ef4",
        "zhun": "\u51c6\u51d6\u57fb\u5b92\u5c6f\u6e96\u7a15\u7a80\u7da7\u80ab\u8860\u8a30\u8ac4\u8c06\u8fcd\u96bc\u9dbd",
        "cou": "\u51d1\u6971\u6e4a\u8160\u8f33\u8f8f",
        "chuang": "\u5205\u521b\u5231\u5259\u5275\u56ea\u5e62\u5e8a\u6006\u6134\u6183\u6227\u6436\u6450\u6464\u649e\u6a66\u6f3a\u734a\u7592\u75ae\u7621\u7a97\u7abb\u95d6\u95ef",
        "cun": "\u520c\u540b\u5b58\u5bf8\u5fd6\u6751\u6f8a\u76b4\u7af4\u7c7f\u88b8\u8e72\u90a8\u928c",
        "hua": "\u5212\u5283\u5316\u534e\u54d7\u5629\u5a73\u5aff\u5b05\u5d0b\u6466\u6779\u6866\u69ec\u6a3a\u6ed1\u6f85\u733e\u753b\u756b\u7575\u7809\u78c6\u7e63\u8219\u82b1\u82b2\u83ef\u8550\u8796\u89df\u8a71\u8ae3\u8b41\u8b6e\u8bdd\u8c41\u91eb\u9335\u93f5\u94e7\u9a4a\u9a85\u9de8",
        "bie": "\u5225\u522b\u5487\u5f46\u5fb6\u618b\u762a\u765f\u7e2a\u8382\u864c\u86c2\u87de\u8952\u8e69\u9c49\u9cd6\u9f08\u9f9e",
        "pao": "\u5228\u530f\u5486\u5789\u5945\u5e96\u629b\u62cb\u6ce1\u70ae\u70b0\u722e\u72cd\u74df\u75b1\u76b0\u7832\u791f\u792e\u812c\u888d\u8dd1\u8ef3\u9764\u9784\u9af1\u9e85\u9ead",
        "shua": "\u5237\u5530\u800d\u8a9c\u9b9b",
        "xue": "\u524a\u5419\u5671\u5779\u58c6\u5b66\u5b78\u5ca4\u5cc3\u5da8\u6585\u6588\u6856\u6cec\u6cf6\u6fa9\u71e2\u7a74\u81a4\u8313\u859b\u8840\u8895\u89f7\u8b14\u8b1e\u8c11\u8d90\u8e05\u8fa5\u96e4\u96ea\u9774\u97be\u9c48\u9cd5\u9dfd\u9e34",
        "la": "\u524c\u5566\u5587\u56b9\u5783\u62c9\u63e6\u63e7\u650b\u65ef\u67c6\u694b\u6e82\u74ce\u760c\u782c\u78d6\u7fcb\u814a\u81c8\u81d8\u83c8\u843d\u84dd\u85cd\u85de\u8721\u874b\u8772\u881f\u8fa2\u8fa3\u908b\u945e\u9574\u97a1\u9b0e\u9bfb\u9d63",
        "pou": "\u5256\u5425\u5485\u54e3\u5a44\u5ecd\u6294\u6299\u634a\u638a\u68d3\u7283\u88d2",
        "po": "\u5256\u53f5\u5619\u5761\u5a46\u5c00\u5cb6\u5ef9\u6534\u6535\u6734\u6a38\u6ac7\u6cca\u6ce2\u6cfa\u6cfc\u6d26\u6e8c\u6f51\u7087\u70de\u73c0\u7679\u76a4\u7834\u7836\u7b38\u7c95\u7e41\u7fcd\u84aa\u8522\u8feb\u9131\u9166\u9197\u91b1\u9255\u93fa\u948b\u94b7\u9642\u9817\u9887\u9b44",
        "tuan": "\u5278\u56e2\u56e3\u5718\u5f56\u6171\u629f\u6476\u69eb\u6e4d\u6f19\u7153\u732f\u7583\u7cf0\u8916\u8c92\u93c4\u9dfb\u9ed7",
        "cuan": "\u5297\u5dd1\u64ba\u6505\u6512\u651b\u6522\u6ad5\u6ba9\u6c46\u71b6\u7228\u7a9c\u7ac4\u7be1\u7bf9\u7c12\u8e7f\u8ea5\u92d1\u9479\u9569",
        "keng": "\u52a5\u542d\u5748\u5751\u5994\u5a19\u6333\u647c\u727c\u7841\u785c\u787b\u92b5\u935e\u93d7\u94ff\u962c",
        "weng": "\u52dc\u55e1\u5855\u5963\u5d61\u66a1\u6d7b\u6ec3\u74ee\u7515\u7788\u7f4b\u7fc1\u806c\u84ca\u8579\u8789\u9393\u9710\u9db2\u9e5f\u9f46",
        "shuo": "\u52fa\u54fe\u5981\u5e25\u63f1\u6420\u6570\u6578\u6714\u69ca\u6b36\u70c1\u720d\u7361\u7387\u77df\u7855\u78a9\u7bbe\u84b4\u87c0\u8aaa\u8aac\u8bf4\u9399\u9460\u94c4",
        "tao": "\u530b\u53e8\u54b7\u5555\u5932\u5957\u5acd\u5e4d\u5f22\u6146\u638f\u642f\u6843\u68bc\u69c4\u6aae\u6d2e\u6d9b\u6dd8\u6ed4\u6fe4\u7118\u71fe\u746b\u7979\u7d5b\u7daf\u7e1a\u7e27\u7ee6\u7ef9\u7fe2\u8404\u872a\u88ea\u8a0e\u8a5c\u8b1f\u8ba8\u8f41\u8fef\u9003\u9184\u92fe\u932d\u9676\u9780\u9789\u97b1\u97dc\u97ec\u98f8\u9940\u9955\u99e3\u9a0a\u9f17",
        "da": "\u5312\u547e\u5491\u54d2\u55d2\u5660\u57af\u5854\u5896\u58b6\u5927\u59b2\u601b\u6253\u642d\u6498\u6c93\u709f\u7557\u7563\u75b8\u7629\u7714\u7b2a\u7b54\u7e68\u8037\u8345\u8359\u8598\u87fd\u8921\u8a5a\u8df6\u8fbe\u9039\u9054\u943d\u95d2\u9618\u977c\u9791\u97c3",
        "zang": "\u5328\u585f\u5958\u5f09\u7242\u7243\u7f98\u810f\u81d3\u81df\u81e7\u846c\u8535\u85cf\u8ccd\u8cd8\u8d13\u8d1c\u8d43\u92ba\u937a\u9517\u99d4\u9a75\u9ad2",
        "suan": "\u5334\u72fb\u75e0\u7958\u7b07\u7b6d\u7b97\u849c\u9178",
        "nian": "\u5344\u5538\u57dd\u59e9\u5e74\u5eff\u5ff5\u62c8\u637b\u649a\u64b5\u6506\u6d8a\u6df0\u78be\u79ca\u79e5\u7c10\u7c98\u824c\u852b\u8dc8\u8e68\u8e8e\u8f26\u8f87\u917f\u9b8e\u9bf0\u9c87\u9cb6\u9ecf\u9f30\u9f5e\u9f73",
        "shuai": "\u535b\u54b0\u5b48\u5e05\u5e25\u6454\u7387\u7529\u7e17\u7e42\u87c0\u8870",
        "ang": "\u536c\u5c87\u6602\u663b\u678a\u76ce\u80ae\u8eee\u91a0\u9aaf",
        "que": "\u5374\u537b\u57c6\u58a7\u5d05\u602f\u606a\u60ab\u6128\u6164\u6409\u69b7\u6bbc\u6bc3\u704d\u7094\u71e9\u7638\u76b5\u785e\u786e\u788f\u78ba\u78bb\u7910\u792d\u7f3a\u7f3c\u849b\u8d9e\u95cb\u95d5\u9615\u9619\u96c0\u9b65\u9d72\u9e4a",
        "zhe": "\u5387\u54f2\u5560\u556b\u5586\u55fb\u569e\u57d1\u5aec\u5b85\u608a\u6174\u61fe\u6298\u6458\u647a\u6662\u6663\u6754\u67d8\u6aa1\u6b7d\u6d59\u70e2\u74cb\u7740\u7813\u78d4\u7987\u7c77\u8005\u8034\u8457\u8517\u8674\u86f0\u8707\u87ab\u87c4\u87c5\u8936\u8975\u8a5f\u8b2b\u8b3a\u8b81\u8b8b\u8b98\u8c2a\u8d6d\u8f12\u8f19\u8f4d\u8f84\u8f99\u8fd9\u9019\u906e\u92b8\u937a\u9517\u9bbf\u9dd3\u9e05\u9e67",
        "can": "\u53c2\u53c3\u53c5\u5646\u5b20\u5b31\u5b71\u60e8\u60ed\u6158\u6159\u615a\u61af\u63ba\u6701\u6b8b\u6b98\u6e4c\u6faf\u707f\u71e6\u74a8\u7cb2\u84e1\u8592\u8593\u8695\u8745\u8836\u883a\u8b32\u98e1\u9910\u9a42\u9a96\u9eea\u9ef2",
        "cen": "\u53c2\u53c3\u53c5\u57c1\u5c91\u5d7e\u68a3\u68ab\u6a6c\u6d94\u7b12\u8593",
        "shuang": "\u53cc\u587d\u5b40\u5b47\u6161\u6a09\u6b06\u6cf7\u6edd\u6f3a\u7027\u7040\u723d\u7935\u7e14\u826d\u96d9\u971c\u9a3b\u9a66\u9aa6\u9dde\u9e18\u9e74",
        "zhui": "\u53d5\u5760\u589c\u5a3a\u60f4\u6858\u690e\u6c9d\u787e\u7908\u7aa1\u7b0d\u7db4\u7e0b\u7f00\u7f12\u8144\u8187\u8b75\u8d05\u8d58\u8ffd\u9310\u933a\u9446\u9525\u96b9\u991f\u9a05\u9a93\u9d2d\u9d7b",
        "rui": "\u53e1\u58e1\u5a51\u60e2\u6798\u6875\u6a64\u6c6d\u745e\u7524\u777f\u7dcc\u7e60\u82ae\u854a\u854b\u8564\u8602\u8603\u868b\u8739\u92b3\u92ed\u9510",
        "mang": "\u5402\u54e4\u58fe\u5940\u5a0f\u5c28\u5eac\u5fd9\u607e\u6082\u6757\u6767\u6c13\u6c52\u6d5d\u6f2d\u7264\u727b\u72f5\u75dd\u76f2\u76f3\u7865\u786d\u7b00\u8292\u832b\u833b\u83bd\u83be\u8609\u86d6\u87d2\u880e\u9099\u91ef\u92e9\u94d3\u99f9\u9f06",
        "a": "\u5416\u5475\u554a\u55c4\u814c\u9312\u9515\u963f",
        "tun": "\u541e\u5451\u554d\u564b\u56e4\u5c6f\u5ff3\u62f5\u65fd\u66be\u671c\u6c3d\u6d92\u757d\u81c0\u81cb\u829a\u8781\u892a\u8c58\u8c5a\u8ed8\u9715\u98e9\u9968\u9b68\u9c80",
        "hang": "\u542d\u592f\u5df7\u65bb\u676d\u6841\u6c86\u73e9\u7b55\u7d4e\u7ed7\u822a\u82c0\u86a2\u884c\u8ca5\u8fd2\u96fd\u980f\u9883\u9b67",
        "shun": "\u542e\u63d7\u696f\u6a53\u76fe\u779a\u77ac\u821c\u8563\u8cf0\u9806\u987a\u9b0a",
        "chuo": "\u5437\u555c\u56bd\u5a16\u5a65\u5a7c\u60d9\u6233\u64c9\u6b60\u6db0\u72b3\u73ff\u7577\u78ed\u7dbd\u7e5b\u7ef0\u814f\u8ac1\u8da0\u8e14\u8f1f\u8f8d\u8fb5\u8fb6\u9034\u916b\u918a\u9461\u9f6a\u9f71\u9f8a",
        "gao": "\u543f\u544a\u5930\u641e\u652a\u66a0\u6772\u69c1\u69d4\u69f9\u6a70\u6aba\u6adc\u6edc\u7170\u768b\u7690\u776a\u777e\u796e\u7970\u799e\u7a3e\u7a3f\u7b76\u7bd9\u7cd5\u7e1e\u7f1f\u7f94\u7f99\u818f\u81ef\u83d2\u85c1\u85f3\u8aa5\u8bf0\u90dc\u92ef\u93ac\u9506\u9550\u97df\u993b\u9ad8\u9ad9\u9bcc\u9f1b",
        "ne": "\u5450\u5462\u54ea\u8a25\u8bb7",
        "m": "\u5452\u5638",
        "guo": "\u5459\u54bc\u556f\u5613\u56ef\u56f6\u56fb\u56fd\u5700\u570b\u57da\u581d\u588e\u5d1e\u5e3c\u5e57\u60c8\u6156\u63b4\u6451\u679c\u6901\u69e8\u6da1\u6dc9\u6e26\u6f0d\u6fc4\u7313\u7c02\u7cbf\u7db6\u8052\u805d\u8142\u8158\u8195\u83d3\u8662\u873e\u8748\u87c8\u88f9\u8f20\u8fc7\u904e\u90ed\u921b\u9301\u934b\u9439\u9505\u991c\u9983\u9998",
        "pen": "\u5460\u55af\u55b7\u5674\u6b55\u6e53\u74eb\u76c6\u7fc9\u7ff8\u8450",
        "lo": "\u54af",
        "pin": "\u54c1\u56ac\u59d8\u5a26\u5ad4\u5b2a\u62da\u62fc\u6980\u6d84\u7015\u725d\u77c9\u7917\u8058\u82f9\u85b2\u860b\u8ca7\u8d2b\u983b\u9870\u9891\u98a6",
        "ha": "\u54c8\u867e\u86e4\u8766\u927f\u94ea\u9c15",
        "yo": "\u54df\u5537\u55b2\u80b2",
        "o": "\u54e6\u5594\u5662\u5684",
        "hng": "\u54fc",
        "miu": "\u5512\u7e46\u7f2a\u8b2c\u8c2c",
        "n": "\u5514\u55ef",
        "ng": "\u5514\u55ef",
        "huan": "\u5524\u559a\u559b\u56be\u571c\u57b8\u5942\u5950\u5b1b\u5ba6\u5bcf\u5bf0\u5d48\u5e7b\u60a3\u610c\u61c1\u61fd\u6356\u6362\u63db\u64d0\u6853\u6899\u69f5\u6b22\u6b53\u6b61\u6d39\u6d63\u6da3\u6e19\u6f36\u6fa3\u6fb4\u70c9\u7115\u7165\u72bf\u72df\u72e5\u737e\u73af\u744d\u74b0\u74db\u75ea\u7613\u7696\u7746\u77a3\u7ceb\u7de9\u7e6f\u7f13\u7f33\u7fa6\u8092\u8341\u8408\u8411\u85e7\u89e8\u8b99\u8c62\u8c72\u8c86\u8c9b\u8f10\u8f58\u8fd8\u902d\u9084\u90c7\u9144\u9370\u9436\u953e\u956e\u95e4\u961b\u96c8\u9a69\u9b1f\u9bc7\u9c00\u9ca9\u9d05\u9d4d\u9e6e",
        "nou": "\u5542\u55d5\u69c8\u7373\u7fba\u8028\u8b68\u8b73\u9392\u941e",
        "ken": "\u5543\u57a6\u58be\u6073\u61c7\u63af\u73e2\u784d\u808e\u80af\u80bb\u88c9\u8903\u8c64\u9339\u9f57\u9f66\u9f88",
        "chuai": "\u555c\u562c\u63e3\u640b\u8197\u81aa\u8e39",
        "pa": "\u556a\u5991\u5e0a\u5e15\u6015\u6252\u63b1\u6777\u6d3e\u6f56\u722c\u7436\u7685\u7b62\u7d48\u8019\u8225\u8469\u8686\u8899\u8db4\u8dc1\u9200\u94af",
        "se": "\u556c\u55c7\u585e\u61ce\u64cc\u6b6e\u6b70\u6da9\u6e0b\u6f80\u6f81\u6fc7\u6fcf\u7012\u729e\u745f\u74b1\u7a51\u7a61\u7e6c\u7fdc\u8272\u8b45\u8d87\u8f56\u92ab\u94ef\u96ed\u98cb",
        "re": "\u558f\u60f9\u6e03\u70ed\u71b1\u82e5",
        "miao": "\u55b5\u5999\u5e99\u5ebf\u5edf\u63cf\u676a\u6773\u6dfc\u6e3a\u7385\u7707\u7784\u79d2\u7ad7\u7bce\u7de2\u7df2\u7e46\u7f08\u7f2a\u82d7\u85d0\u9088\u9c59\u9d93\u9e4b",
        "cao": "\u55bf\u5608\u5d86\u613a\u61c6\u64a1\u64cd\u66f9\u66fa\u69fd\u6f15\u7cd9\u808f\u825a\u8278\u8279\u8349\u84f8\u87ac\u893f\u8959\u9135\u93ea\u9a32",
        "hei": "\u55e8\u563f\u6f76\u9ed1\u9ed2",
        "dia": "\u55f2",
        "de": "\u561a\u5730\u5e95\u5f97\u5fb3\u5fb7\u6074\u60b3\u60ea\u68cf\u6dc2\u7684\u9340\u951d",
        "dei": "\u561a\u5f97",
        "zhuai": "\u562c\u62fd\u66f3\u66f5\u8de9\u8ee2\u8f49\u8f6c",
        "ceng": "\u564c\u5c42\u5c64\u5d92\u66fd\u66fe\u7880\u7af2\u8e6d\u912b",
        "ca": "\u5693\u56c3\u62c6\u64e6\u7924",
        "nin": "\u56dc\u6041\u60a8\u62f0",
        "kun": "\u56f0\u5764\u5803\u58f8\u58fc\u5a6b\u5d10\u5d11\u6083\u60c3\u6346\u6606\u665c\u68b1\u6d83\u711c\u7311\u7428\u747b\u774f\u7871\u7975\u7a07\u7a1b\u7d91\u83ce\u872b\u88c8\u88cd\u890c\u8c87\u918c\u9315\u951f\u95ab\u95b8\u9603\u9a09\u9ae0\u9ae1\u9ae8\u9be4\u9cb2\u9d7e\u9e4d\u9f6b",
        "ri": "\u56f8\u65e5\u6c1c\u8875\u9224\u99b9\u9a72",
        "lu:e|lve": "\u5719\u63a0\u64fd\u650a\u7565\u7567\u92dd\u950a",
        "sao": "\u57fd\u5ac2\u6145\u626b\u6383\u63bb\u6414\u68a2\u6c09\u6e9e\u7619\u7e45\u7f2b\u7f32\u81ca\u8258\u98be\u9a12\u9a37\u9a9a\u9bf5\u9c20\u9c3a\u9c62\u9ccb",
        "ruan": "\u5827\u58d6\u5a86\u648b\u670a\u744c\u74c0\u789d\u791d\u7ddb\u800e\u815d\u8761\u8815\u8edf\u8f2d\u8f6f\u962e",
        "zeng": "\u5897\u589e\u618e\u66fd\u66fe\u6a67\u71b7\u7494\u7511\u77f0\u78f3\u7d9c\u7e52\u7efc\u7f2f\u7f7e\u8b44\u8d08\u8d60\u92e5\u9503\u9a53",
        "qun": "\u590b\u5bad\u5cee\u5e2c\u7fa3\u7fa4\u88d9\u88e0\u8e06\u9021\u9e87\u9e8f\u9e95",
        "wai": "\u5916\u5d34\u6b6a",
        "en": "\u5940\u6069\u6441\u84bd",
        "zou": "\u594f\u5ab0\u63ab\u63cd\u68f7\u68f8\u7b83\u7dc5\u83c6\u8acf\u8b05\u8bf9\u8d70\u8d71\u90b9\u90f0\u9112\u9139\u966c\u9a36\u9a5f\u9a7a\u9beb\u9cb0\u9ec0\u9f7a",
        "nu:|nv": "\u5973\u5ff8\u6067\u6712\u7c79\u8842\u8844\u91f9\u9495",
        "niu": "\u599e\u5ff8\u626d\u62d7\u677b\u7084\u725b\u72c3\u7d10\u7ebd\u83a5\u9215\u94ae\u9775",
        "kuo": "\u59e1\u5ed3\u5f4d\u6269\u62e1\u62ec\u6304\u64c3\u64f4\u681d\u6870\u6f37\u6ff6\u7c57\u86de\u9002\u9069\u95ca\u9614\u9729\u979f\u97b9",
        "rao": "\u5a06\u5b08\u6270\u64fe\u6861\u6a48\u7e5e\u7ed5\u82da\u835b\u8558\u87ef\u8953\u9076\u96a2\u9952\u9976",
        "niang": "\u5a18\u5b22\u5b43\u917f\u91b8\u91c0",
        "rou": "\u5a83\u5b8d\u63c9\u67d4\u697a\u6c91\u6e18\u7163\u7448\u74c7\u79b8\u7c88\u7cc5\u8089\u816c\u8447\u875a\u8e42\u8f2e\u9352\u9355\u97a3\u97d6\u9a25\u9c07\u9d94",
        "niao": "\u5acb\u5ad0\u5b1d\u5b32\u5c3f\u6a22\u6eba\u8132\u8311\u8526\u8885\u88ca\u892d\u9ce5\u9e1f",
        "nen": "\u5ae9\u5af0\u6041\u9ec1",
        "sun": "\u5b59\u5b6b\u613b\u635f\u640d\u640e\u69ab\u69c2\u6f60\u72f2\u733b\u7b0b\u7b4d\u7bb0\u7c28\u836a\u84c0\u8575\u859e\u93a8\u96bc\u98e7\u98f1",
        "kuan": "\u5bbd\u5bdb\u5bec\u68a1\u6b35\u6b3e\u6b40\u7abe\u81d7\u9acb\u9ad6",
        "shui": "\u5e28\u6c34\u6c35\u6c3a\u6d97\u6d9a\u7761\u7793\u7971\u7a05\u7a0e\u813d\u86fb\u88de\u8aaa\u8aac\u8ab0\u8bf4\u8c01",
        "sen": "\u5e53\u66d1\u68ee\u692e\u69ee\u7a7c\u7bf8\u7f67\u8518\u8942",
        "hen": "\u5f88\u6068\u62eb\u72e0\u75d5\u8a6a\u978e",
        "te": "\u5fd1\u5fd2\u615d\u7279\u86ae\u87a3\u87d8\u8ca3\u92f1\u94fd\u9d0f",
        "tei": "\u5fd2",
        "zen": "\u600e\u8b56\u8b5b\u8c2e",
        "zhua": "\u6293\u631d\u64be\u6a9b\u722a\u83b4\u9afd",
        "shuan": "\u62f4\u6813\u6dae\u8168\u9582\u95e9",
        "gun": "\u638d\u68cd\u6eda\u6efe\u74ad\u7774\u78d9\u7dc4\u7ef2\u84d8\u8509\u886e\u889e\u88e9\u8f25\u8f8a\u9b8c\u9bc0\u9ca7",
        "shai": "\u6652\u66ec\u6bba\u7b5b\u7be9\u7c1b\u7c6d\u7e7a\u8272\u917e\u95b7\u9ab0",
        "run": "\u6a4d\u6da6\u6f64\u7289\u77a4\u81b6\u958f\u95a0\u95f0",
        "e^|e": "\u6b38\u8a92\u8bf6",
        "nu:e|nve": "\u759f\u7627\u8650\u8b14",
        "nue": "\u759f\u7627\u8650\u8b14",
        "gei": "\u7d66\u7ed9",
        "shei": "\u8ab0\u8c01",
        "ei": "\u8bf6",
        "zei": "\u8cca\u8d3c\u9c61\u9c97",
        "zhei": "\u8fd9\u9019",
        "lue": "\u941a",
        "eng": "\u97a5",
        "yiao": "\u9d01",
        "qui": "\u9f3d",
        ",":"\uff0c\u3001",
        ".":"\u3002\uff0e?\uff1f!\uff01",
        ";":"\uff1b",
        " ":"\u3000 \t\r\n"
    };
    var PY = {};
    var PinYin = {};
    for (var k in source) {
        var v = source[k];
        Array.prototype.forEach.apply(v, [function (char) {
                if (PY[char]) {
                    PY[char] = PY[char] + "|" + k[0];
                } else {
                    PY[char] = k[0];
                }
                if (PinYin[char]) {
                    PinYin[char] = PinYin[char] + "|" + k;
                } else {
                    PinYin[char] = k;
                }
            }]);
    }
    var py = function (char) {
        return PY[char] || (char || "").toLowerCase();
    };
    var pinyin = function (char) {
        return PinYin[char] || (char || "").toLowerCase();
    };

    this.parsePinyin = function (string) {
        return string && Array.prototype.slice.apply(string).map(pinyin).join("");
    };
    this.parsePy = function (string) {
        return string && Array.prototype.slice.apply(string).map(py).join("");
    };
    this.py = py;
    this.pinyin = pinyin;

});

/**
 * \u5e38\u51fa\u7684\u6b63\u5219\u8868\u8fbe\u5f0f
 */


yjkj.service('regexp', function () {
    return {
        /**
         * ng-options\u7684\u6b63\u5219\u8868\u8fbe\u5f0f
         */
        NG_OPTIONS_REGEXP: /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
        // 1: value expression (valueFn)
        // 2: label expression (displayFn)
        // 3: group by expression (groupByFn)
        // 4: disable when expression (disableWhenFn)
        // 5: array item variable name
        // 6: object item key variable name
        // 7: object item value variable name
        // 8: collection expression
        // 9: track by expression
        NG_GRID_REGEXP: /^\s*(\{\s*[\s\S]+})\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)$/,
        // 1: labelValueObject
        // 2: array item variable name
        // 3: object item key variable name
        // 4: object item value variable name
        // 5: collection expression
        NG_GRID: /^\s*(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)$/,
        // 1: array item variable name
        // 2: object item key variable name
        // 3: object item value variable name
        // 4: collection expression
        
        NG_NUMBER_REGEXP:/^([1-9]\d*|0)(\.?)(\d*)$/,
        //1: integer part of the number
        //2: decimal
        //3: digital part of the number
    };
});
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.service('style',function(){
    return {
        main:"#4385F5"
    };
});
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.service('user', ["storage", "$location", "$timeout", function (storage, $location, $timeout) {
    var prefix_user = '/x6pt/';
    var user_prefix = 'x6pt_user:';
    var _user = {};
    var logoutTime = 0;
    var user = function (data) {
        if (arguments.length) {
            var type = typeof data;
            if (data && type === "object") {
                login(data);
            } else if (type === "number") {
                timeout(data);
            } else {
                logout();
            }
        }
        return _user;
    };
    logout = function () {
        for (var k in _user) {
            delete _user[k];
        }
        save();
    };
    login = function (user_data) {
        if (user_data !== _user) {
            logout();
        }
        if (!user_data.id) {
            user_data.id = user_data.user_id;
        }
        if (!user_data.id) {
            throw "the user you login with has no id";
        }
        $location.path(prefix_user + user_data.id).replace();
        for (var k in user_data) {
            _user[k] = user_data[k];
        }
        save();
        user.onlogin&&user.onlogin();
    };
    timeout = function (timeout) {
        _user.timeout = Date.now() + timeout;
        save();
        clearTimeout(logoutTime);
        logoutTime = $timeout(function(){
            user.logout();
        }, timeout);
    };
    save = function () {
        var path = $location.path();
        var id = path && path.slice(prefix_user.length);
        id && storage.set(user_prefix + id, _user);
    };
    load = function () {
        var path = $location.path();
        var id = path && path.slice(prefix_user.length);
        if (id) {
            var tmp = storage.get(user_prefix + id);
            if (_user.timeout - 6000 < Date.now()) {
                logout();
            } else {
                tmp.id === id && login(tmp);
            }
        }
    };
    isLogin = function () {
        return _user.id;
    };
    load();
    _user.timeout&&timeout(_user.timeout-Date.now());
    angular.extend(user, {
        login: login,
        logout: logout,
        isLogin: isLogin,
        timeout: timeout,
        save: save,
        load: load
    });
    return user;
}]);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.service('views', function () {
    var _views = [];
    window.views = _views;
    return _views;
});
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


yjkj.service("zIndex",function(){
    var count=0x10000000;//\u5f39\u51fa\u5f0f\u83dc\u5355\u6216\u7a97\u53e3\u7684zIndex\u8d77\u70b9
    return function(){
        return count++;
    };
});