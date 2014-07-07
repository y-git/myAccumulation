//策略方法类
(function () {
    //**父类

    var Method_Parent = YYC.AClass({
        Public: {
            Virtual: {
                isNotEmpty: function (data) {
                    return data.length !== 0;
                },
                //        TestRegex: function (data, regex) {
                //            return regex.test(data);
                //        },

                //是否为数字
                isNumber: function (data) {
                    var regex = /^\d+$/;
                    return regex.test(data);
                },
                equal: function (data, target) {
                    return data === target;
                }
            }
        },
        Abstract: {
            isTelephone: function (data) {},
            isChinese: function (data) {},
            lengthBetween: function (data, min, max) {},
            isNotInjectAttack: function (data) { }
        }
    });

    //**子类

    var Method_Common = YYC.Class(Method_Parent, {
        Init: function () {
        },
        Protected: {
            P__virtual_validate: function (data) {
                if (arguments.length == 1) {
                    var result = null,
                    errorNum = 0,
                    self = this;

                    if (data.each) {  //data为jquery对象（此处采用特性检测）
                        data.each(function () {
                            if (!self.base($(this).val())) {      //调用父类方法

                                errorNum++;
                                return false;
                            }
                        });
                        result = errorNum === 0 ? true : false;
                    }
                    else {
                        result = this.base(data);
                    }

                    return result;
                }
                else if (arguments.length == 2) {
                    var source = arguments[0],
                        target = arguments[1],
                    result = null,
                    errorNum = 0,
                    self = this;

                    if (source.each) {  //data为jquery对象（此处采用特性检测）
                        source.each(function () {
                            if (!self.base($(this).val(), target)) {      //调用父类方法
                                errorNum++;
                                return false;
                            }
                        });
                        result = errorNum === 0 ? true : false;
                    }
                    else {
                        result = this.base(source, target);
                    }

                    return result;
                }
            },
            P__abstract_validate: function (func, data) {
                var result = null,
                    p = 0;

                if (data.each) {
                    data.each(function () {
                        if (!func($(this).val())) {
                            p++;
                            return false;
                        }
                    });
                    result = p === 0 ? true : false;
                }
                else {
                    result = func(data);
                }

                return result;
            }
        },
        Public: {
                //* 期望的行为

                isNotEmpty: function (data) {
                    var result = this.P__virtual_validate(data);

                    return {
                        result: result,
                        message: "值不能为空"
                    }
                },
                isNumber: function (data) {
                    var result = this.P__virtual_validate(data);

                    return {
                        result: result,
                        message: "值必须为数字"
                    }
                },
                isTelephone: function (data) {
                    var result = this.P__abstract_validate(function (val) {
                        return /^\+*(\d+|(\d+-\d+)+)$/.test(val);
                    }, data);

                    return {
                        result: result,
                        message: "值必须为电话号码"
                    }
                },
                isChinese: function (data) {
                    //                reg.test($(this).val())
                    var result = this.P__abstract_validate(function (val) {
                        return /^[^u4e00-u9fa5]+$/.test(val);
                    }, data);

                    return {
                        result: result,
                        message: "值必须为中文"
                    }
                },
                //arr_target为参数数组
                equal: function (source, arr_target) {
                    var result = this.P__virtual_validate(source, arr_target[0]);

                    return {
                        result: result,
                        message: "输入不等"
                    }
                },
                lengthBetween: function (data, arr_value) {
                    var min = arr_value[0],
                        max = arr_value[1];

                    var result = this.P__abstract_validate(function (val) {
                        return val.length >= min && val.length <= max;
                    }, data);

                    return {
                        result: result,
                        message: "字数必须为" + min + "-" + max + "字"     //增加message属性
                    }
                },
                isNotInjectAttack: function (data) {
                    var regex = /select|update|delete|exec|count|'|"|=|;|>|<|%|&/ig;

                    var result = this.P__abstract_validate(function (val) {
                        return !regex.test(val)
                    }, data);

                    return {
                        result: result,
                        message: "不能含有非法字符"
                    }
                }
        }
    });


    var Method_Cos = YYC.Class(Method_Common, {
        Init: function () {
        },
        Private: {
        },
        Public: {
            isNumber: function (data) {
                var result = this.P__abstract_validate(function (val) {
                    return /(^\d+$)|(^\d+\.*\d+$)/.test(val);
                }, data);

                return {
                    result: result,
                    message: "请输入数字"
                }
            },
            range: function (data, arr_value) {
                var convert = YYC.Tool.convert;

                var min = convert.toNumber(arr_value[0]),
                    max = convert.toNumber(arr_value[1]),
                    flagMin = convert.toBoolean(arr_value[2]),
                    flagMax = convert.toBoolean(arr_value[3]);

                var result = this.P__abstract_validate(function (val) {
                    if (flagMin && flagMax) {
                        return val <= max && val >= min;
                    }
                    else if (flagMin) {
                        return val < max && val >= min;
                    }
                    else if (flagMax) {
                        return val <= max && val > min;
                    }
                    else {
                        return val < max && val > min;
                    }
                }, data);

                return {
                    result: result,
                    message: "请输入在" + min + "-" + max + "范围内的数字"
                }
            },
            lessThan: function (data, arr_target) {
                var result = this.P__abstract_validate(function (val) {
                    return val < arr_target[0];
                }, data);

                return {
                    result: result,
                    message: "请输入小于" + arr_target[0] + "的数字"
                }
            },
            greaterThan: function (data, arr_target) {
                var result = this.P__abstract_validate(function (val) {
                    return val > arr_target[0];
                }, data);

                return {
                    result: result,
                    message: "请输入大于" + arr_target[0] + "的数字"
                }
            }
        }
    });





    YYC.namespace("YYC.Control.Validator").Method_Common = Method_Common;
    YYC.namespace("YYC.Control.Validator").Method_Cos = Method_Cos;
}());



