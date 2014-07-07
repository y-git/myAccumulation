describe("main.js", function () {
    var main = detail.main,
        mock = new YYC.YMock();

    beforeEach(function () {
        mock.createObj("chartDetail").replace({
            starttime: 1,
            endtime: 2
        });
    });
    afterEach(function () {
        mock.restore();
    });

    describe("bindZoneEvent", function () {
        var fakeEvent = {},
            fakeDiv = {},
            uiMock = null,
            returnValue = null;

        beforeEach(function () {
            fakeDiv = {
                mouseout: function (func) {
                }
            };

            uiMock = mock.createObj("detail.ui");

            uiMock.mock("getDiv").return(fakeDiv);
            uiMock.mock("getHeader").return({
                mouseover: function (func) {
                    returnValue = func(fakeEvent);
                }
            });

            uiMock.mock("setDivWidth");
        });

        describe("鼠标移入header时", function () {
            function insertDom() {
                $("body").append($("<div class='mod_cloud_monitor_cvm_list'>"));
                $(".mod_cloud_monitor_cvm_list").append($("<div class='hd'>"));
            };
            function removeDom() {
                $(".mod_cloud_monitor_cvm_list").remove();
            };

            beforeEach(function () {
                insertDom();
            });
            afterEach(function () {
                removeDom();
            });

            it("如果鼠标移到“返回”按钮上，则返回false，不显示浮层", function () {
                fakeEvent.target = {
                    tagName: "SPAN"
                };

                main.bindZoneEvent();

                expect(returnValue).toBeFalsy();
            });

            describe("否则", function () {
                beforeEach(function () {
                    fakeEvent.target = {
                        tagName: "DIV"
                    };
                });

                it("设置浮层的宽度为header的宽度", function () {
                    main.setFirstDraw(false);
                    uiMock.mock("show");

                    main.bindZoneEvent();

                    expect(detail.ui.setDivWidth).toHaveBeenCalled();
                });

                describe("如果为第一次绘制", function () {
                    describe("绘制图形", function () {
                        var fakeData = null,
                            tempHelper = null;

                        beforeEach(function () {
                            main.setFirstDraw(true);
                        });
                        afterEach(function () {
                        });

                        describe("测试ajax参数", function () {
                            it("测试url", function () {
                                spyOn($, "getJSON");
                                main.bindZoneEvent();

                                expect($.getJSON.calls[0].args[0]).toContain("StorageStatisticsDetail");
                            });
                        });

                        describe("测试ajax回调函数", function () {
                            function buildFakeData(len) {
                                var i = 0,
                                    arr = [];

                                for (i = 0; i < len; i++) {
                                    arr.push(1);
                                }

                                return arr;
                            };

                            beforeEach(function () {
                                fakeData = {
                                    data: {
                                    }
                                };
                                testTool.fakeAjaxData("getJSON", fakeData);

                                mock.createObj().mock("zonequery");

                                uiMock.mock("show");
                            });
                            afterEach(function () {
                            });

                            it("绘制highchart", function () {
                                main.bindZoneEvent();

                                expect(window.zonequery).toHaveBeenCalled();
                            });
                            it("显示highchart", function () {
                                fakeData.data = buildFakeData(500);

                                main.bindZoneEvent();

                                expect(window.detail.ui.show).toHaveBeenCalledWith(500);
                            });
                        });
                    });
                });

                describe("否则", function () {
                    beforeEach(function () {
                        main.setFirstDraw(false);
                    });


                    it("显示highchart", function () {
                        main.setLen(100);
                        uiMock.mock("show");

                        main.bindZoneEvent();

                        expect(window.detail.ui.show).toHaveBeenCalledWith(100);
                    });
                });
            });
        });

        describe("鼠标移出浮层时", function () {
            it("如果鼠标移到header和div外面，则隐藏浮层", function () {
            });
        });
    });

});