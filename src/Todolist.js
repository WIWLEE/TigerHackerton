import React, { useState } from 'react';

const Todolist = () => {
  const [data, setData] = useState("");
  const [is_checked, setIsChecked] = useState();
  const [description, setDescription] = useState("")
  const [due_date, setDueDate] = useState("")

  const postTodolist = () => {
    
    const post = {
      is_checked : data,
      description : description,
      due_date  : due_date,
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
        console.log("응답 데이터:", json); // 전체 응답 데이터 출력
        if (json && json.length > 0) {
          // 데이터가 있을 경우 첫 번째 항목의 description으로 설정
          setDescription(json[0].description || "No description available");
        } else {
          setDescription("데이터가 비어 있습니다.");
        }
      })
      .catch((error) => {
        console.error("데이터 조회 오류:", error);
      });
  };


  return (
    <div>
      <h1>Todolist Page</h1>
      <p>Welcome to the Todolist page!</p>
      <button onClick={postTodolist}>Submit</button>
      <br /><br /><br /><br /><br />
      <h2>데이터 가져오기</h2>
      <h3>{description}</h3>
      <button onClick={getTodolists}>가져오기</button>

      <ol>
        <li>
          {/* 항목 추가 가능 */}
        </li>
      </ol>
    </div>
  );
};

export default Todolist;
