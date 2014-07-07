//describe("WalkDownState.js", function () {
//    var data = testTool.extendDeep(window.terrainData),
//          config = testTool.extendDeep(window.bomberConfig);

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
//        window.terrainData = data;
//        window.bomberConfig.WIDTH = config.WIDTH;
//        window.bomberConfig.HEIGHT = config.HEIGHT;
//        window.bomberConfig.player.IMGWIDTH = config.player.IMGWIDTH;
//        window.bomberConfig.player.IMGHEIGHT = config.player.IMGHEIGHT;
//    };

//    //function clearKeyState() {
//    //    window.keyState = {};
//    //};
//    //function fakeKeyDown(keyCode) {
//    //    //clearKeyState();    //先要清除keyState！
//    //    window.keyState[keyCode] = true;
//    //};
//    //function fakeKeyUp(keyCode) {
//    //    //clearKeyState();    //先要清除keyState！
//    //    window.keyState[keyCode] = false;
//    //};

//    //function getFakeContext() {
//    //    return {
//    //        setPlayerState: function(state){
//    //            state
//    //        },
//    //        sprite: spriteFactory.createPlayer()
//    //    };
//    //};

//    beforeEach(function () {
//        //fakeContext = getFakeContext();
//        context = new Context(spriteFactory.createPlayer());
//        state = new WalkDownState();
//        state.setContext(context);
//    });
//    afterEach(function () {
//        //clearKeyState();
//    });

//    describe("walkLeft", function () {
//        //describe("如果按下S键", function () {
//        //    beforeEach(function () {
//        //        fakeKeyDown(keyCodeMap.S);
//        //    });

//        //    it("重置当前帧为0", function () {
//        //        spyOn(state.P_context.sprite, "resetCurrentFrame");

//        //        state.walkDown();

//        //        expect(state.P_context.sprite.resetCurrentFrame).toHaveBeenCalledWith(0);
//        //    });
//        //    it("状态过渡到walkDownState", function () {
//        //        spyOn(state.P_context, "setPlayerState");

//        //        state.walkDown();

//        //        expect(state.P_context.setPlayerState).toHaveBeenCalledWith(state.P_context.walkDownState);
//        //    });
//        //});
//        it("重置当前帧为0", function () {
//            spyOn(state.P_context.sprite, "resetCurrentFrame");

//            state.walkLeft();

//            expect(state.P_context.sprite.resetCurrentFrame).toHaveBeenCalledWith(0);
//        });
//        it("状态过渡到WalkLeftState", function () {
//            spyOn(state.P_context, "setPlayerState").andCallThrough();

//            state.walkLeft();

//            expect(state.P_context.setPlayerState).toHaveBeenCalledWith(state.P_context.walkLeftState);
//        });
//        it("调用context.walkLeft", function () {
//            spyOn(state.P_context, "walkLeft");

//            state.walkLeft();

//            expect(state.P_context.walkLeft).toHaveBeenCalled();
//        });
//    });

//    describe("walkRight", function () {
//        //describe("如果按下D键", function () {
//        //    beforeEach(function () {
//        //        fakeKeyDown(keyCodeMap.D);
//        //    });

//        it("重置当前帧为0", function () {
//            spyOn(state.P_context.sprite, "resetCurrentFrame");

//            state.walkRight();

//            expect(state.P_context.sprite.resetCurrentFrame).toHaveBeenCalledWith(0);
//        });
//        it("状态过渡到WalkRightState", function () {
//            spyOn(state.P_context, "setPlayerState").andCallThrough();

//            state.walkRight();

//            expect(state.P_context.setPlayerState).toHaveBeenCalledWith(state.P_context.walkRightState);
//        });
//        it("调用context.walkRight", function () {
//            spyOn(state.P_context, "walkRight");

//            state.walkRight();

//            expect(state.P_context.walkRight).toHaveBeenCalled();
//        });
//        //});
//    });

//    describe("walkUp", function () {
//        //describe("如果按下W键", function () {
//        //    beforeEach(function () {
//        //        fakeKeyDown(keyCodeMap.W);
//        //    });

