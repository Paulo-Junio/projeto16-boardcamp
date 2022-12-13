import connection from "../database/database.js";
import { RentsSchema } from "../models/rentsModels.js";

export const RentsValidation = async (req,res,next)=>{
    
    const rent = req.body;

    try{
        const {error} = RentsSchema.validate(rent);

        if (error){
            
            return res.sendStatus(400);
        }

        const clientExist = await connection.query("SELECT * FROM customers WHERE id=$1;",[rent.customerId]);
        
        if(!clientExist.rows[0]){
            return res.sendStatus(400);
        }

        const gameExist = await connection.query("SELECT * FROM games WHERE id=$1;",[rent.gameId])

        if(!gameExist.rows[0]){
            return res.sendStatus(400);
        }

        const gameStorage = await connection.query(`SELECT "stockTotal" FROM games WHERE id=$1;`,[rent.gameId]);

        const gamesRented= await connection.query(`SELECT * FROM rentals WHERE "gameId"=$1;`,[rent.gameId]);

        if(gameStorage.rows[0].stockTotal === gamesRented.rows.length ){

            return res.sendStatus(400);
        }

        res.locals.rent= rent;

    } catch(error){
        return res.status(500).send(error);
    }
    
    next();
}

export const RentsReturnValidation = async (req,res,next)=>{
    const id = req.params.id;

    try{
        const rent = await connection.query('SELECT "customerId", "gameId", "rentDate"::text, "daysRented", "returnDate", "originalPrice", "delayFee" FROM rentals WHERE id = $1;',[id]);

        if(!rent.rows[0]){
            return res.sendStatus(404)
        }

        if(rent.rows[0].returnDate != null){
            return res.sendStatus(400);
        }
        res.locals.rentReturn = rent.rows[0];
    } catch(error){
        return res.sendStatus(500);
    }

    next();
}

export const DeleteRentValidation = async (req,res,next)=>{
    const id = req.params.id;

    try{
        const rent = await connection.query('SELECT "customerId", "gameId", "rentDate"::text, "daysRented", "returnDate", "originalPrice", "delayFee" FROM rentals WHERE id = $1;',[id]);

        if(!rent.rows[0]){
            return res.sendStatus(404)
        }

        if(rent.rows[0].returnDate === null){
            return res.sendStatus(400);
        }
        res.locals.rentId = id;
    } catch(error){
        return res.sendStatus(500);
    }

    next();
}