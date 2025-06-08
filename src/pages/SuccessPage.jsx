import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import './SuccessPage.scss';

export default function SuccessPage() {
    const {search} = useLocation();
    const navigate = useNavigate();
    const [sessionId, setSessionId] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(search);
        const id = params.get('session_id');
        setSessionId(id);
    }, [search]);

    return (
        <div className="success-container">
            <h1>Thank you for your purchase! Kiko Timisoara</h1>
            {sessionId && <p>Your session ID is <code>{sessionId}</code></p>}
            <button className="btn-back" onClick={() => navigate('/shop')}>Continue Shopping</button>
        </div>
    );
}
