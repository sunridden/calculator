function operate(operator, num1, num2) {
    let result = undefined;
    switch(operator) {
        case "Addition":
            result = add(num1, num2);
            break;
        case "Subtraction":
            result = subtract(num1, num2);
            break;
        case "Multiply":
            result = multiply(num1, num2);
            break;
        case "Division":
            result = divide(num1, num2);
    }

    //logic for rounding decimals to three places
    if (result % 1 != 0) {
        if (result != "Cannot compute") {
            result = result.toFixed(3);
        }
    }

    return result;
}

function add(num1, num2) {
    return Number(num1) + Number(num2);
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 == 0) {
        return ("Cannot compute");
    } else {
        return num1 / num2;
    }
}

function display(text) {
    const screen_text = document.getElementById("screen-text");
    screen_text.innerHTML = text;
}

function displayCalculation(text) {
    const calculationText = document.getElementById("calculation-display");
    calculationText.innerHTML = text;
}

function calculate() {
    let currentValue = [];
    let calculationString = [];
    let currentCalculation = 0;
    let operation = undefined;
    let currentNumber = 0;
    let oldNumber = undefined;
    let result = 0;

    const operands = document.querySelectorAll(".display");
    operands.forEach((operand) => {
        operand.addEventListener('click', () => {
            //the displayed value needs to be the concactenated string with all decimal values for a number
            currentValue.push(operand.innerHTML);
            currentNumber = currentValue.join("");
            display(currentNumber);

            calculationString.push(operand.innerHTML);
            currentCalculation = calculationString.join("");
            displayCalculation(currentCalculation);
        })
    })

    //logic to prevent decimal point being pressed more than once for a single number
    const decimalPoint = document.querySelector(".decimal");
    decimalPoint.addEventListener('click', () => {
        if (!(currentValue.includes("."))) {
            currentValue.push(decimalPoint.innerHTML);
            currentNumber = currentValue.join("");
            display(currentNumber);

            calculationString.push(decimalPoint.innerHTML);
            currentCalculation = calculationString.join("");
            displayCalculation(currentCalculation);
        }
    })

    const operators = document.querySelectorAll(".operator");
    operators.forEach((operator) => {
        operator.addEventListener('click', () => {

            //logic that checks for two numbers and an operator leading to a calculation being performed
            if (oldNumber != undefined && currentNumber != undefined && operation != undefined) {
                result = operate(operation, oldNumber, currentNumber);
                display(result);
                //if an operation has completed, sets that value to be the next number calculated on
                oldNumber = result;
                calculationString = [];
                let resetValue = result.toString();
                calculationString.push(resetValue);

            } else if (operation === undefined) {
                oldNumber = currentNumber;
            }

            //resets value for next number to be inputted
            currentValue = [];
            currentNumber = undefined;

            switch(operator.innerHTML) {
                case "/":
                    operation = "Division";
                    break;
                case "X": 
                    operation = "Multiply";
                    break;
                case "-":
                    operation = "Subtraction";
                    break;
                case "+":
                    operation = "Addition";
            }

            //check case for more than one operator pressed in succession
            let lastValue = calculationString.slice(-1);
            if (lastValue === "/" || lastValue === "X" || lastValue === "-" || lastValue === "+") {
                calculationString.pop();
            }

            calculationString.push(operator.innerHTML);
            currentCalculation = calculationString.join("");
            displayCalculation(currentCalculation);
        })
    })

    const equalsBtn = document.querySelector(".equals");
    equalsBtn.addEventListener('click', () => {
        if (oldNumber != undefined && currentNumber != undefined && operation != undefined) {
            result = operate(operation, oldNumber, currentNumber);
            display(result);

            calculationString = [];
            let resetValue = result.toString();
            calculationString.push(resetValue);
            currentCalculation = calculationString.join("");
            displayCalculation(currentCalculation);

            //prevents delete key from removing calculated value
            currentValue = [];

            oldNumber = result;
            currentNumber = undefined;
        }
    })

    const clearBtn = document.querySelector(".clear");
    clearBtn.addEventListener('click', () => {
        oldNumber = undefined;
        currentValue = [];
        currentNumber = 0;
        operation = undefined;
        calculationString = [];
        currentCalculation = 0;
        display(currentNumber);
        displayCalculation("");
    })

    const backspaceBtn = document.querySelector(".delete");
    backspaceBtn.addEventListener('click', () => {
        if (currentValue.length != 0) {
            currentValue.pop();
            currentNumber = currentValue.join("");
            display(currentNumber);

            calculationString.pop();
            currentCalculation = calculationString.join("");
            displayCalculation(currentCalculation);
        }
    })
}

calculate();
