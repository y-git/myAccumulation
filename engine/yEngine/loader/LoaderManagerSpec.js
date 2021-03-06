/**YEngine2D
 * 作者：YYC
 * 日期：2014-02-25
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
describe("LoaderManager", function () {
    var manager = null,
        Manager = YE.LoaderManager;
    var sandbox = null;

    beforeEach(function () {
        manager = Manager.getInstance();
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        Manager.forTest_clearInstance();
        sandbox.restore();
    });

    describe("构造函数", function () {
        beforeEach(function () {
            Manager.forTest_clearInstance();
        });
        afterEach(function () {
        });

//        it("创建初始化数组", function () {
//            sandbox.stub(YE.Collection, "create");
//
//            manager = Manager.getInstance();
//
//            expect(YE.Collection.create.calledOnce).toBeTruthy();
//        });
    });

    describe("该类为单例类", function () {
        testTool.judgeSingleInstance(Manager);
    });

    describe("preload", function () {
        beforeEach(function () {
            spyOn(manager, "ye_isFinishLoad");
        });

        describe("加载图片资源", function () {
            var fakeLoader = null,
                res = null;

            beforeEach(function () {
                fakeLoader = jasmine.createSpyObj("", ["load"]);
                spyOn(YE.ImgLoader, "getInstance").andReturn(fakeLoader);
                res = [
                    {type: "image", url: "../a.png"},
                    {type: "image", url: "../b.png"}
                ];

                manager.preload(res);
            });

            it("异步加载图片", function () {
                expect(fakeLoader.load.calls[0].args[0]).toEqual(res[0].url);
                expect(fakeLoader.load.calls[1].args[0]).toEqual(res[1].url);
            });
            it("资源总数加1", function () {
                expect(manager.getResourceCount()).toEqual(2);
            });
        });

        describe("加载json", function () {
            var fakeLoader = null,
                res = null;

            beforeEach(function () {
                fakeLoader = jasmine.createSpyObj("", ["load"]);
                spyOn(YE.JsonLoader, "getInstance").andReturn(fakeLoader);
                res = [
                    {type: "json", url: "../a.json", id: "a"},
                    {type: "json", url: "../b.json", id: "b"}
                ];

                manager.preload(res);
            });

            it("异步加载json", function () {
                expect(fakeLoader.load.calls[0].args).toEqual([res[0].url, res[0].id]);
                expect(fakeLoader.load.calls[1].args).toEqual([res[1].url, res[1].id]);
            });
            it("资源总数加1", function () {
                expect(manager.getResourceCount()).toEqual(2);
            });
        });

//        describe("进行初始化", function () {
//            it("加入初始化数组", function () {
//                var func1 = function () {
//                    },
//                    func2 = function () {
//                    },
//                    res = [
//                        {type: "init", func: func1},
//                        {type: "init", func: func2}
//                    ];
//
//                manager.preload(res);
//
//                expect(manager.ye_initFuncArr.getCount()).toEqual(2);
//            });
//        });


        it("轮询是否加载完成，调用相应的方法", function () {
            manager.preload([]);

            expect(manager.ye_isFinishLoad).toHaveBeenCalled();
        });
    });

    describe("ye_isFinishLoad", function () {
        describe("如果加载完成", function () {
            beforeEach(function () {
                spyOn(manager, "getCurrentLoadedCount").andReturn(1);
                spyOn(manager, "getResourceCount").andReturn(1);
            });

            describe("如果用户定义了onload", function () {
                beforeEach(function () {
                    manager.onload = function () {
                    };
                });
                afterEach(function () {
                });

//                it("遍历初始化数组，调用每个方法", function () {
//                    var func1 = sandbox.stub(),
//                        func2 = sandbox.stub();
//                    manager.ye_initFuncArr.addChilds([func1, func2]);
//
//                    manager.ye_isFinishLoad();
//
//                    expect(func1.calledBefore(func2)).toBeTruthy();
//                });
                it("调用onload", function () {
                    manager.onload = jasmine.createSpy();

                    manager.ye_isFinishLoad();

                    expect(manager.onload).toHaveBeenCalled();
                });
            });

            it("否则，断言", function () {
                sandbox.stub(YE.main, "getConfig").returns({
                    isDebug: true
                });

                expect(function () {
                    manager.ye_isFinishLoad();
                }).toAssert();
            });
        });

        describe("否则", function () {
            beforeEach(function () {
                spyOn(manager, "getCurrentLoadedCount").andReturn(1);
                spyOn(manager, "getResourceCount").andReturn(2);
            });

            it("如果用户定义了onloading，则16ms后调用onloading", function () {
                manager.onloading = jasmine.createSpy();
                jasmine.Clock.useMock();

                manager.ye_isFinishLoad();

                jasmine.Clock.tick(16);
                expect(manager.onloading).toHaveBeenCalled();
            });
            it("进行下一次轮询", function () {
                spyOn(manager, "ye_isFinishLoad").andCallThrough();
                manager.onloading = function () {
                };
                jasmine.Clock.useMock();

                manager.ye_isFinishLoad();

                jasmine.Clock.tick(16);
                expect(manager.ye_isFinishLoad.calls.length).toEqual(2);
            });
        });
    });

    describe("getResourceCount", function () {
        it("返回资源总数", function () {
        });
    });

    describe("getCurrentLoadedCount", function () {
        it("返回当前已加载的资源数", function () {
        });
    });

    describe("reset", function () {
        it("重置资源计数", function () {
            manager.ye_resCount = 10;
            manager.ye_currentLoadedCount = 5;

            manager.reset();

            expect(manager.getResourceCount()).toEqual(0);
            expect(manager.getCurrentLoadedCount()).toEqual(0);
        });
    });

    describe("onResLoaded", function () {
        it("已加载的资源数加1", function () {
            manager.ye_currentLoadedCount = 0;

            manager.onResLoaded();

            expect(manager.ye_currentLoadedCount).toEqual(1);
        });
    });

    describe("onResError", function () {
        it("打印资源路径和错误信息", function () {
            sandbox.stub(YE, "log");

            manager.onResError("../a.png", "错误");

            expect(YE.log.calledTwice).toBeTruthy();
        });
    });

});
