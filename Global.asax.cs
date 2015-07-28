using System;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using eTickets.Business_Logic;

namespace eTickets
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
        //protected void Session_Start()
        //{
        //    // Remove abandoned sessions
        //    SessionHelper session = new SessionHelper();

        //    if (Request.Cookies["ASP.NET_SessionId"] == null)
        //        session.Initialize();
        //    else
        //        session.UpdateSession();
        //}

        //protected void Session_End()
        //{
        //    // remove current session
        //    if (HttpContext.Current.Session != null)
        //    {
        //        HttpContext.Current.Session.Clear();    // remove collection items
        //        HttpContext.Current.Session.Abandon();  // cancel current session
        //    }
        //}
    }
}
