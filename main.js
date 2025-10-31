
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "en-IN";
recognition.interimResults = false;
recognition.continuous = false;

const speakBtn = document.getElementById("speakBtn");
const inputBox = document.getElementById("speechInput");

recognition.onresult = function (e) {
  const text = e.results[0][0].transcript;
  inputBox.value = text;

  // ✅ Send recognized text back to Koha OPAC parent window
  if (window.opener) {
    window.opener.postMessage(text, "http://61.2.213.253:1233"); // your Koha site base URL
  } else {
    alert("No parent window found!");
  }

  // Optionally close the popup after recognition
  setTimeout(() => window.close(), 1000);
};

speakBtn.onclick = function () {
  recognition.start();
};

