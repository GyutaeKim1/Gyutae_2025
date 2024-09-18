
# Calculator

<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    .calculator-container {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 5px;
      padding: 10px;
      position: absolute; /* Allows it to sit over the image */
      top: 150px; /* Adjust according to the image */
      left: 50%; /* Centers the calculator horizontally */
      transform: translateX(-50%); /* Centers horizontally by correcting offset */
      z-index: 2; /* Ensures the calculator appears above the image */
    }

    .calculator-output {
      grid-column: span 4;
      grid-row: span 1;
      padding: 0.25em;
      font-size: 20px;
      border: 5px solid black;
      background-color: #FAF9F6;
      color: black;
      display: flex;
      align-items: center;
      justify-content: right;
    }

    .calculator-number, .calculator-operation, .calculator-clear, .calculator-equals {
      padding: 20px;
      text-align: center;
      font-size: 18px;
      border: 2px solid black;
    }

    .calculator-number {
      color: black;
      background-color: #FAF9F6;
    }

    .calculator-operation {
      color: white;
      background-color: #808080;
    }

    .calculator-equals {
      color: black;
      background-color: #AEC6CF;
    }

    .calculator-clear {
      color: white;
      background-color: #FF6961;
    }

    .history-container {
      grid-column: span 4;
      padding: 0.5em;
      font-size: 16px;
      border-bottom: 1px solid black;
      display: none;
      color: white;
      background-color: #333;
    }

    #animation {
      position: relative;
      height: 100vh;
      width: 100%;
      background: url('images/calculator_image.png') no-repeat center center;
      background-size: cover;
    }

    #toggle-history, #clear-history {
      grid-column: span 4;
      margin: 10px 0;
    }

    .image-container {
      position: relative;
    }
  </style>
