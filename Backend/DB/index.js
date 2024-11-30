const { default: mongoose, Schema } = require("mongoose");

mongoose.connect(process.env.DB_Connection_URL).then((res) => {
    console.log("DB is connected");
}).catch((err) => {
    console.log(err);
});

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    dob: String
})

const user = mongoose.model("user", userSchema);

module.exports = user