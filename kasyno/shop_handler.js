document.getElementById("goldicon").style.display = "none";
if (!localStorage.boughtItems) {
localStorage.setItem("boughtItems", "[\"none\"]")
}
if (JSON.parse(localStorage.boughtItems).includes("star")) {
if (localStorage.ikonpng == "/premiumikon.png") {
document.getElementById("starprice").innerHTML = "Kliknij aby przestać używać";
} else {
document.getElementById("starprice").innerHTML = "Kliknij aby zacząć używać";
}
}
if (JSON.parse(localStorage.boughtItems).includes("gold")) {
document.getElementById("goldprice").innerHTML = "Kupione";
} else {
document.getElementById("goldprice").innerHTML = "25 tokenów";
}
if (JSON.parse(localStorage.boughtItems).includes("gmac")) {
document.getElementById("maciejprice").innerHTML = "Kupione";
} else {
document.getElementById("maciejprice").innerHTML = "25 tokenów";
}
if (JSON.parse(localStorage.boughtItems).includes("znikon")) {
if (localStorage.ikonpng == "/znikon.png") {
document.getElementById("znikonprice").innerHTML = "Kliknij aby przestać używać";
} else {
document.getElementById("znikonprice").innerHTML = "Kliknij aby zacząć używać";
}
}
if (JSON.parse(localStorage.boughtItems).includes("rmikon")) {
if (localStorage.ikonpng == "/rmikon.png") {
document.getElementById("rmikonprice").innerHTML = "Kliknij aby przestać używać";
} else {
document.getElementById("rmikonprice").innerHTML = "Kliknij aby zacząć używać";
}
}
if (JSON.parse(localStorage.boughtItems).includes("ogikon")) {
if (localStorage.ikonpng == "/ogikon.png") {
document.getElementById("ogikonprice").innerHTML = "Kliknij aby przestać używać";
} else {
document.getElementById("ogikonprice").innerHTML = "Kliknij aby zacząć używać";
}
}

