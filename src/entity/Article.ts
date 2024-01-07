import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity({ name: "article" })
export class Article {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    gambar: string

    @Column("date")
    articleDate: string

    @Column()
    title: string

    @Column()
    description: string

    @ManyToOne(() => User, (user) => user.articles, {
        onDelete: "CASCADE"
    })
    author: User

}
