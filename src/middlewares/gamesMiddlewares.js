import connection from "../database/database.js";
import { GamesSchema } from "../models/gamesModels.js";

export const GamesValidation = async (req,res,next)=>{
    
    const game = req.body;

    try{
        const {error} = GamesSchema.validate(game);

        if (error){
            
            return res.sendStatus(400);
        }

        const categoryExist = await connection.query("SELECT * FROM categories WHERE id=$1;",[game.categoryId])
        
        if(!categoryExist.rows[0]){
            return res.sendStatus(400);
        }

        const gameExist = await connection.query("SELECT * FROM games WHERE name =$1;",[game.name])

        if(gameExist.rows[0]){
            return res.sendStatus(409);
        }

        res.locals.game= game;

    } catch(error){
        return res.status(500).send(error);
    }
    
    next();
}