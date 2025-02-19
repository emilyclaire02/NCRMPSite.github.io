let currentPhoto = null;
let currentPhotoIndex = 0;

window.onload = function () {
    if (photos.length > 0) {
        currentPhoto = photos[0];
        currentPhotoIndex = 0;
        showCurrentPhoto();
        startAutoSlide();
    } else {
        console.error("Photos is empty. Check the photos array.");
    }
};

window.previousPhoto = previousPhoto;
window.nextPhoto = nextPhoto;
window.setPhoto = setPhoto;
 
class Photo {
    /**
     * @param {string} name // The name of the photo
     * @param {string} credit // The credit for who took the photo
     * @param {string} description // A description of the photo that is not seen 
     */

    constructor(name, credit, description) {
        this.name = name;
        this.credit = credit;
        this.description = description;
    }
}

const photos = [
    new Photo("Dive team water entry.jpg", "NPS Photo by Rob Waara", "two divers in the water"),
    new Photo("VIIS-UW-160817- Coral Survey - EPA and UM Diver 2.jpg", "NPS Photo by Shaun Wolfe/OWUSS", "two divers with clipboards surveying reef"),
    new Photo("graysby.JPG", "NOAA Fisheries Photo by Caitlin Langwiser", "a graysby in coral"),
    new Photo("West Palm Aug 2015 Kilfoyle-2.jpg", "Nova Southeastern University by Kirk Kilfoyle", "reef with many fish"),
    new Photo("Gray Angelfish.jpg", "NPS Photo by Rob Waara", "a gray angelfish"),
    new Photo("VIIS-UW-160817- Shallow Reef Scape 3.jpg", "NPS Photo by Shaun Wolfe/OWUSS", "shallow reef scape"),
    new Photo("8025 Bleaching Orbicella (4) copy.jpg", "N