let currentPhoto = null;
let currentPhotoIndex = 0;
let autoSlideInterval = 0;

// Start carousal when the page laods
window.onload = function () {
    if (photos.length > 0) {
        // Shuffle the photos so they are different each time
        shufflePhotos(photos);
        // Start on the first photo in the photos array
        currentPhoto = photos[0];
        currentPhotoIndex = 0;
        // Display photos
        showCurrentPhoto();
        startAutoSlide();
    } else {
        console.error("Photos is empty. Check the photos array.");
    }
};

// Allow functions to be called from the global scope
window.previousPhoto = previousPhoto;
window.nextPhoto = nextPhoto;
 
class Photo {
    /**
     * @param {string} name // The name of the photo
     * @param {string} credit // The credit for who took the photo
     * @param {string} description // A description of the photo 
     */

    // Constructor for Photo class
    constructor(name, credit, description) {
        this.name = name;
        this.credit = credit;
        this.description = description;
    }
}

// Array that contains all the photos in the carousal
const photos = [
    new Photo("A Cer with Grunt juv.jpg", "NOAA Fisheries Photo by Caitlin Langwiser", "White grunts (haemulon plumierii) swimming around acropora cervicornis"),
    new Photo("C Nat with anemone.jpg", "NOAA Fisheries Photo by Caitlin Langwiser", "Colpophyllia natans with anemone"),
    new Photo("C Nat with peppermint goby.jpg", "NOAA Fisheries Photo by Caitlin Langwiser", "Peppermint goby (coryphopterus lipernes) on Colpophyllia natans"),
    new Photo("CNAT with anemone.jpg", "NOAA Fisheries Photo by Caitlin Langwiser", "Colpophyllia natans with anemone"),
    new Photo("Dcyl.JPG", "NOAA Fisheries Photo by Caitlin Langwiser", "Dendrogyra cylindrus"),
    new Photo("Dendro with NOAA diver Grove.jpg", "NOAA Fisheries Photo by Caitlin Langwiser", "Dendrogyra cylindrus and NOAA diver Dr. Jay Grove"),
    new Photo("Scolymia.jpg", "NOAA Fisheries Photo by Caitlin Langwiser", "Scolymia"),
    new Photo("School of french grunts.JPG", "NOAA Fisheries Photo by Caitlin Langwiser", "School of french grunts (haemulon flavolineatum)"),
    new Photo("O Fav in Tortugas.jpg", "NOAA Fisheries Photo by Caitlin Langwiser", "Orbicella faveolata"),
    new Photo("NOAA diver Grove with hogfish.jpg", "NOAA Fisheries Photo by Caitlin Langwiser", "NOAA diver Dr. Jay Grove with hogfish (lachnolaimus maximus)"),
    new Photo("Golith grouper in FL keys_credit_Caitlin Langwiser.jpg", "NOAA Fisheries Photo by Caitlin Langwiser", "Goliath grouper in the Florida Keys (epinephelus itajara)"),
    new Photo("foureye juv.JPG", "NOAA Fisheries Photo by Caitlin Langwiser", "Juvenile foureye butterflyfish (chaetodon capistratus)"),
    new Photo("Epinephelusmorio_FLNCRMP_Henderson_20240611_0001.jpg", "NOAA Fisheries Photo by Leslie Henderson", "Red grouper (epinephelus morio)"),
    new Photo("ECain_FLNCRMP_Henderson_20240611_0008.jpg", "NOAA Fisheries Photo by Leslie Henderson", "NOAA diver Erin Cain and Red grouper (epinephelus morio)"),
    new Photo("LobsterTrap_FLNCRMP_Henderson_20240611_0012.jpg", "NOAA Fisheries Photo by Leslie Henderson", "Caribbean spiny lobster (panulirus argus) trap and NOAA diver Caitlin Langwiser)"),
    new Photo("Roughhead_FLNCRMP_Henderson_20240611_0027.jpg", "NOAA Fisheries Photo by Leslie Henderson", "Roughhead blenny (acanthemblemaria aspera)"),
    new Photo("hogfish_FLNCRMP_Henderson_20240611_0024.jpg", "NOAA Fisheries Photo by Leslie Henderson", "Hogfish (lachnolaimus maximus)"),
    new Photo("goliath_FLNCRMP_Henderson_20240611_0025.jpg", "NOAA Fisheries Photo by Leslie Henderson", "Goliath grouper (epinephelus itajara)"),
    new Photo("fortjefflight_FLNCRMP_Henderson_20240530_0046.jpg", "NOAA Fisheries Photo by Leslie Henderson", "Fort Jefferson, Dry Tortugas National Park"),
    new Photo("rusty_P8140044.JPG", "NOAA Fisheries Photo by Erin Cain", "Rusty goby (priolepis hipoliti)"),
    new Photo("mycetophyllia_P9090017.JPG", "NOAA Fisheries Photo by Erin Cain", "Mycetophyllia"),
    new Photo("JB+RH_grove (1).JPG", "NOAA Fisheries Photo by Jay Grove", "NOAA diver Jeremiah Blondeau and NOAA intern Rob Harper"),
    new Photo("JB+RHgrove (26).JPG", "NOAA Fisheries Photo by Jay Grove", "NOAA diver Jeremiah Blondeau and NOAA intern Rob Harper"),
    new Photo("FG+WG+Bparrot_grove (29).JPG", "NOAA Fisheries Photo by Jay Grove", "White grunt (haemulon plumierii), french grunt (haemulon flavolineatum), and blue parrotfish (scarus coeruleus)"),
    new Photo("red_gray.jpg", "Photo by Jiangang Luo", "Gray angelfish (pomacanthus arcuatus), red grouper (epinephelus morio), and bluehead wrasse (thalassoma bifasciatum)")
] 

