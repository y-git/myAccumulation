/**YEngine2D
 * 作者：YYC
 * 日期：2014-07-27
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
describe("main", function () {
    var main = null;
    var sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        main = YE.main;
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("JsLoader", function () {
        var jsLoader = null,
            src1 = null,
            src2 = null;

//        function loadSingleJs(func, obj) {
//            //jsLoader = new JsLoader();
//
//            var foo = {
//                a: 1
//            };
//
//
//            jsLoader.add(src1, function (value) {
//                this.a = value;
//            }, [2], foo);
//            func.call(obj, null);
//
//            testTool.asynRun(function () {
//                expect(foo.a).toEqual(2);
//            }, 300);
//        }

        beforeEach(function () {
            jsLoader = main.forTest_getJsLoader().create();
            src1 = YE.Tool.path.getJsDir("main.js") + "testJs1.js";
            src2 = YE.Tool.path.getJsDir("main.js") + "testJs2.js";
        });
        afterEach(function () {
            $("head script[src*=testJs1\\.js]").remove();
            $("head script[src*=testJs2\\.js]").remove();
        });

//        it("JsLoader存在", function () {
//            expect(JsLoader).toBeDefined();
//        });

        describe("add", function () {
            it("参数为：js文件src1、回调函数、回调函数的参数、回调函数的this指向", function () {
                var func = {
                    a: 1
                };

                jsLoader.add(src1, function () {
                }, ["a"], func);

                expect(jsLoader.ye_container[0].src).toEqual(src1);
                expect(jsLoader.ye_container[0].callback).toBeFunction();
                expect(jsLoader.ye_container[0].args).toEqual(["a"]);
                expect(jsLoader.ye_container[0].obj.a).toEqual(1);
            });
            it("参数中如果没有传递“回调函数的this指向”，则指向默认为window", function () {
                jsLoader.add(src1, function () {
                    this.jsLoader_forTest = 2;
                }, ["a"]);
                jsLoader.loadSync();

                testTool.asynRun(function () {
                    expect(window.jsLoader_forTest).toEqual(2);

                    testTool.deleteMember(window, "jsLoader_forTest");
                }, 300);
            });
            it("可以链式加入多个js文件", function () {
                jsLoader.add(src1,function () {
                }, []).add(src2, function () {
                    }, []);

                expect(jsLoader.ye_container[0].src).toEqual(src1);
                expect(jsLoader.ye_container[1].src).toEqual(src2);
            });
        });

        describe("js非阻塞同步加载loadSync", function () {
            beforeEach(function () {
            });
            afterEach(function () {
            });

            it("能够正常加载单个js文件时", function () {
                jsLoader.add(src1);

                jsLoader.loadSync();

                testTool.asynRun(function () {
                    expect(window.jsLoader_forTest).toEqual(100);

                    testTool.deleteMember(window, "jsLoader_forTest");
                }, 300);
            });
            it("加载多个js文件时，按照加入的顺序依次加载", function () {
                jsLoader.add(src1).add(src2);

                jsLoader.loadSync();

                testTool.asynRun(function () {
                    expect(window.jsLoader_forTest).toEqual(101);

                    testTool.deleteMember(window, "jsLoader_forTest");
                }, 300);
            });
            it("onload钩子会在加载完所有js文件后触发", function () {
                jsLoader.add(src1).add(src2);
                jsLoader.onload = function () {
                    window.jsLoader_forTest *= 2;
                };

                jsLoader.loadSync();

                testTool.asynRun(function () {
                    expect(window.jsLoader_forTest).toEqual(202);

                    testTool.deleteMember(window, "jsLoader_forTest");
                }, 300);
            });
        });
    });

    describe("加入main.js依赖的全局方法", function () {
        describe("namespace", function () {
            var namespace_forTest = null;

            beforeEach(function () {
                namespace_forTest = "ye_namespace_forTest";
            });
            afterEach(function () {
                testTool.deleteMember(window, namespace_forTest);
            });

            it("测试namespace方法存在", function () {
                expect(namespace).toBeFunction();
            });

            it("测试命名空间不能为空", function () {
                expect(namespace).toThrow();
            });


            it("测试创建单个命名空间成功", function () {
                namespace(namespace_forTest);

                expect(window[namespace_forTest]).toBeDefined();
            });
            it("测试创建多个命名空间成功", function () {
                namespace("ye_namespace_forTest.Button");
                namespace("ye_namespace_forTest.Button.Test");

                expect(window[namespace_forTest].Button).toBeDefined();
                expect(window[namespace_forTest].Button.Test).toBeDefined();
            });

            it("测试返回命名空间", function () {
                var n = namespace(namespace_forTest);

                expect(n).toEqual({});
            });
            it("测试返回的命名空间可以使用", function () {
                var button = namespace("ye_namespace_forTest.Button");

                expect(button.test).not.toBeDefined();

                button.test = function () {
                };

                expect(button.test).toBeFunction();
            });
            it("如果使用namespace创建的命名空间已经存在，则直接返回该命名空间", function () {
                window[namespace_forTest] = {};
                window[namespace_forTest].a = 1;

                namespace(namespace_forTest).b = 2;

                expect(window[namespace_forTest].a).toEqual(1);
                expect(window[namespace_forTest].b).toEqual(2);
            });
        });
    });


    describe("setConfig", function () {
        var config = null;

        it("保存配置", function () {
            config = {isDebug: true};

            main.setConfig(config);

            var _config = main.getConfig();
            expect(_config.isDebug).toBeTruthy();
        });

        describe("如果配置为自动加载，则在dom加载完成后加载引擎和用户文件", function () {
            beforeEach(function () {
                config = {isLoadWhenDomReady: true};
            });
            afterEach(function () {
            });

            describe("dom加载完成后加载引擎和用户文件", function () {
                beforeEach(function () {
                    sandbox.stub(window, "addEventListener");
                });
                afterEach(function () {
                });

                it("绑定DOMContentLoaded事件", function () {
                    main.setConfig(config);

                    expect(window.addEventListener.firstCall.args[0]).toEqual("DOMContentLoaded");
                });
                it("加载引擎和用户文件", function () {
                    var engineDir = "../script/yEngine/",
                        engineFilePaths = ["a.js", "a/b.js"],
                        userFilePaths = ["c.js", "../d.js"],
                        fakeJsLoader = {
                            add: sandbox.stub(),
                            loadSync: sandbox.stub()
                        };
                    sandbox.stub(main.forTest_getJsLoader(), "create").returns(fakeJsLoader);
                    config.engineDir = engineDir;
                    config.engineFilePaths = engineFilePaths;
                    config.userFilePaths = userFilePaths;
                    sandbox.stub(main, "ye_engineFilePaths", engineFilePaths);

                    main.setConfig(config);
                    window.addEventListener.getCall(0).callArg(1);

                    expect(fakeJsLoader.add.withArgs(engineDir + engineFilePaths[0]).calledOnce).toBeTruthy();
                    expect(fakeJsLoader.add.withArgs(engineDir + engineFilePaths[1]).calledOnce).toBeTruthy();
                    expect(fakeJsLoader.add.withArgs(userFilePaths[0]).calledOnce).toBeTruthy();
                    expect(fakeJsLoader.add.withArgs(userFilePaths[1]).calledOnce).toBeTruthy();
                    expect(fakeJsLoader.loadSync.calledAfter(fakeJsLoader.add)).toBeTruthy();
                });
            });
            it("文件加载完成后，调用配置的onload方法", function () {
                var fakeOnLoad = sandbox.stub();
                var fakeJsLoader = {};
                sandbox.stub(main.forTest_getJsLoader(), "create").returns(fakeJsLoader);
                config.onload = fakeOnLoad;

                main.setConfig(config);

                expect(fakeJsLoader.onload).toEqual(fakeOnLoad);
            });
        });
    });

    describe("load", function () {
        beforeEach(function () {
            sandbox.stub(console, "log");
        });
        afterEach(function () {
        });

        it("如果已配置为DOM加载完成后自动加载文件，则提示并不进行加载", function () {
            main.ye_config.isLoadWhenDomReady = true;

            var result = main.load();

            expect(console.log.calledOnce).toBeTruthy();
            expect(result).toBeFalsy();
        });
        it("如果已经加载过文件，则提示并不进行加载", function () {
            main.ye_config.isLoadWhenDomReady = false;

            var result = main.load();

            expect(console.log.calledOnce).toBeTruthy();
            expect(result).toBeFalsy();
        });
        it("否则，加载文件", function () {
            sandbox.stub(main, "ye_loadJsLoader");

            main.load();

            expect(main.ye_loadJsLoader).toBeTruthy();
        });
    });
});
