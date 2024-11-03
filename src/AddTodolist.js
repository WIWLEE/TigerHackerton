import React, { useState, useEffect } from 'react';
import './AddTodolist.css';


const AddTodolist = () => {
    const [list, setLists] = useState([]); //list 상태 변수 정의
    const [loading, setLoading] = useState(true);

    const postTodolist = () => {
      const year = document.getElementById("year").value;
      const month = document.getElementById("month").value; 
      const day = document.getElementById("day").value;
  
      if (year && month && day) {
          const dueDate = new Date(year, month - 1, day);
          const formattedDate = dueDate.toISOString().split('T')[0]; // "YYYY-MM-DD" 형식으로 변환
  
          // 태스크 값을 가져오기
          const tasks = [
              document.getElementById("task1").value,
              document.getElementById("task2").value,
              document.getElementById("task3").value,
          ];
  
          // 빈 값이 아닌 태스크만 필터링
          const validTasks = tasks.filter(task => task.trim() !== "");
  
          // 유효한 태스크가 있을 때만 포스트 수행
          validTasks.forEach((task, index) => {
              const post = {
                  is_checked: 0,
                  description: task,
                  due_date: formattedDate,
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
                      if (index === 0) {
                        alert("Registration Success!");
                    }
                  })
                  .catch((error) => {
                      console.error("Post error:", error);
                      alert("Error. Check Again");
                  });
          });
  
          // 태스크 입력 필드 초기화
          document.getElementById("task1").value = "";
          document.getElementById("task2").value = "";
          document.getElementById("task3").value = "";
      }
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
          <br /><br /><br />
          <h1>To Do List</h1>
            <div class="green-box">
                Select a due date, and fill in it.
            </div>
            <div>
                <img class="img3" src="todo2.jpeg" alt="todo2" />
            </div>
            <div class="white-box">
                <div class="todo-container">
                    <div class="tasks">
                        <div class="task">
                           <label for="task1">1</label>
                            <textarea id="task1" placeholder="1. Write here..."></textarea>
                        </div>
                        <div class="task">
                            <label for="task2">2</label>
                            <textarea id="task2" placeholder="2. Write here..."></textarea>
                        </div>
                        <div class="task">
                            <label for="task3">3</label>
                            <textarea id="task3" placeholder="3. Write here..."></textarea>
                        </div>
                        <br /><br />
                        <button class="submit" onClick={postTodolist}>Register</button>
                    </div>
                </div>
                <div class="calendar">
                    <div class="date-picker">
                    <label for="year">Year:</label>
                    <select id="year">
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                        <option value="2030">2030</option>
                    </select>

                    <label for="month">Month:</label>
                    <select id="month">
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>

                    <label for="day">Date:</label>
                    <select id="day">
                        <option value="1">1st</option>
                        <option value="2">2nd</option>
                        <option value="3">3rd</option>
                        <option value="4">4th</option>
                        <option value="5">5th</option>
                        <option value="6">6th</option>
                        <option value="7">7th</option>
                        <option value="8">8th</option>
                        <option value="9">9th</option>
                        <option value="10">10th</option>
                        <option value="11">11th</option>
                        <option value="12">12th</option>
                        <option value="13">13th</option>
                        <option value="14">14th</option>
                        <option value="15">15th</option>
                        <option value="16">16th</option>
                        <option value="17">17th</option>
                        <option value="18">18th</option>
                        <option value="19">19th</option>
                        <option value="20">20th</option>
                        <option value="21">21st</option>
                        <option value="22">22nd</option>
                        <option value="23">23rd</option>
                        <option value="24">24th</option>
                        <option value="25">25th</option>
                        <option value="26">26th</option>
                        <option value="27">27th</option>
                        <option value="28">28th</option>
                        <option value="29">29th</option>
                        <option value="30">30th</option>
                        <option value="31">31st</option>
                    </select>

                </div>
                </div>
            </div>
            <div class = "close">
              <p>U.S. federal regulations for restaurants and fast-food chains focus on stringent food safety practices, covering hygiene, safe food storage, cross-contamination prevention, and allergen management. Key regulations like the FDA Food Code and Food Safety Modernization Act (FSMA) mandate proactive safety protocols, employee hygiene standards, and regular health inspections. Recently, a notable E. coli outbreak occurred at McDonald's, traced to contaminated slivered onions on menu items. McDonald’s has since removed the affected onions, and experts consider the risk low. This incident highlights the importance of strong food safety standards, especially in large supply chains, to ensure public health across all levels.</p>
              <h4>Managing Restaurant food is simple with us<br />TigerHack in MIZZOU 2024</h4>
            </div>
        </div>
    );
};

export default AddTodolist;
