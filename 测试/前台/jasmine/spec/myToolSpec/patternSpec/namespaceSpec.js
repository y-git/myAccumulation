describe("namespace.js", function () {

    var namespace = YYC.namespace;

    function clearNamespace(space, reserveSpace) {
        var i;

        for (i in space) {
            if (space.hasOwnProperty(i)) {
                if (i === reserveSpace) {
                    continue;
                }
                delete space[i];
            }
        }
    };

//    YYC.T = {};
//    YYC.M = {};
//    var t = YYC.T;
//    console.log(YYC.T === {});
//    console.log(YYC.T === t);

    beforeEach(function () {
        //        player = new Player();
        //        song = new Song();

        //        spyOn(operate, 'IsHostMethod').andCallThrough();
        //        value1 = YYC.Tool.judge.isHostMethod($("#test")[0], "addEventListener");
        //        value2 = YYC.Tool.judge.isHostMethod($("#test")[0], "attachEvent");
    });
    afterEach(function () {
        //console.log(YYC);
    });



    //it("测试YYC.Tool存在", function () {
    //    expect(YYC.Tool).toBeDefined();
    //});

    it("测试namespace方法存在", function () {
        expect(YYC.namespace).toBeFunction();
    });

    it("测试命名空间不能为空", function () {
        expect(namespace).toThrow();
    });


    it("测试创建单个命名空间成功", function () {
        namespace("Button");

        expect(YYC.Button).toBeDefined();

        //        YYC.Control.Button = undefined;
    });

    //    it("测试YYC.Control.Button存在", function () {
    //        expect(YYC.Control.Button).toBeDefined();
    //    });

    it("测试创建多个命名空间成功", function () {
        namespace("Tool.Button");
        namespace("Tool.Button.Test");

        expect(YYC.Tool.Button).toBeDefined();
        expect(YYC.Tool.Button.Test).toBeDefined();

        clearNamespace(YYC, "Tool");
    });

    it("测试返回命名空间", function () {
        var button = namespace("Button");

        expect(button).toEqual({});

        clearNamespace(YYC, "Button");
    });
    it("测试返回的命名空间可以使用", function () {
        var button = namespace("Tool.Button");

        expect(YYC.Tool.Button.test).not.toBeDefined();

        button.test = function () {
        };

        expect(YYC.Tool.Button.test).toBeFunction();

        clearNamespace(YYC.Tool, "Button");
    });
    it("测试第一个命名空间如果是YYC，则忽略并继续", function () {
        //        var func = test.bindWithArguments(YYC, namespace, "YYC")
        //        func();
        namespace("YYC");

        expect(YYC.YYC).not.toBeDefined();
    });
    it("如果使用namespace创建的命名空间已经存在，则直接返回该命名空间", function () {
        YYC.test = {};
        YYC.test.a = 1;

        namespace("test").b = 2;;

        expect(YYC.test.a).toEqual(1);
        expect(YYC.test.b).toEqual(2);
    });
});