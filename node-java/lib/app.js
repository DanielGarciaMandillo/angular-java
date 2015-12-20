var java = require("java");

java.classpath.push("bin/electron-node-java-0.0.1.jar");

//Llamada a instancia util random
var math = java.newInstanceSync("java.util.Random");
var result1 = (math.nextDoubleSync()*10).toFixed(0);
document.getElementById("result1").textContent = result1;

//Llamada a getRandomInteger
var result2 = java.callStaticMethodSync("com.random.Main", "getRandomInteger");
document.getElementById("result2").textContent = result2;