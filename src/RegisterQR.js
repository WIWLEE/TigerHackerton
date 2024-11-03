import React, {Component} from "react";
import {Link} from "react-router-dom";


//https://tysoso.tistory.com/39 QR Code Reading Study

export default class RegisterQR extends Component {
    

    render() {
        return (
          <div>
            <h1>Register QR</h1>
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