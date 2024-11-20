const jwt = require('jsonwebtoken')

const userAuth = async (req, res, next) => {
    const { token } = req.headers 
    try {
        if (!token) {
            return res.json({success:false,message:"Not Authorized. Login Again"})
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (token_decode.id) {
            req.body.userId = token_decode.id;
        } else {
             return res.json({success:false,message:"Not Authorized. Login Again"})
        }
        next()
    } catch (error) {
         console.log(error.message);
         res.json({ success: false, message: error.message });
    }
}

module.exports = userAuth