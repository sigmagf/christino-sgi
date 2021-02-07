/* eslint-disable import/no-cycle */
import { Column, CreateDateColumn, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from 'typeorm';

import { Sector } from './Sector';
import { Work } from './Work';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { nullable: false, select: false })
  sector_id: string;

  @Column('character varying', { length: 64 })
  name: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @ManyToOne((type) => Sector, (services) => Service, { eager: true })
  @JoinColumn({ name: 'sector_id' })
  sector: Sector;

  @OneToMany((type) => Work, (service) => Service, { lazy: true })
  works: Work[];
}
