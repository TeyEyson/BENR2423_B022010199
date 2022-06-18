const MongoClient = require("mongodb").MongoClient;
const User = require("./user");
const Visitor = require("./visitor");
const jwt = require("jsonwebtoken");
function generateAccessToken(payload) {
  return jwt.sign(payload, "highly-confidential", {
    expiresIn: "1y"
  });
}

MongoClient.connect(
    "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.u5aiy.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true },    
).catch(err => {
    console.log(err.stack);
    process.exit(1);
}).then(async client => {
    console.log('Connected to MongoDB');
    User.injectDB(client);
    Visitor.injectDB(client);
});

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'RVMS API',
            version: '1.0.0',
        },
        components: {
            securitySchemes: {
                jwt: {
                    type: 'http',
                    scheme: 'bearer',
                    in: 'header',
                    bearerFormat: 'JWT'
                }
            },
            security:[{"jwt":[]}]
        },
    },
    apis: ['./main.js'],
};

const swaggerSpec = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function authentication(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, "highly-confidential", (err, user) => {
        console.log(err);
        if (err) return res.sendStatus(403);
        req.user = user;

        next();
    });
};

/**
 * @swagger
 * /register_user:
 *   post:
 *     description: Register user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               registration_date:
 *                 type: string
 *               position:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful register user
 *       401:
 *         description: Fail to register user
 */
app.post('/register_user', async(req, res) => {

    var user = await User.register_user(req.body.username, req.body.password, req.body.registration_date, req.body.position);
    console.log(user);
    if(user == "fail"){
        res.status(401).send("Fail to register user");
    }
    else{
        res.status(200).json(user);
        console.log(user);
    }
});

/**
 * @swagger
 * /login_user:
 *   post:
 *     description: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login user
 *       401:
 *         description: Fail to login user
 */
app.post('/login_user', async(req, res) => {
    
    var user = await User.login_user(req.body.username, req.body.password);
    if(user == "fail" || user == "invalid password"){
        res.status(401).send("Fail to login user");
    }
    else{
        var token = generateAccessToken({ username: user[0].username, position: user[0].position });
        res.status(200).json([{
            "_id": user[0]._id,
            "username": user[0].username,
            "password": user[0].password,
            "registration_date": user[0].registration_date,
            "token": token,
            "position": user[0].position
        }]);
    }
});

/**
 * @swagger
 * /view_user:
 *   post:
 *     security:
 *       - jwt: []
 *     description: View user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: View user success
 *       401:
 *         description: Fail to view user
 */
app.post('/view_user', authentication, async(req, res) => {
    if(req.user.position == "admin"){

    var user = await User.view_user(req.body.username);
        if(user == "fail"){
        res.status(401).send("Fail to view user");
        }
        else{
        res.status(200).send(user);
        }
    }
    else{
        res.status(401).send("Invalid user");
    }
});

/**
 * @swagger
 * /update_user:
 *   patch:
 *     security:
 *       - jwt: []
 *     description: Update User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               position:
 *                 type: string
 *     responses:
 *       200:
 *         description: Update user success
 *       401:
 *         description: Fail to update user
 *       403:
 *         description: Invalid user
 */
app.patch('/update_user', authentication, async(req, res) => {
    console.log(req.body);
    if(req.user.position == "admin"){

    var user = await User.update_user(req.body.username, req.body.position);
    if(user == "fail"){
        res.status(401).send("Fail to update user");
    }
    else{
        res.status(200).send(user);
    }
    }
    else{
        res.status(403).send("Invalid user");
    }
});

/**
 * @swagger
 * /delete_user:
 *   delete:
 *     security:
 *       - jwt: []
 *     description: Delete User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *              
 *     responses:
 *       200:
 *         description: Delete user success
 *       401:
 *         description: Fail to delete user
 *       403:
 *         description: Invalid user
 */
app.delete('/delete_user', authentication, async(req, res) => {
    console.log(req.body);
    if(req.user.position == "admin"){

    var user = await User.delete_user(req.body.username);
    if(user == "fail"){
        res.status(401).send("Fail to delete user");
    }
    else{
        res.status(200).send(("Successfully delete user"));
    }
    }
    else{
        res.status(403).send("Invalid user");
    }
});

/**
 * @swagger
 * /register_security:
 *   post:
 *     description: Register security
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               registration_date:
 *                 type: string
 *               gate_incharged:
 *                 type: string
 *               position:
 *                 type: string
 *     responses:
 *       200:
 *         description: Register security successful
 *       401:
 *         description: Fail to register security
 */
app.post('/register_security', async(req, res) => {

    var security = await User.register_security(req.body.username, req.body.password, req.body.registration_date, req.body.gate_incharged, req.body.position);
    if(security == "fail"){
        res.status(401).send("Fail to register security");
    }
    else{
        res.status(200).send(security);
    }
});

/**
 * @swagger
 * /login_security:
 *   post:
 *     description: Login security
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login security
 *       401:
 *         description: Fail to login security
 */
app.post('/login_security', async(req, res) => {
        
    var security = await User.login_security(req.body.username, req.body.password);
    if(security == "fail" || security == "invalid password"){
        res.status(401).send("Fail to login security");
    }
    else{
        var token = generateAccessToken({ username: security[0].username, position: security[0].position });
        res.status(200).json([{
            _id: security[0]._id,
            username: security[0].username,
            password: security[0].password,
            token: token,
            registration_date: security[0].registration_date,
            gate_incharged: security[0].gate_incharged,
            position: security[0].position
        }]);
    }
});

