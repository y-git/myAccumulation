/**YEngine2D
 * 作者：YYC
 * 日期：2014-04-20
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
(function () {
    namespace("YE").CollectionManager = YYC.AClass(YE.Entity, {
        Init: function () {
            this.ye_P_childs = YE.Collection.create();
        },
        Private: {
        },
        Protected: {
            ye_P_childs: null
        },
        Public: {
            getCount: function () {
                return this.ye_P_childs.getCount();
            },
            addChild: function (child, target) {
                if (this.hasChild(child)) {
                    return YE.returnForTest;
                }
                child.setTarget(target);
                this.ye_P_childs.addChild(child);
                child.init();
                child.onenter();
            },
            remove: function (child) {
                child.onexit();

                this.ye_P_childs.remove(function (e) {
                    return child.getUid() === e.getUid();
                });
            },
            removeAll: function () {
                this.ye_P_childs.iterator("onexit");

                this.ye_P_childs.removeAll();
            },
            hasChild: function (child) {
                return this.ye_P_childs.hasChild(child);
            },
            getChilds: function () {
                return this.ye_P_childs.getChilds();
            },

            //*供测试
            forTest_addChild: function (child) {
                this.ye_P_childs.addChild(child);
            }
        }
    });
}());