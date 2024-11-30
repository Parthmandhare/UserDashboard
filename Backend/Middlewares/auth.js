
const {z} =  require("zod");
const user = require("../DB");
const jwt = require("jsonwebtoken");

const signupSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    dob: z.string()
})

function checkCredSignup (req,res,next){
    
    const isCorrect = signupSchema.safeParse({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        dob: req.body.dob
    });

    if(isCorrect.success){
        next();
    }else{
        res.status(502).json({
            msg: "Invalid inputs"
        })
    }
}

const loginSchema = z.object({
    email: z.string(),
    password: z.string(),
})

function checkCredLogin (req,res,next){
    
    const isCorrect = loginSchema.safeParse({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        dob: req.body.dob
    });

    if(isCorrect.success){
        next();
    }else{
        res.status(502).json({
            msg: "Invalid inputs"
        })
    }
}

const isThere = (req, res, next) => {
    const token = req.cookies.token; // Read the cookie from the request
  
    if (!token) {
      return res.status(401).json({ msg: "Unauthorized: No token provided." });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Add decoded user info to the request object
      next();
    } catch (error) {
      res.status(403).json({ msg: "Unauthorized: Invalid token." });
    }
  };



module.exports = {checkCredSignup, checkCredLogin, isThere};