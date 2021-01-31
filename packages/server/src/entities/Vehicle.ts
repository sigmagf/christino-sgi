/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Client } from './Client';

@Entity('vehicles')
export class Vehicle {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    client_id: string;

    @Column('character varying', { length: 7 })
    plate: string;

    @Column('character varying', { length: 11 })
    renavam: string;

    @Column('character varying', { length: 16, nullable: true, unique: true })
    crv?: string;

    @Column('character varying', { length: 32 })
    brand_model: string;

    @Column('character varying', { length: 16 })
    type: string;

    @Column('character varying', { length: 64, nullable: true })
    details?: string;

    @Column('smallint', { default: 1 })
    status: number;

    @Column('boolean', { default: false })
    crlve_included?: boolean;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @ManyToOne((type) => Client, { eager: true })
    @JoinColumn({ name: 'client_id' })
    client: Client;
}
