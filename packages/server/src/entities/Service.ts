/* eslint-disable import/no-cycle */
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Sector } from './Sector';
import { Work } from './Work';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { select: false })
  sector_id: string;

  @Column('character varying', { length: 64 })
  name: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @ManyToOne((type) => Sector, { eager: true })
  @JoinColumn({ name: 'sector_id' })
  sector: Sector;

  @OneToMany((type) => Work, (service) => Service)
  works: Promise<Work[]>
}
