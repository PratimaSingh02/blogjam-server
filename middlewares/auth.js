const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY,
            (error, user) => {
                if (error)
                    return res.status(403).json("Token is not valid!");
                req.user = user;//contains id and iat
                next();
            });
    }
    else
        res.status(401).json("You are not authenticated");
}

module.exports = { verify }