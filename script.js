const openBar = document.querySelector(".openBar");
const hideBar = document.querySelector(".hideBar");
const sideBar = document.querySelector(".side__bar");

// Opening side bar
openBar.addEventListener("click", () => {
  sideBar.style.display = "flex";
});

// Closing side bar
hideBar.addEventListener("click", () => {
  sideBar.style.display = "none";
});

// Scrolling
const scrollBtns = document.querySelectorAll("#scroll");

scrollBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();

    const href = btn.querySelector("a").getAttribute("href");

    document.querySelector(href).scrollIntoView({ behavior: "smooth" });
  });
});

// Slider
const slider = document.querySelectorAll(".slider");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

const sliderFunction = function () {
  let curSlide = 0;
  const slides = document.querySelectorAll(".slide");
  const maxSlide = slides.length;

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  const nextSlide = function () {
    curSlide = (curSlide + 1) % maxSlide;
    goToSlide(curSlide);
  };

  const prevSlide = function () {
    curSlide = (curSlide - 1 + maxSlide) % maxSlide;
    goToSlide(curSlide);
  };

  const init = function () {
    goToSlide(0);
  };
  init();

  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });
};
sliderFunction();

// Calendar
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const calendar = document.querySelector(".calendar");
const currentMonth = document.querySelector(".curMonth");
const currentYear = document.querySelector(".year");
const datesBtn = document.querySelectorAll(".dates button");
const calendarBtnLeft = document.querySelector(".fa-angle-left");
const calendarBtnRight = document.querySelector(".fa-angle-right");
const calendarDates = document.querySelector(".dates");

const date = new Date();
const curDay = date.getDate();
const curMonthConst = date.getMonth();
const curYearConst = date.getFullYear();

let curMonth = date.getMonth();
let curYear = date.getFullYear();

function generateDates(year, month) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  calendarDates.innerHTML = "";

  for (let i = 1; i <= daysInMonth; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    calendarDates.appendChild(button);
  }
}
generateDates(curYearConst, curMonthConst);

