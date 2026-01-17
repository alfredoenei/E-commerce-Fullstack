import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function formatEUR(cents) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(cents);
}

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePay = async () => {
    setError("");
    setLoading(true);

    if (!user) {
      setLoading(false);
      navigate('/login');
      return;
    }

    try {
      // Map cart items to backend OrderItem schema
      const orderItems = cartItems.map((p) => ({
        name: p.name,
        qty: p.quantity,
        image: p.imageUrl || p.image,
        price: p.price,
        product: p._id,
      }));

      // Create Order in Database
      await api.post('/orders', {
        orderItems,
        paymentMethod: 'Stripe (Simulated)',
        itemsPrice: cartTotal,
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice: cartTotal,
        shippingAddress: {
          address: 'Calle Falsa 123',
          city: 'Springfield',
          postalCode: '12345',
          country: 'USA'
        }
      });

      // Clear Cart and Redirect
      clearCart();
      navigate('/success');

    } catch (e) {
      console.error(e);
      setError(e.response?.data?.message || "Error al procesar la orden");
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2>Tu carrito está vacío 🛒</h2>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/products')}>
          Ver Productos
        </button>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <div className="row g-5">

        {/* Left Column: Form / Action */}
        <div className="col-lg-7">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body p-5">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-credit-card" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z" />
                    <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z" />
                  </svg>
                </div>
                <h1 className="fw-bold m-0">Checkout</h1>
              </div>

              <h2 className="h5 mb-3 text-muted">Completa tu compra</h2>
              <div className="alert alert-info border-0 d-flex align-items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                </svg>
                <span>Modo Test: Se creará una orden en la base de datos.</span>
              </div>

              {error && <div className="alert alert-danger">{error}</div>}

              <button
                className="btn btn-primary btn-lg w-100 rounded-pill mt-4 fw-bold py-3 shadow-sm transition-all"
                onClick={handlePay}
                disabled={loading}
              >
                {loading ? (
                  <span>Wait...</span>
                ) : (
                  `Pagar ${formatEUR(cartTotal)}`
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="col-lg-5">
          <div className="card shadow-sm border-0 rounded-4 bg-white">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="h5 fw-bold m-0 text-secondary text-uppercase small ls-1">Resumen del Pedido</h3>
                <button
                  onClick={clearCart}
                  className="btn btn-sm btn-outline-danger border-0 d-flex align-items-center gap-2"
                  title="Vaciar todo el carrito"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                  </svg>
                  <span className="small">Vaciar</span>
                </button>
              </div>
              <ul className="list-unstyled mb-4">
                {cartItems.map((p) => (
                  <li key={p._id} className="d-flex justify-content-between align-items-center py-3 border-bottom border-light">
                    <div>
                      <span className="fw-semibold text-dark d-block">{p.name}</span>
                      <small className="text-muted">Cant: {p.quantity}</small>
                    </div>
                    <span className="fw-bold text-dark">{formatEUR(p.price * p.quantity)}</span>
                  </li>
                ))}
              </ul>

              <div className="d-flex justify-content-between align-items-center pt-2">
                <span className="h5 fw-bold m-0 text-secondary">Total</span>
                <span className="h3 fw-bold m-0 text-primary">{formatEUR(cartTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
