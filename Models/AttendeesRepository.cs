using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eTickets.Models
{
    public class AttendeesRepository
    {
        eTicketsEntities db = new eTicketsEntities();

        public IEnumerable<Attendee> getAttendees()
        {
            IEnumerable<Attendee> q = db.Attendees.ToList();
            return db.Attendees.OrderByDescending(a => a.purchaseDate).ToList();;
        }
    }
}