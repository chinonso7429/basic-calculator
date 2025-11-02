let lastOperator = null;
function calculate(operator) {
const num1 = document.getElementById("num1").value;
const num2 = document.getElementById("num2").value;
const resultDiv = document.getElementById("result");

if (num1 === "" || num2 === "" || isNaN(num1) ||isNaN(num2)) {
resultDiv.innerHTML = "<span class='error'> ⚠ Please enter valid numbers!</span>";
return;}


const n1 = parseFloat(num1);
const n2 = parseFloat(num2);

let result;

switch (operator) {
case '+':
result = n1 + n2;
break;
case '-':
result = n1 - n2;
break;
case '*':
result = n1 * n2;
break;
case '/':
if (n2 === 0) {
resultDiv.innerHTML = "<span class='error'>Error:Division by zero!</span>";
return;}
result = n1 / n2;
break;
default:
resultDiv.innerHTML = "<span class='error'>Error:Unknown operation!</span>";
return;}

resultDiv.innerHTML = `Result: ${result}`;

lastOperator = operator;}

document.addEventListener("keydown", (event) => {
const key = event.key;


if (key === "+" || key === "-" || key === "*" || key ==="/"){
calculate(key);}
else if (key ==="Enter" && lastOperator){
calculate(lastOperator);}
})









