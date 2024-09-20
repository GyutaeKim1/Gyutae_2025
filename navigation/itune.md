## iTunes API Integration Guide

## Overview
This guide provides a complete example of integrating the iTunes API into a web project. It includes a setup for searching and displaying music, saving recent queries, and styling the page, with additional features for searching by genre and era and managing recent searches.

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

        #search-by-genre, #search-by-era {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <h1>Search for Music</h1>
    <input type="text" id="search-term" placeholder="Enter artist or song name">
    <button id="search-btn">Search</button>
    
    <h2>Search by Genre</h2>
    <input type="text" id="search-genre" placeholder="Enter genre">
    <button id="search-by-genre-btn">Search by Genre</button>
    
    <h2>Search by Era</h2>
    <input type="text" id="search-era" placeholder="Enter era (e.g., 2000s)">
    <button id="search-by-era-btn">Search by Era</button>

    <h2>Recent Searches</h2>
    <ul id="recent-queries"></ul>
    <button id="clear-recent-queries">Clear Recent Searches</button>
    <div id="results"></div>

    <script>
        const searchBtn = document.getElementById("search-btn");
        const searchTermInput = document.getElementById("search-term");
        const searchGenreInput = document.getElementById("search-genre");
        const searchEraInput = document.getElementById("search-era");
        const searchByGenreBtn = document.getElementById("search-by-genre-btn");
        const searchByEraBtn = document.getElementById("search-by-era-btn");
        const clearRecentQueriesBtn = document.getElementById("clear-recent-queries");
        const resultsDiv = document.getElementById("results");
        const recentQueriesList = document.getElementById("recent-queries");

        // Genre mapping to genre ID
        const genreMapping = {
            "rock": 21,
            "pop": 14,
            "hip hop": 18,
            "rap": 18,
            "classical": 5,
            "jazz": 11,
            "country": 6
        };

        function saveQuery(query) {
            let recentQueries = JSON.parse(localStorage.getItem("recentQueries")) || [];
            if (!recentQueries.includes(query)) {
                recentQueries.push(query);
                localStorage.setItem("recentQueries", JSON.stringify(recentQueries));
                displayRecentQueries();
            }
        }

        function displayRecentQueries() {
            const recentQueries = JSON.parse(localStorage.getItem("recentQueries")) || [];
            recentQueriesList.innerHTML = "";
            recentQueries.forEach(query => {
                const listItem = document.createElement("li");
                listItem.textContent = query;
                recentQueriesList.appendChild(listItem);
            });
        }

        function clearRecentQueries() {
            localStorage.removeItem("recentQueries");
            displayRecentQueries();
        }

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

        function performSearch(query) {
            fetch(`https://itunes.apple.com/search?term=${query}&media=music`)
                .then(response => response.json())
                .then(data => {
                    displayResults(data.results);
                })
                .catch(error => console.error('Error fetching data:', error));
        }

        function performGenreSearch(genre) {
            const genreId = genreMapping[genre.toLowerCase()];
            if (genreId) {
                fetch(`https://itunes.apple.com/search?term=&media=music&genreId=${genreId}&entity=musicTrack`)
                    .then(response => response.json())
                    .then(data => {
                        displayResults(data.results);
                    })
                    .catch(error => console.error('Error fetching data:', error));
            } else {
                alert("Genre not found. Please enter a valid genre.");
            }
        }

        function performEraSearch(era) {
            fetch(`https://itunes.apple.com/search?term=${era}&media=music`)
                .then(response => response.json())
                .then(data => {
                    const filteredResults = data.results.filter(item => {
                        const releaseYear = new Date(item.releaseDate).getFullYear();
                        return releaseYear >= parseInt(era) && releaseYear < parseInt(era) + 10;
                    });
                    displayResults(filteredResults);
                })
                .catch(error => console.error('Error fetching data:', error));
        }

        searchBtn.addEventListener("click", function() {
            const searchTerm = searchTermInput.value;
            if (searchTerm) {
                saveQuery(searchTerm);
                performSearch(searchTerm);
            }
        });

        searchByGenreBtn.addEventListener("click", function() {
            const genre = searchGenreInput.value;
            if (genre) {
                saveQuery(`Genre: ${genre}`);
                performGenreSearch(genre);
            }
        });

        searchByEraBtn.addEventListener("click", function() {
            const era = searchEraInput.value;
            if (era) {
                saveQuery(`Era: ${era}`);
                performEraSearch(era);
            }
        });

        clearRecentQueriesBtn.addEventListener("click", clearRecentQueries);

        window.addEventListener("load", displayRecentQueries);
    </script>
</body>
</html>
