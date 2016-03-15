if (!process.argv[2]) {
  console.error(`Usage: ${process.argv[1]} quicksearch.`);
  process.exit(1);
}

var bz = require("bz");

bugzilla = bz.createClient();

bugzilla.searchBugs({ quicksearch: process.argv[2] }, (err, d) => {

  if (err) {
    console.error(err);
    process.exit(2);
  }

  var bugs = d.map((d) => {
    return `** ${d.status} Bug ${d.id} - ${d.summary}: ${d.whiteboard}`;
  });

  console.log(`* BUGZILLA QUICKSEARCH: "${process.argv[2]}"`);
  console.log(bugs.join("\n"));
  process.exit(0);
});
