import { Repository } from "typeorm";
import { Paslon } from "../entity/Paslon";
import { AppDataSource } from "../data-source";

export default new class PaslonService {
    private readonly PaslonRepository: Repository<Paslon> = AppDataSource.getRepository(Paslon)
    async find(): Promise<object> {
        try {
            const paslons = await this.PaslonRepository
                .createQueryBuilder("paslons")
                .getMany()

            return paslons

        } catch (error) {
            throw error
        }
    }

    async getAll(): Promise<object | string> {
        try {
            const response = await this.PaslonRepository.find({
                relations: {
                    koalisi: true,
                }, select: {
                    koalisi: {
                        nama: true
                    }
                }
            });

            return {
                message: "success getting all Paslon",
                data: response,
            };
        } catch (error) {
            return "message: something error while getting all Paslon";
        }
    }
    async getOne(id: number): Promise<object | string> {
        try {
            const response = await this.PaslonRepository.findBy({ id });

            return {
                message: "success getting a Paslon",
                data: response,
            };
        } catch (error) {
            return "message: something error while getting a Paslon";
        }
    }

    async create(reqBody: any): Promise<object> {
        try {
            const paslon = new Paslon();

            // Setiap properti pada reqBody akan di-set ke dalam objek Paslon
            Object.keys(reqBody).forEach((key) => {
                if (key === "visiMisi") {
                    // Jika properti merupakan array string, split berdasarkan newline
                    paslon[key] = reqBody[key].split(",");
                } else {
                    paslon[key] = reqBody[key];
                }
            });

            await this.PaslonRepository.save(paslon);

            return {
                message: "success",
                data: paslon,
            };
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, data: any): Promise<object | string> {
        try {
            const response = await this.PaslonRepository.update(id, data);
            return {
                message: "success updating a Paslon",
                data: response,
            };
        } catch (error) {
            return "message: something error while updating a Paslon";
        }
    }
    async delete(id: number): Promise<object | string> {
        try {
            const response = await this.PaslonRepository.delete(id);

            return {
                message: "success deleting a Paslon",
            };
        } catch (error) {
            return "message: something error while deleting a Paslon";
        }
    }
}



