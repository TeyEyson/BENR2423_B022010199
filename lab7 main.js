const express = require('express')
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.u5aiy.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(async err => {
    if (err) {
        console.log(err.message)
        return
    }
    console.log('Connected to MongoDB')

	var result;
	result = await client.db('sample_training').collection('zips').find({zip: "35020"}).toArray();
	console.log(result)
	app.get('/read', (req , res) => {
		res.send(result)});


	app.post('/create', async (req, res) => {
		console.log(req.body);	
		client.db('alllab7').collection('lab7').insertOne(req.body);
		const result= await client.db('alllab7').collection('lab7').count({Name: req.body.Name});
		if (result > 0){	
			res.status(200).json({
			message: 'Post request successful'});}})
	 
	app.patch('/update', async (req, res) => {
		client.db('alllab7').collection('lab7').updateOne({name: "WenLong"}, {$set: {name: req.body.name}});
		const result= await client.db('alllab7').collection('lab7').count({name: req.body.name});
		if (result > 0){	
			res.status(200).json({
			message: 'Patch request successful'});}})})

	app.delete('/delete', async (req, res) => {
		client.db('alllab7').collection('lab7').deleteOne({Age : req.body.Age});
		const result= await client.db('alllab7').collection('lab7').count({Age: req.body.Age});
		if (result == 0){	
			res.status(200).json({
			message: 'Delete request successful'});}})

	
	app.listen(port, () => {
		console.log(`Example app listening on port ${port}`)});

