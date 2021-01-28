/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import { Work } from './Work';

@Entity('workEntries')
export class WorkEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  work_id: string;

  @Column('character varying', { length: 256 })
  details: string;

  @CreateDateColumn()
  created_at?: Date;

  @ManyToOne((type) => Work, (entries) => WorkEntry, { lazy: true })
  @JoinColumn({ name: 'work_id' })
  work: Work;
}
