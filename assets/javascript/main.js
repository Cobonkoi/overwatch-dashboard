const baseURL = "https://ow-api.com/v1/stats/";

const bestArray = ['allDamageDoneMostInGame', 'barrierDamageDoneMostInGame', 'defensiveAssistsMostInGame', 'eliminationsMostInGame', 'finalBlowsMostInGame', 'healingDoneMostInGame',
    'heroDamageDoneMostInGame', 'killsStreakBest', 'meleeFinalBlowsMostInGame', 'multikillsBest', 'objectiveKillsMostInGame', 'objectiveTimeMostInGame',
    'offensiveAssistsMostInGame', 'soloKillsMostInGame', 'timeSpentOnFireMostInGame', 'turretsDestroyedMostInGame'
];

const combatArray = ['barrierDamageDone', 'damageDone', 'deaths', 'eliminations', 'finalBlows', 'heroDamageDone', 'meleeFinalBlows', 'multikills', 'objectiveKills',
    'objectiveTime', 'soloKills', 'timeSpentOnFire'
];

const assistsArray = ['defensiveAssists', 'healingDone', 'offensiveAssists'];
const averageArray = ['allDamageDoneAvgPer10Min', 'barrierDamageDoneAvgPer10Min', 'deathsAvgPer10Min', 'eliminationsAvgPer10Min', 'finalBlowsAvgPer10Min', 'healingDoneAvgPer10Min',
    'heroDamageDoneAvgPer10Min', 'objectiveKillsAvgPer10Min', 'objectiveTimeAvgPer10Min', 'soloKillsAvgPer10Min', 'timeSpentOnFireAvgPer10Min'
];

const awardsArray = ['cards', 'medals', 'medalsBronze', 'medalsGold', 'medalsSilver'];
const gameArray = ['gamesWon', 'timePlayed'];
const miscellaneousArray = ['teleporterPadsDestroyed', 'turretsDestroyed'];

const profileImageArray = ['havana-screenshot-001.jpg', 'blizzardworld-screenshot-001.jpg', 'blizzardworld-screenshot-002.jpg', 'busan-screenshot-001.jpg',
    'dorado-screenshot-001.jpg', 'dorado-screenshot-002.jpg', 'dorado-screenshot-003.jpg', 'hanamura-screenshot-001.jpg',
    'junkertown-screenshot-001.jpg', 'kings-row-screenshot-001.jpg', 'paris-screenshot-001.jpg', 'petra-screenshot-001.jpg', 'rialto-screenshot-001.jpg'
];

let dataDownload = {};

let comparisonProfile1 = {};
let comparisonProfile2 = {};
let comparisonProfile3 = {};
let comparisonProfile4 = {};
let comparisonProfile5 = {};

//Used to get data from API using information the user has inputted.
function getData(platformInput, usernameInput, cb) {
    var xhr = new XMLHttpRequest();

    //Creating the URL for the API using data in the dropdown boxes - region required for PC but doesn't need to change.
    var platform = document.getElementById(platformInput).value;
    var region = 'eu';
    var username = document.getElementById(usernameInput).value;

    if (platform == "pc") {
        var profileUrl = baseURL + platform + "/" + region + "/" + username + "/complete";
    }
    else {
        var profileUrl = baseURL + platform + "/" + username + "/complete";
    }

    //Possible Error codes with outputs
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
        else if (this.readyState == 4 && this.status == 400) {
            document.getElementById("errorMessage").innerHTML = "Bad Request - Please follow correct format for PC (Username-12345)";
            hideLoadingScreen();
        }
        else if (this.readyState == 4 && this.status == 404) {
            document.getElementById("errorMessage").innerHTML = "Profile not found - Please check Platform - Profiles are case sensitive";
            hideLoadingScreen();
        }
        else if (this.readyState == 4 && this.status == 500) {
            document.getElementById("errorMessage").innerHTML = "Internal Server Error – We had a problem with our server. Try again later.";
            hideLoadingScreen();
        }
        else if (this.readyState == 4 && this.status == 503) {
            document.getElementById("errorMessage").innerHTML = "Service Unavailable – We’re temporarily offline for maintenance. Please try again later.";
            hideLoadingScreen();
        }
    };

    xhr.open("GET", profileUrl);
    xhr.send();
}

//Populates the dashboard using plaform and username information
function writeToDocument(platformInput, usernameInput) {
    showLoadingScreen();

    //Check that they have entered a username and platform before going any further
    if (document.getElementById(platformInput).value !== '' && document.getElementById(usernameInput).value !== '') {

        getData(platformInput, usernameInput, function(data) {
            dataDownload = data;

            //Checks if profile is private and gives error if so. Otherwise inserts random profile background & populates dashboard.
            if (dataDownload['private'] === true) {
                document.getElementById("errorMessage").innerHTML = "Profile is Private - Please set to public in Overwatch > Social settings";
            }
            else {
                randomBackground();
                changeDocumentData();
            }
            hideLoadingScreen();
        });
    }
    else {
        document.getElementById("errorMessage").innerHTML = "Error - Please enter a username";
        hideLoadingScreen();
    }

}

//Shows the loading screen
function showLoadingScreen() {
    document.getElementById("errorMessage").innerHTML = "";
    document.getElementById("loaderBackground").classList.add("loader-background");
    document.getElementById("loader").classList.add("loader");
}

//Hides the loading screen
function hideLoadingScreen() {
    document.getElementById("loaderBackground").classList.remove('loader-background');
    document.getElementById("loader").classList.remove('loader');
}

//Chooses a random background from an array for the profilebackground
function randomBackground() {
    var profileBackgroundImage = profileImageArray[Math.floor(Math.random() * profileImageArray.length)];
    var profileBackground = document.createElement('style');
    document.head.appendChild(profileBackground);
    profileBackground.sheet.insertRule(`#profileBackground { background: url("./assets/images/${profileBackgroundImage}") no-repeat center center; -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;`);
}

//To split out the data from the URL if sent from index
function GetURLParameter(param) {
    var pageURL = window.location.search.substring(1);
    var urlVariables = pageURL.split('&');
    for (var i = 0; i < urlVariables.length; i++) {
        var parameterName = urlVariables[i].split('=');
        if (parameterName[0] == param) {
            return parameterName[1];
        }
    }
}

