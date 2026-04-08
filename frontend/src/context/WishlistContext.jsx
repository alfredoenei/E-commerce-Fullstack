import { createContext, useState, useEffect, useContext } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState(() => {
        const storedWishlist = localStorage.getItem('wishlistItems');
        return storedWishlist ? JSON.parse(storedWishlist) : [];
    });

    useEffect(() => {
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    const addToWishlist = (product) => {
        setWishlistItems((prevItems) => {
            const existItem = prevItems.find((x) => x._id === product._id);
            if (!existItem) {
                return [...prevItems, product];
            }
            return prevItems;
        });
    };

    const removeFromWishlist = (id) => {
        setWishlistItems((prevItems) => prevItems.filter((x) => x._id !== id));
    };

    const isInWishlist = (id) => {
        return wishlistItems.some((x) => x._id === id);
    };

    const toggleWishlist = (product) => {
        if (isInWishlist(product._id)) {
            removeFromWishlist(product._id);
            return 'removed';
        } else {
            addToWishlist(product);
            return 'added';
        }
    };

    return (
        <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};
