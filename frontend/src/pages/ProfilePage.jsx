import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await api.get('/orders/myorders');
                setOrders(data);
            } catch (err) {
                setError(err.response?.data?.message || 'Error loading orders');
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchOrders();
        }
    }, [user]);

    if (!user) {
        return <div className="container py-5">Please login</div>;
    }

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm border-0 rounded-4">
                        <div className="card-body text-center p-5">
                            <div className="bg-primary bg-opacity-10 p-4 rounded-circle d-inline-block mb-3 text-primary h1">
                                {user.username.charAt(0).toUpperCase()}
                            </div>
                            <h2 className="h4 fw-bold">{user.username}</h2>
                            <p className="text-muted">{user.email}</p>
                            <span className="badge bg-secondary">{user.role}</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <h3 className="h4 fw-bold mb-4">Mis Pedidos</h3>
                    {loading ? (
                        <p>Cargando pedidos...</p>
                    ) : error ? (
                        <div className="alert alert-danger">{error}</div>
                    ) : orders.length === 0 ? (
                        <div className="alert alert-info">No tienes pedidos aún.</div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover border rounded-3 overflow-hidden">
                                <thead className="table-light">
                                    <tr>
                                        <th>ID</th>
                                        <th>Fecha</th>
                                        <th>Total</th>
                                        <th>Estado</th>
                                        <th>Detalles</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order._id}>
                                            <td className="font-monospace small">{order._id.substring(0, 10)}...</td>
                                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                            <td className="fw-bold">€{order.totalPrice.toFixed(2)}</td>
                                            <td>
                                                {order.isPaid ? (
                                                    <span className="badge bg-success">Pagado</span>
                                                ) : (
                                                    <span className="badge bg-warning text-dark">Pendiente</span>
                                                )}
                                            </td>
                                            <td>
                                                <button className="btn btn-sm btn-outline-primary rounded-pill">
                                                    Ver
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
