import { IsDateString } from 'class-validator';

// BuscarServiciosDto define los parámetros de búsqueda para los servicios
// Incluye fechas de inicio y fin para filtrar los servicios disponibles
export class BuscarServiciosDto {
  @IsDateString()
  desde: string;

  @IsDateString()
  hasta: string;
}
