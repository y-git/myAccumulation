/**YEngine2D
 * 作者：YYC
 * 日期：2014-05-01
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
describe("AnimationCache", function () {
    var cache = null;
    var sandbox = null;

    beforeEach(function () {
        cache = YE.AnimationCache.getInstance();
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        YE.AnimationCache.forTest_clearInstance();
        sandbox.restore();
    });

    describe("该类为单例类", function () {
        testTool.judgeSingleInstance(YE.AnimationCache);
    });

    describe("构造函数", function () {
        beforeEach(function () {
            YE.AnimationCache.forTest_clearInstance();
        });
        afterEach(function () {
        });

        it("创建容器", function () {
            sandbox.stub(YE.Hash, "create");

            cache = YE.AnimationCache.getInstance();

            expect(YE.Hash.create.calledOnce).toBeTruthy();
        });
    });


    describe("createAnim", function () {
        var frameCache = null,
            fakeFrame = {},
            config = null;

        beforeEach(function () {
            frameCache = {
                getFrame: sandbox.stub().returns(fakeFrame)
            };
            sandbox.stub(YE.FrameCache, "getInstance").returns(frameCache);
            sandbox.stub(YE.Animation, "create");
            sandbox.stub(YE.Animate, "create");
            sandbox.stub(YE.Repeat, "create");
            sandbox.stub(YE.RepeatForever, "create");
        });

        describe("生成帧数组", function () {
            function getFrames() {
                return YE.Animation.create.lastCall.args[0];
            }


            describe("如果参数为frameData", function () {
                it("根据帧名称，从frameCache中获得帧数组，并生成帧数组", function () {
                    var frameData = {frames: [
                        "aa",
                        "bb"
                    ], a: 1, b: {}};

                    cache.createAnim(frameData);

                    var frames = getFrames();
                    expect(frames.length).toEqual(2);
                    expect(frameCache.getFrame.firstCall.args[0]).toEqual("aa");
                    expect(frameCache.getFrame.secondCall.args[0]).toEqual("bb");
                    expect(frames[0]).toEqual(fakeFrame);
                    expect(frames[1]).toEqual(fakeFrame);
                });
                it("获得config", function () {
                    var frameData = {frames: [], a: 1, b: {}};
                    sandbox.stub(YYC.Tool.extend, "extendExist");

                    cache.createAnim(frameData);

                    expect(YYC.Tool.extend.extendExist.callsArgWith(1, frameData)).toBeTruthy();
                });
            });


            describe("如果参数为frameName, config", function () {
                beforeEach(function () {
                });
                afterEach(function () {
                });

                it("生成只有1帧帧数组", function () {
                    cache.createAnim("aaa", {});

                    var frames = getFrames();
                    expect(frames.length).toEqual(1);
                    expect(frameCache.getFrame.firstCall.args[0]).toEqual("aaa");
                    expect(frames[0]).toEqual(fakeFrame);
                });
                it("获得config", function () {
                    var config = {};
                    sandbox.stub(YYC.Tool.extend, "extend");

                    cache.createAnim("aaa", config);

                    expect(YYC.Tool.extend.extend.callsArgWith(1, config)).toBeTruthy();
                });
            });

            describe("如果参数为startFrameName, endFrameName, config", function () {
                var startAnimName = null,
                    endAnimName = null;

                beforeEach(function () {
                    startAnimName = "aaa_001";
                    endAnimName = "aaa_025";
                });


                it("测试生成帧的名字", function () {
                    cache.createAnim(startAnimName, endAnimName, config);

                    expect(frameCache.getFrame.getCall(1).args[0]).toEqual("aaa_002");
                    expect(frameCache.getFrame.getCall(22).args[0]).toEqual("aaa_023");
                });
                it("生成startAnimName到endAnimName的帧数组", function () {
                    cache.createAnim(startAnimName, endAnimName, config);

                    var frames = getFrames();
                    expect(frames.length).toEqual(25);
                    expect(frames[0]).toEqual(fakeFrame);
                });
            });
        });

        it("创建animation，传入配置项", function () {
            var config = {
                duration: 0.5,
                flipX: true,
                flipY: true,
                pixelOffsetX: 10,
                pixelOffsetY: 20,
                repeatNum: 10
            };

            cache.createAnim("", "", config);

            expect(YE.Animation.create.lastCall.args[1]).toEqual({
                duration: 0.5,
                flipX: true,
                flipY: true,
                pixelOffsetX: 10,
                pixelOffsetY: 20
            });
        });
        it("根据config.repeatNum，创建对应动画并返回", function () {
            var fakeAnim = {};
            var config = {
                repeatNum: -1
            };

            cache.createAnim("", "", {
                repeatNum: -1
            });
            cache.createAnim("", "", {
                repeatNum: 10
            });

            expect(YE.RepeatForever.create.calledOnce).toBeTruthy();
            expect(YE.Repeat.create.firstCall.args[1]).toEqual(10);
        });
    });

    describe("addAnim", function () {
        beforeEach(function () {
        });
        afterEach(function () {
        });

        it("加入动画到容器中", function () {
            var animName = "a",
                anim = {};

            cache.addAnim(animName, anim);

            expect(cache.forTest_getAnim(animName)).toEqual(anim);
        });
    });

    describe("getAnim", function () {
        it("从容器中获得动画", function () {
            var anim = {
            };
            cache.addAnim("a", anim);

            var result = cache.getAnim("a");

            expect(result).toEqual(anim);
        });
    });

    describe("addAnimWithFile", function () {
        beforeEach(function () {
        });
        afterEach(function () {
        });

        it("从JsonLoader中获得动画json文件", function () {
            var jsonFilePath = "aa.json",
                fakeJsonLoader = {
                    get: sandbox.stub()
                };
            sandbox.stub(YE.JsonLoader, "getInstance").returns(fakeJsonLoader);

            cache.addAnimWithFile(jsonFilePath);

            expect(fakeJsonLoader.get.calledWith(jsonFilePath)).toBeTruthy();
        });
        it("直接从动画json文件中创建动画，加入到容器中", function () {
            var fakeFrameData1 = {},
                fakeFrameData2 = {},
                fakeAnim1 = {a: {}},
                fakeAnim2 = {b: {}},
                fakeJsonLoader = {
                    get: sandbox.stub().returns({
                        "a": fakeFrameData1,
                        "b": fakeFrameData2
                    })
                };
            sandbox.stub(YE.JsonLoader, "getInstance").returns(fakeJsonLoader);
            sandbox.stub(cache, "addAnim");
            sandbox.stub(cache, "createAnim");
            cache.createAnim.onCall(0).returns(fakeAnim1);
            cache.createAnim.onCall(1).returns(fakeAnim1);

            cache.addAnimWithFile("");

            expect(cache.addAnim.firstCall.calledWith("a", fakeAnim1));
            expect(cache.addAnim.secondCall.calledWith("b", fakeAnim2));
        });
    });

    describe("removeAnim", function () {
        it("容器中删除动画", function () {
            cache.addAnim("a", {});

            cache.removeAnim("a");

            expect(cache.forTest_getAnim("a")).toBeUndefined();
        });
    });

});
