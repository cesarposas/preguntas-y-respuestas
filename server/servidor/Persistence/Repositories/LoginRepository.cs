using servidor.Domain.IRepositories;
using servidor.Domain.Models;
using servidor.Persistence.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace servidor.Persistence.Repositories
{
    public class LoginRepository: ILoginRepository
    {
        private readonly AplicationDBContext _context;

        public LoginRepository(AplicationDBContext context)
        {
            _context = context;
        }

        public async Task<User> ValidateUser(User user)
        {
            var dbUser = _context.Users.Where(x => x.userName == user.userName && x.password == user.password).FirstOrDefault();
            return dbUser;
        }
    }
}
