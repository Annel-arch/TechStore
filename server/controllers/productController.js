import fs from 'fs/promises';
import path from 'path';

const productsPath = path.resolve('server/models/products.json');

// GET all products
export const getProducts = async (req, res) => {
  const data = await fs.readFile(productsPath);
  const products = JSON.parse(data);
  res.json(products);
};

// POST add product
export const addProduct = async (req, res) => {
  const data = await fs.readFile(productsPath);
  const products = JSON.parse(data);
  const newProduct = { id: Date.now(), ...req.body };
  products.push(newProduct);
  await fs.writeFile(productsPath, JSON.stringify(products));
  res.status(201).json(newProduct);
};

// PUT update product
export const updateProduct = async (req, res) => {
  const data = await fs.readFile(productsPath);
  let products = JSON.parse(data);
  products = products.map(p => p.id === parseInt(req.params.id) ? { ...p, ...req.body } : p);
  await fs.writeFile(productsPath, JSON.stringify(products));
  res.json({ message: 'Product updated' });
};

// DELETE product
export const deleteProduct = async (req, res) => {
  const data = await fs.readFile(productsPath);
  let products = JSON.parse(data);
  products = products.filter(p => p.id !== parseInt(req.params.id));
  await fs.writeFile(productsPath, JSON.stringify(products));
  res.json({ message: 'Product deleted' });
};
