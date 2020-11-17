const ObjectId = require("mongoose").Types.ObjectId;
const User = require("../../../../models/User");


module.exports = async function (req, res) {
    if (req.body._id !== undefined) {
        if (ObjectId.isValid(req.body._id)) {
            User.findOneAndRemove({_id: req.body._id}, function (err, doc) {
                if (err) {
                    res.status(402).send(err)
                } else if (doc === null) {
                    res.status(402).send({
                        errorMessage: "Unable to find user with this ID"
                    })
                } else {
                    res.status(200).send({
                        errorMessage: "Sucess"
                    })
                }
            })
        } else {
            res.status(402).send({
                errorMessage: "Invalid ID"
            })
        }
    } else {
        res.status(402).send({
            errorMessage: "Incomplete body"
        })
    }
};