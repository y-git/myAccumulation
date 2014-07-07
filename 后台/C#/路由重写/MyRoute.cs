using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;//需要添加引用，请使用3.0以上版本 
using System.Web.Routing;
using System.Configuration;
using System.Text.RegularExpressions;
namespace BLL
{
    public class CategoryUrlProvider : RouteBase
    {
        public override RouteData GetRouteData(System.Web.HttpContextBase httpContext)
        {
            //if (httpContext.Request.IsAjaxRequest())
            //{
            //    string url1 = httpContext.Request.RawUrl;
            //    throw new Exception(url1);
            //}


            //string r = ConfigurationManager.AppSettings["Url"];
            //var match = @"\/[^\/|\?]+"; //匹配控制器和方法
            //var re = new Regex(match, RegexOptions.IgnoreCase);
            ////if (!re.IsMatch(url))   //如果没有匹配项，则返回使用默认路由。比如本地初始网站时，url="/"，此时就使用默认路由
            ////{
            ////    throw new Exception("url="+ url);
            ////    return null;
            ////}
            //var kk = re.Matches(url);
            //if (kk.Count == 1) //如果没有匹配项，则返回使用默认路由。比如发布后初始网站时，url="/XingKeDaTest"，此时就使用默认路由
            //{
            //    return null;
            //}
            //else
            //{
            //    if (kk[0].Value.Substring(1) == r && kk.Count == 2)
            //    {
            //        var data = new RouteData(this, new MvcRouteHandler());//声明一个RouteData，添加相应的路由值
            //        data.Values.Add("controller", kk[1].Value.Substring(1));
            //        data.Values.Add("action", "Index");
            //        data.Values.Add("id", UrlParameter.Optional);
            //        return data;
            //    }
            //    else
            //    {
            //        var str = "url=" + url + "kk = " + kk[0].Value + "|" + kk[1].Value;
            //        throw new Exception(str);
            //    }
            //}

            //if (httpContext.Request.IsAjaxRequest())
            //{
            //    throw new Exception();
            //}
            //else
            //{
                string url = httpContext.Request.RawUrl;
                var r = ConfigurationManager.AppSettings["Url"];
                var match = @"\/[^\/|\?]+"; //匹配控制器和方法
                var re = new Regex(match, RegexOptions.IgnoreCase);
                var kk = re.Matches(url);
                if (!re.IsMatch(url))   //如果没有匹配项，则返回使用默认路由。比如本地初始网站时，url="/"，此时就使用默认路由
                {
                    //throw new Exception("url=" + url);
                    return null;
                }

                if (kk.Count == 1) //如果没有匹配项，则返回使用默认路由。比如发布后初始网站时，url="/XingKeDaTest"，此时就使用默认路由
                {
                    return null;
                }
                else if (kk[0].Value.Substring(1) == r)  //如果已经加了发布后的路径（如"/TestPage1"）
                {
                    //throw new Exception();
                    if (kk.Count == 2)  //如果为二级页面首页
                    {
                        var data = new RouteData(this, new MvcRouteHandler());//声明一个RouteData，添加相应的路由值
                        data.Values.Add("controller", kk[1].Value.Substring(1));
                        data.Values.Add("action", "Index");
                        data.Values.Add("id", UrlParameter.Optional);
                        return data;
                    }
                    else
                    {
                        //throw new Exception();
                        var data = new RouteData(this, new MvcRouteHandler());//声明一个RouteData，添加相应的路由值
                        data.Values.Add("controller", kk[1].Value.Substring(1));
                        data.Values.Add("action", kk[2].Value.Substring(1));
                        data.Values.Add("id", UrlParameter.Optional);
                        return data;
                    }
                }
                else if (kk.Count > 3)
                {
                    throw new Exception("url路径错误！");
                }
                else
                {
                    //throw new Exception("url路径错误！");
                    return null;
                }
            //}
            //else //否则，url为本地路径，要匹配到对应的控制器和方法(这样发布后路径才不会出错)
            //{
            //    var a = kk[0].Value;
            //    var b = kk[1].Value;
            //    var data = new RouteData(this, new MvcRouteHandler());//声明一个RouteData，添加相应的路由值
            //    data.Values.Add("controller", kk[0].Value.Substring(1));
            //    data.Values.Add("action", kk[1].Value.Substring(1));
            //    data.Values.Add("id", UrlParameter.Optional);
            //    return data;
            //}



            //if (kk[0].Value == r)  //如果已经加了发布后的路径（如"/TestPage1"），则不处理，进行下一个匹配
            //{
            //    throw new Exception(kk[0].Value + "|" + kk[1].Value + "|" + kk[2].Value);
            //    //var data = new RouteData(this, new MvcRouteHandler());//声明一个RouteData，添加相应的路由值
            //    //data.Values.Add("controller", kk[1].Value.Substring(1));
            //    //data.Values.Add("action", kk[2].Value.Substring(1));
            //    //data.Values.Add("id", UrlParameter.Optional);
            //    //return data;
            //    //return null;
            //}
            //else if (kk.Count == 1) //如果没有匹配项，则返回使用默认路由。比如发布后初始网站时，url="/XingKeDaTest"，此时就使用默认路由
            //{
            //    //throw new Exception(kk[0].Value + "|" + kk[1].Value + "|" + kk[2].Value);
            //    //throw new Exception("kk count = 1" + "value="+kk[0].Value);
            //    return null;
            //}
            ////else if (kk.Count > 2)
            ////{
            ////    throw new Exception("url路径错误！");
            ////}
            //else //否则，url为本地路径，要匹配到对应的控制器和方法(这样发布后路径才不会出错)
            //{
            //    //if (kk[0].Value == "SupportInfo" || kk[1].Value == "SupportInfo")
            //    //{
            //        throw new Exception(kk[0].Value + "|" + kk[1].Value + "|" + kk[2].Value);
            //    //}
            //    //var a = kk[0].Value;
            //    //var b = kk[1].Value;
            //    //var data = new RouteData(this, new MvcRouteHandler());//声明一个RouteData，添加相应的路由值
            //    //data.Values.Add("controller", kk[0].Value.Substring(1));
            //    //data.Values.Add("action", kk[1].Value.Substring(1));
            //    //data.Values.Add("id", UrlParameter.Optional);
            //    //return data;
            //}
        }

