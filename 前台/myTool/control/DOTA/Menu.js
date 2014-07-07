/***********************************************
来自：

DOTA.Menu v0.1
作者：黄健
日期：2009.09.20
ＱＱ：573704282
Email: freewind22@163.com


修改：

作者：YYC
日期：2012-10-30
电子邮箱：395976266@qq.com
QQ: 395976266
博客：http://www.cnblogs.com/chaogex/

************************************************/


//    window.menu = new Menu({ id: "menuContainer", items: [
//		    {
//		        text: '文件(F)',
//		        menu: {
//		            items: [
//					    {
//					        text: '新建',
//					        //					    hotKey: 'Ctrl + D',
//					        handler: YYC.Tool.event.bindEvent(window, onMenuClick, 'testArg'),
//					        menu: { items: [
//										      { text: '新建文本文件' },
//										      { text: '新建网页文件' },
//										      { text: '新建...',
//										          menu: { items: [{
//										              text: '三级菜单', menu: { items: [
//                                                    { text: '四级菜单' }
//                                                  ]
//										              }
//										          }
//                                                  ]
//										          }
//										      }
//                                              ]
//					        }
//					    }, {
//					        text: '打开　　　　Ctrl + O', handler: onMenuClick, checked: true
//					    }, '-', {
//					        text: '退出', handler: onMenuClick
//					    }
//				    ]
//		        }
//		    }, {
//		        text: '编辑(E)',
//		        menu: {
//		            items: [
//					    { text: '复制　　　　Ctrl + C', handler: onMenuClick },
//					    { text: '剪切', handler: removeHandler }
//				    ]
//		        }
//		    }
//		    ]
//    });
//this.menu.renderTo("gameMenu");

