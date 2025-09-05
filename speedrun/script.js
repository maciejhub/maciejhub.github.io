let sec = 0;
let ms = 0;
let time = "00:00";
let timer = "inactive";
function starttimer() {
  if (length.time > 6) {
    window.location.reload();
  }
  if (timer == "active") {
        ms = ms + 1;
        if (ms == 100) {
            sec++;
            ms = 0;
        }

        if (sec == 60) {
            window.location.reload();
        }
        time = (sec < 10 ? "0" : "") + sec + ":" + (ms < 10 ? "0" : "") + ms;

        document.getElementById("timer").innerHTML = time;
        
        setTimeout(starttimer, 10);
      } 
    } 
    
document.location.href = "#iframe";
const urls = ["wiersz", "wideo", "extra", "kasyno", "cytaty", "kalkulator"];
let permtime = "";
let win = "false";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let randomitem = getRandomInt(urls.length - 1);

if (randomitem == 4) {
  randomitem = 5;
}

let randomitem2 = randomitem + getRandomInt(6) + 1;

if (randomitem2 > urls.length - 1) {
  randomitem2 = randomitem2 - urls.length - 1;
}

if (randomitem2 < 0) {
  randomitem2 = 0;
}

if (randomitem2 == 1) {
  randomitem2 = 2;
}

if (randomitem != 6) {
document.getElementById("iframe").contentWindow.location.href = "/" + urls[randomitem];
} else {
document.getElementById("iframe").contentWindow.location.href = "/kalkulator";
}

function showwhere() {
  if (randomitem == 3) {
  document.getElementById("lulz").innerHTML = "Dostań się od <b>" + "różne fajne rzeczy" + "</b> do <b>" + urls[randomitem2] + "</b>";
} else {
  if (randomitem2 != 3) {
  document.getElementById("lulz").innerHTML = "Dostań się od <b>" + urls[randomitem] + "</b> do <b>" + urls[randomitem2] + "</b>";
  }
}

if (randomitem2 == 3) {
  document.getElementById("lulz").innerHTML = "Dostań się od <b>" + urls[randomitem] + "</b> do <b>" + "różne fajne rzeczy" + "</b>";
} else {
  if (randomitem != 3) {
  document.getElementById("lulz").innerHTML = "Dostań się od <b>" + urls[randomitem] + "</b> do <b>" + urls[randomitem2] + "</b>";
  }
}

}
document.getElementById("save").style.display = "none";
     function hidepopup() {
       document.getElementById("popup").style.display = "none";
       if (document.getElementById("button").innerHTML == "Zagraj jeszcze raz") {
       window.location.reload();
     } else {
       if (document.getElementById("button").innerHTML == "START") {
       timer = "active";
       starttimer();
       }
     }
     if (document.getElementById("button").innerHTML == "Zamknij") {
       if (win == "false") {
       showpopup();
       document.getElementById("save").style.display = "none";
       document.getElementById("button").innerHTML = "START";
       showwhere();
       } else {
         showpopup();
       document.getElementById("save").style.display = "none";
       document.getElementById("button").innerHTML = "Zagraj jeszcze raz";
       document.getElementById("lulz").innerHTML = "Wygrałeś!";
       document.getElementById("save").style.display = "initial";
       }
       }
     }
     
     function showpopup() {
       document.getElementById("popup").style.display = "initial";
       document.getElementById("save").style.display = "initial";
     }
     
     function diditwin() {
if (document.getElementById("iframe").contentWindow.location.href == "https://maciejhub.github.io/" + urls[randomitem2]) {
    timer = "inactive";
    permtime = time;
    time = "00:00";
    sec = "00";
    ms = "00";
    win = "true";
    document.getElementById("lulz").innerHTML = "Wygrałeś!";
    document.getElementById("button").innerHTML = "Zagraj jeszcze raz";
    showpopup();
  }
  
if (randomitem2 == 6 && document.getElementById("iframe").contentWindow.location.href == "https://maciejhub.github.io/kalkulator/") {
    timer = "inactive";
    permtime = time;
    time = "00:00";
    sec = "00";
    ms = "00";
    document.getElementById("lulz").innerHTML = "Wygrałeś!";
    document.getElementById("button").innerHTML = "Zagraj jeszcze raz";
    showpopup();
  }
     }

showwhere();
if (localStorage.speedrunresults == undefined) {
  const myarray = [];
  localStorage.setItem("speedrunresults", JSON.stringify(myarray));
}
const sarray = JSON.parse(localStorage.speedrunresults);
function saveresult() {
  if (localStorage.speedrunresults) {
    if (document.getElementById("save").innerHTML != "Wynik zapisany") {
    if (sarray.length < 9) {
  sarray.push("od <b>" + urls[randomitem] + "</b> do <b>" + urls[randomitem2] + "</b> w " + permtime);
  localStorage.setItem("speedrunresults", JSON.stringify(sarray));
  document.getElementById("save").innerHTML = "Wynik zapisany";
    } else {
      document.getElementById("save").innerHTML = "Za dużo zapisanych wyników, wynik nie zapisany";
    }
    }
} else {
  const mysarray = ["od <b>" + urls[randomitem] + "</b> do <b>" + urls[randomitem2] + "</b> w " + permtime];
  localStorage.setItem("speedrunresults", JSON.stringify(mysarray));
}
}


function savedresults() {
  if (time == "00:00" || win == "true") {
  showpopup();
  if (localStorage.speedrunresults || sarray.length != 0) {
    document.getElementById("lulz").innerHTML = "";
for (let i = 0; i != sarray.length; i++) {
  if (i == 0) {
  document.getElementById("lulz").innerHTML = "<span>" + sarray[i] + "<button class=\"button\" onclick=\"deletefromarray(" + i + ")\"><b> Usuń wynik</b></button></span>";
  } else {
  document.getElementById("lulz").innerHTML += "<span><br>" + sarray[i] + "<button class=\"button\" onclick=\"deletefromarray(" + i + ")\"><b> Usuń wynik</b></button></span>";
  }
}
  } else {
  document.getElementById("lulz").innerHTML = "Nie masz żadnych zapisanych wyników";
  }
  document.getElementById("button").innerHTML = "Zamknij";
  document.getElementById("save").style.display = "none";
  if (sarray.length == "0") {
    document.getElementById("lulz").innerHTML = "Nie masz żadnych zapisanych wyników";
  }
}
}
function deletefromarray(text) {
  sarray.splice(text, 1);
  localStorage.setItem("speedrunresults", JSON.stringify(sarray));
  savedresults();
}
function leave() {
  window.location.href = "extra/";
}