const { Router } = require("express");
require('dotenv').config()
const {checkCredSignup} = require("../Middlewares/auth")
const jwt = require("jsonwebtoken");
const user = require("../DB");


const router = Router();

router.post("/", checkCredSignup, async(req,res) => {

    try{
        const isThere= await user.findOne({email: req.body.email});

        if(!isThere){
            await user.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                dob: req.body.dob
            })
    
            const token = jwt.sign({
                email: req.body.email,
                password: req.body.password,
            }, process.env.JWT_secret_key);
        
            res.status(202).json({
                token: token
            })
        }else{
            res.status(404).json({
                msg: "User already exists, try to login"
            })  
        }
          
    }
    catch(e) {
        console.log(e);
        res.status(404).json({
            msg: "something went wrong"
        })   
    }
    
})

module.exports = router;