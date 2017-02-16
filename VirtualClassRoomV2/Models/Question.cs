using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VirtualClassRoomV2.Models
{
    public class Question
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Questions { get; set; }
        public int Vote { get; set; }
        public int View { get; set; }
        public DateTime Date { get; set; }
        public int Answer1 { get; set; }
        public string AcceptedAnswer { get; set; }
    }
}