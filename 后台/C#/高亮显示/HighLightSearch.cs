using System;
using System.Xml.Linq;
using System.Xml.XPath;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Collections.Generic;
namespace Help
{
    public class HighLightSearch
    {
        public static string Reg(string input, string replace)
        {
            //设置高亮样式
            string replaceformat = "<span style=\"color:red\">{0}</span>";
            var re = new Regex(@replace, RegexOptions.IgnoreCase);
            return re.Replace(input, string.Format(replaceformat, replace));    //此处替换了多次，如何才能只替换第一个匹配的string？
        }

        public static string HighLight(string Key, string Contents)
        {
            return Reg(Contents, Key);
        }
    }
}