/**
 * @swagger
 * /view_security:
 *   post:
 *     security:
 *       - jwt: []
 *     description: View security
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: View security success
 *       401:
 *         description: Fail to view security
 *       403:
 *         description: Invalid user
 */
 app.post('/view_security', authentication, async(req, res) => {
    console.log(req.body);
    if(req.user.position == "admin" || req.user.position == "security"){

    var security = await User.view_security(req.body.username);
    if(security == "fail"){
        res.status(401).send("Fail to view security");
    }
    else{
        res.status(200).send(security);
    }
    }
    else{
        res.status(403).send("Invalid user");
    }
});

/**
 * @swagger
 * /update_security:
 *   patch:
 *     security:
 *       - jwt: []
 *     description: Update security
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               gate_incharged:
 *                 type: string
 *     responses:
 *       200:
 *         description: Update security success
 *       401:
 *         description: Fail to update security
 *       403:
 *         description: Invalid user
 */
app.patch('/update_security', authentication, async(req, res) => {
    console.log(req.body);
    if(req.user.position == "security"|| req.user.position == "admin"){

    var security = await User.update_security(req.body.username, req.body.gate_incharged);
    if(security == "fail"){
        res.status(401).send("Fail to update security");
    }
    else{
        res.status(200).send(security);
    }
    }
    else{
        res.status(403).send("Invalid user");
    }
});

/**
 * @swagger
 * /delete_security:
 *   delete:
 *     security:
 *       - jwt: []
 *     description: Delete security
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *              
 *     responses:
 *       200:
 *         description: Delete security success
 *       401:
 *         description: Fail to delete security
 *       403:
 *         description: Invalid user
 */
app.delete('/delete_security', authentication, async(req, res) => {
    console.log(req.body);
    if(req.user.position == "admin" || req.user.position == "security"){

    var security = await User.delete_security(req.body.username);
    if(security == "fail"){
        res.status(401).send("Fail to delete security");
    }
    else{
        res.status(200).send(("Successfully deleted security"));
    }
    }
    else{
        res.status(403).send("Invalid user");
    }
});


/**
 * @swagger
 * /register_visitor:
 *   post:
 *     description: Register visitor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               NRIC:
 *                 type: string
 *               gender:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               vehicle_no:
 *                 type: string
 *               vaccine_status:
 *                 type: string
 *               venue:
 *                 type: string
 *               parking_lot:
 *                 type: string
 *     responses:
 *       200:
 *         description: Register visitor successful
 *       401:
 *         description: Fail to register visitor
 */
app.post('/register_visitor', async(req, res) => {

    var visitor = await Visitor.register_visitor(req.body.name, req.body.NRIC,req.body.gender,req.body.phone_number,req.body.vehicle_no,req.body.vaccine_status,req.body.venue,req.body.parking_lot);

    if(visitor == "Register failed" || visitor == "You are blacklisted"){
        res.status(401).send("Fail to register visitor");
    }
    else{
        res.status(200).send(visitor);
    }
}
);

/**
 * @swagger
 * /blacklist_visitor:
 *   post:
 *     security:
 *       - jwt: []
 *     description: Blacklist visitor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               blacklist_username:
 *                 type: string
 *               NRIC:
 *                 type: string
 *               blacklist_reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Blacklist visitor success
 *       401:
 *         description: Fail to blacklist visitor
 *       403:
 *         description: Invalid user
 */
app.post('/blacklist_visitor', authentication, async(req, res) => {
    console.log(req.body);
    if(req.user.position == "admin" || req.user.position == "security"){      
    var visitor = await User.blacklist_visitor(req.body.name,req.body.blacklist_username,req.body.NRIC,req.body.blacklist_reason);
    if(visitor == "fail" || visitor == "blacklisted"){
        res.status(401).send("Fail to blacklist visitor");
    }
    else{
        res.status(200).send(visitor);
    }
    }
    else{
        res.status(403).send("Invalid user");
    }    
});

/**
 * @swagger
 * /delete_visitor_record:
 *   delete:
 *     security:
 *       - jwt: []
 *     description: Delete visitor record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *              
 *     responses:
 *       200:
 *         description: Delete visitor record success
 *       401:
 *         description: Fail to delete visitor record
 *       403:
 *         description: Invalid user
 */
app.delete('/delete_visitor_record', authentication, async(req, res) => {
    console.log(req.body);
    if(req.user.position == "admin" || req.user.position == "security"){
    var visitor = await User.delete_visitor_record(req.body.name);
    if(visitor == "Delete failed"){
        res.status(401).send("Fail to delete visitor");
    }
    else{
        res.status(200).send(("Successfully delete visitor"));
    }
    }
    else{
        res.status(403).send("Invalid user");
    }
}
)

/**
 * @swagger
 * /view_all_visitor_record:
 *   get:
 *     security:
 *       - jwt: []
 *     description: view all visitor record
 *     responses:
 *       200:
 *         description: View all visitor record success
 *       401:
 *         description: Fail to view all user record
 */
app.get('/view_all_visitor_record', authentication, async(req, res) => {
    if(req.user.position == "admin" || req.user.position == "security"){
        var visitor = await User.view_all_visitor_record();
        res.status(200).send(visitor);
    }
    else{
        res.status(401).send("Invalid user");
    }
}
)
 

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
);

            







