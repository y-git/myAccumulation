using System.Collections.Generic;
using System.Linq;
using System;
using System.Web;
using System.Web.Mvc;

namespace BLL
{
    public static class MyExtendList
    {
        //private static int size = 0;
        //private static int totalsize = 0;
        public static IList<T> Paging<T>(this IEnumerable<T> list, int index, int pageSize)
        {
            int pageCount = 0;
            if (list != null)
            {
                pageCount = list.Count();
            }
            else
            {
                pageCount = 0;
            }
            //StoreSize.Total = pageCount;
            //StoreSize.PageNumber = index + 1;
            //StoreSize.PageSize = pageSize;

            //MyCookie.AddCookieByCover("XingKeDa_Total", Convert.ToString(pageCount), 0);
            //MyCookie.AddCookieByCover("XingKeDa_PageNumber", Convert.ToString(index + 1), 0);
            //MyCookie.AddCookieByCover("XingKeDa_PageSize", Convert.ToString(pageSize), 0);

            //存到session里面
            HttpContext.Current.Session["Total"] = pageCount;


            if (pageSize > 0)
            {
                //pageCount = (int)Math.Ceiling(pageCount / (double)pageSize);
                HttpContext.Current.Session["PageCount"] = (int)Math.Ceiling(pageCount / (double)pageSize);
                //MyCookie.AddCookieByCover("XingKeDa_PageCount", Convert.ToString((int)Math.Ceiling(pageCount / (double)pageSize)), 0);
            }
            else
            {
                //pageCount = 0;
                HttpContext.Current.Session["PageCount"] = 0;
                //StoreSize.PageCount = 0;
                //MyCookie.AddCookieByCover("XingKeDa_PageCount", "0", 0);
            }
            //IList<T> myList = new List<T>();
            //if (index <= 0 || index > pageCount - 1)

            if (index <= 0) //首页
            {
                return list.Take(pageSize).ToList();
            }
            else
            {
                return list.Skip((index) * pageSize).Take(pageSize).ToList();
            }
        }


        public static bool IsEmpty<T>(this IEnumerable<T> source)
        {
            return !source.Any();
        }
        public static bool IsNotEmpty<T>(this IEnumerable<T> source)
        {
            return source.Any();
        }





        //public static IList<int> Get<T>(this IEnumerable<T> list, int index)
        //{
        //    IList<int> myList = new List<int>();
        //    int pageNumber = 0;
        //    int pageCount = 0;
        //    //int total = 0;
        //    //total = list.Count();
        //    pageNumber = index + 1;
        //    if (totalsize > 0)
        //    {
        //        if (size == 0)
        //        {
        //            throw new Exception("分页出错！List集合扩展出错！");
        //        }
        //        pageCount = (int)Math.Ceiling(totalsize / (double)size);
        //    }
        //    else
        //    {
        //        pageCount = 0;
        //    }
        //    totalsize = 0;
        //    size = 0;
        //    myList.Add(pageNumber);
        //    myList.Add(pageCount);
        //    return myList;
        //}
    }
}
