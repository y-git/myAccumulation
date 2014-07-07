window.glo = 1;

describe("asyn.js", function () {
    describe("sleep", function () {
        function a() {
            window.glo = 2;
        };


        it("阻塞线程一段时间（毫秒）（因为javascript是单线程！）", function () {
            var now = new Date();

            //延迟100ms
            testTool.asynRun(function () {
                expect(Math.floor((new Date().getTime() - now.getTime()) / 100)).toEqual(2)
            },100);

            //阻塞100ms
            YYC.Tool.asyn.sleep(100);
        });
    });
});