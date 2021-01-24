using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using servidor.Domain.IRepositories;
using servidor.Domain.IServices;
using servidor.Persistence.Context;
using servidor.Persistence.Repositories;
using servidor.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace servidor
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<AplicationDBContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("Conexion")));
            services.AddControllers();



            services.AddScoped<ILoginService, LoginService>();

            services.AddScoped<ILoginRepository, LoginRepository>();

            //Repositories 
            services.AddScoped<IUserService, UserService>();

            services.AddScoped<IUserRepository, UserRepository>();


            //Add cors
            services.AddCors(options => options.AddPolicy("AllowWebapp",
                builder => builder.AllowAnyOrigin()
                                    .AllowAnyHeader()
                                    .AllowAnyMethod()));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("AllowWebapp");

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
