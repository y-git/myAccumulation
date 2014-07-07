using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using System.Text.RegularExpressions;

namespace Help
{
    /// <summary>
    /// 基础正则操作的封装
    /// </summary>
    public static class RegexOperate
    {
        #region 查找
        #endregion
        #region 判断
        /// <summary>
        /// 判断source中是否匹配match_str
        /// </summary>
        /// <param name="source"></param>
        /// <param name="match_str"></param>
        /// <returns></returns>
        public static bool Judge(string source, string match_str, RegexOptions option)
        {
            Regex regex = null;
            regex = new Regex(@match_str, option);
            return regex.IsMatch(source);
        }
        public static bool Judge(string source, string match_str)
        {
            Regex regex = null;
            regex = new Regex(@match_str);
            return regex.IsMatch(source);
        }
        #endregion
        #region 替换
        /// <summary>
        /// 将input_str中的match_str（可以为正则表达式）全部替换为replaceMent
        /// </summary>
        /// <param name="input_str"></param>
        /// <param name="match_str"></param>
        /// <param name="replaceMent"></param>
        /// <returns></returns>
        public static string Replace(string input_str, string match_str, string replaceMent, RegexOptions option)
        {
            var regex = new Regex(@match_str, option);
            return regex.Replace(input_str, replaceMent);
        }

        public static string Replace(string input_str, string match_str, string replaceMent)
        {
            RegexOptions option = RegexOptions.IgnoreCase;
            var regex = new Regex(@match_str, option);
            return regex.Replace(input_str, replaceMent);
        }

        /// <summary>
        /// 将input_str中第index个match_str（可以为正则表达式）开始替换为replaceMent(替换count次)
        /// </summary>
        /// <param name="input_str"></param>
        /// <param name="match_str"></param>
        /// <param name="replaceMent"></param>
        /// <returns></returns>
        public static string Replace(string input_str, string match_str, string replaceMent, int index, int count, RegexOptions option)
        {
            var regex = new Regex(@match_str, option);
            return regex.Replace(input_str, replaceMent, count, index);
        }
        #endregion
    }
}
