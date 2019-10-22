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

let dataDownload = {};


function getData(platformInput, regionInput, usernameInput, cb) {
    var xhr = new XMLHttpRequest();

    var platform = document.getElementById(platformInput).value;
    var region = document.getElementById(regionInput).value;
    var username = document.getElementById(usernameInput).value;

    if (platform == "pc") {
        var profileUrl = baseURL + platform + "/" + region + "/" + username + "/complete";
    }
    else {
        var profileUrl = baseURL + platform + "/" + username + "/complete";
    }

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        } else if (this.readyState == 4 && this.status == 400) {
            document.getElementById("errorMessage").innerHTML = "Bad Request - Please follow correct format for PC (Username-12345)";
            hideLoadingScreen();
        } else if (this.readyState == 4 && this.status == 402) {
            document.getElementById("errorMessage").innerHTML = "Profile not found - Please check your search criteria";
            hideLoadingScreen();
        } else if (this.readyState == 4 && this.status == 500) {
            document.getElementById("errorMessage").innerHTML = "Internal Server Error – We had a problem with our server. Try again later.";
            hideLoadingScreen();
        } else if (this.readyState == 4 && this.status == 503) {
            document.getElementById("errorMessage").innerHTML = "Service Unavailable – We’re temporarily offline for maintenance. Please try again later.";
            hideLoadingScreen();
        }
    };

    xhr.open("GET", profileUrl);
    xhr.send();
}

function writeToDocument(platformInput, regionInput, usernameInput) {
    showLoadingScreen();

    getData(platformInput, regionInput, usernameInput, function(data) {
        dataDownload = data;

        console.dir(dataDownload);
        if (dataDownload['private'] === true) {
            document.getElementById("errorMessage").innerHTML = "Profile is Private - Please set to public in Overwatch > Social settings";
        }
        else {
            changeDocumentData();
        }
        hideLoadingScreen();
    });

}

function showLoadingScreen() {
    document.getElementById("errorMessage").innerHTML = "";
    document.getElementById("loaderBackground").classList.add("loader-background");
    document.getElementById("loader").classList.add("loader");
}

function hideLoadingScreen() {
    document.getElementById("loaderBackground").classList.remove('loader-background');
    document.getElementById("loader").classList.remove('loader');
}

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

function indexSearch() {
    //Get variables passed from index.html in the url, add to search box data

    var searchFormPlatform = GetURLParameter('searchFormPlatform');
    var searchFormRegion = GetURLParameter('searchFormRegion');
    var searchFormUsername = GetURLParameter('searchFormUsername');

    if (searchFormPlatform !== undefined && searchFormRegion !== undefined && searchFormUsername !== undefined) {
        document.getElementById('searchFormPlatform').value = searchFormPlatform;
        document.getElementById('searchFormRegion').value = searchFormRegion;
        document.getElementById('searchFormUsername').value = searchFormUsername;

        document.getElementById('searchFormPlatformMobile').value = searchFormPlatform;
        document.getElementById('searchFormRegionMobile').value = searchFormRegion;
        document.getElementById('searchFormUsernameMobile').value = searchFormUsername;

        writeToDocument('searchFormPlatform', 'searchFormRegion', 'searchFormUsername');
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
        document.getElementById("profileRegion").innerHTML = " - " + document.getElementById("searchFormRegion").value;


        //Images
        document.getElementById("profilePictureImage").src = dataDownload['icon'];
        /*document.getElementById("profileLevelImage").src = dataDownload['levelIcon'];
        document.getElementById("profileEndoresmentImage").src = dataDownload['endorsementIcon'];
        document.getElementById("profilePrestigeImage").src = dataDownload['prestigeIcon'];*/

        //Table Data
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

function changeRegionHidden() {
    if (document.getElementById("searchFormPlatform").value == "pc") {
        var regionDropdown = document.getElementById("searchFormRegion");
        regionDropdown.removeAttribute("hidden");
    }
    else if (document.getElementById("searchFormPlatform").value == "xbl") {
        var regionDropdown = document.getElementById("searchFormRegion");
        regionDropdown.setAttribute("hidden", true);
    }
    else if (document.getElementById("searchFormPlatform").value == "psn") {
        var regionDropdown = document.getElementById("searchFormRegion");
        regionDropdown.setAttribute("hidden", true);
    }
}

function changeRegionHiddenMobile() {
    if (document.getElementById("searchFormPlatformMobile").value == "pc") {
        var regionDropdownMobile = document.getElementById("searchFormRegionMobile");
        regionDropdownMobile.removeAttribute("hidden");
    }
    else if (document.getElementById("searchFormPlatformMobile").value == "xbl") {
        var regionDropdownMobile = document.getElementById("searchFormRegionMobile");
        regionDropdownMobile.setAttribute("hidden", true);
    }
    else if (document.getElementById("searchFormPlatformMobile").value == "psn") {
        var regionDropdownMobile = document.getElementById("searchFormRegionMobile");
        regionDropdownMobile.setAttribute("hidden", true);
    }
}
