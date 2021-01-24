using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace servidor.Domain.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [Column(TypeName="varchar(20)")]
        public string userName { get; set; }

        [Required]
        [Column(TypeName = "varchar(50)")]
        public string  password { get; set; }
    }
}
