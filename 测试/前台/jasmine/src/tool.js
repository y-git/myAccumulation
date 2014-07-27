/*
 测试辅助工具
 01-24
 */

var testTool = (function () {
    var isString = function (str) {
        return Object.prototype.toString.call(str) === "[object String]";
    };

    return {
        bind: function (object, fun) {
            return function () {
                return fun.apply(object, arguments);
            };
        },
        /*
         注意bindWithArguments与bind的区别！它们传的参数不一样！

         示例：

         var func = bind(this, A);
         func("a");  //将func的参数"a"传入A

         var func = bindWithArguments(this, A, "b");
         func(); //将"b"传入A
         */
        bindWithArguments: function (object, fun, args) {
            var _args = null;
            var self = this;

            _args = Array.prototype.slice.call(arguments, 2);

            return function () {
                return fun.apply(object, _args);
            }
        },
        jqueryToString: function (jq) {
            var d = $("<div>");

            d.html(jq);

            return d.html();
        },
        extend: function (destination, source) {
            for (var property in source) {
                destination[property] = source[property];
            }
            return destination;
        },
        extendDeep: function (parent, child) {
            var i,
                toStr = Object.prototype.toString,
                sArr = "[object Array]",
                sOb = "[object Object]",
                type = "",
                child = null;

            if (toStr.call(parent) === sArr) {
                child = child || [];
            }
            else if (toStr.call(parent) === sOb) {
                child = child || {};
            }
            else {
                child = child;
            }


            for (i in parent) {
                type = toStr.call(parent[i]);
                if (type === sArr || type === sOb) {    //如果为数组或object对象
                    child[i] = type === sArr ? [] : {};
                    this.extendDeep(parent[i], child[i]);
                } else {
                    child[i] = parent[i];
                }
            }
            return child;
        },
        deleteMember: function (obj, member) {
            //因为ie下使用delete有bug，所以用指定为undefined来代替：
            //ie中（如ie8）使用delete删除全局属性（如“window.foo = 1;”中的foo），
            //会抛出错误：“对象不支持此操作”！
//            attr = undefined;
            delete obj[member];
        },
        //将obj[funcName]替换为空函数并监视，从而达到不执行该函数的目的。
        toBeEmptyFuncAndSpy: function (obj, funcName) {
            if (!isString(funcName)) {
                throw new Error("第二个参数必须为函数名");
            }

            spyOn(obj, funcName).andCallFake(function () {
            });
        },
        //异步执行func（其它异步（如预加载图片成功后调用onload测试、ajax回调测试等））
        asynRun: function (func, time) {
            var flag = false,
                timer = 0;

            runs(function () {
                timer = setTimeout(function () {
                    flag = true;
                }, time);
            });

            waitsFor(function () {
                return flag;
            }, "在指定时间内未执行", time + 500);

            runs(function () {
                clearTimeout(timer);
                func();
            });
        },
        /**
         * 创建一个类，它有一个名为funcName的方法，该方法被Spy并设置返回值为returnValue
         * 示例：
         * var fakeAnimate = testTool.spyReturn("getCurrentFrame", frame);
         * testTool.spyReturn(fakeAnimate, "getCurrentFrame", frame);
         * @param funcName
         * @param returnValue
         * @returns {{}}
         */
        spyReturn: function (funcName, returnValue) {
            var obj = null,
                _funcName = null,
                _returnValue = null;

            if (arguments.length === 2) {
                obj = {
                };
                _funcName = arguments[0];
                _returnValue = arguments[1];
            }
            else if (arguments.length === 3) {
                obj = arguments[0];
                _funcName = arguments[1];
                _returnValue = arguments[2];
            }

            obj[_funcName] = function () {
            };

            spyOn(obj, _funcName).andReturn(_returnValue);

            return obj;
        },
        /**
         * 创建一个被spy的object实例
         * @param originalMethods 初始被spy的方法
         * @param methods 增加的被spy的方法
         * @returns {*}
         */
        buildFakeObj: function (originalMethods, methods) {
            var obj = jasmine.createSpyObj("", originalMethods);

            methods && methods.forEach && methods.forEach(function (method) {
                obj[method] = jasmine.createSpy();
            });

            return obj;
        },
        judgeSingleInstance: function (_Class) {
            it("获得单例实例", function () {
                var obj1 = _Class.getInstance();
                obj1.a = 2;

                var obj2 = _Class.getInstance();

                expect(obj2.a).toEqual(2);
            });
        }
    }
}());