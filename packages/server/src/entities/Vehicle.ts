import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Client } from './Client';

@Entity('vehicles')
export class Vehicle {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    client_id: string;

    @Column('character varying', { length: 7, unique: true })
    plate: string;

    @Column('character varying', { length: 11, unique: true })
    renavam: string;

    @Column('character varying', { length: 16, nullable: true, unique: true })
    cla: string;

    @Column('character varying', { length: 16, nullable: true, unique: true })
    crv: string;

    @Column('character varying', { length: 32, nullable: true })
    brand_model: string;

    @Column('character varying', { length: 16, nullable: true })
    type: string;

    @Column('character varying', { length: 64, nullable: true })
    details: string;

    @Column('smallint', { default: 1 })
    status: number;

    @Column('timestamp without time zone', { default: Date.now(), nullable: true })
    issued_on: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne((type) => Client, (vehicles) => Vehicle, { eager: true })
    @JoinColumn({ name: 'client_id' })
    client: Client;
}
