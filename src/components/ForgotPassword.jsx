import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Here you would typically make an API call to your backend
            // For now, we'll simulate a successful response
            setMessage('Password reset link has been sent to your email!');
            setError('');
            
            // Redirect to login page after 3 seconds
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            setError('Failed to send reset link. Please try again.');
            setMessage('');
        }
    };

    return (
        <div className="forgot-password-container">
            <form className="forgot-password-form" onSubmit={handleSubmit}>
                <h2 className="forgot-password-title">Reset Password</h2>
                {message && <div className="success-message">{message}</div>}
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                    />
                </div>
                <button type="submit" className="reset-button">Send Reset Link</button>
                <div className="back-to-login">
                    <a href="/login">Back to Login</a>
                </div>
            </form>
        </div>
    );
}

export default ForgotPassword; 