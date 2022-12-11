import joi from "joi";

export const GamesSchema = joi.object({
    name: joi.string().required().min(1),
    image: joi.string().required().min(1),
    stockTotal: joi.number().required().min(1),
    pricePerDay: joi.number().required().min(1),
    categoryId: joi.number().required(),
    
});