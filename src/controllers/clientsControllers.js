import connection from "../database/database.js";

export const GetClients = async (req, res) => {

    const cpf = req.query.cpf;


    try{

        if(!cpf){
            const clients = await connection.query(`SELECT id, name, phone, cpf, birthday::text FROM customers;`);

            return res.send(clients.rows)

        } else {
            const clientsSelected = await connection.query(`SELECT id, name, phone, cpf, birthday::text  FROM customers WHERE cpf LIKE $1;`, [cpf + "%"]);

            return res.send(clientsSelected.rows)

        }
   

    } catch(error){
        return res.status(500).send(error)
    }
}

export const GetClientById = async (req, res) => {

    const id = req.params.id;


    try{

            const client = await connection.query(`SELECT * FROM customers WHERE id=$1;`, [id]);

            if(!client.rows[0]){
                return res.sendStatus(404)
            }

            return res.send(client.rows[0])


    } catch(error){
        return res.status(500).send(error)
    }
}


export const PostClient = async (req, res) => {
    const {name, phone, cpf, birthday} = res.locals.client;
    try{

        await connection.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);`, [name, phone, cpf, birthday]);
        
        return res.sendStatus(201);

    } catch(error){
        return res.status(500).send(error);
    }
};

export const UpdateClient = async (req, res) => {
    const id = req.params.id;
    const {name, phone, cpf, birthday} = req.body;

    try{

        await connection.query(`UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5;`, [name, phone, cpf, birthday, id]);
        
        return res.sendStatus(200);

    } catch(error){
        return res.status(500).send(error);
    }
};