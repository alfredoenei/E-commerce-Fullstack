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
            <div className="position-relative bg-light border-bottom" style={{ aspectRatio: '1/1', overflow: 'hidden' }}>
                <Link to={`/products/${product._id}`} className="d-block w-100 h-100">
                    <motion.img
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        src={product.imageUrl}
                        className="w-100 h-100 object-fit-contain p-4"
                        style={{ mixBlendMode: 'multiply' }}
                        alt={product.name}
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://dummyimage.com/600x600/f8fafc/001029.png&text=MARKET+ALFREDO'; }}
                    />
                </Link>
                
                {/* Wishlist Button */}
                <div className="position-absolute top-0 start-0 p-3">
                    <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleWishlist}
                        className="btn bg-white border border-light p-0 rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                        style={{ width: '38px', height: '38px', opacity: 0.95 }}
                    >
                        <i className={`bi ${isInWishlist(product._id) ? 'bi-heart-fill text-danger' : 'bi-heart text-dark'}`}></i>
                    </motion.button>
                </div>

                <div className="position-absolute top-0 end-0 p-3">
                    <span className="badge bg-white text-dark shadow-sm fw-bold border border-light px-3 py-2" style={{letterSpacing: '1px'}}>
                        {product.category}
                    </span>
                </div>
            </div>

            <div className="card-body d-flex flex-column p-4 bg-white flex-grow-1">
                <Link to={`/products/${product._id}`} className="text-decoration-none text-dark mb-2">
                    <h5 className="card-title fw-bold m-0" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: '1',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: '1.4'
                    }}>{product.name}</h5>
                </Link>

                <p className="card-text text-muted small flex-grow-1 mb-4" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: '2',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    lineHeight: '1.6'
                }}>
                    {product.description}
                </p>

                <div className="d-flex justify-content-between align-items-end mt-auto border-top border-light pt-3">
                    <div className="pb-1">
                        <span className="text-muted d-block text-uppercase fw-bold" style={{ fontSize: '0.65rem', letterSpacing: '1px', marginBottom: '2px' }}>Precio</span>
                        <span className="h4 mb-0 text-primary fw-bold" style={{ letterSpacing: '-0.5px' }}>€{product.price}</span>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn btn-primary d-flex align-items-center shadow-sm fw-bold px-4 py-2 rounded-3"
                        onClick={() => addToCart(product)}
                    >
                        <i className="bi bi-cart-plus me-2 fs-5"></i> AÑADIR
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;

