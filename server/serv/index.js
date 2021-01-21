const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const fs = require('fs');

const DBPATH = "./../../db/auth/"

app.use(express.json());
app.use(express.static("./../client"))

function getDate() {
    const currentdate = new Date();
    let date = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + "@"
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    return date.toString()
}

function validateEmail(email) {
    if (email.includes("@") && email.includes(".")) {
        return true;
    }
}

function checkDupUsers (username) {
    let users = JSON.parse(fs.readFileSync(DBPATH + "users.json"));
    if (users[username] != undefined) {
        return 1;
    } 
}

function checkDupEmail(email) {
    let emails = JSON.parse(fs.readFileSync(DBPATH + "/emails.json"));
    if (emails.includes(email)) {
        return 1;
    }
}

function createUser(username, password, email) {
    try {
        if (validateEmail(email)) {
            if(!checkDupUsers(username)) {
                if(checkDupEmail(email)) {
                   return "email.taken";
                }           
            } else {
                return "username.taken";
            }
        } else {
            return "email.invalid"
        }
    } catch (e) {
        return "error";
    }
}

app.post('/register', (req, res) => {
    let n = createUser(req.body.username, req.body.password, req.body.email);
    if (!n) {
        let db = {
            "username": req.body.username,
            "email": req.body.email,
            "password": req.body.password,
            "info": {
                "dateCreated": getDate().toString(),
                "logInLocations": [req.connection.remoteAddress]
            }
        }

        let ls = JSON.parse(fs.readFileSync(DBPATH + "user/users.json"));
        ls[req.body.username] = db;
        fs.writeFileSync(DBPATH + "/users.json", JSON.stringify(ls))
        let es = JSON.parse(fs.readFileSync(DBPATH + "/emails.json"));
        es.push(req.body.email);
        fs.writeFileSync(__dirname + "/emails.json", JSON.stringify(es));


    }
    else { 
        res.send(n)
    }
});

function rand() 
{
    return Math.random(0).toString(36).substr(2);
}
function genToken(length){
    return (rand()+rand()+rand()+rand()).substr(0,length);
};

function generateToken() {
    while (true) {
        let tokens = JSON.parse (fs.readFileSync(__dirname + "/db/sessionIds.json"))
        let token = genToken(40);
        if(!Object.keys(tokens).includes(token)) {
            false;
            return token;
        }
    }
}

function validateToken (token, username) {
    const ls = JSON.parse(fs.readFileSync(__dirname + "/db/sessionIds.json"))
    if (ls[username] == token) {
        return true;
    }
}


app.post('/login', (req, res) => {
    try {
        let user = JSON.parse(fs.readFileSync(__dirname + "/db/users.json"))[req.body.username]
        if(user !== undefined)
        {
            if(user.password == req.body.password) {
                let token = generateToken()
                
                let fl = JSON.parse(fs.readFileSync(__dirname + "/db/user/sessionIds.json"));
            
                fl[req.body.username] = token;

                fs.writeFileSync(__dirname + "/db/user/sessionIds.json", JSON.stringify(fl));
                
                res.send(JSON.stringify({
                    "sessionId": token}))
            } else {
                res.send(JSON.stringify({
                    "error": "password.invalid"
                }));
            }
        } else {
            res.send(JSON.stringify({
                "error": "username.invalid"
            }));
        }
    
        
    } catch (e) {
        res.send(JSON.stringify({
            "error": "serverside"
        }));
    }
})

app.post("/validateToken", (req, res) => {
    if(validateToken(req.body.sessionId, req.body.username)) {
        res.send(JSON.stringify({
            "sessionId": true
        }))
        console.log("true")
    } else {
        res.send(JSON.stringify({
            "sessionId": false
        }))
    }
})


http.listen(3000, () => {
    console.log("Server open")
})

