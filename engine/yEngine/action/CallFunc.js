/**YEngine2D 调用方法类
 * 作者：YYC
 * 日期：2014-04-21
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
namespace("YE").CallFunc = YYC.Class(YE.Action, {
    Init: function (context, func, dataArr) {
        this.base();

        this.__context = context;
        this.__callFunc = func;
        this.__dataArr = dataArr;
    },
    Private: {
        __context: null,
        __callFunc: null,
        __dataArr: null
    },
    Public: {
        isStop: function () {
            return false;
        },
        start: function () {
        },
        stop: function () {
        },
        reverse: function () {
        },

        update: function (time) {
            if (this.__callFunc) {
                this.__callFunc.call(this.__context, this.getTarget(), this.__dataArr);
            }
            this.finish();
        },
        copy: function () {
            var dataArr = YE.Tool.extend.extendDeep(this.__dataArr);
            var action = new YE.CallFunc(this.__context, this.__callFunc, dataArr);

            return action;
        },

        forTest_getDataArr: function () {
            return this.__dataArr;
        }
    },
    Static: {
        create: function (context, func, args) {
            var dataArr = Array.prototype.slice.call(arguments, 2),
                action = new YE.CallFunc(context, func, dataArr);

            return action;
        }
    }
});