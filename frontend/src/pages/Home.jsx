import { useEffect, useState } from 'react';
import ProductCard from '../features/products/ProductCard';
import api from '../services/api';
import { Link } from 'react-router-dom';
import ShippingModal from '../components/modals/ShippingModal';
import ContactModal from '../components/modals/ContactModal';
import { motion } from 'framer-motion';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [showShippingModal, setShowShippingModal] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/products');
                setProducts(data.products ? data.products.slice(0, 4) : []);

            } catch (error) {
                console.error("Error fetching products", error);
            }
        };
        fetchProducts();
    }, []);

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="bg-light pb-5">
            {/* Hero Section - Estética Sport Premium */}
            <div className="hero-sport-premium">
                {/* Fondo Dinámico con Luces de Estadio */}
                <div className="hero-gradient-overlay"></div>

                {/* Líneas de Movimiento (Sutiles) */}
                <div style={{
                    position: 'absolute',
                    width: '150%',
                    height: '100%',
                    top: '-50%',
                    left: '-25%',
                    background: 'repeating-linear-gradient(45deg, transparent, transparent 100px, rgba(255,255,255,0.03) 100px, rgba(255,255,255,0.03) 101px)',
                    transform: 'rotate(-15deg)',
                    zIndex: 1
                }}></div>

                <div className="container h-100 position-relative" style={{ zIndex: 5 }}>
                    <div className="row h-100 align-items-center">
                        <div className="col-lg-8">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <span className="badge bg-primary text-white mb-4 px-3 py-2 fw-black text-uppercase shadow-sm" style={{ letterSpacing: '2px' }}>
                                    PERFORMANCE GEAR 2026
                                </span>

                                <h1 className="display-1 fw-black text-white mb-3" style={{ letterSpacing: '-3px', lineHeight: '0.85', textTransform: 'uppercase' }}>
                                    DOMINÁ LA <br />
                                    <span className="text-warning fst-italic">CANCHA</span>
                                </h1>
                                <p className="text-white mb-5 fs-4 fw-light opacity-75" style={{ maxWidth: '600px', lineHeight: '1.4' }}>
                                    Equipamiento de élite para deportistas que no aceptan menos que la victoria. Diseño, potencia y estilo en cada fibra.
                                </p>
                                <div className="d-flex gap-3">
                                    <Link to="/products" className="btn btn-primary btn-lg px-5 py-3 shadow-lg">
                                        VER CATÁLOGO
                                    </Link>
                                    <button 
                                        onClick={() => setShowContactModal(true)} 
                                        className="btn btn-outline-warning btn-lg px-5 py-3 shadow-sm"
                                        style={{ borderWidth: '2px', fontWeight: '800' }}
                                    >
                                        SABER MÁS
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Elemento Decorativo: Brillo de Lente */}
                <div style={{
                    position: 'absolute',
                    bottom: '-10%',
                    right: '-5%',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(0, 85, 255, 0.25) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    zIndex: 2
                }}></div>
            </div>


            <div className="container" style={{ marginTop: '-80px', position: 'relative', zIndex: 10 }}>
                {/* Trust Badges */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="card border-0 shadow-lg rounded-4 p-4 mb-5 glass-effect"
                >
                    <div className="row text-center align-items-center g-4">
                        <div className="col-md-4">
                            <div className="d-flex align-items-center justify-content-center gap-3">
                                <i className="bi bi-shield-check fs-2 text-primary"></i>
                                <div className="text-start">
                                    <span className="fw-bold d-block">Pago Seguro</span>
                                    <small className="text-muted">Stripe 100% Protegido</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 border-start">
                            <div className="d-flex align-items-center justify-content-center gap-3">
                                <i className="bi bi-truck fs-2 text-primary"></i>
                                <div className="text-start">
                                    <span className="fw-bold d-block">Envío Exprés</span>
                                    <small className="text-muted">A todo el país</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 border-start">
                            <div className="d-flex align-items-center justify-content-center gap-3">
                                <i className="bi bi-arrow-repeat fs-2 text-primary"></i>
                                <div className="text-start">
                                    <span className="fw-bold d-block">Devolución Fácil</span>
                                    <small className="text-muted">30 días de garantía</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Featured Products */}
                <div className="d-flex justify-content-between align-items-end mb-5">
                    <div>
                        <h2 className="display-5 fw-bold mb-0">Lo más buscado</h2>
                        <p className="text-muted fs-5">Basado en las tendencias de esta semana</p>
                    </div>
                    <Link to="/products" className="btn btn-outline-primary border-0 fw-bold px-4">
                        Ver Catálogo <i className="bi bi-arrow-right ms-2"></i>
                    </Link>
                </div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="row g-4 mb-5"
                >
                    {products.map(product => (
                        <div className="col-md-6 col-lg-3" key={product._id}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                    {products.length === 0 && (
                        <div className="col-12 text-center py-5">
                            <div className="spinner-border text-primary" role="status"></div>
                            <p className="text-muted mt-3">Descubriendo ofertas...</p>
                        </div>
                    )}
                </motion.div>

                <ShippingModal show={showShippingModal} onClose={() => setShowShippingModal(false)} />
                <ContactModal show={showContactModal} onClose={() => setShowContactModal(false)} />
            </div>
        </div>
    );
};

export default Home;

