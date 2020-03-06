const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];
getRandomUser();
getRandomUser();
getRandomUser();

//* fetch rando user api and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };

  addData(newUser);
}

// add new object to data array
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// double the money
function doubleMoney() {
  // since data is a let variable we can change it. map is creating
  // a new array which as a function that returns the user and money
  //times 2
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}
// sorts the users by the richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

//filtering the millionairs
function showMillionaires() {
  data = data.filter(user => {
    return user.money > 1000000;
  });
  //make sure calling this function is outside of the arrow function
  updateDOM();
}

// calculate wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthElement = document.createElement("div");

  wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthElement);
}

// update the dom
function updateDOM(providedData = data) {
  //* clear main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";
  // this loops through and just keeps creating rando users
  providedData.forEach(item => {
    //creates a div on screen for person
    const element = document.createElement("div");
    //adds a class of person to that div
    element.classList.add("person");
    //changes the innerHTML using a temp literal
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

function formatMoney(number) {
  // regex that takes the number and puts it as a currency
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

//* event listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);
