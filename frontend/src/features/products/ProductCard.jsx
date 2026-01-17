import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
            <div style={{ height: '200px', overflow: 'hidden' }}>
                <img
                    src={product.imageUrl}
                    className="card-img-top w-100 h-100 object-fit-contain p-2"
                    alt={product.name}
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://dummyimage.com/600x400/00338d/fecb00.png&text=Sin+Imagen'; }}
                />
            </div>
            <div className="card-body d-flex flex-column">
                <Link to={`/products/${product._id}`} className="text-decoration-none text-dark">
                    <h5 className="card-title fw-bold">{product.name}</h5>
                </Link>
                <div className="mb-2">
                    <span className="badge bg-light text-secondary border">{product.category}</span>
                </div>
                <p className="card-text text-muted small flex-grow-1" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: '2',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                    {product.description}
                </p>
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="h5 mb-0 text-primary fw-bold">€{product.price}</span>
                    <button
                        className="btn btn-primary btn-sm rounded-pill px-3"
                        onClick={() => addToCart(product)}
                    >
                        Agregar +
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
