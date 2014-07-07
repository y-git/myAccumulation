using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;

namespace Help
{
    /// <summary>
    /// 定义视图查找的路径
    /// </summary>
    public class MyViewEngine : WebFormViewEngine
    {
        public MyViewEngine()
        {
            ViewLocationFormats = new string[] 
            {
                "~/Views/Admin/{0}.ascx",
                "~/Views/Admin/AjaxResult/DeviceAdmin//Device/{0}.ascx",
                "~/Views/Admin/AjaxResult/UserAdmin/AllUser/{0}.ascx",
                "~/Views/Admin/AjaxResult/UserAdmin/Show/{0}.ascx",
                "~/Views/Admin/AjaxResult/UserAdmin/Message/{0}.ascx",
                "~/Views/Admin/AjaxResult/UserAdmin/Password/{0}.ascx"
            };
            PartialViewLocationFormats = ViewLocationFormats;
        }
    }


    //public class MyViewEngine2 : WebFormViewEngine
    //{
    //    public MyViewEngine2()
    //    {
    //        ViewLocationFormats = new string[] 
    //        {
    //            "~/Views/ProfessionInfo/AjaxResult/{0}.ascx",
    //            "~/Views/ProfessionInfo/AjaxResult/Show/{0}.ascx",
    //            "~/Views/ProfessionInfo/Search/{0}.ascx"

    //        };
    //        PartialViewLocationFormats = ViewLocationFormats;
    //    }
    //}
}
