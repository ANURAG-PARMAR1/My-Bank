'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Asish Bisht',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Ankit Singh',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Anurag Parmar',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Himanshu Dhapola',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
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
const btnclose = document.querySelector('.closing--btn');
const signin = document.querySelector('.form__btn--signup');

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
  const accountNo = accounts.length +1;
  const newAccount = {
    owner: ownerName,
    interestRate: Number(interest),
    movements: [],
    pin:Pin,

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


// User Name implimentation
const createUsername = function(account) {account.forEach(elm => {
  elm.userName = elm.owner.toLowerCase().split(" ").map(curr => curr[0]).join('');
})} 

createUsername(accounts);

// Log in 
btnLogin.addEventListener('click',function(e) {
  e.preventDefault();
  const Uname = inputLoginUsername.value;
  const Pin = inputLoginPin.value;
  accounts.forEach(function(mov) {
    if(mov.userName === Uname && mov.pin === Number(Pin)) {
      containerApp.style.opacity = 100;
      labelWelcome.textContent = `Welcome back, ${
        mov.owner.split(' ')[0]
      }`;

      inputLoginUsername.value = inputLoginPin.value = '';
      inputLoginPin.blur();
      
      updateUI(mov);      

      setTimer();

      sort(mov);

      transferMoney(mov);

      requestLoan(mov);

      closingAcc(mov);
      
      






    }
  })
})


// Sorting 
let sorted = false;
const sort = function(acc) {
  
  btnSort.addEventListener('click',function(e) {
    e.preventDefault();
    if(sorted) updateUI(acc)
    else {
      displayMov(acc.movements.slice().sort((a,b) => a-b));
      sorted = true;
  }
  })
  
}

// Transfer Money 
const transferMoney = function(acc) {
  btnTransfer.addEventListener('click',function(e) {
    e.preventDefault();
    const transferTo = inputTransferTo.value;
    const amt =Number(inputTransferAmount.value);
    const user = accounts.find(mov => mov.userName === transferTo);
    const totalAmt = acc.movements.reduce((acc,mov) => acc+mov,0);
    console.log(totalAmt);
    if(user && amt>0 && amt < totalAmt) {
      acc.movements.push(amt*-1);
      user.movements.push(amt);
      inputTransferTo.value = inputTransferAmount.value = "";
      updateUI(acc);
    }
    
  })
  
}

// Request Loan 

const requestLoan = function(acc) {
  btnLoan.addEventListener('click',function(e) {
    e.preventDefault();
    const amt = Number(inputLoanAmount.value);
    console.log(Math.trunc(amt/10));
    const valid = acc.movements.find(mov => mov > Math.trunc(amt/10));
    if(valid) acc.movements.push(amt);
    inputLoanAmount.value = "";
    updateUI(acc);
  })
}

// Closing Account 

const closingAcc = function (acc) {
  btnClose.addEventListener('click',function(e) {
    e.preventDefault();
    
    const inputName = inputCloseUsername.value;
    const inputPin = Number(inputClosePin.value);
    const index = accounts.findIndex(
      acc => acc.username === acc.username
    );
    
      if(inputName === acc.userName && inputPin === acc.pin) {
        console.log(inputCloseUsername.value,inputClosePin.value)
        accounts.splice(index,1);
        updateUI(acc);
        containerApp.style.opacity = 0;

        
      }
      inputCloseUsername.value = inputClosePin.value = '';
  })
}







// Displaying Movements
const displayMov = function(mov) {
  containerMovements.innerHTML = '';
mov.forEach(function(elm,i) {
  let type = elm > 0 ?'deposit':'withdrawal';
  let html = `<div class="movements__row">
  <div class="movements__type movements__type--${type}"> ${i+1} ${type}</div>
  <div class="movements__value">${Math.abs(elm)}💲</div>
</div>`;

containerMovements.insertAdjacentHTML('afterbegin', html);
});
};

// Displaying currBalance
const currBalance = function (mov) {
  const totalBalance = mov.reduce((acc,elm) => acc+elm,0 );
  labelBalance.textContent = `${totalBalance}💲`;
  
  const totalIn = mov.filter(curr => curr>0).reduce((acc,mov) => acc+mov,0);
  labelSumIn.textContent =` ${totalIn}💲`;

  const totalOut = Math.abs(mov.filter(curr => curr<0).reduce((acc,mov) => acc+Math.abs(mov),0));
  labelSumOut.textContent = `${totalOut}💲`;
}
// Update UI
const updateUI = function (acc) {
  // Display movements
  displayMov(acc.movements);

  currBalance(acc.movements);
  labelSumInterest.textContent =`${acc.interestRate} %`;
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
  timerFunction();
  const timer = setInterval(timerFunction,1000);
};

