import React, {useEffect,useRef,useState,Component} from 'react';
import jsQR from 'jsqr';
import './MaterialPage.css'; 

class CameraPage extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            result:null,
            ingredient: [],
            foodDescriptions: [],
            handlingDescriptions: [],
            storageLocations: [],
        };
    }

    handleFileChange = (event) => {
        const file = event.target.files[0];
        if(file)
        {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    
                    context.drawImage(img, 0, 0);
                    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                    const code = jsQR(imageData.data, canvas.width, canvas.height);

                    if(code)
                    {
                        try{
                            const parsedData = JSON.parse(code.data);
                            this.setState({ 
                                result: parsedData,  
                                errorMessage: '',
                                foodDescriptions: Array(parsedData.length).fill(''),  
                                handlingDescriptions: Array(parsedData.length).fill(''),
                                storageLocations: Array(parsedData.length).fill(''),
                            });
                            console.log(parsedData);
                        } catch(error){
                            this.setState({ result: null, errorMessage: 'QR 코드의 데이터 형식이 잘못되었습니다.' });
                        }
                    }
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }

    };

    handleInputChange = (index, type, value) => {
        this.setState(prevState => {
            const newState = { ...prevState };
            if (type === 'food') {
                newState.foodDescriptions[index] = value;
            } else if (type === 'handling') {
                newState.handlingDescriptions[index] = value;
            } else if (type === 'storage') {
                newState.storageLocations[index] = value;
            }
            return newState;
        });
    };

    isFormValid = () => {
        const { foodDescriptions, handlingDescriptions, storageLocations } = this.state;
        return foodDescriptions.every(desc => desc) && 
               handlingDescriptions.every(desc => desc) && 
               storageLocations.every(loc => loc);
    };


    handleSubmit = async() => {
        const ImgData = this.state.result;
        const FoodDes = this.state.foodDescriptions;
        const HandDes = this.state.handlingDescriptions;
        const StorLoc = this.state.storageLocations;

        for(let index=0;index<ImgData.length;index++)
        {
            const ingredient = ImgData[index];
            const requestData = {
                name: ingredient.name,
                food_description: FoodDes[index],
                delivery_company_ID: ingredient.delivery_company_ID,
                handling_description: HandDes[index],
                entry_date: ingredient.entry_date,
                disposal_date: ingredient.disposal_date,
                stock_quantity: ingredient.stock_quantity,
                storage_location: StorLoc[index]
            };

            const res = await fetch("http://localhost:3001/info", {
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
            })
            .then(data => {
                console.log('Success:', data); // Handle the response data
            })
            .catch(error => {
                console.error('Error:', error); // Log the error
            });
        }

        console.log("제출 완료:", this.state);

      
    };

    render()
    {
        const {result} = this.state;
        return(<div style={{ fontFamily: "'Ropa Sans', sans-serif", color: "#333", maxWidth: "640px", margin: "0 auto", position: "relative" }}>
            <div>QR 코드 이미지 제출</div>
            <div>
            
            </div>
            <input type="file" onChange={this.handleFileChange} accept="image/*"/>
            {result && (
                <div className="result-grid">
                    {result.map((ingredient, index) => (
                        <div key={index} className="ingredient-inputs">
                            <div>{ingredient.name} {ingredient.stock_quantity}</div>
                            <div className = "input-container">
                                <label>
                                    Food Description:
                                    <input 
                                        type="text"
                                        value={this.state.foodDescriptions[index] || ""}
                                        onChange={(e)=>this.handleInputChange(index, 'food', e.target.value)}
                                    />
                                </label>
                            </div>
                            <div className = "input-container">
                                <label>
                                    Handling Description:
                                    <input 
                                        type="text"
                                        value={this.state.handlingDescriptions[index] || ""}
                                        onChange={(e)=>this.handleInputChange(index, 'handling', e.target.value)}
                                    />
                                </label>
                            </div>
                            <div className = "input-container">
                                <label>
                                    Storage Location:
                                    <input 
                                        type="text"
                                        value={this.state.storageLocations[index] || ""}
                                        onChange={(e)=>this.handleInputChange(index, 'storage', e.target.value)}
                                    />
                                </label>
                            </div>
                        </div>
                    ))}
                    <button 
                        onClick={this.handleSubmit} 
                        className="submit-button"
                        disabled={!this.isFormValid()}
                        >
                        제출
                    </button>
                </div>        
            )}
          </div>);
    }
}

export default CameraPage;