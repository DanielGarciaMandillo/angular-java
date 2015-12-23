var java = require('java');
java.classpath.push("bin/electron-node-java-0.0.1-jar-with-dependencies.jar");

var repository = java.newInstanceSync('main.todo.Repository');

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
    var task = java.newInstanceSync('main.todo.Item', name);
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