        public override VirtualPathData GetVirtualPath(RequestContext requestContext, RouteValueDictionary values)
        {
            return null;
        }
    }
}













//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Web.Mvc;//需要添加引用，请使用3.0以上版本 
//using System.Web.Routing;
////using JohnConnor.Models;
////using System.Configuration;
//using System.Text.RegularExpressions;
//namespace BLL
//{
//    public class CategoryUrlProvider : RouteBase
//    {
//        public override RouteData GetRouteData(System.Web.HttpContextBase httpContext)
//        {
//            if (httpContext.Request.IsAjaxRequest())
//            {
//                //ConfigurationManager
//                string url = httpContext.Request.RawUrl;
//                //var url_2 = httpContext.Request.Url;
//                //var t = 1;
//                var r = "";
//                //var r = ConfigurationManager.AppSettings["Url"]; ;
//                var m = "Test";
//                //var match = @"^\/" + m;
//                //var match = @"^\/" + r;
//                var match = @"\/[^\/|\?]+";
//                var _match = @"\?.+";
//                var _re = new Regex(_match, RegexOptions.IgnoreCase);
//                var result = _re.Match(url);
//                string[] stringSeparators = new string[] { "&" };

//                var query = result.Value.Split(stringSeparators, StringSplitOptions.RemoveEmptyEntries);

//                //string replaceformat = "<span style=\"color:red\">{0}</span>";
//                var re = new Regex(match, RegexOptions.IgnoreCase);
//                //var t = re.Replace(url, "aaa");
//                //if (re.IsMatch(url))
//                var kk = re.Matches(url);
//                if (re.Matches(url)[0].Value == r)  //如果已经加了发布后的路径（如"/TestPage1"），则不处理，进行下一个匹配
//                {
//                    return null;
//                }
//                else //否则，url为本地路径，要匹配到对应的控制器和方法(这样发布后路径才不会出错)
//                {
//                    var data = new RouteData(this, new MvcRouteHandler());//声明一个RouteData，添加相应的路由值
//                    var ll = UrlParameter.Optional; //可以获得参数
//                    //                    data.Values.Add("controller", re.Matches(url)[0].Value.Substring(1));
//                    //                    data.Values.Add("action", re.Matches(url)[1].Value.Substring(1));
//                    //data.Values.Add("id", ll);
//                    data.Values.Add("controller", "Test");
//                    data.Values.Add("action", "GetContent");
//                    //data.Values.Add("id", ll);
//                    return data;
//                    //data.Values.Add("controller", "Home");
//                    //data.Values.Add("action", "GetContent");
//                    //data.Values.Add("id", ll);
//                    //return data;
//                    //data.Values.Add("id", category.CategoeyID);
//                }
//                //return re.Replace(input, string.Format(replaceformat, replace));    //此处替换了多次，如何才能只替换第一个匹配的string？
//                //else
//                //{
//                //    return null;//断点1
//                //}
//            }
//            else
//            {
//                return null;
//            }
//        }

//        public override VirtualPathData GetVirtualPath(RequestContext requestContext, RouteValueDictionary values)
//        {
//            //return null;//断点2
//            var _control = values["controller"];
//            var _action = values["action"];
//            var _id = values["id"];
//            //return new VirtualPathData(this, values);
//            return null;
//        }
//    }
//}
















