import { useState, useEffect } from 'react';
import api from '../../services/api';
import ProductCard from './ProductCard';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Hook useEffect: Se ejecuta cuando el componente se "monta" (carga por primera vez).
    // Aquí es donde idealmente hacemos peticiones a una API externa.
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Hacemos una petición GET a nuestro backend para traer los productos
                const { data } = await api.get('/products');
                setProducts(data); // Guardamos los datos en el estado
            } catch (err) {
                // Manejo de errores amigable
                setError(err.response?.data?.message || 'Error loading products');
            } finally {
                // Siempre desactivamos el spinner de carga, haya éxito o error
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="container py-5">
            {/* Banner */}
            {/* Banner */}
            <div className="rounded-4 p-5 mb-5 text-center position-relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #001f3f 0%, #003366 100%)', color: 'white' }}>
                <div className="position-relative z-1">
                    <span className="badge bg-warning text-dark mb-2 px-3 py-2 rounded-pill fw-bold text-uppercase ls-1">Catálogo 2024</span>
                    <h1 className="fw-bold display-4 mb-3">Nuestra Colección</h1>
                    <p className="lead opacity-75 mx-auto" style={{ maxWidth: '600px' }}>
                        Calidad, pasión y gloria. Encontrá la indumentaria que te representa en cada partido.
                    </p>
                </div>
                {/* Decorative circle */}
                <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'rgba(254, 203, 0, 0.1)', borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '150px', height: '150px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '50%' }}></div>
            </div>

            <h2 className="mb-4 fw-bold text-secondary small text-uppercase ls-1">Todos los Productos</h2>

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : error ? (
                <div className="alert alert-danger">{error}</div>
            ) : (
                <div className="row g-4">
                    {products.map((product) => (
                        <div key={product._id} className="col-md-6 col-lg-4 col-xl-3">
                            <ProductCard product={product} />
                        </div>
                    ))}
                    {products.length === 0 && (
                        <div className="col-12 text-center py-5">
                            <p className="text-muted">No hay productos disponibles por ahora.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductList;
