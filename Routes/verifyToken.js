const jwt = require('jsonwebtoken');

//verify
module.exports = function (req, res, next){
    const token = req.header("userAuth");
    if(!token) return res.status(401).send("Access denied");

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(err){
        res.status(400).send("invalid token");
    }
}
