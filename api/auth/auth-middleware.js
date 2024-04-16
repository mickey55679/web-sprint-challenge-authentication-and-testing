module.exports = {
validateRegister
}
function validateRegister(req, res, next) {
    const { username, password} = req.body;

    if(!username || !password){
        res.status(400).json({message: 'username and password required'})
    } else {
        next();
    }
}