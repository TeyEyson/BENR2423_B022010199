const MongoClient = require("mongodb").MongoClient;
// const { default: test } = require("node:test");
const User = require("./user")
const Visitor = require("./visitor")

describe("User", () => {
    let client;
    beforeAll(async () => {
        client = await MongoClient.connect(
            "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.u5aiy.mongodb.net/?retryWrites=true&w=majority",
            { useNewUrlParser: true },
        );
        User.injectDB(client);
    });
    
    afterAll(async () => {
        await client.close();
    });

    // test("Register user successful", async () => {
    //     var result = await User.register_user("test1", "test2", "test3", "test4");
    //     expect(result).toEqual(
    //         expect.arrayContaining([
    //             {
    //                 _id:expect.anything(),
    //                 "username": "test1",
    //                 "password": expect.any(String),
    //                 "registration_date": "test3",
    //                 "position": "test4"
    //             }
    //         ])
    //     );
    // });

    // test("Register user unsuccessful", async () => {
    //     var result = await User.register_user("test1", "test2", "test3", "test4");
    //     expect(result).toEqual("fail");
    // });

    // test("View user successful", async () => {
    //     var result = await User.view_user("test1");
    //     expect(result).toEqual(
    //         expect.arrayContaining([
    //             {
    //                 _id:expect.anything(),
    //                 "username": expect.any(String),
    //                 "password": expect.any(String),
    //                 "registration_date": expect.any(String),
    //                 "position": expect.any(String)
    //             }
    //         ])
    //     );
    // });

    // test("View user unsuccessful", async () => {
    //     var result = await User.view_user("test1");
    //     expect(result).toEqual("fail");
    // });

    // test("Login user successful", async () => {
    //     var result = await User.login_user("test1", "test2");
    //     expect(result).toEqual(
    //         expect.arrayContaining([
    //             {
    //                 _id:expect.anything(),
    //                 "username": "test1",
    //                 "password": expect.any(String),
    //                 "registration_date": "test3",
    //                 "position": "test4"
    //             }
    //         ])
    //     );
    // });

    // test("Login user unsuccessful due to invalid username", async () => {
    //     var result = await User.login_user("test1", "test2");
    //     expect(result).toEqual("fail");
    // });

    // test("Login user unsuccessful due to invalid password", async () => {
    //     var result = await User.login_user("test1", "test2");
    //     expect(result).toEqual("invalid password");
    // });

    // test("Update user successful", async () => {
    //     var result = await User.update_user("test1","testd");
    //     expect(result).toEqual("success");
    // });

    // test("Update user unsuccessful", async () => {
    //     var result = await User.update_user("testz","testd");
    //     expect(result).toEqual("fail");
    // });

    // test("Delete user successful", async () => {
    //     var result = await User.delete_user("test1");
    //     expect(result).toEqual("success");
    // });

    // test("Delete user unsuccessful", async () => {
    //     var result = await User.delete_user("test1");
    //     expect(result).toEqual("fail");
    // });

    // test("Register security successful", async () => {
    //     var result = await User.register_security("test1", "test2", "test3", "test4", "test5");
    //     expect(result).toEqual(
    //         expect.arrayContaining([
    //             {
    //                 _id:expect.anything(),
    //                 "username": "test1",
    //                 "password": expect.any(String),
    //                 "registration_date": "test3",
    //                 "gate_incharged": "test4",
    //                 "position": "security"
    //             }
    //         ])
    //     );
    // });

    // test("Register security unsuccessful", async () => {
    //     var result = await User.register_security("test1", "test2", "test3", "test4", "test5");
    //     expect(result).toEqual("fail");
    // });

    // test("View security successful", async () => {
    //     var result = await User.view_security("test1");
    //     expect(result).toEqual(
    //         expect.arrayContaining([
    //             {
    //                 _id:expect.anything(),
    //                 "username": expect.any(String),
    //                 "password": expect.any(String),
    //                 "registration_date": expect.any(String),
    //                 "position": "security",
    //                 "gate_incharged": expect.any(String)
    //             }
    //         ])
    //     );
    // });

    // test("View security unsuccessful", async () => {
    //     var result = await User.view_security("test1");
    //     expect(result).toEqual("fail");
    // });

    // test("Login security successful", async () => {
    //     var result = await User.login_security("test1", "test2");
    //     expect(result).toEqual(
    //         expect.arrayContaining([
    //             {
    //                 _id:expect.anything(),
    //                 "username": "test1",
    //                 "password": expect.any(String),
    //                 "registration_date": "test3",
    //                 "position": "security",
    //                 "gate_incharged": "test4"
    //             }
    //         ])
    //     );
    // });

    // test("Login security unsuccessful due to invalid username", async () => {
    //     var result = await User.login_security("test123", "test2");
    //     expect(result).toEqual("fail");
    // });

    // test("Login security unsuccessful due to invalid password", async () => {
    //     var result = await User.login_security("test1", "test123");
    //     expect(result).toEqual("invalid password");
    // });

    // test("Update security successful", async () => {
    //     var result = await User.update_security("test1","testz");
    //     expect(result).toEqual("success");
    // });

    // test("Update security unsuccessful", async () => {
    //     var result = await User.update_security("testz");
    //     expect(result).toEqual("fail");
    // });

    // test("Delete security successful", async () => {
    //     var result = await User.delete_security("test1");
    //     expect(result).toEqual("success");
    // });

    // test("Delete security unsuccessful", async () => {
    //     var result = await User.delete_security("test123");
    //     expect(result).toEqual("fail");
    // });

    // test("Successful blacklist visitor", async () => {
	// 	var res = await User.blacklist_visitor("Yim","Yim", "865732-03-6627", "Unauthorized Intruder")
	// 	expect(res).toMatch("Blacklist Successfully")
	// })

    // test("Unsuccessful blacklist visitor", async () => {
    // 	var res = await User.blacklist_visitor("Yim","Yim", "865732-03-6627", "Unauthorized Intruder")
    // 	expect(res).toMatch("blacklisted")
    // }
    // )

    // test("Delete visitor successful", async () => {
    //     var result = await User.delete_visitor_record("Yim");
    //     expect(result).toEqual("Delete successfully");
    // }
    // );

    // test("Delete visitor unsuccessful", async () => {
    //     var result = await User.delete_visitor_record("test123");
    //     expect(result).toEqual("Delete failed");
    // }
    // );

    // test("View all visitor record successful", async () => {
    //     var result = await User.view_all_visitor_record();
    //     expect(result).toEqual(
    //         expect.arrayContaining([
    //             {
    //                 "name": expect.any(String),
    //                 "identification_number": expect.any(String),
    //                 "gender":expect.any(String),
    //                 "phone_number": expect.any(String), 
    //                 "vehicle_no": expect.any(String), 
    //                 "vaccine_Status": expect.any(String), 
    //                 "venue": expect.any(String), 
    //                 "parking_lot": expect.any(String), 
    //                 "date": expect.any(String), 
    //                 "visiting_time": expect.any(String)
    //             }
    //         ])
    //     );
    // }
    // );










});
