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

java.classpath.push("bin/electron-node-java-0.0.1.jar");

var repository = java.newInstanceSync('com.items.Repository');

getItems();

function addItem() {
  var name = document.getElementById('item').value;

  if (name) {
    document.getElementById('item').value = '';

    var item = java.newInstanceSync('com.items.Item', name);

    repository.addItemSync(item);

    getItems();
  }
}

function getItems() {
  var result = [];
  var itemList = repository.getItemsSync();

  for (var i = 0; i < itemList.sizeSync(); i++) {
    result.push(itemList.getSync(i).getNameSync());
  }

  document.getElementById("listResults").textContent = result;
}