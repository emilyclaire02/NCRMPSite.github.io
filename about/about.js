
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


    // Constructor for Person class
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

// Array of people to be displayed
const people = [];

// Function for loading a tsv file of people into the people array
async function loadTSVToPeople(tsvFilePath) {
    try {
        // Fetch the TSV file
        const response = await fetch(tsvFilePath);
        if (!response.ok) throw new Error(`Failed to load file: ${response.statusText}`);

        // Parse the TSV file
        const data = await response.text();
        const rows = data.trim().split('\n');
        const headers = rows[1].split('\t').map(header => header.trim());

        // Process each data row
        rows.slice(1).forEach(row => {
            // Split the row into values
            const values = row.split('\t');
            const entryData = {};

            // Map headers to values
            headers.forEach((header, index) => {
                entryData[header] = values[index].replace(/\r$/, '').trim();
            });

            // Add the picture path
            if (entryData.image != "") {
                // Use the name as the image name
                entryData.image = "./about/aboutPictures/" + entryData.name + ".jpg";
            } else {
                // If the image is not provided, use a default image
                entryData.image = "./about/aboutPictures/profile.webp";
            }

            // Create a new Person object
            const entry = new Person(
                entryData.name || null,
                entryData.title || null,
                entryData.email || null,
                entryData.bio || null,
                entryData.image || null,
                entryData.group || null
            );

            // Add the new person to the people array
            people.push(entry);
        });

        console.log("People successfully loaded from TSV file:", people);
    } catch (error) {
        console.error("Error loading TSV file:", error);
        throw error;
    }
}

// DATA UPDATED AS OF 2/11/2025

// Function for initializing the people array
async function initializePeopleArray() {
    try {
        // Load the TSV file
        await loadTSVToPeople('./about/aboutInput.tsv');
        console.log("People array initialized successfully.");
    } catch (error) {
        console.error("Failed to initialize array:", error);
    }
}

// Function for building the skeleton of the about page
function buildPage() {
    // Get the container from the HTML document
    const aboutUs = document.getElementById('about-us');

    // Clear the existing content
    aboutUs.innerHTML = '';

    // Create the Team section

    // Create the Team header
    const teamHeader = document.createElement("h1");
    teamHeader.className = "about-header";
    teamHeader.textContent = "Team";
    aboutUs.appendChild(teamHeader);

    // Create the Team container where the bios will go
    const teamBio = document.createElement("div");
    teamBio.className = "bio";
    teamBio.id = "team-bios";

    // Get the Team members and add them to the Team container
    const team = people.filter(person => person.group === "team");
    team.forEach((person) => {
        buildPerson(person, teamBio);
    });

    // Append the team container to the page
    aboutUs.appendChild(teamBio);

    // Create the Current Interns section

    // Create the Current Interns header
    const currInternsHeader = document.createElement("h1");
    currInternsHeader.className = "about-header";
    currInternsHeader.textContent = "Current Interns";
    aboutUs.appendChild(currInternsHeader);

    // Create the Current Interns container where the bios will go
    const currInternsBio = document.createElement("div");
    currInternsBio.className = "bio";
    currInternsBio.id = "current-interns-bios";

    // Get the Current Interns and add them to the Current Interns container
    const currentInterns = people.filter(person => person.group === "currentIntern");
    currentInterns.forEach((person) => {
        buildPerson(person, currInternsBio);
    });

    // Append the Current Interns container to the page
    aboutUs.appendChild(currInternsBio);

    // Create the Current VSFS Interns section

    // Create the Current Interns header
    const currVSFSInternsHeader = document.createElement("h2");
    currVSFSInternsHeader.className = "about-header";
    currVSFSInternsHeader.textContent = "VSFS Interns";
    aboutUs.appendChild(currVSFSInternsHeader);

    // Create the Current Interns container where the bios will go
    const currVSFSInternsBio = document.createElement("div");
    currVSFSInternsBio.className = "bio";
    currVSFSInternsBio.id = "current-vsfs-interns-bios";

    // Get the Current Interns and add them to the Current Interns container
    const currentVSFSInterns = people.filter(person => person.group === "currentVSFSIntern");
    currentVSFSInterns.forEach((person) => {
        buildPerson(person, currVSFSInternsBio);
    });

    // Append the Past VSFS Interns container to the page
    aboutUs.appendChild(currVSFSInternsBio);

    // Create the Past Interns section

    // Create the Past Interns header
    const pastInternsHeader = document.createElement("h1");
    pastInternsHeader.className = "about-header";
    pastInternsHeader.textContent = "Past Interns";
    aboutUs.appendChild(pastInternsHeader);

    // Create the Past Interns container where the bios will go
    const pastInternsBio = document.createElement("div");
    pastInternsBio.className = "bio";
    pastInternsBio.id = "past-interns-bios";

    // Get the Past Interns and add them to the Current Interns container
    const pastInterns = people.filter(person => person.group === "pastIntern");
    pastInterns.forEach((person) => {
        buildPerson(person, pastInternsBio);
    });

    // Append the Past Interns container to the page
    aboutUs.appendChild(pastInternsBio);

    // Create the Past VSFS Interns section

    // Create the Past VSFS  Interns header
    const pastVSFSInternsHeader = document.createElement("h2");
    pastVSFSInternsHeader.className = "about-header";
    pastVSFSInternsHeader.textContent = "VSFS Interns";
    aboutUs.appendChild(pastVSFSInternsHeader);

    // Create the Past VSFS  Interns container where the bios will go
    const pastVSFSInternsBio = document.createElement("div");
    pastVSFSInternsBio.className = "bio";
    pastVSFSInternsBio.id = "current-vsfs-interns-bios";

    // Get the Past VSFS  Interns and add them to the Past VSFS Interns container
    const pastVSFSInterns = people.filter(person => person.group === "pastVSFSIntern");
    pastVSFSInterns.forEach((person) => {
        buildPerson(person, pastVSFSInternsBio);
    });

    // Append the Past VSFS Interns container to the page
    aboutUs.appendChild(pastVSFSInternsBio);

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
