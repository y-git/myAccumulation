//*学习jasmine

describe("jasmine", function () {
    var foo = null;

    function createFoo() {
        foo = {
            method: function () {
                return "method";
            }
        };
    };
    function restoreFoo() {
        foo = {
            method: function () {
                return "method";
            }
        };
    };

    createFoo();

    beforeEach(function () {
        //        console.log("1");
    });
    afterEach(function () {
    });

    describe("spyOn", function () {
        //        function judge(str, func) {
        //            restoreFoo();

        //            it("调用" + str, function () {
        //                func();

        //                foo.method();

        //                expect(foo.method).toHaveBeenCalled();
        //            });
        //            it("上个it中" + str + "在当前it中不起作用", function () {
        //                var func = function () {
        //                    expect(foo.method).toHaveBeenCalled();
        //                };

        //                foo.method();

        //                expect(func).toThrow();
        //            });
        //        };


        // it("spyOn能够监视变量", function () {
        //     var foo = {
        //         a: null
        //     };

        //     spyOn(foo, "a");

        //     a = {
        //         act: function () {
        //         }
        //     };

        //     foo.a.act();

        //     expect(function () {
        //         expect(foo.a.act).toHaveBeenCalled();
        //     }).toThrow("foo.a.act is not a function");
        //});


        //it("spyOn能够监视方法中的变量", function () {
        //    var foo = {
        //        a: function () {
        //            this.b = {
        //                act: function () {
        //                }
        //            }
        //        },
        //        init: function () {
        //            this.a();
        //            this.b.act();
        //        }
        //    };

        //    spyOn(foo, "a");

        //    foo.init();

        //    expect(foo.b.act).toHaveBeenCalled();
        //});


        it("spyOn监视的方法不真的执行", function () {
            var foo = {
                a: function () {
                    this.b();
                    this.c();
                },
                b: function () {
                    this.d = 1;
                },
                c: function () {
                },
                d: 0
            }

            spyOn(foo, "b");

            foo.a();

            expect(foo.d).toEqual(0);
            expect(foo.b).toHaveBeenCalled();
        });
        it("andCallThrough监视的方法真的执行", function () {
            var foo = {
                a: function () {
                    this.b();
                    this.c();
                },
                b: function () {
                    this.d = 1;
                },
                c: function () {
                },
                d: 0
            }

            spyOn(foo, "b").andCallThrough();

            foo.a();

            expect(foo.d).toEqual(1);
            expect(foo.b).toHaveBeenCalled();
        });
        it("spyOn、andReturn、andCallFake监视不存在的函数时抛出错误", function () {
            var func1 = function () {
                spyOn(foo, "notExist");
            };
            var func2 = function () {
                spyOn(foo, "notExist").andReturn("");
            };
            var func3 = function () {
                spyOn(foo, "notExist").andCallFake(function () {
                });
            };

            expect(func1).toThrow();
            expect(func2).toThrow();
            expect(func3).toThrow();
        });
        it("spyOn、andReturn、andCallFake监视不存在的对象时抛出错误", function () {
            var func1 = function () {
                spyOn(no, "notExist");
            };
            var func2 = function () {
                spyOn(no, "notExist").andReturn("");
            };
            var func3 = function () {
                spyOn(no, "notExist").andCallFake(function () {
                });
            };

            expect(func1).toThrow();
            expect(func2).toThrow();
            expect(func3).toThrow();
        });

        describe("调用spyOn后，后续的测试不受影响", function () {
            restoreFoo();

            it("调用spyOn", function () {
                spyOn(foo, "method");

                foo.method();

                expect(foo.method).toHaveBeenCalled();
            });
            it("后续的测试不受影响", function () {
                var func = function () {
                    expect(foo.method).toHaveBeenCalled();
                };

                foo.method();

                expect(func).toThrow();
            });
        });

        describe("调用andReturn后，后续的测试不受影响", function () {
            restoreFoo();

            it("调用andReturn", function () {
                spyOn(foo, "method").andReturn("spyOn");
                var result = null;

                result = foo.method();

                expect(foo.method).toHaveBeenCalled();
                expect(result).toEqual("spyOn");
            });
            it("后续的测试不受影响", function () {
                var func = function () {
                    expect(foo.method).toHaveBeenCalled();
                };
                var result = null;

                result = foo.method();

                expect(func).toThrow();
                expect(result).toEqual("method");
            });
        });

        describe("调用andCallFake后，后续的测试不受影响", function () {
            restoreFoo();

            it("调用addCallFake", function () {
                spyOn(foo, "method").andCallFake(function () {
                    return "fake";
                });
                var result = null;

                result = foo.method();

                expect(foo.method).toHaveBeenCalled();
                expect(result).toEqual("fake");
            });
            it("后续的测试不受影响", function () {
                var func = function () {
                    expect(foo.method).toHaveBeenCalled();
                };
                var result = null;

                result = foo.method();

                expect(func).toThrow();
                expect(result).toEqual("method");
            });
        });
    });

    //*示例：var func = jasmine.createSpy(functionId)

    describe("createSpy", function () {
        var foo = {};

        describe("如果创建的是已存在的函数", function () {

            describe("验证functionID对创建的监视函数没有影响", function () {
                beforeEach(function () {
                    createFoo();
                });
                afterEach(function () {
                    restoreFoo();
                });

                it("functionId为原函数名 -> 原函数被替换为空函数", function () {
                    foo.method = jasmine.createSpy("method");

                    expect(foo.method()).toEqual(undefined);

                });
                it("functionId不为原函数名 -> 原函数也要受影响（被替换为空函数），不创建名为functionId的函数", function () {
                    createFoo();

                    foo.method = jasmine.createSpy("spyMethod");

                    expect(foo.method()).toEqual(undefined);
                    expect(foo.spyMethod).toBeUndefined();
                });
            });

            describe("调用createSpy后，后续的测试要受到影响！", function () {
                //beforeEach(function () {
                //    createFoo();
                //});
                //afterEach(function () {
                //    restoreFoo();
                //});

                restoreFoo();

                it("调用createSpy", function () {
                    foo.t = jasmine.createSpy("t");
                    foo.method = jasmine.createSpy("method");

                    foo.t();

                    expect(foo.t).toHaveBeenCalled();
                });
                it("后续的测试要受到影响", function () {
                    expect(foo.t).not.toBeUndefined();

                    expect(foo.method()).toEqual(undefined);
                });
            });
        });

        describe("如果创建的是不存在的函数", function () {
            //            beforeEach(function () {
            //                createFoo();
            //            });
            //            afterEach(function () {
            //                restoreFoo();
            //            });

            //            it("新函数为空函数", function () {
            //                foo.noExist = jasmine.createSpy("noExist");

            //                expect(foo.method()).toEqual(undefined);
            //            });

            describe("调用createSpy后，后续的测试要受影响！", function () {
                restoreFoo();

                it("调用createSpy", function () {
                    foo.noExist = jasmine.createSpy("noExist");

                    foo.noExist();

                    expect(foo.noExist).toHaveBeenCalled();
                });
                it("后续的测试要受影响！", function () {
                    foo.noExist();

                    expect(foo.noExist).toHaveBeenCalled();
                });
            });
        });

        it("创建一个空函数并监视。要注意在测试完后清除该函数，否则后续测试会受影响", function () {
            var set = jasmine.createSpy();

            set();

            expect(set.calls.length).toEqual(1);
        });
        it("创建一个指定的函数并监视。要注意在测试完后清除该函数，否则后续测试会受影响", function () {
            var t = 1;
            foo.set = jasmine.createSpy().andCallFake(function () {
                t = 100;
            });

            foo.set();

            expect(t).toEqual(100);

            testTool.deleteMember(foo, "set");
        });
    });

    describe("异步测试", function () {
        function clearTimer(firstIndex) {
            var i = 0, num = firstIndex + 500;

            //以第一个计时器序号为起始值（计时器的序号会递加，但是ie下每次刷新浏览器后计时器序号会叠加，
            //且最初的序号也不一定从1开始（可能比1大），也就是说ie下计时器序号的起始值可能很大；chrome和firefox计时器每次从1开始）
            for (i = firstIndex; i < num; i++) {
                window.clearTimeout(i);
            }
            for (i = firstIndex.timer_firstIndex; i < num; i++) {
                window.clearInterval(i);
            }
        };

        var firstIndex = 0;

        afterEach(function () {
            clearTimer(firstIndex); //清除所有定时器，以免测试之间的定时器互相干扰
        });

        describe("setTimeout、setInterval异步", function () {
            it("如果不调用jasmine.Clock.useMock()，则调用jasmine.Clock.tick抛出错误", function () {
                expect(function () {
                    jasmine.Clock.tick(999);
                }).toThrow();
            });
            it("异步测试", function () {
                var flag = false;
                jasmine.Clock.useMock();

                firstIndex = setTimeout(function () {   //firstIndex赋值
                    flag = true;
                }, 1000);

                jasmine.Clock.tick(999);

                expect(flag).toBeFalsy();

                jasmine.Clock.tick(1);  //1000ms后，flag为true

                expect(flag).toBeTruthy();
            });

            describe("使用jasmine.Clock.useMock()后，setTimeout和setInterval中的时间不再受系统时间影响，而是通过tick影响", function () {
                //var timer1, timer2;

                //afterEach(function () {
                //    clearTimeout(timer1);
                //    clearTimeout(timer2);
                //});

                it("setTimeout和setInterval中的时间不再受系统时间影响", function () {
                    var flag = false;
                    jasmine.Clock.useMock();

                    setTimeout(function () {
                        flag = true;
                    }, 1000);


                    setTimeout(function () {
                        console.log("1000ms后"); //1000ms后不执行
                        expect(flag).toBeFalsy();   //1000ms后不执行
                    }, 1000);
                });
                it("而是通过tick影响", function () {
                    var flag = false;
                    jasmine.Clock.useMock();

                    setTimeout(function () {
                        flag = true;
                    }, 1000);

                    jasmine.Clock.tick(1001);
                    expect(flag).toBeTruthy();
                });
            });
        });

        describe("其它异步（如预加载图片成功后调用onload测试、ajax回调测试等）", function () {
            it("使用waitsFor、runs实现异步测试", function () {
                var flag = false, runFlag = false;

                runs(function () {
                    setTimeout(function () {
                        flag = true;
                        runFlag = true;
                    }, 1000);
                });

                //指定时间内（此处为2s）返回true则执行waitsFor后面的runs，
                //到时未返回则本spec出错，返回第二个参数错误信息（此处为“在指定时间2秒内，flag为false”）
                waitsFor(function () {
                    return flag;
                }, "在指定时间2秒内，flag为false", 2000);

                runs(function () {
                    expect(runFlag).toBeTruthy();
                });
                runs(function () {
                    expect(false).toBeFalsy();
                });
            });
            it("调用tool方法（封装waitsFor、runs），实现异步测试", function () {
                /*

                 //*延迟100ms后，执行“Game.init();”。
                 //*然后再延迟100ms后，执行“expect(Game.context.createPattern.calls.length).toEqual(1);”

                 testTool.asynRun(function () {
                 Game.init();
                 }, 100);
                 testTool.asynRun(function () {
                 expect(Game.context.createPattern.calls.length).toEqual(1);
                 }, 100);



                 详见showMapSpec.js，参考调用代码：

                 it("隐藏加载进度条", function () {
                 expect($("#progressBar").css("display")).toEqual("block");
                 Game.init();

                 //延迟500ms测试
                 testTool.asynRun(function () {
                 expect($("#progressBar").css("display")).toEqual("none");
                 }, 500);
                 });
                 */
            });
        });
    });

    describe("toContain", function () {
        it("参数为RegExp构造函数参数，进行正则判断是否match", function () {
            expect("1+2").toContain("1\\+2");
        });
    });

});
