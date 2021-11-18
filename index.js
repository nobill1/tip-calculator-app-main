// Selecting the elements in the UI 
var form = document.getElementById("form");

var bill = document.getElementById("bill");
var people = document.getElementById("people");

var tip = document.querySelectorAll("[data-radio]");
var customTip = document.getElementById("custom");

var tipResult = document.getElementById("tipresult");
var total = document.getElementById("total");

var alert = document.getElementById("alert");
var alertBill = document.getElementById("alertbill");
var alertTip = document.getElementById("alerttip");

var resetBtn = document.getElementById("resetbtn");

// stores value of choosen tip %
var checker = [];

// Enter button on form or child input perform calculations and test values
form.addEventListener("keydown", (event) => {
  if ("Enter" === event.key) {
    event.preventDefault();
    checkTest();
    inputTest();
    inputTestBill();
    calculation();
  }
});
// Reset button to clear all the data on page 
resetBtn.addEventListener("click", () => resetAll());
// If custom tip % is entered, unchecks all the radio btn  
customTip.addEventListener("click", () => unCheck());
// if tip % is choosen amongst the given values custom tip % is cleared
tip.forEach((e) => {
  e.addEventListener("click", () => {
    erase();
    unCheckOthers(e);
    e.checked = true;
    setColor(e);
  });
});
// check if tip % is selected
function checkTest() {
  tip.forEach((e) => {
    if (e.checked) {
      checker.push(e.value);
    }
  });

  if (checker.length === 0 && customTip.value.length === 0) {
    alertTip.classList.remove("hidden");
  }
}
// check if number of people is > 0
function inputTest() {
  if (isNaN(people.value) || people.value <= 0) {
    alert.classList.remove("hidden");
    people.classList.add("border-2", "border-red-400");
    document.activeElement.blur();
  }
}
// check if bill is entered
function inputTestBill() {
  if (isNaN(bill.value) || bill.value <= 0) {
    alertBill.classList.remove("hidden");
    bill.classList.add("border-2", "border-red-400");
    document.activeElement.blur();
  }
}
// uncheck function to clear radio buttons if custom tip is choosen
function unCheck() {
  tip.forEach((e) => {
    e.checked = false;
    var x = e.parentElement;
    x.style.color = "white";
    x.style.backgroundColor = "hsl(183, 100%, 15%)";
  });
}
// uncheck other radio buttons when another is choosen
function unCheckOthers(q) {
  var i = Array.from(tip);
  i.splice(i.indexOf(q), 1);
  i.forEach((y) => {
    y.checked = false;
    var z = y.parentElement;
    z.style.color = "white";
    z.style.backgroundColor = "hsl(183, 100%, 15%)";
  });
}
// clear custom tip % input
function erase() {
  if (!isNaN(customTip.value)) {
    customTip.value = "";
  }
}
// set color for choosen radio tip button
function setColor(e) {
  if (e.checked) {
    var x = e.parentElement;
    x.style.color = "hsl(183, 100%, 15%)";
    x.style.backgroundColor = "hsl(172, 67%, 45%)";
  }
}
// price and tip total calculation 
function calculation() {
  if (checker.length === 1) {
    var tipTotal = (bill.value * checker[0]) / 100;
    if (
      (tipTotal / people.value).toFixed(2) === "NaN" ||
      (tipTotal / people.value).toFixed(2) === "Infinity" ||
      (bill.value / people.value).toFixed(2) === "NaN" ||
      (bill.value / people.value).toFixed(2) === "Infinity"
    ) {
      tipResult.innerText = "$0.00";
      total.innerText = "$0.00";
    } else {
      tipResult.innerText = "$" + (tipTotal / people.value).toFixed(2);
      total.innerText = "$" + (bill.value / people.value).toFixed(2);
    }
  } else {
    var tipTotal = (bill.value * customTip.value) / 100;
    if (
      (tipTotal / people.value).toFixed(2) === "NaN" ||
      (tipTotal / people.value).toFixed(2) === "Infinity" ||
      (bill.value / people.value).toFixed(2) === "NaN" ||
      (bill.value / people.value).toFixed(2) === "Infinity"
    ) {
      tipResult.innerText = "$0.00";
      total.innerText = "$0.00";
    } else {
      tipResult.innerText = "$" + (tipTotal / people.value).toFixed(2);
      total.innerText = "$" + (bill.value / people.value).toFixed(2);
    }
  }
}
// reset all values
function resetAll() {  
  document.getElementById("bill").value = "";
  document.getElementById("people").value = "";
  erase();
  unCheck();
  tipResult.innerText = "$0.00";
  total.innerText = "$0.00";
  alert.classList.add("hidden");
  people.classList.remove("border-2", "border-red-400");
  alertBill.classList.add("hidden");
  alertTip.classList.add("hidden");
  bill.classList.remove("border-2", "border-red-400");
  document.activeElement.blur();
}
