import { Request, Response, response } from "express";
import PartaiServices from "../services/PartaiServices";
import { createPartaiSchema, updatePartaiSchema } from "../utils/validator/PartaiValidator";
import cloudinary from "../libs/cloudinary";

export default new class PartaiControllers {
    async find(req: Request, res: Response) {
        try {
            const data = await PartaiServices.find()

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
            const response = await PartaiServices.getAll();
            return res.status(200).json(response);
        } catch (error) {
            console.error("Error getting all Partai:", error);
            return res
                .status(500)
                .json({ message: "Internal server error", error: error.message });
        }
    }
    async getOne(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            const response = await PartaiServices.getOne(id);
            return res.status(200).json(response);
        } catch (error) {
            console.error("Error getting a Partai:", error);
            return res
                .status(500)
                .json({ message: "Internal server error", error: error.message });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const data = {
                partaiImg: res.locals.filename,
                nama: req.body.nama,
                ketuaUmum: req.body.ketuaUmum,
                visiMisi: req.body.visiMisi,
                alamat: req.body.alamat
            }
            const { error, value } = createPartaiSchema.validate(data)
            if (error) return res.status(400).json(error.details[0].message)


            cloudinary.upload()
            const cloudinaryRes = await cloudinary.destination(value.partaiImg)

            const obj = {
                nourutPaslon: {
                    id: parseInt(req.body.nourutPaslon, 10),
                },
                partaiImg: cloudinaryRes.secure_url,
                nama: value.nama,
                ketuaUmum: value.ketuaUmum,
                visiMisi: value.visiMisi,
                alamat: value.alamat
            }
            const response = await PartaiServices.create(obj)
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
            console.log(id);

            const data: any = req.body;

            // Pastikan req.file ada dan merupakan file gambar yang diunggah
            if (req.file && req.file.fieldname === 'partaiImg') {
                data.partaiImg = req.file.filename;
            }
            console.log("ini req body", req.body);

            const { error, value } = updatePartaiSchema.validate(data, { abortEarly: false });

            if (error) {
                return res.status(400).json({
                    message: "Validation error",
                    errors: error.details.map((detail) => detail.message),
                });
            }

            console.log("value", value);

            cloudinary.upload()
            const cloudinaryRes = await cloudinary.destination(value.partaiImg)

            const obj = {
                nourutPaslon: {
                    id: parseInt(req.body.nourutPaslon, 10),
                },
                partaiImg: cloudinaryRes.secure_url,
                nama: value.nama,
                ketuaUmum: value.ketuaUmum,
                visiMisi: value.visiMisi,
                alamat: value.alamat
            }
            console.log("obj ini", obj);

            const response = await PartaiServices.update(id, obj);
            return res.status(201).json(response);
        } catch (error) {
            console.error("Error updating a Partai:", error);
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

            const response = await PartaiServices.delete(id);
            return res.status(201).json(response);
        } catch (error) {
            console.error("Error deleting a Partai:", error);
            return res
                .status(500)
                .json({ message: "Internal server error", error: error.message });
        }
    }
}