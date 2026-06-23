let tasks =
JSON.parse(localStorage.getItem("tasks"))
|| [];

const taskList =
document.getElementById("taskList");

/* QUOTES */

const quotes = [

  "Discipline beats motivation.",

  "Dream big. Start small.",

  "Success is built daily.",

  "Consistency creates success.",

  "Focus on progress, not perfection."

];

document.getElementById("quote")
.innerText =
quotes[Math.floor(Math.random()*quotes.length)];

/* DATE & TIME */

function updateDateTime(){

  const now = new Date();

  document.getElementById(
    "dateTime"
  ).innerText =
  now.toLocaleString();

}

setInterval(updateDateTime,1000);

updateDateTime();

/* SAVE */

function saveTasks(){

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );

}

/* RENDER */

function renderTasks(filteredTasks = tasks){

  taskList.innerHTML = "";

  filteredTasks.forEach((task,index)=>{

    const div =
    document.createElement("div");

    div.className =
    task.completed
    ? "task completed"
    : "task";

    div.innerHTML = `

      <div>

        <h3>${task.name}</h3>

        <p>📌 ${task.remark}</p>

      </div>

      <div>

        <button
        onclick="toggleTask(${index})">

        ✔

        </button>

        <button
        onclick="deleteTask(${index})">

        ❌

        </button>

      </div>

    `;

    taskList.appendChild(div);

  });

  document.getElementById(
    "totalTasks"
  ).innerText = tasks.length;

  document.getElementById(
    "completedTasks"
  ).innerText =

  tasks.filter(
    task => task.completed
  ).length;

  document.getElementById(
    "pendingTasks"
  ).innerText =

  tasks.filter(
    task => !task.completed
  ).length;

  let percent =
  tasks.length === 0
  ? 0
  : Math.round(

    (
      tasks.filter(
        task => task.completed
      ).length

      / tasks.length

    ) * 100

  );

  document.getElementById(
    "progress"
  ).style.width =
  percent + "%";

  document.getElementById(
    "progressText"
  ).innerText =
  percent + "% Completed";

}

/* ADD TASK */

function addTask(){

  const taskInput =
  document.getElementById("taskInput");

  const remarkInput =
  document.getElementById("remarkInput");

  if(taskInput.value.trim() === "")
  return;

  tasks.push({

    name: taskInput.value,

    remark: remarkInput.value,

    completed:false

  });

  taskInput.value = "";

  saveTasks();

  renderTasks();

  alert("Task Added Successfully ✅");

}

/* TOGGLE */

function toggleTask(index){

  tasks[index].completed =
  !tasks[index].completed;

  saveTasks();

  renderTasks();

}

/* DELETE */

function deleteTask(index){

  tasks.splice(index,1);

  saveTasks();

  renderTasks();

}

/* SEARCH */

function searchTasks(){

  const search =
  document.getElementById(
    "searchInput"
  ).value.toLowerCase();

  const filtered =
  tasks.filter(task =>

    task.name.toLowerCase()
    .includes(search)

  );

  renderTasks(filtered);

}

/* TIMER */

let time = 1500;

let timerInterval;

function updateTimer(){

  let minutes =
  Math.floor(time/60);

  let seconds =
  time%60;

  document.getElementById(
    "timer"
  ).innerText =

  `${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;

}

function startTimer(){

  clearInterval(timerInterval);

  timerInterval = setInterval(()=>{

    if(time > 0){

      time--;

      updateTimer();

    }

  },1000);

}

function resetTimer(){

  clearInterval(timerInterval);

  time = 1500;

  updateTimer();

}

updateTimer();

/* GOAL */

function setGoal(){

  const goal =
  document.getElementById(
    "goalInput"
  ).value;

  if(goal === "") return;

  document.getElementById(
    "goalHours"
  ).innerText = goal + "h";

  document.getElementById(
    "goalText"
  ).innerText =

  "Today's Goal: "
  + goal +
  " Hours Study";

}

renderTasks();