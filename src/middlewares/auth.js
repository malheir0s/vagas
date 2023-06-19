const { tokens, data } = require('../models/user');
const jwt = require('jsonwebtoken');


const validatePermisson = (routePermission) => {
    return (req, res, next) => {
        const bearerToken = req.headers.authorization;

        if (!bearerToken || !/^Bearer \w/i.test(bearerToken)) {
            return res.status(401).json({ error: 'Invalid or missing authorization token.' });
        }

        const [_, token] = bearerToken.split(' ');
        var userId;
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded){
            if(err){
                return res.status(401).json({error: 'Invalid authorization token.'});
            }

            userId = decoded.id;
        });

        if (tokens[userId] === token) {
            const userPermissions = data.find(user => user.id === userId).permissions;
            
            if (userPermissions.find(permission => permission === routePermission)){
                return next()
            } else {
                return res.status(403).json({ error: 'User does not have permission to do this action.'})
            }

        } else {
            return res.status(401).json({ error: 'Invalid or missing authorization token.2' });
        }
    }
}

module.exports = {
    validatePermisson
}
