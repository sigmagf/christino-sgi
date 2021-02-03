/* eslint-disable import/no-cycle */
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Vehicle } from './Vehicle';
import { Work } from './Work';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { length: 128 })
  name: string;

  @Column('character varying', { length: 14 })
  document: string;

  @Column('character varying', { length: 32, nullable: true })
  group?: string;

  @Column('character varying', { length: 64, nullable: true })
  email?: string;

  @Column('character varying', { length: 11, nullable: true })
  phone1?: string;

  @Column('character varying', { length: 11, nullable: true })
  phone2?: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @OneToMany((type) => Vehicle, (client) => Client, { lazy: true })
  vehicles: Vehicle[];

  @OneToMany((type) => Work, (client) => Client, { lazy: true })
  works: Work[];
}
