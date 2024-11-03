//Global Variables
var numA = null;
var numB = null;
var operator = null;
var displayArr = [];


//DOM Queries
const displayBox = document.getElementById("display");
const buttonsContainer = document.getElementById("buttons-container");
const operatorButtons = document.getElementById("row-two");
const clearButton = document.getElementById("clear");
const equals = document.getElementById("equals");
const zero = document.getElementById("zero");
const decimal = document.getElementById("decimal");
const deleteButton = document.getElementById("delete-button");

// const calcContainer = document.getElementById("calc-container"); //for testing

//Event Listeners
clearButton.addEventListener("click", reset);
buttonsContainer.addEventListener("click", populateDisplay);
zero.addEventListener("click", populateDisplay);
operatorButtons.addEventListener("click", logValues);
decimal.addEventListener("click", addDecimal);
deleteButton.addEventListener("click", backspace)

equals.addEventListener("click", function() {
    if (numA === null || operator === null) {
        return;
    }
    if (numB === null && numA != null && operator != null) {
        numB = Number(displayBox.textContent);
    };
    if (numB === 0 && operator === "/") {
        updateDisplay(["ERROR"]);
        return;
    }
    operate(operator, Number(numA), Number(numB));
    updateDisplay(displayArr);
    });
    
// calcContainer.addEventListener("click", printInfo) //for testing


                                                //FUNCTIONS//
updateDisplay([0, 0]); //sets display to '00' on load

// function printInfo () {                      //for testing
//     console.log(`First Number: ${numA}`);
//     console.log(`Second Number: ${numB}`);
//     console.log(`Operator: ${operator}`);
// }

//Reset function
function reset () {
    numA = null;
    numB = null;
    operator = null;
    displayArr = [];
    updateDisplay([0, 0]);
}

//Update display
function updateDisplay(arr) {
    let joinedArr = arr.join("");
    displayBox.textContent = joinedArr;
}

//Populates display with clicked number
function populateDisplay(e) {
    displayArr.push(e.target.textContent)
    updateDisplay(displayArr);
}

function backspace () {
    displayArr.pop();
    updateDisplay(displayArr);
}

//Log values for operation
function logValues (e) {
    if (numA != null && operator != null) {
        numB = Number(displayBox.textContent);
        var newNum = numA;
        numA = operate(operator, Number(newNum), Number(numB));
        displayArr = [];
        displayArr.push(Number(numA));
        updateDisplay(displayArr);
        operator = e.target.textContent;
        numB = null;
        displayArr = [];
        return;
    }
    if (operator === null) {
        operator = e.target.textContent;
    }
    if (numA === null) {
        numA = Number(displayBox.textContent);
    }
    displayArr = [e.target.textContent];
    updateDisplay(displayArr);
    displayArr = [];
}

function addDecimal (e) {
    let string = displayBox.textContent;
    if (!string.includes(".")) {
        displayArr.push(e.target.textContent);
    }
    updateDisplay(displayArr);
}

//Arithmetic Functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

//Calculate Function
function operate(operator, firstNum, secondNum) {
    var total = 0;
    if (operator === "+") {
        total = add(firstNum, secondNum);
    } else if (operator === "-") {
        total = subtract(firstNum, secondNum);
    } else if (operator === "*") {
       total = multiply(firstNum, secondNum);
    } else if (operator === "/") {
        if (Number(secondNum) === 0) {
            updateDisplay(["ERROR"]);   
        } else total = divide(firstNum, secondNum);
    };
    if (!Number.isInteger(total)) {
        total = Number(total.toFixed(5));
    }
    displayArr = [total];
    return Number(total);
}

