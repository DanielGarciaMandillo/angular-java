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
  repository.deleteTableSync();
  repository.createTableSync();
  getAllTasks();
}

function addTask() {
  var name = document.getElementById('task').value;
  if (name) {
    document.getElementById('task').value = '';
    var task = java.newInstanceSync('com.Item', name);
    repository.insertItemSync(task);
    getAllTasks();
  }
}

function getAllTasks() {
  var result = [];
  var tasksList = repository.getDataTableSync();
  for (var i = 0; i < tasksList.sizeSync(); i++) {
    result.push("<li>" + tasksList.getSync(i).getNameSync() + "</li>");
  }
  document.getElementById("results").innerHTML = result.join("");
}