export default function orderShipping(req, res, next){
    const {order_id} = req.params;
    if(!order_id) {
        return res.status(400).json({error:'Ordernumber is missing'});
    }
    next();
}