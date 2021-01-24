using servidor.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace servidor.Domain.IRepositories
{
    public interface ILoginRepository
    {
        Task<User> ValidateUser(User user);
    }
}
