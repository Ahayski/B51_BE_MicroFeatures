import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from "typeorm"
import { Article } from "./Article"
import { Voter } from "./Voter"

export type UserRoleType = "admin" | "editor" | "ghost"
@Entity({ name: "user" })
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fullName: string

    @Column()
    address: string

    @Column()
    gender: string

    @Column()
    userName: string

    @Column()
    password: string

    @Column({
        type: "enum",
        enum: ["admin", "editor", "ghost"],
        default: "ghost",
    })
    role: UserRoleType

    @OneToMany(() => Article, (article) => article.author, {
        onDelete: "CASCADE"
    })
    articles: Article[]

    @OneToOne(() => Voter, (Voter) => Voter.user, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    vote: Voter

}
