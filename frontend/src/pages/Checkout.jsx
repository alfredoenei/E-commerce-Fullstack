import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function formatEUR(cents) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(cents);
}

export default function Checkout() {
  const { cartItems, cartTotal, clearCart, removeFromCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [shippingData, setShippingData] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: ""
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    cardHolder: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Cálculo de Precios Sincronizado con Backend
  const itemsPrice = cartTotal;
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const handleShippingChange = (e) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Máscara para Número de Tarjeta (0000 0000 0000 0000)
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    }
    
    // Máscara para Vencimiento (MM/AA)
    if (name === 'expiry') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(?=\d)/g, '$1/').substring(0, 5);
    }

    if (name === 'cvc') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    }

    setPaymentData({ ...paymentData, [name]: formattedValue });
  };

  const handlePay = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!user) {
      setLoading(false);
      navigate('/login');
      return;
    }

    if (!shippingData.address || !shippingData.city || !paymentData.cardNumber) {
      setError("Por favor completa todos los campos de envío y pago.");
      setLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const orderItems = cartItems.map((p) => ({
        name: p.name,
        qty: p.quantity,
        image: p.imageUrl || p.image,
        price: p.price,
        product: p._id,
      }));

      await api.post('/orders', {
        orderItems,
        paymentMethod: 'Tarjeta Crédito (Simulada)',
        shippingAddress: shippingData
      });

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
      <div className="container py-5 text-center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <i className="bi bi-cart-x display-1 text-muted mb-4"></i>
        <h2 className="fw-bold">Tu carrito está vacío</h2>
        <p className="text-secondary mb-4">Parece que aún no has elegido tu equipamiento para la victoria.</p>
        <button className="btn btn-primary px-5 py-3 rounded-pill fw-bold shadow-sm mx-auto" onClick={() => navigate('/products')}>
          EXPLORAR PRODUCTOS
        </button>
      </div>
    )
  }

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <div className="row g-4 g-xl-5">
          
          {/* Columna Izquierda: Formulario (col-lg-8) */}
          <div className="col-lg-8">
            <div className="card shadow-sm border-0 rounded-4 overflow-hidden mb-4">
              <div className="card-header bg-white border-bottom border-light p-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-primary bg-opacity-10 p-2 rounded-3 text-primary">
                    <i className="bi bi-person-check fs-4"></i>
                  </div>
                  <h5 className="fw-bold m-0">Información del Cliente</h5>
                </div>
              </div>
              <div className="card-body p-4 p-md-5">
                <div className="d-flex align-items-center gap-2 mb-4 p-3 bg-light rounded-3 border-start border-primary border-4">
                  <i className="bi bi-person-fill text-primary"></i>
                  <span className="small fw-bold text-uppercase ls-1">{user?.username}</span>
                  <span className="mx-2 text-muted">|</span>
                  <span className="small text-muted">{user?.email}</span>
                </div>

                <form onSubmit={handlePay}>
                  {/* Envío */}
                  <h6 className="text-primary text-uppercase fw-bold ls-1 mb-4 flex align-items-center gap-2">
                    <i className="bi bi-truck"></i> Detalles de Envío
                  </h6>
                  <div className="row g-3 mb-5">
                    <div className="col-12">
                      <label className="form-label small fw-bold text-muted text-uppercase">Dirección de entrega</label>
                      <input type="text" className="form-control py-3 rounded-3" name="address" placeholder="Calle, número, piso/depto" value={shippingData.address} onChange={handleShippingChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-muted text-uppercase">Ciudad</label>
                      <input type="text" className="form-control py-3 rounded-3" name="city" placeholder="Ej: Madrid" value={shippingData.city} onChange={handleShippingChange} required />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label small fw-bold text-muted text-uppercase">CP</label>
                      <input type="text" className="form-control py-3 rounded-3" name="postalCode" placeholder="28001" value={shippingData.postalCode} onChange={handleShippingChange} required />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label small fw-bold text-muted text-uppercase">País</label>
                      <input type="text" className="form-control py-3 rounded-3" name="country" placeholder="España" value={shippingData.country} onChange={handleShippingChange} required />
                    </div>
                  </div>

                  {/* Pago */}
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h6 className="text-primary text-uppercase fw-bold ls-1 m-0 flex align-items-center gap-2">
                      <i className="bi bi-credit-card"></i> Pago Seguro
                    </h6>
                    <div className="d-flex gap-2">
                      <i className="bi bi-stripe text-muted fs-4"></i>
                      <i className="bi bi-shield-lock-fill text-success fs-5"></i>
                    </div>
                  </div>

                  <div className="bg-white border rounded-4 p-4 mb-4 shadow-sm" style={{ borderStyle: 'dashed' }}>
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="form-label small fw-bold text-muted text-uppercase">Nombre en la tarjeta</label>
                        <input type="text" className="form-control py-3 rounded-3" name="cardHolder" placeholder="NOMBRE APELLIDO" value={paymentData.cardHolder} onChange={handlePaymentChange} required />
                      </div>
                      <div className="col-12">
                        <label className="form-label small fw-bold text-muted text-uppercase">Número de Tarjeta</label>
                        <div className="input-group">
                          <span className="input-group-text bg-light border-end-0 rounded-start-3"><i className="bi bi-credit-card"></i></span>
                          <input type="text" className="form-control py-3 border-start-0 ps-0 rounded-end-3" name="cardNumber" placeholder="0000 0000 0000 0000" value={paymentData.cardNumber} onChange={handlePaymentChange} maxLength="19" required />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-bold text-muted text-uppercase">Fecha exp.</label>
                        <input type="text" className="form-control py-3 rounded-3" name="expiry" placeholder="MM/AA" value={paymentData.expiry} onChange={handlePaymentChange} maxLength="5" required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-bold text-muted text-uppercase">CVC</label>
                        <input type="password" className="form-control py-3 rounded-3" name="cvc" placeholder="***" value={paymentData.cvc} onChange={handlePaymentChange} maxLength="4" required />
                      </div>
                    </div>
                  </div>

                  {error && <div className="alert alert-danger rounded-3 py-3 d-flex align-items-center gap-2 animate__animated animate__shakeX">
                    <i className="bi bi-exclamation-triangle-fill"></i> {error}
                  </div>}

                  <button type="submit" className="btn btn-primary w-100 py-3 rounded-pill fw-bold shadow hover-scale mt-3 d-flex align-items-center justify-content-center gap-2" disabled={loading}>
                    {loading ? (
                      <><span className="spinner-border spinner-border-sm"></span> PROCESANDO...</>
                    ) : (
                      <><i className="bi bi-lock-fill"></i> PAGAR {formatEUR(totalPrice)}</>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Resumen (col-lg-4) */}
          <div className="col-lg-4">
            <div className="position-sticky" style={{ top: '100px' }}>
              <div className="card shadow-sm border-0 rounded-4 mb-4">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="fw-bold m-0 flex align-items-center gap-2">
                        <i className="bi bi-cart3 text-primary"></i> Resumen de Compra
                    </h5>
                    <button onClick={clearCart} className="btn btn-sm btn-outline-danger border-0 d-flex align-items-center gap-2 opacity-75" title="Vaciar carrito">
                        <i className="bi bi-trash3"></i>
                        <span className="small fw-bold">VACIAR</span>
                    </button>
                  </div>
                  
                  <div className="custom-scrollbar overflow-auto mb-4" style={{ maxHeight: '300px' }}>
                    {cartItems.map((p) => (
                      <div key={p._id} className="d-flex gap-3 mb-3 pb-3 border-bottom border-light align-items-center">
                        <img src={p.imageUrl || p.image} className="rounded-3 bg-light p-1 object-fit-contain" style={{ width: '60px', height: '60px' }} alt={p.name} />
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between align-items-start">
                            <h6 className="small fw-bold m-0 line-clamp-1 pe-2">{p.name}</h6>
                            <button onClick={() => removeFromCart(p._id)} className="btn btn-link text-danger p-0 border-0" title="Quitar item">
                                <i className="bi bi-x-circle-fill opacity-50"></i>
                            </button>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mt-1">
                            <span className="text-muted small">Cant: {p.quantity}</span>
                            <span className="fw-bold small">{formatEUR(p.price * p.quantity)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="vstack gap-2 mb-4">
                    <div className="d-flex justify-content-between small">
                      <span className="text-secondary">Subtotal</span>
                      <span className="fw-bold">{formatEUR(itemsPrice)}</span>
                    </div>
                    <div className="d-flex justify-content-between small">
                      <span className="text-secondary">Envío</span>
                      <span className={shippingPrice === 0 ? 'text-success fw-bold' : 'fw-bold'}>
                        {shippingPrice === 0 ? 'GRATIS' : formatEUR(shippingPrice)}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between small">
                      <span className="text-secondary">Impuestos (15% IVA)</span>
                      <span className="fw-bold">{formatEUR(taxPrice)}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-top border-2 border-dark d-flex justify-content-between align-items-center">
                    <span className="h5 fw-black m-0">TOTAL</span>
                    <span className="h4 fw-black m-0 text-primary">{formatEUR(totalPrice)}</span>
                  </div>
                </div>
              </div>

              <div className="alert bg-white shadow-sm border-0 rounded-4 p-4 d-flex gap-3 align-items-start small">
                  <i className="bi bi-patch-check-fill text-success fs-4"></i>
                  <div>
                    <span className="fw-bold d-block mb-1">Tu compra es segura</span>
                    <p className="text-muted m-0">Utilizamos encriptación de 256 bits para proteger tus datos financieros en todo momento.</p>
                  </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
