import {PrimaryColumn, Column, Entity} from "typeorm";

@Entity("users")

export class UserEntity {
    @PrimaryColumn("uuid")
    id!: string;

    @Column()
    name!: string;

}