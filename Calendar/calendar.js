const calendarGrid = document.getElementById("calendarGrid");
const monthYear = document.getElementById("monthYear");
const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");

let currentDate = new Date();

function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const today = new Date();

  const days = [];

  for (let i = 0; i < firstDay.getDay(); i++) {
    days.push("");
  }

  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(i);
  }

  calendarGrid.innerHTML = "";

  days.forEach(day => {
    const dayEl = document.createElement("div");
    dayEl.textContent = day;

    if (
      day == today.getDate() &&
      month == today.getMonth() &&
      year == today.getFullYear()
    ) {
      dayEl.classList.add("today");
    }

    calendarGrid.appendChild(dayEl);
  });

  const monthNames = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
  ];

  monthYear.textContent = `${monthNames[month]} ${year}`;
}

prevBtn.onclick = () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
};

nextBtn.onclick = () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
};

renderCalendar(currentDate);
