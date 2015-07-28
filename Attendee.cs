//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace eTickets
{
    using System;
    using System.Collections.Generic;
    
    public partial class Attendee
    {
        public Attendee()
        {
            this.CurrentEvents = new HashSet<CurrentEvent>();
        }
    
        public int ID { get; set; }
        public Nullable<int> eventID { get; set; }
        public Nullable<System.DateTime> purchaseDate { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string email { get; set; }
        public string sessionID { get; set; }
        public string transactionID { get; set; }
        public Nullable<int> totalTickets { get; set; }
        public Nullable<decimal> amount { get; set; }
        public string paymentStatus { get; set; }
    
        public virtual ICollection<CurrentEvent> CurrentEvents { get; set; }
    }
}
