const ObjectId = require("mongoose").Types.ObjectId;
const Forms = require('../../../../models/Forms')
const User =  require('../../../../models/User')

module.exports = async function (req, res) {
    if (req.body._id !== undefined) {
        if (ObjectId.isValid(req.body._id)) {
            let actualUser = await User.findById(req.user.id);
            if(actualUser){
                if(actualUser.forms.includes(req.body._id)){
                    Forms.findOne({_id: req.body._id},async function (err, doc) {
                        if (err) {
                            res.status(422).send(err);
                        } else if (doc) {
                            doc.isClosed = true;
                            await doc.save()
                            res.status(200).send({
                                errorMessage : "Success"
                            })

                        } else {
                            res.status(422).send({errorMessage: "No form found with this id"});
                        }
                    })
                }
                else{
                    res.status(422).send({errorMessage: "On essaye de hack c'est pas ouf"});
                }
            }
            else{
                res.status(422).send({errorMessage: "Erreur"});
            }
        } else {
            res.status(422).send({errorMessage: "bad id provided"});
        }
    } else {
        res.status(422).send({errorMessage: "missing id"});
    }
};