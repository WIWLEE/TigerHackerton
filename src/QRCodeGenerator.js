import React, { Component } from 'react';
import {QRCodeCanvas} from 'qrcode.react';

class QRCodeGenerator extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            ingredients :[],
            name: '',
            deliveryCompanyID: '',
            entryDate: '',
            disposalDate: '',
            stockQuantity: '',
            qrValue: '',
        };
    }

    handleAddIngredient =() =>
    {
        const { name, deliveryCompanyID, entryDate, disposalDate, stockQuantity } = this.state;
        const newIngredient = {
            name,
            delivery_company_ID: deliveryCompanyID,
            entry_date: entryDate,
            disposal_date: disposalDate,
            stock_quantity: stockQuantity,
        };

        this.setState(prevState => ({
            ingredients: [...prevState.ingredients, newIngredient],
            name: '',
            deliveryCompanyID: '',
            entryDate: '',
            disposalDate: '',
            stockQuantity: '',
        }));
    };


    handleGenerateQRCode = () => {
        const { ingredients } = this.state;
        this.setState({ qrValue: JSON.stringify(ingredients) }); // 재료 배열을 JSON 문자열로 변환
    };

    render(){
        const { ingredients, qrValue } = this.state;
        return(
            <div style={{ textAlign: 'center', margin: '20px' }}>
        <h2>Multi Ingredient QR Code Generator</h2>
        
        <input
          type="text"
          value={this.state.name}
          onChange={(e) => this.setState({ name: e.target.value })}
          placeholder="Ingredient Name"
          style={{ padding: '10px', margin: '5px', width: '300px' }}
        />
        <input
          type="text"
          value={this.state.deliveryCompanyID}
          onChange={(e) => this.setState({ deliveryCompanyID: e.target.value })}
          placeholder="Delivery Company ID"
          style={{ padding: '10px', margin: '5px', width: '300px' }}
        />
        <input
          type="date"
          value={this.state.entryDate}
          onChange={(e) => this.setState({ entryDate: e.target.value })}
          style={{ padding: '10px', margin: '5px', width: '300px' }}
        />
        <input
          type="date"
          value={this.state.disposalDate}
          onChange={(e) => this.setState({ disposalDate: e.target.value })}
          style={{ padding: '10px', margin: '5px', width: '300px' }}
        />
        <input
          type="number"
          value={this.state.stockQuantity}
          onChange={(e) => this.setState({ stockQuantity: e.target.value })}
          placeholder="Stock Quantity"
          style={{ padding: '10px', margin: '5px', width: '300px' }}
        />
        
        <button onClick={this.handleAddIngredient} style={{ padding: '10px', margin: '10px' }}>
          Add Ingredient
        </button>
        <button onClick={this.handleGenerateQRCode} style={{ padding: '10px', margin: '10px' }}>
          Generate QR Code
        </button>

        <div style={{ margin: '20px' }}>
          {qrValue && (
            <QRCodeCanvas
              value={qrValue}
              size={256}
              style={{ margin: '20px auto' }}
            />
          )}
        </div>
        
        <h3>Ingredients List</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient.name} - {ingredient.delivery_company_ID} - {ingredient.entry_date} - {ingredient.disposal_date} - {ingredient.stock_quantity}
            </li>
          ))}
        </ul>
      </div> 
        );
    }
}

export default QRCodeGenerator;