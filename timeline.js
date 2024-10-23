let currentEntry = null;
let currentEntryIndex = 0;

// A function to display the current point in the timeline in greater detail
function showCurrentEntry() {
    // Get the container from the HTML document
    const entryContainer = document.getElementById('currentEntry-container');

    // Clear the existing content
    entryContainer.innerHTML = '';

    // Create the main list element for all entries
    const title = document.createElement('h1');
    title.id = "title";
    title.textContent = currentEntry.preview;

    const year = document.createElement('h2');
    year.id = "year";
    year.textContent = currentEntry.year;

    const description = document.createElement('p');
    description.id = "description";
    description.textContent = currentEntry.description;

    // Append the main list to the timeline container
    entryContainer.appendChild(title);
    entryContainer.appendChild(year);
    entryContainer.appendChild(description);
}

function previousEntry() {
    if (currentEntryIndex > 0) {
        currentEntryIndex--;
        currentEntry = timeline[currentEntryIndex];
        showCurrentEntry();
    }
}

function nextEntry() {
    if (currentEntryIndex < timeline.length - 1) {
        currentEntryIndex++;  // Move forward one entry
        currentEntry = timeline[currentEntryIndex];
        showCurrentEntry();
    }
}

// A function to show the timeline entries
function displayTimeline() {
    // Get the container from the HTML document
    const timelineContainer = document.getElementById('timeline-container');

    // Clear the existing content
    timelineContainer.innerHTML = '';

    // Create the main list element for all entries
    const ul = document.createElement('ul');
    ul.id = "timeline";

    // Loop through each entry in the array to display
    timeline.forEach((entry, index) => {
        const li = document.createElement('li');
        li.classList.add('timelineEntry');

        // Create and append the year
        const year = document.createElement('h2');
        year.textContent = entry.year;
        li.appendChild(year);

        // Create and append the description
        const preview = document.createElement('h3');
        preview.textContent = entry.preview;
        li.appendChild(preview);

        li.addEventListener('click', () => {
            currentEntry = entry;
            showCurrentEntry(); // Display the clicked entry in the details container
        });

        // Add the entry to the list
        ul.appendChild(li);
    });

    // Append the main list to the timeline container
    timelineContainer.appendChild(ul);
}

// When the page is loaded
window.onload = function() {
    displayTimeline();
    currentEntry = timeline[0];
    currentEntryIndex = 0;
    showCurrentEntry();
};

// Make the functions available in the global scope
window.previousEntry = previousEntry;
window.nextEntry = nextEntry;

class TimelineEntry {
    /**
     * @param {int} year // The year
     * @param {string} preview // A short overview
     * @param {string} description // A long description
     */

    constructor(year, preview, description) {
        this.year = year;
        this.preview = preview;
        this.description = description;
    }
}

const timeline = [
    new TimelineEntry(
        1980,
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    ),

    new TimelineEntry(
        1990,
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    ),

    new TimelineEntry(
        2000,
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    ),

    new TimelineEntry(
        2010,
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    ),

    new TimelineEntry(
        2020,
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    )
]