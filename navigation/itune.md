# iTunes API Integration Guide

## Overview
This guide provides a complete example of integrating the iTunes API into a web project. It includes a setup for searching and displaying music, saving recent queries, and styling the page.

## Full Code Example

```html

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>iTunes API Music Search</title>
    <style>
        body {
            text-align: center;
            font-family: Arial, sans-serif;
            padding: 20px;
        }

        #search-term {
            padding: 10px;
            width: 300px;
        }

        button {
            padding: 10px;
            margin-top: 10px;
        }

        #results {
            margin-top: 20px;
        }

        .result-item {
            margin: 10px;
            padding: 10px;
            border: 1px solid #ccc;
            display: inline-block;
            text-align: center;
        }

        .icon {
            width: 20px;
            height: 20px;
        }

        #recent-queries {
            margin-top: 20px;
            list-style-type: none;
            padding: 0;
        }

        #recent-queries li {
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <h1>Search for Music</h1>
    <input type="text" id="search-term" placeholder="Enter artist or song name">
    <button id="search-btn">Search</button>
    <h2>Recent Searches</h2>
    <ul id="recent-queries"></ul>
    <div id="results"></div>

    <script>
        // Initialize elements
        const searchBtn = document.getElementById("search-btn");
        const searchTermInput = document.getElementById("search-term");
        const resultsDiv = document.getElementById("results");
        const recentQueriesList = document.getElementById("recent-queries");

        // Function to save query in local storage
        function saveQuery(query) {
            let recentQueries = JSON.parse(localStorage.getItem("recentQueries")) || [];
            if (!recentQueries.includes(query)) {
                recentQueries.push(query);
                localStorage.setItem("recentQueries", JSON.stringify(recentQueries));
                displayRecentQueries();
            }
        }

        // Function to display recent queries
        function displayRecentQueries() {
            const recentQueries = JSON.parse(localStorage.getItem("recentQueries")) || [];
            recentQueriesList.innerHTML = "";
            recentQueries.forEach(query => {
                const listItem = document.createElement("li");
                listItem.textContent = query;
                recentQueriesList.appendChild(listItem);
            });
        }

        // Function to display search results
        function displayResults(results) {
            resultsDiv.innerHTML = "";
            results.forEach(item => {
                const resultItem = document.createElement("div");
                resultItem.classList.add("result-item");
                resultItem.innerHTML = `
                    <p><strong>${item.trackName}</strong> by ${item.artistName}</p>
                    <img src="${item.artworkUrl100}" alt="Album Art">
                    <audio controls src="${item.previewUrl}"></audio>
                `;
                resultsDiv.appendChild(resultItem);
            });
        }

        // Event listener for search button
        searchBtn.addEventListener("click", function() {
            const searchTerm = searchTermInput.value;
            if (searchTerm) {
                saveQuery(searchTerm);
                fetch(`https://itunes.apple.com/search?term=${searchTerm}&media=music`)
                    .then(response => response.json())
                    .then(data => {
                        displayResults(data.results);
                    })
                    .catch(error => console.error('Error fetching data:', error));
            }
        });

        // Load recent queries on page load
        window.addEventListener("load", displayRecentQueries);
    </script>
</body>
</html>
