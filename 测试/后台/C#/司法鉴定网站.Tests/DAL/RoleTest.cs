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
    public class RoleTest
    {
        private DALInterface.IRole role = null;

        [TestInitialize]
        public void PreTest() 
        {
            this.role = new DAL.Role();
        }


        [TestCleanup]
        public void AfterTest()
        {
            this.role = null;
        }

        [TestMethod]
        public void GetRole_NotNull()
        {
            Assert.IsNotNull(this.role.GetRole(1));
        }
        [TestMethod]
        public void GetRole_IsInstanceOfDatabaseRole()
        {
            Assert.IsInstanceOfType(this.role.GetRole(1), typeof(Database.Role));
        }
    }
}
