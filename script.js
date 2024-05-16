const upperScreen = document.querySelector('.upper')
const lowerScreen = document.querySelector('.lower')
const cmdButtons = document.querySelectorAll('.button.cmd')
const funcButtons = document.querySelectorAll('.button.func')
const numButtons = document.querySelectorAll('.button.num')

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
	let currentoutput = lowerScreen.textContent;

	if (this.textContent === '.') {
		if (dotClicked === true)
			return;

		dotClicked = true;
	}
	if (currentoutput === '0' && this.textContent !== '.')
		currentoutput = this.textContent;
	else
		currentoutput += this.textContent;

	lowerScreen.textContent = currentoutput;

}
