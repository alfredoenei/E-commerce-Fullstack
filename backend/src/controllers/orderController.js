const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    }

    try {
        // Obtenemos los productos actuales de la base de datos para verificar precios
        const itemsFromDB = await Product.find({
            _id: { $in: orderItems.map((x) => x.product) },
        });

        // Verificamos y mapeamos los items con los precios reales de la DB
        const dbOrderItems = orderItems.map((itemFromClient) => {
            const productFromDB = itemsFromDB.find(
                (itemsDB) => itemsDB._id.toString() === itemFromClient.product
            );

            if (!productFromDB) {
                throw new Error(`Producto no encontrado: ${itemFromClient.product}`);
            }

            return {
                ...itemFromClient,
                product: productFromDB._id,
                price: productFromDB.price, // Siempre usamos el precio de la DB
                _id: undefined,
            };
        });

        // Calculamos los subtotales en el servidor
        const itemsPrice = dbOrderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const shippingPrice = itemsPrice > 100 ? 0 : 10;
        const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
        const totalPrice = itemsPrice + shippingPrice + taxPrice;

        const order = new Order({
            orderItems: dbOrderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(400);
        throw new Error(error.message || 'Error al procesar el pedido');
    }
};


// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    addOrderItems,
    getMyOrders,
    getOrderById,
};
