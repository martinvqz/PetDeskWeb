using System;

namespace PetDeskWeb.Models
{
    public class Appointments
    {
        public int appointmentId { get; set; }
        public string appointmentType { get; set; }
        public DateTime createDateTime { get; set; }
        public DateTimeOffset requestedDateTimeOffset { get; set; }
        public int user_UserId { get; set; }
        public Users user { get; set; }
        public string animal_AnimalId { get; set; }
        public Animals animal { get; set; }
    }
}