import { Injectable } from '@nestjs/common';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Servicios para manejar la lógica de negocio relacionada con los usuarios
// Incluye operaciones CRUD y consultas específicas como búsqueda por email, paginación, etc.
@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  // Método para crear un nuevo usuario
  // Este método recibe un DTO y crea un nuevo usuario
  async findByEmail(email: string) {
    return this.usuarioRepository.findOne({ where: { email } });
  }

  findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find(); // Trae todos los usuarios
  }

  // Método para buscar un usuario por ID
  async findAllPaginated(page = 1, pageSize = 10) {
    const [data, total] = await this.usuarioRepository.findAndCount({
      order: { email: 'ASC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }
}
