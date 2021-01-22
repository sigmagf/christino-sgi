import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Vehicle } from './Vehicle';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { length: 128 })
  name: string;

  @Column('character varying', { length: 14 })
  document: string;

  @Column('character varying', { length: 32 })
  folder: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany((type) => Vehicle, (client) => Client)
  vehicles: Vehicle[]
}
