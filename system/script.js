
//na pewno to kiedyś skończe. obiecuje
let directory = "/"

function get(element) {
   return document.getElementById(element)
}
const file_system =
{
  "name": "/",
  "contents": [
    {
      "name": "Zdjecia",
      "type": "folder",
      "contents": [
        {
          "name": "Ciekawe",
          "type": "folder",
          "contents": [
            {
              "name": "Wycieczka.jpg",
              "type": "file",
              "contents": "root/zdjecia/ciekawe/autokar.jpg"
            },
            {
              "name": "Michaszek.jpg",
              "type": "file",
              "contents": "root/zdjecia/ciekawe/michaszek.jpg"
            },
            {
              "name": "Nokia w niebie.webp",
              "type": "file",
              "contents": "root/zdjecia/ciekawe/nokia.webp"
            },
            {
              "name": "Do widzenia.webp",
              "type": "file",
              "contents": "root/zdjecia/ciekawe/pou.webp"
            },
            {
              "name": "Obiad w szkole.webp",
              "type": "file",
              "contents": "root/zdjecia/ciekawe/banan.webp"
            },
            {
              "name": "Lekcja matematyki.jpg",
              "type": "file",
              "contents": "root/zdjecia/ciekawe/kalkulator.jpg"
            },
            {
              "name": "Najlepsze zdjęcie.jpg",
              "type": "file",
              "contents": "root/zdjecia/ciekawe/maciej.jpg"
            },
            {
              "name": "Ej, myślisz że trafię?.jpg",
              "type": "file",
              "contents": "root/zdjecia/ciekawe/sloik.jpg"
            },
          ]
        },
        {
          "name": "Gry",
          "type": "folder",
          "contents": [
            {
              "name": "Logo",
              "type": "folder",
              "contents": [
                {
                  "name": "maciej clicker.jpg",
                  "type": "file",
                  "contents": "root/zdjecia/gry/logo/maciej.jpg"
                },
                {
                  "name": "skibidi toilet or creeper: the gra.jpg",
                  "type": "file",
                  "contents": "root/zdjecia/gry/logo/skibidi.jpg"
                },
                {
                  "name": "zepsuć nokie gry.jpg",
                  "type": "file",
                  "contents": "root/zdjecia/gry/logo/nokia.jpg"
                },
                {
                  "name": "rzucać mandarynki do kibla: THE GRA.jpg",
                  "type": "file",
                  "contents": "root/zdjecia/gry/logo/mandarynki.jpg"
                },
                {
                  "name": "asmr bułka: THE GRA.jpg",
                  "type": "file",
                  "contents": "root/zdjecia/gry/logo/asmr.jpg"
                },
                {
                  "name": "censored KART.jpg",
                  "type": "file",
                  "contents": "root/zdjecia/gry/logo/kart.jpg"
                }
              ]
            },
            {
              "name": "zepsuć nokie tło.jpg",
              "type": "file",
              "contents": "root/zdjecia/gry/nokia.jpg"
            },
            {
              "name": "rzucać mandarynki tło.jpg",
              "type": "file",
              "contents": "root/zdjecia/gry/mandarynki.jpg"
            },
            {
              "name": "bułka.jpg",
              "type": "file",
              "contents": "root/zdjecia/gry/bulka.jpg"
            }
          ]
        },
      ]
    },
    {
      "name": "Wideo",
      "type": "folder",
      "contents": [
        {
          "name": "Motywacja",
          "type": "folder",
          "contents": [
            {
              "name": "Kasyno 1",
              "type": "file",
              "contents": "root/wideo/motywacja/lebron1.mp4"
            },
            {
              "name": "Kasyno 2",
              "type": "file",
              "contents": "root/wideo/motywacja/lebron2.mp4"
            },
            {
              "name": "Kasyno 3",
              "type": "file",
              "contents": "root/wideo/motywacja/lebron3.mp4"
            }
          ]
        },
      ]
    },
    {
      "name": "Audio",
      "type": "folder",
      "contents": [
        {
          "name": "Gry",
          "type": "folder",
          "contents": [
            {
              "name": "Wygrałeś.wav",
              "type": "file",
              "contents": "root/audio/gry/wygrales.wav"
            },
            {
              "name": "Zginąłeś.wav",
              "type": "file",
              "contents": "root/audio/gry/zginales.wav"
            },
            {
              "name": "Mystery box.wav",
              "type": "file",
              "contents": "root/audio/gry/mystery.wav"
            },
            {
              "name": "Mandarynki.wav",
              "type": "file",
              "contents": "root/audio/gry/mandarynki.wav"
            }
          ]
        },
      ]
    },
    {
      "name": "Ważne",
      "type": "folder",
      "contents": [
        {
          "name": "Jak zarabiać kasę.txt",
          "type": "file",
          "contents": "root/wazne/money.txt|1. Wejdź na <a href='/'>strone maciej hub</a><br>2. Przeczytaj instrukcję obsługi i idź do <a href='/kasyno'>kasyna</a><br>3. Kręć maszynę<br>4. Wygrywaj (jeżeli nie wygrasz to kręć dalej niedługo wygrasz)"
        },
        {
          "name": "The Bosses",
          "type": "file",
          "contents": "custom|root/wazne/bosses.webp|Graj w <a href='https://bosses.page.link/video_pr1'>The Bosses</a>"
        }
      ]
    }
  ]
}


