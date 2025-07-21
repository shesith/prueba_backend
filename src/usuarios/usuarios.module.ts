import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';

// UsuariosModule maneja las rutas y servicios relacionados con los usuarios
// Incluye operaciones CRUD y consultas específicas como paginación de usuarios

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  providers: [UsuariosService],
  controllers: [UsuariosController],
  exports: [UsuariosService], // Exporta el servicio UsuariosService para que otros módulos puedan usarlo
})
export class UsuariosModule {}
