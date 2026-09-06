let done = [];
let sorting = 0;

get("1").appendChild(get("zepsucnokie"));
get("2").appendChild(get("maciejclicker"));
get("3").appendChild(get("mandarynki"));
get("4").appendChild(get("kart"));
get("5").appendChild(get("nokiatycoon"));
get("6").appendChild(get("zntr"));
get("7").appendChild(get("asmrbulka"));
get("8").appendChild(get("skibidi"));

function resizeIFrameToFitContent(name) {
    if (done.includes(name) == false) {
        if (screen.orientation.type.includes("landscape")) {
            document.getElementById(name).width = "480px";
        } else {
            document.getElementById(name).width = "90%";
        }

        if (name == "zepsucnokie") {
            document.getElementById(name).height = document.getElementById(name).scrollHeight + 300;
        } else {
            document.getElementById(name).height = document.getElementById(name).scrollHeight + 250;
        }
    }
    done.push(name);
}

document.getElementById("codeinput").addEventListener("keydown", function(e) {
    if (e.key == "Enter") {
        checkcode();
    }
});

if (localStorage.gamesPlayed == undefined) {
    localStorage.setItem("gamesPlayed", JSON.stringify([0, 0, 0, 0, 0, 0, 0]));
}

const queryString2 = window.location.search;
const urlParams2 = new URLSearchParams(queryString2);
let shared = urlParams2.get("share");
let shared2 = urlParams2.get("share2");

if (localStorage.quest == "nRM" || localStorage.quest == "nZNT" || localStorage.quest == "nAS" || localStorage.quest == "nKRT" || localStorage.quest == "nZNS") {
    document.getElementById("codeenter").style.display = "inline";
}

if (shared != null || shared2 != null) {
    if (localStorage.shareVisits) {
        localStorage.setItem("shareVisits", parseInt(localStorage.shareVisits) + 1);
    } else {
        localStorage.setItem("shareVisits", 1);
    }
}

if (shared != null) {
    if (shared != "all") {
        document.getElementById("showallbutton").style.display = "initial";
        document.getElementById("maciejclicker").style.display = "none";
        document.getElementById("skibidi").style.display = "none";
        document.getElementById("zepsucnokie").style.display = "none";
        document.getElementById("mandarynki").style.display = "none";
        document.getElementById("asmrbulka").style.display = "none";
        document.getElementById("nokiatycoon").style.display = "none";
        document.getElementById("kart").style.display = "none";
        document.getElementById(shared).style.display = "initial";
    }
}

if (shared2 != null) {
    document.getElementById(shared2).style.display = "initial";
}

function isNumber(char) {
    return /^\d$/.test(char);
}

if (localStorage.lastCodeEntered) {
    console.log("lastCodeEntered exists");
} else {
    localStorage.setItem("lastCodeEntered", "");
}

