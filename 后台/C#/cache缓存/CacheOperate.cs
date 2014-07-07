using System;
using System.Xml.Linq;
using System.Xml.XPath;
using System.Linq;
using System.Web.Mvc;
using System.Web;
using System.Web.Routing;
using System.Web.Caching;
//要导入System.Web.Abstractions
namespace BLL
{
    /// <summary>
    /// 封装缓存操作
    /// </summary>
    public static class CacheOperate
    {
        private static readonly BLLInterface.Account.IPersonalUser person = BLLFactory.DataAccess.CreatePersonalUser();
        private static readonly BLLInterface.Account.ICompanyUser company = BLLFactory.DataAccess.CreateCompanyUser();

        private static double overdue = 10;     //单位为minute
        private static double overdue_func = 40;    //单位为seconds

        #region 添加、更新缓存
        public static void Add(string name, object value)
        {
            Refresh(name, value, null, System.Web.Caching.Cache.NoAbsoluteExpiration, TimeSpan.FromMinutes(overdue));  //默认为overdue分钟的相对过期时间
        }
        public static void AddByNoCacheDependency(string name, object value)
        {
            System.Web.HttpRuntime.Cache.Insert(name, value, null, System.Web.Caching.Cache.NoAbsoluteExpiration, TimeSpan.FromMinutes(overdue), System.Web.Caching.CacheItemPriority.High, null);
        }
        public static void Refresh(object value)
        {
            if (HttpContext.Current.Session["userID"] != null)
            {
                Refresh(Convert.ToString(HttpContext.Current.Session["userID"]), value);
            }
        }
        public static void Refresh(string name, object value)
        {
            Refresh(name, value, null, System.Web.Caching.Cache.NoAbsoluteExpiration, TimeSpan.FromMinutes(overdue));  //默认为overdue分钟的相对过期时间
        }
        /// <summary>
        /// 加入会员缓存
        /// </summary>
        /// <param name="name"></param>
        /// <param name="value"></param>
        /// <param name="cacheDependencies"></param>
        /// <param name="absoluteExpiration"></param>
        /// <param name="relativExpiratione"></param>
        public static void Refresh(string name, object value, CacheDependency cacheDependencies, DateTime absoluteExpiration, TimeSpan relativExpiratione)
        {
            if (name != null)   //如果name为Session["userID"]，则要判断是否为空
            {
                string newScore = "newScore" + name;

                /*此处要先判断是否已存在，防止CacheOperate.Add("newScore", -1)重复操作。
                 * 因为CacheOperate.Add("newScore", -1)后，绑定了依赖项的缓存会立即被移除
                 */
                if (GetCacheBySelfToAs(newScore) == null)
                {
                    /*此处要先创建newScore缓存，否则下面Insert后，缓存会立即被移除（缓存依赖项更改 removedReason：DependencyChanged）。
                     * 所以绑定缓存依赖项时，被依赖的缓存先要存在！否则绑定了该依赖项的缓存会立即被移除（removedReason：DependencyChanged）
                     * 被依赖的缓存更改（已验证：insert操作（即使insert相同值，还是会使绑定了该依赖项的缓存被移除））后，绑定了该依赖项的缓存被移除
                     */
                    CacheOperate.AddByNoCacheDependency(newScore, -1);
                }
                CacheDependency dep = new CacheDependency(null, new string[] { newScore });    //得分更新后，缓存失效     //调用回调函数更新缓存


                //缓存失效后不调用回调函数更新    //因依赖项更改而缓存失效就要调用回调函数更新
                System.Web.HttpRuntime.Cache.Insert(name, value, dep, absoluteExpiration, relativExpiratione, System.Web.Caching.CacheItemPriority.High, null);
            }
            else    //为空则不进行操作
            {
            }





            ///*Insert操作可覆盖原值，即实现了更新*/

            //if (value is int)   //value为userID
            //{
            //    if (name == "personal") //更新个人会员缓存
            //    {
            //        var per = person.GetLatestPersonalUser((int)value);
            //        System.Web.HttpRuntime.Cache.Insert("personal", per, cacheDependencies, absoluteExpiration, relativExpiratione, System.Web.Caching.CacheItemPriority.NotRemovable, CacheRemovedCallback);
            //    }
            //    else if (name == "company") //更新企业会员缓存
            //    {
            //        var com = company.GetLatestCompanyUser((int)value);
            //        //System.Web.HttpRuntime.Cache.Remove("company");
            //        //System.Web.HttpRuntime.Cache.Insert("company", com, null, System.Web.Caching.Cache.NoAbsoluteExpiration, TimeSpan.FromMinutes(50), System.Web.Caching.CacheItemPriority.NotRemovable, null);
            //        //var t = System.Web.HttpRuntime.Cache["company"] as Model.Entity.Account.CompanyUser;
            //        System.Web.HttpRuntime.Cache.Insert("company", com, cacheDependencies, absoluteExpiration, relativExpiratione, System.Web.Caching.CacheItemPriority.NotRemovable, CacheRemovedCallback);
            //        //var t1 = System.Web.HttpRuntime.Cache["company"] as Model.Entity.Account.CompanyUser;
            //    }
            //    else
            //    {
            //        System.Web.HttpRuntime.Cache.Insert(name, value, cacheDependencies, absoluteExpiration, relativExpiratione, System.Web.Caching.CacheItemPriority.NotRemovable, CacheRemovedCallback);
            //    }
            //}
            //else    //value为user(Model.Entity.per/com)
            //{
            //    if (name == "personal") //更新个人会员缓存
            //    {
            //        System.Web.HttpRuntime.Cache.Insert("personal", value, cacheDependencies, absoluteExpiration, relativExpiratione, System.Web.Caching.CacheItemPriority.NotRemovable, CacheRemovedCallback);
            //    }
            //    else if (name == "company") //更新企业会员缓存
            //    {
            //        System.Web.HttpRuntime.Cache.Insert("company", value, cacheDependencies, absoluteExpiration, relativExpiratione, System.Web.Caching.CacheItemPriority.NotRemovable, CacheRemovedCallback);
            //    }
            //    else
            //    {
            //        System.Web.HttpRuntime.Cache.Insert(name, value, cacheDependencies, absoluteExpiration, relativExpiratione, System.Web.Caching.CacheItemPriority.NotRemovable, CacheRemovedCallback);
            //    }
            //}
        }
        #endregion
        #region 缓存删除/过期后的回调函数
        /// <summary>
        /// 因为依赖项更改失效后刷新缓存(overdue分钟相对过期时间)
        /// </summary>
        /// <param name="key"></param>
        /// <param name="value"></param>
        /// <param name="removedReason"></param>
        private static void CacheRemovedCallback(string key, object value, CacheItemRemovedReason removedReason)
        {
            //if (removedReason == CacheItemRemovedReason.DependencyChanged)    //缓存移除的原因为依赖项更改
            //{
            //    //CacheDependency dep = new CacheDependency(null, new string[] { "new" + key });    //得分更新后，缓存失效

            //    int userID = Convert.ToInt32(key);

            //    System.Web.HttpRuntime.Cache.Insert(key, value, dep, System.Web.Caching.Cache.NoAbsoluteExpiration, TimeSpan.FromSeconds(overdue_func), System.Web.Caching.CacheItemPriority.Normal, CacheRemovedCallback);
            //}


            ////var m = removedReason;

            //if (removedReason == CacheItemRemovedReason.Expired)    //缓存移除的原因为过期
            //{
            //    if (key == "personal") //更新个人会员缓存
            //    {
            //        //System.Web.HttpRuntime.Cache.Insert(key, com, null, absoluteExpiration, relativExpiratione, System.Web.Caching.CacheItemPriority.NotRemovable, CacheRemovedCallback);
            //        var t = value as Model.Entity.Account.PersonalUser;
            //        Refresh(key, t.UserID); //刷新缓存
            //        //GetCache(key);
            //    }
            //    else if (key == "company") //更新企业会员缓存
            //    {
            //        var t = value as Model.Entity.Account.CompanyUser;
            //        //try
            //        //{
            //        //    System.Web.HttpRuntime.Cache.Insert(key, value as Model.Entity.Account.CompanyUser, null, System.Web.Caching.Cache.NoAbsoluteExpiration, TimeSpan.FromMinutes(50), System.Web.Caching.CacheItemPriority.NotRemovable, CacheRemovedCallback);
            //        //}
            //        //catch
            //        //{
            //        //var m = System.Web.HttpRuntime.Cache["company"] as Model.Entity.Account.CompanyUser;
            //        Refresh(key, t.UserID); //刷新缓存
            //        //var com = company.GetLatestCompanyUser(t.UserID);
            //        ////try
            //        ////{
            //        //System.Web.HttpRuntime.Cache.Insert(key, value as Model.Entity.Account.CompanyUser, null, System.Web.Caching.Cache.NoAbsoluteExpiration, TimeSpan.FromMinutes(overdue), System.Web.Caching.CacheItemPriority.NotRemovable, null);
            //        //}
            //        //catch
            //        //{
            //        //    var q = System.Web.HttpRuntime.Cache["company"] as Model.Entity.Account.CompanyUser;
            //        //}
            //        //}

            //    }
            //    //else if (key == "newScore") 
            //    //{
            //    //    return;
            //    //}
            //    //else //得分缓存回调函数
            //    //{
            //    //    CacheDependency dep = new CacheDependency(null, new string[] { "newScore" });    //得分更新后，缓存失效
            //    //    System.Web.HttpRuntime.Cache.Insert(key, value as string, dep, System.Web.Caching.Cache.NoAbsoluteExpiration, TimeSpan.FromSeconds(overdue_func), System.Web.Caching.CacheItemPriority.NotRemovable, CacheRemovedCallback);
            //    //}
            //    //System.Web.HttpRuntime.Cache.Insert(key, com, null, absoluteExpiration, relativExpiratione, System.Web.Caching.CacheItemPriority.NotRemovable, CacheRemovedCallback);
            //}
        }
        #endregion
        #region 获得cache
        public static bool IsEmpty(string name)
        {
            if (System.Web.HttpRuntime.Cache[name] != null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
        /// <summary>
        /// 获得cache的值（已自动转换类型，可直接使用）
        /// </summary>
        /// <param name="roleName"></param>
        /// <returns></returns>
        public static dynamic GetCache(string userID)
        {
            string roleType = Convert.ToString(HttpContext.Current.Session["roleType"]);
            //string userID = Convert.ToString(HttpContext.Current.Session["userID"]);

            if (userID == null) //如果session为空，则不能获得缓存
            {
                return new EmptyResult();
            }


            if (roleType == "personal")
            {
                if (!IsEmpty(userID))   //如果缓存存在，则返回缓存；否则创建新缓存并返回
                {
                    return System.Web.HttpRuntime.Cache[userID] as Model.Entity.Account.PersonalUser;
                }
                else
                {
                    var per = person.GetLatestPersonalUser(int.Parse(userID));
                    Add(userID, per);
                    return System.Web.HttpRuntime.Cache[userID] as Model.Entity.Account.PersonalUser;
                }
            }
            else if (roleType == "company")    //company
            {
                if (!IsEmpty(userID))   //如果缓存存在，则返回缓存；否则创建新缓存并返回
                {
                    return System.Web.HttpRuntime.Cache[userID] as Model.Entity.Account.CompanyUser;
                }
                else
                {
                    var com = company.GetLatestCompanyUser(int.Parse(userID));
                    Add(userID, com);
                    return System.Web.HttpRuntime.Cache[userID] as Model.Entity.Account.CompanyUser;
                }
            }


            return new EmptyResult();

            //switch (roleName)
            //{
            //    case "company":
            //        if (!IsEmpty(roleName))
            //        {
            //            return System.Web.HttpRuntime.Cache[roleName] as Model.Entity.Account.CompanyUser;
            //        }
            //        else
            //        {
            //            return new EmptyResult();
            //        }
            //        break;
            //    case "personal":
            //        if (!IsEmpty(roleName))
            //        {
            //            return System.Web.HttpRuntime.Cache[roleName] as Model.Entity.Account.PersonalUser;
            //        }
            //        else
            //        {
            //            return new EmptyResult();
            //        }
            //        break;
            //    default:
            //        return System.Web.HttpRuntime.Cache[roleName];
            //        break;
            //}
            //return new EmptyResult();
        }
        /// <summary>
        /// 获得cache的value（需要手动转换类型）
        /// </summary>
        /// <param name="roleName"></param>
        public static object GetCacheBySelfToAs(string name)
        {
            //if (!IsEmpty(roleName))
            //{
            //    return System.Web.HttpRuntime.Cache[roleName];
            //}
            //else
            //{
            //    return new EmptyResult();
            //}
            return System.Web.HttpRuntime.Cache[name];
        }
        #endregion
        #region 删除缓存
        /// <summary>
        /// 清空cache
        /// </summary>
        public static void RemoveAll()
        {
            //清空cache
            System.Collections.IDictionaryEnumerator cacheE = System.Web.HttpRuntime.Cache.GetEnumerator();
            while (cacheE.MoveNext())
            {
                if (!IsEmpty(cacheE.Key.ToString()))
                {
                    System.Web.HttpRuntime.Cache.Remove(cacheE.Key.ToString());
                }
            }
        }
        /// <summary>
        /// 删除指定的cache
        /// </summary>
        public static void Remove(string name)
        {
            if (!IsEmpty(name))
            {
                System.Web.HttpRuntime.Cache.Remove(name);
            }
        }
        #endregion
        #region 添加缓存（采用委托作为参数）
        public static void AddFunc(string name, Func<object> func)
        {
            AddFunc(name, func, null, System.Web.Caching.Cache.NoAbsoluteExpiration, TimeSpan.FromSeconds(overdue_func));
        }
        public static void AddFunc(string name, Func<object> func, CacheDependency cacheDependencies, DateTime absoluteExpiration, TimeSpan relativExpiratione)
        {
            string content = GetCacheBySelfToAs(name) as string;

            if (content == null)
            {
                content = func().ToString();
                System.Web.HttpRuntime.Cache.Insert(name, content, cacheDependencies, absoluteExpiration, relativExpiratione);
            }
        }
        #endregion
        #region 添加并获得缓存（采用委托作为参数）
        //public static string AddFunc_Get(string name, Func<object> func)
        //{
        //    return AddFunc_Get(name, func, null, System.Web.Caching.Cache.NoAbsoluteExpiration, TimeSpan.FromSeconds(overdue_func));  
        //}
        //public static string AddFunc_Get(string name, Func<object> func, CacheDependency cacheDependencies, DateTime absoluteExpiration, TimeSpan relativExpiratione)
        //{
        //    string content = GetCacheBySelfToAs(name) as string;

        //    if (content == null)
        //    {
        //        content = func().ToString();
        //        System.Web.HttpRuntime.Cache.Insert(name, content, null, absoluteExpiration, relativExpiratione);
        //    }
        //    return content;
        //}
        #endregion
        #region 缓存得分页面（设置缓存依赖项）
        public static string AddScore(string name, Func<object> func)
        {
            string _name = name;
            string content = GetCacheBySelfToAs(_name) as string;
            string newScore = "newScore";

            if (content == null)
            {
                /*此处要先判断是否已存在，防止CacheOperate.Add("newScore", -1)重复操作。
                 * 因为CacheOperate.Add("newScore", -1)后，绑定了依赖项的缓存会立即被移除
                 */
                if (GetCacheBySelfToAs(newScore) == null)
                {
                    /*此处要先创建newScore缓存，否则下面Insert后，缓存会立即被移除（缓存依赖项更改 removedReason：DependencyChanged）。
                     * 所以绑定缓存依赖项时，被依赖的缓存先要存在！否则绑定了该依赖项的缓存会立即被移除（removedReason：DependencyChanged）
                     * 被依赖的缓存更改（已验证：insert操作（即使insert相同值，还是会使绑定了该依赖项的缓存被移除））后，绑定了该依赖项的缓存被移除
                     */
                    CacheOperate.AddByNoCacheDependency(newScore, -1);
                }
                CacheDependency dep = new CacheDependency(null, new string[] { newScore });    //得分更新后，缓存失效,调用回调函数更新缓存
                content = func().ToString();
                System.Web.HttpRuntime.Cache.Insert(_name, content, dep, System.Web.Caching.Cache.NoAbsoluteExpiration, TimeSpan.FromSeconds(overdue_func), System.Web.Caching.CacheItemPriority.Normal, null);
                //var t = GetCacheBySelfToAs(name);
                //CacheOperate.Add("newScore", 2);
                //var t2 = GetCacheBySelfToAs(name);
                //System.Web.HttpRuntime.Cache.Insert(name, content, dep, System.Web.Caching.Cache.NoAbsoluteExpiration, TimeSpan.FromSeconds(overdue_func));
                //var t3 = GetCacheBySelfToAs(name);
            }
            return content;
        }
        public static string AddScore(string name, int useredID, Func<object> func)
        {
            string _name = name + Convert.ToString(useredID);
            string content = GetCacheBySelfToAs(_name) as string;
            string newScore = "newScore" + Convert.ToString(useredID);

            if (content == null)
            {
                /*此处要先判断是否已存在，防止CacheOperate.Add("newScore", -1)重复操作。
                 * 因为CacheOperate.Add("newScore", -1)后，绑定了依赖项的缓存会立即被移除
                 */
                if (GetCacheBySelfToAs(newScore) == null)
                {
                    /*此处要先创建newScore缓存，否则下面Insert后，缓存会立即被移除（缓存依赖项更改 removedReason：DependencyChanged）。
                     * 所以绑定缓存依赖项时，被依赖的缓存先要存在！否则绑定了该依赖项的缓存会立即被移除（removedReason：DependencyChanged）
                     * 被依赖的缓存更改（已验证：insert操作（即使insert相同值，还是会使绑定了该依赖项的缓存被移除））后，绑定了该依赖项的缓存被移除
                     */
                    CacheOperate.AddByNoCacheDependency(newScore, -1);
                }
                /*得分更新后，缓存失效,不调用回调函数更新缓存。
                 * 下次再调用时，content就为null，就会重新执行一次content = func().ToString();
                 * 就会得到最新值了。
                 * 因此缓存失效后不需要调用回调函数更新了。
                 */
                CacheDependency dep = new CacheDependency(null, new string[] { newScore });
                content = func().ToString();
                System.Web.HttpRuntime.Cache.Insert(_name, content, dep, System.Web.Caching.Cache.NoAbsoluteExpiration, TimeSpan.FromSeconds(overdue_func), System.Web.Caching.CacheItemPriority.Normal, null); //缓存过期不调用回调函数
                var t = GetCacheBySelfToAs(_name);
                //CacheOperate.Add("newScore", 2);
                //var t2 = GetCacheBySelfToAs(name);
                //System.Web.HttpRuntime.Cache.Insert(name, content, dep, System.Web.Caching.Cache.NoAbsoluteExpiration, TimeSpan.FromSeconds(overdue_func));
                //var t3 = GetCacheBySelfToAs(name);
            }
            return content;
        }
        #endregion
    }
}
