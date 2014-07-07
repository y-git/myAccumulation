describe("query.js", function () {
    var query = memo.query,
        tempHelper = null;


    function init() {
        window.helper = window.helper || {};
    };
    function backUp() {
        tempHelper = testTool.extendDeep(window.helper);
    };
    function restore() {
        window.helper = tempHelper;
    };

    beforeEach(function () {
        init();
        backUp();
    });
    afterEach(function () {
        restore();
    });


    describe("init", function () {
        it("获得startTime、endTime", function () {
            //query.init(100, 200);

            //expect(query._startTime).toEqual(100);
            //expect(query._endTime).toEqual(200);
        });
    });

    describe("dispose", function () {
        it("清空startTime和endTime", function () {
        });
    });

    //describe("初始化后", function () {
    //    beforeEach(function () {
    //        query.init();
    //    });
    //});

    describe("查询", function () {
        var fakeStartTime = 1,
            fakeEndTime = 2,
            fakeOffset = 0,
            fakeCount = 1000;

        function judgeParam(handle, url) {
            spyOn($, "getJSON");

            query[handle]();

            expect($.getJSON.calls[0].args[0]).toContain(url);
            expect($.getJSON.calls[0].args[1]).toEqual({
                starttime: fakeStartTime,
                endtime: fakeEndTime,
                offset: fakeOffset,
                count: fakeCount
            });
        };

        beforeEach(function () {
            query.init(fakeStartTime, fakeEndTime);
        });

        describe("dozonequery", function () {
            it("验证ajax参数", function () {
                judgeParam("dozonequery", "StorageStatisticsDetail.php");
            });

            describe("如果数据正确", function () {
                var fakeData = null;

                beforeEach(function () {
                    fakeData = { "code": 0, "data": [[1375228800000, 32173389], [1375229100000, 32173389]] };
                });

                it("调用对应方法并传入数据", function () {
                    testTool.fakeAjaxData("getJSON", fakeData);

                    window.zonequery = jasmine.createSpy("zonequery");

                    query.dozonequery();

                    expect(window.zonequery).toHaveBeenCalledWith("空间占用量", fakeData.data);

                    window.zonequery = null;
                });
            });
        });

        describe("doflowquery", function () {
            it("验证ajax参数", function () {
                judgeParam("doflowquery", "NetworkFlowStatisticsDetail.php");
            });

            describe("如果数据正确", function () {
                var fakeData = null;

                beforeEach(function () {
                    window.flowquery = jasmine.createSpy("flowquery");
                    fakeData = { "code": 0, "total_num": 24, "data": [[1375425000000, 0, 0, 0, 9875772], [1375425300000, 0, 0, 0, 12552015]] };

                    testTool.fakeAjaxData("getJSON", fakeData);
                });
                afterEach(function () {
                    window.flowquery = null;
                });


                it("调用对应方法", function () {
                    query.doflowquery();

                    expect(window.flowquery).toHaveBeenCalled();

                    window.flowquery = null;
                });
                it("传入转换后的数据", function () {
                    var resultData = [
                            { "name": "intranet_in", "data": [[1375425000000, 0], [1375425300000, 0]] },
                            { "name": "intranet_out", "data": [[1375425000000, 0], [1375425300000, 0]] },
                            { "name": "outer_net_in", "data": [[1375425000000, 0], [1375425300000, 0]] },
                            { "name": "outer_net_out", "data": [[1375425000000, 9875772], [1375425300000, 12552015]] }
                    ];
                    helper.convertToFlowqueryData = function () {
                        return resultData;
                    };
                    spyOn(helper, "convertToFlowqueryData").andCallThrough();

                    query.doflowquery();

                    expect(helper.convertToFlowqueryData).toHaveBeenCalledWith(fakeData.data);
                    expect(window.flowquery).toHaveBeenCalledWith(resultData);
                });
            });
        });

        describe("dotypequery", function () {
            it("验证ajax参数", function () {
                judgeParam("dotypequery", "RequestStatisticsDetail.php");
            });

            describe("如果数据正确", function () {
                var fakeData = null;

                beforeEach(function () {
                    window.typequery = jasmine.createSpy("typequery");
                    fakeData = { "code": 0, "total_num": 24, "data": [[1375425000000, 4764, 10], [1375425300000, 6055, 0]] };

                    testTool.fakeAjaxData("getJSON", fakeData);
                });
                afterEach(function () {
                    window.typequery = null;
                });

                it("调用对应方法", function () {
                    query.dotypequery();

                    expect(window.typequery).toHaveBeenCalled();

                    window.typequery = null;
                });
                it("传入转换后的数据", function () {
                    var resultData = [
                            { "name": "get", "data": [[1375425000000, 4764], [1375425300000, 6055]] },
                            { "name": "post", "data": [[1375425000000, 10], [1375425300000, 0]] }
                    ];
                    helper.convertToTypequeryData = function () {
                        return resultData;
                    };
                    spyOn(helper, "convertToTypequeryData").andCallThrough();

                    query.dotypequery();

                    expect(helper.convertToTypequeryData).toHaveBeenCalledWith(fakeData.data);
                    expect(window.typequery).toHaveBeenCalledWith(resultData);
                });
            });
        });
    });
});