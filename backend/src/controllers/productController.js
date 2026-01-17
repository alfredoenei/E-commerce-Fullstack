const Product = require('../models/Product');

// @desc    Obtener todos los productos
// @route   GET /api/products
// @access  Public
// Esta función maneja la lógica para listar productos, incluyendo búsqueda por palabra clave.
const getProducts = async (req, res) => {
    try {
        // Si hay una palabra clave (keyword) en la URL, filtramos por nombre.
        // Usamos $regex para buscar coincidencias parciales y $options 'i' para ignorar mayúsculas/minúsculas.
        const keyword = req.query.keyword
            ? {
                name: {
                    $regex: req.query.keyword,
                    $options: 'i',
                },
            }
            : {};

        // Buscamos en la base de datos usando el modelo Product
        const products = await Product.find({ ...keyword });
        res.json(products); // Respondemos con la lista de productos en formato JSON
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ message: 'Error del Servidor' });
    }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        if (error.kind === 'ObjectId') {
            res.status(404).json({ message: 'Product not found' });
        } else {
            res.status(500).json({ message: 'Server Error' });
        }
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.deleteOne(); // or product.remove() depending on mongoose version
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    try {
        const { name, price, description, imageUrl, category, countInStock } = req.body;

        const product = new Product({
            name,
            price,
            user: req.user._id,
            imageUrl,
            category,
            countInStock,
            description,
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Invalid product data' });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    try {
        const { name, price, description, imageUrl, category, countInStock } = req.body;

        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.price = price || product.price;
            product.description = description || product.description;
            product.imageUrl = imageUrl || product.imageUrl;
            product.category = category || product.category;
            product.countInStock = countInStock || product.countInStock;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
};
