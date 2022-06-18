const MongoClient = require("mongodb").MongoClient;
const bcrypt = require("bcryptjs");

let user, security, visitor, blacklist;

class User {
    static async injectDB(conn) {

        user = await conn.db("RVMS").collection("user");
        security = await conn.db("RVMS").collection("security");
        visitor = await conn.db("RVMS").collection("visitor_record");
        blacklist = await conn.db("RVMS").collection("blacklisted_visitor");

    }

    static async register_user(username,password,registration_date,position) {

        return await user.find({"username":username}).count().then(async res =>{
            if(res == 0){
                var hashed_pw = await bcrypt.hash(password,7);
                    user.insertOne({
                    "username":username,
                    "password":hashed_pw,
                    "registration_date":registration_date,
                    "position":position
                });
                return user.find({"username":username}).toArray();
                }
            else{
                return "fail";
            }
        })
    }

    static async view_user(username) {
        return await user.find({"username":username}).count().then(async res =>{
            if (res == 0){
                return "fail";
            }
            else{
                return user.find({"username":username}).toArray();
            }
        });
    }


    static async login_user(username,password) {
            
        return await user.find({"username":username}).count().then(async res =>{
            if (res == 0){
                return "fail";
            }
            else{
                var res = await user.find({"username":username}).toArray();
                var pass = res.map(b => b.password);
                var result = bcrypt.compareSync(password,String(pass));
                if (result == true){			
                    return user.find({"username": username}).toArray();
                }else {
                    console.log(pass);
                    return "invalid password"}
            }
        })
    }

    static async update_user(username,position) {
         return await user.find({"username":username}).count().then(async res =>{
            if (res == 0){
                return "fail";
            }
            else{
                await user.updateOne({"username":username},{$set:{"position":position}});
                return await user.find({"username":username}).toArray();
            }
        })
    }
    

    static async delete_user(username) {
        return await user.find({"username":username}).count().then(async res =>{
            if (res == 0){
                return "fail";
            }
            else{
                user.deleteOne({"username":username});
                return "success";
            }
        })
    }

    static async register_security(username,password,registration_date,gate_incharged) {

        return await security.find({"username":username}).count().then(async res =>{
            if(res == 0){
                var hashed_pw = await bcrypt.hash(password,7);
                    security.insertOne({
                    "username":username,
                    "password":hashed_pw,
                    "registration_date":registration_date,
                    "gate_incharged":gate_incharged,
                    "position":"security"
                });
                return security.find({"username":username}).toArray();
            }
            else{
                return "fail";
            }
        })
    }

    static async view_security(username) {
        return await security.find({"username":username}).count().then(async res =>{
            if (res == 0){
                return "fail";
            }
            else{
                return security.find({"username":username}).toArray();
            }
        });
    }

    static async login_security(username,password) {
                
        return await security.find({"username":username}).count().then(async res =>{
            if (res == 0){
                return "fail";
            }
            else{
                var res = await security.find({"username":username}).toArray();
                var pass = res.map(b => b.password);
                var result = bcrypt.compareSync(password,String(pass));
                if (result == true){
                    return security.find({"username": username}).toArray();
                }else {
                    console.log(pass);
                    return "invalid password"
                }
            }
        })
    }

    static async update_security(username,gate_incharged) {

        return await security.find({"username":username}).count().then(async res =>{
            if (res == 0){
                return "fail";
            }
            else{
                await security.updateOne({"username":username},{$set:{"gate_incharged":gate_incharged}});
                return await security.find({"username":username}).toArray();
            }
        });
    }

    static async delete_security(username) {

        return await security.find({"username":username}).count().then(async res =>{
            if (res == 0){
                return "fail";
            }
            else{
                security.deleteOne({"username":username});
                return "success";
            }
        });
    }

    static async blacklist_visitor(name, blacklist_username, NRIC, blacklist_reason) {

            return await blacklist.find({"name":name}).count().then(async result =>{
                if(result == 0){
                return await visitor.find({"name":name}).count().then(async res =>{
                    console.log(res);
                    if (res == 0){
                        return "fail";
                    }
                    else{
                        await blacklist.insertOne({name: blacklist_username, NRIC: NRIC, blacklist_reason:blacklist_reason})
                    return await blacklist.find({"name":name}).toArray();
                    }

                })
            }
            else{
                return "blacklisted";
            }
        }
        )        

    }

    static async delete_visitor_record(name) {
    {
            const date = new Date();
            var today_date = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();
            today_date=today_date.split("T");
             var result = await visitor.count( {name: name} );
             if (result > 0) 
             {
                await visitor.deleteMany( { $and: [ {name: name}, {date:today_date[0]} ] } )
                return "Delete successfully"
            }else
            {
                return "Delete failed"
            }
                         
        }
    }

    static async view_all_visitor_record() {
        {
            return await visitor.aggregate( [ {$project: {_id: 0}} ] ).toArray()
        }
    }

}


module.exports = User;
