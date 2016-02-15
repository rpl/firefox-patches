console.log("CONTENT SCRIPT");

var port = chrome.runtime.connect({ name: "content-script"});
port.onMessage.addListener((msg) => {
  console.log("CONTENT-SCRIPT RECEIVED", msg);
  port.postMessage("Content script reply -> jetpack");
});

port.onDisconnect.addListener(() => {
  console.log("CONTENT-SCRIPT port disconnected");
});

port.postMessage("<- CONTENT-SCRIPT");
