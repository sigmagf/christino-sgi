/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-cycle */
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import { Client } from './Client';
import { WorkEntry } from './WorkEntry';

@Entity('works')
export class Work {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  client_id: string;

  @Column('smallint', { default: 0 })
  service: number;

  @Column('character varying', { length: 7 })
  plate: string;

  @Column('character varying', { length: 16, nullable: true })
  ecrv_id: string;

  @Column('character varying', { length: 16, nullable: true })
  naj_receipt: string;

  @Column('character varying', { length: 16, nullable: true })
  naj_buy: string;

  @Column('text', { nullable: true })
  fees: string;

  @Column('smallint', { default: 0 })
  status: number;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @ManyToOne((type) => Client, { eager: true })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @OneToMany((type) => WorkEntry, (work) => Work, { eager: true })
  entries: WorkEntry[];
}
