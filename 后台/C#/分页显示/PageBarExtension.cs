using System.Text;
using System.Text.RegularExpressions;
//using InfoPlatform;
using System.Collections.Generic;
//using BLL;

namespace System.Web.Mvc
{
    public static class PageBarExtension
    {
        private static string Return_Sb(StringBuilder sb, int total_num)
        {
            //if (total_num == 0)
            //{
                //sb.Append("<span class=''>共0条</span>");
                //return sb.ToString();
            //}
            //else
            //{
                //sb.AppendFormat("<span class=''>共{0}条 每页显示{1}条 当前第{2}/{3}页</span>", total_num, pageSize, page, total);
                sb.AppendFormat("<span class=''>共{0}条</span>", total_num);
                return sb.ToString();
            //}
        }


        public static string PagerBar(this HtmlHelper html)
        {
            int pageNumber = Convert.ToInt32(HttpContext.Current.Request["p"] == null ? "1" : HttpContext.Current.Request["p"]);
            int pageCount = Convert.ToInt32(HttpContext.Current.Session["pageCount"]);
            int total_num = Convert.ToInt32(HttpContext.Current.Session["total"]);

            return BuiderBar(html, pageNumber, pageCount, Help.Config.PageSize, total_num, 9); //pageSize为Help.Config.PageSize，show为9
        }
        public static string PagerBar(this HtmlHelper html, int show)
        {
            int pageNumber = Convert.ToInt32(HttpContext.Current.Request["p"] == null ? "1" : HttpContext.Current.Request["p"]);
            int pageCount = Convert.ToInt32(HttpContext.Current.Session["pageCount"]);
            int total_num = Convert.ToInt32(HttpContext.Current.Session["total"]);

            return BuiderBar(html, pageNumber, pageCount, Help.Config.PageSize, total_num, show); //pageSize为Help.Config.PageSize，分页按钮一次显示show+1页
        }
        public static string PagerBar(this HtmlHelper html, int show, int pageSize)
        {
            int pageNumber = Convert.ToInt32(HttpContext.Current.Request["p"] == null ? "1" : HttpContext.Current.Request["p"]);
            int pageCount = Convert.ToInt32(HttpContext.Current.Session["pageCount"]);
            int total_num = Convert.ToInt32(HttpContext.Current.Session["total"]);

            return BuiderBar(html, pageNumber, pageCount, pageSize, total_num, show); //分页按钮一次显示show+1页
        }

        private static string BuiderBar(HtmlHelper html, int page, int total, int pageSize, int total_num, int show)
        {
            var sb = new StringBuilder();
            var path = html.ViewContext.HttpContext.Request.Path;
            sb.Append("<div class=\"");
            //sb.Append(style.ToString());
            sb.Append("page_nav\" >");
            if (total <= 1)
            {
                return Return_Sb(sb, total_num);
            }
            //var queryString = html.ViewContext.HttpContext.Request.ToString();
            //if (queryString.IndexOf("p=") < 0)
            //{
            //    queryString += "&p=" + page;
            //}
            //var re = new Regex(@"p=\d+", RegexOptions.IgnoreCase);
            //var result = re.Replace(queryString, "p={0}");

            if (page != 1)
            {
                sb.AppendFormat("<a  title=\"首页\" onclick='getContentTab({0},{1})'>{2}</a>", 1, pageSize, "首页");
                sb.AppendFormat("<a  title=\"上一页\" onclick='getContentTab({0},{1})'>{2}</a>", page - 1, pageSize, "上一页");
            }
            if (page > (show + 1))
            {
                sb.AppendFormat("<a  title=\"前" + (show + 1) + "页\" onclick='getContentTab({0},{1})'>{2}</a>", page - (show + 1), pageSize, "..");
            }
            for (var i = page - show; i <= page + show; i++)
            {
                if (i == page)
                {
                    sb.AppendFormat("<a class='current'>{0}</a>", i);
                }
                else
                {
                    if (i > 0 & i <= total)
                    {
                        sb.AppendFormat("<a onclick='getContentTab({0},{1})'>{2}</a>", i, pageSize, i);
                    }
                }
            }
            if (page < (total - show))
            {
                sb.AppendFormat("<a  title=\"后" + (show + 1) + "页\" onclick='getContentTab({0},{1})'>{2}</a>", page + (show + 1), pageSize, "..");
            }
            if (page < total)
            {
                sb.AppendFormat("<a  title=\"下一页\" onclick='getContentTab({0},{1})'>{2}</a>", page + 1, pageSize, "下一页");
                sb.AppendFormat("<a  title=\"尾页\" onclick='getContentTab({0},{1})'>{2}</a>", total, pageSize, "尾页");
            }
            //sb.AppendFormat("<span class=''>  当前第{0}页  共{1}页</span>", page, total);
            sb.AppendFormat("<span class=''> 共{0}条 每页显示{1}条 当前第{2}/{3}页</span>", total_num, pageSize, page, total);

            sb.AppendFormat("<span>&nbsp;&nbsp;跳转到&nbsp;</span><input type='text' id='page_jumpid' size='6' maxlength='10'/>&nbsp;<input type='button' id='jumpid' value='跳转' "
                + "onclick='page.jump({0}, {1}, {2});'/>", page, pageSize, total);
            sb.Append("</div>");
            return sb.ToString();
        }

