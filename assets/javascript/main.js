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
    if (document.getElementById("search-form-platform").value == "pc") {
        document.getElementById("search-form-username").placeholder = "Blizzard ID (Username-12345)";
    } else if (document.getElementById("search-form-platform").value == "xbl") {
        document.getElementById("search-form-username").placeholder = "Gamertag";
    } else if (document.getElementById("search-form-platform").value == "psn") {
        document.getElementById("search-form-username").placeholder = "PSN ID";
    }
}

function changeUsernamePlaceholderMobile() {
    if (document.getElementById("search-form-platform-mobile").value == "pc") {
        document.getElementById("search-form-username-mobile").placeholder = "Blizzard ID (Username-12345)";
    } else if (document.getElementById("search-form-platform-mobile").value == "xbl") {
        document.getElementById("search-form-username-mobile").placeholder = "Gamertag";
    } else if (document.getElementById("search-form-platform-mobile").value == "psn") {
        document.getElementById("search-form-username-mobile").placeholder = "PSN ID";
    }
}

function changeRegionHidden() {
    if (document.getElementById("search-form-platform").value == "pc") {
        var regionDropdown = document.getElementById("search-form-region");
        regionDropdown.removeAttribute("hidden");
    } else if (document.getElementById("search-form-platform").value == "xbl") {
        var regionDropdown = document.getElementById("search-form-region");
        regionDropdown.setAttribute("hidden", true);
    } else if (document.getElementById("search-form-platform").value == "psn") {
        var regionDropdown = document.getElementById("search-form-region");
        regionDropdown.setAttribute("hidden", true);
    }
}

function changeRegionHiddenMobile() {
    if (document.getElementById("search-form-platform-mobile").value == "pc") {
        var regionDropdownMobile = document.getElementById("search-form-region-mobile");
        regionDropdownMobile.removeAttribute("hidden");
    } else if (document.getElementById("search-form-platform-mobile").value == "xbl") {
        var regionDropdownMobile = document.getElementById("search-form-region-mobile");
        regionDropdownMobile.setAttribute("hidden", true);
    } else if (document.getElementById("search-form-platform-mobile").value == "psn") {
        var regionDropdownMobile = document.getElementById("search-form-region-mobile");
        regionDropdownMobile.setAttribute("hidden", true);
    }
}