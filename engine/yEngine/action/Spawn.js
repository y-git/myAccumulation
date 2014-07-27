/**YEngine2D 并列动作类
 * 作者：YYC
 * 日期：2014-01-22
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
namespace("YE").Spawn = YYC.Class(YE.ActionInterval, {
    Init: function () {
        this.base();
    },
    Private: {
        ye___actions: null,
        ye___one: null,
        ye___two: null,

        ye___iterator: function (method, arg) {
            this.ye___one.forEach(function (action, i) {
                action[method](arg);
            });
            this.ye___two[method](arg);
        }
    },
    Public: {
        initWhenCreate: function (actionArr) {
//            this.ye___actions = YE.Collection.create().addChilds(actionArr);

//            this.ye___currentAction = this.ye___actions.getChildAt(0);
            this.ye___actions = actionArr;
            this.ye___two = this.ye___actions[this.ye___actions.length - 1];
            this.ye___one = this.ye___actions.slice(0, this.ye___actions - 1);
        },
        onenter: function () {
            this.ye___iterator("onenter");
        },
        onexit: function () {
            this.ye___iterator("onexit");
        },
        update: function (time) {
//            if (this.isStop()) {
//                return;
//            }
////
////            if (this.ye___one) {
//            this.ye___one.forEach(function (action, i) {
//                action.update(time);
//            });
////            }
////            if (this.ye___two) {
//            this.ye___two.update(time);
////            }

            this.ye___iterator("update", time);
        },
//        getTarget: function () {
//            var target_one = [];
//
//            this.ye___one.forEach(function (action) {
//                target_one.push(action.getTarget());
//            });
//
//            target_one.push(this.ye___two.getTarget());
//
//            return target_one;
//        },
        setTarget: function (target) {
            this.base(target);

            this.ye___iterator("setTarget", target);
        },
        start: function () {
            this.base();

            this.ye___iterator("start");
        },
        copy: function () {
            var spawn = this.forTest_getInstance(YYC.Tool.extend.extendDeep(this.ye___one.concat([this.ye___two])));

            return spawn;
        },
        reverse: function () {
            this.ye___iterator("reverse");

            return this;
        },
        stop: function () {
            this.base();

            this.ye___iterator("stop");
        },

        //*用于测试

        forTest_getOne: function () {
            return this.ye___one;
        },
        forTest_getTwo: function () {
            return this.ye___two;
        },
        forTest_init: function (actions) {
            this.ye___actions = actions;
            this.ye___two = this.ye___actions.pop();
            this.ye___one = this.ye___actions;
        },
        forTest_getInstance: function (actionArr) {
            return new YE.Spawn(actionArr);
        }
    },
    Static: {
        create: function (actions) {
            YE.assert(arguments.length >= 2, "应该有2个及以上动作");

            var actionArr = Array.prototype.slice.call(arguments, 0);
            var spawn = new YE.Spawn();
            spawn.initWhenCreate(actionArr);

            return spawn;
        }
    }
});
//
//
///** Spawn a new action immediately
// * @class
// * @extends cc.ActionInterval
// */
//cc.Spawn = cc.ActionInterval.extend(/** @lends cc.Spawn# */{
//    /** initializes the Spawn action with the 2 actions to spawn
//     * @param {cc.FiniteTimeAction} action1
//     * @param {cc.FiniteTimeAction} action2
//     * @return {Boolean}
//     */
//    initOneTwo: function (action1, action2) {
//        cc.Assert(action1 != null, "no action1");
//        cc.Assert(action2 != null, "no action2");
//
//        var ret = false;
//
//        var d1 = action1.getDuration();
//        var d2 = action2.getDuration();
//
//        if (this.initWithDuration(Math.max(d1, d2))) {
//            this.ye_one = action1;
//            this.ye_two = action2;
//
//            if (d1 > d2) {
//                this.ye_two = cc.Spawn.ye_actionOneTwo(action2, cc.DelayTime.create(d1 - d2));
//            } else if (d1 < d2) {
//                this.ye_one = cc.Spawn.ye_actionOneTwo(action1, cc.DelayTime.create(d2 - d1));
//            }
//
//            ret = true;
//        }
//        return ret;
//    },
//
//    /**
//     * @param {cc.Node} target
//     */
//    startWithTarget: function (target) {
//        cc.ActionInterval.prototype.startWithTarget.call(this, target);
//        this.ye_one.startWithTarget(target);
//        this.ye_two.startWithTarget(target);
//    },
//
//    /**
//     * Stop the action
//     */
//    stop: function () {
//        this.ye_one.stop();
//        this.ye_two.stop();
//        cc.Action.prototype.stop.call(this);
//    },
//
//    /**
//     * @param {Number} time time in seconds
//     */
//    update: function (time) {
//        if (this.ye_one) {
//            this.ye_one.update(time);
//        }
//        if (this.ye_two) {
//            this.ye_two.update(time);
//        }
//    },
//
//    /**
//     * @return {cc.FiniteTimeAction}
//     */
//    reverse: function () {
//        return cc.Spawn.ye_actionOneTwo(this.ye_one.reverse(), this.ye_two.reverse());
//    },
//    ye_one: null,
//    ye_two: null
//});
//
///**
// * @param {Array|cc.FiniteTimeAction}tempArray
// * @return {cc.FiniteTimeAction}
// * @example
// * // example
// * var action = cc.Spawn.create(cc.JumpBy.create(2, cc.p(300, 0), 50, 4), cc.RotateBy.create(2, 720));
// */
//cc.Spawn.create = function (/*Multiple Arguments*/tempArray) {
//    var paramArray = (tempArray instanceof Array) ? tempArray : arguments;
//    var prev = paramArray[0];
//    for (var i = 1; i < paramArray.length; i++) {
//        if (paramArray[i] != null) {
//            prev = this.ye_actionOneTwo(prev, paramArray[i]);
//        }
//    }
//    return prev;
//};
//
///**
// * @param {cc.FiniteTimeAction} action1
// * @param {cc.FiniteTimeAction} action2
// * @return {cc.Spawn}
// * @private
// */
//cc.Spawn.ye_actionOneTwo = function (action1, action2) {
//    var pSpawn = new cc.Spawn();
//    pSpawn.initOneTwo(action1, action2);
//
//    return pSpawn;
//};