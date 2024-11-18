import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne} from "typeorm";
import CategoryEntity from "./Category.entity";

@Entity({ name: "ads"})
export default class AdEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column() 
    title: string;

    @Column() 
    description: string;

    @Column({type: "float"})
    price: number;

    @Column()
    picture: string;

    @Column() 
    location: string;

    @Column()
    author: string;

    // @ManyToOne(() => CategoryEntity, (c) => c.ads )
    // category: CategoryEntity;

    @ManyToOne(() => CategoryEntity, (category) => category.ads, { onDelete: "CASCADE" })
    category: CategoryEntity;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}