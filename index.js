const display = document.querySelector(".display");
// console.log("display:", { display });

const buttons = document.querySelectorAll(".btns > div"); // node list
// console.log("buttons:", { buttons });

const buttonsArray = Array.from(buttons); // array
// console.log("buttonsArray:", buttonsArray);

let displayStr = ""; // variable to store the display string

let operators = ["+", "-", "*", "/"];

let lastOperator = "";

const displayResult = (displayStr) => {
  // console.log("displayStr:", displayStr);
  display.textContent = displayStr || "0.00";
};

buttonsArray.forEach((button) => {
  button.addEventListener("click", (e) => {
    // console.log("button clicked:", { button });
    const buttonText = button.textContent;
    // console.log("buttonText:", { buttonText });

    if (buttonText === "AC") {
      displayStr = "";
      displayResult(displayStr);
      return;
    }

    if (operators.includes(buttonText)) {
      // includes returns true or false

      if (displayStr === "") {
        return;
      }

      lastOperator = buttonText;
      //   console.log("lastOperator:", { lastOperator });
      const lastChar = displayStr[displayStr.length - 1];
      //   console.log("lastChar:", { lastChar });
      if (operators.includes(lastChar)) {
        displayStr = displayStr.slice(0, -1);
        displayStr += buttonText;
        displayResult(displayStr);
        return;
      }
    }

    if (buttonText === ".") {
      if (displayStr.includes(".") && !lastOperator) {
        return;
      }
      //  only one decimal point is allowed
      // prevent multiple operators after the decimal point
      if (lastOperator) {
        const lastOperatorIndex = displayStr.lastIndexOf(lastOperator);
        const lastNumber = displayStr.slice(lastOperatorIndex + 1);
        console.log("lastNumber:", { lastNumber });
        if (lastNumber.includes(".")) {
          return;
        }
        if (!lastOperator && displayStr.includes(".")) {
          return;
        }
      }
    }

    if (buttonText === "C") {
      displayStr = displayStr.slice(0, -1);
      displayResult(displayStr);
      return;
    }

    if (buttonText === "=") {
      if (displayStr === "") {
        return;
      }

      const result = eval(displayStr);
      displayStr = result.toString();
      displayResult(displayStr);
      return;
    }

    displayStr += buttonText;
    // console.log("displayStr:", displayStr);

    displayResult(displayStr);
  });
});
