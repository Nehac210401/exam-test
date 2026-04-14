import {Router} from 'express';
import db from '../db/menudb.js';
import validateProducts from '../middleware/productValidation.js';

const router = Router();

//get all menu items
router.get('/', (req, res) =>{
    try{
    const menu = db.prepare('SELECT * FROM menu_items').all();
    res.status(200).json({menu: menu});
    } catch (error) {
        res.status(500).json({error: 'Can not fetch the menu'});
    }
 });
 //get single item on the menu
 router.get('/:id', (req, res) => {
  try {
    const item = db.prepare('SELECT * FROM menu_items WHERE id = ?').get(req.params.id);

    if (!item) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Cannot fetch the item' });
  }
});

 //Put item on the menu
 router.put('/:id', validateProducts, (req, res) => {
  try {
    const { id } = req.params;
    const { title, desp, price } = req.body;

    const item = db.prepare('SELECT * FROM menu_items WHERE id = ?').get(id);
    if (!item) return res.status(404).json({ error: 'Cannot find the item in the menu' });

    db.prepare(`
      UPDATE menu_items
      SET title = ?,
          desp = ?,
          price = ?
      WHERE id = ?
    `).run(
      title ?? item.title,
      desp ?? item.desp,
      price ?? item.price,
      id)
       const updatedItem = db.prepare('SELECT * FROM menu_items WHERE id = ?').get(id);
    res.status(200).json(updatedItem);

  } catch (error) {
    res.status(500).json({ error: 'Cannot update the item' });
  }
});

//Post a menu item
router.post('/', validateProducts, (req, res) => {
  const { title, desp, price } = req.body;

  const stmt = db.prepare(`
    INSERT INTO menu_items (title, desp, price) VALUES (?, ?, ?)
  `);

  const result = stmt.run(title, desp, price);
  res.status(201).json({ id: result.lastInsertRowid, title, desp, price });
});


//delete menu item
router.delete('/:id', (req, res) =>{
    const id = Number(req.params.id);
    const stmt = db.prepare('DELETE FROM menu_items WHERE id = ?');
    const result = stmt.run(id);
    if(result.changes === 0) {
        return res.status(404).json({error: 'Item not found'});
    } res.json({message: 'Item deleted successfully'});
});

 export default router;




