using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using Moq;
using System.Web;

namespace Help
{
    public static class MockSession
    {
        /// <summary>
        /// 模拟Session
        /// </summary>
        public static void Mock(IDictionary<string, string> sessionDict, dynamic controller)
        {
            ControllerContext context =
new ControllerContext(new System.Web.Routing.RequestContext(FakeAuthenticatedHttpContext_Session(sessionDict), new System.Web.Routing.RouteData()), controller);

            controller.ControllerContext = context;
        }
        /// <summary>
        /// 重载
        /// </summary>
        public static void Mock(dynamic controller)
        {
            ControllerContext context =
new ControllerContext(new System.Web.Routing.RequestContext(FakeAuthenticatedHttpContext_Session(), new System.Web.Routing.RouteData()), controller);

            controller.ControllerContext = context;
        }
        private static HttpContextBase FakeAuthenticatedHttpContext_Session(IDictionary<string, string> sessionDict)
        {
            var context = new Mock<HttpContextBase>();
            var session = new Mock<HttpSessionStateBase>();

            foreach (var item in sessionDict)
            {
                context.Setup(ctx => ctx.Session[item.Key]).Returns(item.Value);
            }

            return context.Object;
        }
        private static HttpContextBase FakeAuthenticatedHttpContext_Session()
        {
            var context = new Mock<HttpContextBase>();
            var session = new Mock<HttpSessionStateBase>();

            context.Setup(ctx => ctx.Session).Returns(session.Object);

            return context.Object;
        }
    }
}
