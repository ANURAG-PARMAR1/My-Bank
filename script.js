'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Asish Bisht",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Ankit Singh",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "INR",
  locale: "hi",
};

const account3 = {
  owner: 'Anurag Parmar',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account4 = {
  owner: 'Himanshu Dhapola',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const btnSignup = document.querySelector('.signup');
const btnSignout = document.querySelector('.signout');
const btnclose = document.querySelector('.closing--btn');
const signin = document.querySelector('.form__btn--signup');
const houver = document.querySelectorAll('.hover');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__inputPin');
const signup = document.querySelector('.operation--signup');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

let timer;
let sorted;
// SignUp Option

btnSignup.addEventListener('click',function(e) {
  e.preventDefault();
  signup.style.display = "grid";
})

signin.addEventListener('click',function(e) {
  e.preventDefault();
  const ownerName = document.querySelector('.form__input--ownerName').value;
  const Pin = Number(document.querySelector('.form__input--pin').value);
  const interest = document.querySelector('.form__input--intrest--rate').value;
  const currency = document.querySelector('.form__input--currency').value;
  const locale = document.querySelector('.form__input--locale').value;
  const accountNo = accounts.length +1;
  const newAccount = {
    owner: ownerName,
    interestRate: Number(interest),
    movements: [],
    pin:Pin,
    currency:currency,
    locale:locale,

    userName: ownerName.toLowerCase().split(" ").map(curr => curr[0]).join('')
  };
  accounts.push(newAccount);
  signup.style.display = "none";
})

// signup closing 
btnclose.addEventListener('click',function(e) {
  e.preventDefault();
  signup.style.display = "none";
})

//Sorting Function

const sortFunc = function(e) {
  e.preventDefault();
  displayMov(currAcc, !sorted);
  sorted = !sorted;
};

// Transfer Function 
const transferFnc = function(e) {
  e.preventDefault();
  const transferTo = inputTransferTo.value;
  const amt =Number(inputTransferAmount.value);
  const user = accounts.find(mov => mov.userName === transferTo);
  const totalAmt = currAcc.movements.reduce((currAcc,mov) => currAcc+mov,0);
  if(user && amt>0 && amt < totalAmt) {
    currAcc.movements.push(amt*-1);
    currAcc.movementsDates.push(new Date().toISOString());
    user.movements.push(amt);
    user.movementsDates.push(new Date().toISOString());
    inputTransferTo.value = inputTransferAmount.value = "";
    updateUI(currAcc);
  }
  
};

// Loan Function
const loanFnc = function(e) {
  e.preventDefault();
  const amt = Number(inputLoanAmount.value);
  const valid = currAcc.movements.find(mov => mov > Math.trunc(amt/10));
  if(valid) {
    currAcc.movements.push(amt);
    currAcc.movementsDates.push(new Date().toISOString());
  }
  inputLoanAmount.value = "";
  updateUI(currAcc);
};

// Closing Account Function
const closingAccFnc = function(e) {
  e.preventDefault();
  
  const inputName = inputCloseUsername.value;
  const inputPin = Number(inputClosePin.value);
  const index = accounts.findIndex(
    acc => currAcc.username === currAcc.username
  );
  
    if(inputName === currAcc.userName && inputPin === currAcc.pin) {
      accounts.splice(index,1);
      updateUI(currAcc);
      containerApp.style.opacity = 0;
      inputLoginUsername.style.display = "block";
      inputLoginPin.style.display = "block";
      btnLogin.style.display = "block";
      btnSignup.style.display="block";
      btnSignout.style.display="none";


      
    }
    inputCloseUsername.value = inputClosePin.value = '';
};

// signout
btnSignout.addEventListener('click',function(e) {
  e.preventDefault();
  clearInterval(timer);
  inputLoginUsername.style.display = "block";
  inputLoginPin.style.display = "block";
  btnLogin.style.display = "block";
  btnSignup.style.display="block";
  btnSignout.style.display="none";
  containerApp.style.opacity = 0;
  labelWelcome.textContent = 'Log in to get started';
  document.removeEventListener('click',logInFunction);
  document.removeEventListener('click',sortFunc);
  document.removeEventListener('click',transferFnc);
  document.removeEventListener('click',loanFnc);
  document.removeEventListener('click',closingAccFnc);


})


// User Name implimentation
const createUsername = function(account) {account.forEach(elm => {
  elm.userName = elm.owner.toLowerCase().split(" ").map(curr => curr[0]).join('');
})} 

createUsername(accounts);


// log in Function
let currAcc;
const logInFunction = function(e) {
  e.preventDefault();
  
  const Uname = inputLoginUsername.value;
  const Pin = inputLoginPin.value;
  accounts.forEach(function(mov) {
    if(mov.userName === Uname && mov.pin === Number(Pin)) {
      btnSignup.style.display="none";
      btnSignout.style.display="block";
      inputLoginUsername.style.display = "none";
      inputLoginPin.style.display = "none";
      btnLogin.style.display = "none";
      containerApp.style.opacity = 100;
      labelWelcome.textContent = `Welcome back, ${
        mov.owner.split(' ')[0]
      }`;
      currAcc = mov;

      inputLoginUsername.value = inputLoginPin.value = '';
      inputLoginPin.blur();

      updateUI(mov);  
      
      setTimer();

      const date = new Intl.DateTimeFormat(mov.locale).format(new Date());
      labelDate.textContent = date;

      }
  })
};

// Log in 
btnLogin.addEventListener('click',logInFunction);




// Sorting 
btnSort.addEventListener('click',sortFunc);



// Transfer Money 
btnTransfer.addEventListener('click',transferFnc);

  

// Request Loan 
btnLoan.addEventListener('click',loanFnc);

  

// Closing Account 
btnClose.addEventListener('click',closingAccFnc);


//Formating Dates

const formatDates = function(date,locale) {
  const calDaysPass = (day1,day2)=> Math.round((Math.abs(day1 - day2)) / (1000*60*60*24));
  
  const dayPass = calDaysPass(new Date(), date);

  if(dayPass === 0) return "Today";
  else if(dayPass === 1) return "Yesterday";
  else if(dayPass < 7) return `${dayPass} day ago`;

  return new Intl.DateTimeFormat(locale).format(date);

};

//Format Currency
const formatCurr = function(value,locale,currency) {
  return new Intl.NumberFormat(locale,{
    style:"currency",
    currency:currency,
  }).format(value);
};






// Displaying Movements
const displayMov = function(mov,sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? mov.movements.slice().sort((a, b) => a - b)
    : mov.movements;


movs.forEach(function(elm,i) {
  let type = elm > 0 ?'deposit':'withdrawal';
  let displayDate = formatDates(new Date(mov.movementsDates[i]),mov.locale);
  let value = formatCurr(elm,mov.locale,mov.currency);
  let html = `<div class="movements__row">
  <div class="movements__type movements__type--${type}"> ${i+1} ${type}</div>
  <div class="movements__date">${displayDate}</div>
  <div class="movements__value">${value}</div>
</div>`;

containerMovements.insertAdjacentHTML('afterbegin', html);


});


};

// Displaying currBalance
const currBalance = function (allMov) {
  const balance = allMov.movements.reduce((acc,elm) => acc+elm,0 );
  const totalBalance = formatCurr(balance,allMov.locale,allMov.currency);
  labelBalance.textContent = `${totalBalance}`;
  
  const inValue = allMov.movements.filter(curr => curr>0).reduce((acc,mov) => acc+mov,0).toFixed(2);
  const totalIn = formatCurr(inValue,allMov.locale,allMov.currency);
  labelSumIn.textContent =` ${totalIn}`;

  const out = Math.abs(allMov.movements.filter(curr => curr<0).reduce((acc,mov) => acc+Math.abs(mov),0)).toFixed(2);
  const totalOut = formatCurr(out,allMov.locale,allMov.currency);
  labelSumOut.textContent = `${totalOut}`;

  const interest = allMov.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * allMov.interestRate) / 100)
    .filter((int) => {
      
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCurr(interest, allMov.locale, allMov.currency);
};
// Update UI
const updateUI = function (acc) {
  // Display movements
  displayMov(acc);

  currBalance(acc);
  
  sorted = false;
};


// Timer 
const setTimer = function () {
  let time = 300;
  // Timer Function
  const timerFunction = function() {
  let hour = String(Math.trunc(time/60)).padStart(2,0);
  let min = String(time %60).padStart(2,0);
  labelTimer.textContent = `${hour}:${min}`;
  

  if(time === 0) {
    clearInterval(timer);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = "Log in to get started."

  }
  time--;
};  

  if(timer) clearInterval(timer);
  timerFunction();
  timer = setInterval(timerFunction,1000);
};