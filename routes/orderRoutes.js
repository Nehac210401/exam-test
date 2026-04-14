import {Router} from 'express';
//import orderShipping from '../middleware/orderShipping.js';
import orderValidation from '../middleware/orderValidation.js';
//import loggedInAuth from '../middleware/loggedInAuth.js';
//import {orderValidation} from '../middleware/validateProducts.js';
import db from '../db/orderdb.js';
import menudb from '../db/menudb.js';
import {v4 as uuidv4} from 'uuid';
import requireAdmin from '../middleware/requireAdmin.js';

const router = Router();

router.post('/', orderValidation, (req, res) =>{
    const {shipping_address, orderItems, user_id } = req.body;
    const order_id = uuidv4();

    let total_amount = 0;
    for (const item of orderItems) {
        const menuItems = menudb.prepare('SELECT * FROM menu_items WHERE id = ?').get(item.menu_id);
        total_amount += menuItems.price * item.quantity;
    }

    const delivery_time = new Date(Date.now() + 30 * 60 * 1000).toISOString();
    const order = db.prepare (`
        INSERT INTO orders (id, total_amount, shipping_address, delivery_time, user_id) VALUES (?, ?, ?, ?, ?)`).run(order_id, total_amount, shipping_address, delivery_time, user_id);
       //const order_id = order.lastInsertRowid; already decleared on the lineno 14, it will be automatically generated.
        const stmt = db.prepare (`
            INSERT INTO order_items (order_id, menu_id, price, quantity, title) VALUES (?, ?, ?, ?, ?)`)
        for (const item of orderItems) {
                const menuItem = menudb.prepare('SELECT * FROM menu_items WHERE id = ?').get(item.menu_id);
                stmt.run(order_id, item.menu_id, menuItem.price, item.quantity, menuItem.title);
                }

             res.json({
                id: order_id,
                user_id: user_id ?? 'guest',
                total_amount,
                shipping_address,
                delivery_time,
                orderItems,
            });
        });

        router.get('/myOrders',(req, res) =>{
        const {user_id} = req.query;

        if(!user_id) {
        return res.status(401).json({error: 'userid is required'});
        }

        const orders = db.prepare('SELECT id, total_amount, shipping_address, delivery_time, created_at FROM orders WHERE user_id = ?').all(user_id);

        const stmt = db.prepare(`
        SELECT menu_id, price, quantity, title 
        FROM order_items WHERE order_id = ?`);

        const result = orders.map(order =>{
        const items = stmt.all(order.id);
        return {...order,items}
        });
        res.status(200).json(result);
        });


        router.get('/status/:orderId', (req, res) =>{
        const {order_id} = req.params;
        //const user_id = req.user?.id || null;
       
        const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(order_id);
        if(!order) {
            return res.status(404).json({error: 'Order cannot be found'});

        } //if (order.user_id && order.user_id !== user_id) {
            //return res.status(403).json({error: 'Log in to see the status of the order'});
       // }.  this line of code is for authloggen in.
        const now = new Date();
        const delivery = new Date(order.delivery_time);
        const minutesLeft = Math.max(0, Math.round((delivery - now) / 60000));

        res.status(200).json({
            order_id: order.id,
            status: minutesLeft > 0 ? 'On the way' : 'Delivered',
            minutes_left: minutesLeft,
            delivery_time: order.delivery_time,
            total_amount: order.total_amount,
            shipping_address: order.shipping_address });        

    });

    //get all order for admin purposes only
    router.get('/', requireAdmin, (req, res) =>{
        try{
            const orders = db.prepare('SELECT * FROM orders').all();

            if(!order.length) {
                return res.status(404).json({error: 'No orders found'});
            }
            res.status(200).json({orders});
        } catch (error) {
            res.status(500).json({error: 'Cannot fetch the orders'});
        }
    });


export default router;