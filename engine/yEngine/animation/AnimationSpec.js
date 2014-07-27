/**YEngine2D
 * 作者：YYC
 * 日期：2014-01-13
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
describe("Animation", function () {
    var animation = null;
    var sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("构造函数", function () {
        it("获得动画的所有帧和配置参数", function () {
        });
    });


    describe("getFrames", function () {
        it("获得动画的所有帧", function () {
        });
    });

    describe("getDurationPerFrame", function () {
        it("获得每帧的持续时间", function () {
            var config = {
                duration: 1
            };
            animation = new YE.Animation([], config);

            expect(animation.getDurationPerFrame()).toEqual(1);
        });
    });

    describe("initWhenCreate", function () {
        var config = {},
            fakeBitmap1 = null,
            fakeBitmap2 = null,
            fakeFrame1 = null,
            fakeFrame2 = {};

        beforeEach(function () {
            fakeBitmap1 = jasmine.createSpyObj("", ["setFlipX", "setFlipY", "setAnchor"]);
            fakeFrame1 = testTool.spyReturn("getBitmap", fakeBitmap1);
            fakeFrame1.setBitmap = jasmine.createSpy();
            fakeFrame2 = testTool.spyReturn("getBitmap", fakeBitmap2);
            fakeFrame2.setBitmap = jasmine.createSpy();
            animation = new YE.Animation([fakeFrame1, fakeFrame2], config);
        });
        afterEach(function () {
        });

        it("获得帧的bitmap（因为动画的每帧的bitmap都一样，所以直接获得第1帧的bitmap即可）", function () {
            animation.initWhenCreate();

            expect(fakeFrame1.getBitmap).toHaveBeenCalled();
            expect(fakeFrame2.getBitmap).not.toHaveBeenCalled();
        });
        it("如果要x轴翻转，则设置bitmap", function () {
            config.flipX = true;

            animation.initWhenCreate();

            expect(fakeBitmap1.setFlipX).toHaveBeenCalled();
        });
        it("如果要y轴翻转，则设置bitmap", function () {
            config.flipY = true;

            animation.initWhenCreate();

            expect(fakeBitmap1.setFlipY).toHaveBeenCalled();
        });
        it("设置bitmap的锚点", function () {
            config.pixelOffsetX = 10;
            config.pixelOffsetY = 20;

            animation.initWhenCreate();

            expect(fakeBitmap1.setAnchor).toHaveBeenCalledWith(10, 20);
        });
        it("更新每帧frame的bitmap为设置后的bitmap", function () {
            animation.initWhenCreate();

            expect(fakeFrame1.setBitmap).toHaveBeenCalledWith(fakeBitmap1);
            expect(fakeFrame2.setBitmap).toHaveBeenCalledWith(fakeBitmap1);
        });
    });

    describe("copy", function () {
        beforeEach(function () {
            sandbox.stub(YE.Animation, "create");
        });
        afterEach(function () {
        });

        it("拷贝frames", function () {
            var frame1 = sandbox.createSpyObj("copy"),
                frame2 = sandbox.createSpyObj("copy");
            animation.ye_frames = [frame1, frame2];

            animation.copy();

            expect(frame1.copy.calledOnce).toBeTruthy();
            expect(frame2.copy.calledOnce).toBeTruthy();
        });
        it("拷贝config", function () {
            sandbox.stub(YYC.Tool.extend, "extend");

            animation.copy();

            expect(YYC.Tool.extend.extend.calledOnce).toBeTruthy();
        });
        it("创建animation实例并返回", function () {
            var result = animation.copy();


            expect(YE.Animation.create.calledOnce).toBeTruthy();
        });
    });

});