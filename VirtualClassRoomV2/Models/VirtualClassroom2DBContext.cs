using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using VirtualClassRoomV2.Models;

namespace VirtualClassRoomV2.Models
{
    public class VirtualClassroom2DBContext : DbContext
    {
        public DbSet<Question> QuestionDB { get; set; }
    }
}