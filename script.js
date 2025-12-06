let firstValue = null;
let lastOperator = null;
let shouldResetDisplay = false;

function historyFeature(expression, result) {
const historyContainer = document.getElementById("history");
const update = document.createElement("div");
update.textContent = `${expression} = ${result}`;
historyContainer.prepend(update);
let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
history.unshift({expression,result});
localStorage.setItem("calcHistory", JSON.stringify(history));
}

function loadHistory() {
const historyContainer = document.getElementById("history");
let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
history.forEach(item => {
const update = document.createElement("div");
update.textContent = `${item.expression} = ${item.result}`;
historyContainer.prepend(update);
});
}

function saveCurrentState() {
localStorage.setItem("savedExpression", expressionDisplay.innerText);
localStorage.setItem("savedInput", display.value);}

document.getElementById("toggleHistory").addEventListener("click", function() {
document.getElementById("history").classList.toggle("hidden");
});

const darkBtn = document.getElementById("dark-toggle");
const calc = document.getElementById("calculator");
darkBtn.addEventListener("click", () => {
calc.classList.toggle("dark-mode");
if (calc.classList.contains("dark-mode")) {
darkBtn.innerHTML = "&#9728;";
} else {
darkBtn.innerHTML = "&#127769;";}
})

const display = document.getElementById("num");
const expressionDisplay = document.getElementById("expression");

for (let i = 0; i <= 9; i++) {
document.getElementById("num" + i).addEventListener("click",() => number(i));}
document.getElementById("dot").addEventListener("click",() => number("."));
document.getElementById("plusMinus").addEventListener("click", plusMinus);
document.getElementById("percent").addEventListener("click", percent);
document.getElementById("clearAll").addEventListener("click",clearAll);
document.getElementById("deleteLast").addEventListener("click",deleteLast);
document.getElementById("plus").addEventListener("click",() => setOperator("+"));
document.getElementById("minus").addEventListener("click",() => setOperator("-"));
document.getElementById("multiply").addEventListener("click",() => setOperator("*"));
document.getElementById("divide").addEventListener("click",() => setOperator("/"));
document.getElementById("equals").addEventListener("click", equals);


function number(num) {
if (display.value ==="0" || shouldResetDisplay){
display.value = num;
shouldResetDisplay = false;}
else{
display.value += num;}
saveCurrentState();
}

function setOperator(operator) {
const currentValue = parseFloat(display.value);
if (firstValue === null) {
firstValue = currentValue;}
else if (lastOperator) {
firstValue = calculate(firstValue, currentValue, lastOperator);
display.value = firstValue;}
 lastOperator = operator;
 shouldResetDisplay = true;
 expressionDisplay.textContent = firstValue + " " + operator;
 saveCurrentState();
}

function calculate(a, b, operator) {
 switch (operator) {
 case "+": return a + b;
  case "-": return a - b;
 case "*": return a * b;
 case "/": return  b === 0 ? "Error" : a / b;
 default: return b;
 }
 saveCurrentState();
 }

 function equals() {
 if (!lastOperator) return;
 const secondValue = parseFloat(display.value);
 const result = calculate(firstValue, secondValue, lastOperator);
 const expression = `${firstValue} ${lastOperator} ${secondValue}`;
  historyFeature(expression, result);
 display.value = result;
 expressionDisplay.textContent = firstValue + " " + lastOperator + " " + secondValue + " =";
 firstValue = result;
 lastOperator = null;
 shouldResetDisplay = true;
 saveCurrentState();
 }

 function percent() {
 display.value = parseFloat(display.value) / 100;
 shouldResetDisplay = true;
 saveCurrentState();
 }

 function plusMinus() {
 display.value = parseFloat(display.value) * -1;
 saveCurrentState();
}

 function clearAll() {
 display.value = "0";
 firstValue = null;
 lastOperator = null;
 shouldResetDisplay = false;
 saveCurrentState();
 }

 function deleteLast() {
 let current = display.value.toString();
 if (current === "0") return;
 current = current.slice(0, -1);
 display.value = current === "" ? "0" : current;
 saveCurrentState();
 }

loadHistory();

window.addEventListener("load", () => {
const exp = localStorage.getItem("savedExpression");
const inp = localStorage.getItem("savedInput");
if (exp !== null) expressionDisplay.innerText = exp;
if (inp !== null) display.value = inp;
})


