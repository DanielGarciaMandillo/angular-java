var java = require('java');
var mvn = require('node-java-maven');

mvn(function (err, mvnResults) {
  if (err) {
    return console.error('could not resolve maven dependencies', err);
  }
  mvnResults.classpath.forEach(function (c) {
    console.log('adding ' + c + ' to classpath');
    java.classpath.push(c);
  });

});

java.classpath.push("bin/electron-node-java-0.0.1-jar-with-dependencies.jar");

var repository = java.newInstanceSync('com.Repository');

initApp();

function initApp() {

  repository.createTableSync();
  getAllThings();
}

function addThing() {
  var name = document.getElementById('thing').value;
  if (name) {
    document.getElementById('thing').value = '';
    var thing = java.newInstanceSync('com.Item', name);
    repository.insertItemSync(thing);
    getAllThings();
  }
}

function getAllThings() {
  var result = [];
  var thingsList = repository.getDataTableSync();
  for (var i = 0; i < thingsList.sizeSync(); i++) {
    result.push("<li>" + thingsList.getSync(i).getNameSync() + "</li>");
  }
  document.getElementById("results").innerHTML = result.join("");
}