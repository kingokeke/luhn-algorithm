//
// Assign interactive parts of the HTML to variables
const outputDIV = document.querySelector('#js-output');
const checkLuhnButton = document.querySelector('#check-luhn');
const inputNumber = document.querySelector('#number');
const resetLuhnButton = document.querySelector('#reset-luhn');
const currentYearSpan = document.querySelector('.current-year');

//
// Helper function to strip out the empty spaces from the input
const cleanInput = input => input.replace(/ /g, '');

//
// Helper function to see if input satisfies the regex pattern
const hasInvalidChars = input => /[^0-9|\s]/.test(input);

//
// Helper function to validate the input
const checkValidation = input => {
  if (input === '') {
    throw new Error('Invalid input. Please enter a number.');
  }
  if (hasInvalidChars(input)) {
    throw new Error('Invalid input. Only numbers and spaces are allowed.');
  }
  if (input.length < 2) {
    throw new Error('Invalid input. Number must be 2 digits or more.');
  }
};

//
// Helper function to check if a number is valid according to the Luhn algorithm.
const isLuhn = input => {
  let digitArray = [...input];
  for (let i = digitArray.length - 2; i >= 0; i -= 2) {
    let digit = Number(digitArray[i]) * 2;
    if (digit > 9) digit -= 9;
    digitArray[i] = String(digit);
  }
  const sum = digitArray.map(x => Number(x)).reduce((acc, cur) => acc + cur);
  return sum % 10 === 0;
};

//
// Check if a number satisfies the Luhn algorithm and outputs the value
const luhnCheck = event => {
  try {
    event.preventDefault(); // Prevent page reload on click
    const number = cleanInput(inputNumber.value);
    checkValidation(number);

    const message = `This is ${isLuhn(number) ? 'a valid' : 'an invalid'} Luhn Algorithm number.`;
    outputDIV.innerHTML = `<p class="js-output success">${message}</p>`;
  } catch (err) {
    outputDIV.innerHTML = `<p class="js-output error">${err.message}</p>`;
  }
};

//Check if input is a valid Luhn algo number and output answer when the "check" button is clicked.
checkLuhnButton.onclick = luhnCheck;

// Clear the output when the Reset button is clicked
resetLuhnButton.onclick = () => {
  outputDIV.innerHTML = '';
};

// Replace footer year with dynamically generated date
currentYearSpan.innerHTML = new Date().getFullYear();
