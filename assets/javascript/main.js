const baseURL = "https://ow-api.com/v1/stats/";

const bestArray = ['allDamageDoneMostInGame', 'barrierDamageDoneMostInGame', 'defensiveAssistsMostInGame', 'eliminationsMostInGame', 'finalBlowsMostInGame', 'healingDoneMostInGame',
                    'heroDamageDoneMostInGame', 'killsStreakBest', 'meleeFinalBlowsMostInGame', 'multikillsBest', 'objectiveKillsMostInGame', 'objectiveTimeMostInGame',
                    'offensiveAssistsMostInGame', 'soloKillsMostInGame', 'timeSpentOnFireMostInGame', 'turretsDestroyedMostInGame'];
const combatArray = ['barrierDamageDone', 'damageDone', 'deaths', 'eliminations', 'finalBlows', 'heroDamageDone', 'meleeFinalBlows', 'multikills', 'objectiveKills',
                            'objectiveTime', 'soloKills', 'timeSpentOnFire'];
const assistsArray = ['defensiveAssists', 'healingDone', 'offensiveAssists'];
const averageArray = ['allDamageDoneAvgPer10Min', 'barrierDamageDoneAvgPer10Min', 'deathsAvgPer10Min', 'eliminationsAvgPer10Min', 'finalBlowsAvgPer10Min', 'healingDoneAvgPer10Min',
                            'heroDamageDoneAvgPer10Min', 'objectiveKillsAvgPer10Min', 'objectiveTimeAvgPer10Min', 'soloKillsAvgPer10Min', 'timeSpentOnFireAvgPer10Min'];
const awardsArray = ['cards', 'medals', 'medalsBronze', 'medalsGold', 'medalsSilver'];
const gameArray = ['gamesWon', 'timePlayed'];
const miscellaneousArray = ['teleporterPadsDestroyed', 'turretsDestroyed'];


function getData(cb) {
    var xhr = new XMLHttpRequest();
    
    var platform = document.getElementById("searchFormPlatform").value;
    var region = document.getElementById("searchFormRegion").value;
    var username = document.getElementById("searchFormUsername").value;
    
    if (platform == "pc") {
        var profileUrl = baseURL + platform + "/" + region + "/" + username + "/complete";
    } else {
        var profileUrl = baseURL + platform + "/"  + username + "/complete";
    }
    
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };

    xhr.open("GET", profileUrl);
    xhr.send();
}

function writeToDocument() {
    getData(function(data) {
        
        var gameType = document.getElementById("gameTypeSelect").value;
        var heroName = document.getElementById("heroNameSelect").value;
        
        console.dir(data);
        
        //Profile Text
        document.getElementById("profileUsername").innerHTML = data['name'];
        document.getElementById("profileLevel").innerHTML = data['level'];
        document.getElementById("profileEndoresmentLevel").innerHTML = data['endorsement'];
        document.getElementById("profilePlatform").innerHTML = document.getElementById("searchFormPlatform").value;
        document.getElementById("profileRegion").innerHTML = " - " + document.getElementById("searchFormRegion").value;
        
        
        //Images
        document.getElementById("profilePictureImage").src = data['icon'];
        document.getElementById("profileLevelImage").src = data['levelIcon'];
        document.getElementById("profileEndoresmentImage").src = data['endorsementIcon'];
        document.getElementById("profilePrestigeImage").src = data['prestigeIcon'];
        
        //Table Data
        bestArray.forEach(function(statistic) {
            document.getElementById(statistic).innerHTML = data[gameType]['careerStats'][heroName]['best'][statistic];
        });
        
        combatArray.forEach(function(statistic2) {
            document.getElementById(statistic2).innerHTML = data[gameType]['careerStats'][heroName]['combat'][statistic2];
        });
        
        assistsArray.forEach(function(statistic) {
            document.getElementById(statistic).innerHTML = data[gameType]['careerStats'][heroName]['assists'][statistic];
        });
        
        averageArray.forEach(function(statistic) {
            document.getElementById(statistic).innerHTML = data[gameType]['careerStats'][heroName]['average'][statistic];
        });
        
        awardsArray.forEach(function(statistic) {
            document.getElementById(statistic).innerHTML = data[gameType]['careerStats'][heroName]['matchAwards'][statistic];
        });
        
        gameArray.forEach(function(statistic) {
            document.getElementById(statistic).innerHTML = data[gameType]['careerStats'][heroName]['game'][statistic];
        });
        
        miscellaneousArray.forEach(function(statistic) {
            document.getElementById(statistic).innerHTML = data[gameType]['careerStats'][heroName]['miscellaneous'][statistic];
        });
    });
}

function changeUsernamePlaceholder() {
    if (document.getElementById("searchFormPlatform").value == "pc") {
        document.getElementById("searchFormUsername").placeholder = "Blizzard ID (Username-12345)";
    } else if (document.getElementById("searchFormPlatform").value == "xbl") {
        document.getElementById("searchFormUsername").placeholder = "Gamertag";
    } else if (document.getElementById("searchFormPlatform").value == "psn") {
        document.getElementById("searchFormUsername").placeholder = "PSN ID";
    }
}

function changeUsernamePlaceholderMobile() {
    if (document.getElementById("searchFormPlatformMobile").value == "pc") {
        document.getElementById("searchFormUsernameMobile").placeholder = "Blizzard ID (Username-12345)";
    } else if (document.getElementById("searchFormPlatformMobile").value == "xbl") {
        document.getElementById("searchFormUsernameMobile").placeholder = "Gamertag";
    } else if (document.getElementById("searchFormPlatformMobile").value == "psn") {
        document.getElementById("searchFormUsernameMobile").placeholder = "PSN ID";
    }
}

function changeRegionHidden() {
    if (document.getElementById("searchFormPlatform").value == "pc") {
        var regionDropdown = document.getElementById("searchFormRegion");
        regionDropdown.removeAttribute("hidden");
    } else if (document.getElementById("searchFormPlatform").value == "xbl") {
        var regionDropdown = document.getElementById("searchFormRegion");
        regionDropdown.setAttribute("hidden", true);
    } else if (document.getElementById("searchFormPlatform").value == "psn") {
        var regionDropdown = document.getElementById("searchFormRegion");
        regionDropdown.setAttribute("hidden", true);
    }
}

function changeRegionHiddenMobile() {
    if (document.getElementById("searchFormPlatformMobile").value == "pc") {
        var regionDropdownMobile = document.getElementById("searchFormRegionMobile");
        regionDropdownMobile.removeAttribute("hidden");
    } else if (document.getElementById("searchFormPlatformMobile").value == "xbl") {
        var regionDropdownMobile = document.getElementById("searchFormRegionMobile");
        regionDropdownMobile.setAttribute("hidden", true);
    } else if (document.getElementById("searchFormPlatformMobile").value == "psn") {
        var regionDropdownMobile = document.getElementById("searchFormRegionMobile");
        regionDropdownMobile.setAttribute("hidden", true);
    }
}