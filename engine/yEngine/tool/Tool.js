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
         * 创建命名空间。
         示例：
         namespace("YYC.Tool.Button");
         */
        var global = {
            namespace: function (str) {
                var parent = window,
                    parts = str.split('.'),
                    i = 0,
                    len = 0;

                if (str.length == 0) {
                    YE.error(true, "命名空间不能为空");
                }

                for (i = 0, len = parts.length; i < len; i++) {
                    if (typeof parent[parts[i]] === "undefined") {
                        parent[parts[i]] = {};
                    }
                    parent = parent[parts[i]];  //递归增加命名空间
                }

                return parent;
            },
            /**
             * 生成命名空间,并执行func

             示例：
             register("YYC.Test.t", function () {
	                    YYC.Test.t = {
	                        a: 100
	                    };
                });
             */
            register: function (str, func) {
                var parent = window,
                    parts = str.split('.'),
                    i = 0,
                    len = 0;

                if (str.length == 0) {
                    YE.error(true, "命名空间不能为空");
                }

                for (i = 0, len = parts.length; i < len; i++) {
                    if (typeof parent[parts[i]] === "undefined") {
                        parent[parts[i]] = {};
                    }
                    parent = parent[parts[i]];  //递归增加命名空间
                }

                if (func) {
                    func.call(parent, this);
                }

                return parent;
            }
        };

        extend(window, global);

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
    namespace("YE").Tool = YYC.Tool;

    //* debug
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
            if (YE.Config.DEBUG) {
                if (!YE.Config.IS_SHOW_DEBUG_ON_PAGE) {
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
            if (YE.Config.DEBUG) {
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
