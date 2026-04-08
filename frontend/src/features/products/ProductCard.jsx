import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const handleWishlist = (e) => {
        e.preventDefault();
        const action = toggleWishlist(product);
        if (action === 'added') {
            toast.success('Añadido a favoritos', { icon: '❤️' });
        } else {
            toast.error('Eliminado de favoritos');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card h-100"
        >
            <div className="position-relative" style={{ height: '220px', overflow: 'hidden' }}>
                <Link to={`/products/${product._id}`}>
                    <img
                        src={product.imageUrl}
                        className="card-img-top w-100 h-100 object-fit-contain p-3"
                        alt={product.name}
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://dummyimage.com/600x400/0f172a/fecb00.png&text=MARKET+ALFREDO'; }}
                    />
                </Link>
                
                {/* Wishlist Button */}
                <div className="position-absolute top-0 start-0 p-2">
                    <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={handleWishlist}
                        className="btn border-0 p-2 glass-effect rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                        style={{ width: '40px', height: '40px' }}
                    >
                        <i className={`bi ${isInWishlist(product._id) ? 'bi-heart-fill text-danger' : 'bi-heart text-dark'}`}></i>
                    </motion.button>
                </div>

                <div className="position-absolute top-0 end-0 p-2">
                    <span className="badge glass-effect text-dark shadow-sm">
                        {product.category}
                    </span>
                </div>
            </div>

            <div className="card-body d-flex flex-column p-4">
                <Link to={`/products/${product._id}`} className="text-decoration-none text-dark mb-2">
                    <h5 className="card-title fw-bold m-0 text-truncate">{product.name}</h5>
                </Link>

                <p className="card-text text-muted small flex-grow-1 mb-3" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: '2',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    lineHeight: '1.5'
                }}>
                    {product.description}
                </p>

                <div className="d-flex justify-content-between align-items-center mt-auto">
                    <div>
                        <span className="text-muted small d-block">Precio</span>
                        <span className="h4 mb-0 text-primary fw-bold">€{product.price}</span>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn btn-primary shadow-sm"
                        onClick={() => addToCart(product)}
                    >
                        <i className="bi bi-cart-plus me-1"></i> Añadir
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;

