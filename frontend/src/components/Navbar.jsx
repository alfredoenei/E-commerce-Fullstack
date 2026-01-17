import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartItems } = useCart();
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/products?search=${searchTerm}`);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg sticky-top shadow-lg" style={{ backgroundColor: '#001f3f', zIndex: 1000 }}>
            <div className="container">
                {/* Brand */}
                <Link className="navbar-brand me-4 d-flex align-items-center" to="/">
                    <span className="fs-3 fw-bold fst-italic" style={{ color: '#FECB00', letterSpacing: '-1px' }}>MARKET ALFREDO</span>
                </Link>

                {/* Mobile Toggle */}
                <button className="navbar-toggler border-0 text-warning" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                    <i className="bi bi-list fs-1"></i>
                </button>

                {/* Navbar Content */}
                <div className="collapse navbar-collapse" id="navbarContent">

                    {/* Centered Search Bar */}
                    <form onSubmit={handleSearch} className="d-flex mx-auto my-3 my-lg-0" style={{ maxWidth: '600px', width: '100%' }}>
                        <div className="input-group">
                            <input
                                className="form-control border-0 rounded-start-pill ps-4"
                                type="search"
                                placeholder="Buscar camisetas, botines..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ height: '45px' }}
                            />
                            <button className="btn btn-warning border-0 rounded-end-pill px-4" type="submit">
                                <i className="bi bi-search text-primary"></i>
                            </button>
                        </div>
                    </form>

                    {/* Actions */}
                    <ul className="navbar-nav ms-auto align-items-center gap-3">

                        {/* Social Icons */}
                        <li className="nav-item d-none d-lg-flex gap-2 me-2 border-end pe-3 border-secondary">
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-white-50 hover-yellow"><i className="bi bi-instagram fs-5"></i></a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-white-50 hover-yellow"><i className="bi bi-linkedin fs-5"></i></a>
                            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-white-50 hover-yellow"><i className="bi bi-github fs-5"></i></a>
                        </li>

                        {/* Admin Link (Discreet) */}
                        {user?.role === 'admin' && (
                            <li className="nav-item">
                                <Link to="/admin/products" className="text-warning text-decoration-none fw-bold small text-uppercase">
                                    <i className="bi bi-shield-lock me-1"></i> Panel
                                </Link>
                            </li>
                        )}

                        {/* User User */}
                        {user ? (
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-white d-flex align-items-center gap-2" href="#" role="button" data-bs-toggle="dropdown">
                                    <div className="bg-warning text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '35px', height: '35px' }}>
                                        {user.username.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="d-none d-lg-block">{user.username}</span>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-3 mt-2">
                                    <li><Link className="dropdown-item py-2" to="/profile"><i className="bi bi-bag me-2"></i> Mis Compras</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><button className="dropdown-item py-2 text-danger" onClick={logout}><i className="bi bi-box-arrow-right me-2"></i> Salir</button></li>
                                </ul>
                            </li>
                        ) : (
                            <li className="nav-item d-flex gap-2">
                                <Link className="btn btn-outline-light rounded-pill px-4 btn-sm" to="/login">Ingresá</Link>
                                <Link className="btn btn-warning rounded-pill px-4 btn-sm fw-bold text-primary" to="/register">Creá tu cuenta</Link>
                            </li>
                        )}

                        {/* Cart */}
                        <li className="nav-item">
                            <Link to="/checkout" className="btn position-relative text-white border-0">
                                <i className="bi bi-cart3 fs-4"></i>
                                {cartItems.length > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-primary border border-primary">
                                        {cartItems.length}
                                    </span>
                                )}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
