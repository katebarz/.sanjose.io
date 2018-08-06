//document.getElementById('content').style.backgroundImage = "url('cut.jpg')";

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
        /*alert(window.innerWidth);*/
        document.getElementById("dropdown-content").classList.toggle("show");
        /*	document.getElementById("span-menu").style.transform="rotate(180deg)";*/
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
/*if (document.getElementById("dropdown-content").contains("show")) {

        document.getElementById("dropdown-content").remove('show');


      }
	}

}*/
/*const url ='https://api.privatbank.ua/p24api/exchange_rates?json&date=01.12.2014';
var request = new XMLHttpRequest();
request.open('GET',url);
request.responseType='json';
request.send();
request.onload = function() {
  var result = request.response;
  console.log(result);
  //populateHeader(superHeroes);
  //showHeroes(superHeroes);
  alert(result.bank);
}*/


/*var response =$.ajax({
    url: 'https://api.privatbank.ua/p24api/exchange_rates?json&date=01.12.2014',
    type: 'GET',
    dataType: 'jsonp',
    crossDomain: true,   
});
//var jsonObj = JSON.parse(response);
console.log(response[0]);*/

//var obj = JSON.parse('{ "name":"John", "age":30, "city":"New York"}');
//console.log(obj.name);

fetch('https://statsapi.web.nhl.com/api/v1/standings')
    .then(function(response) {
        (response.headers.get('Content-Type')); // application/json; charset=utf-8
        //alert(response.status); // 200
        return response.json();
    })
    .then(function(result) {
        var i;
        var j;
        /*for(j=0;j<4;j++){
    	var newDiv = document.createElement('div');
   		newDiv.id = 'col-'+j;
   		newDiv.setAttribute('class', 'newDiv col-xs-12 col-sm-4 col-md-4 col-lg-2');
   		document.getElementById('standings-col').appendChild(newDiv);
    	var division = document.createElement('h3');
    	division.innerHTML = (result.records[j]['division']['name']);
    	document.getElementById(newDiv.id).appendChild(division);
		    for(i=0;i<result.records[j]['teamRecords'].length;i++){
		    	var teams = document.createElement('h4');
		    	teams.innerHTML = (result.records[j]['teamRecords'][i]['team']['name']);
		    	//div.setAttribute('class', 'myclass');
				document.getElementById(newDiv.id).appendChild(teams);
		    }
	}
	for(j=0;j<4;j++){
    	var division = document.createElement('h3');
    	division.innerHTML = (result.records[j]['division']['name']);
    	document.getElementById("standings-col-2").appendChild(division);
    	 for(i=0;i<result.records[j]['teamRecords'].length;i++){
		    	var teams = document.createElement('div');
		    	teams.innerHTML = (result.records[j]['teamRecords'][i]['team']['name']);
		    	//teams.innerHTML = (result.records[j]['teamRecords'][i]['team']['link']);
		    	//div.setAttribute('class', 'myclass');
				document.getElementById("standings-col-2").appendChild(teams);
		    }
    }*/
        /*var x,txt="";
        txt += "<table border='1'>"
        for (x in result) {
            txt += "<tr><td>" + result[x].name + "</td></tr>";
        }
        txt += "</table>"        
        document.getElementById("demo").innerHTML = txt;
*/
        let records = result.records;
        let table = "<table border='1'>"
        for (record in records) {
            table += "<tr><th>" + records[record].division.name + "</th><th>Games Played</th><th>Wins</th><th>Losses</th><th>OT</th><th>Points</th>" +
                "<th>Goals For</th><th>Goals Against</th><th>Conference Rank</th><th>League Rank</th><th>Division Rank</th></tr>";
            let teamRecords = result.records[record].teamRecords;
            for (teamRecord in teamRecords) {
                table += "<tr><td>" + teamRecords[teamRecord].team.name + "</td>";
                table += "<td>" + teamRecords[teamRecord].gamesPlayed + "</td><td>" + teamRecords[teamRecord].leagueRecord.wins + "</td><td>" +
                    teamRecords[teamRecord].leagueRecord.losses + "</td><td>" + teamRecords[teamRecord].leagueRecord.ot + "</td><td>" +
                    teamRecords[teamRecord].points + "</td><td>" + teamRecords[teamRecord].goalsScored + "</td><td>" +
                    teamRecords[teamRecord].goalsAgainst + "</td><td>" +
                    teamRecords[teamRecord].conferenceRank + "</td><td>" + teamRecords[teamRecord].leagueRank + "</td><td>" +
                    teamRecords[teamRecord].divisionRank + "</td>";

                table += "</tr>"
                /*var teams = document.createElement('div');
			    teams.innerHTML = teamRecords[teamRecord].team.name;
				document.getElementById("standings-col-2").appendChild(teams);*/
            }

        }
        table += "</table>";
        document.getElementById("standings-col").innerHTML = table;

    })