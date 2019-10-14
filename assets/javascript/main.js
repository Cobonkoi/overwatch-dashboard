const baseURL = "https://ow-api.com/v1/stats/";


function getData(type, cb) {
    var xhr = new XMLHttpRequest();
    
    var platform = document.getElementById("search-form-platform").value;
    var region = document.getElementById("search-form-region").value;
    var username = document.getElementById("search-form-username").value;
    
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

function writeToDocument(type) {
    getData(type, function(data) {
        console.dir(data);
        document.getElementById("stat-games").innerHTML = `Played ${data.competitiveStats.games.played} / Won ${data.competitiveStats.games.won}`;
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