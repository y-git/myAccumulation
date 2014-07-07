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
    public class RangeControllerTest
    {
        private RangeController controller = null;
        private Mock<DALInterface.IRange> mock = null;

        [TestFixtureSetUp]
        public void PreTest()
        {

            //模拟
            mock = new Mock<DALInterface.IRange>();

            mock.Setup(fu => fu.GetRange()).Returns(new Database.Range());

            //传入mock对象
            this.controller = new RangeController(mock.Object);

            //this.controller.ControllerContext = mock.Object;
        }

        [TestFixtureTearDown]
        public void AfterTest()
        {
            this.controller.Dispose();
        }


        [TestCase]
        public void Index_ViewName()
        {
            // 操作
            ViewResult result = this.controller.Index() as ViewResult;
            string name = result.ViewName;

            // 断言
            Assert.AreEqual("Index", name);
        }
        [TestCase]
        public void Index_Model()
        {
            ViewResult result = controller.Index() as ViewResult;
            var model = result.ViewData.Model;

            Assert.IsInstanceOf<Database.Range>(model);

        }
    }
}