const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_password',  
    database: 'bestiary_db'   
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado ao banco de dados');
});

app.get('/getMonsterTypes', (req, res) => {
    const sql = `
        SELECT mt.id AS typeId, mt.nameMonsterType AS typeName, m.id AS monsterId, m.monsterName
        FROM monsterType mt
        LEFT JOIN monster m ON mt.id = m.fk_type
        ORDER BY mt.nameMonsterType, m.monsterName;
    `;
    db.query(sql, (err, results) => {
        if (err) throw err;

        const monsterTypes = {};
        results.forEach(row => {
            if (!monsterTypes[row.typeName]) {
                monsterTypes[row.typeName] = [];
            }
            monsterTypes[row.typeName].push({
                id: row.monsterId,
                name: row.monsterName
            });
        });

        res.json(monsterTypes);
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});