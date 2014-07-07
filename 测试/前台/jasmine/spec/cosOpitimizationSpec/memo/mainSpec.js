describe("main.js", function () {
    var main = memo.main;
        //tempUI = null,
        //tempQuery = null;
        //ui = null,
    //query = null;


    var mock = new YYC.YMock();

    //function init() {
    //    memo.ui = memo.ui || {};
    //    memo.query = memo.query || {};

    //    //ui = memo.ui;
    //    //query = memo.query;
    //};
    //function backUp() {
    //    tempUI = testTool.extendDeep(memo.ui);
    //    tempQuery = testTool.extendDeep(memo.query);
    //};
    //function buildFakeOb() {
    //    memo.ui = {
    //        startTime: 1,
    //        endTime: 2,

    //        setCurrentButton: function () { },
    //        showInstantDayTime: function () { }
    //    };



    //    memo.query = {
    //        init: function () { },
    //        dozonequery: function () { },
    //        doflowquery: function () { },
    //        dotypequery: function () { }
    //    };

    //};
    //function restore() {
    //    memo.ui = tempUI;
    //    memo.query = tempQuery;
    //};

    beforeEach(function () {
        //init();
        //backUp();
        //buildFakeOb();

        mock.createObj("memo.ui").replace({
            startTime: 1,
            endTime: 2,

            setCurrentButton: function () { },
            showInstantDayTime: function () { }
        });
        mock.createObj("memo.query").replace({
            init: function () { },
            dozonequery: function () { },
            doflowquery: function () { },
            dotypequery: function () { }
        });

    });
    afterEach(function () {
        //restore();
        mock.restore();
    });

    describe("_init", function () {
        beforeEach(function () {

        });

        it("查询初始化", function () {
            spyOn(memo.query, "init");

            main._init();

            expect(memo.query.init).toHaveBeenCalledWith(memo.ui.startTime, memo.ui.endTime);
        });
    });


    describe("_refreshPage", function () {
        beforeEach(function () {
        });

        it("更新按钮样式", function () {
            spyOn(memo.ui, "setCurrentButton");

            main._refreshPage();

            expect(memo.ui.setCurrentButton).toHaveBeenCalledWith("condition_instant");
        });
        it("显示时间", function () {
            spyOn(memo.ui, "showInstantDayTime");

            main._refreshPage();

            expect(memo.ui.showInstantDayTime).toHaveBeenCalled();
        });
    });


    describe("_query", function () {
        beforeEach(function () {
            window.zonequery = jasmine.createSpy("zonequery");
            window.flowquery = jasmine.createSpy("flowquery");
            window.typequery = jasmine.createSpy("typequery");
        });
        afterEach(function () {
            window.zonequery = null;
            window.flowquery = null;
            window.typequery = null;
        });

        //it("如果不传入memo.ui，抛出异常", function () {
        //    expect(function () {
        //        main._query();
        //    }).toThrow();
        //});
        //it("初始化", function () {

        //});
        it("存储空间查询", function () {
            spyOn(memo.query, "dozonequery");

            main._query(memo.ui);

            expect(memo.query.dozonequery).toHaveBeenCalled();
        });
        it("流量监控查询", function () {
            spyOn(memo.query, "doflowquery");

            main._query(memo.ui);

            expect(memo.query.doflowquery).toHaveBeenCalled();
        });
        it("GET/POST监控查询", function () {
            spyOn(memo.query, "dotypequery");

            main._query(memo.ui);

            expect(memo.query.dotypequery).toHaveBeenCalled();
        });
    });

    describe("instant", function () {
        it("更新页面", function () {
            spyOn(main, "_refreshPage");

            main.instant();

            expect(main._refreshPage).toHaveBeenCalled();
        });
        it("初始化", function () {
            spyOn(main, "_init");

            main.instant();

            expect(main._init).toHaveBeenCalled();
        });
        it("查询", function () {
            spyOn(main, "_query");

            main.instant();

            expect(main._query).toHaveBeenCalled();
        });
    });
});
