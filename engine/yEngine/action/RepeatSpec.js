describe("Repeat", function () {
    var action = null;
    var fakeAction = null;
    var sandbox = null;

    function buildFake(spyMethod) {
        var args = Array.prototype.slice.call(arguments, 0);

        fakeAction = jasmine.createSpyObj("", args);
    }

    beforeEach(function () {
        action = new YE.Repeat();
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("initWhenCreate", function () {
        it("加入内部动作", function () {
            var fakeAction = {};

            action.initWhenCreate(fakeAction);

            expect(action.getCurrentAction()).toEqual(fakeAction);
        });
        it("设置重复次数", function () {
            action.initWhenCreate({}, 5);

            expect(action.ye____times).toEqual(5);
            expect(action.ye____originTimes).toEqual(5);
        });
    });

    describe("update", function () {
        it("如果已经重复了指定次数，则完成动作", function () {
            sandbox.stub(action, "finish");
            action.forTest_init({}, 5);
            action.ye____times = 0;

            action.update(1);

            expect(action.finish.calledOnce).toBeTruthy();
        });

        describe("否则", function () {
            it("更新内部动作", function () {
                buildFake("update", "isFinish");
                sinon.stub(fakeAction, "isFinish").returns(false);
                action.forTest_init(fakeAction, 5);

                action.update(1);

                expect(fakeAction.update).toHaveBeenCalledWith(1);
            });

            describe("如果内部动作已经完成", function () {
                beforeEach(function () {
                    buildFake("update", "isFinish", "reset");
                    sinon.stub(fakeAction, "isFinish").returns(true);
                    action.forTest_init(fakeAction, 5);
                });

                it("重复剩余次数-1", function () {
                    action.update(1);

                    expect(action.ye____times).toEqual(4);
                });
                it("如果完成的不是最后一个动作，则重置", function () {
                    action.ye____times = 2;

                    action.update(1);

                    expect(fakeAction.reset).toHaveBeenCalled();

                });
            });
        });
    });

    describe("getCurrentFrame", function () {
        it("返回内部动画的当前帧", function () {
            var frame = {};
//            var fakeAction = {
//                getTarget: function () {
//                    return target;
//                }
//            };
            testTool.spyReturn(fakeAction, "getCurrentFrame", frame);
            action.forTest_setAction(fakeAction);

            expect(action.getCurrentFrame()).toEqual(frame);
        });
    });

//    describe("isFinish", function () {
//        it("判断是否完成动作", function () {
//        });
//    });

//    describe("canClear", function () {
//        it("判断是否清除精灵", function () {
//            action.ye____innerAction = testTool.spyReturn("canClear", true);
//
//            var flag = action.canClear();
//
//            expect(flag).toBeTruthy();
//            expect(action.ye____innerAction.canClear).toHaveBeenCalled();
//        });
//    });


    describe("copy", function () {
        it("返回动作副本，拷贝内部动作", function () {
            var copyAction = {},
                fakeInnerAction = sinon.createSpyObj("copy");
            sandbox.stub(YE.Repeat, "create").returns(copyAction);
            action.forTest_setAction(fakeInnerAction);

            var c = action.copy();

            expect(c === copyAction).toBeTruthy();
            expect(fakeInnerAction.copy.calledOnce).toBeTruthy();
        });
    });

    describe("getInnerActions", function () {
        it("获得内部动作", function () {
            fakeAction = {};
            action.forTest_init(fakeAction, 5);

            expect(action.getInnerActions()).toEqual([fakeAction]);
        });
    });

    describe("getCurrentAction", function () {
        it("获得当前运行的动作", function () {
            fakeAction = {};
            action.forTest_init(fakeAction, 5);

            expect(action.getCurrentAction()).toEqual(fakeAction);
        });
    });

    describe("create", function () {
        it("创建Repeat实例并返回", function () {
            expect(YE.Repeat.create({
                copy: function () {
                }
            })).toBeInstanceOf(YE.Repeat);
        });
        it("初始化实例", function () {
        });
//        it("获得动作的副本", function () {
//            var fake = {
//                copy: function () {
//                    return {}
//                }
//            };
//
//            action = YE.Repeat.create(fake, 5);
//
//            action.ye____innerAction.c = {};
//
//            expect(fake.c).toBeUndefined();
//        });
    });
});