using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;

namespace Help
{
    public class MyController : Controller
    {
        private static MyViewEngine myViewEngine;
        public MyController()
        {
            myViewEngine = new MyViewEngine();
            ViewEngines.Engines.Clear();
            ViewEngines.Engines.Add(new WebFormViewEngine());
            ViewEngines.Engines.Add(myViewEngine);
        }
    }

}
