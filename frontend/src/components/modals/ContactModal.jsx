import React from 'react';

const ContactModal = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content rounded-4 border-0 shadow-lg">
                    <div className="modal-header bg-dark text-white border-0 rounded-top-4">
                        <h5 className="modal-title fw-bold">
                            <i className="bi bi-info-circle me-2"></i> Información de Contacto
                        </h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body p-4">
                        <div className="text-center mb-4">
                            <span className="d-inline-block p-3 rounded-circle bg-light text-dark mb-2 shadow-sm">
                                <i className="bi bi-shop fs-1"></i>
                            </span>
                            <h4 className="fw-bold mt-2">Nuestra Tienda</h4>
                            <p className="text-muted">Pasión y Gloria</p>
                        </div>
                        <ul className="list-unstyled">
                            <li className="mb-3 d-flex align-items-center">
                                <div className="me-3 text-center" style={{ width: '30px' }}>
                                    <i className="bi bi-geo-alt-fill text-danger fs-5"></i>
                                </div>
                                <div>
                                    <strong>Dirección:</strong>
                                    <p className="text-muted mb-0 small">Av. del Deporte 1234, Buenos Aires, Argentina</p>
                                </div>
                            </li>
                            <li className="mb-3 d-flex align-items-center">
                                <div className="me-3 text-center" style={{ width: '30px' }}>
                                    <i className="bi bi-envelope-fill text-primary fs-5"></i>
                                </div>
                                <div>
                                    <strong>Email:</strong>
                                    <p className="text-muted mb-0 small">contacto@pasionygloria.com</p>
                                </div>
                            </li>
                            <li className="mb-3 d-flex align-items-center">
                                <div className="me-3 text-center" style={{ width: '30px' }}>
                                    <i className="bi bi-telephone-fill text-success fs-5"></i>
                                </div>
                                <div>
                                    <strong>Teléfono:</strong>
                                    <p className="text-muted mb-0 small">+54 11 1234 5678</p>
                                </div>
                            </li>
                            <li className="d-flex align-items-center">
                                <div className="me-3 text-center" style={{ width: '30px' }}>
                                    <i className="bi bi-clock-fill text-warning fs-5"></i>
                                </div>
                                <div>
                                    <strong>Horarios:</strong>
                                    <p className="text-muted mb-0 small">Lun - Vie: 9:00 - 20:00 / Sáb: 10:00 - 14:00</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="modal-footer border-0 p-3">
                        <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={onClose}>Cerrar</button>
                        <a href="mailto:contacto@pasionygloria.com" className="btn btn-dark rounded-pill px-4 fw-bold">
                            <i className="bi bi-envelope me-2"></i> Escribinos
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactModal;
