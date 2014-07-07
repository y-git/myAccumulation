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
    public class SmartNavigationFilter : ActionFilterAttribute  //实现页面智能定位，有问题，还不能实现！（在js脚本中已实现！[SmartNavigation文件中的js]）
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            string str =  "<script type='text/javascript'>$(function(){var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;"
                + "var name = 'SmartNavigation';var value = scrollTop;"
                + "var hour = 1;var exp = new Date();exp.setTime(exp.getTime() + hour * 60 * 60 * 1000);"   //创建并设置"SmartNavigation"的cookie，有效期为1小时
                + "document.cookie = name + '=' + escape(value) + '; expires = ' + exp.toGMTString();});"
                //+ "alert(document.cookie);"
                + "</script>";   
            filterContext.HttpContext.Response.Output.Write(str);
            base.OnActionExecuting(filterContext);
        }
        public override void OnResultExecuted(ResultExecutedContext filterContext)
        {
            string str = "<script type='text/javascript'>$(function(){"
                + "var arrStr = document.cookie.split(';');var smartNavigation = null;"  
                    + "for (var i = 0; i < arrStr.length; i++) {"
                    + "var temp = arrStr[i].split('=');"
                    + "if (Trim(temp[0]) == name) {"                    //获取"SmartNavigation"cookie的值
                    + "smartNavigation = (temp[1]);break;}}"
                    //+ "alert('smartNavigation='+smartNavigation);"
                    + "document.documentElement.scrollTop = smartNavigation;"   //设置页面的scrollTop为"SmartNavigation"cookie的值
                + "});</script>";
            filterContext.HttpContext.Response.Output.Write(str);
            base.OnResultExecuted(filterContext);
        }
    }
}