//Runs on search page loading, checks if data was sent from index. Populates dashbaord if there was data sent
function indexSearch() {
    var searchFormPlatform = GetURLParameter('searchFormPlatform');
    var searchFormUsername = GetURLParameter('searchFormUsername');

    if (searchFormPlatform !== undefined && searchFormUsername !== undefined) {
        document.getElementById('searchFormPlatform').value = searchFormPlatform;
        document.getElementById('searchFormUsername').value = searchFormUsername;

        document.getElementById('searchFormPlatformMobile').value = searchFormPlatform;
        document.getElementById('searchFormUsernameMobile').value = searchFormUsername;

        writeToDocument('searchFormPlatform', 'searchFormUsername');
    }
}

function changeDocumentData() {
    if (Object.entries(dataDownload).length !== 0) {

        var gameType = document.getElementById("gameTypeSelect").value;
        var heroName = document.getElementById("heroNameSelect").value;

        //Profile Text
        document.getElementById("profileUsername").innerHTML = dataDownload['name'];
        document.getElementById("profileLevel").innerHTML = dataDownload['level'] + (dataDownload['prestige'] * 100);
        document.getElementById("profileEndoresmentLevel").innerHTML = dataDownload['endorsement'];
        document.getElementById("profilePlatform").innerHTML = document.getElementById("searchFormPlatform").value;


        //Images
        document.getElementById("profilePictureImage").src = dataDownload['icon'];

        //Table Data - Each table checks for possible errors with null data before populating.
        bestArray.forEach(function(statistic) {
            if (dataDownload[gameType]['careerStats'][heroName] == null) {
                document.getElementById(statistic).innerHTML = "N/A";
            }
            else {
                if (dataDownload[gameType]['careerStats'][heroName]['best'] == null) {
                    document.getElementById(statistic).innerHTML = "N/A";
                }
                else {
                    if (dataDownload[gameType]['careerStats'][heroName]['best'][statistic] == null) {
                        document.getElementById(statistic).innerHTML = "N/A";
                    }
                    else {
                        document.getElementById(statistic).innerHTML = dataDownload[gameType]['careerStats'][heroName]['best'][statistic];
                    }
                }
            }
        });

        combatArray.forEach(function(statistic) {
            if (dataDownload[gameType]['careerStats'][heroName] == null) {
                document.getElementById(statistic).innerHTML = "N/A";
            }
            else {
                if (dataDownload[gameType]['careerStats'][heroName]['combat'] == null) {
                    document.getElementById(statistic).innerHTML = "N/A";
                }
                else {
                    if (dataDownload[gameType]['careerStats'][heroName]['combat'][statistic] == null) {
                        document.getElementById(statistic).innerHTML = "N/A";
                    }
                    else {
                        document.getElementById(statistic).innerHTML = dataDownload[gameType]['careerStats'][heroName]['combat'][statistic];
                    }
                }
            }
        });

        assistsArray.forEach(function(statistic) {
            if (dataDownload[gameType]['careerStats'][heroName] == null) {
                document.getElementById(statistic).innerHTML = "N/A";
            }
            else {
                if (dataDownload[gameType]['careerStats'][heroName]['assists'] == null) {
                    document.getElementById(statistic).innerHTML = "N/A";
                }
                else {
                    if (dataDownload[gameType]['careerStats'][heroName]['assists'][statistic] == null) {
                        document.getElementById(statistic).innerHTML = "N/A";
                    }
                    else {
                        document.getElementById(statistic).innerHTML = dataDownload[gameType]['careerStats'][heroName]['assists'][statistic];
                    }
                }
            }
        });

        averageArray.forEach(function(statistic) {
            if (dataDownload[gameType]['careerStats'][heroName] == null) {
                document.getElementById(statistic).innerHTML = "N/A";
            }
            else {
                if (dataDownload[gameType]['careerStats'][heroName]['average'] == null) {
                    document.getElementById(statistic).innerHTML = "N/A";
                }
                else {
                    if (dataDownload[gameType]['careerStats'][heroName]['average'][statistic] == null) {
                        document.getElementById(statistic).innerHTML = "N/A";
                    }
                    else {
                        document.getElementById(statistic).innerHTML = dataDownload[gameType]['careerStats'][heroName]['average'][statistic];
                    }
                }
            }
        });

        awardsArray.forEach(function(statistic) {
            if (dataDownload[gameType]['careerStats'][heroName] == null) {
                document.getElementById(statistic).innerHTML = "N/A";
            }
            else {
                if (dataDownload[gameType]['careerStats'][heroName]['matchAwards'] == null) {
                    document.getElementById(statistic).innerHTML = "N/A";
                }
                else {
                    if (dataDownload[gameType]['careerStats'][heroName]['matchAwards'][statistic] == null) {
                        document.getElementById(statistic).innerHTML = "N/A";
                    }
                    else {
                        document.getElementById(statistic).innerHTML = dataDownload[gameType]['careerStats'][heroName]['matchAwards'][statistic];
                    }
                }
            }
        });

        gameArray.forEach(function(statistic) {
            if (dataDownload[gameType]['careerStats'][heroName] == null) {
                document.getElementById(statistic).innerHTML = "N/A";
            }
            else {
                if (dataDownload[gameType]['careerStats'][heroName]['game'] == null) {
                    document.getElementById(statistic).innerHTML = "N/A";
                }
                else {
                    if (dataDownload[gameType]['careerStats'][heroName]['game'][statistic] == null) {
                        document.getElementById(statistic).innerHTML = "N/A";
                    }
                    else {
                        document.getElementById(statistic).innerHTML = dataDownload[gameType]['careerStats'][heroName]['game'][statistic];
                    }
                }
            }
        });

        miscellaneousArray.forEach(function(statistic) {
            if (dataDownload[gameType]['careerStats'][heroName] == null) {
                document.getElementById(statistic).innerHTML = "N/A";
            }
            else {
                if (dataDownload[gameType]['careerStats'][heroName]['miscellaneous'] == null) {
                    document.getElementById(statistic).innerHTML = "N/A";
                }
                else {
                    if (dataDownload[gameType]['careerStats'][heroName]['miscellaneous'][statistic] == null) {
                        document.getElementById(statistic).innerHTML = "N/A";
                    }
                    else {
                        document.getElementById(statistic).innerHTML = dataDownload[gameType]['careerStats'][heroName]['miscellaneous'][statistic];
                    }
                }
            }
        });
    }
}

