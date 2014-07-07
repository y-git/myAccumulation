/**YEngine2D 条件重复类
 * 作者：YYC
 * 日期：2014-04-25
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
namespace("YE").RepeatCondition = YYC.Class(YE.Control, {
    Init: function () {
        this.base();
    },
    Private: {
        ye____innerAction: null,
        ye____context: null,
        ye____conditionFunc: null
    },
    Public: {
        initWhenCreate: function (action, context, conditionFunc) {
            this.ye____innerAction = action;
            this.ye____context = context;
            this.ye____conditionFunc = conditionFunc;
        },
        update: function (time) {
            if (!!this.ye____conditionFunc.call(this.ye____context) === false || this.ye____innerAction.isFinish()) {
                this.finish();
                return;
            }

            this.ye____innerAction.update(time);
        },
        copy: function () {
            var action = YE.RepeatCondition.create(this.ye____innerAction.copy(), this.ye____context, this.ye____conditionFunc);

            return action;
        },
        getInnerActions: function () {
            return [this.ye____innerAction];
        },
        getCurrentAction: function () {
            return this.ye____innerAction;
        },

//        //*供测试
//
        forTest_getAction: function () {
            return this.ye____innerAction;
        },
        forTest_setAction: function (action) {
            this.ye____innerAction =  action;
        },
        forTest_init: function (action, context, conditionFunc) {
            this.ye____innerAction = action;
            this.ye____context = context;
            this.ye____conditionFunc = conditionFunc;
        }
    },
    Static: {
        create: function (action, context, conditionFunc) {
            var repeat = new YE.RepeatCondition();

            YE.error(!conditionFunc, "必须传入重复条件");

            repeat.initWhenCreate(action, context, conditionFunc);

            return repeat;
        }
    }
});