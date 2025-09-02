// universal script for everything
let tokens2 = parseInt(localStorage.casinoTokens);
if (localStorage.ikonpng) {
document.getElementById("topicon").src = localStorage.ikonpng;
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