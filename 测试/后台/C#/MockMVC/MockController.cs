using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using Moq;
using System.Web;

namespace Help
{
    public static class MockController
    {
        /// <summary>
        /// 模拟Controller
        /// </summary>
        public static void Controller_Mock(dynamic controller)
        {
            ControllerContext context =
new ControllerContext(new System.Web.Routing.RequestContext(FakeAuthenticatedHttpContext(), new System.Web.Routing.RouteData()), controller);

            controller.ControllerContext = context;
        }
        private static HttpContextBase FakeAuthenticatedHttpContext()
        {
            var context = new Mock<HttpContextBase>();
            var request = new Mock<HttpRequestBase>();
            var response = new Mock<HttpResponseBase>();
            var session = new Mock<HttpSessionStateBase>();
            var server = new Mock<HttpServerUtilityBase>();

            context.Setup(ctx => ctx.Request).Returns(request.Object);
            context.Setup(ctx => ctx.Response).Returns(response.Object);
            context.Setup(ctx => ctx.Session).Returns(session.Object);
            context.Setup(ctx => ctx.Server).Returns(server.Object);

            return context.Object;
        }
    }
}
