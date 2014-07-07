using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Configuration;
using System.Web;
namespace Help
{
    /// <summary>
    /// 9-18
    /// </summary>
    public static class Base64
    {
        /// <summary>
        /// Base64编码（utf-8）
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string Encode(string str)
        {
            byte[] bytes = Encoding.UTF8.GetBytes(str);   //如果用Encoding.Default.GetBytes(str)，中文会乱码！
            return Convert.ToBase64String(bytes);
        }
        /// <summary>
        /// Base64解码(utf-8)
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string Decode(string str)
        {
            byte[] outputb = Convert.FromBase64String(str);
            return Encoding.UTF8.GetString(outputb);    //如果用Encoding.Default.GetBytes(str)，中文会乱码！
        }
    }
}
