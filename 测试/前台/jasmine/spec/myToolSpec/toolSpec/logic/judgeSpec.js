describe("judge.js", function () {
    var judge = YYC.Tool.judge;

    //describe("isEqual", function () {
    //    it("鍒ゆ柇瀵硅薄鐨勫悇涓垚鍛樻槸鍚︾浉绛夛紝鐩哥瓑杩斿洖true锛屼笉绛夎繑鍥瀎alse", function () {
    //        //var fakePlayerSprite = {};
    //        //var sprite1 = spriteFactory.createBomb(fakePlayerSprite),
    //        //    sprite2 = spriteFactory.createBomb(fakePlayerSprite);

    //        //expect(judge.isEqual(sprite1, sprite2)).toBeTruthy();
    //        expect(judge.isEqual({ x: 1, y: { a: function () { } }, z: 1 }, { x: 1, y: { a: function () { } }, z: 2 })).toBeTruthy();
    //        expect(judge.isEqual({ x: 1, y: { a: 1 }, z: 1 }, { x: 1, y: { a: 1 }, z: 2 })).toBeFalsy();
    //    });

    //    it("鍒ゆ柇string鏄惁鐩哥瓑锛岀浉绛夎繑鍥瀟rue锛屼笉绛夎繑鍥瀎alse", function () {
    //        expect(judge.isEqual("a", "a")).toBeTruthy();
    //        expect(judge.isEqual("a", "b")).toBeFalsy();
    //    });

    //    it("鍒ゆ柇bool鏄惁鐩哥瓑锛岀浉绛夎繑鍥瀟rue锛屼笉绛夎繑鍥瀎alse", function () {
    //        expect(judge.isEqual(true, true)).toBeTruthy();
    //        expect(judge.isEqual(true, false)).toBeFalsy();
    //    });

    //    it("鍒ゆ柇number鏄惁鐩哥瓑锛岀浉绛夎繑鍥瀟rue锛屼笉绛夎繑鍥瀎alse", function () {
    //        expect(judge.isEqual(1, 1)).toBeTruthy();
    //        expect(judge.isEqual(1, 2)).toBeFalsy();
    //    });

    //    it("鍒ゆ柇涓嶅悓绫诲瀷鏄惁鐩哥瓑锛岀浉绛夎繑鍥瀟rue锛屼笉绛夎繑鍥瀎alse", function () {
    //        expect(judge.isEqual(1, "a")).toBeFalsy();
    //        expect(judge.isEqual(1, {})).toBeFalsy();
    //    });
    //});

    describe("isDate", function () {
        it("鍒ゆ柇鏄惁涓篋ate瀵硅薄", function () {
            expect(judge.isDate(new Date())).toBeTruthy();
            expect(judge.isDate('Fri Aug 09 2013 10:46:06 GMT+0800 (涓浗鏍囧噯鏃堕棿)')).toBeFalsy();
        });
    });

    describe("isDom", function () {
        it("鍒ゆ柇鏄惁涓篸om鍏冪礌", function () {
            expect(judge.isDom(document.createElement("div"))).toBeTruthy();

            expect(judge.isDom($("<div>"))).toBeFalsy();
            expect(judge.isDom($(1))).toBeFalsy();
            expect(judge.isDom("a")).toBeFalsy();
        });
    });
});