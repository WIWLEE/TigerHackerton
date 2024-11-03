import React, {
  useEffect,
  useRef,
  useState,
  Component
} from 'react';
import jsQR from 'jsqr';
import './CameraPage.css';
import { withRouter } from 'react-router-dom';


class CameraPage extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.canvasRef = React.createRef();
    this.state = {
      outputData: null,
      loadingMessage: "",
      errorMessage: "",
      activeContainer: 'file',
    };
  }

  componentDidMount() {
    const video = this.videoRef.current;
    const canvasElement = this.canvasRef.current;
    const canvas = canvasElement.getContext("2d");

    // 비디오 스트림 가져오기
    navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment"
        }
      })
      .then((stream) => {
        if (video.srcObject !== stream) {
          video.srcObject = stream;
          video.setAttribute("playsinline", true); // iOS Safari에서 전체화면 방지
          video.play().catch(error => {
            console.error("Error attempting to play video:", error);
          });
          this.tick(canvas, video); // 애니메이션 프레임 시작
        }
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
        this.setState({
          loadingMessage: "Error accessing camera. Please check your permissions."
        });
      });
  }

  tick(canvas, video) {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      this.setState({
        loadingMessage: ""
      });
      const canvasElement = this.canvasRef.current;

      if (canvasElement) {
        canvasElement.hidden = false;

        canvasElement.height = video.videoHeight;
        canvasElement.width = video.videoWidth;
        canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
        const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert"
        });

        if (code) {
          this.drawLine(canvas, code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
          this.drawLine(canvas, code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
          this.drawLine(canvas, code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
          this.drawLine(canvas, code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
          this.setState({
            outputData: code.data
          });
          video.pause();
          return;
        } 
        }
      }
    requestAnimationFrame(() => this.tick(canvas, video));
  }

  drawLine(canvas, begin, end, color) {
    canvas.beginPath();
    canvas.moveTo(begin.x, begin.y);
    canvas.lineTo(end.x, end.y);
    canvas.lineWidth = 4;
    canvas.strokeStyle = color;
    canvas.stroke();
  }

  handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = this.canvasRef.current;
          const context = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;

          context.drawImage(img, 0, 0);
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, canvas.width, canvas.height);

          if (code) {
            try {
              const parsedData = JSON.parse(code.data);
              this.setState({
                outputData: parsedData,
                errorMessage: '',
              });
              console.log(parsedData);
            } catch (error) {
              
            }
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  handleContainerClick = (container) => {
    if (this.state.activeContainer !== container) {
      // 활성화된 컨테이너가 바뀔 때 비디오 정지
      const video = this.videoRef.current;
      if (container === 'video') {
        video.play();
      } else {
        video.pause();
      }
    this.setState({ activeContainer: container});
  }};

  handleConfirm = async() => {
    const ImgData = this.state.outputData;
    try{
    for(let index=0;index<ImgData.length;index++)
      {
          const ingredient = ImgData[index];
          const requestData = {
              name: ingredient.name,
              food_description: ingredient.food_description,
              delivery_company_ID: ingredient.delivery_company_ID,
              handling_description: ingredient.handling_description,
              entry_date: ingredient.entry_date,
              disposal_date: ingredient.disposal_date,
              stock_quantity: ingredient.stock_quantity,
              storage_location: ingredient.storage_location
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
    } catch(error) {
      console.error('Error: ',error);
      alert("Error");
      window.location.reload();
    }

    this.props.history.push("/");


  };

  render() {
    const {activeContainer} = this.state;

    return ( 
      <div id = "camera-page-container" >
      <div id = "title" > Product Registration </div> 
      <div className = "loading-message" > {this.state.loadingMessage} </div> 
      <div id = "content-container" >
        <div id = "video-container"
          className={activeContainer === 'video' ? 'active' : 'inactive'}
          onClick={()=> this.handleContainerClick('video')}
        >
        <canvas id = "video" ref = {this.canvasRef} hidden > </canvas> 
        <div>
         </div> 
        </div> 
      <div id = "file-container" 
        className={activeContainer === 'file' ? 'active' : 'inactive'} 
        onClick={() => this.handleContainerClick('file')}
      >
        <input type = "file" onChange = {this.handleFileChange} accept = "image/*" disabled={activeContainer !== 'file'} />
        </div>
        <video ref = {this.videoRef} style = {{  display: "none"}} > </video>

      </div>
      {
          this.state.outputData && ( 
            <button onClick = {this.handleConfirm} >
            Confirm 
            </button>
          )
      } 
      </div>);
    }
  }

  export default CameraPage;