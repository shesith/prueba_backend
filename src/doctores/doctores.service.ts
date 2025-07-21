// Lógica de base de datos para la entidad Doctor
// src/doctores/doctores.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';

@Injectable()
export class DoctoresService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepo: Repository<Doctor>,
  ) {}

  async findAll() {
    return this.doctorRepo.find();
  }

  async findOne(id: number) {
    const doctor = await this.doctorRepo.findOneBy({ id });
    if (!doctor) {
      throw new NotFoundException(`Doctor con ID ${id} no encontrado`);
    }
    return doctor;
  }

  async create(data: Partial<Doctor>) {
    const doctor = this.doctorRepo.create(data);
    return this.doctorRepo.save(doctor);
  }

  async update(id: number, data: Partial<Doctor>) {
    const doctor = await this.findOne(id); // Lanzar NotFoundException si no existe
    await this.doctorRepo.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number) {
    const doctor = await this.findOne(id); // Lanzar NotFoundException si no existe
    await this.doctorRepo.delete(id);
    return { message: `Doctor con ID ${id} eliminado` };
  }

  async findAllPaginated(page = 1, pageSize = 10) {
    const [data, total] = await this.doctorRepo.findAndCount({
      order: { nombre: 'ASC' },
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
