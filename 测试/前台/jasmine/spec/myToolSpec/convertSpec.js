describe("convert.js", function () {
    var convert = YYC.Tool.convert;

    //describe("strToBool", function () {
    //    it("String转换为Boolean", function () {
    //        expect(convert.strToBool("true")).toBeTruthy();
    //        expect(convert.strToBool("1")).toBeTruthy();

    //        expect(convert.strToBool("false")).toBeFalsy();
    //        expect(convert.strToBool("0")).toBeFalsy();
    //        expect(convert.strToBool("")).toBeFalsy();
    //    });
    //});

    describe("toNumber", function () {
        it("转换为number类型", function () {
            expect(convert.toNumber("")).toEqual(0);
            expect(convert.toNumber("2")).toEqual(2);
            expect(convert.toNumber(true)).toEqual(1);
            expect(convert.toNumber(false)).toEqual(0);

            expect(isNaN(convert.toNumber("aa"))).toBeTruthy();
            expect(isNaN(convert.toNumber(undefined))).toBeTruthy();
            expect(isNaN(convert.toNumber({}))).toBeTruthy();
        });
    });

    describe("toString", function () {
        it("如果参数为Object直接量（如json数据）或者数组，则使用json序列化为字符串", function () {
            expect(convert.toString({ a: 1 })).toEqual('{"a":1}');
            expect(convert.toString([1, "b"])).toEqual('[1,"b"]');
            //expect(convert.toString(new Date(1000))).toEqual('"1970-01-01T00:00:01.000Z"');
        });
        it("jquery对象转换为string", function () {
            expect(convert.toString($("<div>a</div>"))).toEqual("<div>a</div>");
        });
        it("其余类型的参数转换为字符串", function () {
            //expect(convert.toNumber("")).toEqual(0);
            //expect(convert.toNumber("2")).toEqual(2);
            //expect(convert.toNumber(true)).toEqual(1);
            //expect(convert.toNumber(false)).toEqual(0);

            //expect(isNaN(convert.toNumber("aa"))).toBeTruthy();
            //expect(isNaN(convert.toNumber(undefined))).toBeTruthy();
            //expect(isNaN(convert.toNumber({}))).toBeTruthy();

            //function blank() {
            //    return /^\s*$/.test(this);
            //}
            //function isJSON(ob) {
            //    //var str = this;
            //    //if (str.blank()) return false;  //开头为空格
            //    str = str.replace(/\\./g, '@').replace(/"[^"\\\n\r]*"/g, '');
            //    return (/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(str);
            //}

            //console.log(is);


            //JSON = {
            //    useHasOwn: ({}.hasOwnProperty ? true : false),
            //    pad: function (n) {
            //        return n < 10 ? "0" + n : n;
            //    },
            //    m: {
            //        "\b": '\\b',
            //        "\t": '\\t',
            //        "\n": '\\n',
            //        "\f": '\\f',
            //        "\r": '\\r',
            //        '"': '\\"',
            //        "\\": '\\\\'
            //    },
            //    encodeString: function (s) {
            //        if (/["\\\x00-\x1f]/.test(s)) {
            //            return '"' + s.replace(/([\x00-\x1f\\"])/g,
            //            function (a, b) {
            //                var c = m[b];
            //                if (c) {
            //                    return c;
            //                }
            //                c = b.charCodeAt();
            //                return "\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
            //            }) + '"';
            //        }
            //        return '"' + s + '"';
            //    },
            //    encodeArray: function (o) {
            //        var a = ["["], b, i, l = o.length, v;
            //        for (i = 0; i < l; i += 1) {
            //            v = o[i];
            //            switch (typeof v) {
            //                case "undefined":
            //                case "function":
            //                case "unknown":
            //                    break;
            //                default:
            //                    if (b) {
            //                        a.push(',');
            //                    }
            //                    a.push(v === null ? "null" : this.encode(v));
            //                    b = true;
            //            }
            //        }
            //        a.push("]");
            //        return a.join("");
            //    },
            //    encodeDate: function (o) {
            //        return '"' + o.getFullYear() + "-" + pad(o.getMonth() + 1) + "-" + pad(o.getDate()) + "T" + pad(o.getHours()) + ":" + pad(o.getMinutes()) + ":" + pad(o.getSeconds()) + '"';
            //    },
            //    encode: function (o) {
            //        if (typeof o == "undefined" || o === null) {
            //            return "null";
            //        } else if (o instanceof Array) {
            //            return this.encodeArray(o);
            //        } else if (o instanceof Date) {
            //            return this.encodeDate(o);
            //        } else if (typeof o == "string") {
            //            return this.encodeString(o);
            //        } else if (typeof o == "number") {
            //            return isFinite(o) ? String(o) : "null";
            //        } else if (typeof o == "boolean") {
            //            return String(o);
            //        } else {
            //            var self = this;
            //            var a = ["{"], b, i, v;
            //            for (i in o) {
            //                if (!this.useHasOwn || o.hasOwnProperty(i)) {
            //                    v = o[i];
            //                    switch (typeof v) {
            //                        case "undefined":
            //                        case "function":
            //                        case "unknown":
            //                            break;
            //                        default:
            //                            if (b) {
            //                                a.push(',');
            //                            }
            //                            a.push(self.encode(i), ":", v === null ? "null" : self.encode(v));
            //                            b = true;
            //                    }
            //                }
            //            }
            //            a.push("}");
            //            return a.join("");
            //        }
            //    },
            //    decode: function (json) {
            //        return eval("(" + json + ')');
            //    }
            //};


            //console.log(JSON.encode([1, "a"]));

            //console.log(JSON.decode(JSON.encode([1, "a"]))[0]);


            //console.log(JSON.stringify({"Hello": 123}));

            //console.log([1, "b"].toString());

            //console.log({}.toString());
            //console.log(String({}));
            //console.log(JSON.stringify({ a: 1 }) === '{"a":1}');

            expect(convert.toString(1)).toEqual("1");
            expect(convert.toString("a1")).toEqual("a1");
            expect(convert.toString(true)).toEqual("true");
            expect(convert.toString(null)).toEqual("null");

        });
    });

    describe("toObject", function () {
        it("如果参数不是string，则抛出错误", function () {
            expect(function () {
                convert.toObject(1);
            }).toThrow();
        });
        it("将json序列化的字符串再序列化为对象（不支持Date对象序列化）", function () {
            expect(convert.toObject('{"a":1}')).toEqual({ a: 1 });
            expect(convert.toObject('[1,"b"]')).toEqual([1, "b"]);
            //expect(convert.toObject('"1970-01-01T00:00:01.000Z"')).toEqual(new Date(1000));
        });
    });

    describe("toBoolean", function () {
        it("转换为布尔型", function () {
            expect(convert.toBoolean("true")).toBeTruthy();
            expect(convert.toBoolean(1)).toBeTruthy();
            expect(convert.toBoolean({})).toBeTruthy();


            expect(convert.toBoolean("false")).toBeFalsy();
            expect(convert.toBoolean("")).toBeFalsy();
            expect(convert.toBoolean(0)).toBeFalsy();
            expect(convert.toBoolean(NaN)).toBeFalsy();
            expect(convert.toBoolean(undefined)).toBeFalsy();
            expect(convert.toBoolean(null)).toBeFalsy();
        });
    });

    describe("toJquery", function () {
        it("如果参数不是dom元素或jquery对象或string字符串，则抛出错误", function () {
            expect(function () {
                convert.toJquery(1);
            }).toThrow();
        });
        it("转换为jquery对象", function () {
            expect(testTool.isjQuery(convert.toJquery(document.createElement("div")))).toBeTruthy();
            expect(testTool.isjQuery(convert.toJquery("<div>a</div>"))).toBeTruthy();
        });
    });

    describe("toDom", function () {
        it("如果参数不是jquery对象或dom或string字符串，则抛出错误", function () {
            expect(function () {
                convert.toDom(1);
            }).toThrow();

            expect(function () {
                convert.toDom(1);
            }).toThrow();
        });
        it("转换为dom对象", function () {
            expect(testTool.isDom(convert.toDom(document.createElement("div")))).toBeTruthy();
            expect(testTool.isDom(convert.toDom($("div")))).toBeTruthy();
            expect(testTool.isDom(convert.toDom("<div>a</div>"))).toBeTruthy();
        });
    });
});