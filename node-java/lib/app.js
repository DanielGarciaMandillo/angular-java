var java = require("java");

java.classpath.push("target/electron-node-java-0.0.1.jar");

var actionsImpl = java.newInstanceSync("com.actions.impl.ActionsImpl");

getItems();

function getItems() {
    var result = java.callMethodSync(actionsImpl, "getItems");
    var list = [];

    for (var i = 0; i < result.sizeSync(); i++) {
        list.push(result.getSync(i).getNameSync());
    };
    document.getElementById("listResults").textContent = list;
};

function addItem() {
    var name = document.getElementById('item').value;
    document.getElementById('item').value = '';

    if (name) {
        var item = java.newInstanceSync("com.item.Item", 1, name);
        java.callMethodSync(actionsImpl, "addItem", item);
        getItems();
    }
};