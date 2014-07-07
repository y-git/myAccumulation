describe("date.js", function () {
    var date = YYC.Tool.date;

    describe("format", function () {
        it("日期格式化", function () {
            expect(date.format(new Date(1372045823), "yyyy-MM-dd HH:mm:ss")).toEqual("1970-01-17 05:07:25");
            expect(date.format(new Date(1372045823), "HH:mm")).toEqual("05:07");
        });
    });

    describe("buildTimeArr", function () {
        it("60分钟要进位）", function () {
            expect(date.buildTimeArr("0055", 5, 3)).toEqual(["00:55", "01:00", "01:05"]);
        });
        it("24小时要复位）", function () {
            expect(date.buildTimeArr("2355", 5, 3)).toEqual(["23:55", "00:00", "00:05"]);
            //   	        	expect(date.buildTimeArr("0557", 5, 2)).toEqual(["23:55", "00:00", "00:05"]);
        });
        //    	       it("测试）", function () {
        //      	        	expect(date.buildTimeArr("0506", 5, 500)).toEqual(["23:55", "00:00", "00:05"]);
        //      	       });
    });

    describe("utc2LocalTime", function () {
        it("utc时间转换为本地时间，并指定格式", function () {
            expect(date.utc2LocalTime(1372003223, "yyyy-MM-dd HH:mm:ss")).toEqual("2013-06-24 00:00:23");
        });
    });
});