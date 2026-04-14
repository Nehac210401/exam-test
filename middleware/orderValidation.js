export default function orderValidation(req, res, next) {
    const {shipping_address, orderItems} = req.body;
    if(!shipping_address || !shipping_address.trim()) {
        return res.status(400).json({error: 'Shipping address is required'});
    }
    if(!Array.isArray(orderItems) || orderItems.length === 0) {
        return res.status(400).json({error: 'Order items must be in array and should conatin atleast 1 product'});
    }
    for(let item of orderItems) {
        if(!Number.isInteger(item.menu_id)) {
            return res.status(400).json({error: 'Item on the menu not found'});
        }
        if(!Number.isInteger(item.quantity) || item.quantity <= 0) {
            return res.status(400).json({error: 'Quantity cannot be 0'});
        }
    }
    next();
}