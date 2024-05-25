const User = require('../models/user');

module.exports = {
    
    // returns all users from the database
    async getUsers(req, res) {
        try {
            res.status(200).json(await User.find());
        }

        catch(err) {
            res.status(500).json({
                status: false,
                message: err.message
            })
        }
    },

    // create a user
    async createUser(req, res) {
        try {
            const user = req.body;

            const result = await User.create(user);
            
            res.status(200).json({
                status: true,
                data: result
            });
        }

        catch(err) {
            res.status(500).json({
                status: false,
                message: err.message
            })
        }
    },

    async getUser(req, res) {
        try {
            const user_id = req.params.id;

            
            const result = await User.findById(user_id);

            res.status(200).json({
                status: true,
                data: result
            });
        }

        catch(err) {
            res.status(500).json({
                status: false,
                message: err.message
            });
        }
    },

    async updateUser(req, res) {
        try {
            const {
                params: { id: user_id },
                body: payload
            } = req;
            
            const result = await User.findOneAndUpdate({ _id: user_id }, payload, { new: true });

            res.status(200).json({
                status: true,
                data: result
            });
        }
        
        catch(err) {
            res.status(500).json({
                status: false,
                message: err.message
            });
        }
    },

    async deleteUser(req, res) {
        try {
            const user_id = req.params.id;

            const result = await User.findByIdAndDelete({ _id: user_id });

            res.status(200).json({
                status: true,
                data: result
            });
        }

        catch(err) {
            res.status(500).json({
                status: false,
                message: err.message
            })
        }
    }
};