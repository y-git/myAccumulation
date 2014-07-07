//Array.prototype.remove = function (obj) {
//    var index = this.indexOf(function (e) {
//        console.log(e);
//        return YYC.Tool.judge.isEqual(e, obj);
//    });
//    console.log("index = ", index);

//    this.splice(index, 1);
//};


describe("object_extend.js", function () {
    describe("Array", function () {
        describe("indexOf", function () {
            it("返回满足条件的元素的位置", function () {
                var result = [{ type: "a", num: 1 }, { type: "b", num: 2 }];

                var index = result.indexOf(function (value, index) {
                    if (value.type == "b") {
                        return index;
                    }
                    else {
                        return false;
                    }
                });

                expect(index).toEqual(1);
            });
        });

        describe("remove", function () {
            it("删除数组中调用func返回true的元素。参数为：判断函数func（func的this指向数组），比较对象obj", function () {
                var arr = [1, 2, { x: 1, y: { a: 1 }, z: 1 }, { x: 1, y: { a: 1 }, z: 2 }];

                arr.remove(function (e, obj) {
                    //console.log(this);
                    return e.x === obj.x;
                }, { x: 1, y: { a: 1 }, z: 1 });

                expect(arr).toEqual([1, 2, { x: 1, y: { a: 1 }, z: 2 }]);
            });
            it("如果数组中所有元素调用func返回false，则不删除元素", function () {
                var arr = [1, 2, { x: 1, y: { a: 1 }, z: 1 }, { x: 2, y: { a: 1 }, z: 2 }];

                arr.remove(function (e, obj) {
                    return e.x === obj.x;
                }, { x: 3, y: { a: 1 }, z: 1 });

                expect(arr).toEqual([1, 2, { x: 1, y: { a: 1 }, z: 1 }, { x: 2, y: { a: 1 }, z: 2 }]);
            });
        });
    });
});