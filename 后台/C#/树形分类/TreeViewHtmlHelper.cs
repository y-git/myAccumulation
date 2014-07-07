using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Text;

namespace Help
{
    public static class TreeViewHtmlHelper
    {
        public static string TreeView<T>(this HtmlHelper html, string treeId, IEnumerable<T> rootItems, Func<T, IEnumerable<T>> childrenProperty, Func<T, bool> isLast, Func<T, string> itemContent, Func<T, string> lastContent, Func<T, string> DeleteContent)
        {
            return html.TreeView(treeId, rootItems, childrenProperty,isLast,itemContent,lastContent,DeleteContent, true , null);
        }
        public static string TreeView<T>(this HtmlHelper html, string treeId, IEnumerable<T> rootItems, Func<T, IEnumerable<T>> childrenProperty, Func<T, bool> isLast, Func<T, string> itemContent, Func<T, string> lastContent, Func<T, string> DeleteContent, bool includeJavaScript)
        {
            return html.TreeView(treeId, rootItems, childrenProperty,isLast, itemContent,lastContent,DeleteContent, includeJavaScript, null);
        }

        public static string TreeView<T>(this HtmlHelper html, string treeId, IEnumerable<T> rootItems, Func<T, IEnumerable<T>> childrenProperty, Func<T,bool> isLast, Func<T, string> itemContent,Func<T,string> lastContent, Func<T, string> DeleteContent, bool includeJavaScript, string emptyContent)
        {
            StringBuilder sb = new StringBuilder();
            if (includeJavaScript)
            {
                sb.AppendFormat(@"<script type='text/javascript'>  
                    $(document).ready(function() {{  
                       $('#{0}').treeview({{ collapsed: true,unique: true }});  
                     }});  
                 </script>", treeId);
            }
            sb.AppendFormat("<ul id='{0}' class='filetree'>\r\n", treeId);
            if (rootItems.Count() == 0)
            {
                sb.AppendFormat("<li>{0}</li>", emptyContent);
            }            
            foreach (T item in rootItems)
            {
                RenderLi(sb, item, childrenProperty, isLast, itemContent, lastContent, DeleteContent);
                AppendChildren(sb, item, childrenProperty, isLast, itemContent, lastContent, DeleteContent);
            }
            sb.AppendLine("</ul>");   
            return sb.ToString();
        }
        private static void AppendChildren<T>(StringBuilder sb, T root, Func<T, IEnumerable<T>> childrenProperty, Func<T, bool> isLast, Func<T, string> itemContent, Func<T, string> lastContent, Func<T, string> DeleteContent)
        {
            var children = childrenProperty(root);
            if (children.Count() == 0)
            {
                sb.AppendLine("</li>");
                return;
            }
            sb.AppendLine("\r\n<ul>");
            foreach (T item in children)
            {
                RenderLi(sb, item, childrenProperty, isLast, itemContent, lastContent, DeleteContent);
                AppendChildren(sb, item, childrenProperty, isLast, itemContent, lastContent, DeleteContent);
            }
            sb.AppendLine("</ul></li>");
        }
        private static void RenderLi<T>(StringBuilder sb, T item, Func<T, IEnumerable<T>> childrenProperty, Func<T, bool> isLast, Func<T, string> itemContent, Func<T, string> lastContent, Func<T, string> DeleteContent)
        {
            var last = isLast(item);
            var children = childrenProperty(item);
            
            if (last==true)
            {
                sb.AppendFormat("<li><span class='file'>{0}", lastContent(item));
            }
            else
            {
                if (children.Count() == 0)
                {
                    sb.AppendFormat("<li><span class='folder'>{0}", DeleteContent(item));
                }
                else
                {
                    sb.AppendFormat("<li><span class='folder'>{0}", itemContent(item));
                }
            }
        }
    } 
}