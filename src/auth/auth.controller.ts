import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/dto.login';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { RolesGuard } from './roles.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

// AuthController maneja las rutas de autenticación
// Incluye el inicio de sesión y el registro de usuarios
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usuariosService: UsuariosService,
  ) {}

  @ApiOperation({
    summary: 'Login de usuario',
    description: `Obtén un token JWT. Ejemplo de credenciales:
    ADMIN: admin@correo.com / 123456
    CLIENTE: cliente@correo.com / 123456`,
  })
  @ApiResponse({ status: 201, description: 'Token JWT generado.' })
  // Método para iniciar sesión
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }
  @ApiOperation({
    summary: 'Registrar usuario',
    description:
      'Solo ADMIN puede crear usuarios ADMIN. CLIENT puede crear usuarios CLIENT.',
  })
  @ApiResponse({ status: 201, description: 'Usuario registrado.' })
  // Método para registrar un nuevo usuario
  @Post('register')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async register(
    @Req() req,
    @Body() body: { email: string; password: string; rol?: 'ADMIN' | 'CLIENT' },
  ) {
    // Solo ADMIN puede crear usuarios ADMIN
    if (body.rol === 'ADMIN' && req.user.rol !== 'ADMIN') {
      throw new ForbiddenException('Solo un ADMIN puede crear otro ADMIN');
    }
    // Verifica si el usuario ya existe
    const hashedPassword = await bcrypt.hash(body.password, 10);
    return this.usuariosService['usuarioRepository'].save({
      email: body.email,
      password: hashedPassword,
      rol: body.rol || 'CLIENT',
    });
  }
}
