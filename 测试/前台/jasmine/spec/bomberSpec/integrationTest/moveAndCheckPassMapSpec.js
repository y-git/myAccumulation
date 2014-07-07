//describe("测试玩家人物移动时判断是否可移动（检测地形障碍物、地图边界）", function () {
//    var sprite = null,
//        playerLayer = null,
//    bomberConfig = testTool.extendDeep(window.bomberConfig),
//    terrainData = testTool.extendDeep(window.terrainData);

//    function clearKeyState() {
//        window.keyState = {};
//        //按键状态初始化，默认为A、D、W、S为keyUp
//        window.keyState[keyCodeMap.A] = false;
//        window.keyState[keyCodeMap.D] = false;
//        window.keyState[keyCodeMap.W] = false;
//        window.keyState[keyCodeMap.S] = false;
//    };
//    function fakeKeyDown() {
//        //clearKeyState();    //先要清除keyState！

//        var i = 0,
//            len = 0;

//        for (i = 0, len = arguments.length; i < len; i++) {
//            window.keyState[arguments[i]] = true;
//        }
//    };
//    function fakeKeyUp(keyCode) {
//        //clearKeyState();    //先要清除keyState！
//        //window.keyState[keyCode] = false;
//        var i = 0,
//           len = 0;

//        for (i = 0, len = arguments.length; i < len; i++) {
//            window.keyState[arguments[i]] = false;
//        }
//    };
//    function buildFakeTerrainData() {
//        var pass = bomberConfig.map.terrain.pass,
//            stop = bomberConfig.map.terrain.stop;

//        window.terrainData = [
//            [stop, pass, pass, pass],
//            [pass, pass, pass, pass],
//            [pass, pass, pass, pass],
//            [pass, pass, pass, pass]
//        ];
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
//    };

//    beforeEach(function () {
//        buildFakeTerrainData();

//        sprite = spriteFactory.createPlayer();

//        //移动10次为1个移动步长
//        fakeWidthAndHeight(10, 10);
//        sprite.speedX = sprite.speedY = 1;

//        ////设置玩家人物初始位置
//        //sprite.x = 60, sprite.y = 0;

//        sprite.init();
//        sprite.completeOneMove = false;

//        playerLayer = new PlayerLayer(100);
//        playerLayer.setCanvas();
//        playerLayer.init();
//        playerLayer.appendChild(sprite);
//    });
//    afterEach(function () {
//        clearKeyState();
//        restore();
//    });

//    describe("测试玩家人物移动时判断是否可移动（检测地形障碍物、地图边界）", function () {
//        //轮询num次
//        function run(num) {
//            //sprite.moving = false;

//            for (var i = 0; i < num; i++) {
//                playerLayer.render();
//            }
//        };

//        //移动num次
//        //与“轮询num次”的区别为前置条件不同：
//        //如果sprite.moving为true，则为移动move；否则为轮询run。
//        function move(num) {
//            //sprite.moving = true;

//            for (var i = 0; i < num; i++) {
//                playerLayer.render();
//            }
//        };

//        beforeEach(function () {
//        });
//        afterEach(function () {
//        });

//        describe("玩家人物向右走", function () {
//            beforeEach(function () {
//                fakeKeyDown(keyCodeMap.D);
//            });
//            afterEach(function () {
//            });
          
//            describe("玩家人物移动一格（一个移动步长）", function () {
//                beforeEach(function () {
//                    move(10);
//                    console.log([sprite.x, sprite.y]);
//                });
//                afterEach(function () {
//                });

//                describe("松开A、D、W、S键", function () {
//                    beforeEach(function () {
//                        fakeKeyUp(keyCodeMap.A, keyCodeMap.D, keyCodeMap.W, keyCodeMap.S);
//                    });

//                    it("轮询一次，再按下D键，因为到达地图边界，所以下一次轮询后，玩家人物不能移动", function () {
//                        run(1);

//                        fakeKeyDown(keyCodeMap.D);

//                        var orign_x = sprite.x,
//                            orign_y = sprite.y;

//                        run(1);

//                        expect([sprite.x, sprite.y]).toEqual([orign_x, orign_y]);
//                    });
//                });

//                describe("按下D键", function () {
//                    beforeEach(function () {
//                        fakeKeyDown(keyCodeMap.D);
//                    });

//                    it("因为到达地图边界，所以下一次轮询后，玩家人物不能移动", function () {
//                        var orign_x = sprite.x,
//                            orign_y = sprite.y;

//                        run(1);

//                        console.log([sprite.x, sprite.y]);
//                        expect([sprite.x, sprite.y]).toEqual([orign_x, orign_y]);
//                    });
//                });
//            });
//        });
//    });
//});