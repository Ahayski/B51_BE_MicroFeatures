import { Repository } from "typeorm";
import { Partai } from "../entity/Partai";
import { AppDataSource } from "../data-source";

export default new class PartaiService {
    private readonly PartaiRepository: Repository<Partai> = AppDataSource.getRepository(Partai)
    async find(): Promise<object> {
        try {
            const partais = await this.PartaiRepository
                .createQueryBuilder("partais")
                .getMany()

            return partais

        } catch (error) {
            throw error
        }
    }

    async getAll(): Promise<object | string> {
        try {
            const response = await this.PartaiRepository.find({
                relations: {
                    nourutPaslon: true,
                }, select: {
                    nourutPaslon: {
                        nama: true
                    }
                }
            });

            return {
                message: "success getting all Partai",
                data: response,
            };
        } catch (error) {
            return "message: something error while getting all Partai";
        }
    }
    async getOne(id: number): Promise<object | string> {
        try {
            const response = await this.PartaiRepository.findBy({ id });

            return {
                message: "success getting a Partai",
                data: response,
            };
        } catch (error) {
            return "message: something error while getting a Partai";
        }
    }

    async create(reqBody: any): Promise<object> {
        try {
            const partai = new Partai();
            console.log(reqBody);

            // Setiap properti pada reqBody akan di - set ke dalam objek partai
            Object.keys(reqBody).forEach((key) => {
                if (key === "visiMisi") {
                    // Jika properti merupakan array string, split berdasarkan newline
                    partai[key] = reqBody[key].split(",");
                } else {
                    partai[key] = reqBody[key];
                }
            });


            console.log("reqbodi : ", reqBody);
            const response = await this.PartaiRepository.save(partai);
            console.log("response", response);
            return {
                message: "success",
                data: response,
            };

        } catch (error) {
            throw error;
        }
    }

    async update(id: number, data: any): Promise<object | string> {
        try {
            const response = await this.PartaiRepository.update(id, data);
            return {
                message: "success updating a Partai",
                data: response,
            };
        } catch (error) {
            return "message: something error while updating a Partai";
        }
    }
    async delete(id: number): Promise<object | string> {
        try {
            const response = await this.PartaiRepository.delete(id);

            return {
                message: "success deleting a Partai",
            };
        } catch (error) {
            return "message: something error while deleting a Partai";
        }
    }
}



