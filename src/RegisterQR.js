import React, {Component} from "react";
import {Link} from "react-router-dom";
import './MaterialPage.css';


//https://tysoso.tistory.com/39 QR Code Reading Study

export default class RegisterQR extends Component {
    

    render() {
        return (
          <div>
            <div id="header">
            <Link to="/">
                <button type="button" class= "HomeButton">HOME</button>
            </Link>
            </div>
            <h1>Register QR</h1>
            <button onClick={this.submitQRInfo}>Submit QR Info</button>
            <Link to="/camera">
                <button>Go to Camera</button>
            </Link>
            <Link to="/QRCodeGenerator">
                <button>Go to QR Generate</button>
            </Link>
            <Link to="/QRImageSubmit">
                <button>QR Image</button>
            </Link>
          </div>
        );
      }
}