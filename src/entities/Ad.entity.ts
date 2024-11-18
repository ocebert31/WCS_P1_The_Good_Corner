import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable} from "typeorm";
import CategoryEntity from "./Category.entity";
import TagEntity from "./Tag.entity";

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

    @ManyToOne(() => CategoryEntity, (category) => category.ads, { onDelete: "CASCADE" })
    category: CategoryEntity;

    //
    // @ManyToMany(() => TagEntity, (tag) => tag.ads, { cascade: true })
    // @JoinTable() 
    // tags: TagEntity[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}