using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eTickets.Business_Logic
{
    public class SessionHelper
    {
        public const string SESSION_START = "Session_Start";
        public const string SESSION_END = "Session_End";
        public const int TIMEOUT = 60;
        public string SessionID
        {
            get
            {
                if (HttpContext.Current.Session.SessionID != null)
                    return HttpContext.Current.Session.SessionID;
                return null;
            }
        }
        public void Initialize()
        {
            HttpContext.Current.Session[SESSION_START] = DateTime.Now;
            HttpContext.Current.Session[SESSION_END] = DateTime.Now.AddMinutes(TIMEOUT);
        }

        public void UpdateSession()
        {
            if (SessionID == null)
                Initialize();
            HttpContext.Current.Session[SESSION_START] = DateTime.Now;
            HttpContext.Current.Session[SESSION_END] = DateTime.Now.AddMinutes(TIMEOUT);
        }

        public void Clear()
        {
            if (SessionID != null)
            {
                HttpContext.Current.Session.Clear();
                HttpContext.Current.Session.Abandon();
            }
        }
    }
}