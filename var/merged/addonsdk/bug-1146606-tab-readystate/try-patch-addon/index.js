
var tabs = require("sdk/tabs");

tabs.open({
  url: "http://wikipedia.org",
  onOpen(tab) {
    console.log("TAB (open) READY STATE", tab.readyState);
    tab.on("create", (tab) => {
      console.log("TAB (create) READY STATE", tab.readyState);
    });
  },
  onReady(tab) {
    console.log("TAB (ready) READY STATE", tab.readyState);
  },
  onLoad(tab) {
    console.log("TAB (load) READY STATE", tab.readyState);
  },
});
