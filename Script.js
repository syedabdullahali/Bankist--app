const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2022-05-14T13:15:33.035Z",
    "2022-04-30T09:48:16.867Z",
    "2022-04-25T06:04:23.907Z",
    "2022-03-25T14:18:46.235Z",
    "2022-05-05T16:33:06.386Z",
    "2022-02-10T14:43:26.374Z",
    "2022-04-25T18:49:59.371Z",
    "2022-05-06T12:01:20.894Z",
  ],
  currency: "AUD",
  locale: "pt-PT",
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2022-04-11T13:15:33.035Z",
    "2022-05-20T09:48:16.867Z",
    "2022-04-15T06:04:23.907Z",
    "2022-03-05T14:18:46.235Z",
    "2022-05-01T16:33:06.386Z",
    "2022-05-12T14:43:26.374Z",
    "2022-01-25T18:49:59.371Z",
    "2022-02-26T12:01:20.894Z",
  ],

  currency: "CAD",
  locale: "en-US",
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2022-05-14T13:15:33.035Z",
    "2022-04-30T09:48:16.867Z",
    "2022-04-25T06:04:23.907Z",
    "2022-03-25T14:18:46.235Z",
    "2022-05-05T16:33:06.386Z",
    "2022-02-10T14:43:26.374Z",
    "2022-04-25T18:49:59.371Z",
    "2022-05-06T12:01:20.894Z",
  ],
  currency: "EUR",
  locale: "pt-PT",
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2022-04-11T13:15:33.035Z",
    "2022-05-20T09:48:16.867Z",
    "2022-04-15T06:04:23.907Z",
    "2022-03-05T14:18:46.235Z",
    "2022-05-01T16:33:06.386Z",
    "2022-05-12T14:43:26.374Z",
    "2022-01-25T18:49:59.371Z",
    "2022-02-26T12:01:20.894Z",
  ],


  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2, account3, account4];

// Html element Location
const Login_Input_Username = document.querySelector(".login_input--user")
const Login_Input_pin = document.querySelector(".iogin_input--pin")

const input_close_user = document.querySelector(".form_input--user")
const inpit_close_pin = document.querySelector(".form_input--pin")

let ContainerMovement = document.querySelector(".movement-content")
const currentbalance = document.querySelector(".balnce_value")

const summary_value_In = document.querySelector(".summary_value--in")
const summary_value_Out = document.querySelector(".summary_value--out")
const summary_value_Interest = document.querySelector(".summary_value--interest")

const Button_Login = document.querySelector(".login__btn")

const Welcome_message = document.querySelector(".Welcomebn")
const Welcome_User = document.querySelector(".Welcome-user")

const containerApp = document.querySelector(".first")
const Nav = document.querySelector('.nav-1')

const Button_Transfer = document.querySelector(".form_btn--transfer")
const InputTransferTo = document.querySelector(".form_input--to")
const InputAmount = document.querySelector(".form_input--amount")

const button_close = document.querySelector(".form_btn--close")

const button_loan = document.querySelector(".form_btn--loan")
const Input_Request_loan = document.querySelector(".form__input--loan-amount")
const Button_Short = document.querySelector(".btn--sort")

const LabelBalance = document.querySelector(".balnce_value")
const labelDate = document.querySelector(".balance_data")

const labelTimer = document.querySelector(".timer")

// const Movement_date =document.querySelector(".movements__data")

const forMovementsDate = (date, local) => {
  const DateSubtraction = (Date1, Date2) =>
    Math.round(Math.abs(Date2 - Date1) / (1000 * 60 * 60 * 24));

  const DayPassed = DateSubtraction(new Date, date)

  if (DayPassed === 0) return "Today"
  if (DayPassed === 1) return "Yesterday"

  if (DayPassed <= 7) {
    return `${ DayPassed } days ago`
  } else {

    return new Intl.DateTimeFormat(local).format(date)

  }
}


const formatCur = (Value, locale, currency) => {
  const obj = {
    style: "currency",
    currency: currency,
  }
  let api1 = new Intl.NumberFormat(locale).format(Value)
  let api2 = new Intl.NumberFormat(locale, obj).format(Value);

  let newapi = api2.match(/[^0-9]/g).join('')
    .replace(/(,||.)/g, '')
    + api1.replace(/-/g, ',')

  return newapi.replace(/(,||.)/g, "")
    .replace(/(-)/g, "")
}


const DisplayMovements = function (acc, sort = false) {
  const ContainerMovement = document.querySelector(".movements")
  ContainerMovement.innerHTML = ""

  let duplicateMov = acc.movements.slice()
  let moves = sort ? duplicateMov.sort((a, b) => a - b) : duplicateMov;

  moves.forEach((Mov, i) => {
    const formatMove = formatCur(Mov, acc.locale, acc.currency)
    const date = new Date(acc.movementsDates[i])
    const displayDate = forMovementsDate(date, acc.locale)

    const type = Mov > 0 ? 'deposit' : 'withdrawal'
    const scroll = type == 'deposit' ? 'right' : "left"



    const html = `<div class="movements__row">
      <marquee behavior="scroll" direction="${ scroll }">
      <div class="movement-content">
      <div class="movemnts_type movements_type--${ type }">
          ${ i }${ type } </div>
      <div class="movements__date">${ displayDate }</div>
      </div>
      </marquee>
      <div class="movements__value">${ formatMove }</div>
       </div>`;




    ContainerMovement.insertAdjacentHTML("afterbegin", html)
  })

}
let currenTacount, timer2;


