import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import { useCart } from '../../context/CartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/${id}`);
                setProduct(data);
            } catch (err) {
                setError('Producto no encontrado');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="container py-5 text-center">Loading...</div>;
    if (error) return <div className="container py-5 text-center text-danger"><h2>{error}</h2></div>;
    if (!product) return null;

    return (
        <div className="container py-5">
            <Link to="/products" className="btn btn-outline-secondary mb-4">
                &larr; Volver
            </Link>
            <div className="row g-5 align-items-center">
                <div className="col-md-6">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="img-fluid rounded-4 shadow-sm w-100"
                        style={{ maxHeight: '500px', objectFit: 'contain', backgroundColor: '#f8f9fa' }}
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://dummyimage.com/600x600/00338d/fecb00.png&text=Sin+Imagen'; }}
                    />
                </div>
                <div className="col-md-6">
                    <span className="badge bg-primary mb-2">{product.category || 'Oficial'}</span>
                    <h1 className="fw-bold mb-3">{product.name}</h1>
                    <p className="lead text-muted mb-4">{product.description}</p>

                    <h2 className="text-primary fw-bold mb-4">€{product.price}</h2>

                    <div className="d-grid gap-2 d-md-block">
                        <button
                            className="btn btn-primary btn-lg rounded-pill px-5 me-md-2"
                            onClick={() => addToCart(product)}
                        >
                            Agregar al Carrito
                        </button>
                    </div>

                    <div className="mt-4 p-3 bg-light rounded-3 border">
                        <div className="d-flex align-items-center gap-2 mb-2">
                            <i className="bi bi-truck text-success"></i>
                            <strong>Envío Gratis</strong>
                            <span className="text-muted small">a todo el país</span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <i className="bi bi-shield-check text-success"></i>
                            <strong>Garantía Oficial</strong>
                            <span className="text-muted small">30 días de cambio</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
