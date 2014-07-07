describe("Bitmap.js", function () {
    var bitmap = null;

    beforeEach(function () {
    });
    afterEach(function () {
    });

    //it("使用时要创建实例", function () {
    //    bitmap = new new Bitmap($("#test_img")[0], 2, 3);

    //    //实例没有prototype属性，而类（函数）有prototype属性
    //    expect(bitmap.prototype).toBeUndefined();
    //});

    describe("构造函数", function () {
        var dom = null;

        function insertDom() {
            dom = $("<img id='test_img'>");
            $("body").append(dom);
        };
        function removeDom() {
            dom.remove();
        };

        beforeEach(function () {
            insertDom();
        });
        afterEach(function () {
            removeDom();
        });

        //it("传入的参数为htmlImage对象、width、height，如果参数错误会抛出异常", function () {
        //    expect(function () {
        //        bitmap = new Bitmap(1, 2, 3);
        //    }).toThrow();
        //    expect(function () {
        //        bitmap = new Bitmap($("#test_img")[0], "2", 3);
        //    }).toThrow();
        //    expect(function () {
        //        bitmap = new Bitmap($("#test_img")[0], 2, "3");
        //    }).toThrow();
        //    expect(function () {
        //        bitmap = new Bitmap($("#test_img")[0], 2, 3);
        //    }).not.toThrow();
        //});
        //it("获得img、width、height", function () {
        //    bitmap = new Bitmap($("#test_img")[0], 2, 3);

        //    expect(bitmap.img).not.toBeNull();
        //    expect(bitmap.width).toEqual(2);
        //    expect(bitmap.height).toEqual(3);
        //});
    });
});