const readline = require('readline-sync');
const MESSAGES =  require('./calculator_messages.json');

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

prompt(MESSAGES['welcome']);


while (true) {

prompt(MESSAGES['askFirstNumber']);
let number1 = readline.question();

while (invalidNumber(number1)) {
  prompt( MESSAGES['notValidNumber']);
  number1 = readline.question();
}

prompt(MESSAGES['askSecondNumber']);
let number2 = readline.question();

while (invalidNumber(number2)) {
  prompt(MESSAGES['notValidNumber']);
  number2 = readline.question();
}

prompt(MESSAGES['chooseOperation']);
let operation = readline.question();

while (!['1', '2', '3', '4'].includes(operation)) {
  prompt(MESSAGES[mustChoose])
  operation = readline.question();
}

let output;
switch (operation) {
  case '1':
    output = Number(number1) + Number(number2);
    break;
  case '2':
    output = Number(number1) - Number(number2);
    break;
  case '3':
    output = Number(number1) * Number(number2);
    break;
  case '4':
    output = Number(number1) / Number(number2);
    break;
  default:
    break;
}

prompt(`The result is: ${output} calculate again?`);
let answer = readline.question();
if (answer[0].toLowerCase() !== 'y') break;
}