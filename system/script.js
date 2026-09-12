
//na pewno to kiedyś skończe. obiecuje
let directory = "/"

function get(element) {
   return document.getElementById(element)
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

async function remove_listeners(audio, player, popupnumber, func1, func2) {
  if (player.parentElement.id !== `popup_content${popupnumber}`) {
    audio.removeEventListener("timeupdate", func1);
    player.removeEventListener("click", func2);
    audio.pause();
    return;
  }
  await sleep(100);
  remove_listeners(audio, player, popupnumber, func1, func2);
}

function format_time(time) {
  let minutes = Math.floor(Number(time) / 60);
  if (minutes.toString().length == 1) {
    minutes = `0${minutes}`;
  }
  let seconds = Number(time) - 60 * minutes;
  if (seconds.toString().length == 1) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

function audio_player_stuff(audio, popupnumber) {
  let player = get("gay_gay_gay").cloneNode(true);
  let time_text = player.querySelectorAll("div")[2]
  get(`popup_content${popupnumber}`).appendChild(player);
  player.querySelector("button").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30"><path fill="white" d="M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z"/></svg>';
  player.querySelector("div").style.display = "flex";
  let duration = 0;
  let formatted_duration = "00:00";
  audio.onloadedmetadata = function() {
    duration = Math.round(audio.duration).toString();
    if (duration.length == 1) {
      duration = `0${duration}`
    }
    time_text.innerText = `00:00 / ${formatted_duration}`;
  };
  time_text.innerText = `00:00 / 00:00`;
  const clicked_func = () => {
    if (player.parentElement.id !== `popup_content${popupnumber}`) {
      return;
    }
    if (!audio.paused) {
      audio.pause();
      player.querySelector("button").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30"><path fill="white" d="M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z"/></svg>';
    } else {
      player.querySelector("button").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M176 96C149.5 96 128 117.5 128 144L128 496C128 522.5 149.5 544 176 544L240 544C266.5 544 288 522.5 288 496L288 144C288 117.5 266.5 96 240 96L176 96zM400 96C373.5 96 352 117.5 352 144L352 496C352 522.5 373.5 544 400 544L464 544C490.5 544 512 522.5 512 496L512 144C512 117.5 490.5 96 464 96L400 96z" fill="white"/></svg>';
      audio.play();
    }
  }
  const timeupdate_func = () => {
    let current_time = Math.round(audio.currentTime).toString();
    if (current_time.length == 1) {
      current_time = `0${current_time}`
    }
    let formatted_time = format_time(current_time);
    time_text.innerText = `${formatted_time} / ${format_time(duration)}`;
    player.querySelectorAll("div")[4].style.width = `${(100 / duration) * Number(current_time)}px`;
    if (audio.paused) {
      player.querySelector("button").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30"><path fill="white" d="M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z"/></svg>';
    }
  }

  audio.addEventListener('timeupdate', timeupdate_func);
  player.addEventListener("click", clicked_func);
  remove_listeners(audio, player, popupnumber, timeupdate_func, clicked_func);
  clicked_func();
}

function video_player_stuff(link, popupnumber) {
  let player = get("video_player_top").cloneNode(true);
  console.log(player)
  get(`popup_content${popupnumber}`).appendChild(player);
  player.style.display = "flex";
  let video = player.querySelector("video");
  video.src = link;
  let progress_width = 0
  video.onloadedmetadata = function() {
    duration = Math.round(video.duration).toString();
    if (duration.length == 1) {
      duration = `0${duration}`
    }
    if (video.clientWidth > video.clientHeight) {
      player.querySelector("video").style.maxWidth = "110%";
    } else {
      player.querySelector("video").style.maxWidth = "70%";
    }

    console.log(`${video.clientWidth}x${video.clientHeight}`)
    let video_width = player.querySelector("video").clientWidth
    if (video_width < 230) {
      video_width = 230;
    }
    player.querySelector("div").style.width = `${video_width + 2}px`;
    player.querySelectorAll("div")[4].style.width = `${video_width + 30}px`;
    progress_width = (player.querySelector("div").clientWidth - (player.querySelector("button").clientWidth + player.querySelectorAll("div")[1].clientWidth)) - 40
    player.querySelectorAll("div")[1].innerText = `00:00 / 00:${duration}`;
    player.querySelectorAll("div")[2].style.width = `${progress_width}px`
  };
  video.addEventListener("timeupdate", function () {
    let current_time = Math.round(video.currentTime).toString();
    if (current_time.length == 1) {
      current_time = `0${current_time}`
    }
    let formatted_time = format_time(current_time);
    player.querySelectorAll("div")[1].innerText = `${formatted_time} / ${format_time(duration)}`;
    player.querySelectorAll("div")[3].style.width = `${(progress_width / duration) * Number(current_time)}px`;
    if (video.paused) {
      player.querySelector("button").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="22" height="22"><path fill="white" d="M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z"/></svg>';
    }
  });
  player.querySelector("button").addEventListener("click", function () {
    if (!video.paused) {
      video.pause();
      player.querySelector("button").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="22" height="22"><path fill="white" d="M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z"/></svg>';
    } else {
      player.querySelector("button").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M176 96C149.5 96 128 117.5 128 144L128 496C128 522.5 149.5 544 176 544L240 544C266.5 544 288 522.5 288 496L288 144C288 117.5 266.5 96 240 96L176 96zM400 96C373.5 96 352 117.5 352 144L352 496C352 522.5 373.5 544 400 544L464 544C490.5 544 512 522.5 512 496L512 144C512 117.5 490.5 96 464 96L400 96z" fill="white"/></svg>';
      video.play();
    }
  });
  video.play()
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
  const download_button = "<button style='z-index: 2;' class='centerpopupbutton'>Pobierz</button>"
  if (type == "image") {
    popupnumber = createnewpopup("mediapopup", `<img src=${link} style="max-width: 40vw; max-height: 40vh"/>`, download_button);
    get(`popup_content${popupnumber}`).parentElement.parentElement.width = `${get(`popup_content${popupnumber}`).querySelector("img").clientWidth}px`;
  } else if (type == "video") {
    popupnumber = createnewpopup("mediapopup", ``, download_button);
    video_player_stuff(link, popupnumber)
  } else if (type == "text") {
    popupnumber = createnewpopup("mediapopup", link.split("|")[1], download_button);
  } else if (type == "custom") {
    popupnumber = createnewpopup("mediapopup", link.split("|")[2], "");
  } else if (type == "audio") {
    let audio = new Audio(link);
    popupnumber = createnewpopup("mediapopup", "", download_button, audio);
    audio_player_stuff(audio, popupnumber)
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
    if (link.includes(".jpg") || link.includes(".webp") || link.includes(".png")) {
      format = "image";
    } else if (link.includes(".mp4")) {
      format = "video";
    } else if (link.includes(".wav") || link.includes(".mp3")) {
      format = "audio";
    } else if (link.includes("txt")) {
      format = "text";
    }
    if (link.includes("custom")) {
      format = "custom";
    }

    if (format == "image" && !link.includes("instrukcja.webp")) {
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
    } else if (link.includes("instrukcja.webp")) {
      newfile.querySelector("img").src = `video.png`;
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
