
// Set the default variables
let currentEntry = null;
let currentEntryIndex = 0;
// The year of the first event in the timeline
let firstYear = 1846;
// The year of the last event in the timeline
let finalYear = 2025;
let currentScale = 1;


// Implement scrolling through timeline
document.addEventListener('DOMContentLoaded', () => {
    // Set the defaults 
    let mouseDown = false;
    let initialGrabPosition = 0;
    let initialScrollPosition = 0;
  
    // Get the scrollable timeline
    const scrollableElement = document.querySelector('.scrollable');
   
    // Add event listeners
    scrollableElement.addEventListener('mousedown', (mouseEvent) => {
      mouseDown = true;
      // Set the cursor to 'grabbing' to indicate that the element is being dragged
      scrollableElement.style.cursor = 'grabbing';
      // Store the initial position of the mouse
      initialGrabPosition = mouseEvent.clientX;
      initialScrollPosition = scrollableElement.scrollLeft;
    });

    // Changing the background image as it scrolls
    const updateBackgroundPosition = () => {
        // Move the background image according to how far the image is scrolled
        const scrollPosition = scrollableElement.scrollLeft;
        scrollableElement.style.backgroundPosition = `${-scrollPosition}px center`;
    };
  
    // Remove the 'grabbing' cursor when the mouse button is released
    scrollableElement.addEventListener('mouseup', () => {
      mouseDown = false;
      scrollableElement.style.cursor = 'grab';
    });
  
    // Move the timeline according to the mouse position
    scrollableElement.addEventListener('mousemove', (mouseEvent) => {
      if (mouseDown) {
        const mouseMovementDistance = mouseEvent.clientX - initialGrabPosition;
        scrollableElement.scrollLeft = initialScrollPosition - mouseMovementDistance;
        updateBackgroundPosition();
    }
    });
  });

  // Implement zooming in on the timeline
  document.addEventListener('DOMContentLoaded', () => {
    // Get the timeline
    const zoomableElement = document.querySelector('.zoomable');
    const containerElement = document.querySelector('.scrollable');
  
    // Set the default variabled
    let scale = 1;
    let mouseHasMoved = true;
    let mousePositionRelative;
    let elementUnderMouse;
  
    // Add event listeners
    zoomableElement.addEventListener('mousemove', () => {
      mouseHasMoved = true
    });
  
    // Add event listener for the scroll wheel
    zoomableElement.addEventListener('wheel', (wheelEvent) => {
        // Check if the scroll wheel is being scrolled vertically
        if (isVerticalScrolling(wheelEvent)) {
            // Prevent the default behavior of the scroll wheel
            wheelEvent.preventDefault();
    
            // Update the scale based on how far the scroll wheel has been scrolled
            scale = computeScale(scale, wheelEvent.deltaY);
            // Update the width of the timeline element
            zoomableElement.style.width = scale * 100 + '%';
            console.log(scale);
    
            // Zoom in according to the mouse position on the timeline
            if (mouseHasMoved) {
                elementUnderMouse = findElementUnderMouse(wheelEvent.clientX);
                mousePositionRelative = (wheelEvent.clientX - getLeft(elementUnderMouse)) / getWidth(elementUnderMouse);
                mouseHasMoved = false;
            }
    
            // Move the timeline according to the mouse position
            const mousePosition = wheelEvent.clientX;
            const elementUnderMouseLeft = getLeft(elementUnderMouse);
            const zoomableLeft = getLeft(zoomableElement);
            const containerLeft = getLeft(containerElement);
            const moveAfterZoom = getWidth(elementUnderMouse) * mousePositionRelative;
    
            containerElement.scrollLeft = Math.round(elementUnderMouseLeft - zoomableLeft - mousePosition + containerLeft + moveAfterZoom);
      }
    });
  
    // Determine if scroll wheel is being scrolled vertically
    const isVerticalScrolling = (wheelEvent) => {
        const deltaX = Math.abs(wheelEvent.deltaX);
        const deltaY = Math.abs(wheelEvent.deltaY);
        // If the scroll wheel has been scrolled vertically, return true
        return deltaY > deltaX;
    };

    // Compute the new scale based on how far the scroll wheel has been scrolled
    const computeScale = (currentScale, wheelDelta) => {
        const newScale = currentScale - wheelDelta * 0.005;
        // Ensure scale does not go below 1
        return Math.max(1, newScale);  
    };

    // Find the position on the timeline under the mouse
    const findElementUnderMouse = (mousePosition) => {
        const children = zoomableElement.children;

        // Find the element under the mouse
        for (const childElement of children) {
            const childRect = childElement.getBoundingClientRect();
            
            // Check if the mouse position is within the bounds of the child element
            if (childRect.left <= mousePosition && childRect.right >= mousePosition) {
                return childElement;
            }
        }

        // If no element is found, return the timeline
        return zoomableElement;
    };

    // Get the left and width of an element to determine the position on the timeline
    const getLeft = (element) => element.getBoundingClientRect().left;
    const getWidth = (element) => element.getBoundingClientRect().width;
  });

  // Implement scrolling through timeline
  document.addEventListener('DOMContentLoaded', () => {
    // Get the timeline and all the corresponding elements
    const eventsTimeline = document.getElementById('events-timeline');
    const yearsTimeline = document.getElementById('years-timeline');
    const containerElement = document.querySelector('.scrollable');

    let scale = 1;

    // Synchronize the top timeline with the bottom timeline
    const synchronizeZoomAndScroll = () => {
        yearsTimeline.style.width = eventsTimeline.style.width;
        yearsTimeline.scrollLeft = eventsTimeline.scrollLeft;
        buildYears();
    };

    // Add event listener for the scroll wheel
    eventsTimeline.addEventListener('wheel', (wheelEvent) => {
        // Check if the scroll wheel is being scrolled vertically
        if (Math.abs(wheelEvent.deltaY) > Math.abs(wheelEvent.deltaX)) {
            wheelEvent.preventDefault();
            // Update the scale based on the scrolling
            scale = Math.max(1, scale - wheelEvent.deltaY * 0.005);
            currentScale = scale;
            eventsTimeline.style.width = scale * 100 + '%';
            synchronizeZoomAndScroll();
        }
    });

    // Add event listener for scroll
    containerElement.addEventListener('scroll', () => {
        yearsTimeline.scrollLeft = containerElement.scrollLeft;
    });

    let mouseDown = false;
    let initialGrabPosition = 0;
    let initialScrollPosition = 0;

    // Add event listeners for dragging
    containerElement.addEventListener('mousedown', (mouseEvent) => {
        mouseDown = true;
        containerElement.style.cursor = 'grabbing';
        // Store the initial position of the mouse
        initialGrabPosition = mouseEvent.clientX;
        initialScrollPosition = containerElement.scrollLeft;
    });

    // Add event listener for releasing the mouse
    containerElement.addEventListener('mouseup', () => {
        // Reset the cursor
        mouseDown = false;
        containerElement.style.cursor = 'grab';
    });

    // Add event listener for moving the mouse
    containerElement.addEventListener('mousemove', (mouseEvent) => {
        if (mouseDown) {
            // Move the timeline based on how far the mouse has moved
            const movement = mouseEvent.clientX - initialGrabPosition;
            containerElement.scrollLeft = initialScrollPosition - movement;
            synchronizeZoomAndScroll();
        }
    });
});

