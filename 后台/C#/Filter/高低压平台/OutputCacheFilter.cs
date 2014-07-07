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
    public class MyCacheFilter : ActionFilterAttribute
    {
        //public override void OnActionExecuting(ActionExecutingContext filterContext)
        //{
        //    if (filterContext.HttpContext.Session["UserID"] != null)
        //    {
        //        filterContext.HttpContext.Response.Cache.SetCacheability(System.Web.HttpCacheability.NoCache);
        //        filterContext.HttpContext.Response.Cache.SetNoStore();
        //    }
        //    base.OnActionExecuting(filterContext);
        //}
        public override void OnResultExecuting(ResultExecutingContext filterContext)
        {
            //if (filterContext.HttpContext.Session["UserID"] == null)
            //{
            //if (filterContext.HttpContext.Cache["Session"] == null)
            //{

            /*同OutputCache中的VaryByCustom。
             * 同理还可以设置
             * //  Set up the vary by querystring information 
                    HttpCacheVaryByParams varyByParams = 
                      context.Response.Cache.VaryByParams;
                    varyByParams["Qwd"] = true; //  gallery path
                    varyByParams["Qif"] = true; //  image to display
                    varyByParams["Qiv"] = true; //  navigation mode
                    varyByParams["Qis"] = true; //  image size
                    varyByParams["Qtmp"] = true;//  other control information
            *等等
             */
            filterContext.HttpContext.Response.Cache.SetVaryByCustom("session");

            filterContext.HttpContext.Response.Cache.SetCacheability(HttpCacheability.Public);
            filterContext.HttpContext.Response.Cache.SetExpires(DateTime.Now + TimeSpan.FromSeconds(50));
            /*
             * AddValidationCallback 方法提供一种在输出缓存将响应返回客户端之前以编程方式检查缓存中的响应的机制。 
             * 在从 Web 服务器缓存提供响应之前，系统会查询所有已注册的处理程序以确保资源的有效性。
             * 如果任何处理程序设置了指示缓存的响应无效的标志，则该项将被标记为无效，并从缓存中排除。
             * 在此情况下，以及在任何处理程序指示应该对此请求忽略缓存的响应时，对请求的处理将像缓存未命中一样进行。
             * 
             * 
             * 
             * 用这种方式在委托中判断，可以实现VaryByCustom的功能！
             */
            //filterContext.HttpContext.Response.Cache.AddValidationCallback(new HttpCacheValidateHandler(ValidateCache), null);
        //}

                /*When sliding expiration is enabled (SetSlidingExpiration(true)), 
                 * a request made to the origin server always generates a response. 
                 * Sliding expiration is useful in scenarios where there are downstream caches that can satisfy client requests, 
                 * if the content has not expired yet, without requesting the content from the origin server. 
                 */
                //filterContext.HttpContext.Response.Cache.SetSlidingExpiration(true); 
   


            //}
            //else
            //{
            //    filterContext.HttpContext.Response.Cache.SetCacheability(System.Web.HttpCacheability.NoCache);
            //    filterContext.HttpContext.Response.Cache.SetNoStore();
            //}

            //filterContext.HttpContext.Response.Cache.SetExpires(DateTime.UtcNow.AddDays(-1));
            //filterContext.HttpContext.Response.Cache.SetValidUntilExpires(false);
            //filterContext.HttpContext.Response.Cache.SetRevalidation(HttpCacheRevalidation.AllCaches);
            //filterContext.HttpContext.Response.Cache.SetCacheability(HttpCacheability.NoCache);
            //filterContext.HttpContext.Response.Cache.SetNoStore(); 

            base.OnResultExecuting(filterContext);
        }
        /*参数：
            context类型：System.Web.HttpContext
            包含有关当前请求的信息的 HttpContext 对象。
            data类型：System.Object
            用于验证缓存项的用户提供的数据。
            validationStatus类型：System.Web.HttpValidationStatus
            HttpValidationStatus 枚举值。您的委托应设置该值来指示验证的结果。
        */
        public static void ValidateCache(HttpContext context, object data, ref HttpValidationStatus status)
        {
            string session = MyCookie.GetCookie("XingKeDa_Session");   
            //if (context.Session["UserID"] != null)

            /*注册和退出时添加CacheOperate.Add("Session", "true");
             * 然后在此委托中判断，即可以实现用户登录和注销后，刷新缓存
             */
            if (session != null)
            {
                //CacheOperate.Remove("Session");     //判断完后移除该缓存，下次就可以直接调用缓存了
                //var t = context.Cache["Session"];
                status = HttpValidationStatus.IgnoreThisRequest;
            }
            else
            {
                status = HttpValidationStatus.Valid;
            }
        }
    }
}
