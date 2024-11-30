const { Router } = require("express");
require('dotenv').config()
const {checkCredLogin} = require("../Middlewares/auth")
const jwt = require("jsonwebtoken");
const user = require("../DB");


const router = Router();

router.post("/", checkCredLogin, async(req,res) => {

    try{
        const isThere = await user.findOne({ email: req.body.email });

        if(isThere){
            
            if(isThere.password == req.body.password){
                const token = jwt.sign({
                    email: req.body.email,
                    password: req.body.password,
                }, process.env.JWT_secret_key);
            
                res.status(202).json({
                    token: token
                })
            }
            else{
                res.status(404).json({
                    msg: "Incorrect Password"
                })
            }
        }else{
            res.status(404).json({
                msg: "User not found, Register"
            })
        }
    }catch(e) {
        res.status(404).json({
            msg: "Something went wrong try agin later"
        })
    }


})

module.exports = router;