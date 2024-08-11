import jwt from "jsonwebtoken"

const generateTokenAndSetCookie=(userId, res)=>{
    const token= jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: '15d'
    })
    console.log("Generated JWT:", token);
    res.cookie('jwt', token, {
        maxAge:15*24*60*60*1000, //ms
        httpOnly:true, //prevent XSS atttacks cross site scripting attacks
        sameSite: "strict", //CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV!=="development",
    });
};
export default generateTokenAndSetCookie;