import { Repository } from "typeorm";
import { Voter } from "../entity/Voter";
import { AppDataSource } from "../data-source";

export default new class VoterService {
    private readonly VoterRepository: Repository<Voter> = AppDataSource.getRepository(Voter)
    async getOne(id: number): Promise<object | string> {
        try {
            const response = await this.VoterRepository.findOne({
                where: { id }, relations: ["user", "paslon"], select: {
                    user: {
                        fullName: true,
                        address: true,
                        gender: true
                    },
                    paslon: {
                        nama: true
                    }
                }
            });

            return {
                message: "success getting a Vote",
                data: response,
            };
        } catch (error) {
            return "message: something error while getting a Vote";
        }
    }

    async getAll(): Promise<object | string> {
        try {
            const response = await this.VoterRepository.find({
                relations: ["user", "paslon"], select: {
                    user: {
                        fullName: true,
                        address: true,
                        gender: true
                    },
                    paslon: {
                        nama: true
                    }
                }
            });

            return {
                message: "success getting all Vote",
                data: response,
            };
        } catch (error) {
            return "message: something error while getting all Vote";
        }
    }

    async getCountVoter(paslonId: number): Promise<object | string> {
        try {
            const response = await this.VoterRepository.count({
                where: { paslon: { id: paslonId } }, // Gunakan id paslon untuk mencari
                relations: ["user", "paslon"],
            });

            return {
                message: "success getting a Vote",
                data: response,
            };
        } catch (error) {
            return "message: something error while getting a Vote";
        }
    }

    async create(reqBody: any): Promise<object> {
        try {
            const voter = await this.VoterRepository.save(reqBody);

            return {
                message: "success creating a new Vote",
                data: voter,
            };
        } catch (error) {
            throw error;
        }
    }
    async update(id: number, data: any): Promise<object | string> {
        try {
            const response = await this.VoterRepository.update(id, data);
            return {
                message: "success updating a Vote",
                data: response,
            };
        } catch (error) {
            return "message: something error while updating a Vote";
        }
    }

    async delete(id: number): Promise<object | string> {
        try {
            const response = await this.VoterRepository.delete(id);

            return {
                message: "success deleting a Vote",
            };
        } catch (error) {
            return "message: something error while deleting a Vote";
        }
    }
}



