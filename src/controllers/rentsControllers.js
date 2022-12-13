import connection from "../database/database.js";
import dayjs from "dayjs";

export const GetRents = async (req, res) => {
    const gameId = req.query.gameId;
    const customerId = req.query.customerId;
    
    try{

        if(gameId) {
            const Rents = await connection.query(`SELECT rentals.id, rentals."customerId", rentals."gameId", rentals."rentDate"::text, rentals."daysRented", rentals."returnDate", rentals."originalPrice", rentals."delayFee", JSON_BUILD_OBJECT('id', customers.id, 'name', customers.name) AS customer, JSON_BUILD_OBJECT('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) AS game FROM rentals JOIN customers ON rentals."customerId" = customers.id JOIN games ON  rentals."gameId" = games.id JOIN categories ON games."categoryId" = categories.id WHERE rentals."gameId"=$1;`, [gameId]);

            return res.send(Rents.rows)
        } else if (customerId) {
            const Rents = await connection.query(`SELECT rentals.id, rentals."customerId", rentals."gameId", rentals."rentDate"::text, rentals."daysRented", rentals."returnDate", rentals."originalPrice", rentals."delayFee", JSON_BUILD_OBJECT('id', customers.id, 'name', customers.name) AS customer, JSON_BUILD_OBJECT('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) AS game FROM rentals JOIN customers ON rentals."customerId" = customers.id JOIN games ON  rentals."gameId" = games.id JOIN categories ON games."categoryId" = categories.id WHERE rentals."customerId"=$1;`, [customerId]);

            return res.send(Rents.rows)
        } else{

            const Rents = await connection.query(`SELECT rentals.id, rentals."customerId", rentals."gameId", rentals."rentDate"::text, rentals."daysRented", rentals."returnDate", rentals."originalPrice", rentals."delayFee", JSON_BUILD_OBJECT('id', customers.id, 'name', customers.name) AS customer, JSON_BUILD_OBJECT('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) AS game FROM rentals JOIN customers ON rentals."customerId" = customers.id JOIN games ON  rentals."gameId" = games.id JOIN categories ON games."categoryId" = categories.id;`);

            return res.send(Rents.rows)
        }

        
    } catch(error){
        return res.status(500).send(error)
    }
}

export const PostRents = async (req, res) => {
    
    try{
        const {customerId, gameId, daysRented } = res.locals.rent;

        const returnDate = null;
        const delayFee = null;

        const rentDate = dayjs().format('YYYY-MM-DD');

        const pricePerDay = await connection.query(`SELECT "pricePerDay" FROM games WHERE id=$1;`,[gameId]);

        const originalPrice = pricePerDay.rows[0].pricePerDay * daysRented;


        await connection.query(`INSERT INTO rentals("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7);`, [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee]);
        
        return res.sendStatus(201);

    } catch(error){
        return res.status(500).send(error);
    }
};

export const RentReturn = async (req,res)=>{
    const id = req.params.id;
    const rent = res.locals.rentReturn;
    
    try{
        const date = dayjs().format('YYYY-MM-DD');
        const delay = (new Date(date) - new Date(rent.rentDate))/ (1000 * 60 * 60 * 24);
        

        const pricePerDay = await connection.query(`SELECT "pricePerDay" FROM games WHERE id=$1;`,[rent.gameId]);
        

        let delayFee;
        if(delay > rent.daysRented){
            
            delayFee = (delay - rent.daysRented) * pricePerDay.rows[0].pricePerDay;
            
        }

        await connection.query('UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3',[date, delayFee, id]);

        return res.sendStatus(200);
        
    } catch(error){
        return res.status(500).send(error);
    }
};

export const DeleteRent = async (req,res) => {
    const rentId = res.locals.rentId;

    try{
        await connection.query(`DELETE FROM rentals WHERE id=$1;`, [rentId])

        return res.sendStatus(200)
    } catch(error) {
        return res.sendStatus(500)
    }
}