using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.Text;
using System.Web.Compilation;
using System.Web.UI;
using System.IO;

namespace BLL
{
    /// <summary>
    /// HtmlHelper扩展
    /// 7-13创建
    /// </summary>
    public static class MyHtmlHelper
    {
        /// <summary>
        /// 返回部分页面的字符串（而不是直接写到Response.Out中。用于缓存部分页面）
        /// 来自于与博客园-老赵：
        /// http://blog.zhaojie.me/2009/09/standard-webformview-patch-and-mvcpatch-project.html
        /// http://blog.zhaojie.me/2009/09/aspnet-mvc-fragment-cache-1.html
        /// </summary>
        /// <param name="htmlHelper"></param>
        /// <param name="partial"></param>
        /// <returns></returns>
        public static string PartialView(this HtmlHelper htmlHelper, string partial)
        {
            var viewInstance = BuildManager.CreateInstanceFromVirtualPath(partial, typeof(object));
            var control = viewInstance as ViewUserControl;

            control.ViewContext = htmlHelper.ViewContext;
            /*传递强类型Model或ViewData数据
             * 使用实例如下：
             * 在要调用部分页面的地方：
             * <%= CacheOperate.Add_Get("Score", () => Html.PartialView("~/Views/CompanyLib/PartialView/Star_rating.ascx"))%> （SupportUserDetail.ascx）
             * 然后在Star_rating.ascx中可以这样获得数据：
             * <% decimal score = Convert.ToDecimal(ViewData["Score"]); %> 
             * 这里传递的是ViewData数据，也可以使用Model强类型数据，如在Star_rating.ascx中这样获得数据：
             * <%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Model.Entity.Account.CompanyUser>" %>
             * ...
             * <% decimal score = Model.Score %>
             */
            control.ViewData = htmlHelper.ViewData; 
            Page page = new ViewPage();
            page.Controls.Add(control);

            TextWriter writer = new StringWriter();
            htmlHelper.ViewContext.HttpContext.Server.Execute(page, writer, false);

            return writer.ToString();
        }
        //未实现！
        //public static string PartialView(string partial)
        //{
        //    var viewInstance = BuildManager.CreateInstanceFromVirtualPath(partial, typeof(object));
        //    var control = viewInstance as ViewUserControl;

        //    control.ViewContext = CacheOperate.GetCacheBySelfToAs("ViewContext") as System.Web.Mvc.ViewContext;
        //    /*传递强类型Model或ViewData数据
        //     * 使用实例如下：
        //     * 在要调用部分页面的地方：
        //     * <%= CacheOperate.Add_Get("Score", () => Html.PartialView("~/Views/CompanyLib/PartialView/Star_rating.ascx"))%> （SupportUserDetail.ascx）
        //     * 然后在Star_rating.ascx中可以这样获得数据：
        //     * <% decimal score = Convert.ToDecimal(ViewData["Score"]); %> 
        //     * 这里传递的是ViewData数据，也可以使用Model强类型数据，如在Star_rating.ascx中这样获得数据：
        //     * <%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Model.Entity.Account.CompanyUser>" %>
        //     * ...
        //     * <% decimal score = Model.Score %>
        //     */
        //    control.ViewData = CacheOperate.GetCacheBySelfToAs("ViewData") as ViewDataDictionary;
        //    Page page = new ViewPage();
        //    page.Controls.Add(control);

        //    TextWriter writer = new StringWriter();
        //    htmlHelper.ViewContext.HttpContext.Server.Execute(page, writer, false);

        //    return writer.ToString();
        //}
    }
}