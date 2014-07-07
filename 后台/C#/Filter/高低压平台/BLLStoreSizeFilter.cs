using System;
using System.Xml.Linq;
using System.Xml.XPath;
using System.Linq;
using System.Web.Mvc;
using System.Web;
using System.Web.Routing;
using System.Configuration;
//要导入System.Web.Abstractions
namespace BLL
{
    public class BLLStoreSizeFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            BLL.StoreSize.PageSize = Convert.ToInt32(ConfigurationManager.AppSettings["PageSize"]);
            //BLL.StoreSize.PageSize = Convert.ToInt32(ConfigurationManager.AppSettings["PageSize"]);
            //BLL.StoreSize.CategoryID = 0;
            base.OnActionExecuting(filterContext);
        }
    }
}
