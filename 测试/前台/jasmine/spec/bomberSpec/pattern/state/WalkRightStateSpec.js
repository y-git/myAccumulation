//describe("WalkRightState.js", function () {
//    var state = null;
//    var context = null;
//    var terrainData = testTool.extendDeep(window.terrainData),
//          bomberConfig = testTool.extendDeep(window.bomberConfig);

//    function buildFakeTerrainData() {
//        var pass = bomberConfig.map.terrain.pass,
//            stop = bomberConfig.map.terrain.stop;

//        window.terrainData = [
//            [pass, stop, pass, pass],
//            [pass, stop, pass, pass],
//            [pass, pass, pass, pass],
//            [pass, pass, pass, pass]
//        ];
//    };
//    //假的动作图片尺寸
//    function fakeImgWidthAndHeight(width, height) {
//        window.bomberConfig.player.IMGWIDTH = width;
//        window.bomberConfig.player.IMGHEIGHT = height;
//    };
//    //假的地图方格尺寸
//    function fakeWidthAndHeight(width, height) {
//        window.bomberConfig.WIDTH = width;
//        window.bomberConfig.HEIGHT = height;
//    };
//    function restore() {
//        window.terrainData = terrainData;
//        window.bomberConfig.WIDTH = bomberConfig.WIDTH;
//        window.bomberConfig.HEIGHT = bomberConfig.HEIGHT;
//        window.bomberConfig.player.IMGWIDTH = bomberConfig.player.IMGWIDTH;
//        window.bomberConfig.player.IMGHEIGHT = bomberConfig.player.IMGHEIGHT;
//    };

//    beforeEach(function () {
//        //fakeContext = getFakeContext();
//        context = new Context(spriteFactory.createPlayer());
//        state = new WalkRightState();
//        state.setContext(context);
//    });
//    afterEach(function () {
//        //clearKeyState();
//    });

//    describe("walkRight", function () {
//        it("context.sprite的动画为walk_right", function () {
//            spyOn(context.sprite, "setAnim");

//            state.walkRight();

//            expect(context.sprite.setAnim).toHaveBeenCalledWith("walk_right");
//        });
//        describe("如果不可通过地图", function () {
//            beforeEach(function () {
//                spyOn(state, "checkPassMap").andReturn(false);
//            });

//            it("sprite.moving为false，sprite.dirX为0", function () {
//                var sprite = context.sprite;
//                sprite.moving = true;
//                sprite.dirX = 1;

//                state.walkRight();

//                expect([sprite.moving, sprite.dirX]).toEqual([false, 0]);
//            });
//            it("返回", function () {
//                state.P_context.sprite.dirX = 0;

//                state.walkRight();

//                //函数已返回，后面代码不执行。
//                expect(state.P_context.sprite.dirX).toEqual(0);
//            });
//        });

//        describe("如果可以通过地图", function () {
//            beforeEach(function () {
//                spyOn(state, "checkPassMap").andReturn(true);
//            });

//            it("context.sprite的行走方向为右", function () {
//                state.walkRight();

//                expect(context.sprite.dirX).toEqual(1);
//            });
//            it("context.sprite的Y方向速度为0", function () {
//                state.walkRight();

//                expect(context.sprite.dirY).toEqual(0);
//            });
//            it("context.sprite.moving为true", function () {
//                context.sprite.moving = false;

//                state.walkRight();

//                expect(context.sprite.moving).toBeTruthy();
//            });
//            //it("调用addIndex", function () {
//            //    spyOn(state, "addIndex");

//            //    state.walkRight();

//            //    expect(state.addIndex).toHaveBeenCalled();
//            //});
//        });
//    });

//    describe("checkPassMap", function () {
//        beforeEach(function () {
//            buildFakeTerrainData();
//            fakeWidthAndHeight(30, 30);
//            fakeImgWidthAndHeight(30, 30);
//        });
//        afterEach(function () {
//            restore();
//        });

//        it("如果精灵超出地图边界，返回false", function () {
//            state.P_context.sprite.x = 90;
//            //state.P_context.sprite.y = 0;

//            expect(state.checkPassMap()).toBeFalsy();
//        });
//        it("如果精灵与地形碰撞（往右运动），返回false", function () {
//            state.P_context.sprite.x = 0;
//            state.P_context.sprite.y = 0;
//            //sprite.dirX = 1;

//            expect(state.checkPassMap()).toBeFalsy();
//        });
//        it("如果没有超出地图边界且没有与地形碰撞，则返回true", function () {
//            state.P_context.sprite.x = 60;
//            state.P_context.sprite.y = 0;

//            expect(state.checkPassMap()).toBeTruthy();
//        });
//    });
//});
