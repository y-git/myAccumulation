/**YEngine2D
 * 作者：YYC
 * 日期：2013-01-20
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
describe("Tool.js", function () {
    var tool = YE.Tool;
    var sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("调试", function () {
        it("YE增加属性testReturn", function () {
            expect(YE.returnForTest).toBeExist();
        });

        describe("log", function () {
            //手动测试
            it("如果配置为调试状态和在页面上显示调试信息，则调试信息显示在页面上", function () {
//                var fake = sinon.fake.createObj("YE.Config");
//                fake.replace({
//                    IS_SHOW_DEBUG_ON_PAGE: true,
//                                    DEBUG: true
//                });
//
//                YE.log("调试信息");
//                YE.log("调试信息2");
//
//                fake.restore();
            });
        });

        describe("assert", function () {
            describe("如果配置为调试状态", function () {
                beforeEach(function () {
                    sandbox.stub(YE.Config, "DEBUG", true);
                });


                it("如果console.assert方法存在，则调用该方法", function () {
                    var t = 1;
                    sandbox.stub(console, "assert", sandbox.spy());

                    YE.assert(t !== 1, "断言信息");

                    expect(console.assert.args[0][1]).toEqual(("断言信息"));
                });
                it("否则，如果console.log存在，则调用console.log", function () {
                    var t = 1;
                    sandbox.stub(console, "assert", undefined);
                    sandbox.stub(console, "log", sandbox.spy());

                    YE.assert(t !== 1, "断言信息");
                    YE.assert(t === 1);

                    expect(console.log.calledOnce).toBeTruthy();
                    expect(console.log.args[0][0]).toEqual(("断言：断言信息"));
                });
                it("否则，调用alert", function () {
                    var t = 1;
                    sandbox.stub(console, "assert", undefined);
                    sandbox.stub(console, "log", undefined);
                    sandbox.stub(window, "alert", sandbox.spy());

                    YE.assert(t !== 1, "断言信息");
                    YE.assert(t === 1);

                    expect(window.alert.calledOnce).toBeTruthy();
                    expect(window.alert.args[0][0]).toEqual(("断言：断言信息"));
                });
            });
        });

        describe("error", function () {
            it("如果发生错误，则抛出异常并终止程序", function () {
                expect(function () {
                    YE.error(true, "error");
                }).toThrow("error");
            })
        });
    });
});