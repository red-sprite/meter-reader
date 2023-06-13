import reader from "./reader.js"

var username = "dummyUser"
var password = "dummyPass"

var token = reader.getTokenFromUNPW(username, password)

console.log(token)

