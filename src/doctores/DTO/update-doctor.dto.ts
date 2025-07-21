import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorDto } from './create-doctor.dto';
// UpdateDoctorDto extiende de CreateDoctorDto para permitir actualizaciones parciales
// Utiliza PartialType para hacer que todos los campos sean opcionales, permitiendo actualizaciones
export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {}
