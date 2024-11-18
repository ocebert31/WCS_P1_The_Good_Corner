import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";

@Entity()
export default class TagEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({unique: true})
    label: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date; 
}