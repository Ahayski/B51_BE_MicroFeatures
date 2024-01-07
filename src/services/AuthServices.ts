import { Repository } from "typeorm";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export default new class AuthService {
    private readonly AuthRepository: Repository<User> = AppDataSource.getRepository(User)

    async register(reqBody: any): Promise<object | string> {
        try {

            const checkUserName = await this.AuthRepository.count({ where: { userName: reqBody.userName } })
            if (checkUserName > 0) return `Username: ${reqBody.userName} has already used`

            const hashPassword = await bcrypt.hash(reqBody.password, 10)
            const obj = this.AuthRepository.create({
                fullName: reqBody.fullName,
                address: reqBody.address,
                gender: reqBody.gender,
                userName: reqBody.userName,
                password: hashPassword
            })
            const resRegist = await this.AuthRepository.save(obj)

            return {
                message: "success",
                data: resRegist
            }
        } catch (error) {
            throw error;
        }
    }

    async login(reqBody: any): Promise<object | string> {
        try {
            const checkUserName = await this.AuthRepository.findOne({ where: { userName: reqBody.userName } })
            if (!checkUserName) return `Username: ${reqBody.userName} haven't registered`

            const comparePassword = await bcrypt.compare(reqBody.password, checkUserName.password)
            if (!comparePassword) return `Password is wrong`

            const obj = this.AuthRepository.create({
                id: checkUserName.id,
                fullName: checkUserName.fullName,
                address: checkUserName.address,
                gender: checkUserName.gender,
                userName: checkUserName.userName
            })

            const token = jwt.sign({ obj }, "MATIINMIC", { expiresIn: "8h" })

            return {
                message: "Login success",
                token
            }
        } catch (error) {
            return "something error while  loggin"
        }
    }
}



