import React from 'react';

function Login({ onLogin }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        onLogin(email, password);
    };

    return (
        <div className="card p-4 bg-light text-dark shadow-lg border-0 rounded-4">
            <h2 className="card-title mb-4 text-center fw-bold">Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label fw-semibold">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control rounded-3"
                        placeholder="usuario@educastur.org"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-semibold">Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control rounded-3"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success w-100 fw-bold rounded-3">
                    <strong>Entrar</strong>
                </button>
            </form>
        </div>
    );
}

export default Login;