//Changes the placeholder text depending on which platform you pick from dropdown.
function changeUsernamePlaceholder() {
    if (document.getElementById("searchFormPlatform").value == "pc") {
        document.getElementById("searchFormUsername").placeholder = "Blizzard ID (Username-12345)";
    }
    else if (document.getElementById("searchFormPlatform").value == "xbl") {
        document.getElementById("searchFormUsername").placeholder = "Gamertag";
    }
    else if (document.getElementById("searchFormPlatform").value == "psn") {
        document.getElementById("searchFormUsername").placeholder = "PSN ID";
    }
}

function changeUsernamePlaceholderMobile() {
    if (document.getElementById("searchFormPlatformMobile").value == "pc") {
        document.getElementById("searchFormUsernameMobile").placeholder = "Blizzard ID (Username-12345)";
    }
    else if (document.getElementById("searchFormPlatformMobile").value == "xbl") {
        document.getElementById("searchFormUsernameMobile").placeholder = "Gamertag";
    }
    else if (document.getElementById("searchFormPlatformMobile").value == "psn") {
        document.getElementById("searchFormUsernameMobile").placeholder = "PSN ID";
    }
}



function writeToComparison(platformInput, usernameInput) {
    showLoadingScreen();

    //Check that they have entered a username and platform before going any further
    if (document.getElementById(platformInput).value !== '' && document.getElementById(usernameInput).value !== '') {

        getData(platformInput, usernameInput, function(data) {


            //Checks if profile is private and gives error if so. Otherwise inserts random profile background & populates dashboard.
            if (data['private'] === true) {
                document.getElementById("errorMessage").innerHTML = "Profile is Private - Please set to public in Overwatch > Social settings";
                hideLoadingScreen();
            }
            else {
                if (Object.entries(comparisonProfile1).length === 0) {
                    comparisonProfile1 = data;
                    addComparisonData(comparisonProfile1, "1");
                }
                else if (Object.entries(comparisonProfile2).length === 0) {
                    comparisonProfile2 = data;
                    addComparisonData(comparisonProfile2, "2");
                }
                else if (Object.entries(comparisonProfile3).length === 0 && platformInput !== "searchFormPlatformMobile") {
                    comparisonProfile3 = data;
                    addComparisonData(comparisonProfile3, "3");
                }
                else if (Object.entries(comparisonProfile4).length === 0 && platformInput !== "searchFormPlatformMobile") {
                    comparisonProfile4 = data;
                    addComparisonData(comparisonProfile4, "4");
                }
                else if (Object.entries(comparisonProfile5).length === 0 && platformInput !== "searchFormPlatformMobile") {
                    comparisonProfile5 = data;
                    addComparisonData(comparisonProfile5, "5");
                }
                else {
                    document.getElementById("errorMessage").innerHTML = "Comparison Slots Full - Please remove a profile first";
                    hideLoadingScreen();
                }
            }
        });
    }
    else {
        document.getElementById("errorMessage").innerHTML = "Error - Please enter a username";
        hideLoadingScreen();
    }
}

function addComparisonData(profileData, profileNumber) {

    var gameType = document.getElementById("gameTypeSelect").value;
    var heroName = document.getElementById("heroNameSelect").value;

    //Profile Text
    document.getElementById(`profileUsername${profileNumber}`).innerHTML = profileData['name'];
    document.getElementById(`profileLevel${profileNumber}`).innerHTML = profileData['level'] + (profileData['prestige'] * 100);
    document.getElementById(`profileEndoresmentLevel${profileNumber}`).innerHTML = profileData['endorsement'];

    //Images
    document.getElementById(`profilePictureImage${profileNumber}`).src = profileData['icon'];

    //Table Data - Each table checks for possible errors with null data before populating.
    bestArray.forEach(function(statistic) {
        if (profileData[gameType]['careerStats'][heroName] == null) {
            document.getElementById(`${statistic}${profileNumber}`).innerHTML = "N/A";
        }
        else {
            if (profileData[gameType]['careerStats'][heroName]['best'] == null) {
                document.getElementById(`${statistic}${profileNumber}`).innerHTML = "N/A";
            }
            else {
                if (profileData[gameType]['careerStats'][heroName]['best'][statistic] == null) {
                    document.getElementById(`${statistic}${profileNumber}`).innerHTML = "N/A";
                }
                else {
                    document.getElementById(`${statistic}${profileNumber}`).innerHTML = profileData[gameType]['careerStats'][heroName]['best'][statistic];
                }
            }
        }
    });

    combatArray.forEach(function(statistic) {
        if (profileData[gameType]['careerStats'][heroName] == null) {
            document.getElementById(`${statistic}${profileNumber}`).innerHTML = "N/A";
        }
        else {
            if (profileData[gameType]['careerStats'][heroName]['combat'] == null) {
                document.getElementById(`${statistic}${profileNumber}`).innerHTML = "N/A";
            }
            else {
                if (profileData[gameType]['careerStats'][heroName]['combat'][statistic] == null) {
                    document.getElementById(`${statistic}${profileNumber}`).innerHTML = "N/A";
                }
                else {
                    document.getElementById(`${statistic}${profileNumber}`).innerHTML = profileData[gameType]['careerStats'][heroName]['combat'][statistic];
                }
            }
        }
    });

    assistsArray.forEach(function(statistic) {
        if (profileData[gameType]['careerStats'][heroName] == null) {
            document.getElementById(`${statistic}${profileNumber}`).innerHTML = "N/A";
        }
        else {
            if (profileData[gameType]['careerStats'][heroName]['assists'] == null) {
                document.getElementById(`${statistic}${profileNumber}`).innerHTML = "N/A";
            }
            else {
                if (profileData[gameType]['careerStats'][heroName]['assists'][statistic] == null) {
                    document.getElementById(`${statistic}${profileNumber}`).innerHTML = "N/A";
                }
                else {
                    document.getElementById(`${statistic}${profileNumber}`).innerHTML = profileData[gameType]['careerStats'][heroName]['assists'][statistic];
                }
            }
        }
    });

    averageArray.forEach(function(statistic) {
        if (profileData[gameType]['careerStats'][heroName] == null) {
            document.getElementById(`${statistic}${profileNumber}`).innerHTML = "N/A";
        }
        else {
            if (profileData[gameType]['careerStats'][heroName]['average'] == null) {
                document.getElementById(`${statistic}${profileNumber}`).innerHTML = "N/A";
            }
            else {
                if (profileData[gameType]['careerStats'][heroName]['average'][statistic] == null) {
                    document.getElementById(`${statistic}${profileNumber}`).innerHTML = "N/A";
                }
                else {
                    document.getElementById(`${statistic}${profileNumber}`).innerHTML = profileData[gameType]['careerStats'][heroName]['average'][statistic];
                }
            }
        }
    });

    awardsArray.forEach(function(statistic) {
        if (profileData[gameType]['careerStats'][heroName] == null) {
            document.getElementById(`${statistic}${profileNumber}`).innerHTML = "N/A";
        }
        else {
            if (profileData[gameType]['careerStats'][heroName]['matchAwards'] == null) {
                document.getElementById(`${statistic}${profileNumber}`).innerHTML = "N/A";
            }
            else {
                if (profileData[gameType]['careerStats'][heroName]['matchAwards'][statistic] == null) {
                    document.getElementById(`${statistic}${profileNumber}`).innerHTML = "N/A";
                }
                else {
                    document.getElementById(`${statistic}${profileNumber}`).innerHTML = profileData[gameType]['careerStats'][heroName]['matchAwards'][statistic];
                }
            }
        }
    });

    gameArray.forEach(function(statistic) {
        if (profileData[gameType]['careerStats'][heroName] == null) {
            document.getElementById(`${statistic}${profileNumber}`).innerHTML = "N/A";
        }
        else {
            if (profileData[gameType]['careerStats'][heroName]['game'] == null) {
                document.getElementById(`${statistic}${profileNumber}`).innerHTML = "N/A";
            }
            else {
                if (profileData[gameType]['careerStats'][heroName]['game'][statistic] == null) {
                    document.getElementById(`${statistic}${profileNumber}`).innerHTML = "N/A";
                }
                else {
                    document.getElementById(`${statistic}${profileNumber}`).innerHTML = profileData[gameType]['careerStats'][heroName]['game'][statistic];
                }
            }
        }
    });

    miscellaneousArray.forEach(function(statistic) {
        if (profileData[gameType]['careerStats'][heroName] == null) {
            document.getElementById(`${statistic}${profileNumber}`).innerHTML = "N/A";
        }
        else {
            if (profileData[gameType]['careerStats'][heroName]['miscellaneous'] == null) {
                document.getElementById(`${statistic}${profileNumber}`).innerHTML = "N/A";
            }
            else {
                if (profileData[gameType]['careerStats'][heroName]['miscellaneous'][statistic] == null) {
                    document.getElementById(`${statistic}${profileNumber}`).innerHTML = "N/A";
                }
                else {
                    document.getElementById(`${statistic}${profileNumber}`).innerHTML = profileData[gameType]['careerStats'][heroName]['miscellaneous'][statistic];
                }
            }
        }
    });
    comparestats();
    hideLoadingScreen();
}

