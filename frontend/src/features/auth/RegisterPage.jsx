import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const { register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData.username, formData.email, formData.password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="card shadow-lg border-0 rounded-4 p-4" style={{ maxWidth: '450px', width: '100%' }}>
                <div className="card-body">
                    <h2 className="text-center fw-bold mb-4 text-primary">Crear Cuenta</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label text-muted small fw-bold">Usuario</label>
                            <input
                                type="text"
                                name="username"
                                className="form-control rounded-pill px-3"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label text-muted small fw-bold">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control rounded-pill px-3"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label text-muted small fw-bold">Contraseña</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control rounded-pill px-3"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 rounded-pill fw-bold py-2 shadow-sm">
                            Registrarse
                        </button>
                    </form>
                    <div className="text-center mt-4 pt-3 border-top">
                        <small className="text-muted">
                            ¿Ya tienes cuenta? <Link to="/login" className="fw-bold text-decoration-none">Ingresa aquí</Link>
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
