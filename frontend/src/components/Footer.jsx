import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#001f3f', color: '#fff', paddingTop: '3rem', paddingBottom: '1.5rem' }}>
            <div className="container">
                <div className="row g-4 justify-content-between">
                    {/* Brand Section */}
                    <div className="col-md-4">
                        <h4 className="fw-bold fst-italic mb-3" style={{ color: '#FECB00' }}>MARKET ALFREDO</h4>
                        <p className="text-white-50">
                            La tienda oficial de la pasión. Encontrá todo lo que necesitás para alentar al único grande.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-md-3">
                        <h5 className="fw-bold mb-3 text-white">Navegación</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2"><Link to="/" className="text-decoration-none text-white-50 hover-yellow">Inicio</Link></li>
                            <li className="mb-2"><Link to="/products" className="text-decoration-none text-white-50 hover-yellow">Productos</Link></li>
                            <li className="mb-2"><Link to="/profile" className="text-decoration-none text-white-50 hover-yellow">Mi Cuenta</Link></li>
                            <li className="mb-2"><Link to="/cart" className="text-decoration-none text-white-50 hover-yellow">Carrito</Link></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="col-md-3">
                        <h5 className="fw-bold mb-3 text-white">Seguinos</h5>
                        <div className="d-flex gap-3">
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="btn btn-outline-warning rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                <i className="bi bi-instagram"></i>
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="btn btn-outline-warning rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                <i className="bi bi-linkedin"></i>
                            </a>
                            <a href="https://github.com" target="_blank" rel="noreferrer" className="btn btn-outline-warning rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                <i className="bi bi-github"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <hr className="my-4 border-secondary" />

                <div className="text-center text-white-50 small">
                    &copy; {new Date().getFullYear()} Market Alfredo. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
