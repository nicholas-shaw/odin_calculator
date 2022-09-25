//Set up initial state for variables
let firstNumber = "";
let secondNumber = "";
let operator = "";
let clearDisplay = false;
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "."];
const operators = ["+", "-", "*", "/"];

function operate(operation, a, b) {
  const firstNumber = Number(a);
  const secondNumber = Number(b);
  if (operation === "+") {
    return firstNumber + secondNumber;
  } else if (operation === "-") {
    return firstNumber - secondNumber;
  } else if (operation === "*") {
    return firstNumber * secondNumber;
  } else if (operation === "/") {
    return firstNumber / secondNumber;
  }
}

function populateDisplay(buttonPressed) {
  let currentDisplay = document.querySelector("#calcDisplay").innerText;
  if (
    numbers.includes(Number(buttonPressed)) &&
    operator === "" &&
    String(currentDisplay).length <= 9
  ) {
    //We're working with the first number
    firstNumber = firstNumber + buttonPressed;
    document.querySelector("#calcDisplay").innerText = firstNumber;
  } else if (
    numbers.includes(Number(buttonPressed)) &&
    String(currentDisplay).length <= 9
  ) {
    //We're working with the second number
    secondNumber = secondNumber + buttonPressed;
    if (clearDisplay === true) {
      currentDisplay = "";
      clearDisplay = false;
    }
    document.querySelector("#calcDisplay").innerText = secondNumber;
  } else if (operators.includes(buttonPressed)) {
    clearDisplay = true;

    if (operator !== "" && secondNumber !== "") {
      firstNumber = String(operate(operator, firstNumber, secondNumber));
      secondNumber = "";
      document.querySelector("#calcDisplay").innerText = firstNumber;
    }
    highlightOperator(buttonPressed);
    operator = buttonPressed;
    console.log("operator pressed");
  } else if (buttonPressed === "=") {
    const result = String(operate(operator, firstNumber, secondNumber));
    document.querySelector("#calcDisplay").innerText = result;
    firstNumber = result;
    secondNumber = "";
    operator = "";
    highlightOperator();
  } else if (buttonPressed === "clear") {
    document.querySelector("#calcDisplay").innerText = "0";
    highlightOperator();
    firstNumber = "";
    secondNumber = "";
    //todo first entry vs second
  } else {
    console.error(`unhandled character - ${buttonPressed}`);
  }
  console.log({ firstNumber, secondNumber, operator });
  // numbers.includes(Number(buttonPressed))
  //   ? (document.querySelector("#calcDisplay").value += buttonPressed)
  //   : handleOperatorPress(buttonPressed);
}

// function handleOperatorPress(operator) {
//   firstNumber = calculatorDisplay;

// }

function highlightOperator(operatorPushed) {
  document.querySelectorAll(".operatorDisplay").forEach((operatorDisplay) => {
    operatorDisplay.dataset.operator === operatorPushed
      ? operatorDisplay.classList.add("activeOperator")
      : operatorDisplay.classList.remove("activeOperator");
  });
}

function animatePressingButton(button) {
  gsap.to(button, { y: 30, duration: 0.3 });
  gsap.to(button, { y: 0, duration: 0.3 });
  gsap.to(button, { y: 30, duration: 0.2 });
  gsap.to(button, { y: 0, duration: 0.2 });
}

function initialiseApp() {
  document.querySelectorAll(".calcButton").forEach((button) => {
    button.addEventListener("click", function (e) {
      animatePressingButton(e.currentTarget);
      populateDisplay(e.target.value);
    });
  });

  window.addEventListener("keydown", function (e) {
    console.log(e);
    animatePressingButton(e.currentTarget);

    if (e.key >= 0 && e.key <= 9) populateDisplay(e.key);
    if (e.key === ".") populateDisplay(".");
    //   if (e.key === '=' || e.key === 'Enter') evaluate()
    //   if (e.key === 'Backspace') deleteNumber()
    //   if (e.key === 'Escape') clear()
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
      // handleOperatorPress(e.key);
      populateDisplay(e.key);
    }
  });
}

initialiseApp();
