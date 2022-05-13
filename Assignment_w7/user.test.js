const MongoClient = require("mongodb").MongoClient;
const { test } = require("@jest/globals");
const User = require("./user")

describe("User Account", () => {
	let client;
	beforeAll(async () => {
		client = await MongoClient.connect(
			"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.u5aiy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
			{ useNewUrlParser: true },
		);
		User.injectDB(client);
	})

	afterAll(async () => {
		await client.close();
	})


	test("register new user", async () => {
		const res = await User.register(client,"james", "iamjames")
		expect(res).toBe("username registration successful")
	})

	test("duplicated username", async () => {
		const res = await User.register(client,"james", "iamjames")
		expect(res).toBe("username registration unsuccessful")
	})

	test("inexistent username, access denied", async () => {
		const res = await User.login(client,"jay", "iamjay")
		expect(res).toBe("login unsuccessful due to inexistent username")
	})

	test("wrong password, access denied", async () => {
		const res = await User.login(client,"james", "blablabla")
		expect(res).toBe("login unsuccessful due to invalid password")
	})

	test("Access granted", async () => {
		const res = await User.login(client,"james", "iamjames")
		console.log(res)
		expect(res[0].username).toBe("james")
	})
});

