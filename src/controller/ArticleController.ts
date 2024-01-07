import { Request, Response, response } from "express";
import ArticleServices from "../services/ArticleServices";
import { createArticleSchema, updateArticleSchema } from "../utils/validator/ArticleValidator";
import cloudinary from "../libs/cloudinary";

export default new class ArticleControllers {
    async find(req: Request, res: Response) {
        try {
            const data = await ArticleServices.find()

            let response = {
                message: "Succes",
                data
            }
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const response = await ArticleServices.getAll();
            return res.status(200).json(response);
        } catch (error) {
            console.error("Error getting all articles:", error);
            return res
                .status(500)
                .json({ message: "Internal server error", error: error.message });
        }
    }
    async getOne(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            const response = await ArticleServices.getOne(id);
            return res.status(200).json(response);
        } catch (error) {
            console.error("Error creating a Article:", error);
            return res
                .status(500)
                .json({ message: "Internal server error", error: error.message });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const loginSession = res.locals.loginSession

            const data = {
                gambar: res.locals.filename,
                articleDate: req.body.articleDate,
                title: req.body.title,
                description: req.body.description
            }

            console.log("isi login", loginSession.obj)

            const { error, value } = createArticleSchema.validate(data)
            if (error) return res.status(400).json(error.details[0].message)


            cloudinary.upload()
            const cloudinaryRes = await cloudinary.destination(value.gambar)

            const obj = {
                gambar: cloudinaryRes.secure_url,
                articleDate: value.articleDate,
                title: value.title,
                description: value.description,
                author: {
                    id: loginSession.obj.id
                }
            }

            console.log("isi obj", obj)

            const response = await ArticleServices.create(obj)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return res.status(400).json({
                    message: "Invalid ID provided",
                    error: "Invalid input for type number"
                });
            }
            console.log(id);

            const data: any = req.body;

            // Pastikan req.file ada dan merupakan file gambar yang diunggah
            if (req.file && req.file.fieldname === 'gambar') {
                data.gambar = req.file.filename;
            }
            console.log(data);

            const { error, value } = updateArticleSchema.validate(data)
            if (error) return res.status(400).json(value)
            console.log("value", value);
            cloudinary.upload()
            const cloudinaryRes = await cloudinary.destination(value.gambar)

            const obj = {
                gambar: cloudinaryRes.secure_url,
                title: value.title,
                description: value.description,
            }
            console.log("obj", obj);
            const response = await ArticleServices.update(id, obj);
            console.log("ini response", response);
            return res.status(201).json(response);
        } catch (error) {
            console.error("Error updating a Article:", error);
            return res
                .status(500)
                .json({ message: "Internal server error", error: error.message });
        }
    }
    async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return res.status(400).json({
                    message: "Invalid ID provided",
                    error: "Invalid input for type number",
                });
            }

            const response = await ArticleServices.delete(id);
            return res.status(201).json(response);
        } catch (error) {
            console.error("Error deleting a Article:", error);
            return res
                .status(500)
                .json({ message: "Internal server error", error: error.message });
        }
    }
}