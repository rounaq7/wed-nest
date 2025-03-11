import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './SignupPage.css';

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        email: '',
        address: '',
        phnumber: '',
        loginId: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords don't match");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.firstName,
                    email: formData.email,
                    address: formData.address,
                    phnumber: formData.phnumber ? parseInt(formData.phnumber) : null,
                    loginId: formData.loginId,
                    password: formData.password
                })
            });

            const data = await response.text();
            
            if (response.ok) {
                navigate('/login');
            } else if (response.status === 409) {
                // 409 Conflict - Email already exists
                setError(data || 'Email already exists. Please use a different email address.');
            } else {
                setError(data || 'Registration failed. Please try again.');
            }
        } catch (err) {
            setError('Failed to connect to the server. Please try again.');
            console.error('Signup error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <div className="signup-content">
                    <div className="signup-image-section">
                        <h1 className="welcome-text">Welcome to<br />WedNest</h1>
                        <p className="tagline">Create Your Account Today</p>
                    </div>
                    <div className="signup-form-section">
                        <form className="signup-form" onSubmit={handleSubmit}>
                            <h2 className="signup-title">Sign Up</h2>
                            {error && <div className="error-message">{error}</div>}
                            
                            <div className="form-group">
                                <label htmlFor="firstName">Name</label>
                                <div className="input-container">
                                    <i className="fas fa-user"></i>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your name"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <div className="input-container">
                                    <i className="fas fa-envelope"></i>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <div className="input-container">
                                    <i className="fas fa-home"></i>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Enter your address"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="phnumber">Phone Number</label>
                                    <div className="input-container">
                                        <i className="fas fa-phone"></i>
                                        <input
                                            type="tel"
                                            id="phnumber"
                                            name="phnumber"
                                            value={formData.phnumber}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter phone number"
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="loginId">Login ID</label>
                                    <div className="input-container">
                                        <i className="fas fa-id-card"></i>
                                        <input
                                            type="text"
                                            id="loginId"
                                            name="loginId"
                                            value={formData.loginId}
                                            onChange={handleChange}
                                            required
                                            placeholder="Choose a login ID"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <div className="input-container">
                                        <i className="fas fa-lock"></i>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter password"
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <div className="input-container">
                                        <i className="fas fa-lock"></i>
                                        <input
                                            type="password"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                            placeholder="Confirm password"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="signup-button" disabled={loading}>
                                {loading ? (
                                    <span>Creating Account...</span>
                                ) : (
                                    <>
                                        <span>Sign Up</span>
                                        <i className="fas fa-arrow-right"></i>
                                    </>
                                )}
                            </button>

                            <div className="login-link">
                                Already have an account? <Link to="/login">Login here</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;