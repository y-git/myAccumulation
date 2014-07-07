using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace Help
{
    public static class Substring
    {
        private static string _str;
        public static string NewSubstring(string str, int len)
        {
            string replace = @"<[^>]+>";    //去掉<>中的内容
            var re = new Regex(@replace, RegexOptions.IgnoreCase);
            _str = re.Replace(str, string.Empty);   
            //_str = str;
            if (_str != null)
            {
                if (_str.Length > len)
                {
                    _str = _str.Substring(0, len) + "...";
                }
                else
                {
                    return _str;
                }
            }
            else
            {
                _str = "标题为空";
            }

            return _str;
        }
    }
}
