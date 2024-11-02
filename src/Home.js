import React, { useState } from 'react';

const Home = () => {
  const [testbody, setTestbody] = useState("");
  const [data, setData] = useState("");

  const handleChange = (e) => {
    setTestbody(e.target.value);
  };

  const registerMaterial = () => {
    
    const post = {
      name : "Test2",
      food_description : "asdf",
      delivery_company_ID : 1,
      handling_description : 'Keep in a dry place.',
      entry_date : '2024-01-15', 
      disposal_date : '2026-01-15',
      stock_quantity : '5',
      storage_location : 'Storage Room 2'
    };

    fetch("http://localhost:3001/register/material", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        setTestbody(json.text);
      });
  };


  const fetchMaterials = () => {
        fetch("http://localhost:3001/materials", {
            method: "get", // GET 요청
            headers: {
                "content-type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((json) => {
            console.log("응답 데이터:", json); // 전체 응답 데이터 출력
            if (json && json.length > 0) {
                console.log(json[0].name); // name 출력
                setData(json[1].name);
            } else {
                console.log("데이터가 비어 있습니다."); // 빈 배열 확인
            }
        })
        .catch((error) => {
            console.error("데이터 조회 오류:", error);
        });
    };



  
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the Home page!</p>

      <input onChange={handleChange} name="testbody" />
      <button onClick={registerMaterial}>Submit</button>
      <h1>{testbody}</h1>
      <br /><br /><br /><br /><br />
      <h2>데이터가져오기</h2>
      <h3>{data}</h3>
      <button onClick={fetchMaterials}>가져오기</button>

      <ol>
        <li>
          {/* 항목 추가 가능 */}
        </li>
      </ol>
    </div>
  );
};

export default Home;
