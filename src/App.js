import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './Home.js';
import RegisterQR from './RegisterQR.js';
import ViewFoodList from './ViewFoodList.js';

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

  submitQRInfo = () => {
    const requestData = {
        name: 'Cucumber',
        food_description: 'Fresh cucumber for salads.',
        delivery_company_ID: 1,
        handling_description: 'Keep refrigerated.',
        entry_date: '2024-01-01',
        disposal_date: '2024-01-15',
        stock_quantity: 50,
        storage_location: 'Storage Room 1'
    };

    fetch("http://localhost:3001/info", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // Capitalize 'Content-Type'
        },
        body: JSON.stringify(requestData)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json(); // Parse the JSON response
    })
    .then(data => {
        console.log('Success:', data); // Handle the response data
    })
    .catch(error => {
        console.error('Error:', error); // Log the error
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
        <nav>
          <Link to="ViewFoodList">ViewFoodList</Link> | <Link to="RegisterQR">RegisterQR</Link>
        </nav>
        <Routes>
          <Route 
              path="/" 
              element={<Home submitQRInfo={this.submitQRInfo} />} // submitQRInfo 함수를 props로 전달
            />
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
      </div>
    </Router>
      // <div>
        
      //   <input onChange={this.handleChange} name ="testbody"/>
      //   <button onClick = {this.submitId}>Submit</button>
      //   <h1>{this.state.testbody}</h1>
      //   <br/><br/><br/><br/><br/>
      //   <h2>데이터가져오기</h2>
      //   <h3>{this.state.data}</h3>
      //   <button onClick={this.onCall}>가져오기</button>
      // </div>
    )
  }
}
