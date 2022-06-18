const MongoClient = require("mongodb").MongoClient;
const Visitor = require("./visitor")

describe("Visitor Account", () => {
	let client;
	beforeAll(async () => {
		client = await MongoClient.connect(
			"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.u5aiy.mongodb.net/?retryWrites=true&w=majority",
			{ useNewUrlParser: true },
		);
		Visitor.injectDB(client);
	})

	afterAll(async () => {
		await client.close();
	})


	// test("Register visitor successful", async () => {
	// 	const res = await Visitor.register_visitor("Yim", "Male", "993462-08-6278", "012-3456789", "Gate A", "BAC345", "Booster", "G-15");
	// 	expect(res).toMatch("Register Successful");
	// })

	// test("Fail to register vicitor", async () => {
	// 	const res = await Visitor.register_visitor("Yim", "Male", "865732-03-6627", "012-3456789", "Gate A", "BAC345", "Booster", "G-15");
	// 	expect(res).toMatch("You are blacklisted");
	// })



	
});