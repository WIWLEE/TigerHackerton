import React, { useState, useEffect } from 'react';
import './Todolist.css';
import AddTodolist from './AddTodolist.js';


const Todolist = () => {
  const [list, setLists] = useState([]); //list 상태 변수 정의
  const [loading, setLoading] = useState(true); 

  const getTodolists = () => {
    fetch("http://localhost:3001/todolists", {
      method: "get",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("응답 데이터:", json);
        if (json && json.length > 0) {
          setLists(json); 
        } else {
          setLists([{ description: "데이터가 비어 있습니다." }]);
        }
      })
      .catch((error) => {
        console.error("데이터 조회 오류:", error);
      });
  };

  const toggleCheck = (id, currentCheckStatus) => {

    console.log("Toggle ID:", id);

    if (!id) {
      console.error("ID가 정의되지 않았습니다:", id);
      return;
    }

    const updatedCheckStatus = currentCheckStatus === 1 ? 0 : 1; // 상태 반전

    fetch(`http://localhost:3001/update/todolist/${id}`, {
      method: "PUT", // 업데이트 요청
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ is_checked: updatedCheckStatus }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("Update response:", json);
        // 리스트 업데이트
        setLists(prevList =>
          prevList.map(item => 
            item.ID === id ? { ...item, is_checked: updatedCheckStatus } : item
          )
        );
      })
      .catch((error) => {
        console.error("Update error:", error);
      });
  };

 //화면이 렌더링될때 실행
  useEffect(() => {
    getTodolists();
    const now = new Date();
    const options = {
      year: 'numeric',  // Display the full numeric year (e.g., 2024)
      month: 'long',    // Display the full month name (e.g., November)
      day: 'numeric'    // Display the day of the month (e.g., 3)
  };
    const timeString = now.toLocaleTimeString('en-US', options);
    document.getElementById('currentTime').textContent = `${timeString}`
  }, []);



  return (
    <div>
      {/* <h1>Todolist Page</h1>
      <p>Welcome to the Todolist page!</p>
      <button onClick={postTodolist}>Submit</button>
      <h2>데이터 가져오기</h2>
      <button onClick={getTodolists}>가져오기</button> */}
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <div id="grid-container">
        <div id="img">
          <img class="img2" src="todo.jpeg" alt="Food Hygiene Background" />
        </div>
        <div id="content1">
          <h2>To Do List</h2>
          <h3 id='currentTime'>11/11/2024 10:38</h3>
          <h4>If you are an admin today <br />please read the below carefully and check your status</h4>
        </div>
        <div id="content2">
        <ul>
          {list.slice(0, 10).map(item => (
            <li key={item.ID}>
              <button
                onClick={() => {
                  console.log("Clicked on check");
                  toggleCheck(item.ID, item.is_checked);
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: item.is_checked === 1 ? "green" : "gray", // 체크 시 색상 변경
                  fontSize: "1rem",
                  fontWeight : "bold"
                }}
                aria-label="Toggle Check"
              >
                {item.is_checked === 1 ? "✓" : "○"} {/* 상태에 따른 표시 */}
              </button>
              {item.description} ~ <span id="color">{new Date(item.due_date).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>

        </div>
      </div>
      <div>
      <AddTodolist />
      </div>
    </div>
  );
};

export default Todolist;
