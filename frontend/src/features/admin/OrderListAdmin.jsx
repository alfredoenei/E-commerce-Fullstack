import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

const OrderListAdmin = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await api.get('/orders');
                setOrders(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div>
            <h2 className="h4 fw-bold mb-4">Ordenes (Admin)</h2>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>ID</th>
                                <th>USUARIO</th>
                                <th>FECHA</th>
                                <th>TOTAL</th>
                                <th>PAGADO</th>
                                <th>DETALLES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id.substring(0, 10)}...</td>
                                    <td>{order.user && order.user.name}</td>
                                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td>€{order.totalPrice.toFixed(2)}</td>
                                    <td>
                                        {order.isPaid ? (
                                            <span className="badge bg-success">Si</span>
                                        ) : (
                                            <span className="badge bg-danger">No</span>
                                        )}
                                    </td>
                                    <td>
                                        <button className="btn btn-sm btn-outline-primary">
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
    );
};

export default OrderListAdmin;
