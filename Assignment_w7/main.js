const MongoClient = require("mongodb").MongoClient;
const User = require("./user");
const username = "testusername"
const password = "testpassword"

MongoClient.connect(
	// TODO: Connection 
	"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.u5aiy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
	{ useNewUrlParser: true },
).catch(err => {
	console.error(err.stack)
	process.exit(1)
}).then(async client => {
	console.log('Connected to MongoDB');
	User.injectDB(client);
	User.register(client, username, password);
	User.login(client, username, password);
})