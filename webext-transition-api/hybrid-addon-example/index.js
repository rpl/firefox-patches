const webext = require('webextension/transition-api');

const log = (msg) => dump(`AddonSDK - ${msg}\n`);

webext.then((transitionAPI) => {
  log(`webextension loaded? ${transitionAPI.loaded}`);

  transitionAPI.onConnect.addListener((port) => {
    log(`received a connection port with name: ${port.name}`);

    port.onDisconnect.addListener(() => { log("ort disconnected"); });

    port.onMessage.addListener(function(msg) {
      log(`port received msg: ${JSON.stringify(msg)}`);
    });

    port.postMessage("Addon-SDK postMessage -> webext");

  });
});

exports.onUnload = () => {
  webext.then((transitionAPI) => {
    log(`webextension unloaded? ${transitionAPI.unloaded}`);
  });
};
