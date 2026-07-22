let types = ["S", "RM", "ZNT", "AS", "KRT"];

if (localStorage.quest) {
  console.log("quest already exists")
} else {
  localStorage.setItem("quest", "nS")
}

if (localStorage.lastDayBeen != date) {
  document.getElementById("questamount").innerText = "Zostały ci 2 misje dzisiaj";
  localStorage.setItem("questsDoneToday", 0);
}
localStorage.setItem("lastDayBeen", date);
if (localStorage.questsDoneToday == undefined) {
  localStorage.setItem("questsDoneToday", 0);
}
if (localStorage.questsDone == undefined) {
  localStorage.setItem("questsDone", 0);
}
if (localStorage.questsDone == 0 && localStorage.quest == "nS") {
  localStorage.setItem("quest", "nRM");
}
if (parseInt(localStorage.questsDoneToday) == 0) {
  document.getElementById("questamount").innerText = "Zostały ci 2 misje dzisiaj";
} else if (parseInt(localStorage.questsDoneToday) == 1) {
  document.getElementById("questamount").innerText = "Została ci 1 misja dzisiaj";
} else if (parseInt(localStorage.questsDoneToday) == 2) {
  document.getElementById("questamount").innerText = "Skończyłeś wszystkie swoje misje dzisiaj. Wróć jutro na kolejne";
}

function getnewquesttype() {
  let prevtype = types.indexOf(localStorage.quest.substring(1, localStorage.quest.length));
  let type = prevtype
  type += getRandomInt(2) + 1
  if (type > types.length - 1) {
    type -= types.length;
  }
  if (type < 0) {
    type += types.length;
  }
  return "n" + types[type]
}
async function checkforcompletedquest() {
  if (localStorage.quest.substring(0, 1) == "c") {
    let oldtokens = tokens;
    hidepopup();
    plusanimation2(oldtokens, oldtokens + 2);
    await sleep(2300);
    animationhappening = false;
    tokens += 2;
    localStorage.setItem("quest", localStorage.quest.replace("c", "?"));
    await sleep(400);
    localStorage.setItem("questsDoneToday", parseInt(localStorage.questsDoneToday) + 1);
    localStorage.setItem("questsDone", parseInt(localStorage.questsDoneToday) + 1);
    if (parseInt(localStorage.questsDoneToday) > 1) {
      document.getElementById("questtitle").innerText = "Nie ma misji";
      document.getElementById("questamount").innerText = "Skończyłeś wszystkie swoje misje dzisiaj. Wróć jutro na kolejne";
    } else {
      document.getElementById("questamount").innerText = "Została ci 1 misja dzisiaj";
    }
    document.getElementById("questfinished").innerText = "Kliknij na nową misję";
    document.getElementById("questtitle").innerText = "Nie ma misji";
  } else if (localStorage.quest.substring(0, 1) == "?") {
    if (localStorage.questsDoneToday != 2) {
    localStorage.setItem("quest", getnewquesttype());
    await sleep(100);
    if (localStorage.quest == "nRM") {
      document.getElementById("questtitle").innerText = "Dostań 4+ mandarynek w rzucać mandarynki do kibla: the gra";
    } else if (localStorage.quest == "nS") {
      document.getElementById("questtitle").innerText = "Dostań mniej niż 1 sekunde 5 razy w maciej hub speedrun";
    } else if (localStorage.quest == "nZNT") {
      document.getElementById("questtitle").innerText = "Dostań 5+ odświeżen w zepsuć nokie TYCOON";
    } else if (localStorage.quest == "nAS") {
      document.getElementById("questtitle").innerText = "Dostań 20+ na 3 piosenkach w asmr bułka: the gra";
    } else if (localStorage.quest == "nKRT") {
      document.getElementById("questtitle").innerHTML = "Dostań 13+ mystery box w <i style=\"color: black;\">censored</i> KART";
    }
    document.getElementById("questfinished").innerText = "Nie skończone";
    } else {
      document.getElementById("questfinished").innerText = "Dostajesz nic";
      await sleep(1000);
      document.getElementById("questfinished").innerText = "Kliknij na nic";
    }
  } else {
    document.getElementById("questfinished").innerText = "Nie skończyłeś misji";
    await sleep(700);
    document.getElementById("questfinished").innerText = "Nie skończone";
  }
}
function openquests() {
  if (animationhappening == false) {
    showpopup();
    document.getElementById("questpopup").style.display = "initial";
    document.getElementById("popuptext").innerHTML = "Misje<br>";
    if (localStorage.questsDoneToday == 2) {
      document.getElementById("questtitle").innerText = "Nie ma misji";
      document.getElementById("questfinished").innerText = "Kliknij na nic";
      return
    }
    let questlength = localStorage.quest.length;
    if (localStorage.quest.substring(1, questlength) == "RM") {
      document.getElementById("questtitle").innerText = "Dostań 4+ mandarynki w rzucać mandarynki do kibla: the gra";
    } else if (localStorage.quest.substring(1, questlength) == "S") {
      document.getElementById("questtitle").innerText = "Dostań mniej niż 1 sekunde 5 razy w maciej hub speedrun";
    } else if (localStorage.quest.substring(1, questlength) == "ZNT") {
      document.getElementById("questtitle").innerText = "Dostań 5+ odświeżen w zepsuć nokie TYCOON";
    } else if (localStorage.quest.substring(1, questlength) == "AS") {
      document.getElementById("questtitle").innerText = "Dostań 20+ na 3 piosenkach w asmr bułka: the gra";
    } else if (localStorage.quest.substring(1, questlength) == "KRT") {
      document.getElementById("questtitle").innerHTML = "Dostań 13+ mystery box w <i style=\"color: black\">censored</i> KART";
    }
    if (localStorage.quest.substring(0, 1) == "n") {
      document.getElementById("questfinished").innerText = "Nie skończone";
    } else if ((localStorage.quest.substring(0, 1) == "?")) {
      document.getElementById("questtitle").innerText = "Nie ma misji";
      document.getElementById("questfinished").innerText = "Kliknij na nową misję";
    } else if (localStorage.quest.substring(0, 1) == "c") {
      document.getElementById("questfinished").innerText = "Skończone, kliknij";
    }
  }
}
