const readline = require('readline-sync');

function prompt(message) {
  console.log(`=> ${message} \n`);
}

function invalidNumber(number) {
  return Number(number) <= 0 || Number.isNaN(Number(number));
}

function getLoanAmt() {
  prompt('Please enter the loan amount \n ex: 12,345');
  let response = readline.question().replace(',', '');

  while (invalidNumber(response)) {
    prompt('Invalid! Try again. \n ex: 12,345');
    response = readline.question().replace(',', '');
  }

  const loanAmount = parseFloat(response, 10);
  return loanAmount;
}

function getAPR() {
  prompt('Please enter the annual percentage rate (APR) \n ex: 12.5 percent => 12.5');
  let response = readline.question();

  while (invalidNumber(response)) {
    prompt('Invalid! Try again. \n ex: 12.5');
    response = readline.question();
  }

  const apr = parseFloat(response, 10);
  return apr;
}

function checkDuration(duration) {
  if (duration.toLowerCase().includes('month')) {
    const durationInMonths = parseFloat(duration);
    return durationInMonths;
  }
  if (duration.toLowerCase().includes('year')) {
    const MONTHS_IN_YEAR = 12;
    const durationInMonths = parseFloat(duration) * MONTHS_IN_YEAR;
    return durationInMonths;
  }

  return parseFloat(duration);
}

function getDuration() {
  prompt(`Please enter loan duration in months OR years
    \n ex: 12 months (default: month)`);
  let response = readline.question();
  let durationInMonths = checkDuration(response);

  while (invalidNumber(durationInMonths)) {
    prompt('Invalid! Try again. \n ex: 24 months OR 2 years (default: month)');
    response = readline.question();
    durationInMonths = checkDuration(response);
  }

  return durationInMonths;
}

function calculateMonthlyPayment(loanAmount, apr, duration) {
  const annualRate = Number(apr) / 100;
  const monthlyRate = Number(annualRate) / 12;

  const monthlyPayment = Number(loanAmount) *
    (monthlyRate / (1 - Math.pow((1 + monthlyRate), (-Number(duration)))));

  return monthlyPayment;
}

function checkResponse(response) {
  if (response === 'y' || response === 'yes') {
    return 'continue';
  }
  if (response === 'n' || response === 'no') {
    return 'exit';
  }

  return response;
}

function runMortgageCalculator() {
  const loanAmount = getLoanAmt();
  const apr = getAPR();
  const duration = getDuration();

  console.log(`=> Your information: \n 
  \t Loan Amount: ${loanAmount.toLocaleString('en', {
    style: 'currency',
    currency: 'USD',
  })}
  \t APR: ${apr}% 
  \t Loan duration: ${duration} months
  `);

  const result = calculateMonthlyPayment(loanAmount, apr, duration);
  const monthlyPayment = result.toLocaleString('en', {
    style: 'currency',
    currency: 'USD',
  });

  prompt(`Your monthly payment is ${monthlyPayment}. Calculate again? y/n`);

  let response = readline.question().toLowerCase();
  while (checkResponse(response) !== 'continue') {
    if (checkResponse(response) === 'exit') return;
    prompt(`Didn't understand ${response}, try again: y/n`);
    response = readline.question().toLowerCase();
    checkResponse(response);
  }

  console.clear();
  runMortgageCalculator();
}

runMortgageCalculator();
