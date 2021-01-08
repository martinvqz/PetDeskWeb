using Microsoft.AspNetCore.Mvc;
using PetDeskWeb.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;

namespace PetDeskWeb.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AppointmentsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        
        [HttpGet]

        public List<Appointments> Get()
        {
            try
            {
                string urlAPI = String.Format("https://sampledata.petdesk.com/api/appointments");
                WebRequest requestObjectGet = WebRequest.Create(urlAPI);
                requestObjectGet.Method = "GET";
                HttpWebResponse responseObjectGet = null;
                responseObjectGet = (HttpWebResponse)requestObjectGet.GetResponse();

                List<Appointments> result = null;

                if (responseObjectGet.StatusCode.ToString() != "OK")
                {
                    return null;
                }

                using (Stream stream = responseObjectGet.GetResponseStream())
                {
                    StreamReader sr = new StreamReader(stream);
                    result = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Appointments>>(sr.ReadToEnd());
                    sr.Close();
                }
                return result;

            }catch (Exception ex){
                Console.WriteLine("{0} Exception caught.", ex);
            }

            return null;
        }
    }
}