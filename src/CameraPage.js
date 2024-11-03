import React, {useEffect,useRef,useState,Component} from 'react';
import jsQR from 'jsqr';
import './CameraPage.css'

class CameraPage extends Component{
    constructor(props)
    {
        super(props);
        this.videoRef = React.createRef();
        this.canvasRef = React.createRef();
        this.state = {
            outputData:"",
        };
    }

    componentDidMount() {
        const video = this.videoRef.current;
        const canvasElement = this.canvasRef.current;
        const canvas = canvasElement.getContext("2d");
    
        // 비디오 스트림 가져오기
        navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
          .then((stream) => {
            if(video.srcObject !== stream)
            {
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
        this.setState({ loadingMessage: "Error accessing camera. Please check your permissions." });
          });
      }

    tick(canvas, video) {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        this.setState({ loadingMessage: "" });
        const canvasElement = this.canvasRef.current;
        canvasElement.hidden = false;

        canvasElement.height = video.videoHeight;
        canvasElement.width = video.videoWidth;
        canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
        const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: "dontInvert" });

        if (code) {
        this.drawLine(canvas, code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
        this.drawLine(canvas, code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
        this.drawLine(canvas, code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
        this.drawLine(canvas, code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
        this.setState({ outputData: code.data });
        } else {
        this.setState({ outputData: "No QR code detected." });
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

    render()
    {
        return(
        <div id="camera-page-container">
            <div id="title">Product Registration</div>
            <div className="loading-message">{this.state.loadingMessage}</div>
            <canvas id="video" ref={this.canvasRef} hidden></canvas>
            <div>
              <div>{this.state.outputData || "No QR code detected."}</div>
            </div>
            <video ref={this.videoRef} style={{ display: "none" }}></video>
          </div>);
    }
}

export default CameraPage;