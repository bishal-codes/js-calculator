const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".btns > div");

const btnsArr = Array.from(buttons);
let displayStr = "";

let operators = ["+", "-", "*", "/"];
let lastOperator = "";

const displayResult = (displayStr) => {
  display.textContent = displayStr || "0.00";
};

btnsArr.forEach((button) => {
  button.addEventListener("click", (e) => {
    const btnValue = button.textContent;

    if (btnValue === "AC") {
      displayStr = "";
      displayResult(displayStr);
      return;
    }

    if (btnValue === "C") {
      displayStr = displayStr.slice(0, -1);
      displayResult(displayStr);
      return;
    }

    if (operators.includes(btnValue)) {
      const lastChar = displayStr[displayStr.length - 1]; // 123+
      if (operators.includes(lastChar)) {
        displayStr = displayStr.slice(0, -1);
      }
      displayStr += btnValue;
      lastOperator = btnValue;
      displayResult(displayStr);
      return;
    }

    if (btnValue === ".") {
      // preventing multiple decimal points after an operator
      if (lastOperator) {
        const lastOperatorIndex = displayStr.lastIndexOf(lastOperator);
        const lastNumber = displayStr.slice(lastOperatorIndex + 1);
        if (lastNumber.includes(".")) {
          return;
        }
      }
      // prevent multiple decimal points before an operator
      else if (displayStr.includes(".")) {
        return;
      }
      // adding 0 BEFORE a decimal point if the display is empty
      if (
        displayStr === "" ||
        operators.includes(displayStr[displayStr.length - 1])
      ) {
        displayStr += "0";
      }
    }

    if (btnValue === "=") {
      // displayStr = eval(displayStr).toString(); // leads to security issues

      try {
        const result = evalExpression(displayStr);
        displayStr = result.toString();
        displayResult(displayStr);
      } catch (error) {
        displayStr = "";
        displayResult("Invalid expression");
      }
      return;
    }

    displayStr += btnValue;
    displayResult(displayStr);
  });
});

const evalExpression = (expression) => {
  let result;
  try {
    result = new Function(`return ${expression}`)();
  } catch (error) {
    throw new Error("Invalid expression");
  }
  return parseFloat(result.toFixed(10));
};
