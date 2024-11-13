let currentEntry = null;
let currentEntryIndex = 0;
const startYear = 2002; // The first year on the timeline
let zoomLevel = 1; // Starting zoom level
const zoomStep = 0.1; // Amount to zoom in or out
const maxZoomToShowMonths = 1.5; // Zoom level to show months
const minSpacing = 20; // Minimum spacing between years
const maxSpacing = 500; // Maximum spacing when fully zoomed in
const timelineContainer = document.getElementById("lower-timeline");

// A function to display the current point in the timeline in greater detail
function showCurrentEntry() {
    // Get the container from the HTML document
    const entryContainer = document.getElementById('currentEntry-container');

    // Clear the existing content
    entryContainer.innerHTML = '';

    // Create the media

    let media = null;


    if(currentEntry.mediaType == "image") {
        media = document.createElement('img');
        media.src = currentEntry.media; 
        media.alt = `media`;
        media.id = "media";
    } else if (currentEntry.mediaType == "video") {
        media = document.createElement('iframe');
        media.src = currentEntry.media; // Assuming `currentEntry.videoId` contains the YouTube video ID
        media.title = "YouTube video player"; // Accessibility title
        media.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"; // Permissions for video playback
        media.allowFullscreen = true; // Enable fullscreen option
    }


    const textContainer = document.createElement('div');
    textContainer.id = "entry-description"

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
    entryContainer.appendChild(media);
    textContainer.appendChild(title);
    textContainer.appendChild(year);
    textContainer.appendChild(description);
    entryContainer.appendChild(textContainer)
}



// function positionFlags() {
//     const flagsContainer = document.getElementById('flags-container');

//     // Clear any existing flags before re-positioning them
//     flagsContainer.innerHTML = '';

//     const containerOffsetLeft = flagsContainer.offsetLeft;

//     timeline.forEach((entry, index) => {
//         // Find the timeline item that matches the entry's year
//         const yearItem = document.querySelector(`.timeline-item[data-year="${entry.year}"]`);

//         if (yearItem) {
//             // Calculate the offset position of the timeline item relative to the container
//             const yearRelativeLeft = yearItem.offsetLeft - containerOffsetLeft;
//             const yearWidth = yearItem.offsetWidth;

//             // Create a flag element for each entry
//             const flagElement = document.createElement('div');
//             flagElement.className = 'flag';
//             flagElement.setAttribute('data-year', entry.year);

//             // Set the flag position directly over the center of the year marker
//             flagElement.style.position = 'absolute';
//             flagElement.style.left = `${yearRelativeLeft + (yearWidth / 2)}px`;

//             // Set flag content
//             const contentWrapper = document.createElement('div');
//             contentWrapper.className = 'flag-content';
//             contentWrapper.onclick = () => setEntry(index);

//             const lineElement = document.createElement('div');
//             lineElement.className = 'vertical-line';
//             flagElement.appendChild(lineElement);

//             let imageElement = null;
//             if (entry.icon !== "none") {
//                 imageElement = document.createElement('img');
//                 imageElement.src = entry.icon === "image" ? entry.media : `timelineMedia/${entry.icon}.png`;
//                 imageElement.alt = 'flag icon';
//                 imageElement.className = 'flag-image';
//             }

//             const textElement = document.createElement('p');
//             textElement.className = 'flag-text';
//             textElement.textContent = entry.preview;

//             // Append the image and text to the content wrapper
//             if (imageElement) {
//                 contentWrapper.appendChild(imageElement);
//             }
//             contentWrapper.appendChild(textElement);
//             flagElement.appendChild(contentWrapper);

//             // Append flag to the flags container
//             flagsContainer.appendChild(flagElement);
//         }
//     });
// }



// function positionFlags() {
//     const flagsContainer = document.getElementById('flags-container');

//     // Clear any existing flags before re-positioning them
//     flagsContainer.innerHTML = '';

//     const containerOffsetLeft = flagsContainer.offsetLeft;

//     timeline.forEach((entry, index) => {
//         // Find the timeline item that matches the entry's year
//         const yearItem = document.querySelector(`.timeline-item[data-year="${entry.year}"]`);

//         if (yearItem) {
//             // Calculate the offset position of the timeline item relative to the container
//             const yearRelativeLeft = yearItem.offsetLeft - containerOffsetLeft;
//             const yearWidth = yearItem.offsetWidth;

