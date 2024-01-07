import { AppDataSource } from "./data-source"
import * as express from "express";
import router from "./route";
import 'dotenv/config'

AppDataSource.initialize()
    .then(async () => {
        const app = express()

        app.use(express.json())
        app.use("/api/v1", router)

        app.listen(process.env.PORT, () => console.log("server running"))

    })
    .catch(error => console.log(error))
