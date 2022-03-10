const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) return res.json({message: 'Access denied', status: 401})

    try{
        const verified = jwt.verify(token, process.env.SECRET_TOKEN)
        req.user = verified;
        next()
    }catch(err){
        res.json({mess: "invalid token", status: 400})
    }
}

