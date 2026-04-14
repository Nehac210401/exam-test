import db from '../data/userdb.js';

function loggedInAuth(req, res, next) {
    const user_id = req.headers['x-user-id'];
    if(!user_id) {
        req.user = null;
        return next();
    }
    if(typeof user_id !== 'string'){
        return res.status(400).json({error: 'Wrong user_id'});
    }
    const user = db.prepare('SELECT id FROM users WHERE id = ?').get(user_id);

    if (!user) {
        return res.status(400).json({error: 'User not found'});
    }
    req.user = {id : user_id};
    next();
}
export default loggedInAuth;