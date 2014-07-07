using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Configuration;
using System.Web;
namespace Help
{
    /// <summary>
    /// 8-30修改
    /// </summary>
    public static class MyCookie
    {
        // /* 测试代码：
        // *  HttpRequest Request = HttpContext.Current.Request;
        //    HttpResponse Response = HttpContext.Current.Response;
        //    MyCookie.AddCookie("aa", "1");
        //    HttpCookie tempCurBuyerList3 = Request.Cookies["aa"];
        //    MyCookie.AddCookie("aa", "2");
        //    HttpCookie tempCurBuyerList4 = Request.Cookies["aa"];
        //    HttpCookie addToCookies = new HttpCookie("aa");//初使化并设置Cookie的名称　　　　
        //    addToCookies.Value = "3";
        //    addToCookies.Expires = DateTime.Now.AddDays(1);
        //    Response.AppendCookie(addToCookies);
        //    HttpCookie tempCurBuyerList5 = Request.Cookies["aa"];
        //    HttpCookie tempCurBuyerList6 = Request.Cookies["aa"];
        //    tempCurBuyerList5.Value = "4";
        //    tempCurBuyerList5.Expires = DateTime.Now.AddDays(1);
        //    Response.AppendCookie(addToCookies);
        // */



        /// <summary>
        /// 添加cookie（不覆盖原有的cookie，即如果添加的cookie已经存在，则添加无效，cookie仍然是原来的cookie）
        /// </summary>
        /// <param name="name"></param>
        /// <param name="value"></param>
        /// <param name="overDays">过期时间以天为单位</param>
        /// <param name="path"></param>
        /// <param name="domain"></param>
        public static void AddCookie(string name, string value, int overDays = 1, string path = "/", string domain = "")
        {
            HttpCookie addToCookies = new HttpCookie(name);//初使化并设置Cookie的名称　　　　
            HttpResponse Response = HttpContext.Current.Response;
            addToCookies.Value = value;
            if (overDays != 0)  //用使cookie关闭浏览器后失效，即令overDays=0，这样就不指定过期时间，默认为关闭浏览器后失效
            {
                addToCookies.Expires = DateTime.Now.AddDays(overDays);
            }
            //addToCookies.Path = path;
            //addToCookies.Domain = domain;
            Response.Cookies.Add(addToCookies);
        }
        /// <summary>
        /// 添加cookie（覆盖原有的cookie）
        /// </summary>
        /// <param name="name"></param>
        /// <param name="value"></param>
        /// <param name="overDays">过期时间以天为单位</param>
        /// <param name="path"></param>
        /// <param name="domain"></param>
        public static void AddCookieByCover(string name, string value, int overDays = 1, string path = "/", string domain = "")
        {
            HttpRequest Request = HttpContext.Current.Request;
            HttpResponse Response = HttpContext.Current.Response;

            HttpCookie addToCookies = null;
            if (Request.Cookies[name] == null)  //如果不存在，则添加
            {
                addToCookies = new HttpCookie(name);//初使化并设置Cookie的名称　　　　
                addToCookies.Value = value;
                if (overDays != 0)
                {
                    addToCookies.Expires = DateTime.Now.AddDays(overDays);
                }

                /*去掉这两项，否则在Linux下，添加不起cookie！！！！*/
                //addToCookies.Path = path; 
                //addToCookies.Domain = domain;
                Response.Cookies.Add(addToCookies);
            }
            else    //否则覆盖
            {
                addToCookies = Request.Cookies[name];
                addToCookies.Value = value;
                if (overDays != 0)
                {
                    addToCookies.Expires = DateTime.Now.AddDays(overDays);
                }
                //addToCookies.Path = path;
                //addToCookies.Domain = domain;
                Response.Cookies.Add(addToCookies);
            }
        }
        /// <summary>
        /// 读取cookie的value
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public static string GetCookie(string name)
        {
            HttpRequest Request = HttpContext.Current.Request;
            if (Request.Cookies[name] != null)
            {
                return Request.Cookies[name].Value;
            }
            else
            {
                return null;
            }
        }
        /// <summary>
        /// 修改cookie
        /// </summary>
        /// <param name="name"></param>
        /// <param name="value"></param>
        public static void EditCookie(string name, string value)
        {
            HttpRequest Request = HttpContext.Current.Request;
            HttpCookie cok = Request.Cookies[name];
            if (cok != null)
            {
                cok.Values.Set(name, value);
            }
            //else
            //{
            //    throw new Exception("cookie is null");
            //}
        }
        /// <summary>
        /// 删除单个cookie
        /// </summary>
        /// <param name="name"></param>
        public static void DeleteCookie(string name)
        {
            HttpRequest Request = HttpContext.Current.Request;
            HttpResponse Response = HttpContext.Current.Response;
            HttpCookie cok = Request.Cookies[name];
            if (cok != null)
            {
                cok.Expires = DateTime.Now.AddDays(-1);//删除指定的Cookie，只要把过期时间设置为现在以前
                Response.AppendCookie(cok); //等同于Response.Cookies.Add(cok)
            }
            else     //为空则不用操作
            {
            }
        }
        /// <summary>
        /// 删除数组中的cookie（数组为待删除的cookie名称的集合）
        /// </summary>
        /// <param name="name"></param>
        public static void DeleteCookie(params string[] name)
        {
            HttpRequest Request = HttpContext.Current.Request;
            HttpResponse Response = HttpContext.Current.Response;
            HttpCookie cok = null;
            foreach (var item in name)
            {
                cok = Request.Cookies[item];
                if (cok != null)
                {
                    cok.Expires = DateTime.Now.AddDays(-1);//删除指定的Cookie，只要把过期时间设置为现在以前
                    Response.AppendCookie(cok); //等同于Response.Cookies.Add(cok)
                }
                else    //为空则不用操作
                {
                }
            }
        }
    }
}
