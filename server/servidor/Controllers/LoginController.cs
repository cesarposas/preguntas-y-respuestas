using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using servidor.Domain.IServices;
using servidor.Domain.Models;
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

        [Route("ChangePassword")]
        [HttpPut]
        public async Task<IActionResult> ChangePassword([FromBody] User user)
        {
            try
            {
                var validateExistence = await _userService.ValidateExistence(user);
                if (validateExistence==null)
                {
                    return BadRequest(new { message = "El usuario " + user.userName + " no existe!" });
                }
                user.password = Encrypt.EncryptPassword(user.password);
                await _userService.SaveUser(user);

                return Ok(new { message = "Contraseña modificada con existo!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
