
let visitor
var result;
let blacklist;
class Visitor {	

	static async injectDB(conn) {
		visitor = await conn.db("RVMS").collection("visitor_record")
		blacklist= await conn.db("RVMS").collection("blacklisted_visitor")
	}

	static async register_visitor(name, NRIC, gender, phone_number, vehicle_no, vaccine_status, venue,parking_lot) 
	{

		var blacklist_visitor= await blacklist.find( { $and: [ {name: name}, {NRIC:NRIC} ] }).count();
		if (blacklist_visitor == 0)
		{
			const date = new Date();
			var visiting_time = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();
			visiting_time=visiting_time.split("T");
			await visitor.insertOne({name: name , NRIC: NRIC, gender: gender, phone_number: phone_number, vehicle_no: vehicle_no, vaccine_Status: vaccine_status, venue: venue, parking_lot: parking_lot, date: visiting_time[0], visiting_time: visiting_time[1]});
			result = await visitor.aggregate([ { $match : {  name: name, visiting_time: visiting_time[0], visiting_time: visiting_time[1] } }, {$project : {_id: 0} }]).toArray();
			if (result[0].name == name && result[0].visiting_time == visiting_time[1])
			{
				return (result);	
			}
            else
            {
                return ("Register failed");
            }
		}else{
			return "You are blacklisted"
		}		
	};

	
	}
module.exports = Visitor;