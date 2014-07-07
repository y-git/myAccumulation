describe("Animate.js", function () {
    var animate = null;
    var sandbox = null;

    function getInstance(animation) {
        var animate = YE.Animate.create(animation);

//        animate.init();

        return animate;
    }

    beforeEach(function () {
        animate = new YE.Animate();
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("构造函数", function () {

    });

    describe("initWhenCreate", function () {
        var fakeFrame1 = {},
            fakeFrame2 = {},
            fakeAnimation = {
                getFrames: function () {
                    return [
                        fakeFrame1,
                        fakeFrame2
                    ];
                },
                getDurationPerFrame: function () {
                }
            };

        it("获得精灵的一个动画", function () {
            animate = getInstance(fakeAnimation);

            expect(animate.ye___anim).toEqual(fakeAnimation);
        });
        it("获得当前播放动画的所有帧", function () {
            spyOn(fakeAnimation, "getFrames").andCallThrough();

            animate = getInstance(fakeAnimation);

            expect(fakeAnimation.getFrames).toHaveBeenCalled();
        });
        it("获得每帧持续时间", function () {
            spyOn(fakeAnimation, "getDurationPerFrame").andCallThrough();

            animate = getInstance(fakeAnimation);

            expect(fakeAnimation.getDurationPerFrame).toHaveBeenCalled();
        });
        it("获得当前播放动画的所有帧的数量", function () {
            spyOn(fakeAnimation, "getDurationPerFrame").andCallThrough();

            animate = getInstance(fakeAnimation);

            expect(animate.ye___frameCount).toEqual(2);
        });

        it("设置当前帧为第1帧，设置当前帧序号", function () {
            animate = getInstance(fakeAnimation);

            expect(animate.ye___currentFrameIndex).toEqual(0);
            expect(animate.getCurrentFrame().index).toEqual(0);
            expect(animate.ye___currentFramePlayed).toEqual(0);
        });
    });


    describe("update", function () {
        it("更新Animation状态，只播放一次", function () {
        });
    });

    describe("reset", function () {
        it("调用父类同名方法", function () {
        });
        it("重置播放的动画", function () {
//            var fakeFrame1 = {},
//                fakeFrame2 = {},
//                fakeAnimation = {
//                    getFrames: function () {
//                        return [
//                            fakeFrame1,
//                            fakeFrame2
//                        ];
//                    },
//                    getDurationPerFrame: function () {
//                    }
//                };
//            animate = getInstance(fakeAnimation);
            spyOn(animate, "ye___setCurrentFrame");

            animate.reset();

            expect(animate.ye___setCurrentFrame).toHaveBeenCalledWith(0);
        });
    });

    describe("copy", function () {
        it("返回动作副本，拷贝animation", function () {
            var fakeAnimate = {};
            sandbox.stub(YE.Animate, "create").returns(fakeAnimate);
            animate.ye___anim = sandbox.createSpyObj("copy");

            var result = animate.copy();

            expect(result).toEqual(fakeAnimate);
            expect(animate.ye___anim.copy.calledOnce).toBeTruthy();
        });
    });

    describe("reverse", function () {
        var fakeFrame1 = {
                a: 1
            },
            fakeFrame2 = {
                b: 1
            },
            fakeAnimation = {
                getFrames: function () {
                    return [
                        fakeFrame1,
                        fakeFrame2
                    ];
                },
                getDurationPerFrame: function () {
                }
            };

        beforeEach(function () {
            animate = getInstance(fakeAnimation);
        });

        it("动画播放顺序反向", function () {
            animate.reverse();

            expect(animate.ye___frames.getChilds()).toEqual([fakeFrame2, fakeFrame1]);
        });
        it("刷新当前帧", function () {
            animate.reset();
            animate.reverse();

            expect(animate.getCurrentFrame()).toEqual(fakeFrame2)
        });
    });

    describe("getCurrentFrame", function () {
        it("获得当前帧", function () {
        });
    });


    describe("create", function () {
        var fakeFrame1 = {},
            fakeAnimation = {
                getFrames: function () {
                    return [
                        fakeFrame1
                    ];
                },
                getDurationPerFrame: function () {
                }
            };

        it("创建Animate实例并返回", function () {
            expect(YE.Animate.create(fakeAnimation)).toBeInstanceOf(YE.Animate);
        });
    });
});