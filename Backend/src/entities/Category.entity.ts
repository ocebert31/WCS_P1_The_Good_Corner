import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";
import AdEntity from "./Ad.entity";

@Entity()
export default class CategoryEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({unique: true})
    title: string;

    @OneToMany(() => AdEntity, (ad) => ad.category, { cascade: true, onDelete: "CASCADE" })
    ads: AdEntity[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date; 
}