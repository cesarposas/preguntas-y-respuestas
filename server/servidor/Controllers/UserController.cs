using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using servidor.Domain.IServices;
using servidor.Domain.Models;
using servidor.DTO;
using servidor.Services;
using servidor.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace servidor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] User user)
        {
            try
            {
                var validateExistence = await _userService.ValidateExistence(user);
                if (validateExistence)
                {
                    return BadRequest(new { message = "El usuario " + user.userName + " ya existe" });
                }
                user.password = Encrypt.EncryptPassword(user.password);
                await _userService.SaveUser(user);

                return Ok(new { message = "Usuario registrado con éxito!" });
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
                int idUser = 5;
                string oldPasswordEncrypted = Encrypt.EncryptPassword(changePasswordDTO.oldPassword);
                string newPasswordEncrypted = Encrypt.EncryptPassword(changePasswordDTO.newPassword);
                var user = await _userService.ValidatePassword(idUser, oldPasswordEncrypted);
                if(user == null)
                {
                    return BadRequest(new { message = "Password incorrecta" });
                }
                user.password = newPasswordEncrypted;
                await _userService.UpdatePassword(user);
                return Ok(new { message = "Password actualizada con exito" });
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
