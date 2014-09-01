/**YEngine2D
 * 作者：YYC
 * 日期：2014-02-18
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
describe("NodeContainer", function () {
    var container = null;
    var sandbox = null;

    function getInstance() {
        var T = YYC.Class(YE.NodeContainer, {
            Init: function () {
                this.base();
            },
            Public: {
                ye_P_run: function () {
                }
            }
        });

        return new T();
    }

    beforeEach(function () {
        container = getInstance();
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("构造函数", function () {
        it("创建Collection集合", function () {
            var container = getInstance();

            expect(container.ye__childs).toBeInstanceOf(YE.Collection);
        });
    });

    describe("reorderChild，重排元素的z轴显示顺序", function () {
        var child = null;

        beforeEach(function () {
            child = sandbox.createSpyObj("ye_P_setZOrder");
            container.forTest_addChild(child);
        });

        it("置标志位为true", function () {
            container.reorderChild(child);

            expect(container.ye__isChangeZOrder).toBeTruthy();
        });
        it("设置元素的zOrder", function () {
            container.reorderChild(child, 1);

            expect(child.ye_P_setZOrder.calledOnce).toBeTruthy();
        });
    });


    describe("sortAllChilds", function () {
        describe("如果需要排序", function () {
            beforeEach(function () {
                container.ye__isChangeZOrder = true;
            });

            it("按元素的zOrder排序", function () {
                var child1 = sandbox.createSpyObj("a"),
                    child2 = sandbox.createSpyObj("b"),
                    child3 = sandbox.createSpyObj("c"),
                    child4 = sandbox.createSpyObj("d");
                child1.getZOrder = function () {
                    return 0;
                };
                child2.getZOrder = function () {
                    return -1;
                };
                child3.getZOrder = function () {
                    return 3;
                };
                child4.getZOrder = function () {
                    return 2;
                };
                container.forTest_addChilds([child1, child2, child3, child4]);

                container.sortAllChilds();

                expect(container.getChilds()).toEqual([child2, child1, child4, child3]);
            });
        });
    });

    describe("sort", function () {
        it("对容器内元素排序", function () {
            var func = function () {
            };
            var child1 = {},
                child2 = {a: 1};
            container.forTest_addChilds([child1, child2]);
            spyOn(container.ye__childs, "sort");

            container.sort(func);

            expect(container.ye__childs.sort).toHaveBeenCalledWith(func);
        });
    });

    describe("加入元素", function () {
        function buildFakeChild() {
            return  sandbox.createSpyObj("init", "ye_P_setZOrder","onenter", "addTag");
        }

        describe("addChilds", function () {
            var fakeElement1 = null,
                fakeElement2 = null;

            beforeEach(function () {
                fakeElement1 = buildFakeChild();
                fakeElement2 = buildFakeChild();
            });

            it("如果第1个参数不是数组，则报错", function () {
                expect(function () {
                    container.addChilds({});
                }).toThrow();
                expect(function () {
                    container.addChilds([]);
                }).not.toThrow();
            });
            it("加入元素", function () {
                container.addChilds([fakeElement1, fakeElement2]);

                expect(container.getChilds().length).toEqual(2);
            });

            describe("如果传入了ZOrder", function () {
                it("置标志位为true", function () {
                    container.addChilds([fakeElement1, fakeElement2], 1);

                    expect(container.ye__isChangeZOrder).toBeTruthy();
                });
                it("设置元素的zOrder", function () {
                    container.addChilds([fakeElement1, fakeElement2], 1);

                    expect(fakeElement1.ye_P_setZOrder.calledWith(1)).toBeTruthy();
                    expect(fakeElement2.ye_P_setZOrder.calledWith(1)).toBeTruthy();
                });
            });

            it("否则，不设置ZOrder", function () {
                container.addChilds([fakeElement1, fakeElement2]);

                expect(fakeElement1.ye_P_setZOrder.called).toBeFalsy();
                expect(fakeElement2.ye_P_setZOrder.called).toBeFalsy();
            });
            it("如果传入了tag，则设置元素tag", function () {
                container.addChilds([fakeElement1, fakeElement2], 0, "a");

                expect(fakeElement1.addTag.calledOnce).toBeTruthy();
                expect(fakeElement2.addTag.calledOnce).toBeTruthy();
            });
            it("初始化元素", function () {
                container.addChilds([fakeElement1, fakeElement2]);

                expect(fakeElement1.init.calledWith(container)).toBeTruthy();
                expect(fakeElement2.init.calledWith(container)).toBeTruthy();
            });
            it("调用元素的onenter", function () {
                container.addChilds([fakeElement1, fakeElement2]);

                expect(fakeElement1.onenter.calledOnce).toBeTruthy();
                expect(fakeElement2.onenter.calledOnce).toBeTruthy();
            });
        });

        describe("addChild", function () {
            var fakeElement = null;

            beforeEach(function () {
                fakeElement = buildFakeChild();
            });

            it("加入一个元素", function () {
                container.addChild(fakeElement);

                expect(container.getChilds().length).toEqual(1);
            });

            describe("如果传入了ZOrder", function () {
                it("置标志位为true", function () {
                    container.addChild(fakeElement, 1);

                    expect(container.ye__isChangeZOrder).toBeTruthy();
                });
                it("设置元素的zOrder", function () {
                    container.addChild(fakeElement, 1);

                    expect(fakeElement.ye_P_setZOrder.calledWith(1)).toBeTruthy();
                });
            });

            it("否则，不设置ZOrder", function () {
                container.addChild(fakeElement);

                expect(fakeElement.ye_P_setZOrder.called).toBeFalsy();
            });
            it("如果传入了tag，则设置元素tag", function () {
                container.addChild(fakeElement, 0, "a");

                expect(fakeElement.addTag.calledOnce).toBeTruthy();
            });
            it("初始化元素", function () {
                container.addChild(fakeElement);

                expect(fakeElement.init.calledOnce).toBeTruthy();
            });
            it("调用元素的onenter", function () {
                container.addChild(fakeElement);

                expect(fakeElement.onenter.calledOnce).toBeTruthy();
            });
        });
    });

    describe("获得匹配标签的元素", function () {
        var child1 = null,
            child2 = null ,
            child3 = null;

        beforeEach(function () {
            child1 = {
                getTag: function () {
                    return ["aa"];
                }
            };
            child2 = {
                getTag: function () {
                    return ["aac", "bb"];
                }
            };
            child3 = {
                getTag: function () {
                    return ["cc"];
                }
            };
            container.forTest_addChilds([child1, child2, child3]);
        });

        describe("getChildsByTag（tag为contain匹配）", function () {
            it("如果参数为一个标签，则获得tag为该标签的元素", function () {
                var childs = container.getChildsByTag("a");

                expect(childs).toEqual([child1, child2]);
            });
            it("如果参数为标签数组，则获得tag为数组中任一标签的元素", function () {
                var childs = container.getChildsByTag(["a", "cc"]);

                expect(childs).toEqual([child1, child2, child3]);
            });
        });

        describe("getChildsByTagExactly（tag为完全匹配）", function () {
            it("如果参数为一个标签，则获得tag为该标签的元素", function () {
                expect(container.getChildsByTagExactly("a")).toEqual([]);
                expect(container.getChildsByTagExactly("aa")).toEqual([child1]);
            });
            it("如果参数为标签数组，则获得tag为数组中任一标签的元素", function () {
                var childs = container.getChildsByTagExactly(["aa", "b", "cc"]);

                expect(childs).toEqual([child1, child3]);
            });
        });
    });

    describe("remove", function () {
        beforeEach(function () {
        });

        it("调用精灵onexit", function () {
            var child = sandbox.createSpyObj("onexit");
            container.forTest_addChild(child);

            container.remove(child);

            expect(child.onexit.calledOnce).toBeTruthy();
        });
        it("删除层内指定元素（uid匹配）", function () {
            var child1 = sandbox.createSpyObj("onexit");
            var child2 = sandbox.createSpyObj("onexit");
            var child3 = sandbox.createSpyObj("onexit");
            testTool.spyReturn(child1, "getUid", 1);
            testTool.spyReturn(child2, "getUid", 2);
            testTool.spyReturn(child3, "getUid", 3);

            container.forTest_addChilds([child1, child2, child3]);

            container.remove(child2);

            expect(container.getChilds().length).toEqual(2);
            expect(container.getChilds()[0]).toEqual(child1);
            expect(container.getChilds()[1]).toEqual(child3);
        });
    });

    describe("removeAll", function () {
        beforeEach(function () {
        });

        it("调用精灵onexit", function () {
            var child1 = sandbox.createSpyObj("onexit");
            var child2 = sandbox.createSpyObj("onexit");
            container.forTest_addChilds([child1, child2]);

            container.removeAll();

            expect(child1.onexit.calledOnce).toBeTruthy();
            expect(child2.onexit.calledOnce).toBeTruthy();
        });
        it("删除层内指定元素（uid匹配）", function () {
            var child1 = sandbox.createSpyObj("onexit");
            var child2 = sandbox.createSpyObj("onexit");
            var child3 = sandbox.createSpyObj("onexit");
            testTool.spyReturn(child1, "getUid", 1);
            testTool.spyReturn(child2, "getUid", 2);
            testTool.spyReturn(child3, "getUid", 3);

            container.forTest_addChilds([child1, child2, child3]);

            container.removeAll();

            expect(container.getChilds().length).toEqual(0);
        });
    });

    describe("getChilds", function () {
        it("获得层内所有精灵", function () {
            container.forTest_addChilds([1, 2]);

            expect(container.getChilds()).toEqual([1, 2]);
        });
    });

    describe("getChildAt", function () {
        it("获得层内指定序号的精灵", function () {
            container.forTest_addChilds([1, 2]);

            expect(container.getChildAt(1)).toEqual(2);
        });
    });


    describe("iterator", function () {
        it("调用容器元素的方法，可传入参数", function () {
            var child1 = null,
                child2 = null;

            child1 = sandbox.createSpyObj("draw");
            child2 = sandbox.createSpyObj("draw");
            container.forTest_addChilds([child1, child2]);

            container.iterator("draw", 1);

            expect(child1.draw.calledWith(1)).toBeTruthy();
            expect(child2.draw.calledWith(1)).toBeTruthy();
        });
    });

    describe("run", function () {
        it("调用onstartLoop方法", function () {
            sandbox.stub(container, "onbeforeRun");

            container.run();

            expect(container.onbeforeRun.calledOnce).toBeTruthy();
        });
        it("对元素排序", function () {
            spyOn(container, "sortAllChilds");

            container.run();

            expect(container.sortAllChilds).toHaveBeenCalled();
        });
        it("调用抽象方法ye_P_run", function () {
            spyOn(container, "ye_P_run");

            container.run();

            expect(container.ye_P_run).toHaveBeenCalled();
        });
        it("调用onendLoop方法", function () {
            sandbox.stub(container, "onafterRun");
            sandbox.stub(container, "ye_P_run");

            container.run();

            expect(container.onafterRun.calledOnce).toBeTruthy();
            expect(container.onafterRun.calledAfter(container.ye_P_run)).toBeTruthy();
        });
    });
});