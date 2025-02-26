# NCRMP-Website

## Table of Contents

1. [About the Project](#about-the-project)
2. [Key Features](#key-features)
3. [Installation](#installation)
4. [Usage](#usage)
    - [Home](#home)
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

### Home

The About Us page displays a photo carousal and links to other pages on the website.

The Photos class in home.js contains a constructor with all the elements needed to display a photo. The parameters are: 

name: The name of the photo in homePhotos
credit: The credit for who took the photo
description: A description of the photo 

#### Adding a New Person

To add a person to the page, create a new Person object in the photos array using this template.

Template:

new Photo(
    "Name",
    "Credit",
    "Description",
)

### Publications

The JavaScript function, displayArticles() in code.js, dynamically generates HTML content to display a list of articles. It iterates through an array of article objects, creating HTML elements for each article's title, authors, image, bullet points, and citation button. The function then appends these elements to a main list, which is finally added to a container element in the HTML document.

The Articles class in article.js contains a constructor with all the elements needed to display a publication. The parameters are: 

title: The title of the publication  
citation: The citation  
bulletPoints: As ummary of the article that is visible to the user  
image: An image that will be shown to the users. Put these images in the "pictures" folder".  
authors: The authors  
date: The date the publicaition was published  
keywords: Keywords that are not visible to the user, but are still searchable  
link: A Link to the article  

#### Adding a New Publication Entry

Adding a new entry to the publications can be done in two ways, manually inputting an entry into the articles array, or loading a tsv file.

##### Manual Input:

To add an entry to the page, create a new Article object in the articles array using this template.

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

##### TSV Input:

Download the "Publications Page Template" Google Sheets and name it "publicationsInput.tsv".
Download all the pictures from the "pictures" folder in the Google Drive and put it in the "pictures" folder.
Edit the comment on line 94 in the article.js file with the current date

The initializeArticlesArray() function will then take every line of the spreadsheet and create a new Article to add to the articles array.

### About Us

The About Us page displays each team member using HTML. Each person has a name, picture, bio, title, and email associated with them. The list of people can go under the "Team", "Current Interns", or "Past Interns" heading. Each heading has a "bio" div where the people are listed. 

The People class in about.js contains a constructor with all the elements needed to display a person. The parameters are: 

name: The person's name
title: The person's title
email: The person's email
bio: A short bio of 500 characters
image: An image that is visible to users
group: The group they are a part of: team, currentInterns, pastInterns

#### Adding a New Person

Adding a new entry to the publications can be done in two ways, manually inputting an entry into the articles array or loading a tsv file.

##### Manual Input:

To add a person to the page, create a new Person object in the people array using this template.

Template:

new Person(
    "Name",
    "Title",
    "email.gmail.com",
    "bio",
    "aboutPictures/image.jpg",
    "group",
)

##### TSV Input:

Download the "About Us Page Template" Google Sheets and name it "aboutInput.tsv".
Download all the pictures from the "pictures" folder in the Google Drive and put it in the "aboutPictures" folder.

The initializePeopleArray() function will then take every line of the spreadsheet and create a new Person to add to the people array.

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

Adding a new entry to the timeline can be done in two ways, manually inputting an entry into the timeline array, or loading a tsv file.

##### Manual Input:

First ensure that in window.onload = function() the function "initializeTimeline()" is commented out.
Edit the "firstYear" and "finalYear" variables with the first and last years that the timeline will extend to.
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

First ensure that in window.onload = function() the function "initializeTimeline()" is called. Comment out anything in the "timeline" array.
Sort the "Timeline" Google Sheets by date from oldest to newest event. 
Download the "Timeline" Google Sheets and name it "timelineInput.tsv".
Download all the media from the "media" folder in the Google Drive and put it in the "timelineMedia" folder.
Edit the "firstYear" and "finalYear" variables with the first and last years that the timeline will extend to.

The initializeTimeline() function will then take every line of the spreadsheet and create a new timelineEntry to add to the timeline array.