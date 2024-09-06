---
layout: page
title: About
permalink: /about/
---

Hi, my name is Gyutae Kim. I am a sophomore in Del Norte Highschool, and I am taking AP CSP. 

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Styled Boxes</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        .box-container {
            display: flex;
            flex-direction: column; /* Change to vertical layout */
            gap: 20pSx;
        }
        .box {
            border: 2px solid #000;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
            background-color: #f9f9f9;
        }
        .box p, .box button, .box a {
            margin: 10px 0;
            display: block;
            text-align: center;
            color: #333;
            text-decoration: none;
        }
        .box a {
            color: #007bff;
            font-weight: bold;
        }
        .box a:hover {
            text-decoration: underline;
        }
        .box button {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }
        .box button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="box-container">
        <div class="box">
            <p>Soccer</p>
            <button>Button</button>
            <p><a href="https://www.premierleague.com/">Premier League</a></p>
            <p><a href="https://www.laliga.com/en-GB">La Liga</a></p>
        </div>
        <div class="box">
            <p>Other Leagues</p>
            <p><a href="https://ligue1.com/">League 1</a></p>
            <p><a href="https://www.bundesliga.com/en/bundesliga">Bundesliga</a></p>
        </div>
    </div>
</body>
</html>