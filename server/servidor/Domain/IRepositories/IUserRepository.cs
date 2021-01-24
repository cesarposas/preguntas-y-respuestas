using servidor.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace servidor.Domain.IRepositories
{
    public interface IUserRepository
    {
        Task SaveUser(User user);

        Task<bool> ValidateExistence(User user);

        Task<User> ValidatePassword(int idUser, string oldPassword);

        Task UpdatePassword(User user);
    }
}
