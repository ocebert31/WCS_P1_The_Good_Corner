import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";
import AdEntity from "./Ad.entity";

@Entity()
export default class TagEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({unique: true})
    label: string;

    //
    // @ManyToMany(() => AdEntity, (ad) => ad.tags)
    // ads: AdEntity[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date; 
}