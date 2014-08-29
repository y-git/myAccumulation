describe("math.js", function () {
    var math = YYC.Tool.math;

    describe("getDecimal", function () {
        it("获得小数部分）", function () {
            expect(math.getDecimal("2.22", 2)).toEqual(0.22);
            expect(math.getDecimal("2.2", 2)).toEqual(0.2);
            expect(math.getDecimal("8", 2)).toEqual(0);
        });
    });

    describe("truncateDecimal", function () {
        it("如果指定位置超过了小数最大长度，则返回小数本身", function () {
            expect(math.truncateDecimal(1.267, 4)).toEqual(1.267);
        });
        it("获得指定位置的小数（不四舍五入，直接截断）", function () {
            var num = 1.267;

            expect(math.truncateDecimal(num, 1)).toEqual(1.2);
            expect(math.truncateDecimal(num, 3)).toEqual(1.267);
        });

        /*
        下面测试不会通过，因为result实际上为2.6100000000000003
        这是因为“浮点数在计算机中只能为近似值”造成的

        it("验证确实为小数", function () {
            var num = 1.26666666666666666667;

            var result = math.truncateDecimal(num, 2) + math.truncateDecimal(1.35, 2);

            expect(result).toEqual(2.61);   //不能通过
        });


        将truncateDecimal改写成：
         var str = Tool.convert.toString(decimal);

            if (digit > this.getDecimalNumber(decimal)) {
                return decimal;
            }

            return Tool.convert.toNumber(str.substring(0, str.indexOf(".") + digit + 1));


        该问题依然存在！
        */
    });

    describe("getDecimalNumber", function () {
        it("如果参数为整数，则返回参数", function () {
            expect(math.getDecimalNumber(12)).toEqual(12);
        });
        it("获得小数位数", function () {
            expect(math.getDecimalNumber(1.23)).toEqual(2);
        });
    });
});