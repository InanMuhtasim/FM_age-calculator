const submitButtonEl = document.getElementById("submit-btn");
const inputs = document.querySelectorAll("input");

const dayInputEl = document.getElementById("day-info");
const monthInputEl = document.getElementById("month-info");
const yearInputEl = document.getElementById("year-info");

const daysOutput = document.getElementById("days-output");
const monthsOutput = document.getElementById("months-output");
const yearsOutput = document.getElementById("years-output");

const daysError = document.getElementById("error-day");
const monthsError = document.getElementById("error-month");
const yearsError = document.getElementById("error-year");

const currentDate = new Date();

function calculate(e) {
  e.preventDefault();
  if (validate()) {
    let years = currentDate.getFullYear() - yearInputEl.value;

    let months = currentDate.getMonth() + 1 - monthInputEl.value;
    if (months < 0) {
      years--;
      months += 12;
    }

    let days = currentDate.getDate() - dayInputEl.value;
    if (days < 0) {
      months--;
      days += 30;
    }
    updateOutput(days, months, years);
  }
}

function updateOutput(days, months, years) {
  daysOutput.textContent = days;
  monthsOutput.textContent = months;
  yearsOutput.textContent = years;
}

function validate() {
  let validation = false;
  for (let i = 0; i < inputs.length; i++) {
    let input = inputs[i];
    if (!input.value) {
      input.style.borderColor = "red";
      input.parentElement.querySelector("small").textContent =
        "this field is required.";
      validation = false;
    } else {
      input.style.borderColor = "";

      input.parentElement.querySelector("small").textContent = "";

      let inputArray = [dayInputEl, monthInputEl, yearInputEl];
      let inputValidValues = [31, 12, currentDate.getFullYear()];
      let errorMsg = [
        "must be a valid day",
        "must be a valid month",
        "must be in past",
      ];

      for (let i = 0; i < inputArray.length; i++) {
        let el = inputArray[i];
        let validValue = inputValidValues[i];

        if (el.value > validValue) {
          el.style.borderColor = "red";
          el.parentElement.querySelector("small").textContent = errorMsg[i];
          validation = false;
        } else {
          el.style.borderColor = "";
          el.parentElement.querySelector("small").textContent = "";
          validation = true;
        }
      }
    }
  }
  return validation;
}
submitButtonEl.addEventListener("click", calculate);