async function itembuy(item) {
  if (item == "star") {
   if (localStorage.ikonpng != "/premiumikon.png") {
     if (JSON.parse(localStorage.boughtItems).includes("star") == false) {
    if (tokens > 74) {
      tokens = tokens - 75;
      document.getElementById("starprice").innerHTML = "Kupione, możliwe że od razu się nie pokaże wszędzie";
      localStorage.setItem("ikonpng", "/premiumikon.png");
      const itemsbought = JSON.parse(localStorage.boughtItems);
      itemsbought.push("star");
      localStorage.setItem("boughtItems", JSON.stringify(itemsbought));
      await sleep(2000);
      document.getElementById("starprice").innerHTML = "Kliknij aby przestać używać";
      document.getElementById("topicon").src = "/ikony/premiumikon.png";
    } else {
      document.getElementById("starprice").innerHTML = "Masz za mało tokenów";
      await sleep(1000);
      document.getElementById("starprice").innerHTML = "100 tokenów";
    }
    } else {
      document.getElementById("starprice").innerHTML = "Kliknij aby przestać używać";
      localStorage.setItem("ikonpng", "/premiumikon.png");
      document.getElementById("topicon").src = "/ikony/premiumikon.png";
    }
   } else {
     localStorage.setItem("ikonpng", "/ikon.png");
     document.getElementById("topicon").src = "/ikony/ikon.png";
     document.getElementById("starprice").innerHTML = "Kliknij aby zacząć używać";
   }
  }

    if (item == "znikon") {
   if (localStorage.ikonpng != "/znikon.png") {
     if (JSON.parse(localStorage.boughtItems).includes("znikon") == false) {
    if (tokens > 9) {
      tokens = tokens - 10;
      document.getElementById("znikonprice").innerHTML = "Kupione, możliwe że od razu się nie pokaże wszędzie";
      localStorage.setItem("ikonpng", "/znikon.png");
      const itemsbought = JSON.parse(localStorage.boughtItems);
      itemsbought.push("znikon");
      localStorage.setItem("boughtItems", JSON.stringify(itemsbought));
      await sleep(2000);
      document.getElementById("znikonprice").innerHTML = "Kliknij aby przestać używać";
      document.getElementById("topicon").src = "/ikony/znikon.png";
    } else {
      document.getElementById("znikonprice").innerHTML = "Masz za mało tokenów";
      await sleep(1000);
      document.getElementById("znikonprice").innerHTML = "10 tokenów";
    }
    } else {
      document.getElementById("znikonprice").innerHTML = "Kliknij aby przestać używać";
      localStorage.setItem("ikonpng", "/znikon.png");
      document.getElementById("topicon").src = "/ikony/znikon.png";
    }
   } else {
     localStorage.setItem("ikonpng", "/ikon.png");
     document.getElementById("topicon").src = "/ikony/ikon.png";
     document.getElementById("znikonprice").innerHTML = "Kliknij aby zacząć używać";
   }
  }

    if (item == "rmikon") {
   if (localStorage.ikonpng != "/rmikon.png") {
     if (JSON.parse(localStorage.boughtItems).includes("rmikon") == false) {
    if (tokens > 19) {
      tokens = tokens - 20;
      document.getElementById("rmikonprice").innerHTML = "Kupione, możliwe że od razu się nie pokaże wszędzie";
      localStorage.setItem("ikonpng", "/rmikon.png");
      const itemsbought = JSON.parse(localStorage.boughtItems);
      itemsbought.push("rmikon");
      localStorage.setItem("boughtItems", JSON.stringify(itemsbought));
      await sleep(2000);
      document.getElementById("rmikonprice").innerHTML = "Kliknij aby przestać używać";
      document.getElementById("topicon").src = "/ikony/rmikon.png";
    } else {
      document.getElementById("rmikonprice").innerHTML = "Masz za mało tokenów";
      await sleep(1000);
      document.getElementById("rmikonprice").innerHTML = "20 tokenów";
    }
    } else {
      document.getElementById("rmikonprice").innerHTML = "Kliknij aby przestać używać";
      localStorage.setItem("ikonpng", "/rmikon.png");
      document.getElementById("topicon").src = "/ikony/rmikon.png";
    }
   } else {
     localStorage.setItem("ikonpng", "/ikon.png");
     document.getElementById("topicon").src = "/ikony/ikon.png";
     document.getElementById("rmikonprice").innerHTML = "Kliknij aby zacząć używać";
   }
    }

    if (item == "ogikon") {
   if (localStorage.ikonpng != "/ogikon.png") {
     if (JSON.parse(localStorage.boughtItems).includes("ogikon") == false) {
    if (tokens > 14) {
      tokens = tokens - 15;
      document.getElementById("ogikonprice").innerHTML = "Kupione, możliwe że od razu się nie pokaże wszędzie";
      localStorage.setItem("ikonpng", "/ogikon.png");
      const itemsbought = JSON.parse(localStorage.boughtItems);
      itemsbought.push("ogikon");
      localStorage.setItem("boughtItems", JSON.stringify(itemsbought));
      await sleep(2000);
      document.getElementById("ogikonprice").innerHTML = "Kliknij aby przestać używać";
      document.getElementById("topicon").src = "/ikony/ogikon.png";
    } else {
      document.getElementById("ogikonprice").innerHTML = "Masz za mało tokenów";
      await sleep(1000);
      document.getElementById("ogikonprice").innerHTML = "20 tokenów";
    }
    } else {
      document.getElementById("ogikonprice").innerHTML = "Kliknij aby przestać używać";
      localStorage.setItem("ikonpng", "/ogikon.png");
      document.getElementById("topicon").src = "/ikony/ogikon.png";
    }
   } else {
     localStorage.setItem("ikonpng", "/ikon.png");
     document.getElementById("topicon").src = "/ikony/ikon.png";
     document.getElementById("rmikonprice").innerHTML = "Kliknij aby zacząć używać";
   }
    }

    if (item == "gold") {
      if (JSON.parse(localStorage.boughtItems).includes("gold") == false) {
        if (tokens > 24) {
          tokens = tokens - 25;
          document.getElementById("goldprice").innerHTML = "Kupione, możliwe że nie pokaże się odrazu w grze";
          const itemsbought = JSON.parse(localStorage.boughtItems);
          itemsbought.push("gold");
          localStorage.setItem("boughtItems", JSON.stringify(itemsbought));
          await sleep(2000);
          document.getElementById("goldprice").innerHTML = "Kupione";
        } else {
          document.getElementById("goldprice").innerHTML = "Masz za mało tokenów";
          await sleep(1000);
          document.getElementById("goldprice").innerHTML = "25 tokenów";
        }
      }
    }

    if (item == "goldmaciej") {
      if (JSON.parse(localStorage.boughtItems).includes("gmac") == false) {
    if (tokens > 24) {
      tokens = tokens - 25;
      document.getElementById("maciejprice").innerHTML = "Kupione, możliwe że nie pokaże się odrazu w grze";
      const itemsbought = JSON.parse(localStorage.boughtItems);
      itemsbought.push("gmac");
      localStorage.setItem("boughtItems", JSON.stringify(itemsbought));
      await sleep(2000);
      document.getElementById("maciejprice").innerHTML = "Kupione";
    } else {
      document.getElementById("maciejprice").innerHTML = "Masz za mało tokenów";
      await sleep(1000);
      document.getElementById("maciejprice").innerHTML = "25 tokenów";
    }
    }
    }
}

function openshop() {
  if (animationhappening == false) {
    showpopup();
    document.getElementById("premiumicon").style.display = "initial";
    document.getElementById("goldicon").style.display = "initial";
    document.getElementById("goldmac").style.display = "initial";
    document.getElementById("shop").style.display = "initial";
    document.getElementById("popuptext").innerHTML = "SKLEP<br>";
  }
}
