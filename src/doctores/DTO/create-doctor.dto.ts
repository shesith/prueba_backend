import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

// CreateDoctorDto define los parámetros necesarios para crear un nuevo doctor
export class CreateDoctorDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  especialidad?: string;

  @IsString()
  @IsOptional()
  telefono?: string;
}