let lettertonumber = ["error", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

async function checkcode() {
    let code = document.getElementById("codeinput").value;
    let dates = new Date();
    let hour = dates.getHours().toString().padStart(2, "0").toString();
    let date = dates.getDate().toString().padStart(2, "0").toString();
    let hour1 = parseInt(hour.substring(0, 1));
    let hour2 = parseInt(hour.substring(1, 2));
    let date1 = parseInt(date.substring(0, 1));
    let date2 = parseInt(date.substring(1, 2));

    console.log(hour);
    console.log(date);

    let offset = parseInt(code.substring(0, 1));
    console.log(offset);

    if (isNumber(offset) == false || isNumber(code.substring(1, 2)) || isNumber(code.substring(3, 4)) || isNumber(code.substring(2, 3)) == false || isNumber(code.substring(4, 5)) == false) {
        document.getElementById("codecheckbutton").innerText = "Nie poprawny kod";
        await sleep(1500);
        document.getElementById("codecheckbutton").innerText = "Sprawdź kod";
        return;
    }

    let expectedcode = hour + date;
    let madecodearray = [];

    madecodearray.push(parseInt(code.substring(2, 3)) - offset - 1);
    if (madecodearray[0] < 0) {
        madecodearray[0] += 9;
    }

    madecodearray.push(parseInt(code.substring(4, 5)) - offset - 3);
    if (madecodearray[1] < 0) {
        madecodearray[1] += 9;
    }

    madecodearray.push(lettertonumber.indexOf(code.substring(1, 2)) - offset);
    if (madecodearray[2] < 0) {
        madecodearray[2] += 9;
    }

    madecodearray.push(lettertonumber.indexOf(code.substring(3, 4)) - offset - 2);
    if (madecodearray[3] < 0) {
        madecodearray[3] += 9;
    }

    console.log(madecodearray);

    let madecode = madecodearray[0].toString() + madecodearray[1].toString() + madecodearray[2].toString() + madecodearray[3].toString();
    console.log(madecode + " vs " + expectedcode);

    let correct = 0;
    for (i = 0; i < 4; i++) {
        if (madecode.split("")[i] == expectedcode.split("")[i]) {
            correct++;
        }
    }

    if (code == localStorage.lastCodeEntered) {
        document.getElementById("codecheckbutton").innerText = "Kod nie może być taki sam jak ostatnio. Wygeneruj nowy";
        await sleep(1500);
        document.getElementById("codecheckbutton").innerText = "Sprawdź kod";
    } else if (correct > 2) {
        document.getElementById("codecheckbutton").innerText = "Poprawny kod! Sprawdź teraz misje w kasynie.";
        localStorage.setItem("lastCodeEntered", code);
        localStorage.setItem("quest", localStorage.quest.replace("n", "c"));
        await sleep(1500);
        hidepopup();
        document.getElementById("codeenter").style.display = "none";
    } else {
        document.getElementById("codecheckbutton").innerText = "Nie poprawny kod. Wygeneruj nowy. Jeżeli dalej nie działa, spróbuj nowy kod za godzinę";
        await sleep(1500);
        document.getElementById("codecheckbutton").innerText = "Sprawdź kod";
    }
}

function showall() {
    document.getElementById("maciejclicker").style.display = "initial";
    document.getElementById("skibidi").style.display = "initial";
    document.getElementById("zepsucnokie").style.display = "initial";
    document.getElementById("mandarynki").style.display = "initial";
    document.getElementById("asmrbulka").style.display = "initial";
    document.getElementById("nokiatycoon").style.display = "initial";
    document.getElementById("showallbutton").style.display = "none";
}

function hidepopup() {
    document.getElementById("codepopup").style.display = "none";
    document.getElementById("popup").style.display = "none";
    document.getElementById("sharepopup").style.display = "none";
}

function showpopup() {
    document.getElementById("popup").style.display = "initial";
    document.getElementById("codepopup").style.display = "none";
    document.getElementById("sharepopup").style.display = "initial";
}

function showcode() {
    document.getElementById("sharepopup").style.display = "none";
    document.getElementById("codepopup").style.display = "inline";
    document.getElementById("popup").style.display = "inline";
}

let shareurl = "mangos";
if (document.getElementById("sharechoose").value == "all") {
    shareurl = "https://maciejhub.github.io/gry";
} else {
    shareurl = "https://maciejhub.github.io/gry?share=" + document.getElementById("sharechoose").value;
}

async function copylink() {
    if (document.getElementById("sharechoose").value == "all") {
        shareurl = window.location.origin + "/gry?share=all";
    } else {
        shareurl = window.location.origin + "/gry?share=" + document.getElementById("sharechoose").value;
    }
    navigator.clipboard.writeText(shareurl);
    document.getElementById("copytext").innerHTML = "Link zkopiowany!";
    await sleep(700);
    document.getElementById("copytext").innerHTML = "Kopiuj link";
}

function changesorting() {
    sorting += 1;
    if (sorting > 3) {
        sorting = 1;
    }

    if (sorting == 1) {
        get("1").appendChild(get("zepsucnokie"));
        get("2").appendChild(get("maciejclicker"));
        get("3").appendChild(get("mandarynki"));
        get("4").appendChild(get("nokiatycoon"));
        get("5").appendChild(get("kart"));
        get("6").appendChild(get("asmrbulka"));
        get("7").appendChild(get("skibidi"));
        get("8").appendChild(get("zntr"));
        get("sorting_button").innerText = "Sortowanie: Polecane";
    } else if (sorting == 2) {
        get("1").appendChild(get("maciejclicker"));
        get("2").appendChild(get("skibidi"));
        get("3").appendChild(get("zepsucnokie"));
        get("4").appendChild(get("mandarynki"));
        get("5").appendChild(get("asmrbulka"));
        get("6").appendChild(get("kart"));
        get("7").appendChild(get("nokiatycoon"));
        get("8").appendChild(get("zntr"));
        get("sorting_button").innerText = "Sortowanie: Data wydania (od najstarszego do najnowszego)";
    } else if (sorting == 3) {
        get("1").appendChild(get("zntr"));
        get("2").appendChild(get("maciejclicker"));
        get("3").appendChild(get("nokiatycoon"));
        get("4").appendChild(get("zepsucnokie"));
        get("5").appendChild(get("skibidi"));
        get("6").appendChild(get("asmrbulka"));
        get("7").appendChild(get("kart"));
        get("8").appendChild(get("mandarynki"));
        get("sorting_button").innerText = "Sortowanie: Czas tworzenia (od najwięcej do najmniej)";
    }
}

changesorting();
