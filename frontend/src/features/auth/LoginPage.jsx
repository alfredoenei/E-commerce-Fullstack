import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="card shadow-lg border-0 rounded-4 p-4" style={{ maxWidth: '450px', width: '100%' }}>
                <div className="card-body">
                    <h2 className="text-center fw-bold mb-4 text-primary">Iniciar Sesión</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label text-muted small fw-bold">Email</label>
                            <input
                                type="email"
                                className="form-control rounded-pill px-3"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label text-muted small fw-bold">Contraseña</label>
                            <input
                                type="password"
                                className="form-control rounded-pill px-3"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 rounded-pill fw-bold py-2 shadow-sm">
                            Entrar
                        </button>
                    </form>
                    <div className="text-center mt-4 pt-3 border-top">
                        <small className="text-muted">
                            ¿No tienes cuenta? <Link to="/register" className="fw-bold text-decoration-none">Regístrate aquí</Link>
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
