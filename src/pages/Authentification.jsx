import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./Authentification.scss";

export default function AuthPage() {
    const navigate = useNavigate();

    // true = Login form, false = Sign Up form
    const [isLogin, setIsLogin] = useState(true);

    // Form data: username (for login or signup), email (only signup), password, confirmPassword (only signup), code (for verification)
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        code: "",
    });

    // Whether to show the verification step (after successful registration)
    const [showVerify, setShowVerify] = useState(false);

    // Handle field changes
    const handleChange = (e) =>
        setFormData((prev) => ({...prev, [e.target.name]: e.target.value}));

    // Toggle between Login and Sign Up (reset all fields)
    const toggleForm = () => {
        setIsLogin(!isLogin);
        setFormData({username: "", email: "", password: "", confirmPassword: "", code: ""});
        setShowVerify(false);
    };

    // Log out: clear localStorage and reload the page
    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("loggedIn");
        window.location.reload();
    };

    // Submit handler for both Login and Sign Up
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLogin) {
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
                    // data = { userId: 42, username: "alice", message: "User logged in successfully" }
                    localStorage.setItem("userId", String(data.userId));
                    localStorage.setItem("username", data.username);
                    localStorage.setItem("loggedIn", "true");
                    alert(data.message);
                    navigate("/shop");
                } else {
                    // If we returned {"error": "..."}, show that message
                    alert("Login failed: " + data.error);
                }
            } catch (err) {
                console.error("Login error:", err);
                alert("Server error. Please try again later.");
            }
            return;
        }

        if (!isLogin && formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            if (isLogin) {
                // ── LOGIN ─────────────────────────────────────────────────────────────
                const resp = await fetch("http://localhost:8080/login/login", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        username: formData.username,
                        password: formData.password,
                    }),
                });

                const text = await resp.text();
                if (resp.ok) {
                    localStorage.setItem("username", formData.username);
                    localStorage.setItem("loggedIn", "true");
                    alert(text || "Logged in successfully!");
                    navigate("/shop");
                } else {
                    alert(`Login failed: ${text}`);
                }
            } else {
                // ── SIGN UP ────────────────────────────────────────────────────────────
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
                    alert(text || "Registration successful! Check your email for a code.");
                    setShowVerify(true);
                } else {
                    alert(`Registration failed: ${text}`);
                }
            }
        } catch (err) {
            console.error(isLogin ? "Login error:" : "Signup error:", err);
            alert("Server error. Please try again later.");
        }
    };

    // Handle email verification (only after sign up)
    const handleVerify = async () => {
        try {
            const resp = await fetch("http://localhost:8080/login/verify", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    email: formData.email,
                    code: formData.code,
                }),
            });
            const text = await resp.text();
            if (resp.ok) {
                alert(text || "Email verified successfully! Please log in now.");
                // Switch back to login form, prefill username/email
                setIsLogin(true);
                setFormData({
                    username: formData.username,
                    email: "",
                    password: "",
                    confirmPassword: "",
                    code: "",
                });
                setShowVerify(false);
            } else {
                alert(`Verification failed: ${text}`);
            }
        } catch (err) {
            console.error("Verify error:", err);
            alert("Server error. Please try again later.");
        }
    };

    const alreadyLoggedIn = localStorage.getItem("loggedIn") === "true";

    return (
        <div className="auth-hero">
            <div className="auth-card">
                {alreadyLoggedIn ? (
                    <>
                        <h2>You are already logged in as "{localStorage.getItem("username")}"</h2>
                        <button className="auth-button" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        {!showVerify ? (
                            <>
                                <h2 className="auth-title">
                                    {isLogin ? "Login to Your Account" : "Create a New Account"}
                                </h2>
                                <form onSubmit={handleSubmit} className="auth-form">
                                    <label className="auth-label">
                                        Username
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            required
                                            className="auth-input"
                                        />
                                    </label>

                                    {!isLogin && (
                                        <label className="auth-label">
                                            Email
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="auth-input"
                                            />
                                        </label>
                                    )}

                                    <label className="auth-label">
                                        Password
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            className="auth-input"
                                        />
                                    </label>

                                    {!isLogin && (
                                        <label className="auth-label">
                                            Confirm Password
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                required
                                                className="auth-input"
                                            />
                                        </label>
                                    )}

                                    <button type="submit" className="auth-button">
                                        {isLogin ? "Login" : "Sign Up"}
                                    </button>
                                </form>

                                <div className="toggle-line">
                                    {isLogin
                                        ? "Don't have an account? "
                                        : "Already have an account? "}
                                    <button onClick={toggleForm} className="toggle-button">
                                        {isLogin ? "Sign Up" : "Login"}
                                    </button>
                                </div>
                            </>
                        ) : (
                            /* ── Verification Step ───────────────────────────────── */
                            <>
                                <h2 className="auth-title">Verify Your Email</h2>
                                <p>
                                    A verification code was sent to <b>{formData.email}</b>. Enter it below:
                                </p>
                                <label className="auth-label">
                                    Code
                                    <input
                                        type="text"
                                        name="code"
                                        value={formData.code}
                                        onChange={handleChange}
                                        required
                                        className="auth-input"
                                    />
                                </label>
                                <button className="auth-button" onClick={handleVerify}>
                                    Verify
                                </button>
                                <button
                                    className="toggle-button"
                                    onClick={() => {
                                        setShowVerify(false);
                                        setFormData({
                                            username: "",
                                            email: "",
                                            password: "",
                                            confirmPassword: "",
                                            code: "",
                                        });
                                    }}
                                >
                                    Back to Sign Up
                                </button>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
