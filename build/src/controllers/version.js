'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ramda = require('ramda');

class VersionController {

    constructor(Version) {
        this.Version = Version;
    }

    currentVersion(req, res, next) {
        this.Version.findById(1).then(version => {
            (0, _ramda.isNil)(version) ? next() : res.send(version);
        }).catch(err => next((0, _ramda.assoc)('status', 400, err)));
    }

    incrementVersion(req, res, next) {
        this.Version.build({ id: 1 }, { isNewRecord: false }).increment('current').then(version => {
            res.sendStatus(200);
        }).catch(err => next((0, _ramda.assoc)('status', 400, err)));
    }

}
exports.default = VersionController;