function showCurrentPhoto(direction = 'next') {
    // Get the container from the HTML document
    const carousalContainer = document.getElementById('photo-container');

    // Get the current photo
    const existingPhoto = document.querySelector('.carousalPhoto');

    // Clear the existing content
    carousalContainer.innerHTML = '';

    // Add the photo
    let photo = document.createElement('img');
    // The photo src uses the name of the photo in the photos array
    photo.src = "./home/homePhotos/" + currentPhoto.name; 
    // Get the other attributes from the array
    photo.alt = currentPhoto.description;
    photo.id = currentPhoto.name;
    photo.className = "carousalPhoto";
    // Add the slide-in or slide-out class, depending on the direction
    photo.classList.add(direction === 'next' ? 'slide-in' : 'slide-out');

    // Create the text and credit containers
    const textContainer = document.createElement('div');
    textContainer.id = "photo-description"
    textContainer.innerHTML = `<p>${currentPhoto.description}</p>`

    const creditContainer = document.createElement('div');
    creditContainer.id = "photo-credit"
    creditContainer.innerHTML = `${currentPhoto.credit}`

    // Append the main list to the carousal container
    carousalContainer.appendChild(photo);
    carousalContainer.appendChild(creditContainer);
    carousalContainer.appendChild(textContainer);

    // Remove the slide-in or slide-out class 
    setTimeout(() => {
        photo.classList.remove('slide-in', 'slide-out');
    }, 10);

    // Remove the existing photo with the CSS transition
    if (existingPhoto) {
        existingPhoto.classList.add(direction === 'next' ? 'slide-out' : 'slide-in');
        setTimeout(() => {
            existingPhoto.remove();
        }, 500); // Same as the CSS transition duration
    }
}

// Function to show the previous photo
function previousPhoto() {
    // If the current photo is not the first photo, go to the previous photo
    if (currentPhotoIndex > 0) {
        currentPhotoIndex--;
    } else {
        // Otherwise, go to last photo in the array
        currentPhotoIndex = photos.length - 1;
    }
    // Update the current photo
    currentPhoto = photos[currentPhotoIndex];
    showCurrentPhoto('prev');
    resetAutoSlide();
}

// Function to show the next photo
function nextPhoto() {
    // If the current photo is not the last photo, go to the next photo
    if (currentPhotoIndex < photos.length - 1) {
        currentPhotoIndex++;
    } else {
        // Otherwise, go to the first photo in the array
        currentPhotoIndex = 0;
    }
    // Update the current photo
    currentPhoto = photos[currentPhotoIndex];
    showCurrentPhoto('next');
    resetAutoSlide();
}

// Function to start the auto slide
function startAutoSlide() {
    // Set the interval to change the photo every 10 seconds
    autoSlideInterval = setInterval(nextPhoto, 10000); 
}

// Function to reset the auto slide
function resetAutoSlide() {
    // Set the interval to 0
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

function shufflePhotos(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // Get a random index
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}
