import React from 'react';
import { Link } from 'react-router-dom';

const ShippingModal = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content rounded-4 border-0 shadow-lg">
                    <div className="modal-header bg-primary text-white border-0 rounded-top-4">
                        <h5 className="modal-title fw-bold">
                            <i className="bi bi-truck me-2"></i> Política de Envíos
                        </h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body p-4">
                        <div className="text-center mb-4">
                            <span className="d-inline-block p-3 rounded-circle bg-light text-primary mb-2">
                                <i className="bi bi-box-seam fs-1"></i>
                            </span>
                            <h4 className="fw-bold mt-2">Envíos Rápidos y Seguros</h4>
                        </div>
                        <ul className="list-unstyled">
                            <li className="mb-3 d-flex align-items-start">
                                <i className="bi bi-check-circle-fill text-success me-3 mt-1 fs-5"></i>
                                <div>
                                    <strong>Envío Gratis:</strong>
                                    <p className="text-muted mb-0 small">En todos los pedidos superiores a €100 dentro de la península.</p>
                                </div>
                            </li>
                            <li className="mb-3 d-flex align-items-start">
                                <i className="bi bi-clock-fill text-primary me-3 mt-1 fs-5"></i>
                                <div>
                                    <strong>Tiempos de Entrega:</strong>
                                    <p className="text-muted mb-0 small">Entrega estándar en 3-5 días hábiles. Envío express en 24-48 horas.</p>
                                </div>
                            </li>
                            <li className="d-flex align-items-start">
                                <i className="bi bi-shield-check text-primary me-3 mt-1 fs-5"></i>
                                <div>
                                    <strong>Garantía de Entrega:</strong>
                                    <p className="text-muted mb-0 small">Todos los envíos están asegurados y cuentan con código de seguimiento.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="modal-footer border-0 p-3">
                        <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={onClose}>Cerrar</button>
                        <Link to="/products" className="btn btn-warning rounded-pill px-4 fw-bold" onClick={onClose}>Ir a la Tienda</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingModal;
