# NCRMP-Website

## Table of Contents

1. [About the Project](#about-the-project)
2. [Key Features](#key-features)
3. [Installation](#installation)
4. [Usage](#usage)
    - [Publications](#publications)
    - [About Us](#about-us)
    - [Timeline](#timeline)

## About the Project

The National Coral Reef Monitoring Program (NCRMP) Website serves as a resource for understanding and exploring the work of the NCRMP. It aims to promote awareness, provide transparency, and offer easy access to essential information about coral reef monitoring efforts.

## Key Features

Publications: A centralized page where users can browse and access NCRMP publications. Users can search for regions, authors, or other related keywords. Hovering over the images reveal bullet points that give a short overview of the article. Users can also cite the publication by pressing the "cite" button.

About Us Page: This page introduces the team behind the NCRMP, and provides each team member's email to allow users to contact them. Clicking on a picture reveals a short bio about the person.

Timeline of Events: An interactive timeline highlighting significant events, milestones, and achievements in the NCRMP’s history, offering insights into the program's evolution and impact.

## Installation

1. Prerequisites:
- This project uses HTML, CSS, and JavaScript
2. Steps:
/# Clone the repository  
gh repo clone emilyclaire02/NCRMPSite.github.io

/# Navigate to the project directory  
cd NCRMPSite

## Usage

### Publications

The JavaScript function, displayArticles() in code.js, dynamically generates HTML content to display a list of articles. It iterates through an array of article objects, creating HTML elements for each article's title, authors, image, bullet points, and citation button. The function then appends these elements to a main list, which is finally added to a container element in the HTML document.

The Articles class in article.js contains a constructor with all the elements needed to display a publication. The parameters are: 

title: The title of the publication  
citation: The citation  
bulletPoints: As ummary of the article that is visible to the user  
image: An image that will be shown to the users. Put these images in the "pictures" folder".  
authors: The authors  
year: The year the publication was published  
date: The date the publicaition was published  
keywords: Keywords that are not visible to the user, but are still searchable  
link: A Link to the article  

#### Adding a New Publication

To add an article to the page, create a new Article object in the articles array using this template.

Template:

new Article(  
    "Title",  
    "Citation",  
    ["Bullet Point 1", "Bullet Point 2", "Bullet Point 3", "Bullet point 4"],  
    "pictures/image.png",  
    ["Author 1","Author 2","Author 3","Author 4","Author 5"],  
    2024,  
    "YYYY-MM-DD",  
    ["keyword1, "keyword2", "keyword3", "keyword4", "keyword5"],  
    "www.link.com"  
)  

### About Us

The About Us page displays each team member using HTML. Each person has a name, picture, bio, title, and email associated with them. The list of people can go under the "Team", "Current Interns", or "Past Interns" heading. Each heading has a "bio" div where the people are listed. 

#### Adding a New Person

To add a new person, identify the "bio" div of the group the person is a part of. Fill out the following template and add it to the "bio" div.

Template:

    <div class="person">
        <h2>First Last</h2>
        <div class="flip-card">
            <div class="flip-card-front">
                <img src="pictures/profile.jpg" alt="person" class="card-image">
            </div>
            <div class="flip-card-back">
                <p>Bio</p>
            </div>
        </div>
        <div class="contact-info">
            <h3>Title</h3>
            <p>Email: first.last@email.com</p>
        </div>
    </div>

### Timeline 

The JavaScript function, buildTimeline() in code.js, dynamically generates HTML content to display a timeline. It iterates through an array of timeline objects, creating HTML elements for each entry.

The TimelineEntry class in timeline.js contains a constructor with all the elements needed to display a new flag on the timeline. The parameters are: 

preview: A short overview. Essentially the title of the event.  
description: A long description describing what occured.  
mediaType: An indication of the type of media the entry will be using. Available types: Image/video. This is used when creating the media to ensure the correct element is created.  
media: Some sort of media. If it is an image, the name of an image that can be found in timelineMedia is provided. If it is a video, a YouTube video link is provided.  
icon: A small icon to be displayed on the event flag. To use the image associated with the event, input "image". To use a different image, input the name of an image that can be found in timelineMedia. If an icon will not be used, input "none".  
date: The date the event occured in "DD-MM-YYYY" format.  
spacer: The space between flags. This is dynamically calculated.  

#### Adding a New Timeline Entry

Adding a new entry to the timeline can be done in two ways, manually inputting an entry into the timeline array, or laoding a tsv file.

##### Manual Input:

First ensure that in window.onload = function() the function "initializeTimeline()" is commented out.
To add an entry to the timeline, create a new TimelineEntry object in the timeline array using this template.

Template:

new TimelineEntry(  
    "Preview",  
    "Description",  
    "image",  
    "timelineMedia/image.jpg",  
    "image",  
    "MM-DD-YYYY"  
)  

##### TSV Input:

First ensure that in window.onload = function() the function "initializeTimeline()" is called.
Download the "Timeline" Google Sheets and name it "timelineInput.tsv".
Download all the media from the "media" folder in the Google Drive and put it in the "timelineMedia" folder.

The initializeTimeline() function will then take every line of the spreadsheet and create a new timelineEntry to add to the timeline array.