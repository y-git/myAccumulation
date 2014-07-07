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
    public class UserTest
    {
        private DALInterface.IUser user = null;

        [TestInitialize]
        public void PreTest() 
        {
            this.user = new DAL.User();
        }


        [TestCleanup]
        public void AfterTest()
        {
            this.user = null;
        }

        [TestMethod]
        public void GetUser_NotNull()
        {
            Assert.IsNotNull(this.user.GetUser("admin"));
        }
        [TestMethod]
        public void GetUser_IsInstanceOfDatabaseUser()
        {
            Assert.IsInstanceOfType(this.user.GetUser("admin"), typeof(Database.User));
        }
        [TestMethod]
        public void ValidateUser_True()
        {
            Assert.IsTrue(this.user.ValidateUser("admin", "admin"));
        }
        [TestMethod]
        public void ValidateUser_False()
        {
            Assert.IsFalse(this.user.ValidateUser("admin1", "admin1"));
        }
    }
}
