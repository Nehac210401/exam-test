import {Router} from 'express';
import db from '../db/userdb.js';
import {v4 as uuidv4} from 'uuid';
import { validateUser, validateUserId } from '../middleware/userValidation.js';

const router = Router();

//get all users
router.get('/', (req, res) => {
    try{
    const users = db.prepare('SELECT * FROM users').all();
    res.status(200).json({users});
    } catch (error) {
        res.status(500).json({error: 'Can not find the users'});
    }
 });
 //get single user
 router.get('/:id', validateUserId, (req, res) => {
  try {
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Cannot find the user' });
  }
});

 //Put user 
 router.put('/:id', validateUser, validateUserId, (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, teleph } = req.body;

    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);

    if (!user) {
      return res.status(404).json({ error: 'Cannot find the user' });
    }

    db.prepare(`
      UPDATE users
      SET name = ?,
          email = ?,
          teleph = ?
      WHERE id = ?
    `).run(
      name ?? user.name,
      email ?? user.email,
      teleph ?? user.teleph,
      id
    );

    const updatedUser = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Cannot update the user' });
  }
});

//Post a user
router.post('/', validateUser, (req, res) => {
    try {
  const { name, email, teleph } = req.body;
  const id = uuidv4();
    db.prepare(`
    INSERT INTO user (name, email, teleph) VALUES (?, ?, ?)
  `).run(id, name, email, teleph);
  res.status(200).json({id, name, email, teleph})
    } catch (error) {
        res.status(500).json({error: 'Cannot create the user'});
    }
});

//delete user
router.delete('/:id', validateUserId, (req, res) =>{
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
    if(!user) {
        return res.status(404).json({error: 'Cannot find the user'});
    }
        db.prepare('DELETE FROM users WHERE id = ?').run(req.params.id);
        res.status(200).json({message: 'Account is deleted'});
    });

 export default router;




