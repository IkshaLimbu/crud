const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();


app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "curd"
})

app.get('/', (req, res) =>{
    res.json("Hello from Backend");
})

app.get('/user', (req, res) =>{
    const q = "SELECT * FROM users"
    db.query(q, (err, data) =>{
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post('/user', (req, res) => {
    const q = "INSERT INTO users (`name`, `address`, `age`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.address,
        req.body.age,
    ];

    db.query(q, [values], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json({ data, message: "User has been created successfully" });
    });
});

app.delete('/user/:id', (req, res) =>{
    const userId = req.params.id;
    const q = "DELETE FROM users WHERE id =?"

    db.query(q, [userId], (err, data) =>{
        if (err){
            return res.json("User has been deleted sccessfully");
        }
    })
})

app.put('/user/:id', (req, res) => {
    const userId = req.params.id;
    const q = "UPDATE users SET name = ?, address = ?, age = ? WHERE id = ?";
    const values = [
        req.body.name,
        req.body.address,
        req.body.age,
    ];
    db.query(q, [...values, userId], (err, data) => {
        if (err) return res.json(err);
        return res.json({ message: "User has been updated successfully" });
    });
});


app.listen(4004, () =>{
    console.log('Port running on 4004...');
})