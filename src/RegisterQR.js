import React, {Component} from "react";
import {Link} from "react-router-dom";


//https://tysoso.tistory.com/39 QR Code Reading Study

export default class RegisterQR extends Component {

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

    render() {
        return (
          <div>
            <h1>Register QR</h1>
            <button onClick={this.submitQRInfo}>Submit QR Info</button>
            <Link to="/camera">
                <button>Go to Camera</button>
            </Link>
          </div>
        );
      }
}