/* eslint-disable import/no-cycle */
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { WorkRevenue } from './WorkRevenue';

@Entity('payment_methods')
export class PaymentMethod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { length: 64 })
  name: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @OneToMany((type) => WorkRevenue, (payment_method) => PaymentMethod, { lazy: true })
  history: WorkRevenue[];
}
