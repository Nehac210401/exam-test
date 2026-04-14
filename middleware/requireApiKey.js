export function requireApiKey( req, res, next) {
    const apikey = req.headers['x-api-key'];
    if(!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(401).json({error: 'Invalid or API key is missing'});
    }
    next();
}