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

  // Estados para manejar los datos del formulario de envío
  // Es importante tener un estado para cada campo que el usuario va a completar
  const [shippingData, setShippingData] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: ""
  });

  // Estados para simular los datos de pago
  // En una aplicación real, estos datos sensibles se manejan con cuidado (ej. Stripe Elements)
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    cardHolder: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Manejador genérico para cambios en los inputs de envío
  const handleShippingChange = (e) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  };

  // Manejador genérico para cambios en los inputs de pago
  const handlePaymentChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handlePay = async (e) => {
    e.preventDefault(); // Prevenimos el recargo de la página al enviar el form
    setError("");
    setLoading(true);

    if (!user) {
      setLoading(false);
      navigate('/login');
      return;
    }

    // Validación simple: verificamos que los campos obligatorios no estén vacíos
    if (!shippingData.address || !shippingData.city || !paymentData.cardNumber) {
      setError("Por favor completa todos los campos de envío y pago.");
      setLoading(false);
      return;
    }

    try {
      // Simulamos una demora de red para dar feedback visual al usuario (loading spinner)
      // Esto mejora la experiencia de usuario (UX)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mapeamos los items del carrito al formato que espera el backend
      const orderItems = cartItems.map((p) => ({
        name: p.name,
        qty: p.quantity,
        image: p.imageUrl || p.image,
        price: p.price,
        product: p._id,
      }));

      // Enviamos la orden al backend
      // Notar que enviamos la dirección real ingresada por el usuario
      await api.post('/orders', {
        orderItems,
        paymentMethod: 'Tarjeta Crédito (Simulada)',
        itemsPrice: cartTotal,
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice: cartTotal,
        shippingAddress: shippingData // Usamos los datos del estado
      });

      // Limpiamos el carrito y redirigimos a la página de éxito
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

        {/* Columna Izquierda: Formulario de Checkout */}
        <div className="col-lg-7">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body p-5">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-primary">
                  <i className="bi bi-credit-card-2-front fs-3"></i>
                </div>
                <h1 className="fw-bold m-0">Finalizar Compra</h1>
              </div>

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handlePay}>
                {/* Sección: Datos de Envío */}
                <h4 className="mb-3 text-secondary">
                  <i className="bi bi-geo-alt me-2"></i>Dirección de Envío
                </h4>
                <div className="row g-3 mb-4">
                  <div className="col-12">
                    <label className="form-label text-muted small fw-bold">Dirección Completa</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      placeholder="Ej: Av. Siempreviva 742"
                      value={shippingData.address}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-muted small fw-bold">Ciudad</label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      placeholder="Ej: Springfield"
                      value={shippingData.city}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label text-muted small fw-bold">CP</label>
                    <input
                      type="text"
                      className="form-control"
                      name="postalCode"
                      placeholder="1234"
                      value={shippingData.postalCode}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label text-muted small fw-bold">País</label>
                    <input
                      type="text"
                      className="form-control"
                      name="country"
                      placeholder="Argentina"
                      value={shippingData.country}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                </div>

                {/* Sección: Datos de Pago (Simulación) */}
                <h4 className="mb-3 text-secondary">
                  <i className="bi bi-credit-card me-2"></i>Método de Pago
                </h4>
                <div className="alert alert-info border-0 d-flex align-items-center gap-2 small">
                  <i className="bi bi-info-circle-fill"></i>
                  <span><strong>Modo Simulación:</strong> Puedes usar datos ficticios. No se realizará ningún cargo real.</span>
                </div>

                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label text-muted small fw-bold">Nombre en la tarjeta</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cardHolder"
                      placeholder="Como figura en el plástico"
                      value={paymentData.cardHolder}
                      onChange={handlePaymentChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label text-muted small fw-bold">Número de Tarjeta</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0"><i className="bi bi-credit-card"></i></span>
                      <input
                        type="text"
                        className="form-control border-start-0"
                        name="cardNumber"
                        placeholder="0000 0000 0000 0000"
                        value={paymentData.cardNumber}
                        onChange={handlePaymentChange}
                        maxLength="19"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-muted small fw-bold">Vencimiento (MM/AA)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="expiry"
                      placeholder="12/25"
                      value={paymentData.expiry}
                      onChange={handlePaymentChange}
                      maxLength="5"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-muted small fw-bold">CVC</label>
                    <input
                      type="password"
                      className="form-control"
                      name="cvc"
                      placeholder="123"
                      value={paymentData.cvc}
                      onChange={handlePaymentChange}
                      maxLength="4"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 rounded-pill mt-5 fw-bold py-3 shadow-sm hover-scale transition-all"
                  disabled={loading}
                >
                  {loading ? (
                    <span><span className="spinner-border spinner-border-sm me-2"></span>Procesando...</span>
                  ) : (
                    `Pagar ${formatEUR(cartTotal)}`
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Resumen (Sin cambios mayores, solo visual) */}
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
                  <i className="bi bi-trash"></i>
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
