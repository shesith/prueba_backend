// estructura del modelo en la base de datos
// este archivo define la entidad Doctor que se utilizará con TypeORM
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// La entidad Doctor representa a un médico en el sistema
@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  especialidad: string;

  @Column({ default: true })
  activo: boolean;
}
