import { Repository } from "typeorm";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";

export default new class UserService {
    private readonly UserRepository: Repository<User> = AppDataSource.getRepository(User)
    async delete(idUser: string): Promise<object | string> {
        try {
            const response = await this.UserRepository.delete(idUser)

            return {
                message: "success",
                data: response
            }
        } catch (error) {
            throw error
        }
    }

    async getAll(): Promise<object> {
        try {
            const paslons = await this.UserRepository
                .createQueryBuilder("paslons")
                .getMany()

            return paslons

        } catch (error) {
            throw error
        }
    }

    async getOne(id: number): Promise<object | string> {
        try {
            const response = await this.UserRepository.findOne({
                where:
                {
                    id: id
                }, select: [
                    "id",
                    "fullName",
                    "address",
                    "gender",
                    "userName"
                ]
            });

            return {
                message: "success getting a User",
                data: response,
            };
        } catch (error) {
            return "message: something error while getting a Peserta Pemilu";
        }
    }

    async update(id: number, data: any): Promise<object | string> {
        try {
            const response = await this.UserRepository.update(id, data);
            return {
                message: "success updating a User",
                data: response,
            };
        } catch (error) {
            return "message: something error while updating a User";
        }
    }
}



