using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using server.Utils;
using servidor.Domain.IServices;
using servidor.Domain.Models;
using servidor.DTO;
using servidor.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;

namespace servidor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILoginService _loginService;
        private readonly IUserService _userService;
        private readonly IConfiguration _config;

        public LoginController(ILoginService loginService, IUserService userService, IConfiguration config)
        {
            _loginService = loginService;
            _userService = userService;
            _config = config;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] User user)
        {
            try
            {
                user.password = Encrypt.EncryptPassword(user.password);
                var dbUser = await _loginService.ValidateUser(user);
                if (dbUser == null)
                {
                    return BadRequest(new { message = "Usuario o contraseña invalidos" });
                }
                string tokenString = JwtConfigurator.GetToken(dbUser, _config);
                return Ok(new { token = tokenString });
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        //localhost:puerto/api/login/ChangePassword
        [Route("ChangePassword")]
        //With this rute it's necessary having authentication to ingres
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDTO changePasswordDTO)
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int idUser = JwtConfigurator.GetTokenIdUsuario(identity);
                string oldPasswordEncrypted = Encrypt.EncryptPassword(changePasswordDTO.oldPassword);
                string newPasswordEncrypted = Encrypt.EncryptPassword(changePasswordDTO.newPassword);
                var user = await _userService.ValidatePassword(idUser, oldPasswordEncrypted);
                if (user == null)
                {
                    return BadRequest(new { message = "Password incorrecta" });
                }
                user.password = newPasswordEncrypted;
                await _userService.UpdatePassword(user);
                return Ok(new { message = "Password actualizada con exito" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
