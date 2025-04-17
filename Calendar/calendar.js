const calendarGrid = document.getElementById("calendarGrid");
const monthYear = document.getElementById("monthYear");
const prevBtn =
::contentReference[oaicite:0]{index=0}
 
const calendarGrid = document.getElementById("calendarGrid");
const monthYear = document.getElementById("monthYear");
const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const taskText = document.getElementById("taskText");
const taskPriority = document.getElementById("taskPriority");
const saveTask = document.getElementById("saveTask");
const taskList = document.getElementById("taskList");
const modalTitle = document.getElementById("modalTitle");

let currentDate = new Date();
let selectedDate = null;

const dayNames = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  monthYear.textContent = `${date.toLocaleString("ru-RU", { month: "long" })} ${year}`;
  calendarGrid.innerHTML = "";

  dayNames.forEach(day => {
    const el = document.createElement("div");
    el.textContent = day;
    el.classList.add("day-name");
    calendarGrid.appendChild(el);
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    calendarGrid.appendChild(empty);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");
    cell.textContent = day;
    cell.dataset.date = `${year}-${month + 1}-${day}`;
    cell.onclick = () => openModal(cell.dataset.date);
    cell.onmouseenter = () => cell.style.background = "#eef5ff";
    cell.onmouseleave = () => cell.style.background = "";
    calendarGrid.appendChild(cell);
  }
}

function openModal(dateStr) {
  selectedDate = dateStr;
  modalTitle.textContent = `Задача на ${dateStr}`;
  taskText.value = "";
  taskPriority.value = "normal";
  modal.classList.add("show");
  modal.style.display = "flex";
}

function closeModalFunc() {
  modal.classList.remove("show");
  modal.style.display = "none";
}

function saveTaskFunc() {
  if (!taskText.value) return;
  const task = {
    text: taskText.value,
    priority: taskPriority.value,
    date: selectedDate,
    id: Date.now()
  };

  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  closeModalFunc();
  renderTasks();
}

function renderTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const item = document.createElement("li");
    item.innerHTML = `
      <span style="font-weight: 500;">${task.date}</span> — ${task.text}
      <span class="priority ${task.priority}">●</span>
      <button onclick="editTask(${task.id})">✏️</button>
      <button onclick="deleteTask(${task.id})">❌</button>
    `;
    taskList.appendChild(item);
  });
}

function deleteTask(id) {
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks = tasks.filter(t => t.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function editTask(id) {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  selectedDate = task.date;
  modalTitle.textContent = `Редактировать задачу`;
  taskText.value = task.text;
  taskPriority.value = task.priority;

  modal.style.display = "flex";
  saveTask.onclick = () => {
    task.text = taskText.value;
    task.priority = taskPriority.value;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    closeModalFunc();
    renderTasks();
  };
}

prevBtn.onclick = () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
};

nextBtn.onclick = () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
};

closeModal.onclick = closeModalFunc;
saveTask.onclick = saveTaskFunc;

renderCalendar(currentDate);
renderTasks();
