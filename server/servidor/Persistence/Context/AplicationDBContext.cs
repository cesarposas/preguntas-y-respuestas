using Microsoft.EntityFrameworkCore;
using servidor.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace servidor.Persistence.Context
{
    public class AplicationDBContext: DbContext
    {
        public DbSet<User> Users { get; set; }

        public AplicationDBContext(DbContextOptions<AplicationDBContext> options): base(options)
        {

        }
    }
}
