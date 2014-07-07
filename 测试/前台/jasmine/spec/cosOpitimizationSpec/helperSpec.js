describe("helper.js", function () {
    var helper = window.helper;

    describe("convertToFlowqueryData", function () {
        it("转换为流量的highchart所需要的数据", function () {
            var fakeData = [[1375425000000, 0, 0, 0, 9875772], [1375425300000, 0, 0, 0, 12552015]];
            var resultData = [
                           { "name": "intranet_in", "data": [[1375425000000, 0], [1375425300000, 0]] },
                           { "name": "intranet_out", "data": [[1375425000000, 0], [1375425300000, 0]] },
                           { "name": "outer_net_in", "data": [[1375425000000, 0], [1375425300000, 0]] },
                           { "name": "outer_net_out", "data": [[1375425000000, 9875772], [1375425300000, 12552015]] }
            ];

            expect(helper.convertToFlowqueryData(fakeData)).toEqual(resultData);
        });
    });

    describe("convertToTypequeryData", function () {
        it("转换为Get/Post的highchart所需要的数据", function () {
            var fakeData = [[1375425000000, 4764, 10], [1375425300000, 6055, 0]];
            var resultData = [
                             { "name": "get", "data": [[1375425000000, 4764], [1375425300000, 6055]] },
                             { "name": "post", "data": [[1375425000000, 10], [1375425300000, 0]] }
            ];

            expect(helper.convertToTypequeryData(fakeData)).toEqual(resultData);
        });
    });
});