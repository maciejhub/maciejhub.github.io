let diceresult = 0;
let diceresult2 = 0;
let namedice = "Nic";
let namedice2 = "Nic";
let ryby = 0;
let owce = 0;
let swinie = 0;
let krowy = 0;
let konie = 0;
let pies = 0;
let duzypies = 0;
let playedonce = 0;
  document.getElementById("info").style.display = "initial"; 
  document.getElementById("game").style.display = "none"; 
  document.getElementById("win").style.display = "none";
function rolldice() {
  playedonce = 1;
  diceresult = Math.floor(Math.random() * 13);
  diceresult2 = Math.floor(Math.random() * 13);
  if (diceresult == 0) {
    diceresult = 1;
  }
  if (diceresult2 == 0) {
    diceresult2 = 1;
  }
    if (diceresult < 7) {
  let namedice = "Ryba";
  }
  if (diceresult > 6 && diceresult < 10) {
  let namedice = "Owca";
  }
  if (diceresult == 10) {
  let namedice = "Świnia";
  }
  if (diceresult == 11) {
  let namedice = "Krowa";
  }
  if (diceresult == 12) {
  let namedice = "Lis";
  }
    if (diceresult2 < 7) {
  let namedice2 = "Ryba";
  }
  if (diceresult2 > 6 && diceresult2 < 10) {
  let namedice2 = "Owca";
  }
  if (diceresult2 == 10) {
  let namedice2 = "Świnia";
  }
  if (diceresult2 == 11) {
  let namedice2 = "Koń";
  }
  if (diceresult2 == 12) {
  let namedice2 = "Wilk";
  }
  if (ryby > 0) {
  if (diceresult < 7 || diceresult2 < 7) { // ryby
    if (ryby > 1) {
   ryby += Math.floor(ryby / 2);
} else {
  ryby += 1;
} // else end
} // if end
} else {
  if (diceresult < 7 && diceresult2 < 7) {
    ryby += 1;
  }
}
if (owce > 0) {
  if (diceresult > 6 && diceresult < 10 || diceresult2 > 6 && diceresult2 < 10) { // owce
    if (owce > 1) {
   owce += Math.floor(owce / 2);
    } else {
    owce += 1;
} // else end
} // if end
} else {
  if (diceresult > 6 && diceresult < 10 && diceresult2 > 6 && diceresult2 < 10) {
    owce += 1;
  }
}
  if (swinie > 0) {
 if (diceresult == 10 || diceresult2 == 10) { // swinia
    if (swinie > 1) {
   ryby += Math.floor(swinie / 2);
} else {
  swinie += 1;
} // else end
 } // if end
  } else {
    if (diceresult == 10 && diceresult2 == 10) {
      swinie += 1;
    }
  }
    if (krowy > 0) {
  if (diceresult == 11) { // krowa
    if (krowy > 1) {
   ryby += Math.floor(krowy / 2);
} else {
  krowy += 1;
} // else end
 } // if end
}
 if (konie > 0) {
   if (diceresult2 == 11) { // koń
    if (konie > 1) {
   ryby += Math.floor(konie / 2);
} else {
  konie += 1;
} // else end
 } // if end
 }
 if (diceresult == 12) { // lis
   if (pies == 0) {
   if (ryby > 0) {
   ryby = 1;
   }
   }
   if (pies > 0) {
   pies -= 1;
   }
 }
  if (diceresult2 == 12) { // wilk
   if (duzypies == 0) {
   owce = 0;
   swinie = 0;
   krowy = 0;   
   }
   if (duzypies > 0) {
   duzypies -= 1;
   }
 }
makelowerxd();
refreshconsole();
checkwin();
} // func end
function craftsheep() {
  if (ryby > 5) {
    owce += 1;
    ryby -= 6;
    refreshconsole();
  } else {
    refreshconsole();
    document.getElementById("alert").innerHTML = "Za mało ryb";
    console.log("Za mało ryb");
  } // else end
  makelowerxd();
  checkwin();
} // func end
function craftpig() {
  if (owce > 1) {
    swinie += 1;
    owce -= 2;
    refreshconsole();
  } else {
    refreshconsole();
    document.getElementById("alert").innerHTML = "Za mało owiec";
    console.log("Za mało owiec");
  } // else end
  makelowerxd();
  checkwin();
} // func end
function craftcow() {
  if (swinie > 2) {
    krowy += 1;
    swinie -= 3;
    refreshconsole();
  } else {
    refreshconsole();
    document.getElementById("alert").innerHTML = "Za mało świń";
    console.log("Za mało świń");
  } // else end
  makelowerxd();
  checkwin();
} // func end
function crafthorse() {
  if (krowy > 1) {
    konie += 1;
    krowy -= 2;
    refreshconsole();
  } else {
    refreshconsole();
    document.getElementById("alert").innerHTML = "Za mało krów";
    console.log("Za mało krów");
  } // else end
  checkwin();
  makelowerxd();
} // func end
function craftbigdog() {
  if (swinie > 1) {
    duzypies += 1;
    swinie -= 2;
    refreshconsole();
  } else {
    refreshconsole();
   document.getElementById("alert").innerHTML = "Za mało świń";
   console.log("Za mało świń");
  } // else end
  makelowerxd();
} // func end
function craftdog() {
  if (owce > 0) {
    pies += 1;
    owce -= 1;
    refreshconsole();
  } else {
    refreshconsole();
    document.getElementById("alert").innerHTML = "Za mało owiec";
  } // else end
  makelowerxd();
} // func end
function refreshconsole() {
  console.clear();
    if (diceresult < 7) {
  namedice = "Ryba";
  }
  if (diceresult > 6 && diceresult < 10) {
  namedice = "Owca";
  }
  if (diceresult == 10) {
  namedice = "Świnia";
  }
  if (diceresult == 11) {
  namedice = "Krowa";
  }
  if (diceresult == 12) {
  namedice = "Lis";
  }
    if (diceresult2 < 7) {
  namedice2 = "Ryba";
  }
  if (diceresult2 > 6 && diceresult2 < 10) {
  namedice2 = "Owca";
  }
  if (diceresult2 == 10) {
  namedice2 = "Świnia";
  }
  if (diceresult2 == 11) {
  namedice2 = "Koń";
  }
  if (diceresult2 == 12) {
  namedice2 = "Wilk";
  }
  console.log("Kostka pierwsza: " + namedice);
  console.log("Kostka druga: " + namedice2);
  console.log("Liczba ryb: " + ryby);
  console.log("Liczba owiec: " + owce);
  console.log("Liczba świń: " + swinie);
  console.log("Liczba krów: " + krowy);
  console.log("Liczba koni: " + konie);
  document.getElementById("alert").innerHTML = "Pierwsza kostka: " + namedice + " Druga kostka: " + namedice2;
  document.getElementById("fish").innerHTML = ryby;
  document.getElementById("sheep").innerHTML = owce;
  document.getElementById("pig").innerHTML = swinie;
  document.getElementById("cow").innerHTML = krowy;
  document.getElementById("horse").innerHTML = konie;
  document.getElementById("dog").innerHTML = pies;
  document.getElementById("bigdog").innerHTML = duzypies;
} // func end
refreshconsole();
function hideinfo() {
  namedice = "Nic";
  namedice2 = "Nic";
  document.getElementById("info").style.display = "none"; 
  document.getElementById("game").style.display = "initial"; 
  refreshconsole();
}
function refreshpage() {
  location.reload();
}
function checkwin() {
if (ryby > 0 && owce > 0 && swinie > 0 && krowy > 0 && konie > 0) {
  document.getElementById("info").style.display = "none"; 
  document.getElementById("game").style.display = "none"; 
  document.getElementById("win").style.display = "initial";
}

  }
function makelowerxd() {
   if (ryby > 15) {
   ryby = 15;
 }
  if (owce > 15) {
   owce = 15;
 }
  if (swinie > 15) {
   swinie = 15;
 }
  if (krowy > 15) {
   krowy = 15;
 }
  if (konie > 15) {
   konie = 15;
 }
}