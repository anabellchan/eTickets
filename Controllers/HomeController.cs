using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PagedList;

using eTickets.Models;
using eTickets.Business_Logic;

namespace eTickets.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            SessionHelper sh = new SessionHelper();
            ViewBag.sessionID = sh.SessionID;

            return View();
        }
        public ActionResult PayPal()
        {
            Paypal_IPN paypalResponse = new Paypal_IPN("test");
            if (paypalResponse.TXN_ID != null)
            {
                eTicketsEntities context = new eTicketsEntities();
                Attendee a = new Attendee();
                a.eventID = Convert.ToInt16(paypalResponse.ItemNumber);
                a.purchaseDate = DateTime.Now;
                a.email = paypalResponse.PayerEmail;
                a.firstname = paypalResponse.PayerFirstName;
                a.lastname = paypalResponse.PayerLastName;
                a.sessionID = paypalResponse.Custom;
                a.transactionID = paypalResponse.TXN_ID;
                a.totalTickets = Convert.ToInt16(paypalResponse.Quantity);
                a.amount = Convert.ToDecimal(paypalResponse.PaymentGross);
                a.paymentStatus = paypalResponse.PaymentStatus;

                context.Attendees.Add(a);
                context.SaveChanges();
            }

            return View();
        }

        public ActionResult Attendees(int? page)
        {
            AttendeesRepository attendeesRepo = new AttendeesRepository();
            IEnumerable<Attendee> attendees = attendeesRepo.getAttendees();

            const int LISTING_COUNT_PER_PAGE = 10;
            int pageNumber = (page ?? 1);
            attendees = attendees.ToPagedList(pageNumber, LISTING_COUNT_PER_PAGE);
            return View(attendees);
        }
        public ActionResult Cancel()
        {
            return View();
        }
        public ActionResult ThankYou()
        {
            return View();
        }
    }
}