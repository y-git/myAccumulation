using System;
using System.Xml.Linq;
using System.Xml.XPath;
using System.Linq;
using System.Web.Mvc;
using System.Web;
using System.Web.Routing;

//要导入System.Web.Abstractions
namespace BLL
{
    public class MyAttributeFilter :　ActionFilterAttribute
    {
        private bool isJson = false;    //初始值为false
        public bool IsJson
        {
            get { return isJson; }
            set { isJson = value; } //如果用{ get; set; }则isJson一直为false！为什么？？
        }
        public override void  OnActionExecuting(ActionExecutingContext filterContext)
        {
            //bool a = isJson;
            //bool b = IsJson;
            var userID = BLL.MyCache.UserID;
            if (filterContext.HttpContext.Session["userID"] == null)
            {
/**无效！估计是因为跳转后的页面的HttpContext与此行的HttpContext（即跳转前页面的HttpContext）不同
                filterContext.HttpContext.Response.Write("<script type='text/javascript'>alert('aaa');</script>");    */
                if (filterContext.HttpContext.Request.IsAjaxRequest())
                {
                    if (isJson == true) //$.getJSON,则设置为允许get方法
                    {
                        filterContext.Result = new JsonResult
                        {
                            Data = new { IsJson = true },
                            ContentType = "application/json",
                            ContentEncoding = System.Text.Encoding.UTF8,
                            JsonRequestBehavior = JsonRequestBehavior.AllowGet

                        };
                    }
                    else
                    {
                        //filterContext.Result = new RedirectToRouteResult("default", new RouteValueDictionary(new { controller = "Account", action = "LoginOn" }));
                        //如果是ajax请求的话，该返回的js的代码会作为ajax调用的返回的结果返回到对应的js函数中，所以上一行失效（因为在js中不支持RedirectToRouteResult）
                        //如果ajax请求是用$.getJSON发起的，则发生错误，不能取得返回的js的代码
                        filterContext.Result = new AjaxUnauthorizedResult();
                    }
                }
                else
                {
                    filterContext.Result = new RedirectToRouteResult("default", new RouteValueDictionary(new { controller = "Account", action = "LoginOn" }));
                }
                //base.OnActionExecuting(filterContext);  //已经跳转了，所以不行要此行代码
            }
        }
    }
    public class AjaxUnauthorizedResult : JavaScriptResult
    {
        public AjaxUnauthorizedResult()
        {
            var loginurl = "/Account/LoginOn";  //session为空时ajax（返回的不是json格式的数据）的跳转地址
            this.Script = "location.href='" + loginurl + "'";
        }
    }

}
