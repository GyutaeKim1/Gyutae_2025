---
layout: base
title: Gyutae Home 
description: Home Page
author: Gyutae Kim
image: /images/mario_animation.png
hide: true
---

## welcome 

<style>

.typewriter h1 {
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  font-family: Monospace;
  border-right: .015em solid orange; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: 0.015em; /* Adjust as needed */
  animation: 
    typing 15.0s steps(30, end) forwards,
    blink-caret 1s step-end infinite;
  animation-delay: 0ms;
  animation-fill-mode: both;
  color: #000000
}

/* The typing effect */
@keyframes typing {
  0% {
    width: 0;
  }
  25%, 50%, 75% {
    width: 100%;
  }
  100% {
    width: 100%;
  }
}
/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: white; }
}

h2 {
    color: #FFFFEE;
}

h1 {
  color: #FFFFFF
}

h1:hover {
  font-size: 32px;
}
</style>

<script>
  document.addEventListener("DOMContentLoaded", function() {
  setTimeout(function() {
      document.querySelector("body").classList.add("loaded");
  }, 2000)
});
</script>

<!-- <script>
document.addEventListener("DOMContentLoaded", function() {
  const words = ["Welcome", "to", "Srijan's", "Blog"];
  let wordIndex = 0;
  
  function updateWord() {
    const titleElement = document.querySelector(".typewriter h1");
    titleElement.textContent = words[wordIndex];
    wordIndex = (wordIndex + 1) % words.length;
  }

  setInterval(updateWord, 1); // Change word every 3.5 seconds
});
</script> -->

<div class="typewriter">
    <h1>Good Morning or night, Welcome to Gyutae's Blog</h1>
</div>

<br>

<!-- Liquid:  statements -->

<!--- Concatenation of site URL to frontmatter image  --->
{% assign sprite_file = site.baseurl | append: page.image %}
<!--- Has is a list variable containing mario metadata for sprite --->
{% assign hash = site.data.mario_metadata %}  
<!--- Size width/height of Sprit images --->
{% assign pixels = 256 %}

<!--- HTML for page contains <p> tag named "Mario" and class properties for a "sprite"  -->

<p id="mario" class="sprite"></p>
  
<!--- Embedded Cascading Style Sheet (CSS) rules, 
        define how HTML elements look 
--->
<style>

  /*CSS style rules for the id and class of the sprite...
  */
  .sprite {
    height: {{pixels}}px;
    width: {{pixels}}px;
    background-image: url('{{sprite_file}}');
    background-repeat: no-repeat;
  }

  /*background position of sprite element
  */
  #mario {
    background-position: calc({{animations[0].col}} * {{pixels}} * -1px) calc({{animations[0].row}} * {{pixels}}* -1px);
  }
</style>

<!--- Embedded executable code--->
<script>
  ////////// convert YML hash to javascript key:value objects /////////

  var mario_metadata = {}; //key, value object
  {% for key in hash %}  
  
  var key = "{{key | first}}"  //key
  var values = {} //values object
  values["row"] = {{key.row}}
  values["col"] = {{key.col}}
  values["frames"] = {{key.frames}}
  mario_metadata[key] = values; //key with values added

  {% endfor %}

  ////////// game object for player /////////

  class Mario {
    constructor(meta_data) {
      this.tID = null;  //capture setInterval() task ID
      this.positionX = 0;  // current position of sprite in X direction
      this.currentSpeed = 0;
      this.marioElement = document.getElementById("mario"); //HTML element of sprite
      this.pixels = {{pixels}}; //pixel offset of images in the sprite, set by liquid constant
      this.interval = 100; //animation time interval
      this.obj = meta_data;
      this.marioElement.style.position = "absolute";
    }

    animate(obj, speed) {
      let frame = 0;
      const row = obj.row * this.pixels;
      this.currentSpeed = speed;

      this.tID = setInterval(() => {
        const col = (frame + obj.col) * this.pixels;
        this.marioElement.style.backgroundPosition = `-${col}px -${row}px`;
        this.marioElement.style.left = `${this.positionX}px`;

        this.positionX += speed;
        frame = (frame + 1) % obj.frames;

        const viewportWidth = window.innerWidth;
        if (this.positionX > viewportWidth - this.pixels) {
          document.documentElement.scrollLeft = this.positionX - viewportWidth + this.pixels;
        }
      }, this.interval);
    }

    startWalking() {
      this.stopAnimate();
      this.animate(this.obj["Walk"], 3);
    }

    startRunning() {
      this.stopAnimate();
      this.animate(this.obj["Run1"], 6);
    }

    startPuffing() {
      this.stopAnimate();
      this.animate(this.obj["Puff"], 0);
    }

    startCheering() {
      this.stopAnimate();
      this.animate(this.obj["Cheer"], 0);
    }

    startFlipping() {
      this.stopAnimate();
      this.animate(this.obj["Flip"], 0);
    }

    startResting() {
      this.stopAnimate();
      this.animate(this.obj["Rest"], 0);
    }

    stopAnimate() {
      clearInterval(this.tID);
    }
  }

  const mario = new Mario(mario_metadata);

  ////////// event control /////////

  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      if (event.repeat) {
        mario.startCheering();
      } else {
        if (mario.currentSpeed === 0) {
          mario.startWalking();
        } else if (mario.currentSpeed === 3) {
          mario.startRunning();
        }
      }
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      if (event.repeat) {
        mario.stopAnimate();
      } else {
        mario.startPuffing();
      }
    }
  });

  //touch events that enable animations
  window.addEventListener("touchstart", (event) => {
    event.preventDefault(); // prevent default browser action
    if (event.touches[0].clientX > window.innerWidth / 2) {
      // move right
      if (currentSpeed === 0) { // if at rest, go to walking
        mario.startWalking();
      } else if (currentSpeed === 3) { // if walking, go to running
        mario.startRunning();
      }
    } else {
      // move left
      mario.startPuffing();
    }
  });

  //stop animation on window blur
  window.addEventListener("blur", () => {
    mario.stopAnimate();
  });

  //start animation on window focus
  window.addEventListener("focus", () => {
     mario.startFlipping();
  });

  //start animation on page load or page refresh
  document.addEventListener("DOMContentLoaded", () => {
    // adjust sprite size for high pixel density devices
    const scale = window.devicePixelRatio;
    const sprite = document.querySelector(".sprite");
    sprite.style.transform = `scale(${0.2 * scale})`;
    mario.startResting();
  });

