const jwt = require("jsonwebtoken")

const jwtSecret = "1d9068c640ed14bfde4c1202885ff6299a802c7e09d416625ca7b22d6185efc0a380cd"

exports.adminAuth = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(400).json({ message: "Not authorized, token not available" })
    }

    jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ message: "Not Authorized" })
        }

        if (decodedToken.role !== "admin") {
            return res.status(401).json({ message: "Not Authorized" })
        }
        next()
    })
}


exports.userAuth = async (req,res,next) => {
    const token = req.cookies.jwt;
    console.log(token)
    if(!token){
        return res.status(401).json({message:"Not authorized, token not available"})
    }

    jwt.verify(token, jwtSecret, (err, decodedToken) => {
        console.log(decodedToken)
        if (err) {
            return res.status(401).json({ message: "Not Authorized err" })
        }
        
        if (decodedToken.role !== "Basic"){
            return res.status(401).json({message:"Not Authorized role,", role: decodedToken.role})
        }

        next()
    })
}

