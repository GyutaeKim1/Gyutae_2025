---
layout: base
title: Gyutae Home 
description: Home Page
author: Gyutae Kim
image: /images/mario_animation.png
hide: true
---

 <span style="color: blue;">Welcome! Hi, my name is Gyutae. My journey starts here...</span>


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




![CR7](images/Cristiano-Ronaldo.avif)


# My GitHub Pages

Welcome to my GitHub Pages site! Here’s a quick overview of the sections available:

## Main Menu

- [Home](index.md)
- [Notebooks](notebooks.md)
- [About](about.md)
- [Projects](projects.md)

## Notebooks Submenu

- [Planning Document](notebooks/planning_document.ipynb)
- [JavaScript Notebook](notebooks/javascript_notebook.ipynb)
- [Analysis Notebook](notebooks/analysis_notebook.ipynb)


<link rel="stylesheet" href="/assets/css/custom.css">

# Theme-Switcher

<button id="theme-switcher">Switch Theme</button>

# Rock Paper Scissors Game

<span style="color: yellow;">Here is a simple Rock, Paper, Scissors game you can play directly in your browser!</span>

## Instructions

<span style="color: red;">Click on one of the buttons below to make your choice. The computer will then make its choice, and you'll see the result.</span>

<div id="game">
    <button onclick="play('rock')">Rock</button>
    <button onclick="play('paper')">Paper</button>
    <button onclick="play('scissors')">Scissors</button>
</div>

<p id="result"></p>

<script>
function play(userChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    
    let result = '';
    
    if (userChoice === computerChoice) {
        result = 'It\'s a tie!';
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = 'You win!';
    } else {
        result = 'You lose!';
    }
    
    document.getElementById('result').innerText = `Computer chose ${computerChoice}. ${result}`;
}
</script>

# Cristiano Ronaldo Chasing Messi Animation

Use the W, A, S, and D keys to move Cristiano Ronaldo and catch Messi as he moves randomly!

<div id="gameArea" style="width: 100%; height: 500px; position: relative; background-color: #f0f0f0; border: 2px solid #000; overflow: hidden;">
  <div id="ronaldo" style="position: absolute; width: 100px; height: 100px; background-image: url('images/ronaldo.jpg'); background-size: cover;"></div>
  <div id="messi" style="position: absolute; width: 100px; height: 100px; background-image: url('images/messi-world-cup.jpg'); background-size: cover;"></div>
</div>

<p>Score: <span id="score">0</span></p>

<script>
  const ronaldo = document.getElementById('ronaldo');
  const messi = document.getElementById('messi');
  const gameArea = document.getElementById('gameArea');
  const scoreElement = document.getElementById('score');
  let ronaldoPosition = { x: 0, y: 0 };
  let messiPosition = { x: 300, y: 200 }; // Starting position for Messi
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

  // Function to move Messi randomly
  function moveMessiRandomly() {
    messiPosition.x = Math.random() * (gameArea.clientWidth - messi.clientWidth);
    messiPosition.y = Math.random() * (gameArea.clientHeight - messi.clientHeight);

    messi.style.left = messiPosition.x + 'px';
    messi.style.top = messiPosition.y + 'px';
  }

  // Function to check for collision between Ronaldo and Messi
  function checkCollision() {
    const ronaldoRect = ronaldo.getBoundingClientRect();
    const messiRect = messi.getBoundingClientRect();

    if (!(ronaldoRect.right < messiRect.left ||
          ronaldoRect.left > messiRect.right ||
          ronaldoRect.bottom < messiRect.top ||
          ronaldoRect.top > messiRect.bottom)) {
      score++;
      scoreElement.textContent = score;
      moveMessiRandomly();
    }
  }

  // Move Messi every 1 second (1000 milliseconds)
  setInterval(moveMessiRandomly, 1000);

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


