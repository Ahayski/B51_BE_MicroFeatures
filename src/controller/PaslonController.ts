import { Request, Response, response } from "express";
import PaslonServices from "../services/PaslonServices";
import { createPaslonSchema } from "../utils/validator/PaslonValidator";
import cloudinary from "../libs/cloudinary";

export default new class PaslonControllers {
    async find(req: Request, res: Response) {
        try {
            const data = await PaslonServices.find()

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
            const response = await PaslonServices.getAll();
            return res.status(200).json(response);
        } catch (error) {
            console.error("Error getting all Paslon:", error);
            return res
                .status(500)
                .json({ message: "Internal server error", error: error.message });
        }
    }
    async getOne(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            const response = await PaslonServices.getOne(id);
            return res.status(200).json(response);
        } catch (error) {
            console.error("Error getting a Paslon:", error);
            return res
                .status(500)
                .json({ message: "Internal server error", error: error.message });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const data = {
                nama: req.body.nama,
                paslonImg: res.locals.filename,
                noUrut: req.body.noUrut,
                visiMisi: req.body.visiMisi,
                // koalisi: req.body.koalisi
            }
            const { error, value } = createPaslonSchema.validate(data)
            if (error) return res.status(400).json(error.details[0].message)


            cloudinary.upload()
            const cloudinaryRes = await cloudinary.destination(value.paslonImg)

            const obj = {
                nama: value.nama,
                paslonImg: cloudinaryRes.secure_url,
                noUrut: value.noUrut,
                visiMisi: value.visiMisi,
                // koalisi: value.koalisi
            }
            const response = await PaslonServices.create(obj)
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
                    error: "Invalid input for type number",
                });
            }
            const data: any = req.body;

            // Pastikan req.file ada dan merupakan file gambar yang diunggah
            if (req.file && req.file.fieldname === 'paslonImg') {
                data.paslonImg = req.file.filename;
            }

            const { error, value } = createPaslonSchema.validate(data);
            if (error) return res.status(400).json(value);

            cloudinary.upload()
            const cloudinaryRes = await cloudinary.destination(value.paslonImg)

            const obj = {
                nama: value.nama,
                paslonImg: cloudinaryRes.secure_url,
                noUrut: value.noUrut,
                visiMisi: value.visiMisi,
                // koalisi: value.koalisi
            }

            const response = await PaslonServices.update(id, obj);
            return res.status(201).json(response);
        } catch (error) {
            console.error("Error updating a Paslon:", error);
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

            const response = await PaslonServices.delete(id);
            return res.status(201).json(response);
        } catch (error) {
            console.error("Error deleting a Paslon:", error);
            return res
                .status(500)
                .json({ message: "Internal server error", error: error.message });
        }
    }
}