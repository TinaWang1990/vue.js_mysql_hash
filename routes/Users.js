var express = require("express")
var router = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


const User = require("../model/User")
router.use(cors())

process.env.SECRET_KEY = 'secret'

//post
router.post("/register", (req, res) => {
    const today = new Date()
    const userData = {
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        created: today
    }

    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user=>{
        if(!user) {
            bcrypt.hash(req.body.password, 2, (err, hash) => {
                userData.password = hash
                User.create(userData).then(user=>{
                    res.json({status: user.email + ' registered'})
                }).catch(err=>{
                    res.send('error: ' + err)
                })
            })
        }else{
            res.json({error: 'User already exists'})
        }
    }).catch(err=>{
        res.send('error: '+ err)
    })
})

router.post("/login", (req, res)=> {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user=>{
        if(user){
            if(bcrypt.compareSync(req.body.password, user.password)){
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.send(token)
            }
        }else{
            res.status(400).json({error: 'User dose not exist'})
        }
    }).catch(err => {
        res.status(400).json({error: err})
    })
})

module.exports=router