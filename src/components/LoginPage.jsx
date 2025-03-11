import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './LoginPage.css';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
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
        setLoading(true);
        setError('');

        try {
            console.log('Attempting login with username:', formData.username);
            const loginResponse = await axios.post('http://localhost:8080/login', formData);
            
            if (loginResponse.data) {
                console.log('Raw login response:', loginResponse.data);
                
                // Store customer data with username for dashboard
                const customerDataToStore = {
                    customerId: loginResponse.data.id,
                    name: loginResponse.data.name,
                    email: loginResponse.data.email,
                    username: loginResponse.data.username || loginResponse.data.name
                };
                
                console.log('Storing customer data:', customerDataToStore);
                localStorage.setItem('customerData', JSON.stringify(customerDataToStore));

                // Check for existing selection data
                try {
                    const selectionResponse = await axios.get(
                        `http://localhost:8080/api/selections/customer/${loginResponse.data.id}`
                    );
                    
                    if (selectionResponse.data) {
                        console.log('Selection data found:', selectionResponse.data);
                        localStorage.setItem('selectionData', JSON.stringify({
                            customerId: loginResponse.data.id,
                            budget: selectionResponse.data.budget,
                            role: selectionResponse.data.role
                        }));
                        navigate('/dashboard');
                    } else {
                        console.log('No selection found, redirecting to selection page');
                        navigate('/selection');
                    }
                } catch (error) {
                    console.log('No selection data, redirecting to selection page');
                    navigate('/selection');
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            let errorMessage = 'An error occurred during login. Please try again.';
            
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        errorMessage = 'Invalid username or password.';
                        break;
                    case 400:
                        errorMessage = 'Invalid login data. Please check your input.';
                        break;
                    case 500:
                        errorMessage = 'Server error. Please try again later.';
                        break;
                    default:
                        errorMessage = error.response.data?.message || errorMessage;
                }
            }
            
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-content">
                    <div className="login-image-section">
                        <h1 className="welcome-text">Welcome Back to<br />WedNest</h1>
                        <p className="tagline">Where Dreams Begin Their Journey</p>
                    </div>
                    <div className="login-form-section">
                        <form className="login-form" onSubmit={handleSubmit}>
                            <h2 className="login-title">Login</h2>
                            {error && <div className="error-message">{error}</div>}
                            
                            <div className="form-group">
                                <label htmlFor="username">Login ID</label>
                                <div className="input-container">
                                    <i className="fas fa-user"></i>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="Enter your Login ID"
                                        required
                                    />
                                </div>
                            </div>

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
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>
                                <div className="forgot-password-link">
                                    <Link to="/forgot-password">Forgot Password?</Link>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="login-button"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span>Logging in...</span>
                                ) : (
                                    <>
                                        <span>Login</span>
                                        <i className="fas fa-arrow-right"></i>
                                    </>
                                )}
                            </button>

                            <div className="signup-link">
                                Don't have an account? {' '}
                                <Link to="/signup" className="signup-text">Sign Up</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
