/* eslint-disable import/no-cycle */
import { Column, CreateDateColumn, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from 'typeorm';

import { Client } from './Client';
import { Service } from './Service';
import { WorkExpense } from './WorkExpense';
import { WorkHistory } from './WorkHistory';
import { WorkRevenue } from './WorkRevenue';

@Entity('works')
export class Work {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  client_id: string;

  @Column('uuid')
  service_id: string;

  @Column('character varying', { length: 16, nullable: true })
  identifier?: string;

  @Column('float')
  value: number;

  @Column('character varying', { length: 128, nullable: true })
  details?: string;

  @Column('smallint', { default: 0 })
  status: number;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @ManyToOne((type) => Client, { eager: true })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ManyToOne((type) => Service, (works) => Work, { eager: true })
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @OneToMany((type) => WorkHistory, (work) => Work, { eager: true })
  history: WorkHistory[];

  @OneToMany((type) => WorkRevenue, (work) => Work, { eager: true })
  revenues: WorkRevenue[];

  @OneToMany((type) => WorkExpense, (work) => Work, { eager: true })
  expenses: WorkExpense[];
}
