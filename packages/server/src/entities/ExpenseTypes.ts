/* eslint-disable import/no-cycle */
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { WorkExpense } from './WorkExpense';

@Entity('expense_types')
export class ExpenseTypes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { length: 64 })
  name: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @OneToMany((type) => WorkExpense, (expense_type) => ExpenseTypes, { eager: true })
  work_expenses: WorkExpense[];
}
