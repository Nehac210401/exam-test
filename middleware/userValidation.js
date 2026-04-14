export function validateUser(req, res, next) {
    const {name, email, teleph} = req.body;

    if(!name || !email || !teleph) {
        return res.status(400).json({error: 'Name, email and teleph are required'});   
    }
    next();
}
export function validateUserId( req, res, next) {
    const {id} = req.params;
    if(!id) {
        return res.status(400).json({error: 'UserID missing'});
    }
    next();
}