/**YEngine2D
 * 作者：YYC
 * 日期：2014-04-28
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
describe("RepeatCondition", function () {
    var action = null,
        sandbox = null;

    beforeEach(function () {
        action = new YE.RepeatCondition();
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("update", function () {
        it("运行重复条件方法并设置其上下文，如果返回false，则完成动作并返回", function () {
            action.ye____conditionFunc = {
                call: sandbox.stub().returns(false)
            };
            sandbox.stub(action, "finish");

            action.update();

            expect(action.finish.calledOnce).toBeTruthy();
        });
        it("如果内部动作完成，则完成动作并返回", function () {
            action.ye____conditionFunc = {
                call: sandbox.stub().returns(true)
            };
            action.forTest_setAction({
                isFinish: sandbox.stub().returns(true)
            });
            sandbox.stub(action, "finish");

            action.update();

            expect(action.finish.calledOnce).toBeTruthy();
        });
        it("否则，更新内部动作", function () {
            action.ye____conditionFunc = {
                call: sandbox.stub().returns(true)
            };
            action.forTest_setAction({
                isFinish: sandbox.stub().returns(false) ,
                update:sandbox.stub()
            });

            action.update(1);

            expect(action.forTest_getAction().update.calledWith(1)).toBeTruthy();
        });
    });

    describe("copy", function () {
        it("返回动作副本，拷贝内部动作", function () {
            var copyAction = {},
                fakeInnerAction = sandbox.createSpyObj("copy");
            sandbox.stub(YE.RepeatCondition, "create").returns(copyAction);
            action.forTest_setAction(fakeInnerAction);

            var c = action.copy();

            expect(c === copyAction).toBeTruthy();
            expect(fakeInnerAction.copy.calledOnce).toBeTruthy();
        });
    });

    describe("getInnerActions", function () {
        it("获得内部动作", function () {
            fakeAction = {};
            action.forTest_init(fakeAction);

            expect(action.getInnerActions()).toEqual([fakeAction]);
        });
    });

    describe("getCurrentAction", function () {
        it("获得当前运行的动作", function () {
            fakeAction = {};
            action.forTest_init(fakeAction);

            expect(action.getCurrentAction()).toEqual(fakeAction);
        });
    });

    describe("create", function () {
        it("如果没有传入重复条件方法，则报错", function () {
            expect(function () {
                YE.RepeatCondition.create({}, {});
            }).toThrow();
        });
        it("创建实例并返回", function () {
            expect(YE.RepeatCondition.create({}, {}, function () {
            })).toBeInstanceOf(YE.RepeatCondition);
        });
        it("初始化实例", function () {
        });
    });
});
