const mongoose = require('mongoose');
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
        return res.status(400).json({ message: 'No order items' });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Obtenemos los productos atados a la sesión de transacción
        const itemsFromDB = await Product.find({
            _id: { $in: orderItems.map((x) => x.product) },
        }).session(session);

        // Verificamos y mapeamos los items con los precios y stock real
        const dbOrderItems = orderItems.map((itemFromClient) => {
            const productFromDB = itemsFromDB.find(
                (itemsDB) => itemsDB._id.toString() === itemFromClient.product
            );

            if (!productFromDB) {
                throw new Error(`Producto no encontrado: ${itemFromClient.product}`);
            }

            const safeQuantity = Math.max(1, Number(itemFromClient.qty || itemFromClient.quantity || 1));

            // Validación Atómica de Stock En Tiempo Real
            if (productFromDB.countInStock < safeQuantity) {
                throw new Error(`Stock insuficiente para el producto: ${productFromDB.name}`);
            }

            // Reducimos en la instancia del producto (luego hacemos save)
            productFromDB.countInStock -= safeQuantity;

            return {
                ...itemFromClient,
                product: productFromDB._id,
                price: productFromDB.price,
                qty: safeQuantity,
                quantity: safeQuantity,
                _id: undefined,
            };
        });

        // Guardar todos los productos con el stock restado dentro de la transacción
        for (const product of itemsFromDB) {
            await product.save({ session });
        }

        // Calculamos previsiones financieras
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

        // Guardado de la Orden ligado a la transacción
        const createdOrder = await order.save({ session });

        await session.commitTransaction();
        session.endSession();

        return res.status(201).json(createdOrder);
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ message: error.message || 'Error al procesar el pedido' });
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
