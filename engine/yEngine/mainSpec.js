/**YEngine2D
 * 作者：YYC
 * 日期：2014-07-27
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
describe("Main", function () {
    var main = null;
    var sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        main = YE.main;
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("jsLoader", function () {
        var sandbox = null;

        beforeEach(function () {
            sandbox = sinon.sandbox.create();
        });
        afterEach(function () {
            sandbox.restore();
        });

        it("", function () {

        });
    });

    describe("加入main.js依赖的全局方法", function () {
        describe("namespace", function () {
            var namespace_forTest = null;

            beforeEach(function () {
                namespace_forTest = "ye_namespace_forTest";
            });
            afterEach(function () {
                testTool.deleteMember(window,  namespace_forTest);
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
            config = {debug: true};

            main.setConfig(config);

            var _config = main.getConfig();
            expect(_config.debug).toBeTruthy();
        });

        describe("如果配置为自动加载，则在dom加载完成后加载引擎和用户文件", function () {
            beforeEach(function () {
                config = {loadWhenDomReady: true};
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
                        jsLoader = main.forTest_getJsLoader();
                    sandbox.stub(jsLoader, "add");
                    sandbox.stub(jsLoader, "loadSync");
                    config.engineDir = engineDir;
                    config.engineFilePaths = engineFilePaths;
                    config.userFilePaths = userFilePaths;
                    sandbox.stub(main, "ye_engineFilePaths", engineFilePaths);

                    main.setConfig(config);
                    window.addEventListener.getCall(0).callArg(1);

                    expect(jsLoader.add.withArgs(engineDir + engineFilePaths[0]).calledOnce).toBeTruthy();
                    expect(jsLoader.add.withArgs(engineDir + engineFilePaths[1]).calledOnce).toBeTruthy();
                    expect(jsLoader.add.withArgs(userFilePaths[0]).calledOnce).toBeTruthy();
                    expect(jsLoader.add.withArgs(userFilePaths[1]).calledOnce).toBeTruthy();
                    expect(jsLoader.loadSync.calledAfter(jsLoader.add)).toBeTruthy();
                });
            });
            it("文件加载完成后，调用配置的onload方法", function () {
                var fakeOnLoad = sandbox.stub();
                config.onload = fakeOnLoad;

                main.setConfig(config);

                expect(main.forTest_getJsLoader().onload).toEqual(fakeOnLoad);
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
            main.ye_config.loadWhenDomReady = true;

            var result = main.load();

            expect(console.log.calledOnce).toBeTruthy();
            expect(result).toBeFalsy();
        });
        it("如果已经加载过文件，则提示并不进行加载", function () {
            main.ye_config.loadWhenDomReady = false;

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
