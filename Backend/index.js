const express= require("express");
const Signup= require("./Components/Signup");
const Login= require("./Components/Login");
const Dashboard= require("./Components/Dashboard");
const cors = require('cors');

const app = express();

app.use(express.json())

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));

app.use("/signup", Signup);
app.use("/login", Login);
app.use("/dashboard", Dashboard);

app.listen(5000);