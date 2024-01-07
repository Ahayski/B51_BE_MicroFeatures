import * as Joi from "joi"

export const createPartaiSchema = Joi.object({
    partaiImg: Joi.string().max(255).required(),
    nama: Joi.string().max(255).required(),
    ketuaUmum: Joi.string().max(255).required(),
    visiMisi: Joi.string().max(255).required(),
    alamat: Joi.string().max(255).required()
})

export const updatePartaiSchema = Joi.object({
    nourutPaslon: Joi.string().max(255).required(),
    partaiImg: Joi.string().max(255).required(),
    nama: Joi.string().max(255).required(),
    ketuaUmum: Joi.string().max(255).required(),
    visiMisi: Joi.string().max(255).required(),
    alamat: Joi.string().max(255).required()
})