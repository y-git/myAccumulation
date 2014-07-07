describe("parent_detail.js", function () {
    var adminDetail = null;

    function insertDom() {
        var dom = $("<div id='test' style='display:none;'><input type='hidden' id='model_body' value='RangeBody'/>"
            + "<textarea id='body' name='body'></textarea><span id='dbody'></span></div>")
        $("body").append(dom);
    };
    function removeDom() {
        $("#test").remove();
    };

    beforeEach(function () {
        adminDetail = new AdminType1_Edit();
    });
    afterEach(function () {
    });

    describe("checkAndSubmit", function () {
        //        beforeEach(function () {
        //            insertDom();
        //            adminDetail = new AdminType1_Edit();
        //            adminDetail.prepare();
        //        });
        //        afterEach(function () {
        //            removeDom();
        //        });

        it("方法存在", function () {
            expect(adminDetail.checkAndSubmit).toBeDefined();
        });

        //测试_checkAndShow的行为
        describe("check", function () {
            beforeEach(function () {
                insertDom();
                adminDetail = new AdminType1_Edit();
                adminDetail.prepare();
                //判断是否返回（即函数checkAndSubmit调用了_checkAndShow后，判断结果后返回。没有调用_send方法）
                spyOn(adminDetail, "_send");
            });
            afterEach(function () {
                removeDom();
            });

            it("鉴定范围字数不在1-6000范围内时显示错误信息并返回", function () {
                var message1 = null,
                        message2 = null,
                        i = 0,
                        str = "";

                adminDetail._xh.setSource("");

                adminDetail.checkAndSubmit();
                message1 = $("#drange").html();

                for (i = 0; i < 3000; i++) {
                    str += "a";
                }
                for (i = 0; i < 3001; i++) {
                    str += "啊";
                }
                adminDetail._xh.setSource(str);

                adminDetail.checkAndSubmit();
                message2 = $("#drange").html();

                //_send没有被调用
                expect(adminDetail._send).not.toHaveBeenCalled();
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
                adminDetail = new AdminType1_Edit();
                adminDetail.prepare();
                //构造数据
                adminDetail._xh.setSource("test");
            });
            afterEach(function () {
                removeDom();

                //清除数据（调用removeDom后，已经清除了数据）
            });

            it("验证$.post参数", function () {
                spyOn($, "post");

                adminDetail.checkAndSubmit();

                expect($.post.mostRecentCall.args[0]).toEqual("/Admin/Range_Submit");
                expect($.post.mostRecentCall.args[1].body).toEqual("test");
                expect($.post.mostRecentCall.args[2]).toBeFunction();
            });
            it("回调函数返回值为Fail时提示", function () {
                spyOnCallback("Fail");

                adminDetail.checkAndSubmit();

                expect(window.alert.mostRecentCall.args[0]).toEqual("提交失败");
            });
            it("回调函数返回值为Success时提示", function () {
                spyOnCallback("Success");

                adminDetail.checkAndSubmit();

                expect(window.alert.mostRecentCall.args[0]).toEqual("提交成功");
            });
        });
    });
});