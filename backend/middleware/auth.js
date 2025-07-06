
import jwt from 'jsonwebtoken';
import {User} from '../models/user.model.js';

const auth = async (req, res, next) => {
  try {
    console.log("JWT_SECRET auth:", process.env.JWT_SECRET); 

    const token = req.cookies.token;
    console.log(" token from cookies:", req.cookies.token);

    if (!token) {
      return res.status(401).json({ error: 'Access denied. Token missing.' });
    }
console.log("Token:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded:", decoded);

const user = await User.findById(decoded.userId); 




    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    req.userId = user._id; 
    next();
  } catch (err) {
    console.error('JWT Auth Error:', err.message);
    res.status(401).json({ error: 'Invalid token.' });
  }
};

export default auth;