const regionSelect = document.getElementById('regions');

// Add event listener for 'change' event
regionSelect.addEventListener('change', function(event) {
    // This code runs when the selection changes
    const region = event.target.value;
    console.log('Selected region:', region);
    
    // Update the timeline based on the region
    updateTimeline(region);
});
// Function that edits the current timeline to display entries from a specific region
function updateTimeline(region) {
    // Clear the current timeline
    timeline.length = 0;
    
    if (region === 'all') {
        // If "All" is selected, copy all entries from fullTimeline
        fullTimeline.forEach(entry => {
            timeline.push(entry);
        });
    } else {
        // Filter entries that include the selected region
        fullTimeline.forEach(entry => {
            if (entry.region.includes(region)) {
                timeline.push(entry);
            }
        });
    }
    
    // Reset to the first entry if timeline isn't empty
    if (timeline.length > 0) {
        currentEntryIndex = 0;
        currentEntry = timeline[0];
    } else {
        currentEntry = null;
        currentEntryIndex = 0;
    }
    
    // Rebuild the timeline display
    showCurrentEntry();
    buildTimeline();
    buildYears();
}
class TimelineEntry {
    /**
     * @param {string} preview // A short overview
     * @param {string} description // A long description
     * @param {string} mediaType // Some sort of media. Image, video, audio, etc.
     * @param {string} media // Some sort of media. Image, video, audio, etc.
     * @param {string} icon // An icon to be displayed 
     * @param {string} date // The full date in "dd-mm-yyyy" format
     * @param {float} spacer // Space between flags
     * @param {string[]} region // The region the event took place in
     * @param {string} credit // The credit for the media
     */

