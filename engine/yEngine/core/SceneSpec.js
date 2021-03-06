/**YEngine2D
 * 作者：YYC
 * 日期：2013-12-28
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
describe("Scene.js", function () {
    var scene = null;
    var sandbox = null;

    function getInstance() {
        return YE.Scene.create();
    }

    beforeEach(function () {
        scene = getInstance();
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("ye_P_run", function () {
        it("调用每个layer的run方法", function () {
            spyOn(scene, "iterator");

            scene.ye_P_run();

            expect(scene.iterator).toHaveBeenCalledWith("run");
        });
    });

    describe("addChilds", function () {
        it("设置layer的zIndex为zOrder", function () {
            var layers = sandbox.createSpyObj("map");
            scene.stubParentMethodByAClass(sandbox, "addChilds");

            scene.addChilds(layers, 10);

            expect(layers.map.calledWith("setZIndex", 10)).toBeTruthy();
        });
    });

    describe("addChild", function () {
        it("设置每个layer的zIndex为zOrder", function () {
            var layer = sandbox.createSpyObj("setZIndex");
            scene.stubParentMethodByAClass(sandbox, "addChild");

            scene.addChild(layer, 10);

            expect(layer.setZIndex.calledWith(10)).toBeTruthy();
        });
    });

    describe("startLoop", function () {
        beforeEach(function () {
            sandbox.stub(scene, "iterator");
            sandbox.stub(scene, "onstartLoop");
        });

        it("调用onstartLoop", function () {
            scene.startLoop();

            expect(scene.onstartLoop.calledOnce).toBeTruthy();
        });
        it("调用每个layer的startLoop", function () {
            scene.startLoop();

            expect(scene.iterator.calledWith("startLoop")).toBeTruthy();
        });
        it("先调用自己的onstartLoop，再调用每个layer的startLoop", function(){
            scene.startLoop();

            expect(scene.iterator.calledAfter(scene.onstartLoop)).toBeTruthy();
        });
    });

    describe("endLoop", function () {
        beforeEach(function () {
            sandbox.stub(scene, "iterator");
            sandbox.stub(scene, "onendLoop");
        });

        it("调用onendLoop", function () {
            scene.endLoop();

            expect(scene.onendLoop.calledOnce).toBeTruthy();
        });
        it("调用每个layer的endLoop", function () {
            scene.endLoop();

            expect(scene.iterator.calledWith("endLoop")).toBeTruthy();
        });
        it("先调用每个layer的endLoop，再调用自己的onendLoop", function(){
            scene.endLoop();

            expect(scene.iterator.calledBefore(scene.onendLoop)).toBeTruthy();
        });
    });
});
