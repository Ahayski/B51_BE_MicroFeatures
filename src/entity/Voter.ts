import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm"
import { User } from "./User"
import { Paslon } from "./Paslon"

@Entity({ name: "voter" })
export class Voter {

    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => User, (user) => user.vote, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    @JoinColumn()
    user: User

    @ManyToOne(() => Paslon, (paslon) => paslon.vote, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    paslon: Paslon

}
