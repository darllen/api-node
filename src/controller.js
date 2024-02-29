const responseModel = {
    success: false,
    data: [],
    error: []
}

const connection = require('./connection');

module.exports = {
    async create(req, res) {
        const response = {...responseModel}

        const { name, price, quantity } = req.body; 
        const [, affectedRows] = await connection.query(`INSERT INTO products (name, price, quantity) VALUES ('${name}', ${price}, ${quantity})`);   
    
        if (affectedRows >= 0) {
            response.success = true;
        }
        return res.json(response);
        
    }, 

    async getAll(req, res) {
        const [, data] = await connection.query(`SELECT * FROM products`);   
        return res.json(data);
    },

    async getProduct(req, res) {
        const aaa = req.params;
        id = aaa.id;

        const [, data] = await connection.query(`SELECT * FROM products WHERE id = ${id}`);   
        return res.json(data);
    },

    async update(req, res) {
        const { id, name, price, quantity } = req.body; 
        await connection.query(`UPDATE products SET name = '${name}', price = ${price}, quantity = ${quantity} WHERE id = ${id};`);   

        return res.json('Atualizado');
    }, 

    async delete(req, res) {
        const aaa = req.params;
        id = aaa.id;
        await connection.query(`DELETE FROM products WHERE id = ${id}`);  

        return res.json('Deletado');
    }, 

}