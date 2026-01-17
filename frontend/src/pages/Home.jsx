import { useEffect, useState } from 'react';
import ProductCard from '../features/products/ProductCard';
import api from '../services/api';
import { Link } from 'react-router-dom';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products for "Featured" section
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/products');
                setProducts(data.slice(0, 4)); // Get first 4 products
            } catch (error) {
                console.error("Error fetching products", error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="bg-light" style={{ paddingBottom: '50px' }}>
            {/* Hero Carousel */}
            <div id="mainCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        {/* Premium Hero Section */}
                        <div className="w-100 position-relative" style={{ height: '500px', background: 'linear-gradient(135deg, #001f3f 0%, #003366 100%)', display: 'flex', alignItems: 'center' }}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-8 text-white">
                                        <span className="badge bg-warning text-dark mb-3 px-3 py-2 rounded-pill fw-bold text-uppercase ls-1">Nueva Colección</span>
                                        <h1 className="display-1 fw-bold mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)', letterSpacing: '-1px' }}>
                                            PASIÓN Y <span style={{ color: '#FECB00' }}>GLORIA</span>
                                        </h1>
                                        <p className="lead mb-4 opacity-75" style={{ maxWidth: '600px', fontSize: '1.25rem' }}>
                                            Descubrí la indumentaria oficial y retro de tu equipo. Calidad premium y envíos garantizados a todo el país.
                                        </p>
                                        <div className="d-flex gap-3">
                                            <Link to="/products" className="btn btn-warning btn-lg rounded-pill px-5 py-3 fw-bold text-uppercase shadow-lg hover-scale">
                                                Ver Catálogo
                                            </Link>
                                            <button className="btn btn-outline-light btn-lg rounded-pill px-5 py-3 fw-bold text-uppercase hover-scale">
                                                Más Información
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Abstract Geometric Shapes for Modern Feel */}
                            <div style={{ position: 'absolute', right: '0', top: '0', height: '100%', width: '40%', background: 'rgba(254, 203, 0, 0.1)', clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="w-100" style={{ height: '500px', background: 'linear-gradient(135deg, #00338D 0%, #0055b3 100%)', display: 'flex', alignItems: 'center' }}>
                            <div className="container text-center text-white">
                                <span className="d-inline-block p-3 rounded-circle bg-warning text-primary mb-3 shadow">
                                    <i className="bi bi-truck fs-1"></i>
                                </span>
                                <h2 className="display-3 fw-bold mb-3">Envíos Gratis</h2>
                                <p className="lead fs-3 opacity-90">En tu primera compra superando los €100</p>
                                <button className="btn btn-outline-light rounded-pill px-5 mt-3 fw-bold text-uppercase">Más Detalles</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <div className="container" style={{ marginTop: '-40px', position: 'relative', zIndex: 10 }}>
                {/* Payment Info / Benefits Card */}
                <div className="card border-0 shadow-sm rounded-3 p-3 mb-5">
                    <div className="row text-center align-items-center g-3">
                        <div className="col-md">
                            <i className="bi bi-credit-card fs-4 text-primary d-block mb-1"></i>
                            <span className="fw-bold d-block">Tarjeta de crédito</span>
                            <small className="text-muted">Ver promociones bancarias</small>
                        </div>
                        <div className="col-md border-start">
                            <i className="bi bi-cash-coin fs-4 text-primary d-block mb-1"></i>
                            <span className="fw-bold d-block">Efectivo</span>
                            <small className="text-muted">Ver formas de pago</small>
                        </div>
                        <div className="col-md border-start">
                            <i className="bi bi-truck fs-4 text-success d-block mb-1"></i>
                            <span className="fw-bold d-block">Envío Gratis</span>
                            <small className="text-muted">En productos seleccionados</small>
                        </div>
                    </div>
                </div>

                {/* Featured Products */}
                <div className="d-flex justify-content-between align-items-end mb-4">
                    <div>
                        <h3 className="h2 fw-bold mb-1">Tendencias</h3>
                        <p className="text-muted mb-0">Lo más buscado por los hinchas esta semana</p>
                    </div>
                    <Link to="/products" className="text-decoration-none fw-bold">Ver todo <i className="bi bi-arrow-right"></i></Link>
                </div>
                {/* <h3 className="h4 px-2 mb-3 fw-light">Basado en tu última visita</h3> */}

                <div className="row g-4 mb-5">
                    {products.map(product => (
                        <div className="col-md-3" key={product._id}>
                            {/* Reusing ProductCard but forcing generic styles via container if needed */}
                            {/* Reusing ProductCard */}
                            <div className="h-100">
                                <ProductCard product={product} />
                            </div>
                        </div>
                    ))}
                    {products.length === 0 && (
                        <div className="col-12 text-center py-5">
                            <p className="text-muted">Cargando ofertas...</p>
                        </div>
                    )}
                </div>

                {/* Categories Banner */}

            </div>
        </div>
    );
};

export default Home;
