import { createContext, useState, useEffect, useContext } from 'react';

// Context API: Permite compartir datos (como el carrito) entre todos los componentes de la app sin tener que pasar "props" manualmente.
const CartContext = createContext();

// Hook personalizado para usar el carrito fácilmente en cualquier componente
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    // Inicializamos el estado del carrito.
    // Usamos una función dentro de useState para leer del localStorage solo una vez (lazy initialization).
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = localStorage.getItem('cartItems');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    // useEffect: Cada vez que 'cartItems' cambie, guardamos el nuevo estado en localStorage.
    // Esto hace que el carrito persista aunque recargues la página.
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existItem = prevItems.find((x) => x._id === product._id);
            if (existItem) {
                return prevItems.map((x) =>
                    x._id === product._id ? { ...x, quantity: x.quantity + 1 } : x
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((x) => x._id !== id));
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