//        //    it("重置当前帧为0", function () {
//        //        spyOn(state.P_context.sprite, "resetCurrentFrame");

//        //        state.walkUp();

//        //        expect(state.P_context.sprite.resetCurrentFrame).toHaveBeenCalledWith(0);
//        //    });
//        //    it("状态过渡到WalkUpState", function () {
//        //        spyOn(state.P_context, "setPlayerState");

//        //        state.walkUp();

//        //        expect(state.P_context.setPlayerState).toHaveBeenCalledWith(state.P_context.walkUpState);
//        //    });
//        //});
//        it("重置当前帧为0", function () {
//            spyOn(state.P_context.sprite, "resetCurrentFrame");

//            state.walkUp();

//            expect(state.P_context.sprite.resetCurrentFrame).toHaveBeenCalledWith(0);
//        });
//        it("状态过渡到WalkUpState", function () {
//            spyOn(state.P_context, "setPlayerState").andCallThrough();

//            state.walkUp();

//            expect(state.P_context.setPlayerState).toHaveBeenCalledWith(state.P_context.walkUpState);
//        });
//        it("调用context.walkUp", function () {
//            spyOn(state.P_context, "walkUp");

//            state.walkUp();

//            expect(state.P_context.walkUp).toHaveBeenCalled();
//        });
//    });

//    describe("walkDown", function () {
//        function buildFakeTerrainData() {
//            var pass = bomberConfig.map.terrain.pass,
//                stop = bomberConfig.map.terrain.stop;

//            window.terrainData = [
//                [pass, pass, pass, pass],
//                [pass, stop, pass, pass],
//                [pass, pass, pass, pass],
//                [pass, pass, pass, pass]
//            ];
//        };

//        beforeEach(function () {
//            buildFakeTerrainData();
//            fakeWidthAndHeight(30, 30);
//            fakeImgWidthAndHeight(30, 30);
//        });
//        afterEach(function () {
//            restore();
//        });

//        it("context.sprite的动画为walk_down", function () {
//            spyOn(context.sprite, "setAnim");

//            state.walkDown();

//            expect(context.sprite.setAnim).toHaveBeenCalledWith("walk_down");
//        });
//        it("context.sprite的行走方向为左", function () {
//            state.walkLeft();

//            expect(context.sprite.dirX).toEqual(-1);
//        });

//        describe("如果不可通过地图", function () {
//            beforeEach(function () {
//                state.P_context.sprite.y = 90;   //往左走会超出边界
//            });

//            it("sprite.moving为false，sprite.dirY为0", function () {
//                var sprite = context.sprite;
//                sprite.moving = true;
//                sprite.dirY = 1;

//                state.walkDown();

//                expect([sprite.moving, sprite.dirY]).toEqual([false, 0]);
//            });
//            //it("返回", function () {
//            //    state.P_context.sprite.dirY = 0;

//            //    state.walkDown();

//            //    //函数已返回，后面代码不执行。
//            //    expect(state.P_context.sprite.dirY).toEqual(0);
//            //});
//        });

//        describe("如果可以通过地图", function () {
//            beforeEach(function () {
//                //spyOn(state, "P__checkPassMap").andReturn(true);
//                state.P_context.sprite.x = 30;
//                        state.P_context.sprite.y = 60;
//            });

//            it("context.sprite的行走方向为下", function () {
//                state.walkDown();

//                expect(context.sprite.dirY).toEqual(1);
//            });
//            it("context.sprite的Y方向速度为1", function () {
//                state.walkDown();

//                expect(context.sprite.dirY).toEqual(1);
//            });
//            it("context.sprite.moving为true", function () {
//                context.sprite.moving = false;

//                state.walkDown();

//                expect(context.sprite.moving).toBeTruthy();
//            });
//            //it("调用addIndex", function () {
//            //    spyOn(state, "addIndex");

//            //    state.walkDown();

//            //    expect(state.addIndex).toHaveBeenCalled();
//            //});
//        });
//    });

//    describe("stand", function () {
//        //describe("如果松开A键", function () {
//        //    beforeEach(function () {
//        //        fakeKeyUp(keyCodeMap.A);
//        //    });

