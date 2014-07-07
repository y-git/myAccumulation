describe("ActionManager.js", function () {
    var manager = null;
    var sandbox = null;

    beforeEach(function () {
        manager = YE.ActionManager.create();
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        sandbox.restore();
    });


    describe("update", function () {
        var fakeAction1 = null,
            fakeAction2 = null;

        function buildFakeFps() {
            sandbox.stub(YE.Director, "getInstance").returns({
                getFps: function () {
                    return 10;
                }
            });
        }

        function buildFakeAction(uid) {
            return {
                isStop: function () {
                    return false;
                },
                isFinish: function () {
                    return false;
                },
                update: function () {
                },
                getUid: function () {
                    return uid;
                }
            };
        }

        beforeEach(function () {
            fakeAction1 = buildFakeAction(1);
            fakeAction2 = buildFakeAction(2);
        });

        it("如果动作已经完成，则容器中删除该动作", function () {
            sandbox.stub(manager, "remove");
            sandbox.stub(fakeAction1, "isFinish").returns(true);
            sandbox.stub(fakeAction1, "update");
            manager.forTest_addChild(fakeAction1);

            manager.update();

            expect(manager.remove.calledWith(fakeAction1)).toBeTruthy();
        });
        it("如果动作停止，则不执行该动作的update方法", function () {
            sandbox.stub(fakeAction1, "isFinish").returns(false);
            sandbox.stub(fakeAction1, "isStop").returns(true);
            sandbox.stub(fakeAction1, "update");
            manager.forTest_addChild(fakeAction1);

            manager.update();

            expect(fakeAction1.isStop.calledAfter(fakeAction1.isFinish)).toBeTruthy();
            expect(fakeAction1.update.callCount).toEqual(0);
        });
        it("否则，执行动作的update方法，传入游戏主循环的间隔时间（以秒为单位）", function () {
            buildFakeFps();
            sandbox.stub(fakeAction1, "isFinish").returns(false);
            sandbox.stub(fakeAction1, "update");
            sandbox.stub(fakeAction2, "isFinish").returns(false);
            sandbox.stub(fakeAction2, "update");
            manager.forTest_addChild(fakeAction1);
            manager.forTest_addChild(fakeAction2);

            manager.update();

            expect(fakeAction1.update.calledWith(1 / 10)).toBeTruthy();
            expect(fakeAction2.update.calledWith(1 / 10)).toBeTruthy();
        });
    });
});