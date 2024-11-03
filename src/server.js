const express = require("express"); 
const app = express();
const port = 3001; // react의 기본값은 3000이니까 3000이 아닌 아무 수
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require('axios');
const fs = require('fs');
const path = require('path');


//--여기부터 mySQL ----
const mysql = require("mysql2"); // mysql 모듈 사용

var connection = mysql.createConnection({
    host : "127.0.0.1",
    user : 'root', //mysql의 id
    password : "dbwls6bnqhv", //mysql의 password
    database : "foodsafety", //사용할 데이터베이스
    port : 3306
});

connection.connect();
//--여기까지 mySQL ----


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) =>{
    res.send('혁이는 코딩 중!')
});

app.post('/save-image', async (req,res) => {
    console.log("데이터 검색 중");
    const {imageUrl, imageName} = req.body;
    const filePath = path.join(__dirname,'..', 'img');

    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);
    }

    const imagePath = path.join(filePath, `${imageName}.jpg`);

    try {
        const response = await axios({
            url: imageUrl,
            method: 'GET',
            responseType: 'stream',
        });

        // 이미지 파일 저장
        const writer = fs.createWriteStream(imagePath);
        response.data.pipe(writer);

        writer.on('finish', () => {
            res.json({ success: true, message: 'Image saved successfully.' });
        });

        writer.on('error', (error) => {
            console.error('Failed to save image:', error);
            res.status(500).json({ success: false, message: 'Failed to save image.' });
        });
    } catch (error) {
        console.error('Failed to download image:', error);
        res.status(500).json({ success: false, message: 'Failed to download image.' });
    }

});

app.post("/idplz", (req,res)=>{
    const test = req.body.test;
    // console.log(req.body);
    connection.query("INSERT INTO test (test_body) values (?)",[test],
    function(err,rows,fields){
        if(err){
            console.log("실패");
            // console.log(err);
        }else{
            console.log("성공");
            // console.log(rows);
        };
    });
});

app.post("/info",(req,res)=>{
    const { name, food_description, delivery_company_ID, handling_description, 
        entry_date, disposal_date, stock_quantity, storage_location } = req.body;
    
    const sql = `INSERT INTO Material (name, food_description, delivery_company_ID, handling_description, entry_date, disposal_date, stock_quantity, storage_location) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    connection.query(sql, [name, food_description, delivery_company_ID, handling_description, entry_date, disposal_date, stock_quantity, storage_location], (error, results) => {
        if (error) {
            console.error('Error inserting data:', error);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Material added successfully', materialId: results.insertId });
    });
})

app.get('/foodlist', async (req, res) => {
    const sql = 'SELECT name, food_description, handling_description, entry_date, disposal_date, stock_quantity, storage_location FROM material';

    connection.query(sql, (err,results) => {
        if(err){
            console.err("err",err);
        }
        res.json(results);
    }); 

});

app.get("/todolists", (req, res) => {
    const sql = "SELECT * FROM ToDoList WHERE due_date > UTC_TIMESTAMP()"; // all list after now

    connection.query(sql, (error, results) => {
        if (error) {
            console.log("데이터 조회 실패");
            console.log(error);
            return res.status(500).send("데이터 조회 실패");
        } else {
           console.log("데이터 조회 성공", results);
            return res.json(results); // 조회된 데이터를 클라이언트에 JSON 형식으로 반환
        }
    });
});

app.post("/register/todolist",(req,res)=>{
    const { is_checked, description, due_date } = req.body;
    
    const sql = `INSERT INTO ToDoList (is_checked, description, due_date) VALUES (?, ?, ?)`;

    connection.query(sql, [is_checked, description, due_date], (error, results) => {
        if (error) {
            console.error('Error inserting data:', error);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'ToDoList added successfully'});
    });
})


app.post("/callbody", (req,res)=>{
    connection.query("SELECT * FROM test",
    function(err,rows,fields){
        if(err){
            console.log("불러오기 실패");
        }else{
            console.log("불러오기 성공");
            res.send(rows[0]);
        }
    })
})

app.listen(port, ()=>{
    console.log(`Connect at http://localhost:${port}`);
})