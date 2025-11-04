// universal script for everything
let path = window.location.pathname;
window.parent.postMessage(window.location.pathname);
let tokens2 = parseInt(localStorage.casinoTokens);
if (document.getElementById("topthing")) {
  if (localStorage.ikonpng && document.getElementById("topicon")) {
      document.getElementById("topthing").innerHTML = "<div class=center><img id='topicon' src='/ikony" + localStorage.ikonpng + "' width=200><hr width='100%' color='#38393f' size='3'><h2><a style='margin-left: 7px;' id='wiersz' href='/wiersz'>Wiersz</a><a style='margin-left: 7px;' id='extra' href='/extra'>Różne fajne rzeczy</a><a style='margin-left: 7px;' id='gry' href='/gry'>Fajne gry</a><a style='margin-left: 7px;' id='kasyno' href='/kasyno'>Kasyno</a><a style='margin-left: 7px;' id='zdjecia' href='/zdjecia'>Ciekawe zdjęcia</a><hr width='100%;' color='#38393f' size='3'><i style='color:gray;'> NAD TYM SĄ PRZYCISKI DO PRZYCIŚNIĘCIA</i></h2></div>";
  } else {
      document.getElementById("topthing").innerHTML = "<div class=center><img id='topicon' src='/ikony/ikon.png' width=200><hr width='100%' color='#38393f' size='3'><h2><a style='margin-left: 7px;' id='wiersz' href='/wiersz'>Wiersz</a><a style='margin-left: 7px;' id='extra' href='/extra'>Różne fajne rzeczy</a><a style='margin-left: 7px;' id='gry' href='/gry'>Fajne gry</a><a style='margin-left: 7px;' id='kasyno' href='/kasyno'>Kasyno</a><a style='margin-left: 7px;' id='zdjecia' href='/zdjecia'>Ciekawe zdjęcia</a><hr width='100%;' color='#38393f' size='3'><i style='color:gray;'> NAD TYM SĄ PRZYCISKI DO PRZYCIŚNIĘCIA</i></h2></div>";
  }
  if (document.getElementById(path.substring(1, path.length))) {
    document.getElementById(path.substring(1, path.length)).remove();
  } else {
    console.log("id " + window.location.pathname + " doesn't exist")
  }
} else {
  console.log("no topthing")
}
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let thing = urlParams.get("s");
let cameFromQr = false
if (queryString.includes("qr")) {
  cameFromQr = true;
  localStorage.setItem("lastQrType", "gen" + urlParams.get("gen"))
  if (localStorage.qrVisits) {
    localStorage.setItem("qrVisits", parseInt(localStorage.qrVisits) + 1);
  } else {
    localStorage.setItem("qrVisits", 1);
  }
}
function check() {
  if (document.getElementById("topthing")) {
if (thing == "f") {
  document.getElementById("topthing").style.display = "none";
} else {
  document.getElementById("topthing").style.display = "initial";
}
  }
}
check();
// session counter
if (localStorage.cameFromQr == undefined) {
  if (cameFromQr) {
    localStorage.setItem("cameFromQr", "gen" + urlParams.get("gen"))
  } else {
    localStorage.setItem("cameFromQr", false)
  }
}
if (localStorage.sessions) {
} else {
  localStorage.setItem("sessions", "0");
}
function getCookie(name) { // stolen
    var value = "; " + document.cookie; // Use var instead of const
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}

let sessions = localStorage.getItem("sessions");

if (getCookie("firstVisitInSession") == "false") {
  console.log("Same session");
} else {
  console.log("New session");
  sessions = parseInt(sessions) + 1;
  tokens2 += 1;
  localStorage.setItem("casinoTokens", tokens2);
  localStorage.setItem("sessions", sessions);
}

document.addEventListener('visibilitychange', function () {
    document.cookie = "firstVisitInSession=false; SameSite=lax; max-age=30; path=/";
});

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
function removeTags(str) {
    return str.replace(/<[^>]+>/g, '');
}
async function nopermissionnotification() {
  if (Notification?.permission == "granted") {
    if (document.getElementById("notificationtext")) {
      document.getElementById("notificationtext").innerHTML = "<b>Włącz powiadomienia na nowe wiadomości (Włączone)</b>";
    }
    const img = "ikon.png";
    const text = "Error, nie można było wziąść najnowszej wiadomośći";
    let allMessages = ["Error"];
    await fetch(window.location.origin + "/allMessages.json", {
		cache: 'no-cache'
	})
	.then(response => response.text())
	.then(data => {
		allMessages = JSON.parse(data);
	})
	.catch(error => allMessages = ["Error, nie można wziąść najnowszych wiadomości"]);
    let newestmessage = removeTags(allMessages[allMessages.length - 1]);
    if (localStorage.lastMessageRead != allMessages[allMessages.length - 1] && allMessages[0] != "Error") {
      const notification = new Notification("Nowa wiadomość!", { body: newestmessage, icon: img });
      localStorage.setItem("lastMessageRead", allMessages[allMessages.length - 1])
    } else {
      console.log("Not going to annoy with notification")
    }
  }
}
async function notification() {
 Notification.requestPermission().then((result) => {
   console.log(result);
   if (document.getElementById("notificationtext")) {
     document.getElementById("notificationtext").innerHTML = "<b>Włącz powiadomienia na nowe wiadomości (Włączone)</b>";
   }
 });
 if (Notification?.permission == "granted") {
   if (document.getElementById("notificationtext")) {
     document.getElementById("notificationtext").innerHTML = "<b>Włącz powiadomienia na nowe wiadomości (Włączone)</b>";
   }
   const img = "ikon.png";
   const text = "Error, nie można było wziąść najnowszej wiadomośći";
   let allMessages = ["Error"];
   await fetch(window.location.origin + "/allMessages.json", {
		cache: 'no-cache'
	})
	.then(response => response.text())
	.then(data => {
		allMessages = JSON.parse(data);
	})
	.catch(error => allMessages = [error]);
   let newestmessage = removeTags(allMessages[allMessages.length - 1]);
   if (localStorage.lastMessageRead != allMessages[allMessages.length - 1] && allMessages[0] != "Error") {
     const notification = new Notification("Nowa wiadomość!", { body: newestmessage, icon: img });
     localStorage.setItem("lastMessageRead", allMessages[allMessages.length - 1])
   } else {
     console.log("Not going to annoy with notification")
   }
 }
}
nopermissionnotification();
