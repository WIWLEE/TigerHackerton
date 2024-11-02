import React, { useState, useEffect } from 'react';
import './Todolist.css';

const Todolist = () => {
  const [list, setLists] = useState([]); //list 상태 변수 정의
  const [loading, setLoading] = useState(true); 

  const postTodolist = () => {
    const post = {
      is_checked: 0,
      description: "test",
      due_date: "2024-08-18",
    };

    fetch("http://localhost:3001/register/todolist", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("Post response:", json);
      })
      .catch((error) => {
        console.error("Post error:", error);
      });
  };

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

 //화면이 렌더링될때 실행
  useEffect(() => {
    getTodolists();
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
          <img src="todo.jpeg" alt="Food Hygiene Background" />
        </div>
        <div id="content1">
          <h2>To Do List</h2>
          <h3>11/11/2024 10:38</h3>
          <h4>If you are an admin today <br />please read the below carefully and check your status</h4>
        </div>
        <div id="content2">
        <ul>
            {list.map(item => (
              <li key={item.id}>
              {item.description} ~ {new Date(item.due_date).toLocaleDateString()}
            </li>
            ))}
        </ul>   
        </div>
      </div>
    </div>
  );
};

export default Todolist;
