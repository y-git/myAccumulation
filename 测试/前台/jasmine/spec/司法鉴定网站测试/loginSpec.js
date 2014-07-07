describe("login.js", function () {

    beforeEach(function () {
    });

    afterEach(function () {
    });


    describe("prepare", function () {

        beforeEach(function () {
        });

        afterEach(function () {
        });


        it("存在prepare方法", function () {
            expect(login.prepare).not.toBeUndefined();
        });
        //        it("prepare方法被调用过", function () {
        //            expect(login.prepare).toHaveBeenCalled();
        //        });
    });

    describe("adminCheckLogin", function () {
        function spyOn_SetCookie_Fail() {
            spyOn(tool, "setCookie").andCallFake(function () {
                throw new Error();
            })
        };
        function spyOn_Post(result) {
            spyOn($, "post").andCallFake(function (url, value, func) {
                func(result);
            });
        };
        function spyOn_Jump() {
            spyOn(tool, "jump").andCallFake(function (url) {
                $("#lbl_msg").text(url);
            });
        };
        function spyOn_Alert() {
            spyOn(window, "alert").andCallFake(function (str) {
                $("#lbl_msg").text(str);
            });
        };
        function setUserNameAndPassword(userName, password) {
            $("#userName").val(userName);
            $("#password").val(password);
        }
        function insertDom() {
            var dom = $("<div id='test' style='display:none;'><input type='input' id='userName'/><input type='input' id='password'/>"
            + "<span id='lbl_msg'></span></div>")
            $("body").append(dom);
        };
        function removeDom() {
            $("#test").remove();
        };


        beforeEach(function () {
            insertDom();
        });
        afterEach(function () {
            removeDom();
        });


        it("存在adminCheckLogin方法", function () {
            expect(login.adminCheckLogin).not.toBeUndefined();
        });
        it("验证用户名不能为空", function () {
            setUserNameAndPassword("", "");
            //模拟点击
            login.adminCheckLogin();

            expect($("#lbl_msg").text()).toEqual("用户名不能为空");
        });
        it("验证密码不能为空", function () {
            setUserNameAndPassword("aaa", "");
            //模拟点击
            login.adminCheckLogin();

            expect($("#lbl_msg").text()).toEqual("密码不能为空");
        });
        it("优先验证用户名不能为空", function () {
            setUserNameAndPassword("", "");
            //模拟点击
            login.adminCheckLogin();

            expect($("#lbl_msg").text()).toEqual("用户名不能为空");
        });
        it("判断是否禁用了cookie", function () {
            spyOn_SetCookie_Fail();

            setUserNameAndPassword("aa", "aa");
            //模拟点击
            login.adminCheckLogin();

            expect($("#lbl_msg").text()).toEqual("cookie被禁用了");
        });
        //        it("ajax -> 参数url为“/Account/CheckLogin”", function () {
        //            //刺探私有方法“_sendAndJump”
        //            spyOn(login, "_sendAndJump");

        //            setUserNameAndPassword("aa", "aa");
        //            //模拟点击
        //            login.adminCheckLogin();

        //            expect(login._sendAndJump.mostRecentCall.args[0]).toEqual("/Account/CheckLogin");
        //        });
        it("ajax -> 回调函数返回值为Fail时提示", function () {
            spyOn_Post("Fail");
            spyOn_Alert();

            setUserNameAndPassword("aa", "aa");
            //模拟点击
            login.adminCheckLogin();

            expect($("#lbl_msg").text()).toEqual("登录失败！请重新输入");
        });
        it("ajax -> 回调函数返回值为Success时跳转", function () {
            spyOn_Post("Success");
            spyOn_Jump();

            setUserNameAndPassword("aa", "aa");
            //模拟点击
            login.adminCheckLogin();

            expect($("#lbl_msg").text()).toEqual("/Admin/Index");
        });
    });
});