using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using 司法鉴定网站;
using 司法鉴定网站.Controllers;
using Moq;      //使用Mock框架moq
using DAL;
using System.Data.Linq;


namespace 司法鉴定网站.Tests.Controllers
{
    [TestClass]
    public class RangeTest
    {
        private DALInterface.IRange range = null;

        [TestInitialize]
        public void PreTest() 
        {
            this.range = new DAL.Range();
        }


        [TestCleanup]
        public void AfterTest()
        {
            this.range = null;
        }

        [TestMethod]
        public void GetRange_NotNull()
        {
            Assert.IsNotNull(this.range.GetRange());
        }



        [TestMethod]
        public void GetRange_IsInstanceOfDatabaseRange()
        {
            Assert.IsInstanceOfType(this.range.GetRange(), typeof(Database.Range));
            //// 排列
            //RangeController controller = new RangeController();

            //// 操作
            //ViewResult result = controller.Index() as ViewResult;
            //string name = result.ViewName;


            //// 断言
            //Assert.AreEqual("Index", name);
        }

        [TestMethod]
        public void GetRange_OnlyOne()
        {
            Assert.IsNotNull(this.range.GetRange().Body_T);
        }
    }
}
