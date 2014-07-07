/**YEngine2D 一直重复动作类
 * 作者：YYC
 * 日期：2014-01-19
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
namespace("YE").RepeatForever = YYC.Class({Interface: YE.IAnimationAction, Class: YE.Control}, {
    Init: function () {
        this.base();
    },
    Private: {
        ye___innerAction: null
    },
    Public: {
        initWhenCreate: function (action) {
            this.ye___innerAction = action;
        },
        update: function (time) {
            this.ye___innerAction.update(time);

            if (this.ye___innerAction.isFinish()) {
                this.ye___innerAction.reset();
            }
        },
        getCurrentFrame: function () {
            return this.ye___innerAction.getCurrentFrame();
        },
        isFinish: function () {
            return false;
        },
//        canClear: function () {
//            return true;
//        },
        copy: function () {
            var action = YE.RepeatForever.create(this.ye___innerAction.copy());

            return action;
        },
        getInnerActions: function () {
            return [this.ye___innerAction];
        },
        getCurrentAction: function () {
            return this.ye___innerAction;
        },

        //*供测试

        forTest_init: function (action) {
            this.ye___innerAction = action;
        }
    },
    Static: {
        create: function (action) {
            var repeat = new YE.RepeatForever();
            repeat.initWhenCreate(action);

            return repeat;
        }
    }
});
