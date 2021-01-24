using Microsoft.EntityFrameworkCore;
using servidor.Domain.IRepositories;
using servidor.Domain.Models;
using servidor.Persistence.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace servidor.Persistence.Repositories
{
    public class UserRepository: IUserRepository
    {
        private readonly AplicationDBContext _context;
        public UserRepository(AplicationDBContext context)
        {
            _context = context;
        }

        public async Task SaveUser(User user) 
        {
            _context.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task UpdatePassword(User user)
        {
            _context.Update(user);
            await _context.SaveChangesAsync();
        }


        public async Task<bool> ValidateExistence(User user)
        {
            var validate = await _context.Users.AnyAsync(x => x.userName == user.userName);
            return validate;
        }


        public async Task<User> ValidatePassword(int idUser, string oldPassword)
        {
            var user = await _context.Users.Where(x => x.Id == idUser && x.password == oldPassword).FirstOrDefaultAsync();
            return user;
        }
    }
}
