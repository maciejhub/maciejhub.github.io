let yewgens = 0;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let auth = urlParams.get("auth");
let cps = 0;
function recheck() {
if (auth == "mango") {
  document.getElementById("textxdxd").innerHTML = "MANGO CLICKER";
  document.getElementById("textxd").innerHTML = "0 mango";
  document.getElementById("click").src = "https://static.vecteezy.com/system/resources/previews/029/200/093/large_2x/mango-transparent-background-free-png.png";
}
if (auth == "true" || auth == "auth") {
  document.getElementById("textxdxd").innerHTML = "Dostań 50 yewgenów aby przejść dalej";
  document.getElementById("textxd").innerHTML = yewgens + "/50 yewgen";
  document.getElementById("click").src = "ikon.png";
}
if (auth == "") {
  document.getElementById("textxdxd").innerHTML = "YEWGEN CLICKER";
  document.getElementById("textxd").innerHTML = yewgens + " yewgen";
  document.getElementById("click").src = "ikon.png";
}
}
function refreshpage() {
  document.location.href = "https://yewgenfanpage.neocities.org/yewgenclicker?auth=" + document.getElementById("tryb").value;
}
function dingle() {
  const delay = ms => new Promise(res => setTimeout(res, ms));
  if (auth == "true" || auth == "auth") {
    yewgens += 1;
    document.getElementById("textxd").innerHTML = yewgens + "/50 yewgen";
    if (yewgens > 49) {
    document.getElementById("textxd").innerHTML = "Skończone! Okno zostanie zamknięte za 2 sekundy";
    setTimeout(() => { close(); }, 2000);
    }
  } else {
  if (auth == "mango") {
    yewgens += 1;
    document.getElementById("textxd").innerHTML = yewgens + " mango";
  } else {
    yewgens += 1;
    document.getElementById("textxd").innerHTML = yewgens + " yewgen";
  }
}
}
function buyjuice() {
  if (yewgens > 49) {
    yewgens -= 50;
    cps += 1;
  } else {
    alert("Za mało yewgenów");
  }
}
recheck();