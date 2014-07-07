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
    public class RoleTest
    {
        private DALInterface.IRole role = null;

        [TestFixtureSetUp]
        public void PreTest() 
        {
            this.role = new DAL.Role();
        }


        [TestFixtureTearDown]
        public void AfterTest()
        {
            this.role = null;
        }

        [TestCase]
        public void GetRole_NotNull()
        {
            Assert.IsNotNull(this.role.GetRole(1));
        }
        [TestCase]
        public void GetRole_IsInstanceOfDatabaseRole()
        {
            Assert.IsInstanceOf<Database.Role>(this.role.GetRole(1));
        }
    }
}
