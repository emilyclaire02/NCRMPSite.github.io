window.showImages = function(imagesId) {
    const images = document.getElementById(imagesId);
    if (images) {
        images.style.display = "flex";
    } else {
        console.error("Element with ID " + imagesId + " not found.");
    }
};


var map = L.map('map').setView([24, -79], 5);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var puertoRicoIcon = L.icon({
    iconUrl: './reports/reportsMedia/puertoRicoIcon.png', 
    iconSize: [70, 70],
});

var floridaIcon = L.icon({
    iconUrl: './reports/reportsMedia/floridaIcon.png', 
    iconSize: [70, 70],
});

var flowerGardensIcon = L.icon({
    iconUrl: './reports/reportsMedia/flowerGardensIcon.png', 
    iconSize: [70, 70],
});

var virginIslandsIcon = L.icon({
    iconUrl: './reports/reportsMedia/virginIslandsIcon.png', 
    iconSize: [70, 70],
});

var nationalIcon = L.icon({
    iconUrl: './reports/reportsMedia/nationalIcon.png', 
    iconSize: [70, 70],
});

var puertoRico = new L.marker([19, -66.8], { icon:puertoRicoIcon});
puertoRico.bindPopup("<a href='#puertorico_cover' onclick='showImages(\"puertorico_images\")'>Puerto Rico Reports</a>");
puertoRico.addTo(map);

var florida = new L.marker([26.5, -81.3], { icon:floridaIcon});
florida.bindPopup("<a href='#florida_cover' onclick='showImages(\"florida_images\")'>Florida Reports</a>");
florida.addTo(map);

var flowerGardens = new L.marker([26.5, -93], { icon:flowerGardensIcon});
flowerGardens.bindPopup("<a href='#flowergarden_cover' onclick='showImages(\"flowergarden_images\")'>Flower Garden Banks Reports</a>");
flowerGardens.addTo(map);

var virginIslands = new L.marker([19.4, -64.5], { icon:virginIslandsIcon});
virginIslands.bindPopup("<a href='#virginislands_cover' onclick='showImages(\"virginislands_images\")'>U.S. Virgin Islands Reports</a>");
virginIslands.addTo(map);

var national = new L.marker([28, -65], { icon:nationalIcon});
national.bindPopup("<a href='#national_cover' onclick='showImages(\"national_images\")'>National Report</a>");
national.addTo(map);

document.addEventListener("DOMContentLoaded", function () {
    const cover = document.getElementById("florida_cover");
    const images = document.getElementById("florida_images");

    cover.addEventListener("click", function () {
        if (images.style.display === "none" || images.style.display === "") {
            images.style.display = "flex"; // Show images
        } else {
            images.style.display = "none"; // Hide images
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const cover = document.getElementById("flowergarden_cover");
    const images = document.getElementById("flowergarden_images");

    cover.addEventListener("click", function () {
        if (images.style.display === "none" || images.style.display === "") {
            images.style.display = "flex"; // Show images
        } else {
            images.style.display = "none"; // Hide images
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const cover = document.getElementById("puertorico_cover");
    const images = document.getElementById("puertorico_images");

    cover.addEventListener("click", function () {
        if (images.style.display === "none" || images.style.display === "") {
            images.style.display = "flex"; // Show images
        } else {
            images.style.display = "none"; // Hide images
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const cover = document.getElementById("virginislands_cover");
    const images = document.getElementById("virginislands_images");

    cover.addEventListener("click", function () {
        if (images.style.display === "none" || images.style.display === "") {
            images.style.display = "flex"; // Show images
        } else {
            images.style.display = "none"; // Hide images
        }
    });

});

document.addEventListener("DOMContentLoaded", function () {
    const cover = document.getElementById("national_cover");
    const images = document.getElementById("national_images");

    cover.addEventListener("click", function () {
        if (images.style.display === "none" || images.style.display === "") {
            images.style.display = "flex"; // Show images
        } else {
            images.style.display = "none"; // Hide images
        }
    });

});