/**YEngine2D 辅助工具Tool
 * 作者：YYC
 * 日期：2013-12-21
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
(function () {
    var extend = function (destination, source) {
        var property = "";

        for (property in source) {
            destination[property] = source[property];
        }
        return destination;
    };

    //*全局方法
    (function () {
        /**
         * 来自《HTML5 Canvas 核心技术》
         * 不能写到global中，否则会报错“illegal invocation”！
         */
        window.requestNextAnimationFrame = (function () {
            var originalRequestAnimationFrame = undefined,
                wrapper = undefined,
                callback = undefined,
                geckoVersion = 0,
                userAgent = navigator.userAgent,
                index = 0,
                self = this;

            wrapper = function (time) {
                time = +new Date();
                self.callback(time);
            };

            // Workaround for Chrome 10 bug where Chrome
            // does not pass the time to the animation function

            if (window.webkitRequestAnimationFrame) {
                // Define the wrapper

                // Make the switch

                originalRequestAnimationFrame = window.webkitRequestAnimationFrame;

                window.webkitRequestAnimationFrame = function (callback, element) {
                    self.callback = callback;

                    // Browser calls the wrapper and wrapper calls the callback

                    return originalRequestAnimationFrame(wrapper, element);
                }
            }

            //修改time参数
            if (window.msRequestAnimationFrame) {
                originalRequestAnimationFrame = window.msRequestAnimationFrame;

                window.msRequestAnimationFrame = function (callback) {
                    self.callback = callback;

                    return originalRequestAnimationFrame(wrapper);
                }
            }

            // Workaround for Gecko 2.0, which has a bug in
            // mozRequestAnimationFrame() that restricts animations
            // to 30-40 fps.

            if (window.mozRequestAnimationFrame) {
                // Check the Gecko version. Gecko is used by browsers
                // other than Firefox. Gecko 2.0 corresponds to
                // Firefox 4.0.

                index = userAgent.indexOf('rv:');

                if (userAgent.indexOf('Gecko') != -1) {
                    geckoVersion = userAgent.substr(index + 3, 3);

                    if (geckoVersion === '2.0') {
                        // Forces the return statement to fall through
                        // to the setTimeout() function.

                        window.mozRequestAnimationFrame = undefined;
                    }
                }
            }

//            return  window.requestAnimationFrame ||  //传递给callback的time不是从1970年1月1日到当前所经过的毫秒数！
            return window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||

                function (callback, element) {
                    var start,
                        finish;

                    window.setTimeout(function () {
                        start = +new Date();
                        callback(start);
                        finish = +new Date();

                        self.timeout = 1000 / 60 - (finish - start);

                    }, self.timeout);
                };
        }());

        window.cancelNextRequestAnimationFrame = window.cancelRequestAnimationFrame
            || window.webkitCancelAnimationFrame
            || window.webkitCancelRequestAnimationFrame
            || window.mozCancelRequestAnimationFrame
            || window.oCancelRequestAnimationFrame
            || window.msCancelRequestAnimationFrame
            || clearTimeout;
    }());

    //*工具类
    (function(){
        var Tool = {};

        /**
         * 继承
         */
        Tool.extend = (function () {
            return {
                /**
                 * 浅拷贝
                 */
                extend: function (destination, source) {
                    var property = "";

                    for (property in source) {
                        destination[property] = source[property];
                    }
                    return destination;
                },
                extendExist: function (destination, source) {
                    var property = "";

                    for (property in source) {
                        if (destination[property] !== undefined) {    //destination中没有的属性不拷贝
                            destination[property] = source[property];
                        }
                    }
                    return destination;
                },
                extendNoExist: function (destination, source) {
                    var property = "";

                    for (property in source) {
                        if (destination[property] === undefined) {
                            destination[property] = source[property];
                        }
                    }
                    return destination;
                },
                /**
                 * 浅拷贝(不包括source的原型链)
                 */
                extendNoPrototype: function (destination, source) {
                    //            var temp = {};
                    var property = "";

                    for (property in source) {
                        if (source.hasOwnProperty(property)) {
                            destination[property] = source[property];
                        }
                    }
                    return destination;
                },
                /**
                 * 深拷贝
                 *
                 * 示例：
                 * 如果拷贝对象为数组，能够成功拷贝（不拷贝Array原型链上的成员）
                 * expect(extend.extendDeep([1, { x: 1, y: 1 }, "a", { x: 2 }, [2]])).toEqual([1, { x: 1, y: 1 }, "a", { x: 2 }, [2]]);
                 *
                 * 如果拷贝对象为对象，能够成功拷贝（能拷贝原型链上的成员）
                 * var result = null;
                 function A() {
	            };
                 A.prototype.a = 1;

                 function B() {
	            };
                 B.prototype = new A();
                 B.prototype.b = { x: 1, y: 1 };
                 B.prototype.c = [{ x: 1 }, [2]];

                 var t = new B();

                 result = extend.extendDeep(t);

                 expect(result).toEqual(
                 {
                     a: 1,
                     b: { x: 1, y: 1 },
                     c: [{ x: 1 }, [2]]
                 });
                 * @param parent
                 * @param child
                 * @returns
                 */
                extendDeep: function (parent, child) {
                    var i = null,
                        len = 0,
                        toStr = Object.prototype.toString,
                        sArr = "[object Array]",
                        sOb = "[object Object]",
                        type = "",
                        _child = null;

                    //数组的话，不获得Array原型上的成员。
                    if (toStr.call(parent) === sArr) {
                        _child = child || [];

                        for (i = 0, len = parent.length; i < len; i++) {
                            type = toStr.call(parent[i]);
                            if (type === sArr || type === sOb) {    //如果为数组或object对象
                                _child[i] = type === sArr ? [] : {};
                                arguments.callee(parent[i], _child[i]);
                            } else {
                                _child[i] = parent[i];
                            }
                        }
                    }
                    //对象的话，要获得原型链上的成员。因为考虑以下情景：
                    //类A继承于类B，现在想要拷贝类A的实例a的成员（包括从类B继承来的成员），那么就需要获得原型链上的成员。
                    else if (toStr.call(parent) === sOb) {
                        _child = child || {};

                        for (i in parent) {
                            type = toStr.call(parent[i]);
                            if (type === sArr || type === sOb) {    //如果为数组或object对象
                                _child[i] = type === sArr ? [] : {};
                                arguments.callee(parent[i], _child[i]);
                            } else {
                                _child[i] = parent[i];
                            }
                        }
                    }
                    else {
                        _child = parent;
                    }

                    return _child;
                }
            }
        }());

        /**
         * 判断类型
         */
        Tool.judge = (function () {
            return {
                /**
                 * 判断浏览器类型
                 */
                browser: {
                    //ie: +[1, ],   //有问题！在ie下“+[1, ]”居然为false！！！！？？？
                    isIE: function () {
                        return !!(document.all && navigator.userAgent.indexOf('Opera') === -1);
                    },
                    //不能用===，因为navigator.appVersion.match(/MSIE\s\d/i)为object类型，不是string类型
                    isIE7: function () {
                        return navigator.appVersion.match(/MSIE\s\d/i) == "MSIE 7";
                    },
                    isIE8: function () {
                        return navigator.appVersion.match(/MSIE\s\d/i) == "MSIE 8";
                    },
                    isIE9: function () {
                        return navigator.appVersion.match(/MSIE\s\d/i) == "MSIE 9";
                    },
                    isFF: function () {
                        return navigator.userAgent.indexOf("Firefox") >= 0 && true;
                    },
                    isOpera: function () {
                        return  navigator.userAgent.indexOf("Opera") >= 0 && true;
                    },
                    isChrome: function () {
                        return navigator.userAgent.indexOf("Chrome") >= 0 && true;
                    }
                },
                /**
                 * 判断是否为jQuery对象
                 */
                isjQuery: function (ob) {
                    if (!window.jQuery) {
                        return false;
                    }

                    return ob instanceof window.jQuery;
                },
                isFunction: function (func) {
                    return Object.prototype.toString.call(func) === "[object Function]";
                },
                isArray: function (val) {
                    return Object.prototype.toString.call(val) === "[object Array]";
                },
                isDate: function (val) {
                    return Object.prototype.toString.call(val) === "[object Date]";
                },
                isString: function (str) {
                    return Object.prototype.toString.call(str) === "[object String]";
                },
                /**
                 * 检测对象是否是空对象(不包含任何可读属性)。
                 * 方法只检测对象本身的属性，不检测从原型继承的属性。
                 */
                isOwnEmptyObject: function (obj) {
                    var name = "";

                    for (name in obj) {
                        if (obj.hasOwnProperty(name)) {
                            return false;
                        }
                    }
                    return true;
                },
                /**
                 * 检测对象是否是空对象(不包含任何可读属性)。
                 * 方法既检测对象本身的属性，也检测从原型继承的属性(因此没有使hasOwnProperty)。
                 */
                isEmptyObject: function (obj) {
                    var name = "";

                    for (name in obj) {
                        return false;
                    }
                    return true;
                },
                /**
                 * 判断是否为奇数
                 * @param num
                 * @returns
                 */
                isOdd: function (num) {
                    return num % 2 !== 0;
                },
                /**
                 * 判断是否为对象字面量（{}）
                 */
                isDirectObject: function (obj) {
                    if (Object.prototype.toString.call(obj) === "[object Object]") {
                        return true;
                    }

                    return false;
                },
                isHTMLImg: function (img) {
                    return Object.prototype.toString.call(img) === "[object HTMLImageElement]";
                },
                isDom: function (obj) {
                    return obj instanceof HTMLElement;
                },
                isNumber: function (obj) {
                    return Object.prototype.toString.call(obj) === "[object Number]";
                },
                isBool: function (obj) {
                    return Object.prototype.toString.call(obj) === "[object Boolean]";
                },
                /**
                 * 检查宿主对象是否可调用
                 *
                 * 任何对象，如果其语义在ECMAScript规范中被定义过，那么它被称为原生对象；
                 环境所提供的，而在ECMAScript规范中没有被描述的对象，我们称之为宿主对象。

                 该方法用于特性检测，判断对象是否可用。用法如下：

                 MyEngine addEvent():
                 if (Tool.judge.isHostMethod(dom, "addEventListener")) {    //判断dom是否具有addEventListener方法
            dom.addEventListener(sEventType, fnHandler, false);
            }
                 */
                isHostMethod: (function () {
                    function isHostMethod(object, property) {
                        var type = typeof object[property];

                        return type === "function" ||
                            (type === "object" && !!object[property]) ||
                            type === "unknown";
                    };

                    return isHostMethod;
                }()),
                /**
                 判断一个元素是否为另一个元素的子元素
                 * @param children  被判断的元素。可以为dom或jquery对象
                 * @param parentSelector    父元素选择器。如“"#parent"”
                 * @returns

                    示例：
                 <div id="parent">
                 <span id="chi"></span>
                 <div>

                 isChildOf($("#chi"), "#parent");    //true
                 */
                isChildOf: function (children, parentSelector) {
                    return $(children).parents(parentSelector).length >= 1
                }
            }
        }() );

        /**
         * 异步操作
         */
        Tool.asyn = (function () {
            return {
                /**
                 * 清空"所有"的定时器
                 * @param index 其中一个定时器序号（不一定为第一个计时器序号）
                 */
                clearAllTimer: function (index) {
                    var i = 0,
                        num = 0,
                        timerNum = 250, //最大定时器个数
                        firstIndex = 0;

                    //获得最小的定时器序号
                    firstIndex = (index - timerNum >= 1) ? (index - timerNum) : 1;
                    num = firstIndex + timerNum * 2;    //循环次数

                    //以第一个计时器序号为起始值（计时器的序号会递加，但是ie下每次刷新浏览器后计时器序号会叠加，
                    //且最初的序号也不一定从1开始（可能比1大），也就是说ie下计时器序号的起始值可能很大；chrome和firefox计时器每次从1开始）
                    for (i = firstIndex; i < num; i++) {
                        window.clearTimeout(i);
                    }
                    //for (i = firstIndex.timer_firstIndex; i < num; i++) {
                    for (i = firstIndex; i < num; i++) {
                        window.clearInterval(i);
                    }
                }
            }
        }());

        namespace("YE").Tool = Tool;
    }());

    //* isDebug
    (function () {
        function _logToWebPage(message) {
            $("body").prepend($("<div style='color:red;font-size: 20;'>引擎调试信息：" + message + "</div>"));
        }


        YE.returnForTest = "YEngine2D_testReturn";

        /**
         * Output Debug message.
         * @function
         * @param {String} message
         */
        YE.log = function (message) {
            if (YE.main.getConfig().isDebug) {
                if (!YE.main.getConfig().isShowDebugOnPage) {
                    console.log && console.log(message);
                } else {
                    _logToWebPage(message);
                }
            }
        };

        /**
         * 断言失败时，会提示错误信息，但程序会继续执行下去
         * 使用断言捕捉不应该发生的非法情况。不要混淆非法情况与错误情况之间的区别，后者是必然存在的并且是一定要作出处理的。
         *
         * 1）对非预期错误使用断言
         断言中的布尔表达式的反面一定要描述一个非预期错误，下面所述的在一定情况下为非预期错误的一些例子：
         （1）空指针。
         （2）输入或者输出参数的值不在预期范围内。
         （3）数组的越界。
         非预期错误对应的就是预期错误，我们通常使用错误处理代码来处理预期错误，而使用断言处理非预期错误。在代码执行过程中，有些错误永远不应该发生，这样的错误是非预期错误。断言可以被看成是一种可执行的注释，你不能依赖它来让代码正常工作（《Code Complete 2》）。例如：
         int nRes = f(); // nRes 由 f 函数控制， f 函数保证返回值一定在 -100 ~ 100
         Assert(-100 <= nRes && nRes <= 100); // 断言，一个可执行的注释
         由于 f 函数保证了返回值处于 -100 ~ 100，那么如果出现了 nRes 不在这个范围的值时，就表明一个非预期错误的出现。后面会讲到“隔栏”，那时会对断言有更加深刻的理解。
         2）不要把需要执行的代码放入断言中
         断言用于软件的开发和维护，而通常不在发行版本中包含断言。
         需要执行的代码放入断言中是不正确的，因为在发行版本中，这些代码通常不会被执行，例如：
         Assert(f()); // f 函数通常在发行版本中不会被执行
         而使用如下方法则比较安全：
         res = f();
         Assert(res); // 安全
         3）对来源于内部系统的可靠的数据使用断言，而不要对外部不可靠的数据使用断言，对于外部不可靠数据，应该使用错误处理代码。
         再次强调，把断言看成可执行的注释。
         * @param cond 如果cond返回false，则断言失败，显示message
         * @param message
         */
        YE.assert = function (cond, message) {
            if (YE.main.getConfig().isDebug) {
                if (console.assert) {
                    console.assert(cond, message);
                }
                else {
                    if (!cond && message) {
                        if (console && console.log) {
                            console.log("断言：" + message);
                        }
                        else {
                            alert("断言：" + message);
                        }
                    }
                }
            }
        };

        /**
         * 如果发生错误，则抛出异常并终止程序
         * @param cond
         * @param message
         */
        YE.error = function (cond, message) {
            if (cond) {
                throw new Error(message);
            }
        };
    }());
}());
