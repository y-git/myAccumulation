/**YSoundEngine 测试
 * 作者：YYC
 * 日期：2014-05-26
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
describe("YSoundEngine", function () {
    var engine = null;
    var sandbox = null;

    beforeEach(function () {
        engine = new YE.YSoundEngine();
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("initWhenCreate", function () {
        beforeEach(function () {
            sandbox.stub(engine, "_load");
        });

        it("如果浏览器不支持Audio对象，则提示并返回", function () {
            sandbox.stub(window, "Audio", undefined);
            sandbox.stub(YE, "log");

            var result = engine.initWhenCreate("");

            expect(result).toEqual(YE.returnForTest);
            expect(YE.log.calledOnce).toBeTruthy();
        });

        describe("使用Html5 Audio API加载声音", function () {
            var fakeSound = null;

            beforeEach(function () {
                fakeSound = {
                    src: null,
                    addEventListener: sandbox.stub()
                };
                sandbox.stub(window, "Audio").returns(fakeSound);
            });
            afterEach(function () {
            });

            it("创建声音对象", function () {
                engine.initWhenCreate({url: ["../a.mp3"]});

                expect(window.Audio.calledOnce).toBeTruthy();
            });

            describe("测试audio的事件绑定", function () {
                beforeEach(function () {
                });

                it("绑定onload到canplaythrough事件，使其this指向engine", function () {
                    var fakeOnload = sandbox.createSpyObj("call");

                    engine.initWhenCreate({
                        onload: fakeOnload
                    });

                    fakeSound.addEventListener.firstCall.callArgOn(1, fakeSound);
                    expect(fakeSound.addEventListener.firstCall.args[0]).toEqual("canplaythrough");
                    expect(fakeOnload.call.args[0]).toEqual([engine, null]);
                });
                it("绑定onerror到error事件，使其this指向engine，传入errorCode", function () {
                    var fakeOnerror = sandbox.createSpyObj("call");
                    fakeSound.error = {code: 4};

                    engine.initWhenCreate({
                        onerror: fakeOnerror
                    });

                    fakeSound.addEventListener.secondCall.callArgOn(1, fakeSound);
                    expect(fakeSound.addEventListener.secondCall.args[0]).toEqual("error");
                    expect(fakeOnerror.call.args[0]).toEqual([engine, fakeSound.error.code]);
                });
            });

            it("加载声音", function () {
                engine.initWhenCreate({url: ["../a.mpe"]});

                expect(engine._load.calledOnce).toBeTruthy();
            });
        });
    });

    describe("_load", function () {
        beforeEach(function () {
            engine._audio = {
                src: null
            };
        });

        describe("获得浏览器支持的声音文件url", function () {
            var fakeUrlArr = null;

            beforeEach(function () {
                fakeUrlArr = ["../a.mp3", "../a.wav"];
                engine._urlArr = fakeUrlArr;
            });
            afterEach(function () {
            });

            it("如果浏览器为firefox，则它不支持mp3格式的声音文件", function () {
                sandbox.stub(YE.Tool.judge, "browser", {
                    ff: true
                });
                sandbox.stub(window, "Audio").returns({
                    canPlayType: sandbox.stub().returns(true)
                });

                engine._load();

                expect(engine._audio.src).toEqual(fakeUrlArr[1]);
            });
            it("其它浏览器则根据canPlayType方法来判断", function () {
                var fakeAudio = {
                    canPlayType: sandbox.stub()
                };
                sandbox.stub(YE.Tool.judge, "browser", {
                    ff: false
                });
                sandbox.stub(window, "Audio").returns(fakeAudio);
                fakeAudio.canPlayType.onCall(0).returns("");
                fakeAudio.canPlayType.onCall(1).returns("maybe");

                engine._load();

                expect(engine._audio.src).toEqual(fakeUrlArr[1]);
            });
        });

        it("设置声音的加载路径", function () {
            var fakeUrl = "../a.mp3";
            sandbox.stub(engine, "_getCanPlayUrl").returns(fakeUrl);

            engine._load();

            expect(engine._audio.src).toEqual(fakeUrl);
        });
    });

    describe("play", function () {
        it("播放声音", function () {
            var fakeAudio = sandbox.createSpyObj("play");
            sandbox.stub(engine, "_audio", fakeAudio);

            engine.play();

            expect(fakeAudio.play.calledOnce).toBeTruthy();
        });
    });
});
