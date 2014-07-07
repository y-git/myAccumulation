describe("ui.js", function () {
    //var main = monitor_list.main,
    //    ui = null,
    //    calc = null,
    //    dateHelper = null,
    //    tempUI = null,
    //    tempCalc = null,
    //    tempHelper = null;

    //function init() {
    //    monitor_list.ui = monitor_list.ui || {};
    //    monitor_list.calc = monitor_list.calc || {};
    //    monitor_list.dateHelper = monitor_list.dateHelper || {};
    //};
    //function backUp() {
    //    tempUI = testTool.extendDeep(monitor_list.ui);
    //    tempCalc = testTool.extendDeep(monitor_list.calc);
    //    tempHelper = testTool.extendDeep(monitor_list.dateHelper);
    //};
    //function restore() {
    //    monitor_list.ui = tempUI;
    //    monitor_list.calc = tempCalc;
    //    monitor_list.dateHelper = tempHelper;
    //};

    //beforeEach(function () {
    //    init();
    //    backUp();
    //});
    //afterEach(function () {
    //    restore();
    //});


    describe("ajaxInit，初始化ajax获得的列表", function () {
        it("如果“普通视图”按钮按下，则隐藏部分列，总宽度设为1350px", function () { });
        it("如果“详细视图”按钮按下，则显示所有列（显示对应的th），总宽度设为1500px", function () { });
    });

    describe("pageInit，初始化页面", function () {
        it("创建普通视图按钮，绑定click事件，显示到页面中", function () { });
        it("创建详细视图按钮，绑定click事件，显示到页面中", function () { });
        it("绑定普通视图的click。点击后隐藏部分列，总宽度设为1350px", function () { });
        it("绑定详细视图的click。点击后显示所有列（显示对应的th），总宽度设为1500px", function () { });
        it("设置按钮的默认样式", function () { });
    });

});