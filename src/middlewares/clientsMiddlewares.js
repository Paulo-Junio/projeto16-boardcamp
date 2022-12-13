import connection from "../database/database.js";
import {ClientsSchema} from "../models/clientsModels.js";

export const ClientValidation = async (req,res,next)=>{
    
    const client = req.body;
    const id = req.params.id;

    try{
        const {error} = ClientsSchema.validate(client);

        if (error){
            return res.sendStatus(400);
        }

        const clientExist = await connection.query("SELECT * FROM customers WHERE cpf=$1;",[client.cpf])
        
        if(id){
            if(clientExist.rows[0] && id != clientExist.rows[0].id){
                return res.sendStatus(409);
            }
        } else{
            if(clientExist.rows[0]){
                return res.sendStatus(409);
            }
        }
        


        res.locals.client= client;

    } catch(error){
        return res.status(500).send(error);
    }
    
    next();
}