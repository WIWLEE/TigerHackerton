import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './Home.js';
import RegisterQR from './RegisterQR.js';
import ViewFoodList from './ViewFoodList.js';

export default class App extends Component {
 
  render() {
    return (
      <Router>
      <div>
        <nav>
          <Link to="/ViewFoodList">ViewFoodList</Link> | <Link to="/RegisterQR">RegisterQR</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
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
