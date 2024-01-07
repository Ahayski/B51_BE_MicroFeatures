import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from "typeorm"
import { Article } from "./Article"
import { Voter } from "./Voter"

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
