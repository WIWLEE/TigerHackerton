import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './Home.js';
import Todolist from './Todolist.js';
import RegisterQR from './RegisterQR.js';
import ViewFoodList from './ViewFoodList.js';

export default class App extends Component {
 
  render() {
    return (
      <Router>
        <div className="main">
          <nav>
            <Link to="/ViewFoodList">ViewFoodList</Link> | <Link to="/RegisterQR">RegisterQR</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Routes>
            <Route path="/" element={<Todolist />} /> {/* 오타 제거 */}
          </Routes>

        </div>
      </Router>
    )
  }
}