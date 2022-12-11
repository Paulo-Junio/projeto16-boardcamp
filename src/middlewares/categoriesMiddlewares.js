import connection from "../database/database.js";
import { CategoriesSchema } from "../models/categoriesModels.js";

export const CategoreisValidation = async (req,res,next)=>{
    const category = req.body;

    try{
        const {error} = CategoriesSchema.validate(category);

        if (error){
            return res.sendStatus(400);
        }

        const categoryExist = await connection.query("SELECT * FROM categories WHERE name =$1;",[category.name])

        if(categoryExist.rows[0]){
            return res.sendStatus(409);
        }

        res.locals.name = category.name;

    } catch(error){
        return res.sendStatus(500)
    }
    
    next();
}