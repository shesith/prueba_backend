import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Servicio } from './entities/servicio.entity';
import { ServiciosService } from './servicios.service';
import { ServiciosController } from './servicios.controller';
import { Doctor } from '../doctores/entities/doctor.entity';
import { DoctoresModule } from '../doctores/doctores.module';

// Importar el módulo DoctoresModule para poder usar la entidad Doctor
@Module({
  imports: [TypeOrmModule.forFeature([Servicio, Doctor]), DoctoresModule],
  controllers: [ServiciosController],
  providers: [ServiciosService],
})
export class ServiciosModule {}
