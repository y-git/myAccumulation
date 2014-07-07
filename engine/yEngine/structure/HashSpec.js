/**YEngine2D
 * 作者：YYC
 * 日期：2013-12-28
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
describe("Hash.js", function () {
    var hash = null;

    //因为Hash为抽象类，因此不能直接实例化，而是通过获得子类的实例。
    function getInstance() {
        return YE.Hash.create();
    }

    beforeEach(function () {
        hash = getInstance();
    });
    afterEach(function () {
    });

    describe("getChilds", function () {
        it("获得容器", function () {
            hash.add("a1", 1);
            var childs = hash.getChilds();

            expect(childs).toBeSameArray(hash.ye_childs);
            expect(childs.a1).toEqual(1);
        });
    });

    describe("getValue", function () {
        it("根据key获得value", function () {
            hash.ye_childs = {"a1": 1};
            var value = hash.getValue("a1");

            expect(value).toEqual(1);
        });
    });

    describe("add", function () {
        it("加入到容器中，参数为：key，value", function () {
            var value1 = null,
                value2 = null;

            hash.add("a1", "1").add("a2", 2);
            value1 = hash.getValue("a1");
            value2 = hash.getValue("a2");

            expect([value1, value2]).toEqual(["1", 2]);
        });
        it("如果容器中已有键为key的值了，则覆盖该key", function () {
            var value1 = null;

            hash.add("a1", "1");
            hash.add("a1", 2);
            value = hash.getValue("a1");

            expect(value).toEqual(2);
        });
    });

    describe("append", function(){
        it("如果容器中没有键为key的值，则将该key的值设为数组并加入", function(){
            var value = null;

            hash.append("a1", "1");
            value = hash.getValue("a1");

            expect(value).toEqual(["1"]);
        });
        it("否则，则将该key的值加入到数组最后", function(){
            var value = null;

            hash.append("a1", "1");
            hash.append("a1", "2");
            value = hash.getValue("a1");

            expect(value).toEqual(["1", "2"]);
        });
    });


    describe("remove", function () {
        it("从容器中删除元素", function () {
            hash.add("a", {});

            hash.remove("a");

            expect(hash.getValue("a")).toBeUndefined();
        });
    });

    describe("iterator", function () {
        var sprite1 = null,
            sprite2 = null;

        beforeEach(function () {
            sprite1 = jasmine.createSpyObj("", ["clear"]);
            sprite2 = jasmine.createSpyObj("", ["clear"]);
            hash.add("a", sprite1);
            hash.add("b", sprite2);
        });

        it("迭代调用集合内元素的方法", function () {
            hash.iterator("clear", 1, 2);

            expect(sprite1.clear).toHaveBeenCalledWith(1, 2);
            expect(sprite2.clear).toHaveBeenCalledWith(1, 2);
        });
    });
});