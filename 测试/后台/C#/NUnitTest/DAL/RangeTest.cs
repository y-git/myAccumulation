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
using System.Data.Linq;


namespace 司法鉴定网站.Tests.Controllers.RangeTest
{
    [TestFixture]
    public class GetRange
    {
        private DALInterface.IRange range = null;

        [TestFixtureSetUp]
        public void PreTest() 
        {
            this.range = new DAL.Range();
        }


        [TestFixtureTearDown]
        public void AfterTest()
        {
            this.range = null;
        }

        [TestCase]
        public void NotNull()
        {
            Assert.IsNotNull(this.range.GetRange());
        }



        [TestCase]
        public void IsInstanceOfDatabaseRange()
        {
            Assert.IsInstanceOf<Database.Range>(this.range.GetRange());
            //Assert.IsInstanceOf(this.range.GetRange(), typeof(Database.Range));
            //// 排列
            //RangeController controller = new RangeController();

            //// 操作
            //ViewResult result = controller.Index() as ViewResult;
            //string name = result.ViewName;


            //// 断言
            //Assert.AreEqual("Index", name);
        }

        [TestCase]
        public void OnlyOne()
        {
            Assert.IsNotNull(this.range.GetRange().Body_T);
        }
    }
    [TestFixture]
    public class EditRange
    {
        private DALInterface.IRange range = null;

        [TestFixtureSetUp]
        public void PreTest()
        {
            this.range = new DAL.Range();
        }


        [TestFixtureTearDown]
        public void AfterTest()
        {
            this.range = null;
        }

        [TestCase]
        public void EditSuccess()
        {
            string original = this.range.GetRange().Body_T;
            string newBody = "test";
            string after = string.Empty;


            this.range.EditRange(new Database.Range()
            {
                Body_T = newBody
            });
            after = this.range.GetRange().Body_T;


            //验证修改前，数据表中的Body_T与要修改的newBody不等
            Assert.AreNotEqual(newBody, original);
            //验证修改成功
            Assert.AreEqual(newBody, after);
        }
    }
}
