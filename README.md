# Overwatch Dashboard
This project is a dashboard for the popular online game Overwatch.

Using this website you will be able to search for information on users spanning across all platforms.
There is also a page for you to easily compare your statistics with other users.

Features also exist to request new features and report bugs.

The goals of the website are to:
- Allow users to search for their profile and easily view there statistics
- Allow users to search for their friends profiles and easily view there statistics
- Provide users with an easy way to compare their statistics to those of others
- Allow users to report any issues they have on the website.
- Allow users to suggest improvements to the website.

## Demo

A demo can be viewed on Github Pages [here](https://cobonkoi.github.io/overwatch-dashboard/).

If you don't play Overwatch, here is a list of example profiles to use on the demo:
Sharpy-2695 (PC)
MLGesus-21679 (PC)
LicensedCntrctr (Xbox)
shon bilinkis (Xbox)
Ignortion (PS4)
NekoGirlMx (PS4)

## UX
My goal with the design of this website was to be as minimilistic as possible to enable the data to be easy to read and understand.

To do this I have not included vibrant colours or too much information on the screen at once.

This website is for users who want to look at their statistics outside of the game and compare them to other users.

#### User Stories
1. As a new visitor to the site, I want to be able to easily navigate the site, so that I can find what I want easily.
2. As a new visitor to the site, I want to search for my overwatch profile easily.
3. As a new visitor to the site, I want to compare my profile to other overwatch profiles.
4. As a user of the site, I want to request a new feature for the dashboard.
5. As a user of the site, I want to report a bug I have encountered.

#### Wireframe Mockups

Here are the wireframe mockups that I made before starting the project.

You will see some changes on the search page compared to the demo.
I made the change to the data so that only one set is shown at a time, this change was made due to some feedback from my mentor.

- [Index - Web](wireframes/index-web.png).
- [Index - Tablet](wireframes/index-tablet.png).
- [Index - Mobile](wireframes/index-mobile.png).
- [Index - Mobile - Menu Open](wireframes/index-mobile-menuopen.png).
- [Index - Mobile - Dropdown Open](wireframes/index-mobile-dropdownopen.png).
- [Search - Web](wireframes/search-web.png).
- [Search - Tablet](wireframes/search-tablet.png).
- [Search - Mobile](wireframes/search-mobile.png).
- [Contact - Web](wireframes/contact-web.png).
- [Contact - Tablet](wireframes/contact-tablet.png).
- [Contact - Mobile](wireframes/contact-mobile.png).
- [Compare - Web](wireframes/compare-web.png).
- [Compare - Mobile](wireframes/compare-mobile.png).

## Features
Each page features a navigation bar that is responsive to screen sizes. This contains links to each other page, as well as the site logo in the top left which links back to the index page.
Each page features a footer with copyright information.

#### Index

This page features a search bar with dropdown to pick the relevant platform that you want to search.
Clicking the search button will send you to the search page, and show information for the username/platform that you input.

#### Search

This page features the same search bar as the index page. If you have come from the index page this will show the information that you searched.
If you have come from the index page via a search, all of the information on this page will update automatically on load.
Beneath the search is the profile overview which shows profile picture, username, platform, profile level and endoresment level of the searched profile.
Beneath the profile overview, are the profiles full statistics.
This has 2 dropdown menus to change the information that appears in the tables below them.
The tables are laid out in tabs which can easily be switch between by clicking the titles.

#### Feature Request/Bug Report

These pages feature a list of currently known bugs and requested features.
They also feature a form to fill in to either report a bug or request a feature.

### Existing Features

- Search Profile Form - This form allows the user to search for a profile over 3 platforms (PC, Xbox, PS4)
- Compare Profile Form - This form allows the user to add and remove profiles to compare statistics between them.
- Report Bug Form - This form allows the user to input information on a bug they have encountered to report it.
- Request Feature Form - This form allows the user to suggest improvements to the site.

### Features Left to Implement
- History of searched profiles - With this you could easily see your historical searches and navigate back to these profiles. I did not have time to implement this, this could be added in the future.

## Technologies Used
1. HTML
2. CSS
3. Bootstrap (4.3)
4. JQuery
5. Javascript

## Testing
1. Index - Search Form:
    1. Went to the "Index" page
    2. Tried to submit the empty form and confirmed that an error message about the required fields appears.
    3. Tried to submit the form with all inputs and verify it submits the correct variables to search page.

2. Search Page - Search Form:
    1. Went to the "Search" page
    2. Tried to submit the empty form and confirmed that an error message appears.
    3. Tried to submit the form with an invalid platform for a PC username, confirmed an error message about the profile not being found appears.
    4. Tried to submit the form with an invalid format for PC, confirmed an error message about format appears.
    5. Tried to submit the form with an private profile, confirmed error about profile being private appears.
    4. Tried to submit the form with all inputs valid and verify it populates dashboard correctly.

1. Bug Report Form:
    1. Go to the "Bug Report" page
    2. Tried to submit the empty form and confirmed that an error message about the required fields appears.
    3. Tried to submit the form with an invalid email address and verify that a relevant error message appears
    4. Tried to submit the form with all inputs valid and verify it submits.

1. Feature Request Form:
    1. Go to the "Feature Request" page
    2. Tried to submit the empty form and confirmed that an error message about the required fields appears.
    3. Tried to submit the form with an invalid email address and verify that a relevant error message appears
    4. Tried to submit the form with all inputs valid and verify it submits.

## Deployment

This site is hosted using GitHub pages, deployed directly from the master branch. The deployed site will update automatically everytime there's a new commit to the master branch. In order for the deployed site to work correctly on GitHub pages, the landing page must be named `index.html`.

For you to run this locally, you could clone this repository into any editor you want by pasting `git clone https://github.com/Cobonkoi/overwatch-dashboard.git` into your terminal. To cut ties with this GitHub repository, type `git remote rm origin` into the terminal.

A demo can be viewed on Github Pages [here](https://cobonkoi.github.io/overwatch-dashboard/).

### Media
- The screenshots used on this site were obtained from the game Overwatch.

This is for educational use.