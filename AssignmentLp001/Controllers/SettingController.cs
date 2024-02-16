using AssignmentLp001.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace AssignmentLp001.Controllers
{
    public class SettingController : Controller
    {
        private readonly LP0001Context _context;
        public SettingController(LP0001Context context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult Edit(long id)
        {
            var settingListInDb = _context.Settings.Where(s => s.Id == id).FirstOrDefault();
            return new JsonResult(settingListInDb);
        }

        public JsonResult Add(Setting setting)
        {
           

            var item = new Setting()
            {
                Key=setting.Key,
                Value=setting.Value,
                Value2=setting.Value2,
                Description=setting.Description,
                Created=setting.Created,
                LastModified=setting.LastModified,
                IsDeleted=setting.IsDeleted

            };
         
         _context.Settings.Add(item);
            
           _context.SaveChanges();
            return new JsonResult("Data is Saved");
        }
        public JsonResult Update(Setting setting)
        {

            _context.Settings.Update(setting);

            _context.SaveChanges();
            return new JsonResult("Data is updated sucessfully");
        }
        #region APIs
        [HttpGet]
        public IActionResult GetALL()  
        {
            return Json(new { data = _context.Settings.ToList() });

        }
        [HttpDelete]
        public IActionResult Delete(long id)
        {
            var settingListInDb = _context.Settings.Where(s=>s.Id==id).FirstOrDefault();
            if (settingListInDb == null) return Json(new { success = false, message = "something wrong while deleting data" });

            _context.Settings.Remove(settingListInDb);
            _context.SaveChanges();
            return Json(new { success = true, message = "successfuly deleted data" });

        }
        #endregion
    }
}
