const ObjectId = require("mongoose").Types.ObjectId;
const Forms = require('../../../../models/Forms')


module.exports = function (req,res) {
    if (req.body._id !== undefined) {
        if (ObjectId.isValid(req.body._id)) {
            Forms.findById((req.body._id),function (err,doc) {
                if(err){
                    res.status(422).send(err);
                }
                else if(!doc) {
                    res.status(422).send({
                        errorMessage:"No form found with this ID"
                    });
                }
                else{
                    res.status(200).send(doc)
                }
            })
        } else {
            res.status(422).send({errorMessage: "bad id provided"});
        }
    } else {
        res.status(422).send({errorMessage: "missing id"});
    }

}