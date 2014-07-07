describe("MyGameEngine", function () {
    //    var player;
    //    var song;

    //    var value = null;
    //    var self = this;
    //    var addEvent = function (oTarget, sEventType, fnHandler) {
    //        var dom = null,
    //                    i = 0,
    //                    len = 0,
    //                temp = null;

    //        var result = "";

    //        if (oTarget instanceof jQuery) {
    //            oTarget.each(function () {
    //                dom = this;

    //                if (YYC.Tool.judge.isHostMethod(dom, "addEventListener")) {
    //                    dom.addEventListener(sEventType, fnHandler, false);
    //                    result = "addEventListener";
    //                    return false;
    //                } else if (YYC.Tool.judge.isHostMethod(dom, "attachEvent")) {
    //                    dom.attachEvent("on" + sEventType, fnHandler);
    //                    result = "attachEvent";
    //                    return false;
    //                } else {
    //                    dom["on" + sEventType] = fnHandler;
    //                    result = "other";
    //                    return false;
    //                }
    //            });
    //            //            return "jquery";
    //        }
    //        else {
    //            //            //                console.log("dom");

    //            dom = oTarget;

    //            if (YYC.Tool.judge.isHostMethod(dom, "addEventListener")) {
    //                dom.addEventListener(sEventType, fnHandler, false);
    //                return "dom addEventListener";
    //            } else if (YYC.Tool.judge.isHostMethod(dom, "attachEvent")) {
    //                dom.attachEvent("on" + sEventType, fnHandler);
    //                return "dom attachEvent";
    //            } else {
    //                dom["on" + sEventType] = fnHandler;
    //                return "dom other";
    //            }
    //            return "dom";
    //        }
    //        return result;
    //    };
    //    var _Handle = function () {
    //        console.log("mousedown!");
    //    };

    //    var foo = {
    //        addEvent: addEvent
    //    };


    var event = YYC.Tool.event;

    beforeEach(function () {
        //        player = new Player();
        //        song = new Song();

        //        YYC.Tool.event.addEvent($("#test"), "mousedown", function () {
        //            console.log("mousedown!");
        //        });



        //                spyOn(foo, "addEvent").andCallThrough();
    });

    it("测试addEvent jquery对象", function () {
        //        expect(value).toEqual("addEventListener");
        //                addEvent($("#test"), "mousedown", _Handle);
        //                expect(addEvent).toHaveBeenCalled();

        event.addEvent($("#test"), "mousedown", function () {
            console.log("mousedown!");
        });
    });
    it("测试addEvent dom对象", function () {
        event.addEvent(document.getElementById("test"), "mousedown", function () {
            console.log("dom mousedown!");
        });
    });
});