</head>
<body>

  <!-- Add a container for the animation -->
  <div id="animation">
    <div class="calculator-container">
      <!-- Button to toggle history -->
      <button id="toggle-history">Show History</button>
      <!-- Operation history, hidden by default -->
      <div id="operation-history" class="history-container">
        History:
      </div>
      <!-- Result (Output) -->
      <div class="calculator-output" id="output">0</div>
      <!-- Row 1 -->
      <div class="calculator-number">1</div>
      <div class="calculator-number">2</div>
      <div class="calculator-number">3</div>
      <div class="calculator-operation">+</div>
      <!-- Row 2 -->
      <div class="calculator-number">4</div>
      <div class="calculator-number">5</div>
      <div class="calculator-number">6</div>
      <div class="calculator-operation">-</div>
      <!-- Row 3 -->
      <div class="calculator-number">7</div>
      <div class="calculator-number">8</div>
      <div class="calculator-number">9</div>
      <div class="calculator-operation">*</div>
      <!-- Row 4 -->
      <div class="calculator-number">π</div>
      <div class="calculator-number">0</div>
      <div class="calculator-operation">√</div>
      <div class="calculator-operation">^</div>
      <!-- Row 5 -->
      <div class="calculator-clear">A/C</div>
      <div class="calculator-number">.</div>
      <div class="calculator-operation">±</div>
      <div class="calculator-equals">=</div>
      <!-- Clear History Button -->
      <button id="clear-history">Clear History</button>
    </div>
  </div>

  <!-- JavaScript (JS) implementation of the calculator. -->
  <script>
    // Initialize important variables to manage calculations
    var firstNumber = null;
    var operator = null;
    var nextReady = true;
    var equation = ''; // Variable to keep track of the full equation

    // Build objects containing key elements
    const output = document.getElementById("output");
    const history = document.getElementById("operation-history"); // Get the history div
    const toggleHistoryButton = document.getElementById("toggle-history"); // Get the toggle button
    const numbers = document.querySelectorAll(".calculator-number");
    const operations = document.querySelectorAll(".calculator-operation");
    const clear = document.querySelectorAll(".calculator-clear");
    const equals = document.querySelectorAll(".calculator-equals"); 
    const clearHistoryButton = document.getElementById("clear-history"); // Get the clear history button

    // Toggle history visibility
    toggleHistoryButton.addEventListener("click", function() {
      if (history.style.display === "none") {
        history.style.display = "block";
        toggleHistoryButton.textContent = "Hide History";
      } else {
        history.style.display = "none";
        toggleHistoryButton.textContent = "Show History";
      }
    });

    // Number buttons listener
    numbers.forEach(button => {
      button.addEventListener("click", function() {
        number(button.textContent);
      });
    });

    // Number action
    function number(value) {
      if (value != "." && value != "π") {
        if (nextReady) {
          output.innerHTML = value;
          nextReady = false;
        } else {
          output.innerHTML += value;
        }
        equation += value; // Build the equation string
      } else {
        if (value == "π") {
          output.innerHTML = Math.PI.toFixed(4); // Set π to 3.1415
          equation += Math.PI.toFixed(4); // Add π value to the equation
          nextReady = true;
        } else {
          if (!output.innerHTML.includes(".")) {
            output.innerHTML += value;
            equation += value; // Append the decimal point
          }
        }
      }
      displayEquation(); // Display the equation as it builds
    }

    // Operation buttons listener
    operations.forEach(button => {
      button.addEventListener("click", function() {
        operation(button.textContent);
      });
    });

    function operation(choice) {
      if (choice === "±") {
        output.innerHTML = (-parseFloat(output.innerHTML)).toString();
        equation = equation.slice(0, -output.innerHTML.length) + output.innerHTML; // Replace current number with its negation
        displayEquation(); // Display updated equation
        return;
      }
      if (firstNumber == null) {
        firstNumber = parseFloat(output.innerHTML);
        operator = choice;
        equation += " " + operator + " "; // Append operator to the equation
        nextReady = true;
        displayEquation(); // Display updated equation
        return;
      }
      firstNumber = calculate(firstNumber, parseFloat(output.innerHTML));
      operator = choice;
      equation += " " + operator + " "; // Append operator after result
      output.innerHTML = firstNumber.toString();
      nextReady = true;
      displayEquation(); // Display updated equation
    }

    // Calculator
    function calculate(first, second) {
      let result = 0;
      switch (operator) {
        case "+":
          result = first + second;
          break;
        case "-":
          result = first - second;
          break;
        case "*":
          result = first * second;
          break;
        case "/":
          result = first / second;
          break;
        case "^":
          result = first ** second;
          break;
        case "√":
          result = first ** (1/second);
          break;
        default: 
          break;
      }
      return result;
    }

    // Equals button listener
    equals.forEach(button => {
      button.addEventListener("click", function() {
        equal();
      });
    });

    // Equal action
    function equal () {
      const secondNumber = parseFloat(output.innerHTML);
      const result = calculate(firstNumber, secondNumber);
      updateHistory(firstNumber, operator, secondNumber); // Add to history before calculation
      firstNumber = result;
      equation += " = " + result; // Add result to the equation string
      output.innerHTML = result.toString();
      nextReady = true;
      displayEquation(); // Display the final result equation
    }

    // Display the equation as it builds in the output
    function displayEquation() {
      output.innerHTML = equation;
    }

    // Update history
    function updateHistory(first, operator, second) {
      // Create a new entry in the history
      let historyEntry = `${first} ${operator} ${second} = ${output.innerHTML}`;
      let historyDiv = document.createElement("div");
      historyDiv.textContent = historyEntry;
      history.appendChild(historyDiv); // Append the entry to history
    }

    // Clear the history
    clearHistoryButton.addEventListener("click", function() {
      history.innerHTML = 'History:';
    });

    // Clear button listener
    clear.forEach(button => {
      button.addEventListener("click", function() {
        clearAll();
      });
    });

    // Clear all action
    function clearAll() {
      output.innerHTML = "0";
      firstNumber = null;
      operator = null;
      equation = ''; // Reset the equation string
    }
  </script>

</body>
</html>

