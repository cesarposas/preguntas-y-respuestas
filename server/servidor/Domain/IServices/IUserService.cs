using servidor.Domain.Models;
using servidor.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace servidor.Domain.IServices
{
    public interface IUserService
    {
        Task SaveUser(User user);

        Task<bool> ValidateExistence(User user);

        Task<User> ValidatePassword(int idUSer, string oldPassword);

        Task UpdatePassword(User user);
    }
}
