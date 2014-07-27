/**YEngine2D
 * 作者：YYC
 * 日期：2014-01-22
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
describe("Spawn", function () {
    var action = null;
    var fake1 = null,
        fake2 = null,
        fake3 = null;
    var sandbox = null;

    function build(spyMethod) {
        var args = Array.prototype.slice.call(arguments, 0);

        fake1 = jasmine.createSpyObj("", args);
        fake2 = jasmine.createSpyObj("", args);
        fake3 = jasmine.createSpyObj("", args);

        action.forTest_init([fake1, fake2, fake3]);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        action = YE.Spawn.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

//    describe("init", function () {
//        var fake1 = {},
//            fake2 = {
//                a: 1
//            }       ,
//            fake3 = {
//                b: 2
//            };
//
//        beforeEach(function () {
//        });
//
//        it("获得第1部分动作和第2部分动作。" +
//            "其中第2部分只包含最后一个动作，而第1部分包含它之前的所有动作", function () {
//            action.forTest_init([fake1, fake2, fake3]);
//
//            expect(action.forTest_getOne()).toEqual([fake1, fake2]);
//            expect(action.forTest_getTwo()).toEqual(fake3);
//        });
//    });

    describe("setTarget", function () {
        it("调用父类同名方法", function () {
        });
        it("设置每个动作的target", function () {
            var target = {};
            var fakeAction1 = sinon.createSpyObj("setTarget"),
                fakeAction2 = sinon.createSpyObj("setTarget");
            action.forTest_init([fakeAction1, fakeAction2]);

            action.setTarget(target);

            expect(fakeAction1.setTarget.calledWith(target));
            expect(fakeAction2.setTarget.calledWith(target));
        });
    });

    describe("update", function () {
        it("调用每个动作的update", function () {
            build("update");

            action.update(1);

            expect(fake1.update).toHaveBeenCalled();
            expect(fake2.update).toHaveBeenCalled();
            expect(fake3.update).toHaveBeenCalled();
        });
    });

//    describe("getTarget", function () {
//        it("获得所有动作的target，返回数组", function () {
//            var target1 = {},
//                target2 = {a: 1},
//                target3 = {b: 1};
//            build("getTarget");
//            sinon.stub(fake1, "getTarget").returns(target1);
//            sinon.stub(fake2, "getTarget").returns(target2);
//            sinon.stub(fake3, "getTarget").returns(target3);
//
//            var target = action.getTarget();
//
//            expect(target).toEqual([target1, target2, target3]);
//        });
//    });

    describe("start", function () {
        it("调用父类同名方法", function () {
        });
        it("调用所有动作的start", function () {
            build("start");

            action.start();

            expect(fake1.start).toHaveBeenCalled();
            expect(fake2.start).toHaveBeenCalled();
            expect(fake3.start).toHaveBeenCalled();
        });
    });

    describe("stop", function () {
        it("调用父类同名方法", function () {
        });
        it("调用所有动作的stop", function () {
            build("stop");

            action.stop();

            expect(fake1.stop).toHaveBeenCalled();
            expect(fake2.stop).toHaveBeenCalled();
            expect(fake3.stop).toHaveBeenCalled();
        });
    });

    describe("reverse", function () {
        it("调用父类同名方法", function () {
        });
        it("调用所有动作的reverse", function () {
            build("reverse");

            action.reverse();

            expect(fake1.reverse).toHaveBeenCalled();
            expect(fake2.reverse).toHaveBeenCalled();
            expect(fake3.reverse).toHaveBeenCalled();
        });
    });

    describe("copy", function () {
        var copyAction = null;
        var one = null,
            two = null;

        beforeEach(function () {
            one = [
                {}
            ];
            two = {};
            action.ye___one = one;
            action.ye___two = two;
            copyAction = {};
            sandbox.stub(action, "forTest_getInstance").returns(copyAction);
        });

        it("动作序列要进行拷贝", function () {
            sandbox.stub(YYC.Tool.extend, "extendDeep");

            var c = action.copy();

            expect(YYC.Tool.extend.extendDeep.calledWith(one.concat([two]))).toBeTruthy();
        });
        it("返回动作副本", function () {
            var c = action.copy();

            expect(c === copyAction).toBeTruthy();
        });
    });

    describe("create", function () {
        beforeEach(function () {
        });

        it("如果参数小于2，则断言", function () {
            var sandbox = sinon.sandbox.create();
            sandbox.stub(YE.main, "getConfig").returns({
                debug: true
            });

            expect(function () {
                YE.Spawn.create({});
            }).toAssert();
            expect(function () {
                YE.Spawn.create({}, {});
            }).not.toAssert();
            expect(function () {
                YE.Spawn.create({}, {}, {});
            }).not.toAssert();

            sandbox.restore();
        });
        it("创建实例并返回", function () {
            expect(YE.Spawn.create({})).toBeInstanceOf(YE.Spawn);
        });
        it("初始化动作", function () {
        });
    })
});

