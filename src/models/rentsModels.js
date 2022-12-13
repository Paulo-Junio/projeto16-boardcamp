import joi from "joi";

export const RentsSchema = joi.object({
    customerId: joi.number().required(),
    gameId: joi.number().required(),
    daysRented: joi.number().required().min(1),
});