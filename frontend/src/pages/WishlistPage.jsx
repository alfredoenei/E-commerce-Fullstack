import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../features/products/ProductCard';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const WishlistPage = () => {
    const { wishlistItems } = useWishlist();

    return (
        <div className="container py-5">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-5"
            >
                <h1 className="fw-bold display-4">Mi Lista de Deseos</h1>
                <p className="lead text-muted">Tus productos favoritos guardados en un solo lugar.</p>
            </motion.div>

            {wishlistItems.length === 0 ? (
                <div className="text-center py-5 glass-effect rounded-4">
                    <i className="bi bi-heart text-muted display-1 mb-4"></i>
                    <h3>Tu lista está vacía</h3>
                    <p className="text-muted mb-4">¡Explora nuestro catálogo y añade lo que más te guste!</p>
                    <Link to="/products" className="btn btn-primary rounded-pill px-5">
                        Ir al Catálogo
                    </Link>
                </div>
            ) : (
                <div className="row g-4">
                    {wishlistItems.map((product) => (
                        <div key={product._id} className="col-md-6 col-lg-4 col-xl-3">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;
