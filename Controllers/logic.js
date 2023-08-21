//import jwt(jsonwebtoken)
const jwt=require("jsonwebtoken")

// import models
const users = require('../model/collection')

const register = (req, res) => {   //body={acno:123,"name":"reshma","psw":abc}
    // access datas from body

    const { acno, uname, psw } = req.body
    // const acno=req.body.acno
    // const uname=req.body.uname
    // const psw=req.body.psw
    
    // check acno is present in user collection
    users.findOne({ acno }).then(user => {
        if (user) {
            res.status(401).send(" Account number exist")
        }
        else {
            // new user to create new object
            var newUser = new users({
                acno,
                uname,
                psw,
                balance: 0,
                transactions: []
            })
            // save the object in collection
            newUser.save()
            // response send to frontend and json format to convert
            res.json(newUser)
        }
    })
}

//logic for login
const login = (req, res) => {
    const { acno, psw } = req.body
    users.findOne({ acno, psw }).then(user => {
        if (user) {
            //generate token
            var token=jwt.sign({acno},"secretKey123")
            // user["token"]=token
            res.status(200).json({
                acno:user.acno,
                uname:user.uname,
                token
            })
        }
        else {
            res.status(401).json("Incorrect username or password")
        }
    })
}


// logic to get profile data
const getProfile = (req, res) => {

    // // access acno params from url req
    // const acno=req.params.acno  or
    const { acno } = req.params
    users.findOne({ acno }).then(user => {
        if (user) {
            res.status(200).json({
                acno: user.acno,
                uname: user.uname
            })

        }
        else {
            res.status(401).json("User not exist")
        }
    })

}


//logic to get balance details
const getBalance = (req, res) => {
    const { acno } = req.params
    users.findOne({ acno }).then(user => {
        if (user) {
            res.status(200).json({
                // acno:user.acno,
                uname: user.uname,
                balance: user.balance
            })
        }
        else {
            res.status(401).json("user not exist")
        }
    })
}


//logic for money transfer
const moneyTransfer = (req, res) => {

    //access all data from body
    const { fromAcno, toAcno, psw, amount, date } = req.body

    //convert amount to number
    // [because amount declared in input field .so it take as string.we need it in nubers because we carried out arithametic operations]
    var amnt = parseInt(amount)
    //check from user in db
    users.findOne({ acno: fromAcno, psw }).then(fromUser => {
        if (fromUser) {
            //check fot toUser
            users.findOne({ acno: toAcno }).then(toUSer => {
                if (toUSer) {
                    // from user balance check 
                    if (amount <= fromUser.balance) {
                        //update fromUser informations after transactions
                        fromUser.balance -= amnt
                        fromUser.transactions.push({ type: "DEBIT", amount: amnt, date, user: toUSer.uname })
                        fromUser.save()

                        //update toUser informations after transactions
                        toUSer.balance += amnt
                        toUSer.transactions.push({ type: "CREDIT", amount: amnt, date, user: fromUser.uname })
                        toUSer.save()

                        res.status(200).json({ Message: "Transactions Successfull" })
                    }
                    else {
                        res.status(401).json({ Message: "Insufficient balance" })
                    }

                }
                else {
                    res.status(401).json({ Message: "Invalid credit credentials" })
                }
            })
        }
        else {
            res.status(401).json({ Message: "Invalid debit credentials" })
        }
    })

}

 //logic to transaction history
 const history = (req, res) => {
    const { acno } = req.params
    users.findOne({ acno }).then(user => {
        if (user) {
            res.status(200).json(user.transactions)

        }
        else {
            res.status(401).json("user not exist")
        }
    })
}

//logic for delete account
const deleteAc=(req,res)=>{
    const {acno}=req.params
    users.deleteOne({acno}).then(user=>{   //delete account=1/0
        if(user){
            res.status(200).json("Account deleted successfully")
        }
        else{
            res.status(401).json("user not exist") 
        }
    })
}


module.exports = {
    register, login, getProfile, getBalance,
     moneyTransfer,history,deleteAc
}