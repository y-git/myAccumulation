describe("calc.js", function () {
    var calc = monitor_list.calc;

    describe("compute", function () {
        var gb = 1024 * 1024 * 1024,
         tb = 1024 * 1024 * 1024 * 1024;

        describe("计算容量费用", function () {
            var fakeItems = {};

            describe("计算一天的费用，保留3位小数", function () {
                function judge(dayPrice, storageSize) {
                    fakeItems["2013-08-09"].cur_storage_size = storageSize;

                    expect(calc.compute(fakeItems).capacityPrice).toEqual(YYC.Tool.math.truncateDecimal(dayPrice * storageSize / gb, 3));
                };

                beforeEach(function () {
                    fakeItems = {
                        "2013-08-09": { "get": 1000, "put": 1000, "net0_out": 235422656, "net0_in": 0, "net1_out": 0, "net1_in": 0, "max_storage_usage": 0, "cur_storage_size": "62755354" }
                    };
                });

                it("当容量为[0-1TB]时，单价为0.02元/GB天（0.6元/GB月）", function () {
                    judge(0.02, tb * 0.5);
                });
                it("当容量为(1-10TB]时，单价为0.016元/GB天（0.48元/GB月）", function () {
                    judge(0.016, tb * 5);
                });
                it("当容量为(10-50TB]时，单价为0.015元/GB天（0.45元/GB月）", function () {
                    judge(0.015, tb * 20);
                });
                it("当容量为>50TB时，单价为0.013元/GB天（0.39元/GB月）", function () {
                    judge(0.013, tb * 51);
                });
            });

            it("容量费用 = sum(一天的容量的峰值*单价)，保留3位小数", function () {
                fakeItems = {
                    "2013-08-09": { "get": 1000, "put": 1000, "net0_out": 235422656, "net0_in": 0, "net1_out": 0, "net1_in": 0, "max_storage_usage": 0, "cur_storage_size": tb * 5 },
                    "2013-08-10": { "get": 1000, "put": 1000, "net0_out": 235422656, "net0_in": 0, "net1_out": 0, "net1_in": 0, "max_storage_usage": 0, "cur_storage_size": tb * 55 }
                };

                var total = YYC.Tool.math.truncateDecimal((tb * 5 / gb) * 0.016 + (tb * 55 / gb) * 0.013, 3);

                expect(calc.compute(fakeItems).capacityPrice).toEqual(total);
            });
        });

        describe("计算流量费用", function () {
            var fakeItems = {};

            describe("计算一天的费用，保留3位小数", function () {
                function judge(dayPrice, flow) {
                    fakeItems["2013-08-09"].net0_out = flow;

                    expect(calc.compute(fakeItems).flowPrice).toEqual(YYC.Tool.math.truncateDecimal(dayPrice * flow / gb, 3));
                };

                beforeEach(function () {
                    fakeItems = {
                        "2013-08-09": { "get": 1000, "put": 1000, "net0_out": 235422656, "net0_in": 0, "net1_out": 0, "net1_in": 0, "max_storage_usage": 0, "cur_storage_size": "62755354" }
                    };
                });

                it("当容量为[0-1TB]时，单价为0.7元/GB", function () {
                    judge(0.7, tb * 0.5);
                });
                it("当容量为(1-10TB]时，单价为0.65元/GB", function () {
                    judge(0.65, tb * 5);
                });
                it("当容量为(10-50TB]时，单价为0.6元/GB", function () {
                    judge(0.6, tb * 20);
                });
                it("当容量为>50TB时，单价为0.6元/GB", function () {
                    judge(0.6, tb * 51);
                });
            });

            it("流量费用 = sum(一天的流量*单价)，保留3位小数", function () {
                fakeItems = {
                    "2013-08-09": { "get": 1000, "put": 1000, "net0_out": tb * 0.005, "net0_in": 0, "net1_out": 0, "net1_in": 0, "max_storage_usage": 0, "cur_storage_size": 0 },
                    "2013-08-10": { "get": 1000, "put": 1000, "net0_out": tb * 55, "net0_in": 0, "net1_out": 0, "net1_in": 0, "max_storage_usage": 0, "cur_storage_size": 0 }
                };

                var total = YYC.Tool.math.truncateDecimal((tb * 0.005 / gb) * 0.7 + (tb * 55 / gb) * 0.6, 3);

                expect(calc.compute(fakeItems).flowPrice).toEqual(total);
            });
        });

        describe("计算总费用", function () {
            it("总费用 = 容量费用 + 流量费用，保留3位小数", function () {
            });
        });
    });
});