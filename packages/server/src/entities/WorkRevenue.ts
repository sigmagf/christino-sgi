/* eslint-disable import/no-cycle */
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { PaymentMethod } from './PaymentMethod';
import { Work } from './Work';

@Entity('work_revenues')
export class WorkRevenue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  work_id: string;

  @Column('uuid')
  payment_method_id: string;

  @Column('float')
  value: number;

  @Column('timestamp', { nullable: true })
  effective_on?: Date;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @ManyToOne((type) => Work, (revenues) => WorkRevenue, { lazy: true })
  @JoinColumn({ name: 'work_id' })
  work: Promise<Work>;

  @ManyToOne((type) => PaymentMethod, { eager: true })
  @JoinColumn({ name: 'payment_method_id' })
  payment_method: PaymentMethod;
}
