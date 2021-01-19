const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json())

function retreiveDB(name){
    fs.readFile(name, (err, file) => {
        if (!err){
            return JSON.parse(file);
        }
    })
}

function createUser() {

}

function destroyUser() {

}

function logIn() {

}

function generateToken() {

}

app.post('/register', (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let email = req.body.email

    if (username !== undefined) {
        if (email !== undefined) {
            if (password !== undefined) {
                createUser(username, email, password)
            }
        }    
    }
})

function main() {
    app.listen(3000)
}
main()