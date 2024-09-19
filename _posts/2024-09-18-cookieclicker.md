---
layout: post
title: Cookie Cliker
permalink: /cookieclicker/sprint1
toc: True
comments: True
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cookie Clicker</title>
    <style>
        body {
            text-align: center;
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            color: #333;
        }
        #cookie {
            width: 200px;
            cursor: pointer;
            margin-top: 20px;
        }
        #shop {
            margin-top: 20px;
        }
        button {
            margin: 10px;
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        button:hover {
            background-color: #45a049;
        }
        .icon {
            width: 20px;
            height: 20px;
            margin-right: 10px;
        }
        #save-load {
            margin-top: 20px;
        }
        #save-load input {
            width: 300px;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        #messages {
            margin-top: 20px;
            color: green;
            font-weight: bold;
        }
        #game p {
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <h1>Fancy Cookie Clicker</h1>
    <div id="game">
        <!-- Cookie Section -->
        <div id="cookie-section">
            <img id="cookie" src="../images/cookie_icon.png" alt="Cookie">
            <audio id="click-sound" src="../sound/sound1.mp3"></audio>
        </div>
        <!-- Display Cookies and Cookies per Second -->
        <p id="cookie-count">Cookies: 0</p>
        <p id="cookies-per-second">Cookies per second: 0</p>
        <!-- Shop Section -->
        <div id="shop">
            <!-- Granny Purchase -->
            <button id="buy-granny">
                <img src="../images/grandma-cookie-removebg-preview.png" class="icon" alt="Granny Icon">
                Buy Granny (Cost: <span id="granny-cost">100</span> cookies)
            </button>
            <p id="granny-count">Grannies: 0 (each makes 1 cookie per second)</p>
            <!-- Factory Purchase -->
            <button id="buy-factory">
                <img src="../images/factory-cookie-removebg-preview.png" class="icon" alt="Factory Icon">
                Buy Factory (Cost: <span id="factory-cost">500</span> cookies)
            </button>
            <p id="factory-count">Factories: 0 (each makes 5 cookies per second)</p>
            <!-- Plane Purchase -->
            <button id="buy-plane">
                <img src="../images/plane-icon-f.png" class="icon" alt="Plane Icon">
                Buy Plane (Cost: <span id="plane-cost">2000</span> cookies)
            </button>
            <p id="plane-count">Planes: 0 (each makes 10 cookies per second)</p>
            <!-- Worldwide Factory Purchase -->
            <button id="buy-worldwide-factory">
                <img src="../images/factories-cookie-removebg-preview.png" class="icon" alt="Worldwide Factory Icon">
                Buy Worldwide Factory Network (Cost: <span id="worldwide-factory-cost">100,000</span> cookies)
            </button>
            <p id="worldwide-factory-count">Worldwide Factories: 0 (each makes 300 cookies per second)</p>
        </div>
        <!-- Milestone Messages -->
        <div id="messages"></div>
        <!-- Save/Load Game Section -->
        <div id="save-load">
            <button id="save-game">Save Game</button>
            <button id="load-game">Load Game</button>
            <input type="text" id="save-code" placeholder="Paste your save code here">
        </div>
    </div>
    <script>
        let cookies = 0;
        let totalCookies = 0;
        let cookiesPerSecond = 0;
        let grannyCost = 100;
        let factoryCost = 500;
        let planeCost = 2000;
        let worldwideFactoryCost = 100000;
        let grannyCount = 0;
        let factoryCount = 0;
        let planeCount = 0;
        let worldwideFactoryCount = 0;
        const cookieCountDisplay = document.getElementById("cookie-count");
        const cookiesPerSecondDisplay = document.getElementById("cookies-per-second");
        const cookie = document.getElementById("cookie");
        const clickSound = document.getElementById("click-sound");
        const grannyCountDisplay = document.getElementById("granny-count");
        const factoryCountDisplay = document.getElementById("factory-count");
        const planeCountDisplay = document.getElementById("plane-count");
        const worldwideFactoryCountDisplay = document.getElementById("worldwide-factory-count");
        const grannyCostDisplay = document.getElementById("granny-cost");
        const factoryCostDisplay = document.getElementById("factory-cost");
        const planeCostDisplay = document.getElementById("plane-cost");
        const worldwideFactoryCostDisplay = document.getElementById("worldwide-factory-cost");
        const messageDisplay = document.getElementById("messages");
        // Milestones and Messages
        let milestones = [100, 500, 1000, 5000, 100000, 1000000, 10000000];
        let messages = [
            "You've produced your first 100 cookies!",
            "People are starting to buy them!",
            "People like your cookies!",
            "Your cookies are being sold in several countries!",
            "A renowned chef declared that you make the best cookies in the world!",
            "Your cookies are known worldwide!",
            "You have the most successful cookie brand in the world!",
        ];
        let milestoneIndex = 0;
        function updateDisplay() {
            cookieCountDisplay.innerText = `Cookies: ${cookies}`;
            cookiesPerSecondDisplay.innerText = `Cookies per second: ${cookiesPerSecond}`;
            grannyCountDisplay.innerText = `Grannies: ${grannyCount} (each makes 1 cookie per second)`;
            factoryCountDisplay.innerText = `Factories: ${factoryCount} (each makes 5 cookies per second)`;
            planeCountDisplay.innerText = `Planes: ${planeCount} (each makes 10 cookies per second)`;
            worldwideFactoryCountDisplay.innerText = `Worldwide Factories: ${worldwideFactoryCount} (each makes 300 cookies per second)`;
            grannyCostDisplay.innerText = grannyCost;
            factoryCostDisplay.innerText = factoryCost;
            planeCostDisplay.innerText = planeCost;
            worldwideFactoryCostDisplay.innerText = worldwideFactoryCost;
        }
        function showMilestoneMessage() {
            if (milestoneIndex < milestones.length && totalCookies >= milestones[milestoneIndex]) {
                messageDisplay.innerText = messages[milestoneIndex];
                milestoneIndex++;
                setTimeout(() => { messageDisplay.innerText = ""; }, 3000);
            }
        }
        function saveGame() {
            const gameState = {
                cookies,
                totalCookies,
                cookiesPerSecond,
                grannyCost,
                factoryCost,
                planeCost,
                worldwideFactoryCost,
                grannyCount,
                factoryCount,
                planeCount,
                worldwideFactoryCount,
                milestoneIndex
            };
            const saveCode = btoa(JSON.stringify(gameState));
            document.getElementById("save-code").value = saveCode;
        }
        function loadGame() {
            const saveCode = document.getElementById("save-code").value;
            if (saveCode) {
                try {
                    const gameState = JSON.parse(atob(saveCode));
                    cookies = gameState.cookies;
                    totalCookies = gameState.totalCookies;
                    cookiesPerSecond = gameState.cookiesPerSecond;
                    grannyCost = gameState.grannyCost;
                    factoryCost = gameState.factoryCost;
                    planeCost = gameState.planeCost;
                    worldwideFactoryCost = gameState.worldwideFactoryCost;
                    grannyCount = gameState.grannyCount;
                    factoryCount = gameState.factoryCount;
                    planeCount = gameState.planeCount;
                    worldwideFactoryCount = gameState.worldwideFactoryCount;
                    milestoneIndex = gameState.milestoneIndex;
                    updateDisplay();
                } catch (error) {
                    console.error("Invalid save code", error);
                    alert("Invalid save code. Please try again.");
                }
            }
        }
        document.getElementById("save-game").addEventListener("click", saveGame);
        document.getElementById("load-game").addEventListener("click", loadGame);
        cookie.addEventListener("click", () => {
            cookies += 1;
            totalCookies += 1;
            clickSound.play();
            updateDisplay();
            showMilestoneMessage();
        });
        document.getElementById("buy-granny").addEventListener("click", () => {
            if (cookies >= grannyCost) {
                cookies -= grannyCost;
                grannyCount++;
                cookiesPerSecond += 1;
                grannyCost = Math.floor(grannyCost * 1.2);
                updateDisplay();
            }
        });
        document.getElementById("buy-factory").addEventListener("click", () => {
            if (cookies >= factoryCost) {
                cookies -= factoryCost;
                factoryCount++;
                cookiesPerSecond += 5;
                factoryCost = Math.floor(factoryCost * 1.2);
                updateDisplay();
            }
        });
        document.getElementById("buy-plane").addEventListener("click", () => {
            if (cookies >= planeCost) {
                cookies -= planeCost;
                planeCount++;
                cookiesPerSecond += 10;
                planeCost = Math.floor(planeCost * 1.2);
                updateDisplay();
            }
        });
        document.getElementById("buy-worldwide-factory").addEventListener("click", () => {
            if (cookies >= worldwideFactoryCost) {
                cookies -= worldwideFactoryCost;
                worldwideFactoryCount++;
                cookiesPerSecond += 300;
                worldwideFactoryCost = Math.floor(worldwideFactoryCost * 1.2);
                updateDisplay();
            }
        });
        setInterval(() => {
            cookies += cookiesPerSecond;
            totalCookies += cookiesPerSecond;
            updateDisplay();
            showMilestoneMessage();
        }, 1000);
    </script>
</body>
</html>
