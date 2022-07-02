/* eslint-disable no-unused-vars */
const {expressjwt: jwt} = require('express-jwt');

const getTokenFromHeaderOrQuerystring = (req) => {
    console.log('-----------------');
    if (
        req.headers.authorization
        && req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        return req.headers.authorization.split(' ')[1];
    }
    if (req.query && req.query.token) {
        return req.query.token;
    }

    return null;
};

function verifyToken () {
    // return (_req, _res, next) => {
    jwt({
        secret:     process.env.JWT_SECRET,
        algorithms: ['RS256', 'HS256'],
        getToken:   getTokenFromHeaderOrQuerystring,
    });
    // next();
    // };
}

module.exports =  {verifyToken};
