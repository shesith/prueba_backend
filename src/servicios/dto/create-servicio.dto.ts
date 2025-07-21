import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

// CreateServicioDto define los parámetros necesarios para crear un nuevo servicio
// Incluye campos como nombre, descripción, costo, duración, fecha disponible y el ID del doctor asociado
// Utiliza validaciones para asegurar que los datos sean correctos antes de crear el servicio
export class CreateServicioDto {
  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  descripcion: string;

  @IsNumber()
  costo: number;

  @IsNotEmpty()
  duracion: string;

  @IsDateString()
  fechaDisponible: Date;

  @IsNumber()
  doctorId: number;
}
