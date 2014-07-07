/**YEngine2D 动画管理类
 * 作者：YYC
 * 日期：2014-02-27
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
namespace("YE").AnimationManager = YYC.Class(YE.CollectionManager, {
    Init: function () {
        this.base();
    },
    Public: {
        hasChild: function (child) {
            var animName = null;

            if (YE.Tool.judge.isString(arguments[0])) {
                animName = arguments[0];

                return this.ye_P_childs.hasChild(function (c) {
                    return c.hasTag(animName);
                });
            }

            return this.base(child);
        },
        update: function () {
            this.ye_P_childs.iterator(function (anim, time) {
                if (anim.isFinish() || anim.isStop()) {
                    return;
                }
                anim.update(time);
            }, 1 / YE.Director.getInstance().getFps());
        }
    },
    Static: {
        create: function () {
            return new YE.AnimationManager();
        }
    }
});
