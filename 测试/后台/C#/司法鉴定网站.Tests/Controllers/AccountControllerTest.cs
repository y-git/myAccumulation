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
    public class AccountControllerTest
    {
        private AccountController controller = null;

        [TestInitialize]
        public void PreTest() 
        {

            ////模拟
            //var mock = new Mock<DALInterface.IAccount>();
            //mock.Setup(fu => fu.GetAccount()).Returns(new Database.Account());
            
            ////传入mock对象
            //this.controller = new AccountController(mock.Object);

            this.controller = new AccountController();
        }

        [TestCleanup]
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
        #endregion


        [TestMethod]
        public void Login_Admin_ViewName()
        {
            // 操作
            ViewResult result = this.controller.Login_Admin() as ViewResult;
            string name = result.ViewName;


            // 断言
            Assert.AreEqual("Login_Admin", name);
        }

        [TestCategory("CheckLogin"), TestMethod]
        public void CheckLogin_ReturnFail()
        {
            var userName = "admin";
            var password = "test";

            CheckLogin_Mock(userName, password, false);

            ContentResult result = this.controller.CheckLogin(userName, password) as ContentResult;

            Assert.AreEqual("Fail", result.Content);
        }
        [TestCategory("CheckLogin"), TestMethod]
        public void CheckLogin_ReturnSuccess()
        {
            var userName = "admin";
            var password = "admin";

            CheckLogin_Mock(userName, password, true);
            //此处使用了Session，需要模拟
            //Controller_Mock();
            Help.MockSession.Mock(this.controller);

            ContentResult result = this.controller.CheckLogin(userName, password) as ContentResult;

            Assert.AreEqual("Success", result.Content);
        }
    }
}
