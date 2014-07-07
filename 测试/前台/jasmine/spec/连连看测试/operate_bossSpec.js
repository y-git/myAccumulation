describe("operate_Boss.js", function () {
    describe("Operate_Boss类测试", function () {
        var boss = null;

        //var fakeMap = {
        //    InitGameArea: function () {
        //    },
        //    InitMap: function () {
        //    },
        //    Dispose: function () {
        //    }
        //};
        //var fakePlayer = {
        //    name: "Player",
        //    //得分
        //    score: 0,
        //    level: "",
        //    boss_index: "",



        //    //参数设置
        //    config: {
        //        //玩家计时器速度
        //        time_speed: 12,
        //        //消去方块时，玩家计时器加的时间
        //        addTime: 18
        //    },

        //    //玩家初始的道具数
        //    prop_findPath: 3,
        //    prop_rearrangement: 3,
        //    prop_bomb: 3,
        //    prop_stop: 0,
        //    prop_roadBlock: 0,
        //    prop_mirror: 0,
        //};

        //function fakeData_Player() {
        //    window.Data_Player = {
        //        GetScore: function () { return 0 },
        //        GetBossIndex: function () { return "0" },
        //        GetLevel: function () { return 0 },
        //        GetName: function () { return "" }
        //    }
        //};
        //function dispose() {
        //    window.Data_Player = undefined;
        //};


        beforeEach(function () {
        });
        afterEach(function () {
        });

        //*修改

        //**去掉操作类中的Boss的属性，改用备忘录模式
        describe("去掉操作类中的Boss的属性，改用备忘录模式", function () {
            var fakeBossPlayer = {
                //Boss姓名
                name: "花仙女",
                //         index: 6,

                //这两项在选择Boss时再根据cookie中保存的值进行设置
                experience: 0,
                level: 1,

                index: "2",
                img: "Image/BossHead/花仙女.jpg",    //未挑战成功的boss的头像
                img_gray: "Image/BossHead/花仙女_gray.jpg",   //已挑战成功的boss的头像（灰色）
                minNum: 40,     //地图最小要求的方块数，如果为0则不限制地图
                minScore: 1000, //玩家需要获得该得分才可以挑战
                text: "回春：一段时间内，Boss消方块加速，Boss解除禁手效果，Boss对玩家道具攻击免疫。<br>"
                + "迅捷：一段时间内，Boss消方块加速，Boss小技能施法时间减少。<br>"
                + "蓄力一击：Boss立即消去一定数量方块，玩家禁手数秒。<br>"
                + "火舞：Boss立即消去一定数量方块，玩家立即增加一定数量方块，一段时间内Boss消方块加速。",    //boss说明

                background_music: ["Sound/Boss/boss_background2.mp3", "boss_background2"],    //背景音乐

                //        //*以下属性不拷贝到Boss操作类中，用于预加载

                //        //所有的音乐
                //        total_music: [],
                //        total_img: [],



                //参数设置
                config: {
                    ability: [
                    {
                        name: "回春",
                        probability: 0.2,
                        //正处于技能持续时间中的标志，用于判断是否发动技能。
                        //如果效果可以叠加，则没有该项属性；
                        //如果效果不能叠加，则增加该项属性。
                        flag: false,

                        big: false,
                        img: "Image/Ability/Resume.gif",
                        imgInfo: "回春",

                        /*不能包含中文！
                        music: ["Sound/Ability/狂暴.mp3", "狂暴"],  //技能音效
                        */
                        music: ["Sound/Ability/Resume.mp3", "Resume"],  //技能音效
                        say: "快快回复~",
                        systemInfo: "{1}秒内，Boss消方块加速{0}，Boss解除禁手效果，Boss对玩家道具攻击免疫。",
                        when: "onPlayerElimination",
                        value: [6, 0.5, 6]   //剩余方块数差 Boss消方块速度增加值 持续时间
                    }
                    ],




                    //小技能施法时间(s)（boss放小技能时，暂停消方块的时间）
                    boss_smallAbility_time: 5,
                    //Boss消方块速度
                    ai_speed: 5,
                    //玩家计时器速度
                    time_speed: 5,
                    //消去方块时，玩家计时器加的时间
                    addTime: 5,
                    //玩家初始的道具数
                    prop_findPath: 5,
                    prop_rearrangement: 5,
                    prop_bomb: 5,
                    prop_stop: 5,
                    prop_roadBlock: 5,
                    prop_mirror: 5
                }
            };
            var backUp = null;

            //*当测试需要修改Boss类时，需要备份和还原Boss类

            function backUpBossPlayer() {
                backUp = testTool.extendDeep(fakeBossPlayer);
            };
            function restoreBossPlayer() {
                fakeBossPlayer = backUp;
            };

            beforeEach(function () {
                //fakeData_Player();
                //spyOn(Operate_Single, "SelectPlayer");

                window.originator_player = new Originator_Player();
                window.caretaker_player = new Caretaker_Player();

                //创建假的Operate_Boss(子类化并重写)
                var Fake_Operate_Boss = Class(Operate_Boss, {
                    Public: {
                        initialization: function () {
                        }
                    }
                });
                boss = new Fake_Operate_Boss();
            });
            afterEach(function () {
                //dispose();
            });

            describe("judgePlayer", function () {
                beforeEach(function () {
                    window.Data_Boss = {
                        GetPlayer: function () {
                            return fakeBossPlayer;
                        }
                    };
                });
                afterEach(function () {
                    testTool.delete(window, "Data_Boss");
                    testTool.delete(window, "LianLianKan");
                });

                it("如果玩家得分不足够挑战该boss，则提示并返回false", function () {
                    window.LianLianKan = {
                        score: 999
                    };
                    spyOn(window, "alert");

                    var retult = boss.judgePlayer("1");

                    expect(window.alert).toHaveBeenCalled();
                    expect(retult).toBeFalsy();
                });
                it("如果玩家得分足够挑战该boss，则返回true", function () {
                    window.LianLianKan = {
                        score: 1001
                    };

                    var retult = boss.judgePlayer("1");

                    expect(retult).toBeTruthy();
                });
            });

            describe("SelectPlayer", function () {


                function faleAIPlayer() {
                    boss.__ai_player = {
                        name: "",
                        experience: -1,
                        level: -1,
                        minScore: 0
                    };
                };
                function fakeData_Boss() {
                    window.Data_Boss = {
                        GetPlayer: function () {
                            return fakeBossPlayer;
                        },
                        GetExperience: function () {
                            return -1;
                        },
                        GetLevel: function () {
                            return -2;
                        },
                        SetExperience: function () { },
                        SetLevel: function () { }
                    };
                };
                //function fakeLianLianKan() {
                //    window.LianLianKan = {
                //         minScore: 999
                //    };
                //};

                //*当测试需要修改Boss类时，需要备份和还原Boss类



                beforeEach(function () {
                    fakeData_Boss();
                    backUpBossPlayer();
                });
                afterEach(function () {
                    testTool.delete(window, "Data_Boss");
                    restoreBossPlayer();
                });

                it("保存对Boss类的引用", function () {
                    boss.SelectPlayer("1");

                    expect(boss.__ai_player).toEqual(fakeBossPlayer);
                });
                it("如果已经选择了Boss，则要保存前一个Boss的level和experience", function () {
                    //监视SetExperience和SetLevel方法，添加假的GetPlayer方法
                    //window.Data_Boss = jasmine.createSpyObj('Data_Boss', ['SetExperience', 'SetLevel']);
                    //window.Data_Boss.GetPlayer = function () {
                    //    return fakeBossPlayer;
                    //};
                    spyOn(window.Data_Boss, "SetExperience");
                    spyOn(window.Data_Boss, "SetLevel");
                    //spyOn(boss, "__IsSelected").andReturn(function () {
                    //    return true;
                    //});
                    //spyOn(boss, "__IsSelected").andReturn(true);
                    //spyOn(boss, "breakPoint").andReturn(function () {
                    //    return true;
                    //});
                    faleAIPlayer();

                    boss.SelectPlayer("1");

                    expect(window.Data_Boss.SetExperience).toHaveBeenCalled();
                    expect(window.Data_Boss.SetLevel).toHaveBeenCalled();
                });


                describe("如果是第一次选择Boss", function () {
                    beforeEach(function () {
                        boss.__ai_player = undefined;
                    });
                    afterEach(function () {
                    });


                    it("读取cookie中的level和experience，更新Boss的对应值", function () {
                        boss.SelectPlayer("1");

                        expect(fakeBossPlayer.experience).toEqual(-1);
                        expect(fakeBossPlayer.level).toEqual(-2);
                    });
                    it("返回Boss类的副本", function () {
                        //var orign = testTool.extendDeep(fakeBossPlayer);

                        var FakeBossPlayer = Class({
                            Public: {
                                name: "小矮人",
                                //         index: 6,

                                //这两项在选择Boss时再根据cookie中保存的值进行设置
                                experience: 0,
                                level: 1,

                                index: "1",
                                img: "Image/BossHead/小矮人.jpg",    //未挑战成功的boss的头像
                                img_gray: "Image/BossHead/小矮人_gray.jpg",   //已挑战成功的boss的头像（灰色）
                                minNum: 40,     //地图最小要求的方块数，如果为0则不限制地图
                                minScore: -1000, //玩家需要获得该得分才可以挑战
                                text: "逃跑：Boss逃离战斗，玩家挑战失败。<br>"
                                + "防护：一段时间内，Boss对玩家道具攻击免疫。<br>"
                                + "符文攻击：一段时间内，玩家计时器加速，玩家消方块加的时间减少。<br>"
                                + "群雷轰击：Boss立即消去一定数量方块，并且在持续时间内每隔一段时间消去一定数量方块。",    //boss说明

                                background_music: ["Sound/Boss/boss_background1.mp3", "boss_background1"]    //背景音乐
                            }
                        });
                        var fakeBossPlayer = new FakeBossPlayer();

                        //console.log(fakeBossPlayer);

                        window.Data_Boss.GetPlayer = function () {
                            return fakeBossPlayer;
                        }

                        var player = boss.SelectPlayer("1");
                        //console.log(fakeBossPlayer, FakeBossPlayer);

                        expect(player.img).toEqual(fakeBossPlayer.img);

                        var orign_name = fakeBossPlayer.name;

                        player.name = "";

                        expect(fakeBossPlayer.name).toEqual(orign_name);
                    });
                });
            });

            describe("showBossHead", function () {
                function fakeData_Boss() {
                    window.Data_Boss = {
                        GetPlayer: function () {
                            return fakeBossPlayer;
                        },
                        GetExperience: function () {
                            return -1;
                        },
                        GetLevel: function () {
                            return -2;
                        },
                        SetExperience: function () { },
                        SetLevel: function () { }
                    };
                };

                beforeEach(function () {
                    fakeData_Boss();
                    backUpBossPlayer();
                });
                afterEach(function () {
                    testTool.delete(window, "Data_Boss");
                    restoreBossPlayer();
                });

                it("调用UI_Page的showBossHead", function () {
                    LianLianKan = {};
                    LianLianKan.UI_Page = jasmine.createSpyObj("UI_Page", ["showBossHead"]);

                    var player = boss.SelectPlayer("1");

                    boss.showBossHead(player);

                    expect(LianLianKan.UI_Page.showBossHead).toHaveBeenCalledWith(fakeBossPlayer.img);

                    testTool.delete(window, "LianLianKan");
                });
            });
            /*  用来测试以下修改：
            
            //备份当前选择的Boss类的属性
            this.__backUpBoss(this.__ai_player);
            //根据游戏难度修正操作类属性
            this.__updateByDifficulity(LianLianKan.difficulity);
            //设置操作类属性
            this.__updateByLevel();
            


            describe("Start", function () {
                beforeEach(function () {
                    LianLianKan = {
                        config: {
                            MIN_SMALLABILITY_TIME: 1
                        },
                        Difficulity: {
                            Easy: 0,
                            Normal: 1,
                            Hard: 2
                        }
                    };
                    backUpBossPlayer();
                    boss.__ai_player = fakeBossPlayer;
                });
                afterEach(function () {
                    //testTool.delete(window, "Data_Boss");
                    restoreBossPlayer();
                });

                it("将Boss属性（未更新）备份到备忘录中", function () {
                    boss.Start();

                    //expect(caretaker_player.getMemento().getAttribute()).toEqual(fakeBossPlayer);
                    var bossPlayer = caretaker_player.getMemento().getAttribute();

                    expect(bossPlayer.config.time_speed).toEqual(5);
                    expect(bossPlayer.config.ai_speed).toEqual(5);
                    expect(bossPlayer.config.addTime).toEqual(5);
                    expect(bossPlayer.config.boss_smallAbility_time).toEqual(5);
                });
                it("根据Boss的level更新Boss的属性（level为2）", function () {
                    boss.__ai_player.level = 2;

                    boss.Start();

                    expect(fakeBossPlayer.config.time_speed).toEqual(7);
                    expect(fakeBossPlayer.config.ai_speed).toEqual(5.2);
                    expect(fakeBossPlayer.config.addTime).toEqual(4.5);
                    expect(fakeBossPlayer.config.boss_smallAbility_time).toEqual(4.9);

                    testTool.delete(window, "LianLianKan");
                });
                it("根据Boss的level更新Boss的属性（level为5）", function () {
                    boss.__ai_player.level = 5;

                    boss.Start();

                    expect(fakeBossPlayer.config.time_speed).toEqual(25);
                    expect(fakeBossPlayer.config.ai_speed).toEqual(6);
                    expect(fakeBossPlayer.config.addTime).toEqual(2);
                    expect(fakeBossPlayer.config.boss_smallAbility_time).toEqual(4);

                    testTool.delete(window, "LianLianKan");
                });
                it("根据Boss的level更新玩家的属性", function () {
                    spyOn(boss, "__SetPlayerConfig");   //待修改

                    boss.Start();

                    expect(boss.__SetPlayerConfig).toHaveBeenCalled();
                });
                it("根据难度更新Boss的属性", function () {
                    LianLianKan.difficulity = LianLianKan.Difficulity.Easy;

                    boss.Start();

                    expect(fakeBossPlayer.config.ai_speed).toEqual(4);

                    testTool.delete(window, "LianLianKan");
                });
                //待修改
                it("根据当前boss序号，修改玩家类对应的道具数量", function () {
                    spyOn(boss, "P_SetPropNum");    

                    boss.Start();

                    expect(boss.P_SetPropNum).toHaveBeenCalled();
                });
            });
            */

            /*  用来测试以下修改：
            “还原、计算level和experience、更新备忘录中的level和experience”


            describe("GameOver", function () {
                function fakeData_Boss() {
                    window.Data_Boss = {
                        GetPlayer: function () {
                            return fakeBossPlayer;
                        },
                        GetExperience: function () {
                            return 0;
                        },
                        GetLevel: function () {
                            return 1;
                        }
                        //SetExperience: function () { },
                        //SetLevel: function () { }
                    };
                };

                beforeEach(function () {
                    backUpBossPlayer();
                    fakeData_Boss();

                    LianLianKan = {
                        Difficulity: {
                            Easy: 0,
                            Normal: 1,
                            Hard: 2
                        }
                    };

                    //*流程为：SelectPlayer -> Start -> GameOver
                    //因为SelectPlayer已经测试过了，所以是可以信任的。
                    boss.SelectPlayer("1");
                    //因为Start只测试通过了部分修改，所以此处只将需要的部分提取出来。
                    boss.__backUpBoss(boss.__ai_player);
                });
                afterEach(function () {
                    testTool.delete(window, "Data_Boss");
                    restoreBossPlayer();
                });

                it("还原Boss属性", function () {
                    //var expectLevel = fakeBossPlayer.level;
                    var expectImg = fakeBossPlayer.img;
                    var expectAispeed = fakeBossPlayer.config.ai_speed;
                    //fakeBossPlayer.level = -100;
                    fakeBossPlayer.img = "aaa";
                    fakeBossPlayer.config.ai_speed = -100;

                    boss.GameOver();

                    //expect(fakeBossPlayer.level).toEqual(expectLevel);
                    expect(fakeBossPlayer.img).toEqual(expectImg);
                    expect(fakeBossPlayer.config.ai_speed).toEqual(expectAispeed);
                });
                it("计算并更新Boss类的level和experience", function () {
                    fakeBossPlayer.level = 1;
                    fakeBossPlayer.experience = 0;
                    boss.__difficulity_current = LianLianKan.Difficulity.Normal;

                    boss.GameOver("lose");

                    expect(fakeBossPlayer.experience).toEqual(10);
                    expect(fakeBossPlayer.level).toEqual(2);
                });
            });
            */
        });
    });
});