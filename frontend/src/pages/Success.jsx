import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export default function Success() {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const isMock = searchParams.get('mock');

    return (
        <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <div className="card shadow-lg border-0 rounded-4 text-center p-4" style={{ maxWidth: "500px", width: "100%" }}>
                <div className="card-body">
                    <div className="mb-4">
                        {/* SVG Checkmark Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-check-circle-fill text-success" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>
                    </div>

                    <h1 className="fw-bold mb-3 text-dark">¡Pago Exitoso!</h1>
                    <p className="text-muted mb-4">Gracias por tu compra. Estamos procesando tu pedido.</p>

                    {isMock && (
                        <div className="alert alert-warning d-flex align-items-center justify-content-center gap-2 p-2 small mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                            </svg>
                            <span>Esto fue un pago <strong>SIMULADO</strong> (Modo Mock).</span>
                        </div>
                    )}

                    <div className="bg-light rounded-3 p-3 mb-4 text-start">
                        <p className="mb-1 small text-uppercase text-muted fw-bold">Detalles de la Transacción</p>
                        <p className="mb-0 text-break font-monospace small">{sessionId || "N/A"}</p>
                    </div>

                    <Link to="/" className="btn btn-primary btn-lg rounded-pill px-5 w-100 fw-bold">
                        Volver al Inicio
                    </Link>
                </div>
            </div>
        </div>
    );
}
