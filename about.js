
// People class
class Person {
    /**
     * @param {string} name // The person's name
     * @param {string} title // The person's title
     * @param {string} email // The person's email
     * @param {string} bio // A short bio of 500 characters
     * @param {string} image // An image that is visible to users
     * @param {string} group // The group they are a part of: team, currentInterns, pastInterns
     */


    constructor(name, title, email, bio, image, group) {
        this.name = name;
        this.title = title;
        this.email = email;
        this.bio = bio;
        this.image = image;
        this.group = group;
    }
}

/*
    To add an person to the page, create a new Person object in the array of people

    Template:

    new Person(
        "Name",
        "Title",
        "email.gmail.com",
        "bio",
        "aboutPictures/image.jpg"],
        "group",
    )

*/

const people = [];



async function loadTSVToPeople(tsvFilePath) {
    try {
        const response = await fetch(tsvFilePath);
        if (!response.ok) throw new Error(`Failed to load file: ${response.statusText}`);

        const data = await response.text();
        const rows = data.trim().split('\n');
        const headers = rows[1].split('\t').map(header => header.trim());

        rows.slice(1).forEach(row => {
            const values = row.split('\t');
            const entryData = {};

            headers.forEach((header, index) => {
                entryData[header] = values[index].replace(/\r$/, '').trim();
            });

            if (entryData.image != "") {
                entryData.image = "aboutPictures/" + entryData.name + ".jpg";
            } else {
                entryData.image = "aboutPictures/profile.webp";
            }

            const entry = new Person(
                entryData.name || null,
                entryData.title || null,
                entryData.email || null,
                entryData.bio || null,
                entryData.image || null,
                entryData.group || null
            );

            people.push(entry);
        });

        console.log("People successfully loaded from TSV file:", people);
    } catch (error) {
        console.error("Error loading TSV file:", error);
        throw error;
    }
}

// DATA UPDATED AS OF 2/11/2025

async function initializePeopleArray() {
    try {
        await loadTSVToPeople('./aboutInput.tsv');
        console.log("People array initialized successfully.");
    } catch (error) {
        console.error("Failed to initialize array:", error);
    }
}

function buildPage() {
    // Get the container from the HTML document
    const aboutUs = document.getElementById('about-us');

    // Clear the existing content
    aboutUs.innerHTML = '';

    // Create and append the "Team" section
    const teamHeader = document.createElement("h1");
    teamHeader.className = "about-header";
    teamHeader.textContent = "Team";
    aboutUs.appendChild(teamHeader);

    const teamBio = document.createElement("div");
    teamBio.className = "bio";
    teamBio.id = "team-bios";

    const team = people.filter(person => person.group === "team");
    team.forEach((person) => {
        buildPerson(person, teamBio);
    });

    aboutUs.appendChild(teamBio);

    // Create and append the "Current Interns" section
    const currInternsHeader = document.createElement("h1");
    currInternsHeader.className = "about-header";
    currInternsHeader.textContent = "Current Interns";
    aboutUs.appendChild(currInternsHeader);

    const currInternsBio = document.createElement("div");
    currInternsBio.className = "bio";
    currInternsBio.id = "current-interns-bios";

    const currentInterns = people.filter(person => person.group === "currentIntern");
    currentInterns.forEach((person) => {
        buildPerson(person, currInternsBio);
    });

    aboutUs.appendChild(currInternsBio);

    // Create and append the "Past Interns" section
    const pastInternsHeader = document.createElement("h1");
    pastInternsHeader.className = "about-header";
    pastInternsHeader.textContent = "Past Interns";
    aboutUs.appendChild(pastInternsHeader);

    const pastInternsBio = document.createElement("div");
    pastInternsBio.className = "bio";
    pastInternsBio.id = "past-interns-bios";

    const pastInterns = people.filter(person => person.group === "pastIntern");
    pastInterns.forEach((person) => {
        buildPerson(person, pastInternsBio);
    });

    aboutUs.appendChild(pastInternsBio);
}
function buildPerson(person, group) {
    // Person container
    const personDiv = document.createElement("div");
    personDiv.className = "person";

    // Name
    const name = document.createElement("h2");
    name.textContent = person.name;

    // Flip card container
    const flipCardDiv = document.createElement("div");
    flipCardDiv.className = "flip-card";
    flipCardDiv.addEventListener('click', function() {
        this.classList.toggle('flipped');
    });

    // Flip card front container
    const flipCardFrontDiv = document.createElement("div");
    flipCardFrontDiv.className = "flip-card-front";

    // Image
    const img = document.createElement('img');
    img.src = person.image;
    img.alt = "image";
    img.className = "card-image";
    flipCardFrontDiv.appendChild(img);

    // Flip card back container
    const flipCardBackDiv = document.createElement("div");
    flipCardBackDiv.className = "flip-card-back";

    // Bio
    const bio = document.createElement("p");
    bio.textContent = person.bio;
    flipCardBackDiv.appendChild(bio);

    // Assemble flip card
    flipCardDiv.appendChild(flipCardFrontDiv);
    flipCardDiv.appendChild(flipCardBackDiv);

    // Contact info container
    const contactInfo = document.createElement("div");
    contactInfo.className = "contact-info";

    // Title
    const title = document.createElement("h3");
    title.textContent = person.title;

    // Email
    const email = document.createElement("p");
    email.textContent = `Email: ${person.email}`;

    // Assemble contact info
    contactInfo.appendChild(title);
    contactInfo.appendChild(email);

    // Assemble person
    personDiv.appendChild(name);
    personDiv.appendChild(flipCardDiv);
    personDiv.appendChild(contactInfo);

    // Append person to the group
    group.appendChild(personDiv);
}

window.onload = async function() {
    // Initialize the articles array
    await initializePeopleArray();
    buildPage();
};
