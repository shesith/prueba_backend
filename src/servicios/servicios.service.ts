import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository, getRepositoryToken } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Servicio } from './entities/servicio.entity';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { Doctor } from '../doctores/entities/doctor.entity';
import { Test, TestingModule } from '@nestjs/testing';

// ServicioService maneja la lógica de negocio relacionada con los servicios
// Incluye operaciones CRUD y consultas específicas como búsqueda por fecha, rango de fechas, etc.
@Injectable()
export class ServiciosService {
  constructor(
    @InjectRepository(Servicio)
    private readonly servicioRepository: Repository<Servicio>,

    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {}

  // Método para crear un nuevo servicio
  // Este método recibe un DTO y crea un nuevo servicio asociado a un doctor activo
  async create(createServicioDto: CreateServicioDto) {
    const { doctorId, ...resto } = createServicioDto;
    const doctor = await this.doctorRepository.findOne({
      where: { id: doctorId, activo: true },
    });
    if (!doctor) {
      throw new NotFoundException(
        `Doctor con ID ${doctorId} no encontrado o inactivo`,
      );
    }
    const servicio = this.servicioRepository.create({ ...resto, doctor });
    return this.servicioRepository.save(servicio);
  }

  // Método para obtener todos los servicios
  // Este método devuelve todos los servicios que no están eliminados, ordenados por fecha disponible
  findAll() {
    return this.servicioRepository.find({
      where: { eliminado: false },
      order: { fechaDisponible: 'ASC' },
    });
  }

  // Método para buscar un servicio por ID
  // Este método busca un servicio por su ID y verifica que no esté eliminado
  findOne(id: number) {
    return this.servicioRepository.findOne({ where: { id, eliminado: false } });
  }

  // Metodo para actualizar un servicio
  // Este método busca el servicio por ID y lo actualiza con los datos proporcionados
  async update(id: number, updateServicioDto: UpdateServicioDto) {
    const servicio = await this.servicioRepository.findOne({
      where: { id, eliminado: false },
    });

    if (!servicio) {
      throw new NotFoundException(`Servicio con ID ${id} no encontrado`);
    }

    return this.servicioRepository.update(id, updateServicioDto);
  }

  // Método para eliminar un servicio lógicamente
  // Esto no elimina el registro de la base de datos, solo marca el servicio como eliminado
  async delete(id: number) {
    const servicio = await this.servicioRepository.findOne({
      where: { id, eliminado: false },
    });
    if (!servicio) {
      throw new NotFoundException(`Servicio con ID ${id} no encontrado`);
    }
    return this.servicioRepository.update(id, { eliminado: true });
  }
  async findByMonth(anio: number, mes: number) {
    // Busca servicios en el mes y año especificados
    return this.servicioRepository
      .createQueryBuilder('servicio')
      .where('servicio.eliminado = :eliminado', { eliminado: false })
      .andWhere('EXTRACT(YEAR FROM servicio.fechaDisponible) = :anio', { anio })
      .andWhere('EXTRACT(MONTH FROM servicio.fechaDisponible) = :mes', { mes })
      .orderBy('servicio.fechaDisponible', 'ASC')
      .getMany();
  }

  async findByDay(fecha: string) {
    // Busca servicios en una fecha específica (solo la parte de la fecha)
    return this.servicioRepository
      .createQueryBuilder('servicio')
      .where('servicio.eliminado = :eliminado', { eliminado: false })
      .andWhere('servicio.fechaDisponible = :fecha', { fecha })
      .orderBy('servicio.fechaDisponible', 'ASC')
      .getMany();
  }

  // Método para buscar servicios por rango de fechas
  // Este método recibe dos fechas y busca los servicios que están disponibles en ese rango
  async findByDateRange(desde: string, hasta: string) {
    // Ajusta el rango para incluir todo el día de 'hasta'
    const desdeDate = new Date(desde);
    const hastaDate = new Date(hasta);
    hastaDate.setHours(23, 59, 59, 999);

    return this.servicioRepository.find({
      where: {
        eliminado: false,
        fechaDisponible: Between(desdeDate, hastaDate),
      },
      order: {
        fechaDisponible: 'ASC',
      },
    });
  }

  // Método para obtener servicios paginados
  // Este método permite paginar los resultados de los servicios, útil para manejar grandes volúmes de datos
  async findAllPaginated(page = 1, pageSize = 10) {
    const [data, total] = await this.servicioRepository.findAndCount({
      where: { eliminado: false },
      order: { fechaDisponible: 'ASC' },
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
