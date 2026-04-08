import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer-premium" style={{ backgroundColor: 'var(--brand-blue-dark)', color: '#fff', borderTop: '4px solid var(--brand-yellow)' }}>
            <div className="container py-5">
                <div className="row g-5">
                    {/* Brand & Mission */}
                    <div className="col-lg-4">
                        <h4 className="fw-black text-uppercase mb-4" style={{ letterSpacing: '1px' }}>
                            MARKET <span className="text-primary">ALFREDO</span>
                        </h4>
                        <p className="text-white-50 lh-lg mb-4">
                            Líderes en equipamiento deportivo de élite. Nuestra misión es potenciar tu rendimiento con la mejor tecnología y estilo del mercado internacional.
                        </p>
                        <div className="d-flex gap-3">
                            <a href="#" className="text-white opacity-50 hover-white fs-5"><i className="bi bi-instagram"></i></a>
                            <a href="#" className="text-white opacity-50 hover-white fs-5"><i className="bi bi-twitter-x"></i></a>
                            <a href="#" className="text-white opacity-50 hover-white fs-5"><i className="bi bi-facebook"></i></a>
                            <a href="#" className="text-white opacity-50 hover-white fs-5"><i className="bi bi-youtube"></i></a>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="col-6 col-lg-2">
                        <h6 className="text-uppercase fw-bold mb-4 text-warning small" style={{ letterSpacing: '2px' }}>Navegación</h6>
                        <ul className="list-unstyled">
                            <li className="mb-2"><Link to="/" className="text-decoration-none text-white-50 hover-yellow">Inicio</Link></li>
                            <li className="mb-2"><Link to="/products" className="text-decoration-none text-white-50 hover-yellow">Catálogo</Link></li>
                            <li className="mb-2"><Link to="/profile" className="text-decoration-none text-white-50 hover-yellow">Mi Cuenta</Link></li>
                            <li className="mb-2"><Link to="/checkout" className="text-decoration-none text-white-50 hover-yellow">Checkout</Link></li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div className="col-6 col-lg-2">
                        <h6 className="text-uppercase fw-bold mb-4 text-warning small" style={{ letterSpacing: '2px' }}>Asistencia</h6>
                        <ul className="list-unstyled">
                            <li className="mb-2"><a href="#" className="text-decoration-none text-white-50 hover-yellow">Guía de Talles</a></li>
                            <li className="mb-2"><a href="#" className="text-decoration-none text-white-50 hover-yellow">Envíos y Entregas</a></li>
                            <li className="mb-2"><a href="#" className="text-decoration-none text-white-50 hover-yellow">Devoluciones</a></li>
                            <li className="mb-2"><a href="#" className="text-decoration-none text-white-50 hover-yellow">Contacto</a></li>
                        </ul>
                    </div>

                    {/* Newsletter Mockup */}
                    <div className="col-lg-4">
                        <h6 className="text-uppercase fw-bold mb-4 text-warning small" style={{ letterSpacing: '2px' }}>Newsletter</h6>
                        <p className="text-white-50 small mb-4">Suscribite para recibir ofertas exclusivas y lanzamientos anticipados.</p>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control bg-dark border-secondary text-white small" placeholder="Tu Email" style={{ borderRadius: '0' }} />
                            <button className="btn btn-primary text-uppercase small" style={{ borderRadius: '0', fontSize: '0.7rem' }}>Ok</button>
                        </div>
                        <div className="d-flex gap-3 fs-3 opacity-25 mt-4">
                            <i className="bi bi-stripe"></i>
                            <i className="bi bi-paypal"></i>
                            <i className="bi bi-credit-card-2-front"></i>
                        </div>
                    </div>
                </div>

                <hr className="my-5 opacity-10" />

                <div className="row align-items-center">
                    <div className="col-md-6 text-center text-md-start">
                        <p className="text-white-50 small mb-0">
                            &copy; {new Date().getFullYear()} Market Alfredo. Designed for Victory.
                        </p>
                    </div>
                    <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
                        <div className="small text-white-50">
                            <a href="#" className="text-decoration-none text-white-50 me-4">Privacidad</a>
                            <a href="#" className="text-decoration-none text-white-50">Términos</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