</script>

<img src="images/Cristiano-Ronaldo.avif" alt="Cristiano Ronaldo" style="border: 5px solid yellow; padding: 10px; border-radius: 5px;">

## Notebook Submenu

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fancy Animations and Links</title>
    <style>
        /* CSS for fade-in effect */
        .fade-in {
            opacity: 0;
            transition: opacity 1s ease-in;
        }
        .fade-in.visible {
            opacity: 1;
        }
        /* Button hover effect */
        .button {
            background-color: #4CAF50; /* Green */
            border: none;
            color: white;
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            transition: transform 0.2s, background-color 0.3s;
            cursor: pointer;
        }
        .button:hover {
            transform: scale(1.1);
            background-color: #45a049; /* Darker green */
        }
        /* Smooth scrolling */
        html {
            scroll-behavior: smooth;
        }
        /* Modal styles */
        .modal {
            display: none; /* Hidden by default */
            position: fixed;
            z-index: 1; /* Sit on top */
            left: 0;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
            animation: fadeIn 0.5s; /* Fade-in animation */
        }
        .modal-content {
            background-color: #fefefe;
            margin: 15% auto; /* 15% from the top and centered */
            padding: 20px;
            border: 1px solid #888;
            width: 80%; /* Could be more or less, depending on screen size */
        }
        .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }
        .close:hover,
        .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }
        @keyframes fadeIn {
            from {opacity: 0;}
            to {opacity: 1;}
        }
        /* Styles for links */
        .links {
            text-align: left;
            margin: 20px;
        }
    </style>
</head>

