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

const profileImageArray = ['havana-screenshot-001.jpg', 'havana-screenshot-002.jpg', 'blizzardworld-screenshot-001.jpg', 'blizzardworld-screenshot-002.jpg', 'busan-screenshot-001.jpg',
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
                var profileBackgroundImage = profileImageArray[Math.floor(Math.random() * profileImageArray.length)]
                var profileBackground = document.createElement('style');
                document.head.appendChild(profileBackground);
                profileBackground.sheet.insertRule(`#profileBackground { background: url("./assets/images/${profileBackgroundImage}") no-repeat center center;`)
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
    //Check that they have entered a username and platform before going any further
    if (document.getElementById(platformInput).value !== '' && document.getElementById(usernameInput).value !== '') {

        getData(platformInput, usernameInput, function(data) {


            //Checks if profile is private and gives error if so. Otherwise inserts random profile background & populates dashboard.
            if (dataDownload['private'] === true) {
                document.getElementById("errorMessage").innerHTML = "Profile is Private - Please set to public in Overwatch > Social settings";
            }
            else {
                if (Object.entries(comparisonProfile1).length === 0) {
                    comparisonProfile1 = data;
                    console.dir(comparisonProfile1);
                }
                else if (Object.entries(comparisonProfile2).length === 0) {
                    comparisonProfile2 = data;
                    console.dir(comparisonProfile2);
                }
                else if (Object.entries(comparisonProfile3).length === 0) {
                    comparisonProfile3 = data;
                    console.dir(comparisonProfile3);
                }
                else if (Object.entries(comparisonProfile4).length === 0) {
                    comparisonProfile4 = data;
                    console.dir(comparisonProfile4);
                }
                else if (Object.entries(comparisonProfile5).length === 0) {
                    comparisonProfile5 = data;
                    console.dir(comparisonProfile5);
                } else {
                    document.getElementById("errorMessage").innerHTML = "Comparison Slots Full - Please remove a profile first";
                }
            }
        });
    }
    else {
        document.getElementById("errorMessage").innerHTML = "Error - Please enter a username";
        hideLoadingScreen();
    }

}



function addProfile(platformInput, usernameInput) {
    showLoadingScreen();
    
    /* 
    look up profile data as normal
    save to temp variable
    look for next empty array slot
    put data into that slot
    */
    writeToComparison(platformInput, usernameInput);
    
    
    
    /*
    populate fields for that slot on page
    show those fields on page
    comparestats()
    */
    hideLoadingScreen();
}

/*
function removeProfile() {
    showLoadingScreen();
    check which profile is to be removed
    remove data from array slot
    remove data from page
    hide those fields on page
    comparestats()
    hideLoadingScreen();
} 

function comparestats() {
    forEach row {
        look at stats in each column
        find highest
        turn background green
    }
}
*/
