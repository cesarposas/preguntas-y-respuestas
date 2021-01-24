using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace servidor.DTO
{
    public class ChangePasswordDTO
    {
        public string oldPassword { get; set; }

        public string newPassword { get; set; }
    }
}
