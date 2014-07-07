/**YEngine2D 动作管理类
 * 作者：YYC
 * 日期：2014-01-11
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
(function () {
    namespace("YE").ActionManager = YYC.Class(YE.CollectionManager, {
        Init: function () {
            this.base();
        },
        Public: {
            update: function () {
                var self = this,
                    removeQueue = [];

                this.ye_P_childs.iterator(function (action, time) {
                    if (action.isFinish()) {
                        removeQueue.push(action);
                        return;
                    }
                    if (action.isStop()) {
                        return;
                    }

                    action.update(time);
                }, 1 / YE.Director.getInstance().getFps());

                removeQueue.forEach(function (action) {
                    self.remove(action);
                });
            }
        },
        Static: {
            create: function () {
                return new YE.ActionManager();
            }
        }
    });
}());