import { createContext, useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = localStorage.getItem('cartItems');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        let isNew = false;
        setCartItems((prevItems) => {
            const existItem = prevItems.find((x) => x._id === product._id);
            if (existItem) {
                isNew = false;
                return prevItems.map((x) =>
                    x._id === product._id ? { ...x, quantity: x.quantity + 1 } : x
                );
            } else {
                isNew = true;
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });

        // Disparamos el toast fuera del actualizador de estado
        if (isNew) {
            toast.success(`${product.name} añadido al carrito`, { icon: '🛒' });
        } else {
            toast.success(`Se aumentó la cantidad de ${product.name}`);
        }
    };


    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((x) => x._id !== id));
        toast.error('Producto eliminado del carrito');
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
};

