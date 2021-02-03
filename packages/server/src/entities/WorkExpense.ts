/* eslint-disable import/no-cycle */
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { ExpenseTypes } from './ExpenseTypes';
import { Work } from './Work';

@Entity('work_expenses')
export class WorkExpense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  work_id: string;

  @Column('uuid')
  expense_type_id: string;

  @Column('float')
  value: number;

  @Column('timestamp', { nullable: true })
  effective_on?: Date;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @ManyToOne((type) => Work, (expenses) => WorkExpense)
  @JoinColumn({ name: 'work_id' })
  work: Promise<Work>;

  @ManyToOne((type) => ExpenseTypes, (work_expenses) => WorkExpense, { eager: true })
  @JoinColumn({ name: 'expense_type_id' })
  expense_type: ExpenseTypes;
}
