using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Threading;

namespace BLL
{
    public class MyHttpModule : IHttpModule
    {
        //private static Random a = new Random();
        ///// <summary>
        ///// 设置为无符号数，增加b的取值范围
        ///// </summary>
        //private static UInt32 b = 0;
        //private static UInt32 key = 0;

        public void Init(HttpApplication application)
        {
            //context.BeginRequest += (new EventHandler(this.context_BeginRequest));
            //context.EndRequest += (new EventHandler(this.context_EndRequest));


            //application.BeginRequest += new EventHandler(OnPostAuthorizeRequest);
            //application.PostRequestHandlerExecute += new EventHandler(OnPostRequestHandlerExecute);

        }
        public void Dispose()
        {
        }

        private void OnPostAuthorizeRequest(Object source, EventArgs e)
        {

            //throw new Exception("cao!");

            HttpApplication app = (HttpApplication)source;
            HttpContext context = app.Context;

            // Make sure we only process requests to QDIG's index.php.
            String requestPath = context.Request.Path;

            var str = VirtualPathUtility.ToAbsolute("~/Views/Home/Index");
            //if (!requestPath.Equals(VirtualPathUtility.ToAbsolute
            //    ("~/Views/Home/Index")))
            //    return;



            //  Set up the vary by querystring information 
            //HttpCacheVaryByParams varyByParams =
            //  context.Response.Cache.VaryByParams;
            //varyByParams["Qwd"] = true; //  gallery path
            //varyByParams["Qif"] = true; //  image to display
            //varyByParams["Qiv"] = true; //  navigation mode
            //varyByParams["Qis"] = true; //  image size
            //varyByParams["Qtmp"] = true;//  other control information





            //// if user is set, also vary by user (See global.asax)
            //context.Response.Cache.SetVaryByCustom("session");



            if (context.Cache["Session"] != null)
            {
                //throw new Exception();
                context.Response.Cache.SetCacheability(System.Web.HttpCacheability.NoCache);
                context.Response.Cache.SetNoStore();
                context.Response.Cache.SetNoServerCaching();
                context.Response.Cache.SetValidUntilExpires(false);
                context.Response.Cache.SetSlidingExpiration(true);
                context.Response.Cache.SetExpires(DateTime.Now + TimeSpan.FromSeconds(-1));
                var m = context.Response.Cache;

            }
        }
        private void OnPostRequestHandlerExecute(Object source, EventArgs e)
        {
            //throw new Exception();
            HttpApplication app = (HttpApplication)source;
            HttpContext context = app.Context;

            // Make sure we only process requests to QDIG's index.php.
            String requestPath = context.Request.Path;
            if (!requestPath.Equals(VirtualPathUtility.ToAbsolute
                ("~/Home/Index")))
                return;


            //throw new Exception();
            // Enable this response to be output cached
            context.Response.Cache.SetCacheability(HttpCacheability.Public);
            context.Response.Cache.SetExpires(DateTime.Now +    //保存5 minute
              TimeSpan.FromMinutes(5));

        }
        //private void context_BeginRequest(Object source, EventArgs e)
        //{
        //    //throw new Exception("管道事件：BeginRequest 被我捕捉到了！！");



        //    //if (HttpContext.Current.Session == null)
        //    //{
        //    //    //System.Web.HttpResponse response = new System.Web.HttpResponse();
        //    //    //response.Redirect("/Account/LoginOn");
        //    //    //HttpContext.Current.Response.Redirect("~/SupportInfo/Index");
        //    //}
        //    //else
        //    //{
        //    //    HttpContext.Current.Session.
        //    //}
        //}
        ////private void context_BeginRequest(Object source, EventArgs e)
        ////{
        ////    ////b = (uint)a.Next(10000000);

        ////    //Database.DataClassesDataContext da = null;

        ////    //if (HttpContext.Current.Items[Thread.CurrentContext.ContextID.ToString()] == null)
        ////    //{
        ////    //    //AppDomain.GetCurrentThreadId();
        ////    //    da = new Database.DataClassesDataContext();
        ////    //    HttpContext.Current.Items[Thread.CurrentContext.ContextID.ToString()] = da;
        ////    //}
        ////    //else
        ////    //{
        ////    ////    da = new Database.DataClassesDataContext();
        ////    ////    b = (uint)(Thread.CurrentContext.ContextID + a.Next(10000000));
        ////    ////    HttpContext.Current.Items[b.ToString()] = da;
        ////    ////    HttpRuntime.Cache.Insert(Thread.CurrentContext.ContextID + a.Next(10000000).ToString(), 1, null, DateTime.Now.AddDays(1), System.Web.Caching.Cache.NoSlidingExpiration);
                
        ////    //    throw new FailException();  //如果请求出现多用户使用同一线程的并发冲突，则抛出异常    要检测是否抛出异常！
        ////    //}
        ////}
        //private void context_EndRequest(Object source, EventArgs e)
        //{
        //    //var da = HttpContext.Current.Items[HttpContext.Current.Items[Thread.CurrentContext.ContextID.ToString() + HttpContext.Current.Timestamp.ToString()]] as Database.DataClassesDataContext;
        //    //if (da != null)
        //    //{
        //    //    da.Dispose();
        //    //}
        //    //    //HttpContext.Current.Items.Remove(UNITYOBJECTS);
        //}
    }
}
