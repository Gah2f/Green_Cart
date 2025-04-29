import  jwt  from "jsonwebtoken";

const authUser = async (req, res, next) => {
    // console.log(req.cookies);

    const {token} = req.cookies;

    if(!token) {
        return res.json({ success: false , message: 'Unauthorized' });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if(tokenDecode.id) {
            req.user = {id : tokenDecode.id};
        } else {
            return res.json({ success: false , message: 'Unauthorized' });
        }
        next();
    } catch (error) {
        res.json({ success: false , message: 'Unauthorized' });
    }
}

export default authUser;