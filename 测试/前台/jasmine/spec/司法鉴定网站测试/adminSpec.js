describe("admin.js", function () {

    beforeEach(function () {
    });

    afterEach(function () {
    });


    describe("getContent", function () {
        var func = admin.getContent;

        beforeEach(function () {
        });

        afterEach(function () {
        });


        it("存在getContent方法", function () {
            expect(func).not.toBeUndefined();
        });
        it("参数为range时post参数为:'/admin/Range_Index', null, function", function () {
            spyOn($, "post");

            func("range");

            expect($.post.mostRecentCall.args[0]).toEqual("/admin/Range_Index");
            expect($.post.mostRecentCall.args[1]).toBeNull();
            expect($.post.mostRecentCall.args[2]).toBeFunction();
        });
    });
});