describe("Layer.js", function () {
    var layer = null;
        //game = null;
    
    //因为Layer为抽象类，因此不能直接实例化，而是通过获得子类的实例。
    function getInstance() {
        var T = YYC.Class(Layer, {
            Init: function(){
                //this.base();
            },
            //Protected: {
            //    P__createCanvas: function () {
            //        var canvas = $("<canvas/>");
            //        $("body").append(canvas);

            //        this.P__canvas = canvas[0];
            //    }
            //},
            Public: {
                //init:　function(){},
                change: function(){},
                setCanvas: function () {},
                //统一绘制
                draw: function () { },
                ////清除画布
                //clear: function () { },
                //游戏主线程调用
                run: function () { }
            }
        });

        return new T();
    };

    //function clearCanvas() {
    //    $("body canvas").remove();
    //};

    beforeEach(function () {
        //game = new Game();
        layer = getInstance();
    });
    afterEach(function () {
        //clearCanvas();
    });

    //it("Layer继承Collection", function () {
    //    layer = new Layer(game.createCanvas("__canvas"));

    //    expect(layer).toBeInstanceOf(Collection);
    //});

    describe("Init", function () {
        //it("传入canvas。参数可以为id值或canvas对象", function () {
        //    var canvas = null,
        //        layer1 = null,
        //        layer2 = null;

        //    canvas = game.createCanvas("__canvas");

        //    layer1 = new Layer(canvas);
        //    layer2 = new Layer("__canvas");

        //    expect(layer1.__canvas).toBeExist();
        //    expect(layer2.__canvas).toBeExist();
        //});
        //    it("取得2d绘图上下文", function () {
        //        var canvas = game.createCanvas("__canvas");

        //        layer = new Layer(canvas);

        //        expect(layer.__context).toBeExist();
        //    });


       
    });

    //describe("change", function () {
    //    it("改变P__state为bomberConfig.layer.state.CHANGE", function () {
    //        layer.setStateNormal();

    //        //默认为NORMAL状态
    //        expect(layer.P__isNormal()).toBeTruthy();

    //        layer.change();

    //        expect(layer.P__isChange()).toBeTruthy();
    //    });
    //});

    describe("addSprites", function () {
        it("调用父类appendChilds", function () {
            spyOn(layer, "appendChilds");
            var fakeElements = [];

            layer.addSprites(fakeElements);

            expect(layer.appendChilds).toHaveBeenCalledWith(fakeElements);
        });
    });

    //describe("setCanvas", function () {
    //    it("方法存在", function () {
    //        expect(layer.setCanvas).toBeDefined();
    //    });

    //    describe("如果参数存在", function () {
    //        it("如果参数不为canvas元素，则抛出异常", function () {
    //            var canvas = "canvas";

    //            expect(function () {
    //                layer.setCanvas(canvas);
    //            }).toThrow();
    //        });
    //        it("获得P__canvas", function () {
    //            var canvas = $("<canvas/>")[0];

    //            layer.setCanvas(canvas);

    //            expect(layer.P__canvas).toBeExist();
    //        });
    //        it("设置width、height", function () {

    //        });
    //        it("设置css", function () {

    //        });
    //    });

    //    //describe("如果参数不存在", function () {
    //    //    it("调用抽象保护方法P__createCanvas，该方法由子类实现", function () {
    //    //        spyOn(layer, "P__createCanvas");

    //    //        layer.setCanvas();

    //    //        expect(layer.P__createCanvas).toHaveBeenCalled();
    //    //    });
    //    //});
    //});

    //describe("clear", function () {
    //    beforeEach(function () {
    //        layer.setCanvas();
    //        layer.init();
    //    });

    //    it("清除画布全部区域", function () {
    //        spyOn(layer.P__context, "clearRect");

    //        layer.clear();

    //        expect(layer.P__context.clearRect).toHaveBeenCalledWith(0, 0, bomberConfig.canvas.WIDTH, bomberConfig.canvas.HEIGHT);
    //    });
    //});

    describe("init", function () {
        function getFakeCanvas(layer) {
            layer.P__canvas = {
                getContext: function () {
                    return {};
                }
            }
        };

        it("获得context", function () {
            //layer.setCanvas();
            getFakeCanvas(layer);

            layer.init();

            expect(layer.P__context).toBeExist();
        });
    });

    describe("clear", function () {
        var sprite1 = null,
            sprite2 = null;

        beforeEach(function () {
            sprite1 = {
                clear: function () { }
            };
            sprite2 = {
                clear: function () { }
            };
            layer.appendChild(sprite1);
            layer.appendChild(sprite2);
        });

        describe("函数重载：参数为0个", function () {
            it("调用每个精灵类的clear，传入参数context", function () {
                //var sprite1 = spriteFactory.createPlayer(),
                //    sprite2 = spriteFactory.createPlayer(),
                //fakeContext = {};
                spyOn(sprite1, "clear");
                spyOn(sprite2, "clear");

                //layer.appendChild(sprite1);
                //layer.appendChild(sprite2);
                layer.clear();

                expect(sprite1.clear).toHaveBeenCalledWith(layer.P__context);
                expect(sprite2.clear).toHaveBeenCalledWith(layer.P__context);
            });
        });

        describe("函数重载：参数为1个", function () {
            it("调用精灵类的clear，传入参数P__context", function () {
                //var sprite1 = spriteFactory.createPlayer(),
                //    sprite2 = spriteFactory.createPlayer(),
                //fakeContext = {};
                spyOn(sprite1, "clear");

                //layer.appendChild(sprite1);
                //layer.appendChild(sprite2);
                layer.clear(sprite1);

                expect(sprite1.clear).toHaveBeenCalledWith(layer.P__context);
            });
        });
    });
});