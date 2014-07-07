using System;
using System.Xml.Linq;
using System.Xml.XPath;
using System.Linq;
using System.Web;
namespace Help
{
    public class XmlRoleOperation
    {
        //private string xmlPath = Server.MapPath("../../../../Role.xml");    //错误！不能多次用"../"!
        //private string xmlPath = Server.MapPath(@"D:\Role.xml");    //错误！不能为物理路径！
        private string xmlPath = null;
        private XElement xd = null;

        private XDocument roleXml = null;

        public string XmlPath
        {
            get
            {
                if (xmlPath == null)
                {
                    xmlPath = @"D:\Role.xml";
                }
                return xmlPath;
            }
            set { xmlPath = value; }
        }

        public XmlRoleOperation(string path)
        {
            xmlPath = path;
            //try
            //{
            //    xd = XElement.Load(xmlPath);
            //}
            //catch (Exception e)
            //{
            //    throw new Exception("加载xml文件失败：" + e.Message);
            //}
        }
        public XmlRoleOperation()
        {
            //xmlPath = @"D:\MyXml.xml";
            //xmlPath = System.IO.Path.GetFullPath("MyXml.xml");
            //var t = System.Web.HttpContext.Current.Server.MapPath("~");
            //var m = System.Web.HttpContext.Current.Server.MapPath("/");

            //用于单元测试
            //xmlPath = @"D:\Mobile Server\MVC\MyXml.xml";


            xmlPath = System.Web.HttpContext.Current.Server.MapPath("~/MyXml.xml");


            //try
            //{
            //    xd = XElement.Load(xmlPath);
            //}
            //catch (Exception e)
            //{
            //    throw new Exception("加载xml文件失败：" + e.Message);
            //}
        }
        //static XmlRoleOperation()
        //{
        //    CreateXml();

        //    xmlPath = @"D:\Role.xml";
        //    try
        //    {
        //        xd = XElement.Load(xmlPath);
        //    }
        //    catch (Exception e)
        //    {
        //        throw new Exception("加载xml文件失败：" + e.Message);
        //    }
        //}
        public void CreateXml()
        {
            if (!System.IO.File.Exists(xmlPath))
            {
                roleXml = new XDocument(
                    new XDeclaration("1.0", "utf-8", "yes"),
                    new XElement("Role",
                        new XElement("Personal",
                            new XElement("RoleName", "个人会员")),
                        new XElement("Company",
                            new XElement("RoleName", "供应商会员"),
                            new XElement("RoleName", "行业会员"))
                            )
                            );
                roleXml.Save(@"D:\Role.xml");
            }
        }
        public void DeleteNode()
        {
            xd = XElement.Load(xmlPath);
            /***********  删除节点    ***********/
            var nodes = (from t in xd.Descendants("Personal").Elements("RoleName")
                         where t.Value == "Vip个人会员"
                         select t).ToList();
            if (nodes.Any())
            {
                foreach (var item in nodes)
                {
                    item.Remove();
                }
            }

            var cnodes = (from t in xd.Descendants("Company").Elements("RoleName")
                          where t.Value == "Vip企业会员"
                          select t).ToList();
            if (cnodes.Any())
            {
                foreach (var item in cnodes)
                {
                    item.Remove();
                }
            }
            xd.Save(xmlPath);
            /**************************************/
        }

        public void AddNode()
        {
            xd = XElement.Load(xmlPath);
            /*******      添加节点    ******/
            var padd = (from t in xd.Descendants("Personal")
                        select t).ToList();
            if (padd.Elements("RoleName").Where(z => z.Value == "Vip个人会员").Any() == false)
            {
                padd.Single<XElement>().Add(new XElement("RoleName", "Vip个人会员"));
            }
            var cadd = (from t in xd.Descendants("Company")
                        select t).ToList();
            if (cadd.Elements("RoleName").Where(z => z.Value == "Vip企业会员").Any() == false)
            {
                cadd.Single<XElement>().Add(new XElement("RoleName", "Vip企业会员"));
            }
            xd.Save(xmlPath);
            /************************************/
        }

        public string RoleType(string roleName)
        {
            xd = XElement.Load(xmlPath);
            /******************************************* 读取节点    *********************************************/
            var pname = (from t in xd.Descendants("Personal").Elements("RoleName")
                         select t.Value).ToList();
            var cname = (from t in xd.Descendants("Company").Elements("RoleName")
                         select t.Value).ToList();
            /****************************************************************************************************************/
            foreach (string item in pname)
            {
                if (roleName == item)
                {
                    return "personal";
                    break;
                    //person.RegisterTime(userID);
                    //a = 1;
                    //break;
                }
            }
            foreach (string item in cname)
            {
                if (roleName == item)
                {
                    return "company";
                    break;
                    //company.RegisterTime(userID);
                    //break;
                }
            }
            return "wrong";     //若该roleName在Role.xml文件中找不到对应项
        }

        public string GetValue(string key)
        {
            xd = XElement.Load(xmlPath);
            string value = (from q in xd.Descendants("MySet").Elements(key)
                            select q.Value).First();
            return value;
        }
        public string GetValue(string root, string key)
        {
            xd = XElement.Load(xmlPath);
            string value = (from q in xd.Descendants(root).Elements(key)
                            select q.Value).First();
            return value;
        }
    }
}
