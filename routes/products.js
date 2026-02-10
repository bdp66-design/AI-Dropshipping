const express = require('express');
const router = express.Router();

// Mock data for products 
let products = [
    { id: 1, name: 'Product 1', category: 'Category 1' },
    { id: 2, name: 'Product 2', category: 'Category 2' },
    { id: 3, name: 'Product 3', category: 'Category 1' }
];

// GET all products
router.get('/', (req, res) => {
    res.json(products);
});

// GET product by ID
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found.');
    res.json(product);
});

// GET products by category
router.get('/category/:category', (req, res) => {
    const filteredProducts = products.filter(p => p.category === req.params.category);
    res.json(filteredProducts);
});

// POST create new product
router.post('/', (req, res) => {
    const newProduct = { id: products.length + 1, ...req.body };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// PUT update product
router.put('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found.');
    Object.assign(product, req.body);
    res.json(product);
});

// DELETE product
router.delete('/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) return res.status(404).send('Product not found.');
    products.splice(productIndex, 1);
    res.status(204).send();
});

module.exports = router;