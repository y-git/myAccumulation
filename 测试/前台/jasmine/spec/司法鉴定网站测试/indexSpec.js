describe("index.js", function () {
    beforeEach(function () {
    });

    afterEach(function () {
    });

    function spyOn_jump() {
        //        //使用间谍模拟jump函数，以免真的跳转了。
        //        spyOn(Tool, "jump").andCallFake(function () {
        //        });

        //jump不执行
        spyOn(tool, "jump");
    };

    describe("showSecond", function () {
        beforeEach(function () {
            spyOn_jump();
        });

        afterEach(function () {
        });

        it("测试拥有showSecond方法", function () {
            expect(index.showSecond).not.toBeUndefined();
        });

        it("测试set成功", function () {
            var cookieName = "AboutBoDa_BoDa";
            var value = "";
            var result = "";

            index.showSecond(cookieName);
            result = tool.getCookie(cookieName);

            expect(result).toEqual(value);

            tool.clearCookie(cookieName);
        });
    });


    describe("showDetail", function () {
        beforeEach(function () {
            spyOn_jump();
        });

        afterEach(function () {
        });

        it("测试拥有showDetail方法", function () {
            expect(index.showDetail).not.toBeUndefined();
        });

        it("测试cookie Set成功", function () {
            var cookieName = "AboutBoDa_BoDaDetail_Id";
            var value = "test_id";
            var result = "";

            index.showDetail("test_id");
            result = tool.getCookie(cookieName);

            expect(result).toEqual(value);

            tool.clearCookie(cookieName);
        });

    });
});