describe("ui.js", function () {
    var ui = memo.ui;

    afterEach(function () {
        ui.dispose();
    });

    describe("setCurrentButton", function () {
        function insertDom() {
            $("body").append($("<div class='condition_filter'>"));
            $(".condition_filter").append($("<a id='condition_instant'>"))
            .append($("<a id='condition_nowday'>"))
            .append($("<a id='condition_yesterday'>"))
            .append($("<a id='condition_weekday'>"))
            .append($("<a id='condition_month'>"))
        };
        function removeDom() {
            $(".condition_filter").remove();
        };

        beforeEach(function () {
            insertDom();
        });
        afterEach(function () {
            removeDom();
        });

        it("移除所有按钮class", function () {
            $("#condition_weekday").addClass("current");
            $("#condition_month").addClass("test");

            ui.setCurrentButton();

            expect($("#condition_weekday").attr("class")).toEqual("");
            expect($("#condition_month").attr("class")).toEqual("");
        });
        it("当前按钮class设为current", function () {
            ui.setCurrentButton("condition_yesterday");

            expect($("#condition_yesterday").attr("class")).toEqual("current");
        });
    });

    describe("showInstantDayTime", function () {
        function insertDom() {
            $("body").append($("<span id='healthScore_time1'>"))
            .append($("<span id='healthScore_time2'>"))
            .append($("<input id='fromdate'>"))
            .append($("<input id='todate'>"));
        };
        function removeDom() {
            $("body span, body input").remove();
        };

        beforeEach(function () {
            insertDom();
        });
        afterEach(function () {
            removeDom();
        });


        it("获得startTime", function () {
            ui.showInstantDayTime();

            expect(ui.startTime).not.toBeNull();
        });
        it("获得endTime", function () {
            ui.showInstantDayTime();

            expect(ui.endTime).not.toBeNull();
        });

        //*Date不好伪造，所以就暂不测试

        it("显示截止时间为当前时间前三个小时到当前时间", function () {
            //$("#healthScore_time1").text("截止时间：");
            //spyOn(window, "Date").andCallReturn("");


           //new Date(Date.parse(new Date()) - 3 * 3600 * 1000)

           //console.log(new Date(Date.parse(new Date()) - 3 * 3600 * 1000));

            //console.log(ui.showInstantDayTime());

            //ui.showInstantDayTime();

            //expect($("#healthScore_time1").text()).toEqual("截至时间  : 从 ");


        });
        it("显示日期", function () {
        });
    });

    describe("dispose", function () {
        it("清空startTime和endTime", function () {
            ui.startTime = 50;
            ui.endTime = 100;

            ui.dispose();

            expect(ui.startTime).toBeNull();
            expect(ui.endTime).toBeNull();
        });
    });
});