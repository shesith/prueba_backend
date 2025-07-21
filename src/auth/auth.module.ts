import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';

// AuthModule maneja la autenticación de usuarios
// Incluye el inicio de sesión, registro y validación de JWT
// Importa el JwtModule para manejar la generación y validación de tokens JWT
// Importa UsuariosModule para acceder a los servicios de usuarios
// Usa JwtStrategy para validar los tokens JWT en las solicitudes protegidas

@Module({
  imports: [
    ConfigModule,
    UsuariosModule,
    JwtModule.register({
      secret: 'supersecreto', // Debe ser un secreto seguro y almacenado en variables de entorno
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