    constructor(preview, description, mediaType, media, icon, date, region, credit) {
        this.preview = preview;
        this.description = description;
        this.mediaType = mediaType;
        this.media = media;
        this.icon = icon;
        this.date = date;
        this.spacer = null;
        this.region = region;
        this.credit = credit;
    }
}

// Array that contains all entries in the timeline
let fullTimeline = [];

// Array that contains only the timeline entries that will be displayed
const timeline = []

// Initialize the timeline
window.onload = function () {
    // Initialize the timeline with the tsv file
    initializeTimeline()
        .then(() => {
            if (timeline.length > 0) {
                currentEntry = timeline[0];
                currentEntryIndex = 0;
                // Build the timeline
                showCurrentEntry();
                buildTimeline();
                buildYears();
            } else {
                // Handle the case where the timeline is empty
                console.error("Timeline is empty. Check the TSV file or initialization process.");
            }
        })
        // Handle any errors
        .catch(error => {
            console.error("Error initializing timeline:", error);
        });
};

// Function for initializing the timeline with the tsv file
async function initializeTimeline() {
    try {
        // Wait for TSV to load
        await loadTSVToTimeline('./timeline/timelineInput.tsv'); 
        console.log("Timeline initialized successfully.");
    } catch (error) {
        // Handle any errors
        console.error("Failed to initialize timeline:", error);
    }
    // Copy all entries from fullTimeline to timeline
    for(let i = 0; i < fullTimeline.length; i++) {
        timeline[i] = fullTimeline[i];
    }
}


function showCurrentEntry() {
    // Get the container from the HTML document
    const entryContainer = document.getElementById('currentEntry-container');

    // Clear the existing content
    entryContainer.innerHTML = '';

    // Create the media
    let media = null;

    let mediaContainer = document.createElement('div');
    mediaContainer.id = "media-container";

    // Create the container for the media
    if(currentEntry.mediaType == "image") {
        // Create the image
        media = document.createElement('img');
        media.src = currentEntry.media; 
        media.alt = `media`;
        media.id = "timeline-media";
        media.setAttribute("style", "height: 34vh;");
        mediaContainer.appendChild(media);
        // Create the container for the photo credit
        const creditContainer = document.createElement('div');
        creditContainer.id = "timeline-photo-credit"
        creditContainer.innerHTML = `${currentEntry.credit}`
        mediaContainer.appendChild(creditContainer);
        entryContainer.appendChild(mediaContainer);
    } else if (currentEntry.mediaType == "video") {
        media = document.createElement('iframe');
        media.src = currentEntry.media; // Assuming `currentEntry.videoId` contains the YouTube video ID
        // Accessibility title
        media.title = "YouTube video player";
        // Permissions for video playback
        media.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        // Enable fullscreen option
        media.allowFullscreen = true;
        media.setAttribute("style", "height: 34vh;");
        mediaContainer.appendChild(media);
        // Create the container for the photo credit
        const creditContainer = document.createElement('div');
        creditContainer.id = "timeline-photo-credit"
        creditContainer.innerHTML = `${currentEntry.credit}`
        mediaContainer.appendChild(creditContainer);
        entryContainer.appendChild(mediaContainer);
    } 

    // Create the text
    const textContainer = document.createElement('div');
    textContainer.id = "entry-description"

    // Create the main list element for all entries
    const title = document.createElement('h1');
    title.id = "title";
    title.textContent = currentEntry.preview;

    // Create the year
    const year = document.createElement('h2');
    year.id = "year";
    year.textContent = currentEntry.year;

    // Create the description
    const description = document.createElement('p');
    description.id = "description";
    description.textContent = currentEntry.description;

    // Append the main list to the timeline container
    textContainer.appendChild(title);
    textContainer.appendChild(year);
    textContainer.appendChild(description);
    entryContainer.appendChild(textContainer)
}

// Function for going to previous entry
function previousEntry() {
    // Move back one entry
    if (currentEntryIndex > 0) { // Prevent going out of bounds
        currentEntryIndex--;
        currentEntry = timeline[currentEntryIndex];
        showCurrentEntry();
        syncLowerTimelineToEntry();
    }
}

// Function for going to next entry
function nextEntry() {
    // Move forward one entry
    if (currentEntryIndex < timeline.length - 1) { // Prevent going out of bounds
        currentEntryIndex++;  
        currentEntry = timeline[currentEntryIndex];
        showCurrentEntry();
        syncLowerTimelineToEntry();
    }
}

