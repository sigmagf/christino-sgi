/* eslint-disable import/no-cycle */
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Work } from './Work';

@Entity('work_histories')
export class WorkHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { select: false })
  work_id: string;

  @Column('character varying', { length: 128 })
  details: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @ManyToOne((type) => Work, (history) => WorkHistory, { lazy: true })
  @JoinColumn({ name: 'work_id' })
  work: Promise<Work>;
}
