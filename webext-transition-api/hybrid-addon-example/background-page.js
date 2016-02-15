console.log("BACKGROUND PAGE");

var port = chrome.runtime.connect({ name: "background-page"});
port.onMessage.addListener((msg) => {
  console.log("BACKGROUND PAGE RECEIVED", msg);
  port.postMessage("Background page reply -> jetpack");
});

port.onDisconnect.addListener(() => {
  console.log("BACKGROUND PAGE port disconnected");
});

port.postMessage("<- BACKGROUND PAGE");
