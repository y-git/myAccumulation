/**YEngine2D
 * 作者：YYC
 * 日期：2014-02-25
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
describe("ImgLoader", function () {
    var loader = null,
        Loader = YE.ImgLoader;

    beforeEach(function () {
        loader = Loader.getInstance();
    });
    afterEach(function () {
        Loader.forTest_clearInstance();
    });

    describe("该类为单例类", function () {
        testTool.judgeSingleInstance(Loader);
    });

    describe("ye_P_load", function () {
        var fakeImg = null;

        it("创建图片对象", function () {
            spyOn(window, "Image");

            loader.ye_P_load("../a.png");

            expect(window.Image).toHaveBeenCalled();
        });

        describe("测试onload、onerror", function () {
            beforeEach(function () {
                fakeImg = {
                    onload: function () {
                    },
                    onerror: function () {
                    }
                };
                spyOn(window, "Image").andReturn(fakeImg);
            });


            it("图片加载完成后，令onload为空，调用LoaderManager的onResLoaded方法", function () {
                var fakeLoaderManager = jasmine.createSpyObj("", ["onResLoaded"]);
                spyOn(YE.LoaderManager, "getInstance").andReturn(fakeLoaderManager);

                loader.ye_P_load("../a.png");

                fakeImg.onload();
                expect(fakeImg.onload).toBeNull();
                expect(fakeLoaderManager.onResLoaded).toHaveBeenCalled();
            });

            describe("将图片对象保存在容器中", function () {

            });

            it("如果加载失败，调用LoaderManager的onResError方法", function () {
                var fakeLoaderManager = jasmine.createSpyObj("", ["onResError"]);
                spyOn(YE.LoaderManager, "getInstance").andReturn(fakeLoaderManager);

                loader.ye_P_load("../a.png");

                fakeImg.onerror();
                expect(fakeLoaderManager.onResError).toHaveBeenCalled();
            });
        });

        it("设置图片的加载路径", function () {
            var fakeImgPath = "../a.png";
            fakeImg = {};
            spyOn(window, "Image").andReturn(fakeImg);

            loader.ye_P_load(fakeImgPath);

            expect(fakeImg.src).toEqual(fakeImgPath);
        });
    });
});
