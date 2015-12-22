var java = require("java");

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