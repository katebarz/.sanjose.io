var slides = document.querySelectorAll('#slides .slide');
var currentSlide = 0;
var slideInterval = setInterval(nextSlide, 3000);

function nextSlide() {
    slides[currentSlide].className = 'slide';
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].className = 'slide showing';
}

function dropdown() {
    if (window.innerWidth <= 767) {
        document.getElementById("dropdown-content").classList.toggle("show");
    }
}
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

fetch('https://statsapi.web.nhl.com/api/v1/standings')
    .then(function(response) {
        // (response.headers.get('Content-Type')); // application/json; charset=utf-8
        //alert(response.status); // 200
        return response.json();
    })
    .then(function(result) {
        let records = result.records;
        let table = "<table>";
        for (record in records) {
            table += "<tr><th>" + records[record].division.name + "</th><th>Games Played</th><th>Wins</th><th>Losses</th><th>OT</th><th>Points</th>" +
                "<th>Goals For</th><th>Goals Against</th><th>Conference Rank</th><th>League Rank</th><th>Division Rank</th></tr>";
            let teamRecords = result.records[record].teamRecords;
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
        }
        table += "</table>";
        document.getElementById("standings-col").innerHTML = table;
    })

////////////////////////// GET&PRINT SCHEDULE FROM API START /////////////////////////

const getGamesFromApi = () => {

    return fetch('https://api.sportradar.us/nhl/trial/v5/en/games/2018/REG/schedule.json?api_key=jjxpjasm445fcjwt6cdhtgdw')
        .then(res => { return res.json(); })
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
    //add if > games.length 
    indexX = indexY
    indexY = indexX + 7
    printGames(indexX, indexY)
}

let showPrevBtn = document.getElementById("showPrev");
showPrevBtn.onclick = () => {
    //add if < 0
    indexY = indexX
    indexX = indexY - 7
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

//// old version

/*const games=fetch('https://api.sportradar.us/nhl/trial/v5/en/games/2018/REG/schedule.json?api_key=jjxpjasm445fcjwt6cdhtgdw')
    .then(function(response) {
        //alert(response.headers.get('Content-Type')); // application/json; charset=utf-8
        //alert(response.status); // 200

        return response.json();
    })
    
      .then(function(game) {
            document.getElementById("schedule-col").innerHTML=game.games[0].id;
            let table = "<table>";       
            let games = game.games;
            for(game in games){
                if((games[game].home.alias=="SJ"||games[game].away.alias=="SJ")){
                    let time=new Date(games[game].scheduled).getMinutes().toString();
                    (time.length==1)?time+='0':time;
                table+="<tr><td><b>"+new Date(games[game].scheduled).toString().substr(0,10).replace(/\b0/g, '')+"</b></td><td><b>"+games[game].home.name+"</b></td><td><b>"+
                games[game].away.name+"</b></td><td><b>"+new Date(games[game].scheduled).getHours()+":"+time+"</b></td><td><b>"+
                games[game].venue.city + ","+ games[game].venue.name+"</b></td></tr>";}
            }

            document.getElementById("schedule-col").innerHTML = table;
      })

        .then(function(game) {
        let games = game.games;
        let gamesToPrint = [];
        for (game in games) {
            if ((games[game].home.alias == "SJ" || games[game].away.alias == "SJ")) {
                gamesToPrint.push(games[game]);
            }
        }
        console.log(gamesToPrint);
        return(gamesToPrint);
    })

*/
/*function printGames(games) {
    let table = "<table>";
    var x=0,y=10;
    console.log(games);
    for (game in games.slice(x,y)) {
        {
            let time = new Date(games[game].scheduled).getMinutes().toString();
            (time.length == 1) ? time += '0': time;
            table += "<tr><td><b>" + new Date(games[game].scheduled).toString().substr(0, 10).replace(/\b0/g, '') + "</b></td><td><b>" + games[game].home.name + "</b></td><td><b>" +
                games[game].away.name + "</b></td><td><b>" + new Date(games[game].scheduled).getHours() + ":" + time + "</b></td><td><b>" +
                games[game].venue.city + "," + games[game].venue.name + "</b></td></tr>";
        }
        document.getElementById("schedule-col").innerHTML = table;
    }
}*/