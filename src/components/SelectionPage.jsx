import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SelectionPage.css';

const SelectionPage = () => {
    const navigate = useNavigate();
    const [customerDetails, setCustomerDetails] = useState(null);
    const [formData, setFormData] = useState({
        role: '',
        budget: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const storedData = localStorage.getItem('customerData');
        if (!storedData) {
            navigate('/login');
            return;
        }
        setCustomerDetails(JSON.parse(storedData));
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const selectionDTO = {
                customerId: customerDetails.customerId,
                budget: Number(formData.budget),
                role: formData.role
            };

            console.log('Submitting selection data:', selectionDTO);
            
            const response = await axios.post('http://localhost:8080/api/selections', selectionDTO);

            if (response.status === 201 || response.status === 200) {
                console.log('Selection created successfully:', response.data);
                
                // Store the selection data in localStorage
                const selectionDataToStore = {
                    budget: Number(formData.budget),
                    role: formData.role
                };
                
                console.log('Storing selection data:', selectionDataToStore);
                localStorage.setItem('selectionData', JSON.stringify(selectionDataToStore));
                
                // Navigate to dashboard
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Selection creation error:', error);
            setError(
                error.response?.data?.message || 
                'Failed to save your preferences. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="selection-page">
            <div className="selection-container">
                <div className="selection-content">
                    <div className="selection-image-section">
                        <h1 className="welcome-text">Welcome to<br />Event Nest</h1>
                        <p className="tagline">Let's Personalize Your Journey</p>
                        <div className="customer-info">
                            <h3>Welcome, {customerDetails?.name}</h3>
                        </div>
                    </div>
                    
                    <div className="selection-form-section">
                        <form className="selection-form" onSubmit={handleSubmit}>
                            <h2 className="selection-title">Your Preferences</h2>
                            {error && <div className="error-message">{error}</div>}

                            <div className="form-group">
                                <label>I am the</label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                                    className="role-select"
                                    required
                                >
                                    <option value="">Select your role</option>
                                    <option value="BRIDE">Bride</option>
                                    <option value="GROOM">Groom</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Wedding Budget</label>
                                <div className="budget-input-container">
                                    <input
                                        type="number"
                                        name="budget"
                                        value={formData.budget}
                                        onChange={(e) => setFormData({...formData, budget: e.target.value})}
                                        placeholder="Enter amount in ₹"
                                        className="budget-input"
                                        min="100000"
                                        required
                                    />
                                    <p className="budget-hint">Minimum budget: ₹1,00,000</p>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="submit-button"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span>Processing...</span>
                                ) : (
                                    <span>Continue to Dashboard</span>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectionPage;
