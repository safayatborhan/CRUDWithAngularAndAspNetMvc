using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using VirtualClassRoomV2.Models;

namespace VirtualClassRoomV2.Controllers
{
    public class HomeController : Controller
    {
        ApplicationDbContext db1 = new ApplicationDbContext();
        VirtualClassroom2DBContext db = new VirtualClassroom2DBContext();

        [Authorize]
        public JsonResult GetQuestions()
        {
            List<Question> QuestionList = new List<Question>();
            QuestionList = db.QuestionDB.ToList();
            return Json(new { list = QuestionList }, JsonRequestBehavior.AllowGet);
        }

        [Authorize]
        public JsonResult AddQuestion(Question question)
        {
            //Thread.Sleep(5000);
            question.Date = DateTime.Parse(DateTime.Now.ToShortTimeString());
            db.QuestionDB.Add(question);
            db.SaveChanges();
            return Json(new { status = "Question added successfully" });
        }

        [Authorize]
        public JsonResult GetQuestionByID(int id)
        {
            Question question = new Question();
            question = db.QuestionDB.Where(p => p.ID == id).SingleOrDefault();
            return Json(new { question = question }, JsonRequestBehavior.AllowGet);
        }

        [Authorize]
        public JsonResult UpdateQuestion(Question question)
        {
            question.Date = DateTime.Parse(DateTime.Now.ToShortTimeString());
            db.Entry(question).State = EntityState.Modified;
            db.SaveChanges();
            return Json(new { status = "Question updated successfully" });
        }

        [Authorize]
        public JsonResult DeleteQuestion(int id)
        {
            Question question = new Question();
            question = db.QuestionDB.Where(p => p.ID == id).SingleOrDefault();
            db.QuestionDB.Remove(question);
            db.SaveChanges();
            return Json(new { status = "Question deleted successfully" });
        }

        [Authorize]
        public ActionResult Index()
        {
            var emailOfUser = User.Identity.Name;
            ApplicationUser user = new ApplicationUser();
            user = db1.Users.Where(p => p.UserName == emailOfUser).SingleOrDefault();
            ViewBag.Name = user.Name;
            //ViewBag.Name = User.Identity.Name;
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}