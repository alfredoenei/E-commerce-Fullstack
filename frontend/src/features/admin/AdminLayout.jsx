import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';

const AdminLayout = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!loading && (!user || user.role !== 'admin')) {
            navigate('/');
        }
    }, [user, loading, navigate]);

    if (loading) return <div>Loading...</div>;

    if (!user || user.role !== 'admin') return null;

    return (
        <div className="d-flex" style={{ minHeight: 'calc(100vh - 56px)' }}>
            {/* Sidebar */}
            <div className="bg-light border-end" style={{ width: '250px' }}>
                <div className="p-3">
                    <h5 className="fw-bold text-secondary">Admin Panel</h5>
                </div>
                <div className="list-group list-group-flush">
                    <Link
                        to="/admin/products"
                        className={`list-group-item list-group-item-action ${location.pathname.includes('/products') ? 'active' : ''}`}
                    >
                        Productos
                    </Link>
                    <Link
                        to="/admin/orders"
                        className={`list-group-item list-group-item-action ${location.pathname.includes('/orders') ? 'active' : ''}`}
                    >
                        Ordenes
                    </Link>
                </div>
            </div>

            {/* Content */}
            <div className="flex-grow-1 p-4 bg-white">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
