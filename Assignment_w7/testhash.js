const sha1 = require("sha1");

const password = "123456";

new_password = sha1(password);

console.log(new_password)