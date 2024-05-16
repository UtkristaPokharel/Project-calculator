const upperScreen = document.querySelector('.upper')
const lowerScreen = document.querySelector('.lower')
const cmdButtons = document.querySelectorAll('.button.cmd')
const funcButtons = document.querySelectorAll('.button.func')
const numButtons = document.querySelectorAll('.button.num')

let currentNumber = "";
let previousNumber = "";
let currentOperator = "";
let dotClicked = false;

numButtons.forEach(button => {
	button.addEventListener('click', setnumericBtn);
});
cmdButtons.forEach(button => {
	button.addEventListener('click', setcmdBtn);
});

funcButtons.forEach(button => {
	button.addEventListener('click', setfuncBtn);
});

function setnumericBtn() {
	if (this.textContent === '.' && dotClicked) {
		return;
	} else if (this.textContent === '.') {
		dotClicked = true;
	}
	if (currentNumber.length >= 15) {
		return;
	}

	if ((currentNumber === "0" && this.textContent !== '.') || currentOperator !== "" || this.textContent === '-') {
		currentNumber = this.textContent;
	} else {
		currentNumber += this.textContent;
	}

	lowerScreen.textContent = currentNumber;
}

function setcmdBtn() {
	if (this.textContent === 'AC') {
		currentNumber = "";
		previousNumber = "";
		currentOperator = "";
		dotClicked = false;
		lowerScreen.textContent = "0";
		upperScreen.textContent = "";
	} else if (this.textContent === 'C') {
		if (currentNumber.length > 0) {
			currentNumber = currentNumber.slice(0, -1);
			lowerScreen.textContent = currentNumber;
		}
	} else if (this.textContent === '=') {
		if (currentOperator === "") return;
		let result = calculateResult();
		lowerScreen.textContent = String(result);
		previousNumber = result;
		currentNumber = String(result);
		currentOperator = "";
		dotClicked = false;
	}
}


function setfuncBtn() {
	if (currentNumber === "")
		return;
	if (previousNumber !== "" && currentOperator !== "") {
		let result = calculateResult();
		previousNumber = result;
		lowerScreen.textContent = String(result);
	} else {
		previousNumber = currentNumber;
	}
	currentNumber = "";
	currentOperator = this.textContent;
	dotClicked = false; // 
	upperScreen.textContent = previousNumber;
}

function setfuncBtn() {
	if (currentNumber === "")
		return;
	if (previousNumber !== "" && currentOperator !== "") {
		let result = calculateResult();
		previousNumber = result;
		lowerScreen.textContent = String(result);
	} else {
		previousNumber = currentNumber;
	}
	currentNumber = "";
	currentOperator = this.textContent;
	dotClicked = false;
	upperScreen.textContent = previousNumber + ' ' + currentOperator;
}

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
			if (secondNum === 0) {
				alert("Error: Division by zero!");
				return;
			}
			result = firstNum / secondNum;
			break;
		default:
			result = "Error";
	}

	result = Math.round(result * 10000) / 10000;
	return result;
}
