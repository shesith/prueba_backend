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
import { Roles } from './roles.decorator';

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
    summary: 'Registrar usuario ADMIN',
    description: 'Solo ADMIN puede crear usuarios ADMIN.',
  })
  @ApiResponse({ status: 201, description: 'Usuario ADMIN registrado.' })
  @Post('register/admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async registerAdmin(
    @Req() req: any,
    @Body() body: { email: string; password: string },
  ): Promise<any> {
    try {
      const hashedPassword = await bcrypt.hash(body.password, 10);
      return await this.usuariosService['usuarioRepository'].save({
        email: body.email,
        password: hashedPassword,
        rol: 'ADMIN',
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new ForbiddenException(
          'Error al crear usuario ADMIN: ' + err.message,
        );
      }
      throw new ForbiddenException('Error al crear usuario ADMIN');
    }
  }

  @ApiOperation({
    summary: 'Registrar usuario CLIENT',
    description: 'Cualquier usuario puede crear usuarios CLIENT.',
  })
  @ApiResponse({ status: 201, description: 'Usuario CLIENT registrado.' })
  @Post('register/client')
  async registerClient(
    @Body() body: { email: string; password: string },
  ): Promise<any> {
    try {
      const hashedPassword = await bcrypt.hash(body.password, 10);
      return await this.usuariosService['usuarioRepository'].save({
        email: body.email,
        password: hashedPassword,
        rol: 'CLIENT',
      });
    } catch (error) {
      throw new ForbiddenException('Error al crear usuario CLIENT');
    }
  }
}