const updateCalendar = function () {
  const daysInMonth = new Date(curYear, curMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(curYear, curMonth, 1);
  const startingDay = firstDayOfMonth.getDay();

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  datesBtn.forEach((button, index) => {
    const buttonDate = index - startingDay + 1;
    const currentDate = new Date(curYear, curMonth, buttonDate);
    const today = new Date();

    if (buttonDate <= 0 || buttonDate > daysInMonth) {
      button.textContent = "";
    } else {
      button.textContent = buttonDate;
    }
  });

  const days = document.querySelectorAll(".days span");
  days.forEach((day, index) => {
    day.textContent = daysOfWeek[(index + startingDay) % 7];
  });
};

const currentDayMonthYearFunction = function () {
  currentMonth.insertAdjacentHTML("afterbegin", months[curMonth]);
  currentYear.insertAdjacentHTML("afterbegin", curYear);
};
currentDayMonthYearFunction();

// Changing months
calendarBtnLeft.addEventListener("click", function () {
  curMonth = curMonth - 1;

  if (curMonth < 0) {
    curMonth += 12;
    curYear -= 1;
  }

  currentMonth.textContent = months[curMonth];
  currentMonth.insertAdjacentHTML(
    "beforeend",
    ` <span class="year">${curYear}</span>`
  );
  generateDates(curYear, curMonth);
  initializeCalendar();
});

calendarBtnRight.addEventListener("click", function () {
  curMonth = curMonth + 1;

  if (curMonth > 11) {
    curMonth -= 12;
    curYear += 1;
  }

  currentMonth.textContent = months[curMonth];
  currentMonth.insertAdjacentHTML(
    "beforeend",
    ` <span class="year">${curYear}</span>`
  );
  generateDates(curYear, curMonth);
  initializeCalendar();
});

const dateSpan = document.querySelector(".date span");

// Function to initialize the calendar
const initializeCalendar = function () {
  const daysInMonth = new Date(curYear, curMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(curYear, curMonth, 1);
  const startingDay = firstDayOfMonth.getDay();

  calendarDates.innerHTML = "";

  const today = new Date();

  for (let i = 1; i <= daysInMonth; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    calendarDates.appendChild(button);

    button.addEventListener("click", () => {
      if (currentDate < today) {
        dateSpan.textContent = "No possibility to book this date!";
      } else {
        let html = `${button.textContent}.${curMonth + 1}.${curYear}`;
        dateSpan.textContent = "";
        dateSpan.insertAdjacentHTML("afterbegin", html);
      }
    });

    const currentDate = new Date(curYear, curMonth, i);

    if (
      currentDate.getDate() === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    ) {
      button.classList.add("today");
    }

    if (currentDate < today) {
      button.classList.add("past-date");
    } else {
      button.classList.add("future-date");
    }
  }
  updateCalendar();
};

document.addEventListener("DOMContentLoaded", function () {
  initializeCalendar();
});

// Forms input checker function
const names = document.querySelector("#name");
const surname = document.querySelector("#surname");
const phone = document.querySelector("#phone");
const email = document.querySelector("#email");
const submit = document.querySelector("#submit");
const nameOrder = document.querySelector(".order__message h1");
const dateOrder = document.querySelector(".order__message h3");

const nav = document.querySelector("nav");
const header = document.querySelector("header");
const about = document.querySelector(".about");
const haircutsSection = document.querySelector(".haircuts__section");
const orderSection = document.querySelector(".order__section");
const border = document.querySelector(".border");
const footer = document.querySelector("footer");
const getANewLookBtn = document.querySelector(".order button");
const getANewHaircutBtn = document.querySelector("#goToOrder");
const form = document.querySelector(".form");
const order__message = document.querySelector(".order__message");
const goBackBtn = document.querySelector(".goBack");

const goToOrderSection = function () {
  nav.style.display = "none";
  header.style.display = "none";
  about.style.display = "none";
  haircutsSection.style.display = "none";
  orderSection.style.display = "none";
  border.style.display = "none";
  footer.style.display = "none";
  calendar.style.display = "";
  form.style.display = "";
  goBackBtn.style.display = "";
};
getANewHaircutBtn.addEventListener("click", goToOrderSection);
getANewLookBtn.addEventListener("click", goToOrderSection);

// Going back to the main page
const backToMainPage = function () {
  let seconds = 4;

  const updateCountdown = setInterval(() => {
    document.getElementById("countdown").textContent = "";
    document.getElementById("countdown").textContent = seconds;
    console.log(document.getElementById("countdown"));

    seconds--;
    if (seconds === -1) {
      clearInterval(updateCountdown);

      nav.style.display = "";
      header.style.display = "";
      about.style.display = "";
      haircutsSection.style.display = "";
      orderSection.style.display = "";
      border.style.display = "";
      footer.style.display = "";
      order__message.style.display = "none";
      goBackBtn.style.display = "none";
      calendar.style.display = "none";
      form.style.display = "none";
    }
  }, 1000);
};

// Going back to the main page button
const backToMainPageBtn = function () {
  nav.style.display = "";
  header.style.display = "";
  about.style.display = "";
  haircutsSection.style.display = "";
  orderSection.style.display = "";
  border.style.display = "";
  footer.style.display = "";
  goBackBtn.style.display = "none";
  calendar.style.display = "none";
  form.style.display = "none";
};
goBackBtn.addEventListener("click", backToMainPageBtn);

// Checking email on footer
const emailFooter = document.querySelector(".form-control");
const emailBtnFooter = document.querySelector(".btn_get");

const checkFooterEmail = function (e) {
  e.preventDefault();
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(emailFooter.value)) {
    console.log("E-mail addres format is incorect!");
  } else {
    emailFooter.value = "";
  }
};
emailBtnFooter.addEventListener("click", checkFooterEmail);

const checkForms = function () {
  const namesVal = names.value;
  const surnamesVal = surname.value;
  const phoneVal = phone.value;
  const emailVal = email.value;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const selectedBarber = document.querySelector(".select-field").value;

  clearErrorMessages();

  if (
    namesVal.charAt(0) !== namesVal.charAt(0).toUpperCase() ||
    namesVal.slice(1) !== namesVal.slice(1).toLowerCase()
  ) {
    displayErrorMessage(names, "Correct name format: Barber");
  } else if (
    surnamesVal.charAt(0) !== surnamesVal.charAt(0).toUpperCase() ||
    surnamesVal.slice(1) !== surnamesVal.slice(1).toLowerCase()
  ) {
    displayErrorMessage(surname, "Correct surname format: Trimmer");
  } else if (phoneVal[3] !== " " || phoneVal[7] !== " ") {
    displayErrorMessage(phone, "Correct format: ### ### ###");
  } else if (!emailRegex.test(emailVal)) {
    displayErrorMessage(email, "Email address format is incorrect!");
  } else if (!dateSpan.textContent.trim()) {
    displayErrorMessage(
      document.querySelector(".date"),
      "Please select a date!"
    );
  } else if (!selectedBarber) {
    displayErrorMessage(
      document.querySelector(".select-field"),
      "Please select a barber!"
    );
  } else {
    names.value = "";
    surname.value = "";
    phone.value = "";
    email.value = "";
    orderDateFunction(dateSpan.textContent);
    dateSpan.textContent = "";
    orderNameFunction(namesVal);
    backToMainPage();
    order__message.style.display = "";
    calendar.style.display = "none";
    form.style.display = "none";
  }
};
console.log(dateSpan.textContent === "");

// Displaying error message next to the input field
function displayErrorMessage(inputField, message) {
  const errorMessage = document.createElement("div");
  errorMessage.classList.add("error-message");
  errorMessage.textContent = message;

  inputField.insertAdjacentElement("afterend", errorMessage);
}

// Clearing existing error messages
function clearErrorMessages() {
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((message) => message.remove());
}

submit.addEventListener("click", checkForms);

// Order name
const orderNameFunction = function (name) {
  nameOrder.insertAdjacentHTML("beforeend", ` ${name}!`);
};

// Order date
const orderDateFunction = function (date) {
  dateOrder.insertAdjacentHTML("beforeend", ` ${date}.`);
};
