---
layout: post
title: Calculator
permalink: /calculator/sprint1
toc: True
comments: True
---

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

 <style>
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
    display: none; /* Hidden by default */
    background-color: #333333; /* Dark background */
    color: white; /* White text */
  }
</style>

<!-- Add a container for the animation -->
<div id="animation">
  <div class="calculator-container">
    <!-- Button to toggle history -->
    <button id="toggle-history" style="grid-column: span 4; margin-bottom: 10px;">Show History</button>
    <!-- Operation history, hidden by default -->
    <div id="operation-history" class="history-container">
      History:
    </div>
    <!-- Result -->
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
    <button id="clear-history" style="grid-column: span 4; margin-top: 10px;">Clear History</button>
  </div>
</div>

<!-- JavaScript (JS) implementation of the calculator. -->
<script>
  // Initialize important variables to manage calculations
  var firstNumber = null;
  var operator = null;
  var nextReady = true;
  
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
      if (nextReady == true) {
        output.innerHTML = value;
        if (value != "0") {
          nextReady = false;
        }
      } else {
        output.innerHTML = output.innerHTML + value;
      }
    } else {
      if (value == "π") {
        output.innerHTML = Math.PI.toFixed(4); // Set π to 3.1415
        nextReady = true;
      } else {
        if (output.innerHTML.indexOf(".") == -1) {
          output.innerHTML = output.innerHTML + value;
          nextReady = false;
        }
      }
    }
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
      return;
    }
    if (firstNumber == null) {
      firstNumber = parseFloat(output.innerHTML);
      nextReady = true;
      operator = choice;
      return;
    }
    const secondNumber = parseFloat(output.innerHTML);
    const result = calculate(firstNumber, secondNumber);
    updateHistory(firstNumber, operator, secondNumber, result); // Update history after calculation
    firstNumber = result;
    operator = choice;
    output.innerHTML = result.toString();
    nextReady = true;
}

  // Calculator
  function calculate (first, second) { // function to calculate the result of the equation
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
  function equal() { 
    const secondNumber = parseFloat(output.innerHTML);
    const result = calculate(firstNumber, secondNumber);
    updateHistory(firstNumber, operator, secondNumber, result); // Update history after calculation
    firstNumber = result;
    output.innerHTML = result.toString();
    nextReady = true;
}
  function updateHistory(first, operator, second, result) {
    // Create a new entry in the history
    let historyEntry = `${first} ${operator} ${second} = ${result}`;
    let historyDiv = document.createElement("div");
    historyDiv.textContent = historyEntry;
    history.appendChild(historyDiv); // Append the new entry to the history
  }

  // Clear button listener
  clear.forEach(button => {
    button.addEventListener("click", function() {
      clearCalc();
    });
  });
  
  // A/C action
  function clearCalc () { // Clears calculator output, but not history
      firstNumber = null;
      output.innerHTML = "0";
      nextReady = true;
  }

  // Clear history button listener
  clearHistoryButton.addEventListener("click", function() {
    clearHistory();
  });

  // Clear history function
  function clearHistory() {
    history.innerHTML = "History:"; // Clear the history content
  }

  // Listen for keyboard events
  document.addEventListener("keydown", function(event) {
    const key = event.key;
    // Handle numbers and decimal point
    if (/^[0-9]$/.test(key) || key === ".") {
      number(key);
    }
    // Backspace key for delete
    if (key === "Backspace") {
      deleteLastCharacter();
    }
  });

  // Function to delete the last character
  function deleteLastCharacter() {
    const currentOutput = output.innerHTML;
    if (currentOutput.length > 1) {
      output.innerHTML = currentOutput.slice(0, -1);
    } else {
      output.innerHTML = "0";
      nextReady = true;
    }
  }
</script>

<!--Vanta animations just for fun, load JS onto the page-->
<script src="{{site.baseurl}}/assets/js/three.r119.min.js"></script>
<script src="{{site.baseurl}}/assets/js/vanta.halo.min.js"></script>
<script src="{{site.baseurl}}/assets/js/vanta.birds.min.js"></script>
<script src="{{site.baseurl}}/assets/js/vanta.net.min.js"></script>
<script src="{{site.baseurl}}/assets/js/vanta.rings.min.js"></script>

<script>
// setup vanta scripts as functions
var vantaInstances = {
  halo: VANTA.HALO,
  birds: VANTA.BIRDS,
  net: VANTA.NET,
  rings: VANTA.RINGS
};

// obtain a random vanta function
var vantaInstance = vantaInstances[Object.keys(vantaInstances)[Math.floor(Math.random() * Object.keys(vantaInstances).length)]];

// run the animation
vantaInstance({
  el: "#animation",
  mouseControls: true,
  touchControls: true,
  gyroControls: false
});
</script>