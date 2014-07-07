/**HTML5 测试
 * 作者：YYC
 * 日期：2014-05-02
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
describe("localStorage", function () {
    beforeEach(function () {
        localStorage.clear();

    });

    describe("读取与写入", function () {
        it("读取与写入json数据", function () {
            var tool = YYC.Tool;
            var jsonData = {
                "a": 1,
                "b": "q",
                "c": {}
            };

            localStorage.setItem("a", tool.convert.toString(jsonData));
            var data = tool.convert.toObject(localStorage.getItem("a"));

            expect((data.a)).toEqual(1);
        });
        it("测试1", function () {
            localStorage.setItem("a", 100);

            expect(localStorage.getItem("a")).toEqual("100");
            expect(localStorage.a).toEqual("100");
        });
        it("测试2", function () {
            localStorage[0] = 2;
            localStorage[1] = 3;
            localStorage.m = 1;

            expect(localStorage.getItem("m")).toEqual("1");
            expect(localStorage[0]).toEqual("2");
            expect(localStorage[1]).toEqual("3");
        });
    });

    it("删除指定key", function () {
        localStorage.setItem("a", 100);
        localStorage[0] = 1;

        localStorage.removeItem("a");
        localStorage.removeItem("0");

        expect(localStorage.getItem("a")).toBeNull();
        expect(localStorage[0]).toBeUndefined();
    });
    it("清除所有本地存储", function () {
        localStorage.setItem("a", 100);
        localStorage.setItem("b", 200);

        localStorage.clear();

        expect(localStorage.getItem("a")).toBeNull();
        expect(localStorage.getItem("b")).toBeNull();
    });
    it("获得键值对数量", function () {
        localStorage.setItem("a", 100);
        localStorage.setItem("b", 200);

        expect(localStorage.length).toEqual(2);
    });

    describe("key(index),返回指定序号的key，序号从0开始", function () {
        it("测试1", function () {
            localStorage.setItem("a", 1);
            localStorage.setItem("b", 2);

            expect(localStorage.key(0)).toEqual("a");
            expect(localStorage.key(1)).toEqual("b");
        });
        it("测试2", function () {
            localStorage.setItem("a", 1);
            localStorage[0] = 2;
            localStorage.b = 3;

            expect(localStorage.key(0)).toEqual("0");
            expect(localStorage.key(1)).toEqual("a");
            expect(localStorage.key(2)).toEqual("b");
        });
    });

    it("chrome不支持onstorage事件", function () {
    });
});