//             // Create a flag element for each entry
//             const flagElement = document.createElement('div');
//             flagElement.className = 'flag';
//             flagElement.setAttribute('data-year', entry.year);

//             // Set the flag position directly over the center of the year marker
//             flagElement.style.position = 'absolute';
//             flagElement.style.left = `${yearRelativeLeft + (yearWidth / 2)}px`;

//             // Set flag content
//             const contentWrapper = document.createElement('div');
//             contentWrapper.className = 'flag-content';
//             contentWrapper.onclick = () => setEntry(index);

//             const lineElement = document.createElement('div');
//             lineElement.className = 'vertical-line';
//             flagElement.appendChild(lineElement);

//             let imageElement = null;
//             if (entry.icon !== "none") {
//                 imageElement = document.createElement('img');
//                 imageElement.src = entry.icon === "image" ? entry.media : `timelineMedia/${entry.icon}.png`;
//                 imageElement.alt = 'flag icon';
//                 imageElement.className = 'flag-image';
//             }

//             const textElement = document.createElement('p');
//             textElement.className = 'flag-text';
//             textElement.textContent = entry.preview;

//             // Append the image and text to the content wrapper
//             if (imageElement) {
//                 contentWrapper.appendChild(imageElement);
//             }
//             contentWrapper.appendChild(textElement);
//             flagElement.appendChild(contentWrapper);

//             // Append flag to the flags container
//             flagsContainer.appendChild(flagElement);
//         }
//     });
// }




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

function setEntry(entryIndex) {
    if(entryIndex <= timeline.length) {
        currentEntryIndex = entryIndex;
        currentEntry = timeline[entryIndex];
    }
    showCurrentEntry();
}

// A function to show the timeline entries
function buildTimeline() {
    // Get the container from the HTML document
    const years = document.getElementById('timeline-container');

    // Clear the existing content
    years.innerHTML = '';

    const minYear = 2002;
    const maxYear = 2024;

    for(let i = minYear; i <= maxYear; i++) { // Use <= to include maxYear
        const timelineItem = document.createElement('div');
        timelineItem.className = "timeline-item";
        timelineItem.dataset.year = i;

        const label = document.createElement('div');
        label.className = "label";
        label.textContent = i;

        const details = document.createElement('div');
        details.className = "details months";

        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        months.forEach(month => {
            const monthDiv = document.createElement('div');
            monthDiv.className = "month";
            monthDiv.textContent = month;
            details.appendChild(monthDiv);
        });

        label.appendChild(details);
        timelineItem.appendChild(label);
        years.appendChild(timelineItem);
    }
}

function addLines() {
    const flagsContainer = document.getElementById('flags-container');
    const timelineItems = document.querySelectorAll('.timeline-item'); // Each year item with class 'timeline-item'

    // Clear any existing lines
    flagsContainer.innerHTML = '';

    // Get the position of the flags container to calculate relative positions
    const containerOffsetLeft = flagsContainer.offsetLeft;

    timeline.forEach((entry, index) => {
        // Find the timeline item that matches the entry's year
        const yearItem = document.querySelector(`.timeline-item[data-year="${entry.year}"]`);

        if (yearItem) {
            // Calculate the offset relative to the flags container
            const yearRelativeLeft = yearItem.offsetLeft - containerOffsetLeft;
            const yearWidth = yearItem.offsetWidth;

            // Create the line element
            const lineElement = document.createElement('div');
            lineElement.className = 'vertical-line'; // Add a class for styling

            // Style the line to be positioned relative to the container
            lineElement.style.position = 'relative';
            lineElement.style.left = `${index === 0 ? yearRelativeLeft : yearRelativeLeft + (yearWidth / 2)}px`;

            // Append the line to the flags container
            flagsContainer.appendChild(lineElement);
        }
    });
}



