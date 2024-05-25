// Select elements from the DOM
const upperScreen = document.querySelector('.upper');
const lowerScreen = document.querySelector('.lower');
const cmdButtons = document.querySelectorAll('.button.cmd');
const funcButtons = document.querySelectorAll('.button.func');
const numButtons = document.querySelectorAll('.button.num');
const equal = document.querySelector('.button.eql');

// Variables to store calculator state
let currentNumber = "";
let previousNumber = "";
let currentOperator = "";
let dotClicked = false;

// Set initial value on lower screen
lowerScreen.textContent = "0";

// Add click event listeners to number buttons
numButtons.forEach(button => {
  button.addEventListener('click', setnumericBtn);
});

// Add click event listeners to command buttons (AC, C)
cmdButtons.forEach(button => {
  button.addEventListener('click', setcmdBtn);
});

// Add click event listeners to function buttons (+, -, *, /)
funcButtons.forEach(button => {
  button.addEventListener('click', setfuncBtn);
});

// Function to handle number button clicks
function setnumericBtn() {
  // Prevent multiple decimal points
  if (this.textContent === '.' && dotClicked) {
    return;
  } else if (this.textContent === '.') {
    dotClicked = true;
  }

  // Prevent overflow on lower screen
  if (currentNumber.length >= 15) {
    return;
  }

  // Clear previous number if operator is pressed or current number is 0
  if (currentNumber === "0" || currentOperator !== "") {
    currentNumber += this.textContent;
  } else {
    currentNumber += this.textContent;
  }

  // Update lower screen with current number
  lowerScreen.textContent = currentNumber;
}

// Function to handle command button clicks (AC, C)
function setcmdBtn() {
  if (this.textContent === 'AC') {
    // Reset all calculator state
    currentNumber = "";
    previousNumber = "";
    currentOperator = "";
    dotClicked = false;
    lowerScreen.textContent = "0";
    upperScreen.textContent = "";
  } else if (this.textContent === 'C') {
    // Delete a single digit from current number
    if (currentNumber.length > 0) {
      currentNumber = currentNumber.slice(0, -1);
      lowerScreen.textContent = currentNumber;
    }
  }
}

// Function to handle function button clicks (+, -, *, /)
function setfuncBtn() {
  // Do nothing if no current number
  if (currentNumber === "") return;

  // Calculate result if there's a previous number and operator
  if (previousNumber !== "" && currentOperator !== "") {
    let result = calculateResult();
    previousNumber = result;
    lowerScreen.textContent = String(result);
  } else {
    // Set previous number if no previous calculation
    previousNumber = currentNumber;
  }

  // Reset current number, set operator, update upper screen
  currentNumber = "";
  currentOperator = this.textContent;
  dotClicked = false;
  upperScreen.textContent = previousNumber + ' ' + currentOperator;
  lowerScreen.textContent = '';
}

// Add click event listener to equal button
equal.addEventListener('click', () => {
  if (currentNumber !== '' && previousNumber !== '') {
    let result = calculateResult();
    lowerScreen.textContent = String(result);
    upperScreen.textContent = "";
  }
});

// Function to perform calculation based on operator
function calculateResult() {
  let result;
  const firstNum = parseFloat(previousNumber);
  const secondNum = parseFloat(currentNumber);

  switch (currentOperator) {
    case '+':
      result = firstNum + secondNum;
      break;
    case '-':
      result = firstNum - secondNum;
      break;
    case '*':
      result = firstNum * secondNum;
      break;
    case '/':
      // Handle division by zero error
      if (secondNum === 0) {
        alert("Error: Division by zero!");
        return;
      }
      result = firstNum / secondNum;
      break;
    default:
      result = "Error";
  }

  // Round result to 4 decimal places
  result = Math.round(result * 10000) / 10000;
  return result;
}
