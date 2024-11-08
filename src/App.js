import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import './App.css';
import Home from './Home.js';
import RegisterQR from './RegisterQR.js';
import ViewFoodList from './ViewFoodList.js';
import CameraPage from './CameraPage.js';
import QRcodeGenerator from './QRCodeGenerator.js';
import QRImageSubmit from './QRImageSubmit.js';


export default class App extends Component {
  state = {
    testbody : "",
    data : "",
  }

  handleChange =(e)=>{
    this.setState({
      [e.target.name] : e.target.value,
    });
  }

  submitId = ()=>{
    const post ={
      test : this.state.testbody,
    };
   
    fetch("http://localhost:3001/idplz", {
      method : "post", // 통신방법
      headers : {
        "content-type" : "application/json",
      },
      body : JSON.stringify(post),
    })
    .then((res)=>res.json())
    .then((json)=>{
      this.setState({
        testbody : json.text,
      });
    });
  };

  onCall =()=>{
    fetch("http://localhost:3001/callbody",{
      method:"post",
      headers : {
        "content-type" : "application/json",
      },
      body : JSON.stringify(),
    })
    .then((res)=>res.json())
    .then((json)=>{
      this.setState({
        data : json.test_body,
      });
    });
  };
  render() {
    return (
      <Router>

      <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ViewFoodList"  element={<ViewFoodList />} />
        <Route path="/RegisterQR" element={<RegisterQR />} />
        <Route path="/QRImageSubmit" element={<QRImageSubmit />} />
        <Route path="/Camera" element={<CameraPage />} />
        <Route path="/QRCodeGenerator" element={<QRcodeGenerator />} />
      </Routes>
      </div>
    </Router>
    )
  }
}