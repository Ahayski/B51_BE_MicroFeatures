import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Partai } from "./Partai"
import { Voter } from "./Voter"

@Entity({ name: "paslon" })
export class Paslon {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nama: string

    @Column()
    paslonImg: string

    @Column()
    noUrut: number

    @Column("simple-array")
    visiMisi: string

    @OneToMany(() => Partai, (partai) => partai.nourutPaslon, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    koalisi: Partai[]

    @OneToMany(() => Voter, (Voter) => Voter.paslon, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    }
    )
    vote: Voter

}
