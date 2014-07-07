using System;
using System.Xml.Linq;
using System.Xml.XPath;
using System.Linq;
using System.Web;
namespace Help
{
    /// <summary>
    /// 8-30
    /// </summary>
    public class ArrayOperate
    {
        #region 基本操作

        #endregion
        #region 二维数组操作
        /// <summary>
        /// 获得行数。如二维数组{ {1, 2}, {3, 4}, {5, 6}}，则行数为3  
        /// </summary>
        /// <param name="array"></param>
        /// <returns></returns>
        public int GetRowLength(object[,] array)
        {
            return array.GetLength(0);
        }
        /// <summary>
        /// 获得列数。如二维数组{ {1, 2}, {3, 4}, {5, 6}}，则列数为2 
        /// </summary>
        /// <param name="array"></param>
        /// <returns></returns>
        public int GetColumnLength(object[,] array)
        {
            return array.GetLength(1);
        }
        #endregion
    }
}