        public static string PagerBar(this HtmlHelper html, string str, int show)
        {
            int pageNumber = Convert.ToInt32(HttpContext.Current.Request["p"] == null ? "1" : HttpContext.Current.Request["p"]);
            int pageCount = Convert.ToInt32(HttpContext.Current.Session["pageCount"]);
            int total_num = Convert.ToInt32(HttpContext.Current.Session["total"]);

            return BuiderBar(html, str, pageNumber, pageCount, Help.Config.PageSize, total_num, show); //分页按钮一次显示show+1页
        }
        public static string PagerBar(this HtmlHelper html, string str, int show, int pageSize)
        {
            int pageNumber = Convert.ToInt32(HttpContext.Current.Request["p"] == null ? "1" : HttpContext.Current.Request["p"]);
            int pageCount = Convert.ToInt32(HttpContext.Current.Session["pageCount"]);
            int total_num = Convert.ToInt32(HttpContext.Current.Session["total"]);

            return BuiderBar(html, str, pageNumber, pageCount, pageSize, total_num, show); //分页按钮一次显示show+1页
        }

        private static string BuiderBar(HtmlHelper html, string str, int page, int total, int pageSize, int total_num, int show)
        {
            var sb = new StringBuilder();
            var path = html.ViewContext.HttpContext.Request.Path;
            sb.Append("<div class=\"");
            //sb.Append(style.ToString());
            sb.Append("page_nav\" >");
            if (total <= 1)
            {
                return Return_Sb(sb, total_num);
            }
            //var queryString = html.ViewContext.HttpContext.Request.ToString();
            //if (queryString.IndexOf("p=") < 0)
            //{
            //    queryString += "&p=" + page;
            //}
            //var re = new Regex(@"p=\d+", RegexOptions.IgnoreCase);
            //var result = re.Replace(queryString, "p={0}");

            if (page != 1)
            {
                sb.AppendFormat("<a  title=\"首页\" onclick='getContentTab(\"{0}\", {1},{2})'>{3}</a>", str, 1, pageSize, "首页");
                sb.AppendFormat("<a  title=\"上一页\" onclick='getContentTab(\"{0}\", {1},{2})'>{3}</a>", str, page - 1, pageSize, "上一页");
            }
            if (page > (show + 1))
            {
                sb.AppendFormat("<a  title=\"前" + (show + 1) + "页\" onclick='getContentTab(\"{0}\",{1}, {2})'>{3}</a>", str, page - (show + 1), pageSize, "..");
            }
            for (var i = page - show; i <= page + show; i++)
            {
                if (i == page)
                {
                    sb.AppendFormat("<a class='current'>{0}</a>", i);
                }
                else
                {
                    if (i > 0 & i <= total)
                    {
                        sb.AppendFormat("<a  onclick='getContentTab(\"{0}\",{1}, {2})'>{3}</a>", str, i, pageSize, i);
                    }
                }
            }
            if (page < (total - (show)))
            {
                sb.AppendFormat("<a  title=\"后" + (show + 1) + "页\" onclick='getContentTab(\"{0}\",{1}, {2})'>{3}</a>", str, page + (show + 1), pageSize, "..");
            }
            if (page < total)
            {
                sb.AppendFormat("<a  title=\"下一页\" onclick='getContentTab(\"{0}\",{1}, {2})'>{3}</a>", str, page + 1, pageSize, "下一页");
                sb.AppendFormat("<a  title=\"尾页\" onclick='getContentTab(\"{0}\",{1}, {2})'>{3}</a>", str, total, pageSize, "尾页");
            }
            //sb.AppendFormat("<span class=''>  当前第{0}页  共{1}页</span>", page, total);
            sb.AppendFormat("<span class=''> 共{0}条 每页显示{1}条 当前第{2}/{3}页</span>", total_num, pageSize, page, total);

            sb.AppendFormat("<span>&nbsp;&nbsp;跳转到&nbsp;</span><input type='text' id='page_jumpid' size='6' maxlength='10'/>&nbsp;<input type='button' id='jumpid' value='跳转' "
                + "onclick='page.jump(\"{0}\", {1}, {2}, {3});'/>", str, page, pageSize, total);
            sb.Append("</div>");
            return sb.ToString();
        }
    }
}