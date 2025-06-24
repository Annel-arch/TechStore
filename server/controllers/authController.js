import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const usersPath = path.resolve('server/models/users.json');
const secret = process.env.JWT_SECRET || 'mysecretkey';

// Registro
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const data = await fs.readFile(usersPath);
  const users = JSON.parse(data);

  const userExists = users.find(u => u.email === email);
  if (userExists) return res.status(400).json({ message: 'El usuario ya existe' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: Date.now(), name, email, password: hashedPassword };
  users.push(newUser);
  await fs.writeFile(usersPath, JSON.stringify(users));
  
  const token = jwt.sign({ id: newUser.id }, secret, { expiresIn: '1h' });
  res.status(201).json({ token, user: { id: newUser.id, name, email } });
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const data = await fs.readFile(usersPath);
  const users = JSON.parse(data);

  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ message: 'Contraseña incorrecta' });

  const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });
  res.json({ token, user: { id: user.id, name: user.name, email } });
};
