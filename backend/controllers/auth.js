const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    async registerUser(req, res) {
        try {
            const user = req.body;
            const user_password = user.password; 
    
            const salt = await bcrypt.genSalt(10);
            const hashed_password = await bcrypt.hash(user_password, salt);
    
    
            await User.create({...user, password: hashed_password});
    
            const payload = {
                _id: user.id,
                role: user.role
            }
    
            const auth_token = jwt.sign(payload, process.env.SECRET_KEY);
    
            res.status(200).json({
                status: true,
                data: {
                    user,
                    auth_token
                }
            })
        }

        catch(err) {
            res.status(500).json({
                status: false,
                message: err.message
            })
        }
    },

    async loginUser(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });

    
            if(!user) {
                res.status().json({
                    status: false,
                    message: "Please check username or password"
                })
            }

            else {
                const matched = await bcrypt.compare(password, user.password);

    
                if(matched) {
                    const payload = {
                        _id: user._id,
                        role: user.role
                    }
    
                    const auth_token = jwt.sign(payload, process.env.SECRET_KEY);
    
                    res.status(200).header("auth-token", auth_token).json({
                        status: true,
                        data: {
                            user,
                            auth_token
                        }
                    })
                }
    
                else {
                    res.status(401).json({
                        status: false,
                        message: "Please check username or password."
                    })
                }
            }
        }

        catch(err) {
            res.status(500).json({
                status: false,
                message: err.message
            })
        }
    }
}