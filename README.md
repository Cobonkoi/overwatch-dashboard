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

If you don't play Overwatch, here is a list of example profiles to use on the website:
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

#### Compare



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

In this section, you need to convince the assessor that you have conducted enough testing to legitimately believe that the site works well. Essentially, in this part you will want to go over all of your user stories from the UX section and ensure that they all work as intended, with the project providing an easy and straightforward way for the users to achieve their goals.

Whenever it is feasible, prefer to automate your tests, and if you've done so, provide a brief explanation of your approach, link to the test file(s) and explain how to run them.

For any scenarios that have not been automated, test the user stories manually and provide as much detail as is relevant. A particularly useful form for describing your testing process is via scenarios, such as:

1. Contact form:
    1. Go to the "Contact Us" page
    2. Try to submit the empty form and verify that an error message about the required fields appears
    3. Try to submit the form with an invalid email address and verify that a relevant error message appears
    4. Try to submit the form with all inputs valid and verify that a success message appears.

In addition, you should mention in this section how your project looks and works on different browsers and screen sizes.

You should also mention in this section any interesting bugs or problems you discovered during your testing, even if you haven't addressed them yet.

If this section grows too long, you may want to split it off into a separate file and link to it from here.

## Deployment

This section should describe the process you went through to deploy the project to a hosting platform (e.g. GitHub Pages or Heroku).

In particular, you should provide all details of the differences between the deployed version and the development version, if any, including:
- Different values for environment variables (Heroku Config Vars)?
- Different configuration files?
- Separate git branch?

In addition, if it is not obvious, you should also describe how to run your code locally.


## Credits

### Media
- The screenshots used on this site were obtained from the game Overwatch.

This is for educational use.