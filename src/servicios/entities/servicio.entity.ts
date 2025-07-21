// servicio.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Doctor } from '../../doctores/entities/doctor.entity';

@Entity()
export class Servicio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column('decimal')
  costo: number;

  @Column()
  duracion: string;

  @Column({ type: 'date' })
  fechaDisponible: Date;

  @Column({ default: false })
  eliminado: boolean;

  @ManyToOne(() => Doctor, { eager: true }) // eager carga el doctor automáticamente al buscar el servicio
  doctor: Doctor;
}
