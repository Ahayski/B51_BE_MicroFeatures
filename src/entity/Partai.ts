import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Paslon } from "./Paslon"

@Entity({ name: "partai" })
export class Partai {

    @PrimaryGeneratedColumn()
    id: number


    @ManyToOne(() => Paslon, (paslon) => paslon.koalisi, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    nourutPaslon: Paslon

    @Column()
    partaiImg: string

    @Column()
    nama: string

    @Column()
    ketuaUmum: string

    @Column("simple-array")
    visiMisi: string

    @Column()
    alamat: string

}
