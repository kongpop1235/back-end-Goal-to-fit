const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser")
const mongoose = require('mongoose');
const config = require('../config.js');

const dotenv = require('dotenv');
dotenv.config();
const router = express();
router.use(bodyparser.json());
router.use(bodyparser.urlencoded({ extended: true }));
router.use(cors());
router.use(express.json());
if (config.isVercel) {
    router.use(async (req, res, next) => {
        await mongoose.connect(config.mongoUri, config.mongoOptions);
        return next();
    });
}


const signUpTemplateCopy = require('../modles/signupModles');
const bcrypt = require('bcrypt');
// const { deleteOne } = require("../modles/signupModles");

router.post('/login', (req, res) => {
    signUpTemplateCopy.findOne({ username: req.body.username })
        .then(data => {
            // res.send(data)
            // const pass = req.body.password;
            // const passcheck = data.password;
            bcrypt.compare(req.body.password, data.password, (err, result) => {
                // if (err) throw err;
                if (result === true) {
                    const loginFinish = {
                        check: true,
                        data: data
                    }
                    // res.send(check);
                    res.send(loginFinish);
                } else {
                    res.status(401).send("error 401");
                }
            })
        })
        .catch(error => {
            res.json(error);
        })
})

router.post('/signup', async (req, res) => {

    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(req.body.password, saltPassword)

    const signedUpUser = new signUpTemplateCopy({
        username: req.body.username,
        password: securePassword,
        phone: req.body.phone,
        gender: req.body.gender,
        birth: req.body.birth,
        height: req.body.height,
        weight: req.body.weight,
        calories_gold: req.body.calories_gold
    })
    signedUpUser.save()
        .then(data => {
            res.json(true)
        })
        .catch(error => {
            res.json(error)
        })
})

// router.put('/edit_profile', async (req, res) => {
// })


// router.get('/signin')
module.exports = router