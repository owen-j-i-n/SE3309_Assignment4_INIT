const express = require('express');
const app = express();
const dbcon = require('../server/config/db.config');
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRound = 10;

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(express.json());
app.use(cors({
    origin:["http://localhost:3001"],
    methods:["GET", "POST", "PUT"], 
    credentials: true
}));

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
    key: "user_id",
    secret:"subscribe",
    resave: false,
    saveUninitialized: false,
    cookie:{
        expires:60*60*24,
    },
}))

const port = 3000 || process.env.PORT;
app.get('/', (req, res) =>{
    res.send('Hello world');
});

const { response } = require('express');


app.post("/register", (req, res) =>{

    const user_name = req.body.user_name;
    const pass_word = req.body.pass_word;

    bcrypt.hash(pass_word, saltRound, (err, hash)=>{

        if(err){
            console.log(err);
        }
        dbcon.query(
        "INSERT INTO user (user_name, pass_word) VALUES (?,?)",
        [user_name, hash],
        (err, result) => {
            if(err){
                res.send(err);
            }
        }
        );
    });  
});

app.put("/updateProfile", (req, res)=>{
    const fName = req.body.fName;
    const lName = req.body.lName;
    const gender = req.body.gender;
    const phone = req.body.phone;
    const dob = req.body.dob;
    const user_name = req.body.user_name;

    dbcon.query(
    "UPDATE user SET fName = ?, lName = ?, gender = ?, phone = ?, dob = ? WHERE user_name = ?",
    [fName, lName, gender, phone, dob, user_name],
    (err, result) => {
        if(err){
            console.log(err);
        }
    }
    );
});

app.post("/getMember", (req,res) =>{
    const user_id = req.body.user_id;
    const payment = req.body.payment;
    const member_type = req.body.member_type;
    console.log(payment, member_type);
    dbcon.query(
        "INSERT INTO membership (user_id, payment, member_type) VALUES (?, ?, ?)",
        [user_id, payment, member_type],
        (err, result) => {
            if(err){
                console.log(err);
            }   
        }
    );
});

app.get("/getClass", (req,res)=>{
    dbcon.query(
        "SELECT * FROM class;",
        (err,result)=>{
            if(err){
                console.log(err);
            }
            res.send(result);
        }
    );
});

app.post("/addClass", (req,res)=>{
    const user_id = req.body.user_id;
    const class_id = req.body.class_id;

    dbcon.query(
        "INSERT INTO userclass (user_id, class_id) VALUES(?,?)",
        [user_id, class_id],
        (err, result) => {
            if(err){
                console.log(err);
            }   
        }
    );
});

app.post("/deleteClass", (req,res)=>{
    const user_id = req.body.user_id;
    const class_id = req.body.class_id;

    dbcon.query(
        "DELETE FROM userclass WHERE user_id =? and class_id=?;",
        [user_id, class_id],
        (err, result) => {
            if(err){
                console.log(err);
            }   
        }
    );
});

app.post("/getType", (req,res)=>{
    const user_id = req.body.user_id;
    dbcon.query(
        "SELECT * FROM membership where user_id = ?;",
        user_id,
        (err,result)=>{
            if(err){
                console.log(err);
            }
            res.send(result);
        }
    );
});

app.post("/getSchedule", (req, res)=>{
    const user_id = req.body.user_id;
    dbcon.query(
        "SELECT class.class_id, class.class_name FROM userclass LEFT JOIN class ON userclass.class_id = class.class_id WHERE user_id = ?",
        user_id,
        (err,result)=>{
            if(err){
                console.log(err);
            }
            res.send(result);
        }
    );
});


app.get("/login", (req, res)=>{
    if(req.session.user){
        res.send({loggedIn: true, user:req.session.user});
    }else{
        res.send({loggedIn: false});
    }
})

app.post("/login", (req, res) =>{

    const user_name = req.body.user_name;
    const pass_word = req.body.pass_word;

    dbcon.query(
        "SELECT * FROM user WHERE user_name = ?;",
        user_name,
        (err, result) => {
            console.log(err); 
            if(err){
                res.send({err:err});
            }
            if(result.length > 0){
                bcrypt.compare(pass_word, result[0].pass_word, (error, response)=>{
                    if(response){
                        req.session.user = result;
                        console.log(req.session.user);
                        res.send(result);
                    }else{
                        res.send({message: "WRONG PASSWORD"})
                    }
                })
            }else{
                res.send({message: "User does not exist"});
            }
            
        }
    );
});

app.listen(port, () => console.log(`Listening on port ${port}...`));