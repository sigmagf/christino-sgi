import { Column, Entity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('character varying', { length: 128 })
    name: string;

    @Column('character varying', { length: 128 })
    email: string;

    @Column('character varying', { length: 128 })
    password: string;

    @Column('character varying', { length: 128, nullable: true, unique: true })
    pwd_reset_token?: string;

    @Column('timestamp without time zone', { nullable: true })
    pwd_reset_expires?: Date;

    @Column('character varying', { length: 128, nullable: true, unique: true })
    email_change_token?: string;

    @Column('timestamp without time zone', { nullable: true })
    email_change_expires?: Date;

    @Column('smallint', { default: 0 })
    desp_permission: number;

    @Column('smallint', { default: 0 })
    segu_permission: number;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;
}
