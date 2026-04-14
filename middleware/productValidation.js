import db from '../db/menudb.js';
  function validateProducts(req, res, next) {
    const {title, desp, price} = req.body;

    if(!title, !desp, !price) {
        return res.status(400).json({error: 'Title, desp and price required'});
    }
    next();

}
//export function validateOrderProducts(req, res, next) {
 //   const {order_items} = req.body;
  //  for (let items of order_items) {
  //      const menu = db.prepare('SELECT id FROM menu WHERE id = ?').get(items.menu_id);
  //      if(!menu) {
  //          return res.status(400).json({error:'Item not in the menu'});
  //      }
   // }
  //  next();
//}
export default validateProducts;