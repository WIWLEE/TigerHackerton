const express = require("express"); 
const app = express();
const port = 3001; // react의 기본값은 3000이니까 3000이 아닌 아무 수
const cors = require("cors");
const bodyParser = require("body-parser");

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
})

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


app.get("/todolists", (req, res) => {
    const sql = "SELECT * FROM ToDoList"; // 모든 Material 데이터를 선택하는 쿼리

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