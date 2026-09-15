let files = ["mandarynki.wav", "mystery.wav", "wygrales.wav", "zginales.wav", "rozbilem.wav", "mandarynki2.wav", "najwazniejsza.wav", "nieznane.wav", "asmr.wav", "lata.wav"]
let audio = new Audio();
let answered = true;
let maciej_height = 100;

function random(min, max) {
  let num = Math.floor(Math.random() * max) + min
  if (num > max) {
    num = max;
  }
  return num;
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
let wobbling = false;
async function wobble() {
  wobbling = true;
  if (!audio.paused) {
    if (get("maciej_chat").style.height == `${maciej_height}px`) {
      get("maciej_chat").style.height = `${maciej_height + 25}px`;
    } else {
      get("maciej_chat").style.height = `${maciej_height}px`;
    }
  }
  await sleep(random(100, 200));
  if (get("maciej_chat")) {
    wobble();
  }
}

async function checkAudio(analyser, dataArray) {
  if (!audio.paused) {
    await sleep(100);
    checkAudio(analyser, dataArray);
    return;
  }
  if (!get("maciej_chat")) {
    wobbling = false;
    return;
  }
  analyser.getByteFrequencyData(dataArray);
  get("maciej_chat").style.height = "auto";
  const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
  console.log(average)
  if (average < 15) {
    if (answered) {
      await sleep(70);
      checkAudio(analyser, dataArray);
      return;
    }
    let number = random(0, files.length);
    audio.src = `/system/root/audio/gry/${files[number]}`;
    audio.play();
    if (!wobbling) {
      wobble();
    }
    answered = true;
  } else {
    answered = false;
  }
  await sleep(70);
  checkAudio(analyser, dataArray);
  return;
}

async function detectMicInput() { // from ai
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);

    microphone.connect(analyser);
    analyser.fftSize = 2048;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    console.log(get("maciej_chat"))
    maciej_height = get("maciej_chat").clientHeight;

    checkAudio(analyser, dataArray);

  } catch (error) {
    alert(error)
  }
}
