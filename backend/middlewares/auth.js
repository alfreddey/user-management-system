const jwt = require('jsonwebtoken');


module.exports = {
    async verifyToken(req, res, next) {
        try {
            const auth_headers = req.headers?.authorization;

            if(!auth_headers) {
                res.status(401).json({
                    status: false,
                    message: "Authorization header not provided in request"
                })
            }
    
            // Check if the auth header string starts with Bearer 
            if(!auth_headers.startsWith('Bearer')) {
                res.status(401).json({
                    status: false,
                    message: "Invalid authorization mechanism"
                })
            }
    
            const auth_token = auth_headers.split(' ')[1];
    
            const authorized = jwt.verify(auth_token, process.env.SECRET_KEY);

            
            if(!authorized) {
                res.status(401).json({
                    status: false,
                    message: "Unauthorized request. Unmatched authorization token"
                })
            }
    
            req.user = authorized;
    
            next();
        }

        catch(err) {
            res.status(400).json({  // Bad request error
                status: false,
                message: err.message
            })
        }
    },

    isUser(req, res, next) {
        if(req.user.role == 0) next();
        res.status(401).json({
            status: false,
            message: err.message
        })
    },

    isAdmin(req, res, next) {
        if(req.user.role == 1) next();
        res.status(401).json({
            status: false,
            message: err.message
        })
    }
}