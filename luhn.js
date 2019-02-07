const outputDIV = document.querySelector('#js-output');
const checkLuhnButton = document.querySelector('#check-luhn');
const inputNumber = document.querySelector('#number');
const resetLuhnButton = document.querySelector('#reset-luhn');

function hasInvalidChars(input) {
  const regexPattern = /[^0-9|\s]/;
  return regexPattern.test(input);
}

function luhnCheck(event) {
  try {
    event.preventDefault();

    resetLuhnCheck();

    if (inputNumber.value === '') {
      throw new Error('Invalid input. Please enter a number');
    }

    if (hasInvalidChars(inputNumber.value)) {
      throw new Error('Invalid input. Only numbers and spaces are allowed.');
    }

    let digitArray = [...String(inputNumber.value)].filter(x => x !== ' ');

    for (let i = digitArray.length - 2; i >= 0; i -= 2) {
      let digit = Number(digitArray[i]) * 2;
      if (digit > 9) digit -= 9;
      digitArray[i] = String(digit);
    }

    const sum = digitArray.map(x => Number(x)).reduce((acc, cur) => acc + cur);
    outputDIV.innerHTML = `<p class="js-output success">${
      sum % 10 === 0
        ? 'This is a valid Luhn Algorithm number'
        : 'This is an invalid Luhn Algorithm number'
    }</p>`;
  } catch (err) {
    outputDIV.innerHTML = `<p class="js-output error">${err}</p>`;
  }
}

function resetLuhnCheck() {
  outputDIV.innerHTML = '';
}

checkLuhnButton.onclick = luhnCheck;
resetLuhnButton.onclick = resetLuhnCheck;
