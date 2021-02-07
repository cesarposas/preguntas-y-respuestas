using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using servidor.Domain.IRepositories;
using servidor.Domain.IServices;
using servidor.Persistence.Context;
using servidor.Persistence.Repositories;
using servidor.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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

            // Add authentication 
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                 .AddJwtBearer(options => options.TokenValidationParameters = new TokenValidationParameters
                 {
                     //validate cliente
                     ValidateIssuer = true,
                     //validate server
                     ValidateAudience = true,
                     //Validate it not expired
                     ValidateLifetime = true,
                     //validate security key
                     ValidateIssuerSigningKey = true,
                     //extract parameters form configurations file
                     ValidIssuer = Configuration["Jwt:Issuer"],
                     ValidAudience = Configuration["Jwt:Audience"],
                     IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:SecretKey"])),
                     ClockSkew = TimeSpan.Zero
                 });
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

            app.UseAuthentication();
        }
    }
}
