'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    security: {
        jwtSecret: process.env.JWT_SECRET || 's3cr3tk3y',
        jwtSession: { session: false }
    }
};