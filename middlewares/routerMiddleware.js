const jwt=require('jsonwebtoken')
//MiddleWare

  const jwtMiddleware = (req, res, next) => {

    try{
    //access token from request header
    const token = req.headers["access_token"]  //run time error-try catch

    // validate token-jwt-verify()
    jwt.verify(token,"secretKey123")  //it's value maybe-true/false

    //if token is verified continue the request
    next()
}
catch{
    res.status(404).json('please login')

}
}
module.exports=jwtMiddleware