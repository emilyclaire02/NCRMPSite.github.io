// Get the articles array from the articles class
import { articles } from './article.js';

// A function to show the articles
function displayArticles() {
    // Get the container from the html document
    const articlesContainer = document.getElementById('articles-container');

    // Create the main list element for all articles
    const ul = document.createElement('ul');
    ul.id = "articleList"

    // Go through every article in the array to display
    articles.forEach((article, index) => {
        // Create list item for each article
        const li = document.createElement('li');
        // Give the article an id so it can be found for searching purposes
        li.id = `article${index + 1}`;

        // Title of the article
        const title = document.createElement('h4');
        title.textContent = article.title;

        // Authors of the article
        const authors = document.createElement('h5');
        const articleAuthors = article.authors
        var authorsText = ""
        // Limit the authors shown to 3
        if(articleAuthors.length <= 3) {
            authorsText = articleAuthors.toString() + ", (" + article.year + ")"
        }  else {
            authorsText = articleAuthors[0] + ", " + articleAuthors[1]+ ", " + articleAuthors[2] + " et al., (" + article.year + ")"
        }
        authors.textContent = authorsText;

        // Image of the article
        const img = document.createElement('img');
        img.src = article.image;
        img.alt = "image";

        // Citation button
        const citationButton = document.createElement('button');
        citationButton.textContent = 'Cite';
        // Clicking the button cites the article
        citationButton.onclick = () => cite(article);
        const citationDiv = document.createElement('div');
        citationDiv.classList.add('citation');
        citationDiv.appendChild(citationButton);

        // Create the list for article bullet points
        const bulletPointsList = document.createElement('ul');
        const bulletPoints = article.bulletPoints;
        // Add all bullet points to a list
        bulletPoints.forEach(point => {
            const entry = document.createElement('li');
            entry.textContent = point;
            bulletPointsList.appendChild(entry);
        });

        // Add elements to the list item
        li.appendChild(title);
        li.appendChild(authors);
        li.appendChild(img);
        li.appendChild(citationDiv);
        li.appendChild(bulletPointsList);

        // Add the list item to the main articles list
        ul.appendChild(li);
    });

    // Append the main list to the articles container
    articlesContainer.appendChild(ul);
}


function cite(article) {
    // Get citation for the article
    const citationText = article.citation;
    // Copy the citation to the clipboard
    navigator.clipboard.writeText(citationText);
}

// Function for searching through the articles
function search() {
    // Get user input
    const input = document.getElementById('searchInput');
    // Make input uppercase so searches are case insensitive
    const filter = input.value.toUpperCase();

    // Search every article in the array
    articles.forEach((article, index) => {
        // Check to see if the filter appears in the title, author list, or any of the bullet points
        const titleMatches = lookThrough(article.title, filter);
        const authorMatches = article.authors.some(author => lookThrough(author, filter));
        const bulletPointsMatches = article.bulletPoints.some(point => lookThrough(point, filter));

        // Match the current article object to it's corresponding place in the list by getting 
        const li = document.getElementById("article" + (index + 1).toString());

        // Check if title, any author, or any bullet points matches the filter
        if (titleMatches || authorMatches || bulletPointsMatches) {
            li.style.display = "";  // Show the article
        } else {
            li.style.display = "none";  // Hide the article
        }
    });
  
} 

// Returns true or false if the filter is in the content
function lookThrough(content, filter) {
    // Gets the index of any instance of the filter within the content. 
    // Returns true if index is there, meaning the word is in the content
    return content.toUpperCase().indexOf(filter) > -1;
}

// When the page is loaded
window.onload = function() {
    // Show all the articles
    displayArticles();
    // An event listener for when the search is being used
    document.getElementById("searchInput").onkeyup = function() {
        // Call the search when the key is released
        search();
    };
};