// Function for setting the current entry
function setEntry(entryIndex) {
    // Set the upper timeline to the current entry
    if(entryIndex <= timeline.length) {
        currentEntryIndex = entryIndex;
        currentEntry = timeline[entryIndex];
    }
    // Show the current entry
    showCurrentEntry();
}

// Function for building the years at the bottom of the timeline
function buildYears() {
    // Function for calculating the space between years
    function createSpacer(width, flexGrow) {
        const spacerDiv = document.createElement('div');
        spacerDiv.classList.add('spacer', 'year-spacer');
        if (width) {
            spacerDiv.style.width = width;
        }
        if (flexGrow) {
            spacerDiv.style.flexGrow = flexGrow;
        }
        return spacerDiv;
    }

    // Get the container from the HTML document
    const yearsTimeline = document.getElementById('years-timeline');

    // Clear the existing content
    yearsTimeline.innerHTML = '';

    yearsTimeline.appendChild(createSpacer('26px', null));

    // If the scale is at least 5.1, show all years
    if(currentScale >= 5.1) {
        // Show all years
        for (let i = firstYear; i <= finalYear; i++) {
            yearsTimeline.appendChild(createYear(i));

            if (i < finalYear) {
                yearsTimeline.appendChild(createSpacer(null, '1'));
            }
        }
        console.log("building all years");
    } else { // Otherwise show every 5 years to prevent crowding
        // Show every 5 years
        for (let i = firstYear; i <= finalYear; i++) {
            yearsTimeline.appendChild(createYear(i));
    
            if (i < finalYear) {
                yearsTimeline.appendChild(createSpacer(null, '1'));
            }
            i = i + 5;
        }
    }

    // Add a spacer at the end
    yearsTimeline.appendChild(createSpacer('26px', null));
}



function buildTimeline() {
    // Get the container from the HTML document
    const eventsTimeline = document.getElementById('events-timeline');

    // Clear the existing content
    eventsTimeline.innerHTML = '';

    // Function for calculating the space between entries
    function createSpacer(width, flexGrow) {
        const spacer = document.createElement("div");
        spacer.className = "spacer entry-spacer";
        if (width) spacer.style.width = width;
        if (flexGrow) spacer.style.flexGrow = flexGrow;
        return spacer;
    }
    
    // Calculate the space between entries
    calculateAllSpaces();

    // Add a spacer at the start
    eventsTimeline.appendChild(createSpacer("70px"));

    const yearEventCount = {};

    // Count events by year
    timeline.forEach((event) => {
        const eventYear = event.date.split("-")[2]; // Get year from the event's date
        if (!yearEventCount[eventYear]) {
            yearEventCount[eventYear] = 0;
        }
        yearEventCount[eventYear]++;
    });

    timeline.forEach((event, index) => {
        // Event container
        const eventDiv = document.createElement("div");
        eventDiv.className = "event";
        eventDiv.id = `entry-${event.index}`;

        // Flag container
        const flag = document.createElement("div");
        flag.className = "flag";

        // Vertical line
        const verticalLine = document.createElement("div");
        verticalLine.className = "vertical-line";

        // Flag content
        const flagContent = document.createElement("div");
        flagContent.className = "flag-content";
        flagContent.setAttribute("onclick", `setEntry(${index})`);
        if (event.specialId) flagContent.id = event.specialId;

        // Add text and image
        if (event.icon !== "null") {
            const img = document.createElement("img");
            img.src = event.icon === "image" ? event.media : `./timeline/timelineMedia/${event.icon}`;
            img.alt = "flag icon";
            img.className = "flag-image";
            flagContent.appendChild(img);
        }
        const flagText = document.createElement("p");
        flagText.className = "flag-text";
        flagText.textContent = event.preview;

        // Calculate the margin-top for multiple events in the same year
        const eventYear = event.date.split("-")[2];
        const yearCount = yearEventCount[eventYear]; // Get the count for that year
        let marginTop = 0;

        // Adjust margin-top based on how many events are in the year
        if (yearCount > 1) {
            // Get the index of this event in the timeline for that specific year
            const indexInYear = timeline.filter(e => e.date.split("-")[2] === eventYear).indexOf(event);
            marginTop = (100 / yearCount) * indexInYear; // Increase margin-top for each event in the same year
        }
        
        flagContent.style.marginTop = `${marginTop}px`;

        flagContent.appendChild(flagText);

        // Assemble flag
        flag.appendChild(verticalLine);
        flag.appendChild(flagContent);

        // Assemble event
        eventDiv.appendChild(flag);

        // Add event and spacer to timeline
        eventsTimeline.appendChild(eventDiv);

        // Add spacer after each event
        const spacerFlexGrow = event.spacer;
        eventsTimeline.appendChild(createSpacer(null, spacerFlexGrow));
    });

    // Add hidden div and closing spacer to make ends of timeline match
    const hidden = document.createElement("div");
    hidden.className = "hidden";
    eventsTimeline.appendChild(hidden);
    eventsTimeline.appendChild(createSpacer("26px"));
}

