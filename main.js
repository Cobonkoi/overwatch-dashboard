/*function getData(cb) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://ow-api.com/v1/stats/pc/eu/MLGesus-21679/profile");
    xhr.send();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };
}

function printDataToConsole(data) {
    console.log(data);
}

getData(printDataToConsole);


const baseURL = "https://ow-api.com/v1/stats/pc/eu/MLGesus-21679/profile";

function getData(type, cb) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };

    xhr.open("GET", baseURL);
    xhr.send();
}

function writeToDocument(type) {
    getData(type, function(data) {
        console.dir(data);
        document.getElementById("stat-games").innerHTML = `Played ${data.competitiveStats.games.played} / Won ${data.competitiveStats.games.played}`;
    });
} */

/*Usernames for tests
Zael-2375
Sharpy-2695
MLGesus-21679
*/

const baseURL = "https://ow-api.com/v1/stats/";

function getData(type, cb) {
    var xhr = new XMLHttpRequest();
    
    var platform = document.getElementById("form-platform").value;
    var region = document.getElementById("form-region").value;
    var username = document.getElementById("form-username").value;
    
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };

    xhr.open("GET", baseURL + platform + "/" + region + "/" + username + "/profile");
    xhr.send();
}

function writeToDocument(type) {
    getData(type, function(data) {
        console.dir(data);
        document.getElementById("stat-games").innerHTML = `Played ${data.competitiveStats.games.played} / Won ${data.competitiveStats.games.played}`;
    });
}