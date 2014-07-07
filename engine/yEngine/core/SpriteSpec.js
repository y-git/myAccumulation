describe("Sprite.js", function () {
    var sprite = null;

    function getInstance(bitmap) {
        return YE.Sprite.create(bitmap);
    }

    beforeEach(function () {
        sprite = getInstance();
    });

    describe("构造函数", function () {
        it("获得displayTarget", function () {
            var sprite = getInstance({});

            expect(sprite.ye___displayTarget).toEqual({});
        });
        it("创建ActionManager实例", function () {
            var sprite = getInstance();

            expect(sprite.ye___getActionManager()).toBeInstanceOf(YE.ActionManager);
        });
        it("创建AnimationManager实例", function () {
            var sprite = getInstance();

            expect(sprite.ye___getAnimationManager()).toBeInstanceOf(YE.AnimationManager);
        });
        it("创建AnimationFrameManager实例", function () {
            var sprite = getInstance();

            expect(sprite.getAnimationFrameManager()).toBeInstanceOf(YE.AnimationFrameManager);
        });
    });

    describe("init", function () {
        var container = {};

        function buildFakeContainer() {
            return jasmine.createSpyObj("", ["getContext", "getGraphics", "getCanvasData"]);
        }

        beforeEach(function () {
            container = buildFakeContainer();
        });

//        it("获得父节点", function () {
//            sprite.init(container);
//
//            expect(sprite.getParent()).toEqual(container);
//        });
        it("获得context", function () {
            sprite.init(container);

            expect(container.getContext).toHaveBeenCalled();
        });
        it("获得graphics", function () {
            sprite.init(container);

            expect(container.getGraphics).toHaveBeenCalled();
        });
        it("获得canvasData", function () {
            sprite.init(container);

            expect(container.getCanvasData).toHaveBeenCalled();
        });
    });

    describe("getGraphics", function () {
        it("返回graphics实例", function () {
        });
    });

    describe("getContext", function () {
        it("获得所在画布的context", function () {
        });
    });

    describe("runAction", function () {
        it("如果已经加入了该动作了，就不再重复加入", function () {
            var fakeAction = {};
            sinon.stub(sprite.ye___getActionManager(), "hasChild").returns(true);

            var result = sprite.runAction(fakeAction);

            expect(result).toEqual(YE.returnForTest);
        });
        it("加入一个动作，传入精灵实例", function () {
            var fakeAction = {};
            sinon.stub(sprite.ye___getActionManager(), "hasChild").returns(false);
            sinon.stub(sprite.ye___getActionManager(), "addChild");
            sprite.runAction(fakeAction);

            expect(sprite.ye___getActionManager().addChild.calledWith(fakeAction, sprite)).toBeTruthy();
        });
    });

    describe("runOnlyOneAction", function () {
        beforeEach(function () {
            sinon.stub(sprite, "runAction");
        });

        it("如果运行的动作数大于1，则删除运行的所有动作", function () {
            sinon.stub(sprite, "ye___getActionManager").returns({
                getCount: sinon.stub().returns(2),
                removeAll: sinon.stub()
            });

            sprite.runOnlyOneAction({});

            expect(sprite.ye___getActionManager().removeAll.calledOnce).toBeTruthy();
        });
        it("如果运行的动作数为1且该动作不是要运行的动作，则删除运行的所有动作", function () {
            sinon.stub(sprite, "ye___getActionManager").returns({
                getCount: sinon.stub().returns(1),
                hasChild: sinon.stub().returns(false),
                removeAll: sinon.stub()
            });

            sprite.runOnlyOneAction({});

            expect(sprite.ye___getActionManager().removeAll.calledOnce).toBeTruthy();
        });
        it("运行指定动作", function () {
            var action = {};
            sinon.stub(sprite, "ye___getActionManager").returns({
                getCount: sinon.stub().returns(0)
            });

            sprite.runOnlyOneAction(action);

            expect(sprite.runAction.calledWith(action)).toBeTruthy();
        });
    });

    describe("getCurrentActions", function () {
        it("获得运行的动作数组", function () {
            var action = [
                {}
            ];
            sinon.stub(sprite.ye___getActionManager(), "getChilds").returns(action);

            expect(sprite.getCurrentActions()).toEqual(action);
        });
    });

    describe("getCurrentAction", function () {
        it("如果没有运行的动作，抛出异常", function () {
            spyOn(sprite, "getCurrentActions").andReturn([]);

            expect(sprite.getCurrentAction).toThrow();
        });
        it("如果当前运行的动作不止一个，断言提示，返回最近加入运行的动作", function () {
            var action1 = {},
                action2 = {a: 1};
            spyOn(sprite, "getCurrentActions").andReturn([action1, action2]);

            expect(function(){
                sprite.getCurrentAction();
            }).toAssert();
            expect(sprite.getCurrentAction()).toEqual(action2);
        });
        it("获得当前运行的动作", function () {
            var action = {};
            spyOn(sprite, "getCurrentActions").andReturn([action]);

            expect(sprite.getCurrentAction()).toEqual(action);
        });
    });

    describe("removeAllActions", function () {
        it("移除运行的所有动作", function () {
            sinon.stub(sprite.ye___getActionManager(), "removeAll");

            sprite.removeAllActions();

            expect(sprite.ye___getActionManager().removeAll.calledOnce).toBeTruthy();
        });
    });

    describe("update", function () {
        it("执行动作", function () {
            var fakeManager = jasmine.createSpyObj("", ["update"]);
            sprite.forTest_setActionManger(fakeManager);

            sprite.update();

            expect(sprite.ye___getActionManager().update).toHaveBeenCalledWith();
        });
        it("播放动画", function () {
            var fakeManager = jasmine.createSpyObj("", ["update"]);
            sprite.forTest_setAnimationManger(fakeManager);

            sprite.update();

            expect(sprite.ye___getAnimationManager().update).toHaveBeenCalledWith();
        });
    });

    describe("操作坐标", function () {
        describe("setPosition", function () {
            it("设置精灵坐标", function () {
                sprite.setPosition(5, 10);

                expect(sprite.getPositionX()).toEqual(5);
                expect(sprite.getPositionY()).toEqual(10);
            });
        });

        describe("setPositionX", function () {
            it("设置精灵坐标X", function () {
            });
        });

        describe("setPositionY", function () {
            it("设置精灵坐标Y", function () {
            });
        });

        describe("getPositionX", function () {
            it("获得精灵坐标X", function () {
            });
        });

        describe("getPositionY", function () {
            it("获得精灵坐标Y", function () {
            });
        });
    });

    describe("操作displayTarget", function () {
        describe("setDisplayTarget", function () {
            it("设置displayTarget", function () {
            });
        });
    });

    describe("精灵大小操作", function () {

        describe("getWidth", function () {
            it("获得精灵宽度", function () {
            });
        });

        describe("setWidth", function () {
            it("设置精灵宽度", function () {
            });
        });

        describe("setHeight", function () {
            it("设置精灵高度", function () {
            });
        });

        describe("getHeight", function () {
            it("获得精灵高度", function () {
            });
        });
    });

    describe("setClipRange", function () {
        it("设置context剪辑区域", function () {
            var range = [
                {x: 1, y: 1},
                {x: 2, y: 1}
            ];

            sprite.setClipRange(range);

            expect(sprite.ye___clipRange).toEqual(range);
        });
    });

    describe("动画", function () {
        var fakeAnimationManager = null,
            fakeAnimationFrameManager = null;

        function buildFakeAnimationManager(spyMethods) {
            fakeAnimationManager = jasmine.createSpyObj("", spyMethods);
            spyOn(sprite, "ye___getAnimationManager").andReturn(fakeAnimationManager);
        }

        function buildFakeAnimationFrameManager(spyMethods) {
            fakeAnimationFrameManager = jasmine.createSpyObj("", spyMethods);
            spyOn(sprite, "getAnimationFrameManager").andReturn(fakeAnimationFrameManager);
        }


        describe("getAnimationFrameManager", function () {
            it("获得animationFrameManager实例", function () {
            });
        });

        describe("runAnim", function () {
            beforeEach(function () {
                buildFakeAnimationFrameManager(["initAndReturnAnim"]);
                buildFakeAnimationManager(["addChild"]);
            });

            it("初始化动画，生成动画绘制数据", function () {
                var animName = "a";

                sprite.runAnim(animName, 1, 2, 3, 4);

                expect(fakeAnimationFrameManager.initAndReturnAnim).toHaveBeenCalledWith(animName, [1, 2, 3, 4]);
            });
            it("加入到AnimationManager的anim中，传入精灵实例", function () {
                var fakeAnim = {};
                testTool.spyReturn(fakeAnimationFrameManager, "initAndReturnAnim", fakeAnim);

                sprite.runAnim();

                expect(fakeAnimationManager.addChild).toHaveBeenCalledWith(fakeAnim, sprite);
            });
        });


        describe("runOnlyOneAnim", function () {
            beforeEach(function () {
                sinon.stub(sprite, "runAnim");
            });

            it("如果播放的动画数大于1，则删除播放的所有动画", function () {
                sinon.stub(sprite, "ye___getAnimationManager").returns({
                    getCount: sinon.stub().returns(2),
                    removeAll: sinon.stub()
                });

                sprite.runOnlyOneAnim("walk", 1, 2, 3, 4);

                expect(sprite.ye___getAnimationManager().removeAll.calledOnce).toBeTruthy();
            });
            it("如果播放的动画数为1且该动画不是要播放的动画，则删除播放的所有动画", function () {
                sinon.stub(sprite, "ye___getAnimationManager").returns({
                    getCount: sinon.stub().returns(1),
                    hasChild: sinon.stub().returns(false),
                    removeAll: sinon.stub()
                });

                sprite.runOnlyOneAnim("walk", 1, 2, 3, 4);

                expect(sprite.ye___getAnimationManager().removeAll.calledOnce).toBeTruthy();
            });
            it("播放指定动画", function () {
                sinon.stub(sprite, "ye___getAnimationManager").returns({
                    getCount: sinon.stub().returns(0)
                });

                sprite.runOnlyOneAnim("walk", 1, 2, 3, 4);

                expect(sprite.runAnim.calledWith("walk", 1, 2, 3, 4)).toBeTruthy();
            });
        });

        describe("getCurrentAnims", function () {
            it("获得播放的动画数组", function () {
                var anims = [
                    {}
                ];
                sinon.stub(sprite.ye___getAnimationManager(), "getChilds").returns(anims);

                expect(sprite.getCurrentAnims()).toEqual(anims);
            });
        });

        describe("getCurrentAnim", function () {
            it("如果没有播放的动画，抛出异常", function () {
                spyOn(sprite, "getCurrentAnims").andReturn([]);

                expect(sprite.getCurrentAnim).toThrow();
            });
            it("如果当前播放的动画不止一个，断言提示，返回最近播放的动画", function () {
                var anim1 = {},
                    anim2 = {a: 1};
                spyOn(sprite, "getCurrentAnims").andReturn([anim1, anim2]);

                expect(function () {
                    sprite.getCurrentAnim();
                }).toAssert();
                expect(sprite.getCurrentAnim()).toEqual(anim2);
            });
            it("获得当前播放的动画", function () {
                var anim = {};
                spyOn(sprite, "getCurrentAnims").andReturn([anim]);

                expect(sprite.getCurrentAnim()).toEqual(anim);
            });
        });

        describe("removeAnim", function () {
            var anim = null;

            beforeEach(function () {
                anim = {};
                sinon.stub(sprite.getAnimationFrameManager(), "getAnim").returns(anim);
                sinon.stub(sprite.ye___getAnimationManager(), "remove");
            });

            it("根据动画名，从AnimationFrameManager中获得动画", function () {
                var animName = "a";

                sprite.removeAnim(animName);

                expect(sprite.getAnimationFrameManager().getAnim.calledWith(animName)).toBeTruthy();
            });
            it("不再播放指定动画", function () {
                sprite.removeAnim("");

                expect(sprite.ye___getAnimationManager().remove.calledWith(anim)).toBeTruthy();
            });
        });

        describe("判断指定动画是否为精灵当前动画", function () {
            it("isCurrentAnim（动画名contain匹配，匹配大小写）", function () {
                var anim1 = sinon.createSpyObj("containTag"),
                    anim2 = sinon.createSpyObj("containTag");
                var anims = [anim1, anim2];
                var animName = "a";
                sinon.stub(sprite, "getCurrentAnims").returns(anims);

                anim1.containTag = sinon.stub().returns(false);
                anim2.containTag = sinon.stub().returns(true);
                expect(sprite.isCurrentAnim(animName)).toBeTruthy();

                anim1.containTag = sinon.stub().returns(false);
                anim2.containTag = sinon.stub().returns(false);
                expect(sprite.isCurrentAnim(animName)).toBeFalsy();
            });
            it("isCurrentAnimExactly（动画名完全匹配）", function () {
                var anim1 = sinon.createSpyObj("hasTag"),
                    anim2 = sinon.createSpyObj("hasTag");
                var anims = [anim1, anim2];
                var animName = "a";
                sinon.stub(sprite, "getCurrentAnims").returns(anims);

                anim1.hasTag = sinon.stub().returns(false);
                anim2.hasTag = sinon.stub().returns(true);
                expect(sprite.isCurrentAnimExactly(animName)).toBeTruthy();

                anim1.hasTag = sinon.stub().returns(false);
                anim2.hasTag = sinon.stub().returns(false);
                expect(sprite.isCurrentAnimExactly(animName)).toBeFalsy();
            });
        });
    });

    describe("虚方法", function () {
        describe("draw", function () {
            describe("绘制displayTarget", function () {
                var target = null;

                beforeEach(function () {
                    spyOn(sprite, "ye___getActionManager").andReturn({
                        getChilds: function () {
                            return [];
                        }
                    });
                    target = {
                        isInstanceOf: function () {
                        }
                    };
                    sprite.setDisplayTarget(target);
                    spyOn(sprite, "ye___setContextAndReturnData");
                    fakeContext = jasmine.createSpyObj("", ["drawImage", "save", "restore"]);
                    spyOn(sprite, "getCanvasData").andReturn({
                        width: 0,
                        height: 0
                    });
                });

                it("设置上下文并返回绘制数据", function () {
                    sprite.draw(fakeContext);

                    expect(sprite.ye___setContextAndReturnData).toHaveBeenCalled();

                });
                it("保存上下文状态", function () {
                    sprite.draw(fakeContext);

                    expect(fakeContext.save).toHaveBeenCalled();
                });

                describe("绘制displayTarget", function () {
                    var fakeData = null,
                        fakeImg = null;

                    beforeEach(function () {
                        fakeData = [1, 2, 3, 4];
                        fakeImg = {};
                        testTool.spyReturn(sprite, "ye___setContextAndReturnData", fakeData);
                    });

                    describe("如果displayTarget为bitmap", function () {
                        beforeEach(function () {
                            target = {
                                isInstanceOf: function () {
                                    if (arguments[0] === YE.Bitmap) {
                                        return true;
                                    }
                                    return false;
                                },
                                img: fakeImg
                            };
                            sprite.setDisplayTarget(target);
                        });

                        it("绘制bitmap的图片对象", function () {
                            sprite.draw(fakeContext);

                            expect(fakeContext.drawImage).toHaveBeenCalledWith(fakeImg, fakeData[0], fakeData[1], fakeData[2], fakeData[3]);
                        });
                    });

                    describe("如果displayTarget为frame", function () {
                        beforeEach(function () {
                            target.getImg = function () {
                                return fakeImg;
                            };
                            target.getX = function () {
                                return 1;
                            };
                            target.getY = function () {
                                return 2;
                            };
                            target.getWidth = function () {
                                return 3;
                            };
                            target.getHeight = function () {
                                return 4;
                            };
                            target.isInstanceOf = function () {
                                if (arguments[0] === YE.Frame) {
                                    return true;
                                }
                                return false;
                            };
                            sprite.setDisplayTarget(target);
                        });

                        it("绘制帧", function () {
                            sprite.draw(fakeContext);

                            expect(fakeContext.drawImage).toHaveBeenCalledWith(fakeImg, 1, 2, 3, 4,
                                fakeData[0], fakeData[1], fakeData[2], fakeData[3]);
                        });
                    });
                });

                it("恢复上下文状态", function () {
                    sprite.draw(fakeContext);

                    expect(fakeContext.restore).toHaveBeenCalled();
                });
            });

            describe("绘制动画帧", function () {
                it("如果没有要播放的动画，则返回", function () {
                    anims = [];

                    expect(sprite.draw()).toEqual("no anim");
                });

                describe("否则，遍历要播放的动画数组", function () {
                    var fakeFrame = null,
                        fakeContext = null,
                        fakeAnim = {},
                        anims = [],
                        fakeData = null;

                    beforeEach(function () {
                        fakeData = [1, 2, 3, 4];
                        spyOn(sprite, "ye___getAnimationManager").andReturn({
                            getChilds: function () {
                                return anims;
                            }
                        });
                        fakeAnim = {
                            getCacheData: function () {
                                return fakeData;
                            }
                        };
                        spyOn(sprite, "getCanvasData").andReturn({
                            width: 0,
                            height: 0
                        });
                        fakeFrame = jasmine.createSpyObj("", ["getImg", "getX", "getY", "getWidth", "getHeight"]);
                        testTool.spyReturn(fakeAnim, "getCurrentFrame", fakeFrame);
                        anims[0] = fakeAnim;
                        anims.forEach = function (func) {
                            func(fakeAnim);
                        };
                        spyOn(sprite, "ye___setContextAndReturnData").andReturn(fakeData);
                        fakeContext = jasmine.createSpyObj("", ["drawImage", "save", "restore"]);
                    });

                    it("获得当前要播放的动画的当前帧", function () {
                        sprite.draw(fakeContext);

                        expect(fakeAnim.getCurrentFrame).toHaveBeenCalled();
                    });
                    it("设置上下文并返回绘制数据", function () {
                        sprite.draw(fakeContext);

                        expect(sprite.ye___setContextAndReturnData).toHaveBeenCalled();
                    });
                    it("保存上下文状态", function () {
                        sprite.draw(fakeContext);

                        expect(fakeContext.save).toHaveBeenCalled();
                    });

                    it("绘制当前帧", function () {
                        var fakeImg = {};
                        fakeFrame.getImg = function () {
                            return fakeImg;
                        };
                        fakeFrame.getX = function () {
                            return 1;
                        };
                        fakeFrame.getY = function () {
                            return 2;
                        };
                        fakeFrame.getWidth = function () {
                            return 3;
                        };
                        fakeFrame.getHeight = function () {
                            return 4;
                        };
                        sprite.draw(fakeContext);

                        expect(fakeContext.drawImage).toHaveBeenCalledWith(fakeImg, 1, 2, 3, 4,
                            fakeData[0], fakeData[1], fakeData[2], fakeData[3]);
                    });
                    it("恢复上下文", function () {
                        sprite.draw(fakeContext);

                        expect(fakeContext.restore).toHaveBeenCalled();

                    });
                });
            });
        });

        describe("ye___setContextAndReturnData", function () {
            var fakeFrame = null,
                fakeContext = null,
                fakeData = [1, 2, 3, 4];

            function prepare() {
                spyOn(sprite, "getOffsetX").andReturn(10);
                spyOn(sprite, "getOffsetY").andReturn(10);
            }

            function buildFakeCanvasData(canvasWidth, canvasHeight) {
                testTool.spyReturn(sprite, "getCanvasData", {
                    width: canvasWidth,
                    height: canvasHeight
                })
            }

            beforeEach(function () {
                fakeFrame = {
                    isFlipX: function () {
                        return false;
                    },
                    isFlipY: function () {
                        return false;
                    },
                    isInstanceOf: function () {
                        return true;
                    },
                    getBitmap: function () {
                        return fakeBitmap;
                    },
                    getPixelOffsetX: function () {
                    },
                    getPixelOffsetY: function () {
                    }
                };
                sprite.setClipRange(null);
                buildFakeCanvasData(0, 0);
            });
            afterEach(function () {
                fakeData = [1, 2, 3, 4];
            });

            it("如果数据中的width和height为undefined，则width和height为精灵的width和height。" +
                "这样做可以保证绘制的帧的大小为最新的精灵大小", function () {
                fakeData[2] = undefined;
                fakeData[3] = undefined;
                spyOn(sprite, "getWidth").andReturn(1);
                spyOn(sprite, "getHeight").andReturn(2);

                var data = sprite.ye___setContextAndReturnData(fakeFrame, fakeData, fakeContext);

                expect(data[2]).toEqual(1);
                expect(data[3]).toEqual(2);
            });

            describe("如果displayTarget为Frame", function () {
                it("获得帧的pixelOffset", function () {
                    spyOn(fakeFrame, "getPixelOffsetX");
                    spyOn(fakeFrame, "getPixelOffsetY");

                    sprite.ye___setContextAndReturnData(fakeFrame, fakeData, fakeContext);

                    expect(fakeFrame.getPixelOffsetX).toHaveBeenCalled();
                    expect(fakeFrame.getPixelOffsetY).toHaveBeenCalled();
                });
            });

            describe("如果displayTarget为Bitmap", function () {
                it("获得它的pixelOffset", function () {
                });
            });

            describe("设置上下文", function () {
                beforeEach(function () {
                    prepare();
                    fakeContext = jasmine.createSpyObj("", ["translate", "scale"]);
                });

                describe("如果要剪辑区域", function () {
                    var clipRange = null;

                    beforeEach(function () {
                        fakeContext = jasmine.createSpyObj("", ["beginPath", "moveTo", "lineTo", "closePath", "clip"]);
                        clipRange = [
                            {x: 1, y: 1},
                            {x: 2, y: 1},
                            {x: 2, y: 2}
                        ];
                        sprite.setClipRange(clipRange);
                    });

                    it("剪辑该区域", function () {
                        sprite.ye___setContextAndReturnData(fakeFrame, fakeData, fakeContext, 0, 0);

                        expect(fakeContext.beginPath).toHaveBeenCalled();
                        expect(fakeContext.moveTo).toHaveBeenCalledWith(1, 1);
                        expect(fakeContext.lineTo.calls[0].args).toEqual([2, 1]);
                        expect(fakeContext.lineTo.calls[1].args).toEqual([2, 2]);
                        expect(fakeContext.lineTo.calls[2].args).toEqual([1, 1]);
                        expect(fakeContext.closePath).toHaveBeenCalled();
                        expect(fakeContext.clip).toHaveBeenCalled();
                    });
                    it("置剪辑区域为空", function () {
                        sprite.ye___setContextAndReturnData(fakeFrame, fakeData, fakeContext, 0, 0);

                        expect(sprite.ye___clipRange).toBeNull();
                    });
                });


                describe("如果要水平翻转", function () {
                    beforeEach(function () {
                        spyOn(fakeFrame, "isFlipX").andReturn(true);
                        spyOn(fakeFrame, "getPixelOffsetX").andReturn(1);
                        fakeData[0] = 11;
                        fakeData[2] = 5;
                        buildFakeCanvasData(10, 0);
                    });

                    it("则通过翻转画布来实现", function () {
                        sprite.ye___setContextAndReturnData(fakeFrame, fakeData, fakeContext);

                        expect(fakeContext.translate).toHaveBeenCalledWith(10, 0);
                        expect(fakeContext.scale).toHaveBeenCalledWith(-1, 1);
                    });
                    it("设置x坐标", function () {
                        var data = sprite.ye___setContextAndReturnData(fakeFrame, fakeData, fakeContext);

                        expect(data[0]).toEqual(5);
                    });
                });

                describe("如果要垂直翻转", function () {
                    beforeEach(function () {
                        spyOn(fakeFrame, "isFlipY").andReturn(true);
                        spyOn(fakeFrame, "getPixelOffsetY").andReturn(1);
                        fakeData[1] = 12;
                        fakeData[3] = 5;
                        buildFakeCanvasData(0, 10);
                    });

                    it("则通过翻转画布来实现", function () {
                        sprite.ye___setContextAndReturnData(fakeFrame, fakeData, fakeContext);

                        expect(fakeContext.translate).toHaveBeenCalledWith(0, 10);
                        expect(fakeContext.scale).toHaveBeenCalledWith(1, -1);
                    });
                    it("设置y坐标", function () {
                        var data = sprite.ye___setContextAndReturnData(fakeFrame, fakeData, fakeContext);

                        expect(data[1]).toEqual(4);
                    });
                });

                describe("如果既要水平翻转，又要垂直翻转", function () {
                    beforeEach(function () {
                        spyOn(fakeFrame, "isFlipX").andReturn(true);
                        spyOn(fakeFrame, "isFlipY").andReturn(true);
                        spyOn(fakeFrame, "getPixelOffsetX").andReturn(1);
                        fakeData[0] = 11;
                        fakeData[2] = 5;
                        spyOn(fakeFrame, "getPixelOffsetY").andReturn(1);
                        fakeData[1] = 12;
                        fakeData[3] = 5;
                        buildFakeCanvasData(10, 10);
                    });

                    it("则通过翻转画布来实现", function () {
                        sprite.ye___setContextAndReturnData(fakeFrame, fakeData, fakeContext);

                        expect(fakeContext.translate.calls.length).toEqual(2);
                        expect(fakeContext.scale.calls.length).toEqual(2);
                    });
                    it("设置坐标", function () {
                        var data = sprite.ye___setContextAndReturnData(fakeFrame, fakeData, fakeContext);

                        expect(data[0]).toEqual(5);
                        expect(data[1]).toEqual(4);
                    });
                });
            });

            it("否则，设置默认坐标", function () {
                prepare();
                spyOn(fakeFrame, "getPixelOffsetX").andReturn(1);
                spyOn(fakeFrame, "getPixelOffsetY").andReturn(1);

                var data = sprite.ye___setContextAndReturnData(fakeFrame, fakeData, fakeContext);

                expect(data[0]).toEqual(-10);
                expect(data[1]).toEqual(-9);
            });
        });

        describe("clear", function () {
            it("从画布中清除精灵", function () {
                var fakeContext = jasmine.createSpyObj("", ["clearRect"]);
                sprite.setPosition(1, 2);
                sinon.stub(sprite, "getWidth").returns(3);
                sinon.stub(sprite, "getHeight").returns(4);

                sprite.clear(fakeContext);

                expect(fakeContext.clearRect).toHaveBeenCalledWith(1, 2, 3, 4);
            });
        });
    });

    describe("钩子", function () {
        it("onbeforeDraw存在", function () {
            expect(sprite.onbeforeDraw).toBeExist();
        });
        it("onafterDraw存在", function () {
            expect(sprite.onafterDraw).toBeExist();
        });
    });

});