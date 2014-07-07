describe("测试玩家人物一次移动步长为一个方格", function () {
    var sprite = null,
        playerLayer = null,
    bomberConfig = testTool.extendDeep(window.bomberConfig),
    terrainData = testTool.extendDeep(window.terrainData);

    function clearKeyState() {
        window.keyState = {};
        //按键状态初始化，默认为A、D、W、S为keyUp
        window.keyState[keyCodeMap.A] = false;
        window.keyState[keyCodeMap.D] = false;
        window.keyState[keyCodeMap.W] = false;
        window.keyState[keyCodeMap.S] = false;
    };
    function fakeKeyDown() {
        //clearKeyState();    //先要清除keyState！

        var i = 0,
            len = 0;

        for (i = 0, len = arguments.length; i < len; i++) {
            window.keyState[arguments[i]] = true;
        }
    };
    function fakeKeyUp(keyCode) {
        //clearKeyState();    //先要清除keyState！
        //window.keyState[keyCode] = false;
        var i = 0,
           len = 0;

        for (i = 0, len = arguments.length; i < len; i++) {
            window.keyState[arguments[i]] = false;
        }
    };
    function buildFakeTerrainData() {
        var pass = bomberConfig.map.terrain.pass,
            stop = bomberConfig.map.terrain.stop;

        window.terrainData = [
            [pass, pass, pass, pass],
            [pass, pass, pass, pass],
            [pass, pass, pass, pass],
            [pass, pass, pass, pass]
        ];
    };
    //假的地图方格尺寸
    function fakeWidthAndHeight(width, height) {
        window.bomberConfig.WIDTH = width;
        window.bomberConfig.HEIGHT = height;
    };
    function restore() {
        window.terrainData = terrainData;
        window.bomberConfig.WIDTH = bomberConfig.WIDTH;
        window.bomberConfig.HEIGHT = bomberConfig.HEIGHT;
    };

    beforeEach(function () {
        //没有地形障碍。该测试不考虑地形碰撞
        buildFakeTerrainData();

        sprite = spriteFactory.createPlayer();

        fakeWidthAndHeight(28, 28);

        sprite.speedX = sprite.speedY = 3;
        sprite.x = 0, sprite.y = 0;

        sprite.init();
        sprite.completeOneMove = false;

        playerLayer = new PlayerLayer(100);
        playerLayer.setCanvas();
        playerLayer.init();
        playerLayer.appendChild(sprite);
    });
    afterEach(function () {
        clearKeyState();
        restore();
    });

    describe("测试玩家人物一次移动步长为一个方格（X方向）", function(){
        beforeEach(function () {
            //sprite.stepX = 10;
           

            //buildFakeTerrainData();
            //fakeWidthAndHeight();
            //fakeImgWidthAndHeight();

            //sprite.x = sprite.y = 0;
            //sprite.dirX = sprite.dirY = 0;

           
        });
        afterEach(function () {
            //restore();
        });

        describe("初始状态", function () {
            it("一次移动步长中的需要移动的次数为10,一次移动步长中已经移动的次数为0, 完成一次移动标志为false，正在移动标志为false", function () {
                expect([sprite.stepX, sprite.moveIndex_x, sprite.completeOneMove, sprite.moving]).toEqual([10, 0, false, false]);
            });
        });

        describe("先轮询2次，然后玩家人物向右走", function () {
            //轮询num次
            function run(num) {
                //sprite.moving = false;

                for (var i = 0; i < num; i++) {
                    playerLayer.run();
                }
            };
            //移动num次
            //与“轮询num次”的区别为前置条件不同：
            //如果sprite.moving为true，则为移动move；否则为轮询run。
            function move(num) {
                //sprite.moving = true;

                for (var i = 0; i < num; i++) {
                    playerLayer.run();
                }
            };

            beforeEach(function () {
                run(2);
                fakeKeyDown(keyCodeMap.D);
                //playerLayer.run();
            });

            it("moveIndex_x为0", function () {
                expect(sprite.moveIndex_x).toEqual(0);
            });
            it("移动一次后，moveIndex_x为1，completeOneMove为false,moving为true", function () {
                move(1);

                expect([sprite.moveIndex_x, sprite.completeOneMove, sprite.moving]).toEqual([1, false, true]);
            });

            describe("移动一次后，松开D键", function () {
                function judgeByKey(judge) {
                    describe("松开A、D、W、S键", function () {
                        beforeEach(function () {
                            fakeKeyUp(keyCodeMap.A, keyCodeMap.D, keyCodeMap.W, keyCodeMap.S);
                        });

                        judge(0, true, 0, "右站");
                    });

                    describe("按下A键", function () {
                        beforeEach(function () {
                            fakeKeyDown(keyCodeMap.A);
                        });

                        judge(1, false, -1, "左走");
                    });

                    describe("按下D键", function () {
                        beforeEach(function () {
                            fakeKeyDown(keyCodeMap.D);
                        });

                        judge(1, false, 1, "右走");
                    });

                    it("sprite.x为28", function () {
                        expect(sprite.x).toEqual(28);
                    });
                }

                beforeEach(function () {
                    //playerLayer.run();

                    //console.log(sprite.dirX);

                    move(1);
                    //console.log(sprite.dirX);
                    fakeKeyUp(keyCodeMap.D);
                });

                describe("移动了2次", function () {
                    function judge() {
                        it("下一次移动后,moveIndex_x为3， completeOneMove为false，方向为向右", function () {
                            //playerLayer.run();
                            //console.log(sprite.dirX);
                            move(1);
                            //console.log(sprite.dirX);
                            expect(sprite.moveIndex_x).toEqual(3);
                            expect(sprite.completeOneMove).toBeFalsy();
                            expect(sprite.dirX).toEqual(1);
                        });
                    };

                    beforeEach(function () {
                        //playerLayer.run();
                        move(1);
                        //playerLayer.run();
                        //playerLayer.run();
                    });

                    describe("松开A、D、W、S键", function () {
                        beforeEach(function () {
                            fakeKeyUp(keyCodeMap.A, keyCodeMap.D, keyCodeMap.W, keyCodeMap.S);
                        });

                        judge();
                    });

                    describe("按下A键", function () {
                        beforeEach(function () {
                            fakeKeyDown(keyCodeMap.A);
                        });

                        judge();
                    });

                    describe("按下D键", function () {
                        beforeEach(function () {
                            fakeKeyDown(keyCodeMap.D);
                        });

                        judge();
                    });
                });

                describe("移动了10次", function () {
                    function judge(index, flag, dir, dirDescription) {
                        it("下一次轮询后（因为移动10次后，完成了一个移动步长。因此下一次轮询会进行判断是否移动，而不是肯定移动。所以此处称为“下一次轮询”而不是“下一次移动”）,moveIndex_x为" + index + "， completeOneMove为" + flag + "，方向为" + dirDescription, function () {
                            //playerLayer.run();
                            //console.log(sprite.dirX);

                            run(1);
                            //console.log(sprite.dirX);
                            expect(sprite.moveIndex_x).toEqual(index);
                            expect(sprite.completeOneMove).toEqual(flag);
                            expect(sprite.dirX).toEqual(dir);
                        });
                    };

                    beforeEach(function () {
                        //playerLayer.run();
                        move(9);
                        //playerLayer.run();
                        //playerLayer.run();
                    });

                    it("completeOneMove为true，moveIndex_x为0，方向为右走（下一次轮询时会判断方向）", function () {
                        expect(sprite.completeOneMove).toBeTruthy();
                        expect(sprite.moveIndex_x).toEqual(0);
                        expect(sprite.dirX).toEqual(1);
                    });

                    //describe("松开A、D、W、S键", function () {
                    //    beforeEach(function () {
                    //        fakeKeyUp(keyCodeMap.A, keyCodeMap.D, keyCodeMap.W, keyCodeMap.S);
                    //    });

                    //    judge(0, true, 0, "右站");
                    //});

                    //describe("按下A键", function () {
                    //    beforeEach(function () {
                    //        fakeKeyDown(keyCodeMap.A);
                    //    });

                    //    judge(1, false, -1, "左走");
                    //});

                    //describe("按下D键", function () {
                    //    beforeEach(function () {
                    //        fakeKeyDown(keyCodeMap.D);
                    //    });

                    //    judge(1, false, 1, "右走");
                    //});
                    judgeByKey(judge);
                });

                describe("轮询了20次（移动了10次）", function () {
                    function judge(index, flag, dir, dirDescription) {
                        it("下一次轮询后（因为移动10次后，完成了一个移动步长，第11次-第20次轮询均不移动。下一次轮询（第21次轮询）会进行判断是否移动，而不是肯定移动。所以此处称为“下一次轮询”而不是“下一次移动”）,moveIndex_x为" + index + "， completeOneMove为" + flag + "，方向为" + dirDescription, function () {
                            //playerLayer.run();
                            //console.log(sprite.dirX);

                            run(1);
                            //console.log(sprite.dirX);
                            expect(sprite.moveIndex_x).toEqual(index);
                            expect(sprite.completeOneMove).toEqual(flag);
                            expect(sprite.dirX).toEqual(dir);
                        });
                    };

                    beforeEach(function () {
                        //playerLayer.run();
                        move(19);
                        //playerLayer.run();
                        //playerLayer.run();
                    });

                    it("completeOneMove为true，moveIndex_x为0，方向为右站（因为移动10次（轮询10次），下一次轮询时（第11次轮询）会判断方向为右站（A、D、W、S键未按下））", function () {
                        expect(sprite.completeOneMove).toBeTruthy();
                        expect(sprite.moveIndex_x).toEqual(0);
                        expect(sprite.dirX).toEqual(0);
                    });

                    //describe("松开A、D、W、S键", function () {
                    //    beforeEach(function () {
                    //        fakeKeyUp(keyCodeMap.A, keyCodeMap.D, keyCodeMap.W, keyCodeMap.S);
                    //    });

                    //    judge(0, true, 0, "右站");
                    //});

                    //describe("按下A键", function () {
                    //    beforeEach(function () {
                    //        fakeKeyDown(keyCodeMap.A);
                    //    });

                    //    judge(1, false, -1, "左走");
                    //});

                    //describe("按下D键", function () {
                    //    beforeEach(function () {
                    //        fakeKeyDown(keyCodeMap.D);
                    //    });

                    //    judge(1, false, 1, "右走");
                    //});
                    judgeByKey(judge);

                    //it("sprite.x为28", function () {
                    //    expect(sprite.x).toEqual(28);
                    //});
                });
            });

            //describe("一直按下D键", function () {
            //});
        });
    });

    describe("测试玩家人物一次移动步长为一个方格（Y方向）", function () {
        beforeEach(function () {
            //sprite = spriteFactory.createPlayer();
            //sprite.init();
            ////sprite.stepY = 10;
            //sprite.completeOneMove = false;

            ////buildFakeTerrainData();
            ////fakeWidthAndHeight();
            ////fakeImgWidthAndHeight();

            ////sprite.x = sprite.y = 0;
            ////sprite.dirY = sprite.dirY = 0;

            ////sprite.speedY = sprite.speedY = 1;

            //playerLayer = new PlayerLayer(100);
            //playerLayer.setCanvas();
            //playerLayer.init();
            //playerLayer.appendChild(sprite);
        });
        afterEach(function () {
            //restore();
        });

        describe("初始状态", function () {
            it("一次移动步长中的需要移动的次数为10,一次移动步长中已经移动的次数为0, 完成一次移动标志为false，正在移动标志为false", function () {
                expect([sprite.stepY, sprite.moveIndex_y, sprite.completeOneMove, sprite.moving]).toEqual([10, 0, false, false]);
            });
        });

        describe("先轮询2次，然后玩家人物向下走", function () {
            //轮询num次
            function run(num) {
                //sprite.moving = false;

                for (var i = 0; i < num; i++) {
                    playerLayer.run();
                }
            };
            //移动num次
            //与“轮询num次”的区别为前置条件不同：
            //如果sprite.moving为true，则为移动move；否则为轮询run。
            function move(num) {
                //sprite.moving = true;

                for (var i = 0; i < num; i++) {
                    playerLayer.run();
                }
            };

            beforeEach(function () {
                run(2);
                fakeKeyDown(keyCodeMap.S);
                //playerLayer.run();
            });

            it("moveIndex_y为0", function () {
                expect(sprite.moveIndex_y).toEqual(0);
            });
            it("移动一次后，moveIndex_y为1，completeOneMove为false,moving为true", function () {
                move(1);

                expect([sprite.moveIndex_y, sprite.completeOneMove, sprite.moving]).toEqual([1, false, true]);
            });

            describe("移动一次后，松开S键", function () {
                function judgeByKey(judge) {
                    describe("松开A、D、W、S键", function () {
                        beforeEach(function () {
                            fakeKeyUp(keyCodeMap.A, keyCodeMap.D, keyCodeMap.W, keyCodeMap.S);
                        });

                        judge(0, true, 0, "下站");
                    });

                    describe("按下W键", function () {
                        beforeEach(function () {
                            fakeKeyDown(keyCodeMap.W);
                        });

                        judge(1, false, -1, "上走");
                    });

                    describe("按下S键", function () {
                        beforeEach(function () {
                            fakeKeyDown(keyCodeMap.S);
                        });

                        judge(1, false, 1, "下走");
                    });

                    it("sprite.y为28", function () {
                        expect(sprite.y).toEqual(28);
                    });
                }

                beforeEach(function () {
                    //playerLayer.run();

                    //console.log(sprite.dirY);

                    move(1);
                    //console.log(sprite.dirY);
                    fakeKeyUp(keyCodeMap.S);
                });

                describe("移动了2次", function () {
                    function judge() {
                        it("下一次移动后,moveIndex_y为3， completeOneMove为false，方向为向右", function () {
                            //playerLayer.run();
                            //console.log(sprite.dirY);
                            move(1);
                            //console.log(sprite.dirY);
                            expect(sprite.moveIndex_y).toEqual(3);
                            expect(sprite.completeOneMove).toBeFalsy();
                            expect(sprite.dirY).toEqual(1);
                        });
                    };

                    beforeEach(function () {
                        //playerLayer.run();
                        move(1);
                        //playerLayer.run();
                        //playerLayer.run();
                    });

                    describe("松开A、D、W、S键", function () {
                        beforeEach(function () {
                            fakeKeyUp(keyCodeMap.A, keyCodeMap.D, keyCodeMap.W, keyCodeMap.S);
                        });

                        judge();
                    });

                    describe("按下W键", function () {
                        beforeEach(function () {
                            fakeKeyDown(keyCodeMap.W);
                        });

                        judge();
                    });

                    describe("按下S键", function () {
                        beforeEach(function () {
                            fakeKeyDown(keyCodeMap.S);
                        });

                        judge();
                    });
                });

                describe("移动了10次", function () {
                    function judge(index, flag, dir, dirDescription) {
                        it("下一次轮询后（因为移动10次后，完成了一个移动步长。因此下一次轮询会进行判断是否移动，而不是肯定移动。所以此处称为“下一次轮询”而不是“下一次移动”）,moveIndex_y为" + index + "， completeOneMove为" + flag + "，方向为" + dirDescription, function () {
                            //playerLayer.run();
                            //console.log(sprite.dirY);

                            run(1);
                            //console.log(sprite.dirY);
                            expect(sprite.moveIndex_y).toEqual(index);
                            expect(sprite.completeOneMove).toEqual(flag);
                            expect(sprite.dirY).toEqual(dir);
                        });
                    };

                    beforeEach(function () {
                        //playerLayer.run();
                        move(9);
                        //playerLayer.run();
                        //playerLayer.run();
                    });

                    it("completeOneMove为true，moveIndex_y为0，方向为下走（下一次轮询时会判断方向）", function () {
                        expect(sprite.completeOneMove).toBeTruthy();
                        expect(sprite.moveIndex_y).toEqual(0);
                        expect(sprite.dirY).toEqual(1);
                    });

                    //describe("松开A、D、W、S键", function () {
                    //    beforeEach(function () {
                    //        fakeKeyUp(keyCodeMap.A, keyCodeMap.D, keyCodeMap.W, keyCodeMap.S);
                    //    });

                    //    judge(0, true, 0, "下站");
                    //});

                    //describe("按下W键", function () {
                    //    beforeEach(function () {
                    //        fakeKeyDown(keyCodeMap.W);
                    //    });

                    //    judge(1, false, -1, "上走");
                    //});

                    //describe("按下S键", function () {
                    //    beforeEach(function () {
                    //        fakeKeyDown(keyCodeMap.S);
                    //    });

                    //    judge(1, false, 1, "下走");
                    //});
                    judgeByKey(judge);
                });

                describe("轮询了20次（移动了10次）", function () {
                    function judge(index, flag, dir, dirDescription) {
                        it("下一次轮询后（因为移动10次后，完成了一个移动步长，第11次-第20次轮询均不移动。下一次轮询（第21次轮询）会进行判断是否移动，而不是肯定移动。所以此处称为“下一次轮询”而不是“下一次移动”）,moveIndex_x为" + index + "， completeOneMove为" + flag + "，方向为" + dirDescription, function () {
                            //playerLayer.run();
                            //console.log(sprite.dirY);

                            run(1);
                            //console.log(sprite.dirY);
                            expect(sprite.moveIndex_y).toEqual(index);
                            expect(sprite.completeOneMove).toEqual(flag);
                            expect(sprite.dirY).toEqual(dir);
                        });
                    };

                    beforeEach(function () {
                        //playerLayer.run();
                        move(19);
                        //playerLayer.run();
                        //playerLayer.run();
                    });

                    it("completeOneMove为true，moveIndex_y为0，方向为右站（因为移动10次（轮询10次），下一次轮询时（第11次轮询）会判断方向为右站（A、D、W、S键未按下））", function () {
                        expect(sprite.completeOneMove).toBeTruthy();
                        expect(sprite.moveIndex_y).toEqual(0);
                        expect(sprite.dirY).toEqual(0);
                    });

                    //describe("松开A、D、W、S键", function () {
                    //    beforeEach(function () {
                    //        fakeKeyUp(keyCodeMap.A, keyCodeMap.D, keyCodeMap.W, keyCodeMap.S);
                    //    });

                    //    judge(0, true, 0, "下站");
                    //});

                    //describe("按下W键", function () {
                    //    beforeEach(function () {
                    //        fakeKeyDown(keyCodeMap.W);
                    //    });

                    //    judge(1, false, -1, "上走");
                    //});

                    //describe("按下S键", function () {
                    //    beforeEach(function () {
                    //        fakeKeyDown(keyCodeMap.S);
                    //    });

                    //    judge(1, false, 1, "下走");
                    //});
                    judgeByKey(judge);
                });
            });

            //describe("一直按下D键", function () {
            //});
        });
    });

    //未测试！
    describe("测试玩家人物一次移动步长为一个方格（X、Y方向）", function () {
    });
});