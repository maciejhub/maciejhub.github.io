function random(max, not) {
  let int = Math.floor(Math.random() * max);
  if (int == not) {
    random(max, not)
  }
  return int;
}
function get(id) {
  return document.getElementById(id)
}
let teachers = ['Sala 3, głównie od historii', 'Sala 13, głównie od informatyki', 'Sala 21, głównie od plastyki i muzyki', 'Sala 24, głównie od geografii', 'Sala 28, głównie od fizyki i chemii', 'Sala 31, głównie od polskiego', 'Sala 32, głównie od matematyki', 'Sala 33, głównie od angielskiego', 'Sala 34, głównie od różnych', 'Sala 35, głównie od polskiego', 'Sala 37, głównie od religii', 'Sala 38, głównie od matematyki', 'Sala 40, głównie od biologii'];
let data = [];
let clicks = -1;
for (i = 0; i < teachers.length; i++) {
  data.push("[0, 0, 0]");
}
get("content").style.display = "none";
get("password").style.display = "flex";
let lastcombination = [0, 0];
let api;
let one = get("one");
let two = get("two");
function sendtotalrequest() {
  let string = JSON.stringify(data).replaceAll(" ", "+").replaceAll('"', "");
  fetch(api + "/sendtotal?total=" + string)
    .then((response) => response.json())
    .then((json) => {
      if (json.status == "success") {
        get("finish").innerHTML = "Skończone! Nie wiesz co robić? Zagraj w coś na <button class='textbutton' onclick='mchredirect()'>maciej hub!</button>";
      } else {
        get("finish").innerHTML = "<button class='textbutton' onclick='newpassword()'>Coś nie poszło.. Error " + json.status + ". Kliknij aby wpisać nowe hasło</button>";
      }
    })
    .catch((error) => {
      get("finish").innerHTML = " <button class='textbutton' onclick='newpassword()'>Coś nie poszło.. Error" + error + ". Kliknij aby wpisać nowe hasło</button>";
    });
}
async function passwordcheck() {
  if (api != undefined) {
    if (get("input").value.length > 2 && get("input").value.length < 8 && get("input").value.includes(".")) {
      api = "http://192.168." + get("input").value + ":5000";
      get("password").style.display = "none";
      get("finish").style.display = "inline";
      get("content").style.display = "none";
      sendtotalrequest();
      return;
    } else {
      get("passwordtext").innerText = "Nie możliwe hasło";
      await new Promise(r => setTimeout(r, 1000));
      get("passwordtext").innerText = "Wpisz hasło";
    }
  }
  if (get("input").value.length > 2 && get("input").value.length < 8 && get("input").value.includes(".")) {
    api = "http://192.168." + get("input").value + ":5000";
    get("finish").style.display = "inline";
    get("password").style.display = "none";
    get("finish").innerHTML = "<img src='loading.png' size='200'>";
    fetch(api + "/getthings", {
      cache: 'no-cache'
    })
    .then(response => response.text())
    .then(data => {
      console.log(JSON.parse(JSON.parse(data.replaceAll("[l]", "ł").replaceAll("[o]", "ó").replaceAll("[z]", "ż"))))
      teachers = JSON.parse(JSON.parse(data.replaceAll("[l]", "ł").replaceAll("[o]", "ó").replaceAll("[z]", "ż")));
      get("finish").style.display = "none";
      get("content").style.display = "flex";
      get("password").style.display = "none";
      newteachers();
    })
    .catch(() => {
      get("content").style.display = "none";
      get("password").style.display = "flex";
      get("finish").style.display = "none";
      get("passwordtext").innerText = "Złe hasło, wpisz nowe";
    });
  } else {
    get("passwordtext").innerText = "Nie możliwe hasło";
    await new Promise(r => setTimeout(r, 1000));
    get("passwordtext").innerText = "Wpisz hasło";
  }
}
function mchredirect() {
  let a = document.createElement("a");
  a.href = "https://maciejhub.github.io?teachersurvey";
  a.target = "_blank";
  a.click();
  fetch(api + "/sendvisit")
}
function newpassword() {
  api = undefined;
  get("finish").style.display = "none";
  get("password").style.display = "flex";
}
get("input").addEventListener("keydown", function(e) {
  if (e.key == "Enter" && api == undefined) {
    passwordcheck();
  }
});
function newteachers() {
  if (lastcombination[1] == (teachers.length - 1)) {
    lastcombination[1] = 0
    lastcombination[0] = parseInt(lastcombination[0]) + 1;
  } else {
    lastcombination[1] = parseInt(lastcombination[1]) + 1;
  }
  if (lastcombination[0] == lastcombination[1]) {
    lastcombination[1] = parseInt(lastcombination[1]) + 1;
  }
  if (lastcombination[0] > lastcombination[1] && lastcombination[0] - lastcombination[1] < 21) {
    lastcombination[1] += 1;
    newteachers();
    return;
  }
  clicks += 1;
  get("counter").innerText = clicks.toString() + "/78";
  if (lastcombination[0] > teachers.length - 2) {
    get("finish").style.display = "inline";
    get("content").style.display = "none";
    get("finish").innerHTML = "<img src='loading.png' size='200'>";
    sendtotalrequest();
    return;
  }
  one.innerText = teachers[parseInt(lastcombination[0])];
  two.innerText = teachers[parseInt(lastcombination[1])];
}
function choose(which) {
  if (which != "x") {
    let chosendata = JSON.parse(data[teachers.indexOf(get(which).innerText)]);
    chosendata[0] = parseInt(chosendata[0]) + 1;
    let notchosendata;
    data[teachers.indexOf(get(which).innerText)] = JSON.stringify(chosendata);
    if (which == "one") {
      notchosendata = JSON.parse(data[teachers.indexOf(two.innerText)]);
      notchosendata[1] = parseInt(notchosendata[1]) + 1;
      data[teachers.indexOf(two.innerText)] = JSON.stringify(notchosendata);
    } else {
      notchosendata = JSON.parse(data[teachers.indexOf(one.innerText)]);
      notchosendata[1] = parseInt(notchosendata[1]) + 1;
      data[teachers.indexOf(one.innerText)] = JSON.stringify(notchosendata);
    }
  } else {
    let chosendata = JSON.parse(data[teachers.indexOf(one.innerText)]);
    chosendata[2] = parseInt(chosendata[2]) + 1;
    data[teachers.indexOf(one.innerText)] = JSON.stringify(chosendata);
    chosendata = JSON.parse(data[teachers.indexOf(two.innerText)]);
    chosendata[2] = parseInt(chosendata[2]) + 1;
    data[teachers.indexOf(two.innerText)] = JSON.stringify(chosendata);
  }
  newteachers();
}
