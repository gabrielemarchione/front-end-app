import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SetTokenAction } from "../redux/actions";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Token ricevuto:", data.token);

                const token = data.token; // Estrarre il token dalla risposta
                if (!token) {
                    throw new Error("Token non trovato nella risposta");
                }

                dispatch(SetTokenAction(token)); // Salva solo il token
                navigate("/home"); // Reindirizza alla home
            } else {
                const error = await response.json();
                alert(error.message);
            }
        } catch (error) {
            console.error("Errore durante il login:", error);
            alert(error.message || "Si è verificato un errore. Riprova più tardi.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default Login;