//Changes the data shown in the tables
function changeComparisonData() {
    if (Object.entries(comparisonProfile1).length !== 0) {
        addComparisonData(comparisonProfile1, "1");
    }
    if (Object.entries(comparisonProfile2).length !== 0) {
        addComparisonData(comparisonProfile2, "2");
    }
    if (Object.entries(comparisonProfile3).length !== 0) {
        addComparisonData(comparisonProfile3, "3");
    }
    if (Object.entries(comparisonProfile4).length !== 0) {
        addComparisonData(comparisonProfile4, "4");
    }
    if (Object.entries(comparisonProfile5).length !== 0) {
        addComparisonData(comparisonProfile5, "5");
    }
    comparestats();
}

//Removes profile data and frees up the profile for use again
function removeProfile(profileData, profileNumber) {
    if (profileNumber === "1") {
        comparisonProfile1 = {};
    }
    else if (profileNumber === "2") {
        comparisonProfile2 = {};
    }
    else if (profileNumber === "3") {
        comparisonProfile3 = {};
    }
    else if (profileNumber === "4") {
        comparisonProfile4 = {};
    }
    else if (profileNumber === "5") {
        comparisonProfile5 = {};
    }

    //Profile Text
    document.getElementById(`profileUsername${profileNumber}`).innerHTML = "Username";
    document.getElementById(`profileLevel${profileNumber}`).innerHTML = "999";
    document.getElementById(`profileEndoresmentLevel${profileNumber}`).innerHTML = "99";

    //Images
    document.getElementById(`profilePictureImage${profileNumber}`).src = "assets/images/profile-picture.png";

    //Table Data - Each table checks for possible errors with null data before populating.
    bestArray.forEach(function(statistic) {
        document.getElementById(`${statistic}${profileNumber}`).innerHTML = "";
    });

    combatArray.forEach(function(statistic) {
        document.getElementById(`${statistic}${profileNumber}`).innerHTML = "";
    });

    assistsArray.forEach(function(statistic) {
        document.getElementById(`${statistic}${profileNumber}`).innerHTML = "";
    });

    averageArray.forEach(function(statistic) {
        document.getElementById(`${statistic}${profileNumber}`).innerHTML = "";
    });

    awardsArray.forEach(function(statistic) {
        document.getElementById(`${statistic}${profileNumber}`).innerHTML = "";
    });

    gameArray.forEach(function(statistic) {
        document.getElementById(`${statistic}${profileNumber}`).innerHTML = "";
    });

    miscellaneousArray.forEach(function(statistic) {
        document.getElementById(`${statistic}${profileNumber}`).innerHTML = "";
    });
    comparestats();
}

