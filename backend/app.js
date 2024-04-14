const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 3000;

const client = new Client({
    user: '',
    host: '',
    database: '',
    password: '',
    port: 5432,
});
client.connect();


app.use(bodyParser.json());


app.get('/api/items', async(req, res) => {
    
    try{
        const result = await client.query('SELECT * FROM items');
        res.json(result.rows);
    } catch(error){
        console.log('ERRO AO BUSCAR ITEM: ', error);
        res.status(500).json({message: 'ERRO AO BUSCAR ITENS'})
    }
});

app.post('/api/items', async(req, res) => {
    const {name, description} = req.body;
    try{
        await client.query('INSERT INTO items(name,description) VALUES($1, $2)', [name, description]);
        res.json({message: 'Item adicionado com sucesso'});
    } catch(error){
        console.log('ERRO AO adicionar ITEM: ', error);
        res.status(500).json({message: 'ERRO AO adicionar ITENS'})
    }
});

app.put('/api/items/:id', async(req, res) => {
    const {id} = req.params;

    const {name, description} = req.body;
    try{
        await client.query('UPDATE items SET name= $1, description=$2 WHERE id=$3', [name, description, id])
        res.json({message:  'Item atualizado com sucesso'});
    }catch(error){
        console.log('ERRO AO atualizar ITEM: ', error);
        res.status(500).json({message: 'ERRO AO atualizar ITENS'});
    }
});


app.delete('/api/items/:id', async() => {
    const {id} = req.params;

    try{
        await client.query('DELETE FROM items WHERE id=$1', [id]);
        res.json({message: 'Item deletado com sucesso'});
    }catch(error){
        console.log('ERRO AO deLEtar ITEM: ', error);
        res.status(500).json({message: 'ERRO AO deletar ITENS'});
    }
});


app.listen(PORT, () => {console.log(`SERVIDOR RODANDO NA PORTA ${PORT}`)});