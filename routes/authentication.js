const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const authenticate = require('../authenticate');
const jwt = require('jsonwebtoken');

const Users = require('../models/Users');

const router = express.Router();
router.use(bodyParser.json());

router.post('/register', (req, res) => {

    console.log("regsiter", req.body);

    var newUser = new Users({
        username : req.body.email,
        name: req.body.name,
        contactNumber: req.body.contactNumber,
        email : req.body.email
    });
    Users.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.json({
                status: false,
                message: err
            }) 
        }else {
            res.json({
                user : user,
                status : true,
                message: "Successfully registered!"
            })
        }
    })


});

router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log("User",req.user);
  console.log("Fetch confirmation",req.user.confirmed)
//   Talent.findById(req.user._id)
//     .then(
//       talent => {
//         if (talent != null) {
//             return jwt.sign(talent, config.secretKey, { expiresIn: 3600 });

//             var token = authenticate.getToken({ _id: req.user._id });
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json({
//               confirmation: true,
//               token: token,
//               user: req.user,
//               talent: talent,
//               status: 'You are successfully logged in!'
//             });

//         } else {
//           err = new Error('Talent ' + req.user.username + 'not found');
//           err.status = 404;
//           return next(err);
//         }
//       },
//       err => next(err)
//     )

});


module.exports = router;
