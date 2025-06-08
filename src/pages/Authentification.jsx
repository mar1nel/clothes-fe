import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";
import "./Authentification.scss";

export default function AuthPage() {
    const navigate = useNavigate();
    const {login, logout, userId} = useAuth();

    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        code: "",
    });
    const [showVerify, setShowVerify] = useState(false);

    const handleChange = (e) =>
        setFormData((prev) => ({...prev, [e.target.name]: e.target.value}));

    const toggleForm = () => {
        setIsLogin((f) => !f);
        setFormData({username: "", email: "", password: "", confirmPassword: "", code: ""});
        setShowVerify(false);
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLogin) {
            // ── LOGIN ─────────────────────────────────────────
            try {
                const resp = await fetch("http://localhost:8080/login/login", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        username: formData.username,
                        password: formData.password,
                    }),
                });
                const data = await resp.json();
                if (resp.ok) {
                    login(data.userId);
                    navigate("/shop");
                } else {
                    alert("Login failed: " + data.error);
                }
            } catch (err) {
                console.error(err);
                alert("Server error. Please try again later.");
            }
            return;
        }

        // ── SIGN UP ───────────────────────────────────────
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            const resp = await fetch("http://localhost:8080/login/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                }),
            });
            const text = await resp.text();
            if (resp.ok) {
                alert(text);
                setShowVerify(true);
            } else {
                alert("Registration failed: " + text);
            }
        } catch (err) {
            console.error(err);
            alert("Server error. Please try again later.");
        }
    };

    const handleVerify = async () => {
        try {
            const resp = await fetch("http://localhost:8080/login/verify", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email: formData.email, code: formData.code}),
            });
            const text = await resp.text();
            if (resp.ok) {
                alert("Verified! Please log in.");
                setShowVerify(false);
                setIsLogin(true);
                setFormData((fd) => ({...fd, password: "", confirmPassword: "", code: ""}));
            } else {
                alert("Verification failed: " + text);
            }
        } catch (err) {
            console.error(err);
            alert("Server error. Please try again later.");
        }
    };

    const alreadyLoggedIn = Boolean(userId);

    return (
        <div className="auth-hero">
            <div className="auth-card">
                {alreadyLoggedIn ? (
                    <>
                        <h2>You are already logged in</h2>
                        <button className="auth-button" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : showVerify ? (
                    <>
                        <h2>Verify Your Email</h2>
                        <p>A code was sent to {formData.email}. Enter it below:</p>
                        <input
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            placeholder="Verification code"
                        />
                        <button onClick={handleVerify}>Verify</button>
                    </>
                ) : (
                    <>
                        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Username"
                                required
                            />
                            {!isLogin && (
                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    required
                                />
                            )}
                            <input
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                required
                            />
                            {!isLogin && (
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm Password"
                                    required
                                />
                            )}
                            <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
                        </form>
                        <div className="toggle-line">
                            <button onClick={toggleForm} className="toggle-button">
                                {isLogin ? "Switch to Sign Up" : "Switch to Login"}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
