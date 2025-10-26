// universal script for everything
window.parent.postMessage(window.location.pathname);
let tokens2 = parseInt(localStorage.casinoTokens);
if (localStorage.ikonpng) {
  if (document.getElementById("topicon")) {
    document.getElementById("topicon").src = localStorage.ikonpng;
  } else {
    console.log("topthingscript says topicon doesn't exist")
  }
}
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let thing = urlParams.get("s");
function check() {
if (thing == "f") {
  document.getElementById("topthing").style.display = "none";
} else {
  document.getElementById("topthing").style.display = "initial";
}
}
check();
// session counter

if (localStorage.sessions) {
} else {
  console.log("Sessions item does not exist, creating");
  localStorage.setItem("sessions", "1");
}
function getCookie(name) { // stolen
    var value = "; " + document.cookie; // Use var instead of const
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}

let sessions = localStorage.getItem("sessions");

if (getCookie("firstVisitInSession") == "false") {
  console.log("Same session");
  console.log(tokens2 + " vs " + sessions);
} else {
  console.log("New session");
  sessions = parseInt(sessions) + 1;
  tokens2 += 1;
  console.log(tokens2 + " vs " + sessions);
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