function zoomTimeline(isZoomingIn) {
    
    zoomLevel += isZoomingIn ? zoomStep : -zoomStep;
    zoomLevel = Math.max(1, zoomLevel); // Ensure zoom level doesn't go below 1

    const timelineContainer = document.getElementById('timeline-container');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const flagItems = document.querySelectorAll('.flag');
    const months = document.querySelectorAll('.months');

    // Adjust spacing and month visibility based on zoom level
    let spacing = minSpacing + (zoomLevel - 1) * (maxSpacing - minSpacing);
    spacing = Math.min(spacing, maxSpacing);

    // Apply new spacing to timeline items
    timelineItems.forEach(item => {
        item.style.margin = `0 ${spacing}px`;
    });

    const flagsContainer = document.getElementById('flags-container');
    console.log(flagsContainer);
    const containerOffsetLeft = flagsContainer.offsetLeft;
    //const yearElement = document.querySelector(`[data-year="${entry.year}"]`);


    // Apply new spacing to flags
    // flagItems.forEach(item => {
    //     const yearItem = document.querySelector(`.timeline-item[data-year="${item.year}"]`);
    //     const yearRelativeLeft = yearItem.offsetLeft - containerOffsetLeft;
    //     const yearWidth = yearItem.offsetWidth;

    //     item.style.position = 'absolute';
    //     item.style.left = `${yearRelativeLeft + (yearWidth / 2)}px`;
        
        
    // });

    flagItems.forEach(item => {
        // Get the 'year' associated with the 'item' by accessing the 'data-year' attribute
        const year = item.getAttribute('data-year');
        
        // Find the corresponding year element in the timeline (based on the value of 'year')
        const yearItem = document.querySelector(`.timeline-item[data-year="${year}"]`);
        
        // If the yearItem is found, calculate its position
        if (yearItem) {
            const yearRelativeLeft = yearItem.offsetLeft - containerOffsetLeft;
            const yearWidth = yearItem.offsetWidth;
    
            // Position the flag element based on the year item's position
            item.style.position = 'absolute';
            item.style.left = `${yearRelativeLeft + (yearWidth / 2)}px`;
        }

        //item.style.margin = `0 ${spacing}px`;
    });

    flagItems.forEach(item => {
        // Get the 'year' associated with the 'item' by accessing the 'data-year' attribute
        const year = item.getAttribute('data-year');
        
        // Find the corresponding year element in the timeline (based on the value of 'year')
        const yearItem = document.querySelector(`.timeline-item[data-year="${year}"]`);
        
        // If the yearItem is found, calculate its position
        if (yearItem) {
            const yearRelativeLeft = yearItem.offsetLeft - containerOffsetLeft;
            const yearWidth = yearItem.offsetWidth;
    
            // Position the flag element based on the year item's position
            item.style.position = 'absolute';
            item.style.left = `${yearRelativeLeft + (yearWidth / 2)}px`;
        }

        item.style.margin = `0 ${spacing}px`;
    });
    


    // Show months if zoom level is high enough
    if (zoomLevel >= maxZoomToShowMonths) {
        months.forEach(month => {
            //month.style.display = 'flex';
        });
    } else {
        months.forEach(month => {
            month.style.display = 'none';
        });
    }

    // After zooming, reposition the flags


}

function positionFlags() {
    console.log("position")
    const flagsContainer = document.getElementById('flags-container');
    
    // Clear any existing flags before re-positioning them
    flagsContainer.innerHTML = '';

    const containerOffsetLeft = flagsContainer.offsetLeft;

    // Reposition flags with respect to zoom level
    timeline.forEach((entry, index) => {
        const yearItem = document.querySelector(`.timeline-item[data-year="${entry.year}"]`);

        if (yearItem) {
            const yearRelativeLeft = yearItem.offsetLeft - containerOffsetLeft;
            const yearWidth = yearItem.offsetWidth;

            // Create a flag element for each entry
            const flagElement = document.createElement('div');
            flagElement.className = 'flag';
            flagElement.setAttribute('data-year', entry.year);

            // Set the flag position above the timeline item
            flagElement.style.position = 'absolute';
            flagElement.style.left = `${yearRelativeLeft + (yearWidth / 2)}px`;

            // Create the content inside the flag
            const contentWrapper = document.createElement('div');
            contentWrapper.className = 'flag-content';
            contentWrapper.onclick = () => setEntry(index);

            const lineElement = document.createElement('div');
            lineElement.className = 'vertical-line';
            flagElement.appendChild(lineElement);

            let imageElement = null;
            if (entry.icon !== "none") {
                imageElement = document.createElement('img');
                imageElement.src = entry.icon === "image" ? entry.media : `timelineMedia/${entry.icon}.png`;
                imageElement.alt = 'flag icon';
                imageElement.className = 'flag-image';
            }

            const textElement = document.createElement('p');
            textElement.className = 'flag-text';
            textElement.textContent = entry.preview;

            if (imageElement) {
                contentWrapper.appendChild(imageElement);
            }
            contentWrapper.appendChild(textElement);
            flagElement.appendChild(contentWrapper);

            // Append flag to the flags container
            flagsContainer.appendChild(flagElement);
        }
    });
}