async function renderdirectory(path) {
  await sleep(50);
  while (document.getElementById("basefile2")) {
    document.getElementById("basefile2").remove();
  }

  let current = file_system;
  let parts = path.split("/").filter(p => p);

  for (let part of parts) {
    current = current.contents.find(item => item.name === part);
    if (!current) {
      return;
    }
  }
  parts.pop()

  if (directory !== "/") {
    if (directory !== "") {
      renderfile("folder", "..", parts.join("/"));
    }
  }

  for (let i = 0; i < current.contents.length; i++) {
    let file = current.contents[i];
    if (file.type == "file") {
      renderfile(file.type, file.name, file.contents);
    } else {
      renderfile(file.type, file.name, `${path}/${file.name}`);
    }
  }
}

renderdirectory("/");

function audio_player_stuff(link, popupnumber) {
  let player = get("audio_player");
  get(`popup_content${popupnumber}`).appendChild(player);
  get("progress_bar").style.width = "0px";
  get("audio_player").querySelector("button").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30"><path fill="white" d="M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z"/></svg>';
  audio = new Audio(link);
  player.style.display = "flex";
  let duration
  audio.onloadedmetadata = function() {
    duration = Math.round(audio.duration).toString();
    if (duration.length == 1) {
      duration = `0${duration}`
    }
    get("kill_everyone").innerText = `00:00 / 00:${duration}`;
  };
  get("kill_everyone").innerText = `00:00 / 00:00`;
  audio.addEventListener('timeupdate', () => {
    if (player.parentElement.id !== `popup_content${popupnumber}`) {
      return;
    }
    let current_time = Math.round(audio.currentTime).toString();
    if (current_time.length == 1) {
      current_time = `0${current_time}`
    }
    get("kill_everyone").innerText = `00:${current_time} / 00:${duration}`;
    get("progress_bar").style.width = `${(100 / duration) * Number(current_time)}px`;
    if (audio.paused) {
      get("audio_player").querySelector("button").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30"><path fill="white" d="M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z"/></svg>';
    }
  });
  player.addEventListener("click", function () {
    if (player.parentElement.id !== `popup_content${popupnumber}`) {
      return;
    }
    if (!audio.paused) {
      audio.pause();
      get("audio_player").querySelector("button").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30"><path fill="white" d="M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z"/></svg>';
    } else {
      player.querySelector("button").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M176 96C149.5 96 128 117.5 128 144L128 496C128 522.5 149.5 544 176 544L240 544C266.5 544 288 522.5 288 496L288 144C288 117.5 266.5 96 240 96L176 96zM400 96C373.5 96 352 117.5 352 144L352 496C352 522.5 373.5 544 400 544L464 544C490.5 544 512 522.5 512 496L512 144C512 117.5 490.5 96 464 96L400 96z" fill="white"/></svg>';
      audio.play();
      console.log(audio.paused);
    }
  });
  player.dispatchEvent(new Event("click"));
}

