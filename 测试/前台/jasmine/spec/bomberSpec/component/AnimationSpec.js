describe("Animation.js", function () {
    //update setCurrentFrame getCurrentFrame
    var animation = null;
    var img = null,
    frames = null,
    data = null;

    //function fakeImg() {
    //    var img = new Image();
    //    img.src = "";

    //};

    beforeEach(function () {
//        img = "player",
//    frames = [
//{ x: 0, y: 0, w: 64, h: 64, duration: 100 },
//{ x: 0, y: 64, w: 64, h: 64, duration: 100 }
//    ],
    data = getFrames("player", "walk_down");
    });
    afterEach(function () {
    });

    describe("构造函数", function () {
        it("获得_frames（数组副本）", function () {
            animation = new Animation(data);

            expect(animation._frames).not.toBeSameArray(frames);
        });
        it("获得frameCount", function () {
            animation = new Animation(data);
            //var imgHtml = window.imgLoader.get(img);

            expect(animation._frameCount).toEqual(4);
            //expect(animation._img).toEqual(data.img);
        });
        it("调用setCurrentFrame", function () {
            animation = new Animation(data);

            spyOn(animation, "setCurrentFrame");
            animation.Init(data);  //调用构造函数

            expect(animation.setCurrentFrame).toHaveBeenCalledWith(0);
        });
    });

    describe("setCurrentFrame", function () {
        it("设置 当前帧已播放时间为0,当前帧索引等于参数index，"
            + "当前选中帧数据为this._frames[index]", function () {
                //    var F = function () {
                //        alert("f");
                //        return {
                //            a: 1
                //        };
                //    };
                //    spyOn(window, "alert");

                //    var f = new F();
                //    f.a = 2;
                //    var t = new F();

                //    expect(t.a).toEqual(1);
                //    expect(window.alert.calls.length).toEqual(2);
                //});
            });
    });

    describe("update", function () {
    });

    describe("getCurrentFrame", function () {
    });

    describe("getImg", function () {
    });
});