//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Web.Mvc;//需要添加引用，请使用3.0以上版本 
//using System.Web.Routing;
////using JohnConnor.Models;
//using System.Configuration;
//using System.Text.RegularExpressions;
//namespace BLL
//{
//    public class CategoryUrlProvider : RouteBase
//    {
//        public override RouteData GetRouteData(System.Web.HttpContextBase httpContext)
//        {
//            if (httpContext.Request.IsAjaxRequest())
//            {
//                var data = new RouteData(this, new MvcRouteHandler());//声明一个RouteData，添加相应的路由值
//                data.Values.Add("controller", "Home");
//                data.Values.Add("action", "Index");
//                return data;
//            }

//                //var str = "/TestPage1/Test/Index";
//                //BLL.Store.url = httpContext.Request.RawUrl + "|" + httpContext.Request.Url;

//                //string url = httpContext.Request.RawUrl;
//                //var match = @"\/[^(\/)|(\?)]+";
//                //var re = new Regex(match, RegexOptions.IgnoreCase);
//                ////for (var i = 0; i < re.Matches(url).Count; i++)
//                ////{
//                ////    BLL.Store.match_0 += re.Matches(url) + "*********";
//                ////}
//                //foreach (Match item in re.Matches(url))
//                //{
//                //    BLL.Store.match_0 += item.Value + "*********";
//                //}

//                //BLL.Store.match_0 = re.Matches(url)[0].Value;
//                //BLL.Store.match_1 = re.Matches(url)[1].Value;
//                //BLL.Store.match_2 = re.Matches(url)[2].Value;
            
//            //}
//            //    //ConfigurationManager
//            //    string url = httpContext.Request.RawUrl;
//            //    //var url_2 = httpContext.Request.Url;
//            //    //var t = 1;
//            //    var r = ConfigurationManager.AppSettings["Url"];;
//            //    var m = "Test";
//            //    //var match = @"^\/" + m;
//            //    //var match = @"^\/" + r;
//            //    var match = @"\/[^\/|\?]+";
//            //    var _match = @"\?.+";
//            //    var _re = new Regex(_match, RegexOptions.IgnoreCase);
//            //    var result = _re.Match(url);
//            //    string[] stringSeparators = new string[] { "&" };

//            //    var query = result.Value.Split(stringSeparators, StringSplitOptions.RemoveEmptyEntries);

//            //    //string replaceformat = "<span style=\"color:red\">{0}</span>";
//            //    var re = new Regex(match, RegexOptions.IgnoreCase);
//            //    //var t = re.Replace(url, "aaa");
//            //    //if (re.IsMatch(url))
//            //    var kk = re.Matches(url);
//            //    if (re.Matches(url)[0].Value == r)  //如果已经加了发布后的路径（如"/TestPage1"），则不处理，进行下一个匹配
//            //    {
//            //        return null;
//            //    }
//            //    else //否则，url为本地路径，要匹配到对应的控制器和方法(这样发布后路径才不会出错)
//            //    {
//            //        var data = new RouteData(this, new MvcRouteHandler());//声明一个RouteData，添加相应的路由值
//            //        var ll = UrlParameter.Optional; //可以获得参数
//            //        //                    data.Values.Add("controller", re.Matches(url)[0].Value.Substring(1));
//            //        //                    data.Values.Add("action", re.Matches(url)[1].Value.Substring(1));
//            //        //data.Values.Add("id", ll);
//            //        data.Values.Add("controller", "Test");
//            //        data.Values.Add("action", "GetContent");
//            //        //data.Values.Add("id", ll);
//            //        return data;
//            //        //data.Values.Add("controller", "Home");
//            //        //data.Values.Add("action", "GetContent");
//            //        //data.Values.Add("id", ll);
//            //        //return data;
//            //        //data.Values.Add("id", category.CategoeyID);
//            //    }
//            //    //return re.Replace(input, string.Format(replaceformat, replace));    //此处替换了多次，如何才能只替换第一个匹配的string？
//            //    //else
//            //    //{
//            //    //    return null;//断点1
//            //    //}
//            //}
//            //else
//            //{
//            //    return null;
//            //}
//            if (httpContext.Request.RawUrl.Contains("z"))   //如果为GetVirtualPath构建的虚拟url(zzzzzzzzzzz)
//            {
//                var _data = new RouteData(this, new MvcRouteHandler());//声明一个RouteData，添加相应的路由值
//                _data.Values.Add("controller", "Test");
//                _data.Values.Add("action", "Index");
//                return _data;
//            }
//            return null;

//        }

//        public override VirtualPathData GetVirtualPath(RequestContext requestContext, RouteValueDictionary values)
//        {
//            //return null;//断点2
//            var _control = values["controller"];
//            var _action = values["action"];
//            var _id = values["id"];
//            return new VirtualPathData(this, "zzzzzzzzzzz");
//            //return null;
//        }
//    }
//}
