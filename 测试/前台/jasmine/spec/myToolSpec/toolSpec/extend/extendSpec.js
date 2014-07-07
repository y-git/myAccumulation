
describe("extend.js", function () {
    var extend = YYC.Tool.extend;

    describe("extendDeep", function () {
        it("如果拷贝对象为数组，能够成功拷贝（不拷贝Array原型链上的成员）", function () {
            var parent = [1, { x: 1, y: 1 }, "a", { x: 2 }, [2]];
            var result = null;

            result = extend.extendDeep([1, { x: 1, y: 1 }, "a", { x: 2 }, [2]]);

            expect(result.length).toEqual(5);
            expect(result).toEqual([1, { x: 1, y: 1 }, "a", { x: 2 }, [2]]);
        });
    
        it("如果拷贝对象为对象，能够成功拷贝（能拷贝原型链上的成员）", function () {
            var result = null;
            function A() {
            };
            A.prototype.a = 1;

            function B() {
            };
            B.prototype = new A();
            B.prototype.b = { x: 1, y: 1 };
            B.prototype.c = [{ x: 1 }, [2]];

            var t = new B();

            result = extend.extendDeep(t);

            expect(result).toEqual(
                {
                    a: 1,
                    b: { x: 1, y: 1 },
                    c: [{ x: 1 }, [2]]
                });
        });
    });

});