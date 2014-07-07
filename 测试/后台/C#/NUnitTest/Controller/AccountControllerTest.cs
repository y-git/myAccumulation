using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using 司法鉴定网站;
using 司法鉴定网站.Controllers;
using Moq;      //使用Mock框架moq
using System.Web;
using NUnit.Framework;


namespace 司法鉴定网站.Tests.Controllers
{
    [TestFixture]
    public class AccountControllerTest
    {
        private AccountController controller = null;

        [TestFixtureSetUp]
        public void PreTest() 
        {

            ////模拟
            //var mock = new Mock<DALInterface.IAccount>();
            //mock.Setup(fu => fu.GetAccount()).Returns(new Database.Account());
            
            ////传入mock对象
            //this.controller = new AccountController(mock.Object);

            this.controller = new AccountController();
        }

        [TestFixtureTearDown]
        public void AfterTest()
        {
            this.controller.Dispose();
        }

        #region 私有方法
        private void CheckLogin_Mock(string userName, string password, bool result)
        {
            var mock_role = new Mock<DALInterface.IRole>();
            var mock_user = new Mock<DALInterface.IUser>();

            mock_role.Setup(fu => fu.GetRole(1)).Returns(new Database.Role()
            {
                RoleID_N = 1,
                Name_C = "管理员"
            });
            mock_user.Setup(fu => fu.GetUser(userName)).Returns(new Database.User()
            {
                Name_C = "admin",
                Password_C = "admin",
                RoleID_N = 1
            });
            mock_user.Setup(fu => fu.ValidateUser(userName, password)).Returns(result);

            this.controller = new AccountController(mock_role.Object, mock_user.Object);
        }
        /// <summary>
        /// 模拟Controller
        /// </summary>
        private void Controller_Mock()
        {
            ControllerContext context =
new ControllerContext(new System.Web.Routing.RequestContext(FakeAuthenticatedHttpContext(), new System.Web.Routing.RouteData()), this.controller);

            this.controller.ControllerContext = context;
        }
        private HttpContextBase FakeAuthenticatedHttpContext()
        {
            var context = new Mock<HttpContextBase>();
            var request = new Mock<HttpRequestBase>();
            var response = new Mock<HttpResponseBase>();
            var session = new Mock<HttpSessionStateBase>();
            var server = new Mock<HttpServerUtilityBase>();

            context.Setup(ctx => ctx.Request).Returns(request.Object);
            context.Setup(ctx => ctx.Response).Returns(response.Object);
            context.Setup(ctx => ctx.Session).Returns(session.Object);
            context.Setup(ctx => ctx.Server).Returns(server.Object);

            return context.Object;
        }


        #endregion


        [TestCase(TestName="测试返回的视图名")]
        public void Login_Admin_ViewName()
        {
            // 操作
            ViewResult result = this.controller.Login_Admin() as ViewResult;
            string name = result.ViewName;


            // 断言
            Assert.AreEqual("Login_Admin", name);
        }

        [TestCase]
        public void CheckLogin_ReturnFail()
        {
            var userName = "admin";
            var password = "test";

            CheckLogin_Mock(userName, password, false);

            ContentResult result = this.controller.CheckLogin(userName, password) as ContentResult;

            Assert.AreEqual("Fail", result.Content);
        }
        [TestCase]
        public void CheckLogin_ReturnSuccess()
        {
            var userName = "admin";
            var password = "admin";

            CheckLogin_Mock(userName, password, true);
            //此处使用了Session，需要模拟
            Controller_Mock();

            ContentResult result = this.controller.CheckLogin(userName, password) as ContentResult;

            Assert.AreEqual("Success", result.Content);
        }
    }
}
