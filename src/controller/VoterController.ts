import { Request, Response } from "express";
import VoterServices from "../services/VoterServices";
import { createVoterSchema } from "../utils/validator/VoterValidator";

export default new class VoterControllers {
    async getOne(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            const response = await VoterServices.getOne(id);
            return res.status(200).json(response);
        } catch (error) {
            console.error("Error getting a Vote:", error);
            return res
                .status(500)
                .json({ message: "Internal server error", error: error.message });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const response = await VoterServices.getAll();
            return res.status(200).json(response);
        } catch (error) {
            console.error("Error getting all Vote:", error);
            return res
                .status(500)
                .json({ message: "Internal server error", error: error.message });
        }
    }

    async getCountVoter(req: Request, res: Response) {
        try {
            const paslonId = parseInt(req.params.id, 10);
            const jumlahVote = await VoterServices.getCountVoter(paslonId);

            res.status(200).json({ jumlahVote });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const loginSession = res.locals.loginSession

            const data = {
                user: {
                    id: loginSession.obj.id
                },
                paslon: {
                    id: req.body.paslon
                }
            }
            const response = await VoterServices.create(data)
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
            const data = req.body;
            const response = await VoterServices.update(id, data);
            return res.status(201).json(response);
        } catch (error) {
            console.error("Error updating a Vote:", error);
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

            const response = await VoterServices.delete(id);
            return res.status(201).json(response);
        } catch (error) {
            console.error("Error deleting a Vote:", error);
            return res
                .status(500)
                .json({ message: "Internal server error", error: error.message });
        }
    }
}