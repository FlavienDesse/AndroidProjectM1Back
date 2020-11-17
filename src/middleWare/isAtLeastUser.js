const rights = require('./rights');

module.exports = function (req, res, next,level) {
    if (req.rights.level >= rights[level]) {
        next();
    } else {
        res.status(401).send(
            {
                errorMessage: "You need " + level + " rights to do this action",
            });
    }

};
