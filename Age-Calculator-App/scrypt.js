const dayEle = document.getElementById("day");
const monthEle = document.getElementById("month");
const yearEle = document.getElementById("year");

const dayValueEle = document.getElementById("days-value");
const monValuethEle = document.getElementById("months-value");
const yearValueEle = document.getElementById("years-value");

const dayErrorEle = document.getElementById("day-error");
const monErrorthEle = document.getElementById("month-error");
const yearErrorEle = document.getElementById("year-error");

const calculateBtnEle = document.getElementById("age-calculate-btn");

let day, month, year;

dayEle.addEventListener("change", (e) => {
  if (/^\d+$/.test(e.target.value)) {
    day = Number(e.target.value);
    dayEle.value = Number(e.target.value);
  } else {
    day = "";
    dayEle.value = "";
  }
});

monthEle.addEventListener("change", (e) => {
  if (/^\d+$/.test(e.target.value)) {
    month = Number(e.target.value);
    monthEle.value = Number(e.target.value);
  } else {
    month = "";
    monthEle.value = "";
  }
});

yearEle.addEventListener("change", (e) => {
  if (/^\d+$/.test(e.target.value)) {
    year = Number(e.target.value);
    yearEle.value = Number(e.target.value);
  } else {
    year = "";
    yearEle.value = "";
  }
});

function validateDay() {
  const dayInput = dayEle;
  const dayError = dayErrorEle;
  const day = parseInt(dayInput.value, 10);
  const maxDaysInMonth = new Date(year, month, 0).getDate();
  const currentDate = new Date();

  if (!day) {
    dayError.innerHTML = "This field is required";
    return false;
  }

  if (isNaN(day) || day < 1 || day > 31 || day > maxDaysInMonth) {
    dayError.innerHTML = "Must be a valid day";
    return false;
  }

  if (
    year === currentDate.getFullYear() &&
    month === currentDate.getMonth() + 1 &&
    day > currentDate.getDate()
  ) {
    dayError.innerHTML = "Must be a valid day";
    return false;
  }

  dayError.innerHTML = "";
  return true;
}

function validateMonth() {
  const monthInput = monthEle;
  const monthError = monErrorthEle;
  const month = parseInt(monthInput.value, 10);
  const currentDate = new Date();

  if (!month) {
    monthError.innerHTML = "This field is required";
    return false;
  }

  if (isNaN(month) || month < 1 || month > 12) {
    monthError.innerHTML = "Must be a valid month";
    return false;
  }

  if (
    year === currentDate.getFullYear() &&
    month > currentDate.getMonth() + 1
  ) {
    monthError.innerHTML = "Must be a valid month";
    return false;
  }

  monthError.innerHTML = "";
  return true;
}

function validateYear() {
  const yearInput = yearEle;
  const yearError = yearErrorEle;
  const inputYear = parseInt(yearInput.value, 10);
  const currentDate = new Date();

  if (!inputYear) {
    yearError.innerHTML = "This field is required";
    return false;
  }

  if (isNaN(inputYear) || inputYear < 0 || inputYear > 9999) {
    yearError.innerHTML = "Must be a valid year";
    return false;
  }

  if (inputYear > currentDate.getFullYear()) {
    yearError.innerHTML = "Must be a valid year";
    return false;
  }

  yearError.innerHTML = "";
  return true;
}

function claculateAgeHandler() {
  let isValid = true;
  isValid = validateDay() && isValid;
  isValid = validateMonth() && isValid;
  isValid = validateYear() && isValid;

  if (isValid) {
    calculateAge();
  } else {
    dayValueEle.innerHTML = "- - ";
    monValuethEle.innerHTML = "- - ";
    yearValueEle.innerHTML = "- - ";
  }
}

function calculateAge() {
  // Get the input day, month, and year values
  const inputDay = day;
  const inputMonth = month;
  const inputYear = year;

  // Create Date objects for the input date and the current date
  const inputDate = new Date(inputYear, inputMonth - 1, inputDay);
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const ageInMilliseconds = currentDate - inputDate;

  // Convert milliseconds to years, months, and days
  const msPerYear = 1000 * 60 * 60 * 24 * 365.25; // Average milliseconds per year
  const ageYears = Math.floor(ageInMilliseconds / msPerYear);

  const msPerMonth = msPerYear / 12; // Average milliseconds per month
  const ageMonths = Math.floor((ageInMilliseconds % msPerYear) / msPerMonth);

  // Calculate the number of days
  const ageDays = Math.floor(
    (ageInMilliseconds % msPerMonth) / (1000 * 60 * 60 * 24)
  );

  dayValueEle.innerHTML = ageDays;
  monValuethEle.innerHTML = ageMonths;
  yearValueEle.innerHTML = ageYears;
}
