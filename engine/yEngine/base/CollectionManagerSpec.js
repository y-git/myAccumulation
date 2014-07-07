/**YEngine2D
 * 作者：YYC
 * 日期：2014-04-20
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
describe("CollectionManager.js", function () {
    var manager = null;

    function getInstance() {
        var T = YYC.Class(YE.CollectionManager, {
            Init: function () {
                this.base();
            }
        });

        return new T();
    }

    beforeEach(function () {
        manager = getInstance();
    });


    describe("构造函数", function () {
        it("创建childs集合", function () {
            var manager = getInstance();

            expect(manager.ye_P_childs).toBeInstanceOf(YE.Collection);
        });
    });

    describe("getCount", function () {
        it("获得容器元素个数", function () {
            manager.forTest_addChild({});

            expect(manager.getCount()).toEqual(1);
        });
    });


    describe("addChild", function () {
        it("如果容器中已有该元素，则返回", function () {
            sinon.stub(manager, "hasChild").returns(true);

            expect(manager.addChild()).toEqual(YE.returnForTest);
        });

        describe("否则", function () {
            var fakeChild = null;

            beforeEach(function () {
                fakeChild = {
                    init: sinon.stub(),
                    onenter: sinon.stub(),
                    setTarget: sinon.stub()
                };
                sinon.stub(manager, "hasChild").returns(false);
            });

            it("设置元素的target", function () {
                var target = {};

                manager.addChild(fakeChild, target);

                expect(fakeChild.setTarget.calledWith(target)).toBeTruthy();
            });
            it("加入该元素", function () {
                sinon.spy(manager.ye_P_childs, "addChild");

                manager.addChild(fakeChild);

                expect(manager.ye_P_childs.addChild.calledWith(fakeChild)).toBeTruthy();
            });
            it("初始化元素（在设置元素的target之后）", function () {
                manager.addChild(fakeChild);

                expect(fakeChild.init.calledAfter(fakeChild.setTarget)).toBeTruthy();
            });
            it("调用元素的onenter子", function () {
                manager.addChild(fakeChild);

                expect(fakeChild.onenter.calledAfter(fakeChild.init)).toBeTruthy();
            });
        });
    });

    describe("remove", function () {
        var fakeChild = null;

        beforeEach(function () {
            fakeChild = {
                onexit: sinon.stub(),
                getUid: function () {
                    return 1;
                }
            };
            manager.forTest_addChild(fakeChild);
        });

        it("调用元素的onexit钩子", function () {
            manager.remove(fakeChild);

            expect(fakeChild.onexit.calledOnce).toBeTruthy();
        });
        it("删除指定元素（uid匹配）", function () {
            manager.remove(fakeChild);

            expect(manager.hasChild(fakeChild)).toBeFalsy();
        });
    });

    describe("removeAll", function () {
        var fakeChild1 = null,
            fakeChild2 = null;

        beforeEach(function () {
            fakeChild1 = {
                onexit: sinon.stub()
            };
            fakeChild2 = {
                onexit: sinon.stub(),
                a: 2
            };
            manager.forTest_addChild(fakeChild1);
            manager.forTest_addChild(fakeChild2);
        });

        it("调用每个元素的onexit钩子", function () {
            manager.removeAll();

            expect(fakeChild1.onexit.calledOnce).toBeTruthy();
            expect(fakeChild2.onexit.calledOnce).toBeTruthy();
        });
        it("删除所有元素", function () {
            manager.removeAll();

            expect(manager.hasChild(fakeChild1)).toBeFalsy();
            expect(manager.hasChild(fakeChild2)).toBeFalsy();
        });
    });

    describe("hasChild", function () {
        it("判断容器中是否已加入该元素", function () {
            var fakeChild = {
            };
            spyOn(manager.ye_P_childs, "hasChild");

            manager.hasChild(fakeChild);

            expect(manager.ye_P_childs.hasChild).toHaveBeenCalledWith(fakeChild);
        });
    });

    describe("getChilds", function () {
        it("获得所有元素", function () {
            var fakeChild1 = {
                    a: 10
                },
                fakeChild2 = {};
            manager.forTest_addChild(fakeChild1);
            manager.forTest_addChild(fakeChild2);

            expect(manager.getChilds().length).toEqual(2);
        });
    });
});
