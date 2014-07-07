/**YEngine2D
 * 作者：YYC
 * 日期：2014-04-21
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
describe("CallFunc", function () {
    var action = null;

    function getInstance(context, func, args) {
        return YE.CallFunc.create(context, func, args);
    }

    beforeEach(function () {
        action = getInstance();
    });
    afterEach(function () {
    });

    describe("init", function () {
        it("获得方法上下文、方法、传入方法的参数数组", function () {
        });
    });

    describe("update", function () {
        it("如果方法为空，则直接完成动作", function () {
            sinon.stub(action, "finish");

            action.update();

            expect(action.finish.calledOnce).toBeTruthy();
        });

        describe("否则", function () {
            var context = null,
                func = null,
                data = null,
                target = null;

            beforeEach(function () {
                context = {};
                func = sinon.createSpyObj("call");
                data = [];
                target = {a: 1};
                action = getInstance(context, func, data);
                sinon.stub(action, "getTarget").returns(target);
            });

            it("调用方法，设置其上下文为context，并传入target和参数数组", function () {
                action.update();

                expect(func.call.calledWith(context, target, [data])).toBeTruthy();
            });
            it("完成动作", function () {
                sinon.stub(action, "finish");

                action.update();

                expect(action.finish.calledOnce).toBeTruthy();
            });
        });
    });

    describe("copy", function () {
        it("返回动作副本", function () {
            var a = action.copy();

            expect(a).toBeInstanceOf(YE.CallFunc);
            expect(a === action).toBeFalsy();

        });
        it("传入的参数要进行深拷贝", function () {
            var data = {a: 1};
            action = getInstance(null, null, data);

            var a = action.copy();
            a.forTest_getDataArr()[0].a = 100;

            expect(data.a).toEqual(1);
        });
    });


    describe("create", function () {
//        it("传入方法的参数为原参数的副本", function () {
//            var args1 = [1, 2],
//                args2 = {a: 1};
//
//            action = YE.CallFunc.create(null, null, args1, args2);
//            action.forTest_getDataArr()[0][0] = 100;
//            action.forTest_getDataArr()[1].a = 100;
//
//            expect(args1[0]).toEqual(1);
//            expect(args2.a).toEqual(1);
//        });
        it("创建实例并返回", function () {
            expect(YE.CallFunc.create()).toBeInstanceOf(YE.CallFunc);
        });
        it("初始化动作", function () {
        });
    });
});
   