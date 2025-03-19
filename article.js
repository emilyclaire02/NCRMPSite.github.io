
// Article class, each article has a title, citation, bullet points of topics in the article, a link to an image, authors, and the year it was published
class Article {
    /**
     * @param {string} title // The title
     * @param {string} citation // The citation
     * @param {string[]} bulletPoints // Summary of the article that is visible to the user
     * @param {string} image // An image that will be shown to the users
     * @param {string[]} authors // The authors
     * @param {date} date // The date
     * @param {string[]} keywords // Keywords that are not visible to the user, but are still searchable
     * @param {string} link // A Link to the article
     */


    constructor(title, citation, bulletPoints, image, authors, date, keywords, link) {
        this.title = title;
        this.citation = citation;
        this.bulletPoints = bulletPoints;
        this.image = image;
        this.authors = authors;
        this.date = date;
        this.keywords = keywords;
        this.link = link;
    }
}

/*
    To add an article to the page, create a new Article object in the array of articles

    Template:

    new Article(
        "Title",
        "Citation",
        ["Bullet Point 1", "Bullet Point 2", "Bullet Point 3", "Bullet point 4"],
        "pictures/image.png",
        ["Author 1","Author 2","Author 3","Author 4","Author 5"],
        "YYYY-MM-DD",
        ["keyword1, "keyword2", "keyword3", "keyword4", "keyword5"],
        "www.link.com"
    )

*/

const articles = [];



async function loadTSVToArticles(tsvFilePath) {
    try {
        const response = await fetch(tsvFilePath);
        if (!response.ok) throw new Error(`Failed to load file: ${response.statusText}`);

        const data = await response.text();
        const rows = data.trim().split('\n');
        const headers = rows[0].split('\t').map(header => header.trim());

        rows.slice(1).forEach(row => {
            const values = row.split('\t');
            const entryData = {};

            headers.forEach((header, index) => {
                entryData[header] = values[index];
            });

            if (entryData.image != "") {
                entryData.image = "pictures/" + entryData.title + ".jpg";
            } else {
                entryData.image = "pictures/default.jpg";
            }

            const entry = new Article(
                entryData.title || null,
                entryData.citation || null,
                entryData.bulletPoints ? entryData.bulletPoints.split(',') : [],
                entryData.image || null,
                entryData.authors ? entryData.authors.split(',') : [],
                entryData.date || null,
                entryData.keywords ? entryData.keywords.split(',') : [],
                entryData.link || null
            );

            articles.push(entry);
        });

        console.log("Articles successfully loaded from TSV file:", articles);
    } catch (error) {
        console.error("Error loading TSV file:", error);
        throw error;
    }
}

// DATA UPDATED AS OF 3/19/2025

async function initializeArticlesArray() {
    try {
        await loadTSVToArticles('./publicationsInput.tsv');
        console.log("Articles array initialized successfully.");
    } catch (error) {
        console.error("Failed to initialize array:", error);
    }
}


export { Article, articles, initializeArticlesArray };