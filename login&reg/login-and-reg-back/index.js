const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/myLRPDB', {
    useNewUrlParser: true,
    useUnifiedtopology: true
}, () => {
    console.log("DB is Connected");
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    pass: String,

});

const User = new mongoose.model("User", userSchema);


app.post("/login", (req, res) => {
    const { email, pass } = req.body;
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            if (pass === user.pass) {
                res.send({ message: "login successfully", user: user })
            } else {
                res.send({ message: "password didn't match" });
            }
        } else {
            res.send({ message: "user not registered" });
        }
    });
});

app.post("/reg", (req, res) => {
    const { name, email, pass } = req.body;
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: "user already register" });
        } else {
            const user = new User({
                name,
                email,
                pass
            })
            user.save(err => {
                if (err) {
                    res.send(err)

                }
                else {
                    res.send({ message: "successful" });
                }

            })
        }
    })

});

app.listen(3003, () => {
    console.log("server is running on port number 3003 ");
})