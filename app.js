///////////////////////////Active Menu Highlight/////////////////////
$(window).on("load", () => {
    $('.navbar-nav>li:nth-child(1)').addClass('activeLink');
    var topOffsetTop = $('.slider').offset().top;
    var teamOffsetTop = $('.team').offset().top;
    var scheduleOffsetTop = $('.schedule').offset().top;
    var standingOffsetTop = $('.standings').offset().top;
    var contactOffsetTop = $('.contact').offset().top;
    $(document).on('scroll', function() {
        var scrollTop = (window.pageYOffset) + 120;
        var activeLi;
        if (scrollTop < teamOffsetTop) {
            activeLi = $('.navbar-nav>li:nth-child(1)');
        } else if (scrollTop > teamOffsetTop && scrollTop < scheduleOffsetTop) {
            activeLi = $('.navbar-nav>li:nth-child(2)');
        } else if (scrollTop > scheduleOffsetTop && scrollTop < standingOffsetTop) {
            activeLi = $('.navbar-nav>li:nth-child(3)');
        } else if (scrollTop > standingOffsetTop && scrollTop < contactOffsetTop - 350) {
            activeLi = $('.navbar-nav>li:nth-child(4)');
        } else if (scrollTop > contactOffsetTop - 350) {
            activeLi = $('.navbar-nav>li:nth-child(5)');
        }
        activeLi.addClass(' activeLink')
        $('.navbar-nav>li').not(activeLi).removeClass(' activeLink');
    });

});
//////////////////////SLIDES////////////////////////////////////

let slides = document.querySelectorAll('#slides .slide');
let currentSlide = 0;
let slideInterval = setInterval(nextSlide, 3000);

function nextSlide() {
    slides[currentSlide].className = 'slide';
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].className = 'slide showing';
}
////////////////////////DROPDOWN///////////////////////
function dropdown() {
    if (window.innerWidth <= 767) {
        document.getElementById("dropdown-content").classList.toggle("show");
    }
}
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        let dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

////////////////////////// GET&PRINT SCHEDULE FROM API START /////////////////////////
const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const url = "https://api.sportradar.us/nhl/trial/v5/en/games/2018/REG/schedule.json?api_key=4s6f2qtmhztsfngr6kn4624w";
document.getElementById("schedule-col").innerHTML = "<img src=\"images\\Loading_icon.gif\" class=\"schedule-load\">";
const getGamesFromApi = () => {
    return fetch(proxyUrl + url)
        .then(res => {
            return res.json();
        })
        .then(game => {
            let games = game.games
            let gamesToPrint = []
            for (game in games) {
                if ((games[game].home.alias == "SJ" || games[game].away.alias == "SJ")) {
                    gamesToPrint.push(games[game])
                }
            }
            return (gamesToPrint)
        })
}

const games = getGamesFromApi()

let indexX = 0
let indexY = 0
let showNextBtn = document.getElementById("showNext");
showNextBtn.onclick = () => {
    if (indexY < 82) {
        //add if > games.length 
        indexX = indexY
        indexY = indexX + 7
    }
    printGames(indexX, indexY)
}

let showPrevBtn = document.getElementById("showPrev");
showPrevBtn.onclick = () => {
    //add if < 0
    if (indexX > 0) {
        indexY = indexX
        indexX = indexY - 7
    }
    printGames(indexX, indexY)
}
printGames = (indexX, indexY) => {
    let table = "<table>";
    games.then((data) => {
        let games = data.slice(indexX, indexY)
        for (game in games) {
            let time = new Date(games[game].scheduled).getMinutes().toString();
            (time.length == 1) ? time += '0': time;
            table += "<tr><td><b>" + new Date(games[game].scheduled).toString().substr(0, 10).replace(/\b0/g, '') + "</b></td><td><b>" + games[game].home.name + "</b></td><td><b>" +
                games[game].away.name + "</b></td><td><b>" + new Date(games[game].scheduled).getHours() + ":" + time + "</b></td><td><b>" +
                games[game].venue.city + "," + games[game].venue.name + "</b></td></tr>";
        }
        document.getElementById("schedule-col").innerHTML = table;
    })
}

showNextBtn.click() // to display first 10 elems
////////////////////////// GET&PRINT SCHEDULE FROM API END /////////////////////////


////////////////////////// GET&PRINT STANDINGS FROM API START /////////////////////////
const getStandingsFromApi = () => {
    return fetch('https://statsapi.web.nhl.com/api/v1/standings')
        .then(result => { return result.json(); })
        .then(function(result) {
            let records = result.records;
            let standing = []
            for (record in records)
                standing.push(records[record])
            return standing;
        })
}
const standings = getStandingsFromApi();
let showMetropolitan = document.getElementById("metropolitan");
showMetropolitan.onclick = () => {
    printStandings(0);
}

let showAtlantic = document.getElementById("atlantic");
showAtlantic.onclick = () => {
    printStandings(1);
}

let showCentral = document.getElementById("central");
showCentral.onclick = () => {
    printStandings(2);
}

let showPacific = document.getElementById("pacific");
showPacific.onclick = () => {
    printStandings(3);
}
var btnsDiv = document.getElementById("standings-btn");
var btns = btnsDiv.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active-division");
        current[0].className = current[0].className.replace(" active-division", "");
        this.className += " active-division";
    });
}

printStandings = (indexA) => {
    let table = "<table>";
    standings.then((data) => {
        let records = data[indexA]
        table += "<tr><th>" + records.division.name + "</th><th>Games Played</th><th>Wins</th><th>Losses</th><th>OT</th><th>Points</th>" +
            "<th>Goals For</th><th>Goals Against</th><th>Conference Rank</th><th>League Rank</th><th>Division Rank</th></tr>";
        let teamRecords = records.teamRecords;
        for (teamRecord in teamRecords) {
            table += "<tr><td><h4>" + teamRecords[teamRecord].team.name + "</h4></td>";
            table += "<td><b>" + teamRecords[teamRecord].gamesPlayed + "</b></td><td><b>" + teamRecords[teamRecord].leagueRecord.wins + "</b></td><td><b>" +
                teamRecords[teamRecord].leagueRecord.losses + "</b></td><td><b>" + teamRecords[teamRecord].leagueRecord.ot + "</b></td><td><b>" +
                teamRecords[teamRecord].points + "</b></td><td><b>" + teamRecords[teamRecord].goalsScored + "</b></td><td><b>" +
                teamRecords[teamRecord].goalsAgainst + "</b></td><td><b>" +
                teamRecords[teamRecord].conferenceRank + "</b></td><td><b>" + teamRecords[teamRecord].leagueRank + "</b></td><td><b>" +
                teamRecords[teamRecord].divisionRank + "</b></td></tr>";
        }
        table += "<tr></tr>";
        table += "</table>";
        document.getElementById("standings-col").innerHTML = table;
    })
}
showMetropolitan.click()

////////////////////////// GET&PRINT STANGINGS FROM API END /////////////////////////