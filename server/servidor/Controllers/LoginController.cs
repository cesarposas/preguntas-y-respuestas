using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using servidor.Domain.IServices;
using servidor.Domain.Models;
using servidor.DTO;
using servidor.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace servidor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILoginService _loginService;
        private readonly IUserService _userService;

        public LoginController(ILoginService loginService, IUserService userService)
        {
            _loginService = loginService;
            _userService = userService;
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
                return Ok(new { user = user.userName });
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        //localhost:puerto/api/User/ChangePassword
        [Route("ChangePassword")]
        [HttpPut]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDTO changePasswordDTO)
        {
            try
            {
                int idUser = 13;
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
