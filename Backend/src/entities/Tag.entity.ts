import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export default class TagEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({unique: true})
    label: string;

    @Column({
        unique: true,
        transformer: {
          to: (value: string) => value.toLowerCase(),
          from: (value: string) => value,
        },
      })

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date; 
}