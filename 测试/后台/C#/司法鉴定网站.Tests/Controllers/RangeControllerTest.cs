using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using 司法鉴定网站;
using 司法鉴定网站.Controllers;
using Moq;      //使用Mock框架moq


namespace 司法鉴定网站.Tests.Controllers
{
    [TestClass]
    public class RangeControllerTest
    {
        //private RangeController controller = null;
        //private Mock<DALInterface.IRange> mock = null;




        [TestClass]
        public class IndexTest
        {
            private RangeController controller = null;
            private Mock<DALInterface.IRange> mock = null;

            [TestInitialize]
            public void PreTest()
            {

                //模拟
                mock = new Mock<DALInterface.IRange>();

                mock.Setup(fu => fu.GetRange()).Returns(new Database.Range());

                //传入mock对象
                this.controller = new RangeController(mock.Object);

                //this.controller.ControllerContext = mock.Object;
            }

            [TestCleanup]
            public void AfterTest()
            {
                this.controller.Dispose();
            }


            [TestMethod]
            public void Index_ViewName()
            {
                // 操作
                ViewResult result = this.controller.Index() as ViewResult;
                string name = result.ViewName;

                // 断言
                Assert.AreEqual("Index", name);
            }
            [TestMethod]
            public void Index_Model()
            {
                ViewResult result = controller.Index() as ViewResult;
                var model = result.ViewData.Model;

                Assert.IsInstanceOfType(model, typeof(Database.Range));
            }
        }


        
    }
}
