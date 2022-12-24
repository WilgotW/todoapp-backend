const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    //check if user exist
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send("Email already exists");

    //Hash
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    })
    try{
        const newUser = await user.save();
        res.send(newUser);
    }catch(err){
        res.status(400).send(err);
    }
})

router.post("/login", async (req, res) => {
    
    //check if user exist
    const user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send("Email doesn't exists");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send("Invalid password");

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    
    res.header('userAuth', token).json(token)
    // res.write(decoded)
})

module.exports = router;