/* 
Version 1:
create all buttons(number and operators) and display window
    1. style.css
    2. 5 colors using adobe trend color scheme

Version 2:
    1. show current number or the result of the last operation
	2. Display "ERR" if > 8 digit limit
    3. operatorHandler object methods
	    1. onclick function on the last number entered
    4. C operator clear the last digit
    5. AC operator clear all internal work area and set display to 0

Version 3:
    1. +/- operator change the sign of the number that is currently displayed
    2. decimal point ('.') button on the entry pad to that allows floating point numbers up to 3 places to be entered and operations to be carried out to the maximum number of decimal places entered for any one number.
    3. % percentage operator value/100 
*/

/* 1. list all var

number
operator
equals
all-clear
backspace

2. display
*/

// screen displaying value


function displayValue(num) {
    document.querySelector(".screen").innerText = num;
}
    // this function works displayValue("ERR");

function getValue() {
    return document.querySelector(".screen").innerText;    
}

var oldNum = "",
    resultNum;

// operation
var operator = document.querySelectorAll(".operator");
for(var i=0;i<operator.length;i++) {
    operator[i].addEventListener('click', function() {
        moveNum(){
            oldNum = currentNum;
            currentNum = "";
            operator = this.id;
        };
        displayNum() {
            oldNum = parseInt(oldNum);
            currentNum = parseInt(currentNum);
            let resultNum = 0;
            switch(operator) {
                case "+":
                    resultNum = oldNum + currentNum;
                    break;
                case "-":
                    resultNum = oldNum - currentNum;
                    break;
                case "*":
                    resultNum = oldNum * currentNum;           
                    break;
                case "/":
                    resultNum = oldNum / currentNum;
                    break;
                default:
                    resultNum = currentNum;
                }
            }
        })};

// numbers
var number = document.querySelectorAll(".number");
for(var i=0;i<number.length;i++) {
    number[i].addEventListener('click', function() {
        var currentNum = getValue();
        
        if(currentNum===NaN) {
            displayValue("ERR");
        } else if(currentNum === "0") {
            currentNum = "";
            currentNum = currentNum + this.id;
            displayValue(currentNum);   
        }  else {
            currentNum = currentNum + this.id;
            displayValue(currentNum);   
        }
    })
}

// all-clear operation
var allClear = document.querySelector(".all-clear");
allClear.addEventListener('click', function() {
    displayValue("0");
    });

// backspace operation
var backspace = document.querySelector(".backspace");
backspace.addEventListener('click', function() {
    var currentNum = getValue().toString();
    if(currentNum.length!==1){
        displayValue(currentNum.slice(0, currentNum.length-1)); 
    } else{
        displayValue("0");
    }
});


// // Object: 
// const calculator = {
//     viewerDisplay: "0",
//     firstOperand: null,
//     waitingForSecondOperand: false,
//     operator: null
// };

// function inputDigit(digit) {
//     const {viewerDisplay, waitingForSecondOperand} = calculator;
//     if (waitingForSecondOperand === true) {
//         calculator.viewerDisplay = digit;
//         calculator.waitingForSecondOperand = flase;
//     } else {
//         calculator.viewerDisplay = viewerDisplay === "0" 
//             ? digit : viewerDisplay + digit;
//     }
// };
  
// function operatorHandler(nextOperator) {
//     const { firstOperand, viewerDisplay, operator} = calculator;
//     const inputNum = parseInt(viewerDisplay);

//     if(operator && calculator.waitingForSecondOperand) {
//         calculator.operator = nextOperator;
//         return;
//     }

//     if (firstOperand == null && !isNaN(inputValue)) {
//         calculator.firstOperand = inputNum;
//     } else if (operator) {
//         const currentNum = firstOperand || 0;
//         const resultNum = calculate (currentNum, inputNum, operator);

//         calculator.viewerDisplay = String(resultNum);
//         calculator.firstOperand = resultNum;
//     }

//     calculator.waitingForSecondOperand = true;
//     calculator.operator = nextOperator;
// }

// function calculate(firstOperand,secondOperand, operator) {
//     let resultNum = 0;
//     switch(operator) {
//         case "addition":
//             resultNum = firstOperand + secondOperand;
//             break;
//         case "substraction":
//             resultNum = firstOperand - secondOperand;
//             break;
//         case "multiplication ":
//             resultNum = firstOperand * secondOperand;
//             break;
//         case "division":
//             resultNum = firstOperand / secondOperand;
//             break;
//           }
//           return resultNum;
// }

// function resetCalculator() {
//     calculator.viewerDisplay = '0';
//     calculator.firstOperand = null;
//     calculator.waitingForSecondOperand = false;
//     calculator.operator = null;
// }

// function updateDisplay() {
//     const display = document.querySelector(".calculator-screen");
//     display.value = calculator.viewerDisplay;
// }

// updateDisplay();

// const buttons = document.querySelector(".calculator-buttons");
// buttons.addEventListener('click', event => {
//     const {target} = event;
//     if (!target.matches('button')) {
//         return;
//     }
//     if (target.classList.contains('operator')) {
//         operatorHandler(target.value);
//         updateDisplay();
//         return;
//     }
//     if (target.classList.contains('all-clear')) {
//         resetCalculator();
//         updateDisplay();
//         return;
//     }

//     inputDigit(target.value);
//     updateDisplay();
    
// })
// const display = document.querySelector(".calculator-screen");

// // let operators = document.querySelectorAll(".operator")
// let inputs = [];

// document.querySelectorAll(".number").forEach(
//     input => {
//         input.onclick = () => input.value = input.value !=="0" 
//         ? input.value + input.innerHTML : input.innerHTML;
//     }
// )

// working on this 
// document.querySelectorAll(".calculator-buttons").forEach(addDigit, newNum="") { 
//     let newNum = HTMLButtonElement.innerHTML;
//     if(newNum ！=="0" ? display.innerHTML + newNum : display.innerHTML;
//        }


// // V2.1 display numbers
// function inputDigit(digit, value = "") {
//     inputs.push(value === "" ? parseInt(display.innerHTML) : value);
//     inputs.push(digit);
//     display.innerHTML = "0";
// }


// // V2.2. Display "ERR" if > 8 digit limit
// function digitLimit(digit) {
//     if(display.innerHTML.length > 7) {
//         function displayErr(msg) {
//         display.innerHTML = "ERR";
//         }
//         return;
//     }
//     display.innerHTML = display.innerHTML === "0" 
//         ? digit : display.innerHTML + digit;
// }


// // V2.3 operatorHandler object method
// function operatorHandler() {
//     let resultNum = 0;
//     switch(inputs[1]) {
//         case "addition":
//             resultNum = inputs[0] + inputs [2];
//             break;
//         case "substraction":
//             resultNum = inputs[0] - inputs [2];
//             break;
//         case "multiplication ":
//             resultNum = inputs[0] * inputs [2];
//             break;
//         case "division":
//             resultNum = inputs[0] / inputs [2];
//             break;
//       }
//       return resultNum;
// }

// // // V2.4. C operator clear the last digit
// // function backspace() {
// //     inputs.pop();
// //     display.innerHTML;
// // }

// // V2.5. AC operator clear all internal work area and set display to 0
// function allClear() {
//     display.innerHTML = "0";
//     inputs = []
// }

// // // V3.1 plus-minus feature
// // function plusMinus() {
// //     display.innerHTML = (parseInt(display.innerHTML) * -1);
// // }