// Event listeners for zooming with buttons
// document.getElementById("zoom-in").addEventListener("click", () => zoomTimeline(true));
// document.getElementById("zoom-out").addEventListener("click", () => zoomTimeline(false));

function zoomTimelineOnScroll(event) {
    // Prevent default behavior of scrolling (prevent page scrolling)
    event.preventDefault();

    // Determine if we're zooming in or out based on the wheel direction
    const zoomIn = event.deltaY < 0; // Scroll up to zoom in
    console.log(zoomLevel);

    if(zoomLevel == 1) {
        positionFlags();
        if(zoomIn) {
            zoomLevel += .1;
        } else {
            zoomLevel -= .1;
        }
    } else {
        zoomTimeline(zoomIn); 
    }
    
}


timelineContainer.addEventListener('wheel', zoomTimelineOnScroll);


// When the page is loaded
window.onload = function() {
    currentEntry = timeline[0];
    currentEntryIndex = 0;
    showCurrentEntry();
    buildTimeline();
    //addLines();
    positionFlags();
};

// Make the functions available in the global scope
window.previousEntry = previousEntry;
window.nextEntry = nextEntry;
window.setEntry = setEntry;

class TimelineEntry {
    /**
     * @param {int} year // The year
     * @param {string} preview // A short overview
     * @param {string} description // A long description
     * @param {string} mediaType // Some sort of media. Image, video, audio, etc.
     * @param {string} media // Some sort of media. Image, video, audio, etc.
     * @param {string} icon // An icon to be displayed 
     */

    constructor(year, preview, description, mediaType, media, icon) {
        this.year = year;
        this.preview = preview;
        this.description = description;
        this.mediaType = mediaType;
        this.media = media;
        this.icon = icon;
    }
}

const timeline = [
    new TimelineEntry(
        2002,
        "I was born",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "image",
        "timelineMedia/threedayoldemily.JPG",
        "none"
    ),

    new TimelineEntry(
        2004,
        "I became a big sister",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "image",
        "timelineMedia/brobo.JPG",
        "image"
    ),

    new TimelineEntry(
        2006,
        "I became an even bigger sister",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "image",
        "timelineMedia/elliotborn.JPG",
        "none"
    ),

    new TimelineEntry(
        2008,
        "I started kindergarden",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "image",
        "timelineMedia/firstday.JPG",
        "image"
    ),

    new TimelineEntry(
        2011,
        "I competed in my first pageant",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "image",
        "timelineMedia/firstpageant.jpg",
        "crown"
    ),

    new TimelineEntry(
        2013,
        "I competed in my first NAM national pageant",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "video",
        "https://www.youtube.com/embed/D0kreEtq6bg?si=CSF3tdGYEgxSBopS",
        "crown"
    ),

    new TimelineEntry(
        2014,
        "I won my first NAM state title",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "image",
        "timelineMedia/preteen.jpg",
        "crown"
    ), 

    new TimelineEntry(
        2018,
        "I moved to Maryland",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "image",
        "timelineMedia/moving.jpg",
        "none"
    )
]

let isDragging = false;
let startX;
let scrollLeft;

// Mouse down event - start dragging
timelineContainer.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX - timelineContainer.offsetLeft;
    scrollLeft = timelineContainer.scrollLeft;
    timelineContainer.style.cursor = "grabbing";
});

// Mouse move event - drag to scroll
timelineContainer.addEventListener("mousemove", (e) => {
    if (!isDragging) return; // Only run if the mouse is down
    e.preventDefault();
    const x = e.pageX - timelineContainer.offsetLeft;
    const walk = (x - startX) * 2; // Multiplier to increase scroll speed
    timelineContainer.scrollLeft = scrollLeft - walk;
});

// Mouse up event - stop dragging
timelineContainer.addEventListener("mouseup", () => {
    isDragging = false;
    timelineContainer.style.cursor = "grab";
});

// Mouse leave event - stop dragging if mouse leaves container
timelineContainer.addEventListener("mouseleave", () => {
    isDragging = false;
    timelineContainer.style.cursor = "grab";
});
