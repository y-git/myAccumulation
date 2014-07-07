/***********************************************  
验证控件Validator    v1.0 

作者：YYC
日期：2013-03-21
电子邮箱：395976266@qq.com
QQ: 395976266
博客：http://www.cnblogs.com/chaogex/
************************************************/

(function () {
    var isjQuery = function (ob) {
        if (!jQuery) {
            throw new Error("jQuery未定义！");
        }
        return ob instanceof jQuery;
    };

    var $break = {};

    //Array扩展forEach方法。
    //可抛出$break退出循环

    Array.prototype.forEach = function (fn, thisObj) {
        var scope = thisObj || window;
        try {
            for (var i = 0, j = this.length; i < j; ++i) {
                fn.call(scope, this[i], i, this);
            }
        }
        catch (e) {
            if (e !== $break) {
                throw e;
            }
        }
    };



    //*工厂（创建策略方法子类）
    var factory = {
        createMethodChildren: function (type) {
            switch (type) {
                case undefined:
                case "common":
                    return new YYC.Control.Validator.Method_Common();
                    break;
                case "cos":
                    return new YYC.Control.Validator.Method_Cos();
                    break;
                default:
                    throw new Error("参数必须为子类类型码");
                    break;
            }
        }
    };


    //*控件类

    var IValidator = YYC.Interface("validate", "hasError", "returnError", "showInfo", "dispose");

    var Validator = YYC.Class({ Interface: IValidator }, {
        Init: function (type, data) {
            this._method = factory.createMethodChildren(type);

            if (data) {
                this.validate(data);
                this.showInfo();
            }
        },
        Private: {
            _method: null,
            _arr_message: [],   //二维数组。如：[["输入不等！"]]
            _arr_total: [], //二维数组，第一个元素为span的ID值。如：[["edit_tel", "输入不等！"]]

            _checkData: function (data) {
                var i = null,
                    everyData = null,
                    self = this;

                for (i in data) {
                    if (data.hasOwnProperty(i)) {
                        everyData = data[i];

                        if (everyData.handler === undefined) {
                            throw new Error("handler必须存在");
                        }


                        if (!this._isCustomHandler(everyData)) {
                            if (everyData.value === undefined) {
                                throw new Error("value必须存在");
                            }

                            everyData.handler.split('|').forEach(function (el, i) {
                                if (self._method[el.split('*')[0]] === undefined) {
                                    throw new Error("hanler必须属于策略类的方法");
                                }
                            });
                        }
                    }
                }
            },
            _validateData: function (data) {
                var i = null,
                                                                    handler = "",
                                                                    self = this,
                                                                    result = null,
                                                                    message = [],
                                                                    currentMesage = "",
                                                                    total = [],
                everyData = null;


                for (i in data) {
                    if (data.hasOwnProperty(i)) {   //防止遍历到Object.prototype上的方法
                        everyData = data[i];
                        message = [];
                        total = [];

                        total.push(i);

                        if (this._isCustomHandler(everyData)) {
                            if (everyData.message === undefined) {
                                throw new Error("不能缺少message属性");
                            }

                            if (!everyData.handler()) {
                                message.push(everyData.message);
                            }
                        }
                        else {
                            everyData.handler.split("|").forEach(function (el, i) {
                                result = self._method[el.split('*')[0]](everyData.value, el.split('*').slice(1));

                                if (!result.result) {
                                    //有指定的message
                                    if (everyData.message) {
                                        message.push(everyData.message);
                                        throw $break;
                                    }
                                    else {
                                        message.push(result.message);
                                        total.push(result.message);
                                    }
                                }
                            });
                        }
                        if (message.length !== 0) {
                            this._arr_message.push(message);
                            total.push(message[0]); //获得第一个错误信息
                        }

                        this._arr_total.push(total);
                    }
                }
            },
            _isCustomHandler: function (everyData) {
                return YYC.Tool.judge.isFunction(everyData.handler);
            }
        },
        Public: {
            validate: function (data) {
                if (arguments.length != 1) {
                    throw new Error("参数只能为1个");
                }

                this._checkData(data);
                this._validateData(data);
            },
            returnError: function () {
                return this._arr_message;
            },
            hasError: function () {

                return this._arr_message.length != 0;
            },
            showInfo: function () {
                var id = "";

                this._arr_total.forEach(function (el, i) {
                    id = el.shift();

                    if (el[0]) {
                        $("#" + id).html(el[0]);
                    }
                    else {
                        $("#" + id).html("");
                    }
                });


            },
            dispose: function () {
                this._arr_message = [];
                this._arr_total = [];
            }
        }
    });

    //加载Method.js
    new YYC.Control.JsLoader().add(YYC.Tool.path.getJsDir("Validator.js") + "Method.js").loadSync();


    YYC.namespace("Control").Validator = Validator;   //使用时创建实例
}());



