describe("ui.js", function () {
    var ui = detail.ui;



    describe("setDivWidth", function () {
        function insertDom() {
            var div = $("<div id='test'>");
            div.append($("<div id='detail_header'>")).append($("<div id='highchartDiv'>"))

            $("body").append(div);
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

        it("设置浮层的宽度为header的宽度", function () {
            $("#detail_header").css("width", 100);
            $("#highchartDiv").css("width", 200);
                ui.setDivWidth();

                expect(ui.getDiv().width()).toEqual(100);
        });
    });

    describe("show", function () {
        it("如果data个数大于1000，则直接显示", function () {
            spyOn(ui, "showChart");

            ui.show(1001);

            expect(ui.showChart).toHaveBeenCalled();
        });
        it("否则，则显示动画", function () {
            spyOn(ui, "showChartWithAnimation");

            ui.show(999);

            expect(ui.showChartWithAnimation).toHaveBeenCalled();
        });
    });

    describe("hide", function () {
        it("如果data个数大于1000，则直接隐藏", function () {
            spyOn(ui, "hideChart");

            ui.hide(1001);

            expect(ui.hideChart).toHaveBeenCalled();
        });
        it("否则，则显示动画", function () {
            spyOn(ui, "hideChartWithAnimation");

            ui.hide(999);

            expect(ui.hideChartWithAnimation).toHaveBeenCalled();
        });
    });
});