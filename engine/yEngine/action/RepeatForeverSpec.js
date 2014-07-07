describe("RepeatForever", function () {
    var action = null;
    var fakeAction = null;

    function buildFake(spyMethod) {
        var args = Array.prototype.slice.call(arguments, 0);

        fakeAction = jasmine.createSpyObj("", args);
    }

    beforeEach(function () {
        action = new YE.RepeatForever();
    });

    describe("initWhenCreate", function () {
        it("加入内部动作", function () {
            var fakeAction = {};

            action.initWhenCreate(fakeAction);

            expect(action.getCurrentAction()).toEqual(fakeAction);
        });
    });

    describe("update", function () {
        it("更新内部动作", function () {
            buildFake("update", "isFinish");
            sinon.stub(fakeAction, "isFinish").returns(false);
            action.forTest_init(fakeAction);

            action.update(1);

            expect(fakeAction.update).toHaveBeenCalledWith(1);
        });

        describe("如果内部动作已经完成", function () {
            beforeEach(function () {
                buildFake("update", "isFinish", "reset");
                sinon.stub(fakeAction, "isFinish").returns(true);
                action.forTest_init(fakeAction);
            });

            it("重置内部动作", function () {
                action.update(1);

                expect(fakeAction.reset).toHaveBeenCalled();

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
            action.forTest_init(fakeAction);

            expect(action.getCurrentFrame()).toEqual(frame);
        });
    });

    describe("isFinish", function () {
        it("因为一直重复，所以一直要不能完成", function () {
            expect(action.isFinish()).toBeFalsy();
        });
    });

//    describe("start", function () {
//        it("调用父类同名方法", function () {
//        });
//        it("启动动作", function () {
//            buildFake("start");
//            action.forTest_init(fakeAction);
//
//            action.start();
//
//            expect(fakeAction.start).toHaveBeenCalled();
//        });
//    });

//    describe("copy", function () {
//        it("返回动作副本", function () {
//            fakeAction = testTool.spyReturn("copy", {
//                copy: function () {
//                }
//            });
//            action.forTest_init(fakeAction);
//
//            var re = action.copy();
//
//            expect(re).toBeInstanceOf(YE.RepeatForever);
//            expect(re === action).toBeFalsy();
//            expect(fakeAction.copy).toHaveBeenCalled();
//        });
//
//    });
//
//    describe("reverse", function () {
//        it("动作反向", function () {
//            buildFake("reverse");
//            action.forTest_init(fakeAction);
//
//            action.reverse();
//
//            expect(fakeAction.reverse).toHaveBeenCalled();
//        });
//    });

    describe("create", function () {
        it("创建RepeatForever实例并返回", function () {
            expect(YE.RepeatForever.create({
                copy: function () {
                }
            })).toBeInstanceOf(YE.RepeatForever);
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
//            action = YE.RepeatForever.create(fake, 5);
//
//            action.ye___innerAction.c = {};
//
//            expect(fake.c).toBeUndefined();
//        });
    });
});