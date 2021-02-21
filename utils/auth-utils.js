const JWT = require('jsonwebtoken');

class AuthUtils {

    static JWT_KEY = process.env.JWT_KEY || 'safe';
    static EXPIRES_IN = '1h';
// Token timer


    static parseToken(request, response, next = null) {

        const authorization = request.headers.authorization;

        if (!authorization)
            return response.status(403).json('Malformed token.');

        const formattedAuthorization = authorization.split(' ');

        if (formattedAuthorization.length !== 2)
            return response.status(403).json('Malformed token.');

        request.token = formattedAuthorization[1];

        if (next)
            next();
    }

    static validateToken(request, response, next = null) {

        JWT.verify(request.token, AuthUtils.JWT_KEY, async (jwt_error) => {

            if (jwt_error) // jwt_data (_id, username, password)
                return response.status(403).json("Invalid token.");

            if (next)
                next();
        });
    }

    static parseAndValidateToken(request, response, next) {

        AuthUtils.parseToken(request, response);

        AuthUtils.validateToken(request, response, next);
    }
}

module.exports = AuthUtils;