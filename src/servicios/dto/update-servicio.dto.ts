import { PartialType } from '@nestjs/mapped-types';
import { CreateServicioDto } from './create-servicio.dto';
// UpdateServicioDto extiende de CreateServicioDto para permitir actualizaciones parciales
// Utiliza PartialType para hacer que todos los campos sean opcionales, permitiendo actualizaciones
export class UpdateServicioDto extends PartialType(CreateServicioDto) {}
