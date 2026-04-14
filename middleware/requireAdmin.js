const requireAdmin = (req, res, next) => {
    const apiKey = req.headers["x-admin-key"];
    if(apiKey !== process.env.ADMIN_API_KEY) {
        return res.status(403).json({error:'Access denined, Admin login required'});
    }
    next();
}
export default requireAdmin;