<body>
    <div class="fade-in">This will fade in when the page loads!</div>
    <button id="modalBtn" class="button">Open Submenu</button>
    <!-- The Modal -->
    <div id="myModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Notebooks</h2>
            <ul>
                <li><a href="{{site.baseurl}}/plans/sprint1">Planning Document</a></li>
                <li><a href="{{site.baseurl}}/jscell/sprint1">JavaScript Notebook</a></li>
                <li><a href="{{site.baseurl}}/about/sprint1">About Page</a></li>
                <li><a href="{{site.baseurl}}/2024/09/16/jupyter_IPYNB_2_.html">Jupyter Notebook</a></li>
            </ul>
            <h2>Games</h2>
            <ul>
                <li><a href="{{site.baseurl}}/cookieclicker/sprint1">Cookie Clicker</a></li>
                <li><a href="{{site.baseurl}}/tictactoe/sprint1">Tic-Tac-Toe</a></li>
                <li><a href="{{site.baseurl}}/snake/sprint1">Snake Game</a></li>
                <li><a href="{{site.baseurl}}/rps/sprint1">Rock Paper Scissors</a></li>
            </ul>
           <h2>Other Stuff</h2>
            <ul>
                <li><a href="{{site.baseurl}}/binarycalculator/sprint1">Binary Calculator</a></li>
                <li><a href="{{site.baseurl}}/calculator/sprint1">Calculator</a></li>
            </ul>
        </div>
    </div>
    <script>
        // JavaScript for fade-in effect
        window.onload = function() {
            const elements = document.querySelectorAll('.fade-in');
            elements.forEach(el => {
                el.classList.add('visible');
            });
        };
        // JavaScript for modal functionality
        const modal = document.getElementById("myModal");
        const btn = document.getElementById("modalBtn");
        const span = document.getElementsByClassName("close")[0];
        btn.onclick = function() {
            modal.style.display = "block";
        }
        span.onclick = function() {
            modal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    </script>

</body>
</html>



<link rel="stylesheet" href="/assets/css/custom.css">


## Cristiano Ronaldo Chasing the World Cup Animation

<span style="color: green;">Use the W, A, S, and D keys to move Cristiano Ronaldo and catch the World Cup as it moves randomly!</span>

<div id="gameArea" style="width: 100%; height: 500px; position: relative; background-color: #f0f0f0; border: 2px solid #000; overflow: hidden;">
  <div id="ronaldo" style="position: absolute; width: 100px; height: 100px; background-image: url('images/ronaldo.jpg'); background-size: cover;"></div>
  <div id="worldcup" style="position: absolute; width: 100px; height: 100px; background-image: url('images/worldcup.jpg'); background-size: cover;"></div>
</div>

<p>Score: <span id="score">0</span></p>

<script>
  const ronaldo = document.getElementById('ronaldo');
  const worldcup = document.getElementById('worldcup');
  const gameArea = document.getElementById('gameArea');
  const scoreElement = document.getElementById('score');
  let ronaldoPosition = { x: 0, y: 0 };
  let worldcupPosition = { x: 300, y: 200 }; // Starting position for the World Cup
  let score = 0;

  // Function to move Ronaldo based on W, A, S, D keys
  function moveRonaldo(dx, dy) {
    ronaldoPosition.x += dx;
    ronaldoPosition.y += dy;

    // Ensure Ronaldo stays within bounds
    ronaldoPosition.x = Math.max(0, Math.min(ronaldoPosition.x, gameArea.clientWidth - ronaldo.clientWidth));
    ronaldoPosition.y = Math.max(0, Math.min(ronaldoPosition.y, gameArea.clientHeight - ronaldo.clientHeight));

    ronaldo.style.left = ronaldoPosition.x + 'px';
    ronaldo.style.top = ronaldoPosition.y + 'px';

    checkCollision();
  }

  // Function to move the World Cup randomly
  function moveWorldCupRandomly() {
    worldcupPosition.x = Math.random() * (gameArea.clientWidth - worldcup.clientWidth);
    worldcupPosition.y = Math.random() * (gameArea.clientHeight - worldcup.clientHeight);

    worldcup.style.left = worldcupPosition.x + 'px';
    worldcup.style.top = worldcupPosition.y + 'px';
  }

  // Function to check for collision between Ronaldo and the World Cup
  function checkCollision() {
    const ronaldoRect = ronaldo.getBoundingClientRect();
    const worldcupRect = worldcup.getBoundingClientRect();

    if (!(ronaldoRect.right < worldcupRect.left ||
          ronaldoRect.left > worldcupRect.right ||
          ronaldoRect.bottom < worldcupRect.top ||
          ronaldoRect.top > worldcupRect.bottom)) {
      score++;
      scoreElement.textContent = score;
      moveWorldCupRandomly();
    }
  }

  // Move the World Cup every 1 second (1000 milliseconds)
  setInterval(moveWorldCupRandomly, 1000);

  // Listen for W, A, S, D key presses to move Ronaldo
  document.addEventListener('keydown', function(event) {
    switch (event.key) {
      case 'w':
        moveRonaldo(0, -10);
        break;
      case 's':
        moveRonaldo(0, 10);
        break;
      case 'a':
        moveRonaldo(-10, 0);
        break;
      case 'd':
        moveRonaldo(10, 0);
        break;
    }
  });
</script>





<style>
  /* Sparkling animation */
  @keyframes sparkle {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.5;
      transform: scale(1.2);
    }
  }

  .sparkling {
    position: relative;
    display: inline-block;
    background-color: #ffcc00;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(255, 255, 0, 0.7);
    animation: sparkle 1.5s infinite ease-in-out;
  }

  .sparkling:before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    width: 10px;
    height: 10px;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.7);
    animation: sparkle 1s infinite ease-in-out;
  }

  .sparkling:after {
    content: '';
    position: absolute;
    bottom: -5px;
    right: -5px;
    width: 10px;
    height: 10px;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.7);
    animation: sparkle 1.5s infinite ease-in-out reverse;
  }
</style>

<audio id="siuSound" src="sound/siuuu.mp3"></audio>

<div class="sparkling">
  <img src="images/Cristiano-Ronaldo.avif" alt="Cristiano Ronaldo" style="width: 200px;" onclick="playSiuSound()">
</div>

<script>
  function playSiuSound() {
    const audio = document.getElementById('siuSound');
    audio.play();
  }
</script>

---------------------------------

| Week Date   | Weekly Plan |
|-------------|-------------|
| **9/30 ~ 10/4**  | [Weekly Plan]({{site.baseurl}}/weeklyplan1/sprint2) | 
| **10/7 ~ 10/11** | [Weekly Plan]({{site.baseurl}}/weeklyplan2/sprint2) | 


