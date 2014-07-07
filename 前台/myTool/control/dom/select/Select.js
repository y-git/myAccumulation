/***********************************************
Select控件（伪Select）

作者：YYC
日期：2013-08-16
电子邮箱：395976266@qq.com
QQ: 395976266
博客：http://www.cnblogs.com/chaogex/

************************************************/

//创建的dom：
//<div class="ySelect">
//    <span class="title"><span class="text">全部</span><i class="arrow"></i></span>
//    <ul id="fsdiv" class="option">
//        <li><a>点评</a></li>
//        <li><a>团购</a></li>
//    </ul>
//</div>


//示例：
//<div id="testSelect"></div>

//new YYC.Control.Select({
//    title: "请输入",
//    option: [["HOME", "住宅"], ["WORK", "单位"]]  //第一项为value，第二项为text

//}).renderTo("testSelect");





YYC.namespace("Control").Select = YYC.Class({
    Init: function (config) {
        this._config = YYC.Tool.extend.extend({
            className: "select1",   //选择的样式
            width: 300,      //控件的真实宽度（padding+margin+border+width）
            onchange: function(e){}, //change事件handle
            title: "请输入",   //显示的项
            option: null    //下拉框项
        }, config || {});

        this._buildSelect();
        this._bindEvents();
        this._setSelectWidth();
    },
    Private: {
        _config: null,

        _select: null,
        _title: null,
        _text: null,
        _arrow: null,
        _option: null,

        _buildSelect: function () {
            this._buildTitle();
            this._buildOption();

            this._select = $("<div class='" + this._config.className + "'>");
            this._select.append(this._title);
            this._select.append(this._option);
        },
        _buildTitle: function () {
            this._title = $("<span class='title' value=''></span>");
            this._text = $("<span class='text'>" + this._config.title + "</span>");
            this._arrow = $("<i class='arrow'></i>");

            this._title.append(this._text).append(this._arrow);
        },
        _buildOption: function () {
            var i = 0,
                len = 0,
                option = this._config.option,
                str = "";

            str += "<ul class='option'>";

            for (i = 0, len = option.length; i < len; i++) {
                str += "<li val='" + option[i][0] + "'";
                str += "><a>" + option[i][1] + "</a></li>";
            }

            str += "</ul>";

            this._option = $(str);
        },
        _bindEvents: function () {
            this._bindTitleClick();

            this._bindChange();

            this._bindBodyClick();
        },
        _bindTitleClick: function () {
            var title = this._title,
                option = this._option;

            title.click(function (e) {
                if (option.css("display") === "none") {
                    option.show();
                }
                else {
                    option.hide();
                }

                e.stopPropagation();
            });
        },
        _bindChange: function () {
            var option = this._option,
                self = this;


            option.children("li").click(function (e) {
                self._showSelect($(this).children("a").text(), $(this).attr("val"));

                option.hide();

                e.stopPropagation();

                self.config.onchange.call(self, e);
            });
        },
        _showSelect: function (text, value) {
            this._text.text(text);
            this._text.attr("val", value);
        },
        _bindBodyClick: function () {
            var option = this._option;

            //因为title和change中都阻止了事件冒泡，所以点击select控件时，不触发该事件
            $("body").bind("click.select", function (e) {
                option.hide();
            });
        },
        _setSelectWidth: function () {
            var width = this._config.width,
                title = this._title,
                option = this._option,
                select = this._select,
                self = this;

            setTimeout(function () {
                self._setWidth(title);
                self._setWidth(option);
                select.css("width", width);
            }, 0);
        },
        _setWidth: function (ob) {
            /**
             真正的宽度 = width+padding+margin+border
            */

            var outerWidth = ob.outerWidth() - ob.width(); //获得padding + margin + border的宽度

            ob.css("width", this._config.width - outerWidth);
        }
    },
    Public: {
        renderTo: function (container) {
            YYC.Tool.selector.$(container).append(this._select);
        },
        /**
        获得选中项的text
        */
        getText: function () {
            return this._text.text();
        },
        /**
        获得选中项的value
        */
        getValue: function(){
            return this._text.attr("val");
        },
        dispose: function () {
            $("body").unbind("click.select");

            this._select.remove();
        }
    }
});