// Function for creating a year
function createYear(year) {
    // Write the year at the bottom of the timeline in the year div
    const yearDiv = document.createElement('div');
    yearDiv.classList.add('year');
    yearDiv.textContent = year;
    return yearDiv;
}

// Calculate the space between entries
function calculateAllSpaces() {
    // Start from the timeline's start date
    let previousDate = timeline[0];
    // Loop through the timeline
    timeline.forEach((event, index) => {

        // Get the current month and year
        let [currMonth, , currYear] = event.date.split("-");
        // Turn the current month and year into a number
        let adjustedCurrYear = parseInt(currYear) + (parseInt(currMonth) * 0.1);
        // Get the previous month and year
        let [prevMonth, , prevYear] = previousDate.date.split("-");
        // Turn the previous month and year into a number
        let adjustedPrevYear = parseInt(prevYear) + (parseInt(prevMonth) * 0.1);

        // Calculate the space between events
        let spacerFlexGrow = (adjustedCurrYear - adjustedPrevYear);

        // Set the spacer for the previous event to the calculated space
        previousDate.spacer = spacerFlexGrow;

        // Set the spacer for the current event
        if (index === timeline.length - 1) {
            event.spacer = finalYear - adjustedCurrYear; // Set spacer for last event to 5.5
        } else {
            event.spacer = spacerFlexGrow; // Otherwise, calculate spacer normally
        }

        // Update previousDate for the next iteration
        previousDate = event;
    });
}

// Make the functions available in the global scope
window.previousEntry = previousEntry;
window.nextEntry = nextEntry;
window.setEntry = setEntry;

// Function for syncing the lower timeline to the current entry and ensuring they are the same
function syncLowerTimelineToEntry() {
    const eventsTimeline = document.querySelector('#events-timeline');
    const events = eventsTimeline.querySelectorAll('.event');
    
    // Find the corresponding year item for the current entry
    const currentEvent = Array.from(events).find(item => item.id === `entry-${timeline.indexOf(currentEntry) }`);

    if (currentEvent) {
        // Scroll the lower timeline so the entry's year is in view
        currentEvent.scrollIntoView({
            behavior: 'smooth',
            block: 'center', // Center the year in the view
        });
    }
}

async function loadTSVToTimeline(tsvFilePath) {
    try {
        // Fetch the TSV file
        const response = await fetch(tsvFilePath);
        if (!response.ok) {
            throw new Error(`Failed to load file: ${response.statusText}`);
        }

        const data = await response.text();
        // Split the file into rows
        const rows = data.trim().split('\n');

        // Extract headers from the second row (index 1)
        //const headers = rows[1].split('\t');

        const headers = rows[1].split('\t').map(header => header.trim().replace(/\r$/, ''));
        console.log("Headers:", headers);
 
 
        // Skip the first two rows (metadata and headers) and process remaining rows
        const dataRows = rows.slice(2);

        // Process each data row
        dataRows.forEach(row => {
            const values = row.split('\t'); // Split by tab
            const entryData = {};

            // Map headers to values
            headers.forEach((header, index) => {
                entryData[header] = values[index];
            });

            if (entryData.mediaType === "image") {
                entryData.media = "./timeline/timelineMedia/" + entryData.media;
            }

            // Create a TimelineEntry and add it to the timeline
            const entry = new TimelineEntry(
                entryData.preview || null,
                entryData.description || null,
                entryData.mediaType || null,
                entryData.media || null,
                entryData.icon || "none",
                entryData.date || null,
                entryData.region ? entryData.region.split(',') : [],
                entryData.credit || "",
            );

            fullTimeline.push(entry);
        });

        console.log("Timeline successfully loaded from TSV file:", fullTimeline);
    } catch (error) {
        console.error("Error loading TSV file:", error);
        throw error; // Rethrow to notify the caller of failure
    }
}