//Compares each number against that of the same stat. Takes into account N/A's and time stats.
//Ran out of time to turn this lengthy code into functions for the repeated lines.
function comparestats() {
    bestArray.forEach(function(statistic) {

        let profileOne = 0;
        let profileTwo = 0;
        let profileThree = 0;
        let profileFour = 0;
        let profileFive = 0;

        let profileNumberArray = [1, 2, 3, 4, 5];

        if (document.getElementById(`${statistic}1`).innerHTML === "N/A") {
            profileOne = 0;
        }
        else if (document.getElementById(`${statistic}1`).innerHTML.includes(':')) {
            profileOne = parseInt(document.getElementById(`${statistic}1`).innerHTML.replace(':', ''), 10);
        }
        else {
            profileOne = document.getElementById(`${statistic}1`).innerHTML;
        }

        if (document.getElementById(`${statistic}2`).innerHTML === "N/A") {
            profileTwo = 0;
        }
        else if (document.getElementById(`${statistic}2`).innerHTML.includes(':')) {
            profileTwo = parseInt(document.getElementById(`${statistic}2`).innerHTML.replace(':', ''), 10);
        }
        else {
            profileTwo = document.getElementById(`${statistic}2`).innerHTML;
        }

        if (document.getElementById(`${statistic}3`).innerHTML === "N/A") {
            profileThree = 0;
        }
        else if (document.getElementById(`${statistic}3`).innerHTML.includes(':')) {
            profileThree = parseInt(document.getElementById(`${statistic}3`).innerHTML.replace(':', ''), 10);
        }
        else {
            profileThree = document.getElementById(`${statistic}3`).innerHTML;
        }

        if (document.getElementById(`${statistic}4`).innerHTML === "N/A") {
            profileFour = 0;
        }
        else if (document.getElementById(`${statistic}4`).innerHTML.includes(':')) {
            profileFour = parseInt(document.getElementById(`${statistic}4`).innerHTML.replace(':', ''), 10);
        }
        else {
            profileFour = document.getElementById(`${statistic}4`).innerHTML;
        }

        if (document.getElementById(`${statistic}5`).innerHTML === "N/A") {
            profileFive = 0;
        }
        else if (document.getElementById(`${statistic}5`).innerHTML.includes(':')) {
            profileFive = parseInt(document.getElementById(`${statistic}5`).innerHTML.replace(':', ''), 10);
        }
        else {
            profileFive = document.getElementById(`${statistic}5`).innerHTML;
        }


        let arrayMaxNumber = [profileOne, profileTwo, profileThree, profileFour, profileFive];

        let maxNumber = Math.max(...arrayMaxNumber);

        profileNumberArray.forEach(function(profile) {
            if (document.getElementById(`${statistic}${profile}`).innerHTML === String(maxNumber)) {
                var profileBackground = document.createElement('style');
                document.head.appendChild(profileBackground);
                profileBackground.sheet.insertRule(`#${statistic}${profile} { background:green; color:white;`)
            }
            else if (document.getElementById(`${statistic}${profile}`).innerHTML.includes(":")) {
                if (parseInt(document.getElementById(`${statistic}${profile}`).innerHTML.replace(':', ''), 10) === maxNumber) {
                    var profileBackground = document.createElement('style');
                    document.head.appendChild(profileBackground);
                    profileBackground.sheet.insertRule(`#${statistic}${profile} { background:green; color:white;`);
                }
                else {
                    var profileBackground = document.createElement('style');
                    document.head.appendChild(profileBackground);
                    profileBackground.sheet.insertRule(`#${statistic}${profile} { background:white; color:black;`);
                }
            }
            else {
                var profileBackground = document.createElement('style');
                document.head.appendChild(profileBackground);
                profileBackground.sheet.insertRule(`#${statistic}${profile} { background:white; color:black;`);
            }
        });
    });

    combatArray.forEach(function(statistic) {

        let profileOne = 0;
        let profileTwo = 0;
        let profileThree = 0;
        let profileFour = 0;
        let profileFive = 0;

        let profileNumberArray = [1, 2, 3, 4, 5];

        if (document.getElementById(`${statistic}1`).innerHTML === "N/A") {
            profileOne = 0;
        }
        else if (document.getElementById(`${statistic}1`).innerHTML.includes(':')) {
            profileOne = parseInt(document.getElementById(`${statistic}1`).innerHTML.replace(':', ''), 10);
        }
        else {
            profileOne = document.getElementById(`${statistic}1`).innerHTML;
        }

        if (document.getElementById(`${statistic}2`).innerHTML === "N/A") {
            profileTwo = 0;
        }
        else if (document.getElementById(`${statistic}2`).innerHTML.includes(':')) {
            profileTwo = parseInt(document.getElementById(`${statistic}2`).innerHTML.replace(':', ''), 10);
        }
        else {
            profileTwo = document.getElementById(`${statistic}2`).innerHTML;
        }

        if (document.getElementById(`${statistic}3`).innerHTML === "N/A") {
            profileThree = 0;
        }
        else if (document.getElementById(`${statistic}3`).innerHTML.includes(':')) {
            profileThree = parseInt(document.getElementById(`${statistic}3`).innerHTML.replace(':', ''), 10);
        }
        else {
            profileThree = document.getElementById(`${statistic}3`).innerHTML;
        }

        if (document.getElementById(`${statistic}4`).innerHTML === "N/A") {
            profileFour = 0;
        }
        else if (document.getElementById(`${statistic}4`).innerHTML.includes(':')) {
            profileFour = parseInt(document.getElementById(`${statistic}4`).innerHTML.replace(':', ''), 10);
        }
        else {
            profileFour = document.getElementById(`${statistic}4`).innerHTML;
        }

        if (document.getElementById(`${statistic}5`).innerHTML === "N/A") {
            profileFive = 0;
        }
        else if (document.getElementById(`${statistic}5`).innerHTML.includes(':')) {
            profileFive = parseInt(document.getElementById(`${statistic}5`).innerHTML.replace(':', ''), 10);
        }
        else {
            profileFive = document.getElementById(`${statistic}5`).innerHTML;
        }

        let arrayMaxNumber = [profileOne, profileTwo, profileThree, profileFour, profileFive];

        let maxNumber = Math.max(...arrayMaxNumber);

        profileNumberArray.forEach(function(profile) {
            if (document.getElementById(`${statistic}${profile}`).innerHTML === String(maxNumber)) {
                var profileBackground = document.createElement('style');
                document.head.appendChild(profileBackground);
                profileBackground.sheet.insertRule(`#${statistic}${profile} { background:green; color:white;`)
            }
            else if (document.getElementById(`${statistic}${profile}`).innerHTML.includes(":")) {
                if (parseInt(document.getElementById(`${statistic}${profile}`).innerHTML.replace(':', ''), 10) === maxNumber) {
                    var profileBackground = document.createElement('style');
                    document.head.appendChild(profileBackground);
                    profileBackground.sheet.insertRule(`#${statistic}${profile} { background:green; color:white;`);
                }
                else {
                    var profileBackground = document.createElement('style');
                    document.head.appendChild(profileBackground);
                    profileBackground.sheet.insertRule(`#${statistic}${profile} { background:white; color:black;`);
                }
            }
            else {
                var profileBackground = document.createElement('style');
                document.head.appendChild(profileBackground);
                profileBackground.sheet.insertRule(`#${statistic}${profile} { background:white; color:black;`);
            }
        });
    });

    assistsArray.forEach(function(statistic) {

        let profileOne = 0;
        let profileTwo = 0;
        let profileThree = 0;
        let profileFour = 0;
        let profileFive = 0;

        let profileNumberArray = [1, 2, 3, 4, 5];

        if (document.getElementById(`${statistic}1`).innerHTML === "N/A") {
            profileOne = 0;
        }
        else if (document.getElementById(`${statistic}1`).innerHTML.includes(':')) {
            profileOne = parseInt(document.getElementById(`${statistic}1`).innerHTML.replace(':', ''), 10);
        }
        else {
            profileOne = document.getElementById(`${statistic}1`).innerHTML;
        }

        if (document.getElementById(`${statistic}2`).innerHTML === "N/A") {
            profileTwo = 0;
        }
        else if (document.getElementById(`${statistic}2`).innerHTML.includes(':')) {
            profileTwo = parseInt(document.getElementById(`${statistic}2`).innerHTML.replace(':', ''), 10);
        }
        else {
            profileTwo = document.getElementById(`${statistic}2`).innerHTML;
        }

        if (document.getElementById(`${statistic}3`).innerHTML === "N/A") {
            profileThree = 0;
        }
        else if (document.getElementById(`${statistic}3`).innerHTML.includes(':')) {
            profileThree = parseInt(document.getElementById(`${statistic}3`).innerHTML.replace(':', ''), 10);
        }
        else {
            profileThree = document.getElementById(`${statistic}3`).innerHTML;
        }

        if (document.getElementById(`${statistic}4`).innerHTML === "N/A") {
            profileFour = 0;
        }
        else if (document.getElementById(`${statistic}4`).innerHTML.includes(':')) {
            profileFour = parseInt(document.getElementById(`${statistic}4`).innerHTML.replace(':', ''), 10);
        }
        else {
            profileFour = document.getElementById(`${statistic}4`).innerHTML;
        }

        if (document.getElementById(`${statistic}5`).innerHTML === "N/A") {
            profileFive = 0;
        }
        else if (document.getElementById(`${statistic}5`).innerHTML.includes(':')) {
            profileFive = parseInt(document.getElementById(`${statistic}5`).innerHTML.replace(':', ''), 10);
        }
        else {
            profileFive = document.getElementById(`${statistic}5`).innerHTML;
        }


        let arrayMaxNumber = [profileOne, profileTwo, profileThree, profileFour, profileFive];

        let maxNumber = Math.max(...arrayMaxNumber);

        profileNumberArray.forEach(function(profile) {
            if (document.getElementById(`${statistic}${profile}`).innerHTML === String(maxNumber)) {
                var profileBackground = document.createElement('style');
                document.head.appendChild(profileBackground);
                profileBackground.sheet.insertRule(`#${statistic}${profile} { background:green; color:white;`)
            }
            else if (document.getElementById(`${statistic}${profile}`).innerHTML.includes(":")) {
                if (parseInt(document.getElementById(`${statistic}${profile}`).innerHTML.replace(':', ''), 10) === maxNumber) {
                    var profileBackground = document.createElement('style');
                    document.head.appendChild(profileBackground);
                    profileBackground.sheet.insertRule(`#${statistic}${profile} { background:green; color:white;`);
                }
                else {
                    var profileBackground = document.createElement('style');
                    document.head.appendChild(profileBackground);
                    profileBackground.sheet.insertRule(`#${statistic}${profile} { background:white; color:black;`);
                }
            }
            else {
                var profileBackground = document.createElement('style');
                document.head.appendChild(profileBackground);
                profileBackground.sheet.insertRule(`#${statistic}${profile} { background:white; color:black;`);
            }
        });
    });

    averageArray.forEach(function(statistic) {

        let profileOne = 0;
        let profileTwo = 0;
        let profileThree = 0;
        let profileFour = 0;
        let profileFive = 0;

        let profileNumberArray = [1, 2, 3, 4, 5];

        if (document.getElementById(`${statistic}1`).innerHTML === "N/A") {
            profileOne = 0;
        }
        else if (document.getElementById(`${statistic}1`).innerHTML.includes(':')) {
            profileOne = parseInt(document.getElementById(`${statistic}1`).innerHTML.replace(':', ''), 10);
        }
        else {
            profileOne = document.getElementById(`${statistic}1`).innerHTML;
        }

        if (document.getElementById(`${statistic}2`).innerHTML === "N/A") {
            profileTwo = 0;
        }
        else if (document.getElementById(`${statistic}2`).innerHTML.includes(':')) {
            profileTwo = parseInt(document.getElementById(`${statistic}2`).innerHTML.replace(':', ''), 10);
        }
        else {
            profileTwo = document.getElementById(`${statistic}2`).innerHTML;
        }

        if (document.getElementById(`${statistic}3`).innerHTML === "N/A") {
            profileThree = 0;
        }
        else if (document.getElementById(`${statistic}3`).innerHTML.includes(':')) {
            profileThree = parseInt(document.getElementById(`${statistic}3`).innerHTML.replace(':', ''), 10);
        }
        else {
            profileThree = document.getElementById(`${statistic}3`).innerHTML;
        }

        if (document.getElementById(`${statistic}4`).innerHTML === "N/A") {
            profileFour = 0;
        }
        else if (document.getElementById(`${statistic}4`).innerHTML.includes(':')) {
            profileFour = parseInt(document.getElementById(`${statistic}4`).innerHTML.replace(':', ''), 10);
        }
        else {
            profileFour = document.getElementById(`${statistic}4`).innerHTML;
        }

        if (document.getElementById(`${statistic}5`).innerHTML === "N/A") {
            profileFive = 0;
        }
        else if (document.getElementById(`${statistic}5`).innerHTML.includes(':')) {
            profileFive = parseInt(document.getElementById(`${statistic}5`).innerHTML.replace(':', ''), 10);
        }
        else {
            profileFive = document.getElementById(`${statistic}5`).innerHTML;
        }


        let arrayMaxNumber = [profileOne, profileTwo, profileThree, profileFour, profileFive];

        let maxNumber = Math.max(...arrayMaxNumber);

        profileNumberArray.forEach(function(profile) {
            if (document.getElementById(`${statistic}${profile}`).innerHTML === String(maxNumber)) {
                var profileBackground = document.createElement('style');
                document.head.appendChild(profileBackground);
                profileBackground.sheet.insertRule(`#${statistic}${profile} { background:green; color:white;`)
            }
            else if (document.getElementById(`${statistic}${profile}`).innerHTML.includes(":")) {
                if (parseInt(document.getElementById(`${statistic}${profile}`).innerHTML.replace(':', ''), 10) === maxNumber) {
                    var profileBackground = document.createElement('style');
                    document.head.appendChild(profileBackground);
                    profileBackground.sheet.insertRule(`#${statistic}${profile} { background:green; color:white;`);
                }
                else {
                    var profileBackground = document.createElement('style');
                    document.head.appendChild(profileBackground);
                    profileBackground.sheet.insertRule(`#${statistic}${profile} { background:white; color:black;`);
                }
            }
            else {
                var profileBackground = document.createElement('style');
                document.head.appendChild(profileBackground);
                profileBackground.sheet.insertRule(`#${statistic}${profile} { background:white; color:black;`);
            }
        });
    });

    awardsArray.forEach(function(statistic) {

        let profileOne = 0;
        let profileTwo = 0;
        let profileThree = 0;
        let profileFour = 0;
        let profileFive = 0;

        let profileNumberArray = [1, 2, 3, 4, 5];

        if (document.getElementById(`${statistic}1`).innerHTML === "N/A") {
            profileOne = 0;
        }
        else if (document.getElementById(`${statistic}1`).innerHTML.includes(':')) {
            profileOne = parseInt(document.getElementById(`${statistic}1`).innerHTML.replace(':', ''), 10);
        }
        else {
            profileOne = document.getElementById(`${statistic}1`).innerHTML;
        }

        if (document.getElementById(`${statistic}2`).innerHTML === "N/A") {
            profileTwo = 0;
        }
        else if (document.getElementById(`${statistic}2`).innerHTML.includes(':')) {
            profileTwo = parseInt(document.getElementById(`${statistic}2`).innerHTML.replace(':', ''), 10);
        }
        else {
            profileTwo = document.getElementById(`${statistic}2`).innerHTML;
        }

        if (document.getElementById(`${statistic}3`).innerHTML === "N/A") {
            profileThree = 0;
        }
        else if (document.getElementById(`${statistic}3`).innerHTML.includes(':')) {
            profileThree = parseInt(document.getElementById(`${statistic}3`).innerHTML.replace(':', ''), 10);
        }
        else {
            profileThree = document.getElementById(`${statistic}3`).innerHTML;
        }

        if (document.getElementById(`${statistic}4`).innerHTML === "N/A") {
            profileFour = 0;
        }
        else if (document.getElementById(`${statistic}4`).innerHTML.includes(':')) {
            profileFour = parseInt(document.getElementById(`${statistic}4`).innerHTML.replace(':', ''), 10);
        }
        else {
            profileFour = document.getElementById(`${statistic}4`).innerHTML;
        }

        if (document.getElementById(`${statistic}5`).innerHTML === "N/A") {
            profileFive = 0;
        }
        else if (document.getElementById(`${statistic}5`).innerHTML.includes(':')) {
            profileFive = parseInt(document.getElementById(`${statistic}5`).innerHTML.replace(':', ''), 10);
        }
        else {
            profileFive = document.getElementById(`${statistic}5`).innerHTML;
        }


        let arrayMaxNumber = [profileOne, profileTwo, profileThree, profileFour, profileFive];

        let maxNumber = Math.max(...arrayMaxNumber);

        profileNumberArray.forEach(function(profile) {
            if (document.getElementById(`${statistic}${profile}`).innerHTML === String(maxNumber)) {
                var profileBackground = document.createElement('style');
                document.head.appendChild(profileBackground);
                profileBackground.sheet.insertRule(`#${statistic}${profile} { background:green; color:white;`)
            }
            else if (document.getElementById(`${statistic}${profile}`).innerHTML.includes(":")) {
                if (parseInt(document.getElementById(`${statistic}${profile}`).innerHTML.replace(':', ''), 10) === maxNumber) {
                    var profileBackground = document.createElement('style');
                    document.head.appendChild(profileBackground);
                    profileBackground.sheet.insertRule(`#${statistic}${profile} { background:green; color:white;`);
                }
                else {
                    var profileBackground = document.createElement('style');
                    document.head.appendChild(profileBackground);
                    profileBackground.sheet.insertRule(`#${statistic}${profile} { background:white; color:black;`);
                }
            }
            else {
                var profileBackground = document.createElement('style');
                document.head.appendChild(profileBackground);
                profileBackground.sheet.insertRule(`#${statistic}${profile} { background:white; color:black;`);
            }
        });
    });

    gameArray.forEach(function(statistic) {

        let profileOne = 0;
        let profileTwo = 0;
        let profileThree = 0;
        let profileFour = 0;
        let profileFive = 0;

        let profileNumberArray = [1, 2, 3, 4, 5];

        if (document.getElementById(`${statistic}1`).innerHTML === "N/A") {
            profileOne = 0;
        }
        else if (document.getElementById(`${statistic}1`).innerHTML.includes(':')) {
            profileOne = parseInt(document.getElementById(`${statistic}1`).innerHTML.replace(':', ''), 10);
        }
        else {
            profileOne = document.getElementById(`${statistic}1`).innerHTML;
        }

        if (document.getElementById(`${statistic}2`).innerHTML === "N/A") {
            profileTwo = 0;
        }
        else if (document.getElementById(`${statistic}2`).innerHTML.includes(':')) {
            profileTwo = parseInt(document.getElementById(`${statistic}2`).innerHTML.replace(':', ''), 10);
        }
        else {
            profileTwo = document.getElementById(`${statistic}2`).innerHTML;
        }

        if (document.getElementById(`${statistic}3`).innerHTML === "N/A") {
            profileThree = 0;
        }
        else if (document.getElementById(`${statistic}3`).innerHTML.includes(':')) {
            profileThree = parseInt(document.getElementById(`${statistic}3`).innerHTML.replace(':', ''), 10);
        }
        else {
            profileThree = document.getElementById(`${statistic}3`).innerHTML;
        }

        if (document.getElementById(`${statistic}4`).innerHTML === "N/A") {
            profileFour = 0;
        }
        else if (document.getElementById(`${statistic}4`).innerHTML.includes(':')) {
            profileFour = parseInt(document.getElementById(`${statistic}4`).innerHTML.replace(':', ''), 10);
        }
        else {
            profileFour = document.getElementById(`${statistic}4`).innerHTML;
        }

        if (document.getElementById(`${statistic}5`).innerHTML === "N/A") {
            profileFive = 0;
        }
        else if (document.getElementById(`${statistic}5`).innerHTML.includes(':')) {
            profileFive = parseInt(document.getElementById(`${statistic}5`).innerHTML.replace(':', ''), 10);
        }
        else {
            profileFive = document.getElementById(`${statistic}5`).innerHTML;
        }


        let arrayMaxNumber = [profileOne, profileTwo, profileThree, profileFour, profileFive];

        let maxNumber = Math.max(...arrayMaxNumber);

        profileNumberArray.forEach(function(profile) {
            if (document.getElementById(`${statistic}${profile}`).innerHTML === String(maxNumber)) {
                var profileBackground = document.createElement('style');
                document.head.appendChild(profileBackground);
                profileBackground.sheet.insertRule(`#${statistic}${profile} { background:green; color:white;`)
            }
            else if (document.getElementById(`${statistic}${profile}`).innerHTML.includes(":")) {
                if (parseInt(document.getElementById(`${statistic}${profile}`).innerHTML.replace(':', ''), 10) === maxNumber) {
                    var profileBackground = document.createElement('style');
                    document.head.appendChild(profileBackground);
                    profileBackground.sheet.insertRule(`#${statistic}${profile} { background:green; color:white;`);
                }
                else {
                    var profileBackground = document.createElement('style');
                    document.head.appendChild(profileBackground);
                    profileBackground.sheet.insertRule(`#${statistic}${profile} { background:white; color:black;`);
                }
            }
            else {
                var profileBackground = document.createElement('style');
                document.head.appendChild(profileBackground);
                profileBackground.sheet.insertRule(`#${statistic}${profile} { background:white; color:black;`);
            }
        });
    });

    miscellaneousArray.forEach(function(statistic) {

        let profileOne = 0;
        let profileTwo = 0;
        let profileThree = 0;
        let profileFour = 0;
        let profileFive = 0;

        let profileNumberArray = [1, 2, 3, 4, 5];

        if (document.getElementById(`${statistic}1`).innerHTML === "N/A") {
            profileOne = 0;
        }
        else if (document.getElementById(`${statistic}1`).innerHTML.includes(':')) {
            profileOne = parseInt(document.getElementById(`${statistic}1`).innerHTML.replace(':', ''), 10);
        }
        else {
            profileOne = document.getElementById(`${statistic}1`).innerHTML;
        }

        if (document.getElementById(`${statistic}2`).innerHTML === "N/A") {
            profileTwo = 0;
        }
        else if (document.getElementById(`${statistic}2`).innerHTML.includes(':')) {
            profileTwo = parseInt(document.getElementById(`${statistic}2`).innerHTML.replace(':', ''), 10);
        }
        else {
            profileTwo = document.getElementById(`${statistic}2`).innerHTML;
        }

        if (document.getElementById(`${statistic}3`).innerHTML === "N/A") {
            profileThree = 0;
        }
        else if (document.getElementById(`${statistic}3`).innerHTML.includes(':')) {
            profileThree = parseInt(document.getElementById(`${statistic}3`).innerHTML.replace(':', ''), 10);
        }
        else {
            profileThree = document.getElementById(`${statistic}3`).innerHTML;
        }

        if (document.getElementById(`${statistic}4`).innerHTML === "N/A") {
            profileFour = 0;
        }
        else if (document.getElementById(`${statistic}4`).innerHTML.includes(':')) {
            profileFour = parseInt(document.getElementById(`${statistic}4`).innerHTML.replace(':', ''), 10);
        }
        else {
            profileFour = document.getElementById(`${statistic}4`).innerHTML;
        }

        if (document.getElementById(`${statistic}5`).innerHTML === "N/A") {
            profileFive = 0;
        }
        else if (document.getElementById(`${statistic}5`).innerHTML.includes(':')) {
            profileFive = parseInt(document.getElementById(`${statistic}5`).innerHTML.replace(':', ''), 10);
        }
        else {
            profileFive = document.getElementById(`${statistic}5`).innerHTML;
        }


        let arrayMaxNumber = [profileOne, profileTwo, profileThree, profileFour, profileFive];

        let maxNumber = Math.max(...arrayMaxNumber);

        profileNumberArray.forEach(function(profile) {
            if (document.getElementById(`${statistic}${profile}`).innerHTML === String(maxNumber)) {
                var profileBackground = document.createElement('style');
                document.head.appendChild(profileBackground);
                profileBackground.sheet.insertRule(`#${statistic}${profile} { background:green; color:white;`)
            }
            else if (document.getElementById(`${statistic}${profile}`).innerHTML.includes(":")) {
                if (parseInt(document.getElementById(`${statistic}${profile}`).innerHTML.replace(':', ''), 10) === maxNumber) {
                    var profileBackground = document.createElement('style');
                    document.head.appendChild(profileBackground);
                    profileBackground.sheet.insertRule(`#${statistic}${profile} { background:green; color:white;`);
                }
                else {
                    var profileBackground = document.createElement('style');
                    document.head.appendChild(profileBackground);
                    profileBackground.sheet.insertRule(`#${statistic}${profile} { background:white; color:black;`);
                }
            }
            else {
                var profileBackground = document.createElement('style');
                document.head.appendChild(profileBackground);
                profileBackground.sheet.insertRule(`#${statistic}${profile} { background:white; color:black;`);
            }
        });
    });
}
