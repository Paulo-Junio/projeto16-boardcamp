import joi from "joi";

export const ClientsSchema = joi.object({
    name: joi.string().required().min(1),
    phone: joi.string().required().min(10).max(11),
    cpf: joi.string().required().min(11).max(11),
    birthday: joi.date().required(),
});
