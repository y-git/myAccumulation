/**YEngine2D 控制动作基类
 * 作者：YYC
 * 日期：2014-04-23
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
namespace("YE").Control = YYC.AClass(YE.ActionInterval, {
    Init: function () {
        this.base();
    },
    Private: {
        ye___iterator: function (method, arg) {
            var actions = this.getInnerActions();

            if (actions.forEach) {
                actions.forEach(function (action) {
                    action[method](arg);
                })
            }
            else {
                actions.iterator(method, arg);
            }
        }
    },
    Public: {
        init: function () {
            this.ye___iterator("init");
        },
        onenter: function () {
            this.ye___iterator("onenter");
        },
        onexit: function () {
            this.ye___iterator("onexit");
        },
        setTarget: function (target) {
            this.base(target);

            this.ye___iterator("setTarget", target);
        },
        start: function () {
            this.base();

            this.getCurrentAction().start();
        },
        reverse: function () {
            this.ye___iterator("reverse");

            return this;
        },
        stop: function () {
            this.base();

            this.getCurrentAction().stop();
        },
        reset: function () {
            this.base();

//            this.ye___times = this.ye___originTimes;

            this.ye___iterator("reset");
        }

//        //*供测试
//
//        forTest_getAction: function () {
//            return this.ye___innerAction;
//        },
//        forTest_init: function (action, times) {
//            this.ye___innerAction = action;
//            this.ye___times = times;
//            this.ye___originTimes = times;
//        }
    },
    Abstract: {
        getInnerActions: function () {
        },
        getCurrentAction: function () {
        }
    }
//    Static: {
//        create: function (action, times) {
//            var repeat = new YE.Repeat(action.copy(), times);
//
//            return repeat;
//        }
//    }
});