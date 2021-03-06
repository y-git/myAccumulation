﻿(function () {
    namespace("YE").Hash = YYC.Class(YE.Entity, {
        Init: function () {
            this.base();
        },
        Private: {
            //容器
            ye_childs: {}
        },
        Public: {
            getChilds: function () {
                return this.ye_childs;
            },
            getValue: function (key) {
                return this.ye_childs[key];
            },
            add: function (key, value) {
                this.ye_childs[key] = value;

                return this;
            },
            append: function (key, value) {
                if(YE.Tool.judge.isArray(this.ye_childs[key])){
                    this.ye_childs[key].push(value);
                }
                else{
                    this.ye_childs[key] = [value];
                }

                return this;
            },
            remove: function (key) {
                this.ye_childs[key] = undefined;
            },
            hasChild: function (key) {
                return !!this.ye_childs[key];
            },
            /**
             * 迭代调用集合内元素的方法
             * @param handler 调用的方法名
             * @param args 可以是多个参数
             */
            iterator: function (handler, args) {
                var args = Array.prototype.slice.call(arguments, 1),
                    i = null,
                    layers = this.getChilds();

                for (i in layers) {
                    if (layers.hasOwnProperty(i)) {
                        layers[i][handler].apply(layers[i], args);
                    }
                }
            }
        },
        Static: {
            create: function () {
                return new YE.Hash();
            }
        }
    });
}());