(function () {
    //菜单项
    var MenuItem = function (text, handler, level, isChecked, isFolder) {
        this.text = text;
        this.handler = handler || function () { };
        this.level = level || 0;
        this.isChecked = !!isChecked;   //加上“√”
        this.isFolder = !!isFolder;     //加上“►”
        this.subMenu = null;
        this.element = null;
        this.check = null;
    };

    MenuItem.prototype = {
        //显示菜单项
        renderTo: function (container) {
            var s, e = this.element = document.createElement("div");
            //            container = YYC.Tool.selector.$(container);

            e.className = "DOTA_MenuItem";

            if (this.text === "-") {
                e.className = "DOTA_MenuSeparator";
                e.innerHTML = "&nbsp;";
            } else if (this.level > 0) {
                s = this.check = document.createElement("span");
                s.innerHTML = this.isChecked ? "√" : "&nbsp;";
                s.className = "DOTA_MenuItem_Check";
                e.appendChild(s);

                s = this.menu = document.createElement("span");
                s.innerHTML = this.text;
                s.className = "DOTA_MenuItem_Text";
                e.appendChild(s);

                s = this.more = document.createElement("span");
                s.innerHTML = this.isFolder ? '►' : '&nbsp;';
                s.className = "DOTA_MenuItem_More";
                e.appendChild(s);

            } else {
                e.innerHTML = this.text;
            }

            container.appendChild(e);
        },
        setText: function (text) {
            this.menu.innerHTML = text;
        },
        getText: function () {
            return this.menu.innerHTML;
        },
        dispose: function () {
            if (this.element) {
                this.element.innerHTML = "";
                this.element = null;
            }
        }
    };


    //此处之所以要分主菜单和子菜单，是因为主菜单与子菜单不同（如onclick事件处理不同等）
    //主菜单是横起显示的项，子菜单是下拉框

    //主菜单
    var MainMenu = function (menu) {
        this.menuID = "";
        this.menu = menu || { items: [] };
        this.menus = [];
        this.events = [];
        this.isRender = false;  //有什么用？
        this.isClick = false;   //点击菜单标志
        this.element = null;
        this.subMenu = null;
        this.currentIndex = -1;     //当前事件发生的菜单项

        this.ondocumentclick = YYC.Tool.event.bindEvent(this, this.onDocumentClick);
    };
    MainMenu.prototype = {
        renderTo: function (container) {
            var i, s, o = this.menu.items, e, evt = YYC.Tool.event;
            e = this.element = document.createElement("div");
            e.className = "DOTA_MainMenu";
            container.appendChild(e);

            for (i = 0; i < o.length; i++) {
                //显示菜单项，只显示文字
                s = this.menus[i] = new MenuItem(o[i].text ? o[i].text : o[i]);
                s.renderTo(e);

                //事件handler加入事件数组
                if (!this.events[i]) {
                    this.events[i] = {};
                    this.events[i].onmouseover = evt.bindEvent(this, this.onMouseOver, i, s.element);
                    this.events[i].onmouseout = evt.bindEvent(this, this.onMouseOut, i, s.element);
                    this.events[i].onclick = evt.bindEvent(this, this.onclick, i, s.element);
                }
                //绑定事件
                //            s.element.onclick = this.events[i].onclick;
                evt.addEvent(s.element, "mouseover", this.events[i].onmouseover);
                evt.addEvent(s.element, "mouseout", this.events[i].onmouseout);
                evt.addEvent(s.element, "click", this.events[i].onclick);
                //如果有子菜单则加入
                if (o[i].menu) {
                    s.subMenu = new SubMenu(o[i].menu);
                    s.subMenu.renderTo(container);
                }
            }
            evt.addEvent(document, "click", this.ondocumentclick);

            this.isRender = true;
        },
        onMouseOver: function (oEvent, index, el) {
            var i = this.currentIndex, o = this.menus;
            //同一菜单
            if (i == index) {
                return;
            }
            if (this.isClick) {
                el.className += " click";
                //隐藏前一个菜单
                if (i >= 0) {
                    o[i].subMenu.hide();
                    o[i].element.className = o[i].element.className.replace(/(hover)|(click)/ig, "");
                }
                //显示当前菜单
                o[index].subMenu.show(el, 0);
                this.currentIndex = index;
            } else {
                el.className += " hover";
            }
        },
        onMouseOut: function (oEvent, index, el) {
            if (!this.isClick) {
                el.className = el.className.replace(/(hover)|(click)/ig, "");
            }
        },
        onclick: function (oEvent, index, el) {
            this.isClick = true;

            el.className += " click";
            oEvent.stopBubble();   //阻止冒泡

            this.currentIndex = index;
            this.menus[index].subMenu.show(el, 0);  //显示子菜单
        },
        //点击非菜单，则隐藏菜单
        onDocumentClick: function () {
            var i = this.currentIndex, o = this.menus;
            if (this.isClick && o) {
                this.isClick = false;
                o[i].element.className = o[i].element.className.replace(/(hover)|(click)/ig, "");
                o[i].subMenu.hide();
            }
            this.currentIndex = -1;
        },
        getHeight: function () {
            return $(this.element).height();
        },
        dispose: function () {
            var i, evt = YYC.Tool.event, o = this.menus, e = this.events;
            if (this.subMenu) {
                this.subMenu.dispose();
            }

            evt.removeEvent(document, "click", this.ondocumentclick);
            for (i = 0; i < e.length; i++) {
                evt.removeEvent(o[i].element, "mouseover", e[i].onmouseover);
                evt.removeEvent(o[i].element, "mouseout", e[i].onmouseout);
                evt.removeEvent(o[i].element, "click", e[i].onclick);
            }

            for (i = 0; i < o.length; i++) {
                o[i].subMenu && o[i].subMenu.dispose();
                o[i].dispose();
            }

            this.menu = this.menus = this.events = null;
            if (this.element) {
                this.element.innerHTML = "";
                this.element = null;
            }
        }
    };

    //子菜单
    var SubMenu = function (menu, container) {
        this.menu = menu || { items: [] };
        this.menus = [];
        this.events = [];
        this.element = null;
        this.subMenu = null;
        this.isShow = false;
        this.isSet = false;
        this.currentIndex = -1;
    };
    SubMenu.prototype = {
        renderTo: function (container) {
            var i, s, o = this.menu.items, e, evt = YYC.Tool.event;

            e = this.element = document.createElement("div");
            e.className = "DOTA_SubMenu";
            container.appendChild(e);

            for (i = 0; i < o.length; i++) {
                s = this.menus[i] = new MenuItem(o[i].text ? o[i].text : o[i], o[i].handler, 1, o[i].checked, o[i].menu);
                s.renderTo(e);
                if (!this.events[i]) {
                    this.events[i] = {};
                    this.events[i].onmouseover = evt.bindEvent(this, this.onMouseOver, i, s.element);
                    this.events[i].onmouseout = evt.bindEvent(this, this.onMouseOut, i, s.element);
                    this.events[i].onclick = evt.bindEvent(this, this.onclick, i, s.element);
                }
                if (o[i].text) {
                    evt.addEvent(s.element, "mouseover", this.events[i].onmouseover);
                    evt.addEvent(s.element, "mouseout", this.events[i].onmouseout);
                    evt.addEvent(s.element, "click", this.events[i].onclick);
                }
                //如果有子菜单则递归加入子菜单
                if (o[i].menu) {
                    s.subMenu = new SubMenu(o[i].menu);
                    s.subMenu.renderTo(container);
                }
            }
        },
        onMouseOver: function (oEvent, index, el) {
            var i = this.currentIndex, o = this.menus;
            if (i >= 0) {
                o[i].element.className = o[i].element.className.replace(/hover/ig, "");
                if (o[i].subMenu) {
                    o[i].subMenu.hide();
                }
            }
            el.className += " hover";
            if (o[index].subMenu) {
                o[index].subMenu.show(el);
            }
            this.currentIndex = index;
        },
        onMouseOut: function (oEvent, index, el) {
            //el.parentNode.className = oEvent.target.parentNode.className.replace(/hover/ig, "");
        },
        //执行handler
        onclick: function (oEvent, index, el) {
            //        console.log(oEvent);

            //        this.menus[index].handler();

            this.menus[index].handler(oEvent);

            //oEvent.stopPropagation();
        },
        //获得类名为“DOTA_Menu”的祖先元素
        getParent: function (obj) {
            while (obj && obj.className != "DOTA_Menu") {
                obj = obj.parentNode;
            }
            return obj;
        },
        show: function (parent, level) {
            var x, y, hei, wid, root, pos;
            if (!this.isSet) {
                this.isSet = true;
                root = this.getParent(parent);
                if (level === 0) {
                    x = parent.offsetLeft, y = parent.offsetTop, hei = parent.offsetHeight;
                    this.element.style.left = x + "px";
                    this.element.style.top = y + hei + 1 + "px";
                } else {
                    //    				pos = DOTA.F.getOffset(parent, this.getParent(parent)), wid = parent.offsetWidth;
                    pos = YYC.Tool.position.getToParentOffset(parent, this.getParent(parent)), wid = parent.offsetWidth;
                    this.element.style.left = pos.left + wid + "px";
                    this.element.style.top = pos.top + "px";
                }
            }
            this.element.style.display = "block";
            this.isShow = true;
        },
        hide: function () {
            var i = this.currentIndex, o = this.menus;
            if (i >= 0) {
                o[i].element.className = o[i].element.className.replace(/hover/ig, "");
            }
            this.element.style.display = "none";

            this.isShow = false;

            for (i = 0; i < o.length; i++) {
                if (o[i].subMenu && o[i].subMenu.isShow) {
                    o[i].subMenu.hide();
                }
            }
        },
        dispose: function () {
            var i, evt = YYC.Tool.event, o = this.menus, e = this.events;
            if (this.subMenu) {
                this.subMenu.dispose();
            }

            for (i = 0; i < e.length; i++) {
                evt.removeEvent(o[i].element, "mouseover", e[i].onmouseover);
                evt.removeEvent(o[i].element, "mouseout", e[i].onmouseout);
                evt.removeEvent(o[i].element, "click", e[i].onclick);
            }

            for (i = 0; i < o.length; i++) {
                o[i].subMenu && o[i].subMenu.dispose();
                o[i].dispose();
            }

            this.menu = this.menus = this.events = null;
            if (this.element) {
                this.element.innerHTML = "";
                this.element = null;
            }
        }
    };


    //菜单
    var Menu = function (menu) {
        menu = menu || {};
        //    this.menuID = menu.id || "";
        this.mainMenu = new MainMenu(menu);

        //    //此处修改为直接调用renderTo
        //    //menu.id即为外层（container）的id
        //    this.renderTo(menu.id);
    };
    Menu.prototype = {
        renderTo: function (container) {
            //        var e = this.element = document.createElement("div");

            container = YYC.Tool.selector.getDom(container);

            //        e.className = "DOTA_Menu";
            //        e.id = this.menuID;

            container.className = "DOTA_Menu";

            //        //加入菜单最外围的层
            //        container.appendChild(e);

            //        //加入菜单
            //        this.mainMenu.renderTo(e);

            //加入菜单
            this.mainMenu.renderTo(container);
        },
        setPosition: function (x, y) {
            var el = this.element;
            el.style.left = x + "px";
            el.style.top = y + "px";
        },
        getHeight: function () {
            return this.mainMenu.getHeight();
        },
        /*  设置显示的文字。
            调用示例：
            this.menu.setText([0, 1], "继续");    //设置主菜单第1项的一级子菜单第2项为“继续”
            this.menu.setText([0, 1, 0], "继续"); //设置主菜单第1项的一级子菜单第2项的二级子菜单第1项为“继续”
        */
        setText: function (where, text) {
            var main = where[0],
                temp = this.mainMenu.menus[main],
                i = 1;

            while (where[i] !== undefined) {
                temp = temp.subMenu.menus[where[i]];
                i += 1;
            }
            temp.setText(text);
        },
        getText: function () {
        },
        /*  设置该项的handler。
        调用示例：
        //设置主菜单第1项的一级子菜单第2项的handler为“function () {alert("new!");});”
        menu.setHandle([0, 1], function () {
            alert("new!");
        });
        */
        setHandle: function (where, new_handle) {
            var main = where[0],
                temp = this.mainMenu.menus[main],
                i = 1;

            while (where[i] !== undefined) {
                temp = temp.subMenu.menus[where[i]];
                i += 1;
            }
            temp.handler = new_handle;
        },
        getHandle: function () {
        },
        hide: function () {
            this.mainMenu.onDocumentClick();
        },
        dispose: function () {
            this.mainMenu.dispose();

            if (this.element) {
                this.element.innerHTML = "";
                this.element.parentNode.removeChild(this.element);
                this.element = null;
            }
        }
    };

    YYC.namespace("Control").Menu = Menu;
}());