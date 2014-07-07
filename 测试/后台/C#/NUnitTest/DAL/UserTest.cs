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


namespace 司法鉴定网站.Tests.Controllers
{
    [TestFixture]
    public class UserTest
    {
        private DALInterface.IUser user = null;

        [TestFixtureSetUp]
        public void PreTest() 
        {
            this.user = new DAL.User();
        }


        [TestFixtureTearDown]
        public void AfterTest()
        {
            this.user = null;
        }

        [TestCase]
        public void GetUser_NotNull()
        {
            Assert.IsNotNull(this.user.GetUser("admin"));
        }
        [TestCase]
        public void GetUser_IsInstanceOfDatabaseUser()
        {
            Assert.IsInstanceOf<Database.User>(this.user.GetUser("admin"));
        }
        [TestCase]
        public void ValidateUser_True()
        {
            Assert.IsTrue(this.user.ValidateUser("admin", "admin"));
        }
        [TestCase]
        public void ValidateUser_False()
        {
            Assert.IsFalse(this.user.ValidateUser("admin1", "admin1"));
        }
    }
}
