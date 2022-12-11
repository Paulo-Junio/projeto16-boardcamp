import connection from "../database/database.js";

export const GetGames = async (req, res) => {

    const gameName = req.query.name;


    try{

        if(!gameName){
            const games = await connection.query(`SELECT games.id, games.name, games.image, games."stockTotal", games."categoryId", games."pricePerDay", categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id;`);

            return res.send(games.rows)

        } else {
            const gameSelected = await connection.query(`SELECT games.id, games.name, games.image, games."stockTotal", games."categoryId", games."pricePerDay", categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id WHERE games.name LIKE $1;`, [gameName + "%"]);

            return res.send(gameSelected.rows)

        }

        

    } catch(error){
        return res.status(500).send(error)
    }
}

export const PostGames = async (req, res) => {
    
    try{
        const {name, image, stockTotal, categoryId, pricePerDay} = res.locals.game;

        await connection.query(`INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);`, [name, image, stockTotal, categoryId, pricePerDay]);
        
        return res.sendStatus(201);

    } catch(error){
        return res.status(500).send(error);
    }
};
