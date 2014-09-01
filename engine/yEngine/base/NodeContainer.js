/**YEngine2D 节点容器类
 * 作者：YYC
 * 日期：2014-02-18
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
namespace("YE").NodeContainer = YYC.AClass(YE.Node, {
    Init: function () {
        this.base();

        this.ye__childs = YE.Collection.create();
    },
    Private: {
        ye__isChangeZOrder: false,
        ye__childs: null
    },
    Protected: {
        Abstract: {
            ye_P_run: function () {
            }
        }
    },
    Public: {
        reorderChild: function (child, zOrder) {
            this.ye__isChangeZOrder = true;

            child.ye_P_setZOrder(zOrder);
        },
        sortAllChilds: function () {
            if (this.ye__isChangeZOrder) {
                this.ye__isChangeZOrder = false;

                this.sort(function (child1, child2) {
                    return child1.getZOrder() - child2.getZOrder();
                });
            }
        },
        sort: function (func) {
            this.ye__childs.sort(func);
        },
        getChilds: function () {
            return this.ye__childs.getChilds();
        },
        getChildAt: function (index) {
            return this.ye__childs.getChildAt(index);
        },
        addChilds: function (childs, zOrder, tag) {
            var self = this;

            YE.error(!YE.Tool.judge.isArray(childs), "第一个参数必须为数组");

            if (zOrder) {
                this.ye__isChangeZOrder = true;
            }

            this.ye__childs.addChilds(childs);

            childs.forEach(function (child) {
                if (zOrder) {
                    child.ye_P_setZOrder(zOrder);
                }
                if (tag) {
                    child.addTag(tag);
                }
                child.init(self);
                child.onenter();
            });
        },
        addChild: function (child, zOrder, tag) {
            this.ye__childs.addChild(child);

            if (zOrder) {
                this.ye__isChangeZOrder = true;
                child.ye_P_setZOrder(zOrder);
            }
            if (tag) {
                child.addTag(tag);
            }
            child.init(this);
            child.onenter();
        },
        getChildsByTag: function (tags) {
            var childTag = null,
                result = false,
                tags = YE.Tool.judge.isArray(tags) ? tags : [tags];

            return this.ye__childs.filter(function (child) {
                result = false;

                childTag = child.getTag();

                tags.forEach(function (tag) {
                    result = childTag.contain(tag);

                    if (result) {
                        return $break;
                    }
                });
                return result;
            });
        },
        getChildsByTagExactly: function (tags) {
            var childTag = null,
                result = false,
                tags = YE.Tool.judge.isArray(tags) ? tags : [tags];

            return this.ye__childs.filter(function (child) {
                result = false;

                childTag = child.getTag();

                tags.forEach(function (tag) {
                    childTag.forEach(function (t) {
                        if (t === tag) {
                            result = true;
                            return $break;
                        }
                    });

                    if (result) {
                        return $break;
                    }
                });
                return result;
            });
        },
        remove: function (child) {
            child.onexit();
            this.ye__childs.remove(child);
        },
        removeAll: function () {
            this.ye__childs.iterator("onexit");

            this.ye__childs.removeAll();
        },
        iterator: function (handler, args) {
            this.ye__childs.iterator.apply(this.ye__childs, arguments);
        },
        //游戏主循环调用的方法
        run: function () {
            this.onbeforeRun();

            this.sortAllChilds();

            this.ye_P_run();

            this.onafterRun();
        },

        forTest_addChild: function (child) {
            this.ye__childs.addChild(child);
        },
        forTest_addChilds: function (childs) {
            this.ye__childs.addChilds(childs);
        }
    }
});