const totalbalance = (acc) => {

  acc.balance = acc.movements.reduce((acc, cur) => acc + cur)
  currentbalance.textContent = formatCur(acc.balance, acc.locale, acc.currency)

}


const DisplaySummary = (acc) => {

  const [IN, OUT, INTERE] = [acc.movements.filter((mov) => mov > 0)
    .reduce((total, Cur) => total + Cur, 0)
    ,
  acc.movements.filter((mov) => mov < 0)
    .reduce((total, Cur) => total + Cur, 0)
    ,
  acc.movements.filter((mov) => mov > 0)
    .map((deposite) => deposite * acc.interestRate / 100)
    .filter((mov) => mov >= 1)
    .reduce((total, inter) => total + inter, 0)
  ]

  summary_value_In.textContent = formatCur(IN, acc.locale, acc.currency)
  summary_value_Out.textContent = formatCur(OUT, acc.locale, acc.currency)
  summary_value_Interest.textContent = formatCur(INTERE, acc.locale, acc.currency)
}


const newObj = (acc) => {
  acc.forEach((accs) => {
    accs.username = accs.owner
      .toLowerCase()
      .split(" ")
      .map((name1) => name1[0])
      .join("")
  })

}
newObj(accounts)

//UpdateUi
const UpdateUi = (acc) => {
  // Display Movements 
  DisplayMovements(acc)
  // Display Balance 


  totalbalance(acc)

  //Display summary
  DisplaySummary(acc)
}
console.log(Welcome_User)



const startlogoutTimer = () => {
  let time = 300;

  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0)
    const sec = String(time % 60).padStart(2, 0)
    labelTimer.textContent = `${ min }:${ sec }`


    if (time == 0) {
      clearInterval(timer)
      Welcome_message.textContent = `Log in to get started`;
      Welcome_User.textContent = " ";



      containerApp.style.opacity = "0"
      containerApp.style.visibility = "hidden"
      Nav.style.position = "fixed"

    }
    time--

  }
  tick()
  const timer = setInterval(tick, 1000)
  return timer
}






Button_Login.addEventListener("click", (e) => {
  e.preventDefault()

  Nav.style.position = "relative"

  currenTacount = accounts.find((acc) => acc.username == Login_Input_Username.value)

  if (currenTacount?.pin === +(Login_Input_pin.value)) {

    Welcome_message.textContent = `Welcome back`;
    Welcome_User.textContent = `${ currenTacount.owner }`

    // Display Ui  layout 
    containerApp.style.visibility = "visible"
    containerApp.style.opacity = "100"
    // date 

    const date = new Date()

    const formatdate = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long"
    }

    labelDate.textContent = new Intl.DateTimeFormat(
      currenTacount.locale, formatdate).format(date)

    //input Clear

    Login_Input_Username.value = Login_Input_pin.value = "";
    if (timer2) clearInterval(timer2)
    timer2 = startlogoutTimer()
    UpdateUi(currenTacount)

  }
})

// button transfer function 

Button_Transfer.addEventListener("click", function (e) {
  e.preventDefault()

  const amount = +(InputAmount.value);
  const recevier = accounts.find((acc) => acc.username == InputTransferTo.value)

  InputTransferTo.value = InputAmount.value = ""

  if (amount > 0 &&
    recevier &&
    currenTacount.balance >= amount &&
    recevier?.username !== currenTacount.username) {
    currenTacount.movementsDates.push(new Date().toISOString());
    recevier.movementsDates.push(new Date().toISOString());

    currenTacount.movements.push(-amount);
    recevier.movements.push(amount)

    UpdateUi(currenTacount)
    clearInterval(timer2)

    timer2 = startlogoutTimer()
  }
})


button_close.addEventListener('click', function (e) {
  e.preventDefault();

  if (input_close_user.value
    == currenTacount.username &&
    +(inpit_close_pin.value)
    == currenTacount.pin) {
    const index = accounts.findIndex((acc) => {
      return acc.username == currenTacount.username
    })

    accounts.splice(index, 1)

    containerApp.style.opacity = "0"
    containerApp.style.visibility = "hidden"
  }

  input_close_user.value = inpit_close_pin.value = "";

})


button_loan.addEventListener("click", function (e) {
  e.preventDefault()

  const amount = Math.floor(Input_Request_loan.value)
  if (amount > 0 && currenTacount.movements.some((val) => val >= amount * 0.1)) {

    setTimeout(() => {

      currenTacount.movements.push(+amount)
      currenTacount.movementsDates.push(new Date().toISOString())
      UpdateUi(currenTacount)
      clearInterval(timer2)
      timer2 = startlogoutTimer()
    }, 3000)
    Input_Request_loan.value = ""
  }
})

let sorted = false
Button_Short.addEventListener("click", function () {
  DisplayMovements(currenTacount, !sorted)
  sorted = !sorted
});