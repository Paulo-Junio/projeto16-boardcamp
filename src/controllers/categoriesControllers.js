import connection from "../database/database.js";

export const GetCategories = async (req, res) => {
    try{

        const categories = await connection.query("SELECT * FROM categories;");

        return res.send(categories.rows)

    } catch(error){
        return res.sendStatus(500)
    }
}

export const PostCategories = async (req, res) => {
    try{
        const name = res.locals.name;

        await connection.query("INSERT INTO categories (name) VALUES ($1);", [name]);

        return res.sendStatus(201)

    } catch(error){
        return res.sendStatus(500)
    }
};


