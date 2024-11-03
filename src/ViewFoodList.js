import React, {Component} from 'react';
import './MaterialPage.css'; // CSS 파일을 import합니다.

class ViewFoodList extends Component{
  constructor(props){
    super(props);
    this.state = {
      foodList: [],
      imageUrls: [],
    };
  }
  
  componentDidMount()
  {
    this.fetchFoodList();
  }

  fetchFoodList = async () => {
    try{
      const response = await fetch('http://localhost:3001/foodlist');
      if(!response.ok)
      {
        throw new Error('Network slow');
      }
      const data = await response.json();
      this.setState({foodList:data},this.loadImages);
    } catch(error) {
      console.error("error", error);
    }
  };

  loadImages = async () => {
    const apiKey = "RsQnJqlcZckp4uAmdfEjEKaIMEimKujaNvUF7buM0Ug";
    const {foodList} = this.state;
    const imageUrls = { ...this.state.imageUrls }; // 현재 이미지 URL 상태를 복사

    for (const food of foodList) {
      try {
        // 동적 import를 사용하여 이미지 로드
        const imgModule = await import(`../img/${food.name}.jpg`);
        imageUrls[food.name] = imgModule.default; // 이미지 URL 저장
      } catch (error) {        
        try{
          const apiKey = process.env.UNSPLASH_ACCESS_KEY;
          const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${food.name}&client_id=${apiKey}`
          );
          const jsonResponse = await response.json();
          const imageUrl = jsonResponse.urls?.small;

          console.log(imageUrl);
          
          const saveResponse = await fetch('http://localhost:3001/save-image', {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              imageUrl: imageUrl,
              imageName: food.name,
            }),
          });

          imageUrls[food.name] = `../img/${food.name}.jpg` ; // 이미지 URL 저장
        } catch(error)
        {
          imageUrls[food.name] = "../img/default.jpg";
        }
      }
    }

    this.setState({ imageUrls }); // 상태 업데이트

  };

  render()
  {
    const {foodList, imageUrls} = this.state;

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString(); // 날짜를 YYYY/MM/DD 형식으로 반환
    };
    

    return(
      <div>
        {foodList.length > 0 ? (
          <div className='food-item-container'>
          {foodList.map((food, index) => (
            <div className="food-item">
              <img 
                src={imageUrls[food.name]} 
                alt={food.name}
                className="food-image"/>
              <div className='food-info'>
                <div className="food-name">{food.name}</div>
                <div className="food-date">{formatDate(food.entry_date)} - {formatDate(food.disposal_date)}</div>
                <div className="food-description">{food.food_description}</div>
                <div className="food-handling">{food.handling_description}</div>
              </div>
              <div className="food-stock">
                <div className='stock-quantity'>{food.stock_quantity}</div>
                <div className='storage-location'>{food.storage_location}</div>
              </div>
            </div>
          ))}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default ViewFoodList;