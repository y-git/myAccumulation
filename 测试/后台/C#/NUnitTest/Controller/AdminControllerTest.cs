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

//将“AdminControllerTest”加入命名空间中
namespace 司法鉴定网站.Tests.Controllers.AdminControllerTest
{
        [TestFixture, Description("每个类测试一个方法")]
        public class Index
        {
            private AdminController controller = null;

            [TestFixtureSetUp]
            public void PreTest()
            {
                ////模拟
                //var mock = new Mock<DALInterface.IRange>();

                //mock.Setup(fu => fu.GetRange()).Returns(new Database.Range());

                ////传入mock对象
                //this.controller = new AdminController(mock.Object);

                this.controller = new AdminController();
            }

            [TestFixtureTearDown]
            public void AfterTest()
            {
                this.controller.Dispose();
            }

            [TestCase(TestName="测试返回的视图名")]
            public void ViewName()
            {
                Help.MockSession.Mock(this.controller);

                ViewResult result = this.controller.Index() as ViewResult;
                string name = result.ViewName;

                Assert.AreEqual("Index", name);
            }
            [TestCase(TestName = "测试ViewData")]
            public void ViewData()
            {
                IDictionary<string, string> dict = new Dictionary<string, string>();
                dict.Add("userName", "admin");
                dict.Add("roleName", "管理员");

                Help.MockSession.Mock(dict, this.controller);

                ViewResult result = this.controller.Index() as ViewResult;
                string userName = result.ViewData["UserName"].ToString();
                string roleName = result.ViewData["RoleName"].ToString();

                Assert.AreEqual("admin", userName);
                Assert.AreEqual("管理员", roleName);
            }
        }
        [TestFixture, Description("每个类测试一个方法")]
        public class Range_Index
        {
            private AdminController controller = null;

            [TestFixtureSetUp]
            public void PreTest()
            {
                ////模拟
                //var mock = new Mock<DALInterface.IRange>();

                //mock.Setup(fu => fu.GetRange()).Returns(new Database.Range());

                ////传入mock对象
                //this.controller = new AdminController(mock.Object);

                this.controller = new AdminController();
            }

            [TestFixtureTearDown]
            public void AfterTest()
            {
                this.controller.Dispose();
            }

            #region 私有方法
            private void Mock()
            {
                //模拟
                var mock = new Mock<DALInterface.IRange>();
                mock.Setup(fu => fu.GetRange()).Returns(new Database.Range());

                //传入mock对象
                this.controller = new AdminController(mock.Object);
            }
            #endregion

            [TestCase(TestName = "测试返回的视图名")]
            public void ViewName()
            {
                Mock();


                ViewResult result = this.controller.Range_Index() as ViewResult;
                string name = result.ViewName;

                Assert.AreEqual("Range_Index", name);
            }
            [TestCase(TestName = "测试Model")]
            public void Model()
            {
                Mock();

                ViewResult result = this.controller.Range_Index() as ViewResult;
                var model = result.ViewData.Model;

                Assert.IsInstanceOf<Database.Range>(model);
            }
        }
        [TestFixture, Description("每个类测试一个方法")]
        public class Range_Submit
        {
            private AdminController controller = null;

            [TestFixtureSetUp]
            public void PreTest()
            {
                this.controller = new AdminController();
            }

            [TestFixtureTearDown]
            public void AfterTest()
            {
                this.controller.Dispose();
            }

            #region 私有方法
            private void Mock()
            {
                //模拟
                var mock = new Mock<DALInterface.IRange>();
                mock.Setup(fu => fu.GetRange()).Returns(new Database.Range());

                //传入mock对象
                this.controller = new AdminController(mock.Object);
            }
            #endregion

            [TestCase(TestName="返回Success字符串")]
            public void ReturnSuccess()
            {
                var body = "test";
                var range = new Database.Range()
                {
                    Body_T = "test"
                };

                //模拟
                var mock = new Mock<DALInterface.IRange>();
                mock.Setup(fu => fu.EditRange(range));
                //传入mock对象
                this.controller = new AdminController(mock.Object);

                ContentResult result = this.controller.Range_Submit(body) as ContentResult;

                Assert.AreEqual("Success", result.Content);
            }
            [TestCase(TestName = "编辑出错，返回Fail字符串")]
            public void ReturnFail()
            {
                var body = "test";
                //var range = new Database.Range()
                //{
                //    Body_T = body
                //};

                //模拟
                var mock = new Mock<DALInterface.IRange>();
                mock.Setup(fu => fu.EditRange(It.IsAny <Database.Range>())).Throws(new Exception());
                //传入mock对象
                this.controller = new AdminController(mock.Object);

                ContentResult result = this.controller.Range_Submit(body) as ContentResult;

                Assert.AreEqual("Fail", result.Content);
            }
        }
}
