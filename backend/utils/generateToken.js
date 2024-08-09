import jwt from "jsonwebtoken"

const generateTokenAndSetCookie=(userId, res)=>{
    const token= jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: '15d'
    })
    res.cookie('token', token, {
        maxAge:15*24*60*60*1000, //ms
        httpOnly:true, //prevent XSS atttacks
        sameSite: "strict", //CSRF attacks cross-site request forgery attacks
    });
};
export default generateTokenAndSetCookie;