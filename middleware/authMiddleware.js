import jwt from 'jsonwebtoken';
const JWT_SECRET = "MynameisPriyanshuGunwantworking1";

const authenticateToken=(req,res,next)=>{
    const authHeader = req.headers['authorization'];
    // console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    // console.log(token);
    if(token==null) return res.sendStatus(401);
    jwt.verify(token,JWT_SECRET,(err,decoded)=>{
        if(err) return res.sendStatus(403);
        req.userId = decoded.user.id;
        next();
    });
}

export default authenticateToken;