//        it("重置当前帧为0", function () {
//            spyOn(state.P_context.sprite, "resetCurrentFrame");

//            state.stand();

//            expect(state.P_context.sprite.resetCurrentFrame).toHaveBeenCalledWith(0);
//        });
//        it("状态过渡到StandDownState", function () {
//            spyOn(state.P_context, "setPlayerState").andCallThrough();

//            state.stand();

//            expect(state.P_context.setPlayerState).toHaveBeenCalledWith(state.P_context.standDownState);
//        });
//        it("调用context.stand", function () {
//            spyOn(state.P_context, "stand");

//            state.stand();

//            expect(state.P_context.stand).toHaveBeenCalled();
//        });
//        //});
//    });

//    //describe("addIndex", function () {
//    //    it("sprite.moveIndex_y加1", function () {
//    //        state.P_context.sprite.moveIndex_y = 0;

//    //        state.addIndex();

//    //        expect(state.P_context.sprite.moveIndex_y).toEqual(1);
//    //    });
//    //});

//    describe("move", function () {
//        var sprite = null;

//        //var bomberConfig = testTool.extendDeep(window.bomberConfig);

//        ////假的地图方格尺寸
//        //function fakeWidthAndHeight(width, height) {
//        //    window.bomberConfig.WIDTH = width;
//        //    window.bomberConfig.HEIGHT = height;
//        //};
//        //function restore() {
//        //    window.bomberConfig.WIDTH = bomberConfig.WIDTH;
//        //    window.bomberConfig.HEIGHT = bomberConfig.HEIGHT;
//        //};

//        beforeEach(function () {
//            //buildFakeTerrainData();
//            //fakeWidthAndHeight();
//            //fakeImgWidthAndHeight();

//            sprite = state.P_context.sprite;
//            sprite.x = sprite.y = 0;
//            sprite.dirY = sprite.dirY = 0;
//            sprite.speedX = sprite.speedY = 1;
//        });
//        afterEach(function () {
//            //restore();
//        });

//        //function setXAndY(x, y) {
//        //    sprite.x = x;
//        //    sprite.y = y;
//        //    sprite.dirY = 0;
//        //    sprite.dirY = 0;
//        //    sprite.moving = false;
//        //    sprite.completeOneMove = true;
//        //};

//        //it("如果没有完成一次移动且正在移动，则调用Index加1", function () {
//        it("如果正在移动，则调用Index加1", function () {
//            //sprite.completeOneMove = false;
//            sprite.moving = true;
//            sprite.stepY = 5;
//            sprite.moveIndex_y = 0;

//            state.move();

//            expect(state.P_context.sprite.moveIndex_y).toEqual(1);
//        });

//        describe("判断moveIndex", function () {

//            describe("如果sprite正在运动", function () {
//                //function judge(step, moveIndex) {
//                //    beforeEach(function () {
//                //        sprite[step] = 5;
//                //        sprite[moveIndex] = 5;
//                //    });

//                //    it("则moveIndex_y重置为0", function () {
//                //        sprite.move();

//                //        expect(sprite[moveIndex]).toEqual(0);
//                //    });

//                //    //it("如果已松开松开A、W、S、D键，则移动标志为false", function () {
//                //    //    fakeKeyUp(keyCodeMap.A);
//                //    //    fakeKeyUp(keyCodeMap.W);
//                //    //    fakeKeyUp(keyCodeMap.S);
//                //    //    fakeKeyUp(keyCodeMap.D);
//                //    //    sprite.canMove = true;

//                //    //    sprite.move();

//                //    //    expect(sprite.canMove).toBeFalsy();
//                //    //});
//                //    it("完成一次移动标志为true", function () {
//                //        sprite.completeOneMove = false;

//                //        sprite.move();

//                //        expect(sprite.completeOneMove).toBeTruthy();
//                //    });
//                //};

//                beforeEach(function () {
//                    sprite.moving = true;
//                });

//                describe("如果一次移动步长中，移动次数已达到指定次数（moveIndex_y大于等于stepY）", function () {
//                    beforeEach(function () {
//                        sprite.stepY = 5;
//                        sprite.moveIndex_y = 5;
//                    });

