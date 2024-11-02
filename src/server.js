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
    password : "Lddqjsl0818!", //mysql의 password
    database : "FoodSafety", //사용할 데이터베이스
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

app.post("/register/material", (req, res) => {
    const data = req.body;

    // 객체의 키를 컬럼으로, 값을 각각의 바인딩 파라미터로 변환
    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const values = Object.values(data);

    const sql = `INSERT INTO Material (${columns}) VALUES (${placeholders})`;

    // 올바른 콜백 함수 작성
    connection.query(sql, values, (error, results) => {
        if (error) {
            console.log("실패");
            console.log(error);
            return res.status(500).send("데이터 삽입 실패"); // 에러 발생 시 클라이언트에 응답
        } else {
            console.log("성공");
            console.log(results);
            return res.send("데이터 삽입 성공"); // 성공 시 클라이언트에 응답
        }
    });
});

app.get("/materials", (req, res) => {
    const sql = "SELECT * FROM Material"; // 모든 Material 데이터를 선택하는 쿼리

    connection.query(sql, (error, results) => {
        if (error) {
            console.log("데이터 조회 실패");
            console.log(error);
            return res.status(500).send("데이터 조회 실패");
        } else {
           // console.log("데이터 조회 성공", results);
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