---
layout: page
title: Journey
permalink: /journey/
---

9/6/24
I made a button using this code.

![Button Image]({{site.baseurl}}/images/button.png)

Then, I made a box around it using this code. 

![stylecode2]({{site.baseurl}}/images/style2.png)

![stylecode1]({{site.baseurl}}/images/style1.png)


9/9/24

I had trouble change the theme of my blog post. 
<p>First, I added this code.</p>

![customlayout]({{site.baseurl}}/images/customlayout.png)

<p>Then I made a .md file in _posts. But, it didn't change the theme. </p> 

So, I tried changing layout as custon-layout, and it worked. 

![customlayout2]({{site.baseurl}}/images/customlayout2.png)


9/30

At first, I didn't know what pseudocode is. I tried to make an example, but I had no idea. So, I watched tutorials and asked chatgpt to learn about pseudocode. Then I learned that pseuducode is a description designed for human reading rather than machine reading. Pseudocode is written in plain language, making it easy for anyone to understand the logic, regardless of their programming background. So, that is where I realized that capitalizing if, elif, and else would make a pseuducode. 


![pseudocodeexample]({{site.baseurl}}/images/pseudocode.png)


10/3 

I struggled changing python example to js example for 3.7. So, I asked chat gpt to convert it. 

![javascriptversion]({{site.baseurl}}/images/javascriptexample.png)


10/7

I struggled to make a quiz for 3.7. The code was complicated and I needed help on it. When I tried to click the button, it wouldn't show the quizes I made, so with Gavin's help, we made the quiz. This is the result of teamwork

![quiz1]({{site.baseurl}}/images/quiz1.png)
![quiz2]({{site.baseurl}}/images/quiz2.png)


10/10

I struggled on making color boxes for each catagories in 3.7. I wanted to make color boxes to make it more visible and also be creative. However, there were some issues with the text being white color and the color being too dark. Also, I had a problem with the format of the text. 

![cb1]({{site.baseurl}}/images/cb1.png)

Here, I wanted to make bulletpoints for each categories, but the text size was too big. It was also unorganized. So, I had to use <li> to make bulletpoints, and 'p' and 'strong' for sentences I want it to be bigger than bulletpoints. Then, 
'h2' for the catagorie name. 

![cb2]({{site.baseurl}}/images/cb2.png)

Then, when I tried to make color boxes, it was too dark, so I changed colors up. Also, I made variables like box or .container, then put it into each paragraphs for each color. I didn't want to make the code to be long, so I tried to put each color into the body instead of making each variable, but I couldn't make that. I put gap as 20px to make space between boxes. I put margin as 0 to set center the container. 

This is the final result!

![cb3]({{site.baseurl}}/images/cb3.png)

<body>
    <div id="myModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
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
