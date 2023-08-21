// import express
const express=require('express')
const logicpath=require('../Controllers/logic')
const jwtMiddleware = require('../middlewares/routerMiddleware')


// create an object for router class in express
const router=new express.Router()

// register the path
router.post('/express/rout/register-user',logicpath.register)

//login
router.post('/express/rout/user-login',logicpath.login)

//get Profile
router.get('/express/rout/user-profile/:acno',logicpath.getProfile,jwtMiddleware)

//get balance
router.get('/express/rout/user-balance/:acno',logicpath.getBalance,jwtMiddleware)

//money transfer
router.post('/express/rout/money-transfer',logicpath.moneyTransfer,jwtMiddleware)

//transaction history
router.get('/express/rout/user-history/:acno',logicpath.history,jwtMiddleware)

//delete account
router.delete('/express/rout/user-delete/:acno',logicpath.deleteAc,jwtMiddleware)

module.exports=router
