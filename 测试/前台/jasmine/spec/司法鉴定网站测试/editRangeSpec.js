describe("editRange.js", function () {
    var editRange = null;

    function insertDom() {
        var dom = $("<div id='test' style='display:none;'><input type='hidden' id='model_body' value='RangeBody'/>"
            + "<textarea id='body' name='body'></textarea><span id='dbody'></span></div>")
        $("body").append(dom);
    };
    function removeDom() {
        $("#test").remove();
    };

    beforeEach(function () {
        //        spyOn(editRange, "prepare");
        editRange = new EditRange();
    });
    afterEach(function () {
    });

    //    describe("_checkAndShow", function () {
    //        beforeEach(function () {
    //            insertDom();
    //            editRange = new EditRange();
    //            editRange.prepare();
    //        });
    //        afterEach(function () {
    //            removeDom();
    //        });

    //        it("方法存在", function () {
    //            expect(editRange._checkAndShow).toBeDefined();
    //        });
    //        it("鉴定范围字数不在1-6000范围内时返回false", function () {
    //            var result1 = null,
    //                    result2 = null,
    //                    i = 0,
    //                    str = "";

    //            //            editRange._createXh();
    //            editRange._xh.setSource("");

    //            result1 = editRange._checkAndShow("");
    //            //            message1 = $("#drange").html();

    //            for (i = 0; i < 3000; i++) {
    //                str += "a";
    //            }
    //            for (i = 0; i < 3001; i++) {
    //                str += "啊";
    //            }
    //            editRange._xh.setSource(str);

    //            result2 = editRange._checkAndShow(str);
    //            //            message2 = $("#drange").html();

    //            expect(result1).toBeFalsy();
    //            expect(result2).toBeFalsy();

    //        });
    //    });

    //    describe("_send", function () {
    //        function spyOnCallback(result) {
    //            spyOn($, "post").andCallFake(function (url, value, func) {
    //                func(result);
    //            });
    //            spyOn(window, "alert");
    //        };
    //        function send() {
    //            editRange._send("/Admin/Range_Submit", { body: "test" });
    //        };

    //        beforeEach(function () {
    //            insertDom();
    //            editRange = new EditRange();
    //            editRange.prepare();
    //            //            //构造数据
    //            //            editRange._xh.setSource("test");
    //        });
    //        afterEach(function () {
    //            removeDom();

    //            //            //清除数据（调用removeDom后，已经清除了数据）
    //        });

    //        it("验证$.post参数", function () {
    //            spyOn($, "post");

    //            //            editRange._send("/Admin/Range_Submit", { body: "test" });
    //            send();

    //            expect($.post.mostRecentCall.args[0]).toEqual("/Admin/Range_Submit");
    //            expect($.post.mostRecentCall.args[1].body).toEqual("test");
    //            expect($.post.mostRecentCall.args[2]).toBeFunction();
    //        });
    //        it("回调函数返回值为Fail时提示", function () {
    //            spyOnCallback("Fail");

    //            send();
    //            //            editRange._send();

    //            expect(window.alert.mostRecentCall.args[0]).toEqual("提交失败");
    //        });
    //        it("回调函数返回值为Success时提示", function () {
    //            spyOnCallback("Success");

    //            send();
    //            //            editRange.checkAndSubmit();

    //            expect(window.alert.mostRecentCall.args[0]).toEqual("提交成功");
    //        });
    //    });

    describe("prepare", function () {
        var func = null;

        beforeEach(function () {
            insertDom();
            editRange = new EditRange();
            func = editRange.prepare;
            //            spyOn($.fn, "xheditor");
        });
        afterEach(function () {
            removeDom();
        });


        it("存在prepare方法", function () {
            expect(func).not.toBeUndefined();
        });
        it("创建xh成功", function () {
            editRange.prepare();

            expect(editRange._xh).not.toBeNull();
        });
        it("初始化鉴定范围成功", function () {
            editRange.prepare();

            var source = editRange._xh.getSource();

            expect(source).toEqual("RangeBody");
        });
    });

    describe("checkAndSubmit", function () {
        //        beforeEach(function () {
        //            insertDom();
        //            editRange = new EditRange();
        //            editRange.prepare();
        //        });
        //        afterEach(function () {
        //            removeDom();
        //        });

        it("方法存在", function () {
            expect(editRange.checkAndSubmit).toBeDefined();
        });

        //测试_checkAndShow的行为
        describe("check", function () {
            beforeEach(function () {
                insertDom();
                editRange = new EditRange();
                editRange.prepare();
                //判断是否返回（即函数checkAndSubmit调用了_checkAndShow后，判断结果后返回。没有调用_send方法）
                spyOn(editRange, "_send");
            });
            afterEach(function () {
                removeDom();
            });

            it("鉴定范围字数不在1-6000范围内时显示错误信息并返回", function () {
                var message1 = null,
                        message2 = null,
                        i = 0,
                        str = "";

                editRange._xh.setSource("");

                editRange.checkAndSubmit();
                message1 = $("#dbody").html();

                for (i = 0; i < 3000; i++) {
                    str += "a";
                }
                for (i = 0; i < 3001; i++) {
                    str += "啊";
                }
                editRange._xh.setSource(str);

                editRange.checkAndSubmit();
                message2 = $("#dbody").html();

                //_send没有被调用
                expect(editRange._send).not.toHaveBeenCalled();
                //显示错误信息
                expect(message1).toEqual("字数必须为1-6000字");
                expect(message2).toEqual("字数必须为1-6000字");
            });
        });

        //测试_send的行为
        describe("submit", function () {
            function spyOnCallback(result) {
                spyOn($, "post").andCallFake(function (url, value, func) {
                    func(result);
                });
                spyOn(window, "alert");
            };


            beforeEach(function () {
                insertDom();
                editRange = new EditRange();
                editRange.prepare();
                //构造数据
                editRange._xh.setSource("test");
            });
            afterEach(function () {
                removeDom();

                //清除数据（调用removeDom后，已经清除了数据）
            });

            it("验证$.post参数", function () {
                spyOn($, "post");

                editRange.checkAndSubmit();

                expect($.post.mostRecentCall.args[0]).toEqual("/Admin/Range_Submit");
                expect($.post.mostRecentCall.args[1].body).toEqual("test");
                expect($.post.mostRecentCall.args[2]).toBeFunction();
            });
            it("回调函数返回值为Fail时提示", function () {
                spyOnCallback("Fail");

                editRange.checkAndSubmit();

                expect(window.alert.mostRecentCall.args[0]).toEqual("提交失败");
            });
            it("回调函数返回值为Success时提示", function () {
                spyOnCallback("Success");

                editRange.checkAndSubmit();

                expect(window.alert.mostRecentCall.args[0]).toEqual("提交成功");
            });
        });
    });

    describe("reset", function () {
        beforeEach(function () {
            insertDom();
            editRange = new EditRange();
            editRange.prepare();
        });
        afterEach(function () {
            removeDom();
        });

        it("方法存在", function () {
            expect(editRange.reset).toBeDefined();
        });
        it("复原成功", function () {
            $("#model_body").val("original");  //原始数据
            editRange._xh.setSource("new"); //现有数据

            editRange.reset();

            expect(editRange._xh.getSource()).toEqual("original");
        });
    });
});