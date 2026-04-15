import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className="navbar navbar-expand-lg fixed-top shadow-sm bg-white py-3">
            <div className="container">
                {/* Brand */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link className="navbar-brand d-flex align-items-center" to="/">
                        <div className="d-flex flex-column">
                            <span className="fs-4 lh-1 fw-black">MARKET</span>
                            <span className="fs-5 lh-1 text-primary fw-bold">ALFREDO</span>
                        </div>
                    </Link>
                </motion.div>

                {/* Mobile Toggle */}
                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Content */}
                <div className="collapse navbar-collapse" id="navbarContent">
                    {/* Centered Search Bar */}
                    <form onSubmit={handleSearch} className="d-flex mx-auto my-3 my-lg-0 px-lg-3" style={{ maxWidth: '500px', width: '100%' }}>
                        <div className="input-group bg-light rounded-pill border-0 px-2 shadow-none" style={{ transition: 'all 0.3s' }}>
                            <input
                                className="form-control border-0 ps-3 bg-transparent small"
                                type="search"
                                placeholder="BUSCAR EQUIPAMIENTO..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ height: '45px', fontSize: '0.85rem', letterSpacing: '0.5px' }}
                            />
                            <button className="btn btn-link text-muted p-2" type="submit">
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                    </form>

                    {/* Actions */}
                    <ul className="navbar-nav ms-auto align-items-center gap-4">
                        {/* Admin Link */}
                        {user?.role === 'admin' && (
                            <li className="nav-item">
                                <Link to="/admin/products" className="nav-link small text-uppercase fw-bold">
                                    Admin
                                </Link>
                            </li>
                        )}

                        {/* User Actions */}
                        {user ? (
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle d-flex align-items-center gap-2" href="#" role="button" data-bs-toggle="dropdown">
                                    <div className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center border border-light shadow-sm" style={{ width: '36px', height: '36px', fontSize: '0.85rem' }}>
                                        {user.username.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="d-none d-lg-block small text-uppercase fw-bold">{user.username}</span>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-3 p-2 mt-2">
                                    <li><Link className="dropdown-item small text-uppercase py-2" to="/profile">Mis Pedidos</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><button className="dropdown-item small text-uppercase py-2 text-danger" onClick={logout}>Salir</button></li>
                                </ul>
                            </li>
                        ) : (
                            <li className="nav-item d-flex align-items-center gap-3">
                                <Link className="nav-link nav-link-custom small text-uppercase fw-bold" to="/login">LOGIN</Link>
                                <Link className="btn btn-primary px-4 py-2 rounded-pill fw-bold shadow-sm" style={{ fontSize: '0.8rem' }} to="/register">UNIRME</Link>
                            </li>
                        )}

                        {/* Icons */}
                        <div className="d-flex align-items-center gap-2">
                             <li className="nav-item">
                                <Link to="/wishlist" className="nav-link p-2">
                                    <i className="bi bi-heart fs-5"></i>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/checkout" className="nav-link p-2">
                                    <div className="position-relative">
                                        <i className="bi bi-cart3 fs-5"></i>
                                        <AnimatePresence>
                                            {cartCount > 0 && (
                                                <motion.span
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    exit={{ scale: 0 }}
                                                    className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-primary border border-white"
                                                    style={{ padding: '0.35em 0.5em', fontSize: '0.6rem' }}
                                                >
                                                    {cartCount}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </Link>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>

    );
};

export default Navbar;

