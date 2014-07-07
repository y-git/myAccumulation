using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Threading;

namespace Help
{
    public class SetItem
    {
        public void Set()
        {
            Database.DataClassesDataContext da = null;

            if (HttpContext.Current.Items[Thread.CurrentContext.ContextID.ToString() + HttpContext.Current.Timestamp.ToString()] == null)
            {
                //AppDomain.GetCurrentThreadId();
                da = new Database.DataClassesDataContext();
                HttpContext.Current.Items[Thread.CurrentContext.ContextID.ToString() + HttpContext.Current.Timestamp.ToString()] = da;
            }
            else
            {
                //    da = new Database.DataClassesDataContext();
                //    b = (uint)(Thread.CurrentContext.ContextID + a.Next(10000000));
                //    HttpContext.Current.Items[b.ToString()] = da;
                //    HttpRuntime.Cache.Insert(Thread.CurrentContext.ContextID + a.Next(10000000).ToString(), 1, null, DateTime.Now.AddDays(1), System.Web.Caching.Cache.NoSlidingExpiration);

                throw new FailException();  //如果请求出现多用户使用同一线程的并发冲突，则抛出异常    要检测是否抛出异常！
            }
        }
    }
}
