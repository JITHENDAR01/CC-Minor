const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    //console.log(token)
    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }
    //const token = authHeader.split(' ')[1]; 
    jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
        if (err) {
            return res.status(403).json("Token is not valid!");
        }
        req.userId = data._id;
        next();
    });
};

module.exports = verifyToken;
