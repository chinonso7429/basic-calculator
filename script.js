let firstValue = null;
let lastOperator = null;
let shouldResetDisplay = false;

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
}

function calculate(a, b, operator) {
 switch (operator) {
 case "+": return a + b;
  case "-": return a - b;
 case "*": return a * b;
 case "/": return  b === 0 ? "Error" : a / b;
 default: return b;
 }
 }

 function equals() {
 if (!lastOperator) return;
 const secondValue = parseFloat(display.value);
 const result = calculate(firstValue, secondValue, lastOperator);
 display.value = result;
 expressionDisplay.textContent = firstValue + " " + lastOperator + " " + secondValue + " =";
 firstValue = result;
 lastOperator = null;
 shouldResetDisplay = true;
 }

 function percent() {
 display.value = parseFloat(display.value) / 100;
 shouldResetDisplay = true;
 }

 function plusMinus() {
 display.value = parseFloat(display.value) * -1;
 }

 function clearAll() {
 display.value = "0";
 firstValue = null;
 lastOperator = null;
 shouldResetDisplay = false;
 }

 function deleteLast() {
 let current = display.value.toString();
 if (current === "0") return;
 current = current.slice(0, -1);
 display.value = current === "" ? "0" : current;
 }


