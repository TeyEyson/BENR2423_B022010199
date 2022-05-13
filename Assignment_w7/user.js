let users;
const sha1 = require("sha1");

class User {
	static async injectDB(conn) {
		users = await conn.db("assignment").collection("week7");
		//fetch data from the database 										
	}

	static async register(conn, username, password) {
		users = await conn.db("assignment").collection("week7");
		//fetch data from the database 										
		return users.find({username:username}).count().then(res =>{
		//compare the username that already exist in the database 									
			if (res==1){
				console.log("Duplicated Username");
				return "username registration unsuccessful";
				//return the string to the user.test file											
			}
			else {
				console.log("Register New User");					
				var hash_pw = sha1(password);
				//hash the password using sha1															
				users.insertOne({username:username,password:hash_pw});
				//insert the new user into the database									
				return "username registration successful";
			}})};
			

	static async login(conn,username, password) {
		users = await conn.db("assignment").collection("week7");
		//fetch data from the database										
		var hash_pw =  sha1(password);
		//hash the password for login purpose																	
		var log_state = await users.find({"username":username, "password":hash_pw}).count();
		//turn the username and password into variable from user.test			
		return users.find({"username":username}).count().then(res =>{
		//compare the username														
		if (res==1){
			console.log("Howdy!");
				if(log_state == 1){
					console.log("Correct Username & Password, Access Granted");
					users.find({"username":username}).toArray().then(result => {console.log(result)})
					//compare the username and password	 
					return users.find({"username":username}).toArray();
					//return the user object									
				}else{
					console.log("Access Denied Due To Invalid Password");
					return "login unsuccessful due to invalid password";
					//return the string if the password compared is different								
				}			
		}
		else {
			console.log("Access Denieid Due To Inexistent Username");
			return "login unsuccessful due to inexistent username";
			//return the string if the username compared doesn't matchnany of the username in the database										
		}
		
		
		
		});
	}
}

module.exports = User;