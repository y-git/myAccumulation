describe("main.js", function () {
    var main = monitor_list.main,
        //monitor_list.ui = null,
        //monitor_list.calc = null,
        //monitor_list.dateHelper = null,
        tempUI = null,
        tempCalc = null,
        tempHelper = null;

    function init() {
        monitor_list.ui = monitor_list.ui || {};
        monitor_list.calc = monitor_list.calc || {};
        monitor_list.dateHelper = monitor_list.dateHelper || {};
    };
    function backUp() {
        tempUI = testTool.extendDeep(monitor_list.ui);
        tempCalc = testTool.extendDeep(monitor_list.calc);
        tempHelper = testTool.extendDeep(monitor_list.dateHelper);
    };
    function restore() {
        monitor_list.ui = tempUI;
        monitor_list.calc = tempCalc;
        monitor_list.dateHelper = tempHelper;
    };

    beforeEach(function () {
        init();
        backUp();
    });
    afterEach(function () {
        restore();
    });

    describe("showCalcHtml", function () {
    });

    describe("ajaxInit，初始化ajax获得的列表", function () {
        it("调用monitor_list.ui.ajaxInit", function () {
            monitor_list.ui.ajaxInit = jasmine.createSpy();

            main.ajaxInit();

            expect(monitor_list.ui.ajaxInit).toHaveBeenCalled();
        });
    });

    describe("pageInit，初始化页面", function () {
        it("调用monitor_list.ui.pageInit", function () {
            monitor_list.ui.pageInit = jasmine.createSpy();

            main.pageInit();

            expect(monitor_list.ui.pageInit).toHaveBeenCalled();
        });
    });

    describe("computeAndShowPrice", function () {
        describe("验证日期", function () {
            function insertDom() {
                var body = '<span id="ddate"></span>';

                $("<div id='test'>").append(body).appendTo($("body"));
            };
            function removeDom() {
                $("#test").remove();
            };

            beforeEach(function () {
                insertDom();
            });
            afterEach(function () {
                removeDom();
            });


            it("如果起始日期大于终止日期，则提示日期错误，费用显示清空并返回false", function () {
                monitor_list.ui.getStartTime = function () {
                    return "08/13/2013";
                };
                monitor_list.ui.getEndTime = function () {
                    return "08/12/2013";
                };
                monitor_list.dateHelper.converToUtc = function (time) {
                    if (time === "08/13/2013") {
                        return 2;
                    }
                    else if (time === "08/12/2013") {
                        return 1;
                    }
                };
                spyOn(monitor_list.ui, "showPrice");

                var result = main.computeAndShowPrice();

                expect($("#ddate").text()).toEqual("起始日期必须早于或等于终止日期");
                expect(result).toBeFalsy();
                expect(monitor_list.ui.showPrice).toHaveBeenCalledWith(false);
            });
        });

        describe("通过验证", function () {
            beforeEach(function () {
                monitor_list.ui.getStartTime = function () {
                    return "08/12/2013";
                };
                monitor_list.ui.getEndTime = function () {
                    return "08/13/2013";
                };
                monitor_list.dateHelper.converToUtc = function (time) {
                    if (time === "08/13/2013") {
                        return 2;
                    }
                    else if (time === "08/12/2013") {
                        return 1;
                    }
                };
            });

            describe("使用ajax获得数据", function () {
                var fakeData = {};

                it("如果超过指定的延迟时间，则显示加载中图片", function () {
                    spyOn(YYC.Tool.ajaxHelper, "showSingleLoading");

                    main.computeAndShowPrice();

                    //expect(YYC.Tool.ajaxHelper.showSingleLoading).toHaveBeenCalledWith("#calc_loading", "#calc_main", 0.5, "http://cos.gtime.isd.com/open_proj/qcloud/cos/css/img/loading.gif");
                    expect(YYC.Tool.ajaxHelper.showSingleLoading).toHaveBeenCalled();
                });
                it("验证ajax参数", function () {
                    spyOn($, "ajax");
                    main.accessID = 100;

                    main.computeAndShowPrice();
                    var arg = $.ajax.calls[0].args[0];

                    expect(arg.url).toContain("GetUsageDetailInfoByAccessId");
                    expect(arg.data).toEqual({
                        accessId: 100,
                        starttime: 1,
                        endtime: 2
                    });
                });

                describe("如果数据正确", function () {
                    function fakeAjaxData() {
                        spyOn($, "ajax").andCallFake(function (setting) {
                            setting.success(fakeData);
                        });
                    };

                    beforeEach(function () {
                        fakeData.code = 0;

                        monitor_list.calc.compute = function () { };
                        monitor_list.ui.showPrice = function () { };

                        fakeData.data = {
                            items: {}
                        };
                        //testTool.fakeAjaxData("ajax", fakeData);
                        fakeAjaxData();
                    });

                    it("调用monitor_list.calc.compute，获得items参数", function () {
                        spyOn(monitor_list.calc, "compute");

                        main.computeAndShowPrice();

                        expect(monitor_list.calc.compute).toHaveBeenCalledWith(fakeData.data.items);
                    });
                    it("调用monitor_list.ui.showPrice，它的参数为monitor_list.calc.compute的返回值", function () {
                        spyOn(monitor_list.ui, "showPrice");
                        monitor_list.calc.compute = function () {
                            return 0.5;
                        };

                        main.computeAndShowPrice();

                        expect(monitor_list.ui.showPrice).toHaveBeenCalledWith(0.5);
                    });

                });
            });
        });
    });
});