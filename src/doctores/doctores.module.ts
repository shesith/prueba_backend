// Importar la entidad Doctor en el módulo
// src/doctores/doctores.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctoresService } from './doctores.service';
import { DoctoresController } from './doctores.controller';
import { Doctor } from './entities/doctor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor])],
  controllers: [DoctoresController],
  providers: [DoctoresService],
  exports: [TypeOrmModule], // Exportar TypeOrmModule para que otros módulos puedan usar la entidad Doctor
})
export class DoctoresModule {}