function download(link, name) {
  let file = link;
  if (link.includes("|")) {
    file = link.split("|")[0]
  }
  const a = document.createElement("a");
  a.download = name.split(".")[0]
  a.href = file;
  a.click();
  a.remove();
}

function createmediapopup(type, link, name) {
  let popupnumber;
  console.log(`Creating ${type} from ${link}`);
  const download_button = "<button class='centerpopupbutton'>Pobierz</button>"
  if (type == "image") {
    popupnumber = createnewpopup("mediapopup", `<img src=${link} style="max-width: 40vw; max-height: 40vh"/>`, download_button);
    get(`popup_content${popupnumber}`).parentElement.parentElement.width = `${get(`popup_content${popupnumber}`).querySelector("img").clientWidth}px`;
  } else if (type == "video") {
    popupnumber = createnewpopup("mediapopup", `<video src=${link} style="margin-bottom: -24px; max-width: 40vw; max-height: 40vh" controls autoplay></video>`, download_button);
  } else if (type == "text") {
    popupnumber = createnewpopup("mediapopup", link.split("|")[1], download_button);
  } else if (type == "custom") {
    popupnumber = createnewpopup("mediapopup", link.split("|")[2], "");
  } else if (type == "audio") {
    popupnumber = createnewpopup("mediapopup", "", download_button, true);
    audio_player_stuff(link, popupnumber)
  }
  if (type !== "custom") {
    get(`secondpopupbutton${popupnumber}`).querySelector("button").onclick = () => download(link, name);
  }
  return popupnumber
}

function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) { // stolen from stack overflow
    let ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return { width: srcWidth*ratio, height: srcHeight*ratio };
 }

function renderfile(type, name, link) {
  if (name == "..") {
    console.log(link)
  }
  let newfile = get("basefile").cloneNode(true);
  let format = "idk";
  newfile.querySelector("button").style.display = "flex";
  newfile.querySelector("h2").innerText = name;
  newfile.id = "basefile2"
  if (type == "folder") {
    newfile.querySelector("img").src = "folder.png"
    newfile.querySelector("img").width = 64
    newfile.querySelector("img").height = 64
  } else {
    if (link.includes(".jpg") || link.includes(".webp") && !link.includes("custom")) {
      format = "image";
    } else if (link.includes(".mp4")) {
      format = "video";
    } else if (link.includes(".wav")) {
      format = "audio";
    } else if (link.includes("txt")) {
      format = "text";
    } else {
      format = "custom";
    }

    if (format == "image") {
      newfile.querySelector("img").src = `${link}`;
      newfile.querySelector("img").style.display = "none";
      newfile.querySelector("img").addEventListener("load", function () {
        let res = calculateAspectRatioFit(newfile.querySelector("img").width, newfile.querySelector("img").height, 64, 64)
        newfile.querySelector("img").width = res["width"]
        newfile.querySelector("img").height = res["height"]
        newfile.querySelector("img").style.display = "inline";
      });
    } else if (format == "custom") {
      newfile.querySelector("img").src = link.split("|")[1];
      newfile.querySelector("img").width = 64
      newfile.querySelector("img").height = 64
    } else {
      newfile.querySelector("img").src = `${format}.png`;
      newfile.querySelector("img").width = 64
      newfile.querySelector("img").height = 64
    }
  }

  document.getElementById("files").appendChild(newfile);
  let open = false
  let popupnumber
  newfile.addEventListener("click", function () {
    if (!get(`popup_content${popupnumber}`)) {
      open = false
    }
    if (type == "folder") {
      directory = link
      renderdirectory(directory)
    } else {
      if (open) {
        if (get(`popup_content${popupnumber}`).parentElement.parentElement) {
          get("audio_player").style.display = "none";
          get("gay_gay_gay").appendChild(get("audio_player"));
          get(`popup_content${popupnumber}`).parentElement.parentElement.remove();
        } else {
          popupnumber = createmediapopup(format, link, name);
          open = true;
        }
        open = false
      } else {
        popupnumber = createmediapopup(format, link, name);
        open = true;
      }
    }
  });
}
