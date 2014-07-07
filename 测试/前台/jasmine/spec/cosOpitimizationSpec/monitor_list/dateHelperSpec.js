describe("dateHelper.js", function () {
    var helper = monitor_list.dateHelper;

    describe("bindDatepicker", function () {
    });

    describe("converToUtc", function () {
        it("将形如08/11/2013转换为utc时间，以秒为单位", function () {
            expect(helper.converToUtc("01/02/1970")).toEqual(57600);
        });
    });
});