//                    it("则moveIndex_y重置为0", function () {
//                        state.move();

//                        expect(sprite.moveIndex_y).toEqual(0);
//                    });

//                    //it("如果已松开松开A、W、S、D键，则移动标志为false", function () {
//                    //    fakeKeyUp(keyCodeMap.A);
//                    //    fakeKeyUp(keyCodeMap.W);
//                    //    fakeKeyUp(keyCodeMap.S);
//                    //    fakeKeyUp(keyCodeMap.D);
//                    //    sprite.canMove = true;

//                    //    sprite.move();

//                    //    expect(sprite.canMove).toBeFalsy();
//                    //});
//                    it("完成一次移动标志为true", function () {
//                        sprite.completeOneMove = false;

//                        state.move();

//                        expect(sprite.completeOneMove).toBeTruthy();
//                    });
//                });

//                it("否则，完成一次移动标志为false", function () {
//                    sprite.stepY = 5;
//                    sprite.moveIndex_y = 3;
//                    sprite.completeOneMove = true;
//                    sprite.moving = true;

//                    state.move();

//                    expect(sprite.completeOneMove).toBeFalsy();
//                });
//            });
//        });

//        describe("计算坐标", function () {
//            //it("改变x值", function () {
//            //    sprite.x = 10;
//            //    sprite.dirY = 1;

//            //    state.move();

//            //    expect(sprite.x).toEqual(11);
//            //});
//            it("改变y值", function () {
//                sprite.y = 10;
//                sprite.dirY = 1;

//                state.move();

//                expect(sprite.y).toEqual(11);
//            });
//            it("如果已完成一次移动步长，则sprite.y要为bomberConfig.WIDTH的整数倍（向下取整）", function () {
//                sprite.moving = false;
//                sprite.completeOneMove = true;
//                fakeWidthAndHeight(33, 33);
//                //sprite.x = 37;
//                sprite.y = 37;
//                sprite.dirY = 0;
//                //sprite.dirY = 0;

//                //setXAndY(37, 37);

//                state.move();

//                expect(sprite.y).toEqual(33);

//                //setXAndY(2, 2);
//                sprite.y = 2;
//                //sprite.y = 2;

//                state.move();

//                expect(sprite.y).toEqual(0);

//                restore();
//            });
//        });
//    });

//    //describe("P__checkPassMap", function () {
//    //    function buildFakeTerrainData() {
//    //        var pass = bomberConfig.map.terrain.pass,
//    //            stop = bomberConfig.map.terrain.stop;

//    //        window.terrainData = [
//    //            [pass, pass, pass, pass],
//    //            [pass, stop, pass, pass],
//    //            [pass, pass, pass, pass],
//    //            [pass, pass, pass, pass]
//    //        ];
//    //    };

//    //    beforeEach(function () {
//    //        buildFakeTerrainData();
//    //        fakeWidthAndHeight(30, 30);
//    //        fakeImgWidthAndHeight(30, 30);
//    //    });
//    //    afterEach(function () {
//    //        restore();
//    //    });

//    //    it("如果精灵超出地图边界，返回false", function () {
//    //        state.P_context.sprite.y = 90;
//    //        //state.P_context.sprite.y = 0;

//    //        //console.log(state.P_context.sprite.x / bomberConfig.WIDTH - 1);

//    //        expect(state.P__checkPassMap()).toBeFalsy();
//    //    });
//    //    it("如果精灵与地形碰撞（往下运动），返回false", function () {
//    //        state.P_context.sprite.x = 30;
//    //        state.P_context.sprite.y = 0;
//    //        //sprite.dirX = 1;

//    //        expect(state.P__checkPassMap()).toBeFalsy();
//    //    });
//    //    it("如果没有超出地图边界且没有与地形碰撞，则返回true", function () {
//    //        state.P_context.sprite.x = 30;
//    //        state.P_context.sprite.y = 60;

//    //        expect(state.P__checkPassMap()).toBeTruthy();
//    //    });
//    //});
//});