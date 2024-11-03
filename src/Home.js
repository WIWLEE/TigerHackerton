
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import Camera from './CameraPage.js';
import ViewFoodList from './ViewFoodList.js';
import './Home.css';
import Todolist from './Todolist.js';


const scrollCallBack = () =>{
    document.getElementById('scrollTarget').scrollIntoView()
  }

const Home = () => {
    const [testbody, setTestbody] = useState("");
    const [data, setData] = useState("");
  
    const handleChange = (e) => {
      setTestbody(e.target.value);
    };
  
    const postMaterial = () => {
      
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
  
  
    const getMaterials = () => {
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
    <div class = "container">
        <div id="header">
        </div>
        <div id="grid-container">
            <div class = "div2">
                <h2>Food Hygiene<br /> Management Service</h2>
                <h3>for Store Managers</h3>
                <Link to="ViewFoodList" class="button">REGISTRATION INQUIRY</Link><br />
                <Link to="Camera" class="button">PRODUCT REGISTRATION</Link><br />
            </div>
            <div>
                <img src="main.jpeg" alt="Food Hygiene Background"/>
            </div>
        </div>
        <div id = 'scrollTarget'>
            <Todolist />
        </div>

    </div>
  );
};



export default Home; // 반드시 default export를 사용하세요.