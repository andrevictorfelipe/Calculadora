const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operator]");
const equalButton = document.querySelector("[data-equal]");
const deleteButton = document.querySelector("[data-delete]");
const previousOperandText = document.querySelector("[data-previous-operand]");
const currentOperandText = document.querySelector("[data-current-operand]");
const allClearButton = document.querySelector("[data-all-clear]");

class Calculator {
  constructor(previousOperandText, currentOperandText) {
    this.previousOperandText = previousOperandText;
    this.currentOperandText = currentOperandText;
    this.clear();
  }

  formatDisplayNumber(number){
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]

    let integerDisplay;
    if(isNaN(integerDigits)){
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0
      })
    }

    if(decimalDigits != null){
      return `${integerDisplay}.${decimalDigits}`
    } else{
      return integerDisplay
    }
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  calculate() {
    let result;
    const previousOperandFloat = parseFloat(this.previousOperand);
    const currentOperandFloat = parseFloat(this.currentOperand);

    if (isNaN(previousOperandFloat) || isNaN(currentOperandFloat)) return;

    switch (this.operation) {
      case "+":
        result = previousOperandFloat + currentOperandFloat;
        break;
      case "-":
        result = previousOperandFloat - currentOperandFloat;
        break;
      case "*":
        result = previousOperandFloat * currentOperandFloat;
        break;
      case "÷":
        result = previousOperandFloat / currentOperandFloat;
        break;
      default:
        return;
    }

    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = "";
  }

  chooseOperation(operation) {
    if(this.currentOperand == '') return '0'
    if (this.previousOperand != "") {
      this.calculate();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  appendNumber(number) {
    if (this.currentOperand.includes(",") && number == ",") return;
    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }
  updateDisplay() {
    this.previousOperandText.innerText = `${this.formatDisplayNumber(this.previousOperand)} ${
      this.operation || ""
    }`;
    this.currentOperandText.innerText = this.formatDisplayNumber(this.currentOperand);
  }
}

const calculator = new Calculator(previousOperandText, currentOperandText);

for (let numberButton of numberButtons) {
  numberButton.addEventListener("click", () => {
    calculator.appendNumber(numberButton.innerText);
    calculator.updateDisplay();
  });
}

for (let operationButton of operationButtons) {
  operationButton.addEventListener("click", () => {
    calculator.chooseOperation(operationButton.innerText);
    calculator.updateDisplay();
  });
}

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

equalButton.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
