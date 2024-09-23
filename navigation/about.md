---
layout: post
title: About
permalink: /about/
toc: True
comments: True
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Gyutae</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            color: #333;
        }
        h1 {
            text-align: center;
            color: #2c3e50;
        }
        p {
            margin: 10px 0;
            font-size: 16px;
        }
        .highlight-box {
            border: 2px solid #3498db;
            background-color: #ecf6fd;
            padding: 15px;
            margin: 20px 0;
            border-radius: 8px;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        }
        .highlight-box h2 {
            margin: 0 0 10px 0;
            color: #2980b9;
        }
        .highlight-box img {
            width: 100px;
            border-radius: 50%;
            margin-right: 10px;
        }
        .highlight-box p {
            margin: 5px 0;
        }
        .grid-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 15px;
        }
        .grid-item {
            text-align: center;
            border: 2px solid #2ecc71;
            border-radius: 8px;
            background-color: #e8f8f5;
            padding: 10px;
            box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.1);
        }
        .grid-item img {
            width: 100%;
            height: 100px;
            object-fit: contain;
        }
        .grid-item p {
            margin: 5px 0;
        }
    </style>
</head>
<body>

<h1>Hi, I'm Gyutae Kim</h1>

<div class="highlight-box">
    <h2>About Me</h2>
    <p>I am a sophomore at Del Norte High School, and I am 15 years old. I graduated from Oak Valley Middle School.</p>
    <p><img src="{{site.baseurl}}/images/oakvalley.png" alt="Oak Valley Middle School">Oak Valley Middle School</p>
    <p><img src="{{site.baseurl}}/images/delnorte_logo.png" alt="Del Norte High School">Del Norte High School</p>
</div>

<div class="highlight-box">
    <h2>Who Am I?</h2>
    <p>I play soccer and participate in track and field. This is my 5th year living in San Diego. I came from Korea, and it's a place I miss dearly. I enjoy running, which is why I love soccer. My favorite team is Chelsea—London will always be blue!</p>
</div>

<div class="highlight-box">
    <h2>More about me</h2>
    <ul>
        <li>I graduated Oak Valley Middle School. 🎓🏫</li>
        <li>I am attending Del Norte High School. 🎒🏫</li>
        <li>I immigrated from South Korea. ✈️🇰🇷</li>
    </ul>
</div>

<h2>Living in the World</h2>

<div class="grid-container" id="grid_container">
    <!-- content will be added here by JavaScript -->
</div>

<script>
    var container = document.getElementById("grid_container");
    var http_source = "https://upload.wikimedia.org/wikipedia/commons/";
    var living_in_the_world = [
        {"flag": "thumb/a/a9/Flag_of_South_Korea_%281984–1997%29.svg/640px-Flag_of_South_Korea_%281984–1997%29.svg.png", "description": "Korea - 10 years"},
        {"flag": "0/01/Flag_of_California.svg", "description": "California - 5 years"},
    ]; 
    
    for (const location of living_in_the_world) {
        var gridItem = document.createElement("div");
        gridItem.className = "grid-item";
        var img = document.createElement("img");
        img.src = http_source + location.flag;
        img.alt = location.flag + " Flag";
        var description = document.createElement("p");
        description.textContent = location.description;
        var greeting = document.createElement("p");
        greeting.textContent = location.greeting;
        gridItem.appendChild(img);
        gridItem.appendChild(description);
        gridItem.appendChild(greeting);
        container.appendChild(gridItem);
    }
</script>

</body>
</html>
