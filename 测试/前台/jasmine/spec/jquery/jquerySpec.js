/**jQuery 测试
 * 作者：YYC
 * 日期：2014-05-05
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
describe("jQuery", function () {
    var tool = YYC.Tool;

    beforeEach(function () {
        $("<div id='testJQuery_div'><span id='testJQuery_span'></span></div>").appendTo($("body"));
    });
    afterEach(function () {
        $("#testJQuery_div").remove();
    });

    describe("将js数组转换为jquery集合", function () {
        it("数组元素要为dom元素！", function () {
            var arr = [document.getElementById("testJQuery_div"), document.getElementById("testJQuery_span")];

            var obj = $(arr);

            expect(function () {
                obj.clone();
            }).not.toThrow();

            expect(function () {
                $([$("#testJQuery_div")]).clone();
            }).toThrow();
        });
    });

    describe("add，向集合中加入元素", function () {
        beforeEach(function () {
        });
        afterEach(function () {
        });

        it("只能加入一次，第2次及以后再调用add无效", function () {
            var t = $().add($("#testJQuery_div"));

            expect(t.length).toEqual(1);

            t.add($("#testJQuery_div"));

            expect(t.length).toEqual(1);
        });
    });

    it("事件handle的e.target为dom元素", function () {
        $("#testJQuery_div").click(function (e) {
            expect(tool.judge.isDom(e.target)).toBeTruthy();
        });
    });

});
