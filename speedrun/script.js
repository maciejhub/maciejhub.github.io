let sec = 0;
let ms = 0;
let time = "00:00";
let timer = "inactive";
let quest = false;
let link = window.location.origin;
if (localStorage.quest == "nS") {
  quest = true;
}
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
function exit() {
  window.location.href = "/extra"
}
window.addEventListener('message', function(event) {
  if (event.origin !== link) return;
  diditwin(event.data);
});

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

const urls = ["wiersz", "extra", "kasyno", "zdjecia", "cytaty", "kalkulator/", "zdjecia"];
let permtime = "";
let win = "false";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let randomitem = getRandomInt(urls.length - 1);
let randomitem2

function makeitem2() {
  randomitem2 = randomitem + getRandomInt(4);

  if (randomitem2 > urls.length - 1) {
    randomitem2 = randomitem2 - urls.length - 1;
  }
  if (randomitem2 < 0) {
    randomitem2 = 0;
  }
  if (randomitem == randomitem2) {
    makeitem2();
  }
}
makeitem2();

function showwhere() {
  document.getElementById("lulz").innerHTML =
    "Dostań się od <b>" +
    urls[randomitem] +
    " do " +
    urls[randomitem2] +
    "</b>";
  document.getElementById("lulz").innerHTML = document
    .getElementById("lulz")
    .innerHTML.replace("extra", "różne fajne rzeczy");
  document.getElementById("lulz").innerHTML = document
    .getElementById("lulz")
    .innerHTML.replace("kalkulator/", "kalkulator");
  document.getElementById("lulz").innerHTML = document
    .getElementById("lulz")
    .innerHTML.replace("zdjecia", "ciekawe zdjęcia");
}
document.getElementById("save").style.display = "none";
async function hidepopup() {
  document.getElementById("popup").style.display = "none";
  if (document.getElementById("button").innerHTML == "Zagraj jeszcze raz") {
    window.location.reload();
  } else {
    if (document.getElementById("button").innerHTML == "START") {
      if (randomitem != 6) {
        document.getElementById("iframe").contentWindow.location.href =
          "/" + urls[randomitem];
      } else {
        document.getElementById("iframe").contentWindow.location.href = "/kalkulator";
      }
      await sleep(300);
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

function diditwin(input) {
  if (input == "/" + urls[randomitem2] || randomitem2 == 6 && input == link + "kalkulator/") {
    timer = "inactive";
    permtime = time;
    time = "00:00";
    win = "true";
    if (ms <= 60 && sec < 1 && quest) {
      if (localStorage.speedrunWinsForQuest) {
        localStorage.setItem("speedrunWinsForQuest", parseInt(localStorage.speedrunWinsForQuest) + 1);
      } else {
        localStorage.setItem("speedrunWinsForQuest", 1);
      }
      if (localStorage.speedrunWinsForQuest == 5) {
        localStorage.setItem("quest", "cS");
        localStorage.setItem("speedrunWinsForQuest", 0);
        document.getElementById("lulz").innerHTML = "Wygrałeś! I skończyłeś misję!";
      } else {
        document.getElementById("lulz").innerHTML = "Wygrałeś! Jeszcze tylko " + (5 - parseInt(localStorage.speedrunWinsForQuest)) + " razy do skończenia misji!";
      }
    } else {
      if (quest) {
        document.getElementById("lulz").innerHTML = "Wygrałeś! Ale nic nie dodałeś do misji..";
      } else {
        document.getElementById("lulz").innerHTML = "Wygrałeś!";
      }
    }
    document.getElementById("button").innerHTML = "Zagraj jeszcze raz";
    showpopup();
    sec = "00";
    ms = "00";
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
        sarray.push(
          "od <b>" +
            urls[randomitem] +
            "</b> do <b>" +
            urls[randomitem2] +
            "</b> w " +
            permtime,
        );
        localStorage.setItem("speedrunresults", JSON.stringify(sarray));
        document.getElementById("save").innerHTML = "Wynik zapisany";
      } else {
        document.getElementById("save").innerHTML =
          "Za dużo zapisanych wyników, wynik nie zapisany";
      }
    }
  } else {
    const mysarray = [
      "od <b>" +
        urls[randomitem] +
        "</b> do <b>" +
        urls[randomitem2] +
        "</b> w " +
        permtime,
    ];
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
          document.getElementById("lulz").innerHTML =
            "<span>" +
            sarray[i] +
            '<button class="button" onclick="deletefromarray(' +
            i +
            ')"><b> Usuń wynik</b></button></span>';
        } else {
          document.getElementById("lulz").innerHTML +=
            "<span><br>" +
            sarray[i] +
            '<button class="button" onclick="deletefromarray(' +
            i +
            ')"><b> Usuń wynik</b></button></span>';
        }
      }
    } else {
      document.getElementById("lulz").innerHTML =
        "Nie masz żadnych zapisanych wyników";
    }
    document.getElementById("button").innerHTML = "Zamknij";
    document.getElementById("save").style.display = "none";
    if (sarray.length == "0") {
      document.getElementById("lulz").innerHTML =
        "Nie masz żadnych zapisanych wyników";
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

iframe.addEventListener("load", diditwin());
