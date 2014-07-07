using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using 司法鉴定网站;
using 司法鉴定网站.Controllers;
using Moq;      //使用Mock框架moq
using System.Web;

namespace 司法鉴定网站.Tests.Controllers
{
    [TestClass]
    public class AdminControllerTest
    {
        private AdminController controller = null;

        [TestInitialize]
        public void PreTest() 
        {
            ////模拟
            //var mock = new Mock<DALInterface.IRange>();

            //mock.Setup(fu => fu.GetRange()).Returns(new Database.Range());

            ////传入mock对象
            //this.controller = new AdminController(mock.Object);

            this.controller = new AdminController();
        }

        [TestCleanup]
        public void AfterTest()
        {
            this.controller.Dispose();
        }

        #region 私有方法
        #region 模拟Session
        /// <summary>
        /// 模拟Session
        /// </summary>
        private void Session_Mock(IDictionary<string, string> sessionDict)
        {
            ControllerContext context =
new ControllerContext(new System.Web.Routing.RequestContext(FakeAuthenticatedHttpContext_Session(sessionDict), new System.Web.Routing.RouteData()), this.controller);

            this.controller.ControllerContext = context;
        }
        private HttpContextBase FakeAuthenticatedHttpContext_Session(IDictionary<string, string> sessionDict)
        {
            var context = new Mock<HttpContextBase>();
            var session = new Mock<HttpSessionStateBase>();

            foreach (var item in sessionDict)
            {
                context.Setup(ctx => ctx.Session[item.Key]).Returns(item.Value);
            }

            return context.Object;
        }
        /// <summary>
        /// 重载
        /// </summary>
        private void Session_Mock()
        {
            ControllerContext context =
new ControllerContext(new System.Web.Routing.RequestContext(FakeAuthenticatedHttpContext_Session(), new System.Web.Routing.RouteData()), this.controller);

            this.controller.ControllerContext = context;
        }
        private HttpContextBase FakeAuthenticatedHttpContext_Session()
        {
            var context = new Mock<HttpContextBase>();
            var session = new Mock<HttpSessionStateBase>();

                context.Setup(ctx => ctx.Session).Returns(session.Object);

            return context.Object;
        }
        #endregion
        private void Mock_Range_Index()
        {
            //模拟
            var mock = new Mock<DALInterface.IRange>();
            mock.Setup(fu => fu.GetRange()).Returns(new Database.Range());

            //传入mock对象
            this.controller = new AdminController(mock.Object);
        }
        #endregion

        [TestMethod]
        public void Index_ViewName()
        {
            Session_Mock();

            ViewResult result = this.controller.Index() as ViewResult;
            string name = result.ViewName;

            Assert.AreEqual("Index", name);
        }
        [TestMethod]
        public void Index_ViewData()
        {
            IDictionary<string, string> dict = new Dictionary<string, string>();
            dict.Add("userName", "admin");
            dict.Add("roleName", "管理员");

            Session_Mock(dict);

             ViewResult result = this.controller.Index() as ViewResult;
             string userName = result.ViewData["UserName"].ToString();
             string roleName = result.ViewData["RoleName"].ToString();

             Assert.AreEqual("admin", userName);
             Assert.AreEqual("管理员", roleName);
        }
        #region 鉴定范围
        [TestMethod]
        public void Range_Index_ViewName()
        {
            Mock_Range_Index();


            ViewResult result = this.controller.Range_Index() as ViewResult;
            string name = result.ViewName;

            Assert.AreEqual("Range_Index", name);
        }
        [TestMethod]
        public void Range_Index_Model()
        {
            Mock_Range_Index();

            ViewResult result = this.controller.Range_Index() as ViewResult;
            var model = result.ViewData.Model;

            Assert.IsInstanceOfType(model, typeof(Database.Range));
        }
        #endregion
    }
}
