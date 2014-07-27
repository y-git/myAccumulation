describe("Sequence", function () {
    var action = null;
    var sandbox = null;

    beforeEach(function () {
        action = YE.Sequence.create();
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("initWhenCreate", function () {
        var fakeAction1 = {
            },
            fakeAction2 = {
                a: 1
            };

        beforeEach(function () {
            action.forTest_init([fakeAction1, fakeAction2]);
        });

        it("加入内部动作", function () {
            var actionArr = [
                {}
            ];
            sandbox.stub(action.ye___actions, "addChilds");

            action.initWhenCreate(actionArr);

            expect(action.ye___actions.addChilds.calledWith(actionArr)).toBeTruthy();
        });
        it("获得当前动作", function () {
            action.initWhenCreate();

            expect(action.ye___currentAction).toEqual(fakeAction1);
        });
        it("动作序号设为0", function () {
            action.initWhenCreate();

            expect(action.ye___actionIndex).toEqual(0);
        });
    });

    describe("update", function () {
        beforeEach(function () {
            action.forTest_init();
        });


        it("如果已完成所有动作，则标志完成并返回", function () {
            sinon.stub(action, "finish");
            sinon.stub(action.ye___actions, "getCount").returns(0);

            action.update(1);

            expect(action.finish.calledOnce).toBeTruthy();
        });

        describe("否则", function () {
            var fakeAction = null;

            it("根据动作序号，获得当前执行的动作", function () {
                action.ye___actionIndex = 0;
                fakeAction = {
                    isFinish: sinon.stub().returns(false),
                    update: sinon.stub()
                };
                action.forTest_setAcions(fakeAction);
                sinon.spy(action.ye___actions, "getChildAt");

                action.update(1);

                expect(action.ye___currentAction).toEqual(fakeAction);
                expect(action.ye___actions.getChildAt.calledWith(0)).toBeTruthy();
            });

            describe("如果当前动作没有完成", function () {
                beforeEach(function () {
                    fakeAction = {
                        isFinish: sinon.stub().returns(false),
                        update: sinon.stub()
                    };
                });

                it("更新当前动作并返回", function () {
                    action.forTest_setAcions(fakeAction, {});

                    var result = action.update(1);

                    expect(fakeAction.update.calledWith(1)).toBeTruthy();
                    expect(result).toEqual(YE.returnForTest);
                });

//                    it("如果当前动作为最后一个动作且不需要清除精灵，则标志为不清除", function () {
//                        testTool.spyReturn(fakeAction, "canClear", false);
//                        action.forTest_setAcions(fakeAction);
//
//                        action.update(1);
//
//                        expect(action.canClear()).toBeFalsy();
//                    });
            });

            describe("否则", function () {
                beforeEach(function () {
                    fakeAction = {
                        isFinish: sinon.stub().returns(true),
                        update: sinon.stub(),
                        reset: sinon.stub(),
                        stop: sinon.stub()
                    };
                    action.forTest_setAcions(fakeAction);
                });

//                it("重置当前动作", function () {
//                    action.update(1);
//
//                    expect(fakeAction.reset.calledOnce).toBeTruthy();
//                });
//                it("停止当前动作", function () {
//                    action.update(1);
//
//                    expect(fakeAction.stop.calledOnce).toBeTruthy();
//                }) ;
                it("动作序号指向下一个动作", function () {
                    action.update(1);

                    expect(action.ye___actionIndex).toEqual(1);
                });
                it("更新下一个动作（递归调用自身）", function () {
                    sinon.spy(action, "update");
                    action.forTest_setAcions(fakeAction);

                    action.update(1);

                    expect(action.update.callCount).toEqual(2);
                });
            });
        });
    });

    describe("reverse", function () {
        beforeEach(function () {
            action.stubParentMethod(sandbox, "reverse");
        });

        it("调用父类同名方法", function () {
            action.reverse();

            expect(action.lastBaseClassForTest.reverse.calledOnce).toBeTruthy();
        });
        it("反向动作序列", function () {
            var fakeAction1 = {
                },
                fakeAction2 = {
                    a: 1
                };
            action.forTest_init([fakeAction1, fakeAction2]);

            action.reverse();

            expect(action.getInnerActions().getChilds()).toEqual([fakeAction2, fakeAction1]);
        });
    });

    describe("getCurrentFrame", function () {
        it("返回当前动画的当前帧", function () {
            var frame = {};
            action.ye___currentAction = {
                getCurrentFrame: sinon.stub().returns(frame)
            };

            expect(action.getCurrentFrame()).toEqual(frame);
        });
    });

    describe("getInnerActions", function () {
        it("获得内部动作", function () {
            var fakeAction = [
                {},
                {a: 1}
            ];
            action.forTest_init(fakeAction);

            expect(action.getInnerActions().getChilds()).toEqual(fakeAction);
        });
    });

    describe("getCurrentAction", function () {
        it("获得当前运行的动作", function () {
            var currentAction = {},
                fakeAction = [currentAction, {a: 1}];
            action.forTest_init(fakeAction);

            expect(action.getCurrentAction()).toEqual(currentAction);
        });
    });

    describe("copy", function () {
        it("动作序列要进行拷贝", function () {
            var fakeAction1 = sinon.createSpyObj("copy"),
                fakeAction2 = sinon.createSpyObj("copy");
            action.forTest_setAcions(fakeAction1, fakeAction2);

            var c = action.copy();

            expect(fakeAction1.copy.calledOnce).toBeTruthy();
            expect(fakeAction2.copy.calledOnce).toBeTruthy();
        });
        it("返回动作副本", function () {
            var copyAction = {};
            sandbox.stub(action, "forTest_getInstance").returns(copyAction);

            var c = action.copy();

            expect(c === copyAction).toBeTruthy();
        });
    });

    describe("reset", function () {
        it("重置动作序号", function () {
            action.reset();

            expect(action.ye___actionIndex).toEqual(0);
        });
    });

    describe("create", function () {
        function buildFakeAction() {
            return sinon.createSpyObj("copy");
        }

        beforeEach(function () {
        });

        it("如果参数小于2，则断言", function () {
            var sandbox = sinon.sandbox.create();
            sandbox.stub(YE.main, "getConfig").returns({
                debug:true
            });

            expect(function () {
                YE.Sequence.create(buildFakeAction());
            }).toAssert();
            expect(function () {
                YE.Sequence.create(buildFakeAction(), buildFakeAction());
            }).not.toAssert();
            expect(function () {
                YE.Sequence.create(buildFakeAction(), buildFakeAction(),
                    buildFakeAction());
            }).not.toAssert();

            sandbox.restore();
        });
//        it("获得每个动作的副本", function () {
//            var fakeAction1 = buildFakeAction(),
//                fakeAction2 = buildFakeAction();
//
//            action = YE.Sequence.create(fakeAction1, fakeAction2);
//
//            expect(fakeAction1.copy.calledOnce).toBeTruthy();
//            expect(fakeAction2.copy.calledOnce).toBeTruthy();
//        });
        it("创建实例并返回", function () {
            expect(YE.Sequence.create(buildFakeAction())).toBeInstanceOf(YE.Sequence);
        });
        it("初始化动作", function () {
        });
    });
});