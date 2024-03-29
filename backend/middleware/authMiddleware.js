import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler.js'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Read the JWT from the cookie
    token = req.cookies.jwt;

    if (token) {
        try {
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get the user from the DB
            req.user = await User.findById(decoded.userId).select('-password')

            next()
        } catch (error) {
            console.log(error);
            res.status(401);
			throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401)
        throw new Error('Not authorized, no token')
    }

})

const admin = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401);
        throw new Error('Not authorized as admin');
    }
})

export { protect, admin }