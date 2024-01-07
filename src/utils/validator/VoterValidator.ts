import * as Joi from "joi"

export const createVoterSchema = Joi.object({
    paslon: Joi.string().max(255).required()
})