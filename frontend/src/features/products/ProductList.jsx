import { useState, useEffect } from 'react';
import api from '../../services/api';
import ProductCard from './ProductCard';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const { data } = await api.get(`/products?pageNumber=${page}`);
                setProducts(data.products);
                setPages(data.pages);
            } catch (err) {
                setError(err.response?.data?.message || 'Error loading products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [page]);

    return (
        <div className="container py-5">
            {/* Banner */}
            <div className="rounded-4 p-5 mb-5 text-center position-relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: 'white' }}>
                <div className="position-relative z-1">
                    <span className="badge bg-primary mb-2 px-3 py-2 rounded-pill fw-bold text-uppercase ls-1">Catálogo 2024</span>
                    <h1 className="fw-bold display-4 mb-3">Nuestra Colección</h1>
                    <p className="lead opacity-75 mx-auto" style={{ maxWidth: '600px' }}>
                        Calidad, pasión y gloria. Todo lo que necesitás para tu deporte favorito.
                    </p>
                </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold text-secondary small text-uppercase ls-1 m-0">Todos los Productos</h2>
                <span className="text-muted small">Página {page} de {pages}</span>
            </div>

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : error ? (
                <div className="alert alert-danger">{error}</div>
            ) : (
                <>
                    <div className="row g-4 mb-5">
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

                    {/* Pagination */}
                    {pages > 1 && (
                        <nav className="d-flex justify-content-center mt-5">
                            <ul className="pagination gap-2">
                                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                                    <button className="page-link rounded-3 border-0 shadow-sm px-4 py-2" onClick={() => setPage(page - 1)}>
                                        <i className="bi bi-chevron-left me-1"></i> Anterior
                                    </button>
                                </li>
                                {[...Array(pages).keys()].map((x) => (
                                    <li key={x + 1} className={`page-item ${x + 1 === page ? 'active' : ''}`}>
                                        <button className="page-link rounded-3 border-0 shadow-sm px-4 py-2" onClick={() => setPage(x + 1)}>
                                            {x + 1}
                                        </button>
                                    </li>
                                ))}
                                <li className={`page-item ${page === pages ? 'disabled' : ''}`}>
                                    <button className="page-link rounded-3 border-0 shadow-sm px-4 py-2" onClick={() => setPage(page + 1)}>
                                        Siguiente <i className="bi bi-chevron-right ms-1"></i>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    )}
                </>
            )}
        </div>
    );
};

export default ProductList;

