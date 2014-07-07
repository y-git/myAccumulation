///**YEngine2D
// * 作者：YYC
// * 日期：2013-12-21
// * 电子邮箱：395976266@qq.com
// * QQ: 395976266
// * 博客：http://www.cnblogs.com/chaogex/
// */
//describe("Main.js", function () {
//    var main = null;
//
//    function getInstance() {
//        var T = YYC.Class(YE.Main, {
//            Init: function () {
//                this.base();
//            },
//            Public: {
//                onload: function () {
//                }
//            }
//        });
//
//        return new T();
//    }
//
//    beforeEach(function () {
//        main = getInstance();
//    });
//    afterEach(function () {
//    });
//
//    describe("构造函数", function () {
//        it("创建imgLoader实例", function () {
//            expect(getInstance().imgLoader).toBeInstanceOf(YE.ImgLoader);
//        })
//    });
//
//    describe("init", function () {
//        it("加载资源，调用钩子方法", function () {
//            spyOn(main.imgLoader, "done");
//            spyOn(main, "loadResource");
//
//            main.init();
//
//            expect(main.loadResource).toHaveBeenCalled();
//            expect(main.imgLoader.done).toHaveBeenCalled();
//        });
//        it("onload指向Main", function () {
//            var FakeMain = YYC.Class(YE.Main, {
//                Public: {
//                    a: jasmine.createSpy(),
//                    onload: function () {
//                        this.a();
//                    }
//                }
//            });
//            var main = new FakeMain();
//            spyOn(main.imgLoader, "done");
//
//            main.init();
//            main.imgLoader.onload_game();
//
//            expect(main.a).toHaveBeenCalled();
//        });
//    });
//
//    describe("外部钩子", function () {
//        beforeEach(function () {
//        });
//        afterEach(function () {
//        });
//
//        it("loadResource存在", function () {
//            expect(main.loadResource).toBeExist();
//        });
//        it("onload存在", function () {
//            expect(main.onload).toBeExist();
//        });
//    });
//});