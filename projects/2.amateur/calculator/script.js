/* 
Version 1:
create all buttons(number and operators) and display window
    1. style.css
    2. 5 colors using adobe trend color scheme

Version 2:
    1. show current number 
	2. Display "ERR" if > NaN
    3. AC operator clear all internal work area and set display to 0
    4. C operator clear the last digit

Version 3:
    1. show the result of the last operation
    2. equals operator funciontality
    3. Display "ERR" if > 8 digit limit
    4. operatorHandler object and methods
    5. +/- operator change the sign of the number that is currently displayed
    6. decimal point ('.') button on the entry pad to that allows floating point numbers up to 3 places to be entered and operations to be carried out to the maximum number of decimal places entered for any one number.
    7. % percentage operator value/100 
*/


// V2. displaying value on screen
function displayValue(num) {
    document.querySelector(".screen").innerText = num;
}

// V2. return displayed value
function getValue() {
    return document.querySelector(".screen").innerText;    
}

// V2. arithmetic operation V2: Operators respond to click
var operator = document.querySelectorAll(".operator");
for(var i=0;i<operator.length;i++) {
    operator[i].addEventListener('click', function() {
        alert("operator clicked" + this.id);
    })};

// V2. numbers respond to click and display properly on screen
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

// V2. all-clear operation
var allClear = document.querySelector(".all-clear");
allClear.addEventListener('click', function() {
    displayValue("0");
    });

// V2. backspace operation
var backspace = document.querySelector(".backspace");
backspace.addEventListener('click', function() {
    var currentNum = getValue().toString();
    if(currentNum.length!==1){
        displayValue(currentNum.slice(0, currentNum.length-1)); 
    } else{
        displayValue("0");
    }
});

