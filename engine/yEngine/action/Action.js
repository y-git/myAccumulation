/**YEngine2D 动作基类
 * 作者：YYC
 * 日期：2014-01-11
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
(function () {
    namespace("YE").Action = YYC.AClass(YE.Entity, {
        Init: function () {
            this.base();
        },
        Private: {
            ye_target: null,
            ye_isFinish: false
        },
        Public: {
            setTarget: function (target) {
                this.ye_target = target;
            },
            getTarget: function () {
                return this.ye_target;
            },
            isStart: function () {
                return !this.isStop();
            },
            isFinish: function () {
                return this.ye_isFinish;
            },
            reset: function () {
                this.ye_isFinish = false;
            },
            finish: function () {
                this.ye_isFinish = true;
                this.stop();
            },
            // （既可以在构造函数中，也可以在initWhenCreate中传入实例的初始参数）
            // 构造函数负责创建组合关系的实例
            // initWhenCreate负责创建实例后紧密相关的初始化，实质就是将构造函数中的初始化工作放到该方法中，这样方便测试
            // init负责初始化工作。通常在使用实例之前，会调用实例的init方法。因此，在init中能访问到更多的实例的属性，而在initWhenCreate中却不能访问到有些属性
            // （如Action的initWhenCreate不能访问到ye_target，而在init中可以访问到）
            initWhenCreate: function () {
            },
            Virtual: {
                init: function () {
                },

                //*自定义动作的钩子

                onenter: function () {
                },
                onexit: function () {
                }
            }
        },
        Abstract: {
            update: function (time) {
            },
            copy: function () {
            },
            start: function () {
            },
            stop: function () {
            },
            isStop: function () {
            },
            reverse: function () {
            }
        }
    });
}());