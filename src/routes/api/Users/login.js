const User = require('../../../../models/User')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


module.exports= function (req,res) {
    if(req.body.username !== undefined && req.body.password !== undefined){
        User.findOne({username: req.body.username}, function (err, user) {
            if(err){
                res.status(500).send(err);
            }
            else if(user !== null){
                bcrypt.compare(req.body.password, user.password, async function(err, result){
                    if(result){
                        let token = jwt.sign(
                            {
                                id: user._id,
                                type: user.type
                            },
                            process.env.TOKEN_SECRET,
                            {
                                expiresIn: 60 * 120
                            }
                        );

                        let tokenParts = token.split('.');

                        let headerPayload = tokenParts[0] + "." + tokenParts[1];

                        let signature = tokenParts[2];

                        let cookieSignatureConfig = {
                            httpOnly: true,
                            secure: false
                        };

                        let cookieHeaderPayloadConfig = {
                            secure: false,
                            maxAge: 1000 * 60 * 120
                        };

                        // place token in 2 cookies (secure way of storing tokens, better way than localStorage)
                        res.cookie('headerPayload', headerPayload, cookieHeaderPayloadConfig);
                        res.cookie('signature', signature, cookieSignatureConfig);

                        // remove password from user object
                        user.password = undefined;
                        res.status(200).send({message: "User info",user:user});
                    }
                    // Incorrect credentials
                    else{
                        res.status(401).send({message: "Incorrect credentials"});
                    }
                });
            }
            else{
                res.status(404).send({message: "User not found with this eCrfId"});
            }

        })
    }
    // missing credential(s)
    else{
        res.status(422).send({message: "missing username or password"});
    }
}