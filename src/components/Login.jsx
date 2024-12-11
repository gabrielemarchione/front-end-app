import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/actions";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error("Login fallito. Controlla le tue credenziali.");
            }

            const data = await response.json();
            const token = data.token;

            // Salva il token nel Redux Store e nel localStorage
            dispatch(setToken(token));
            localStorage.setItem("token", token);

            alert("Login avvenuto con successo!");
            navigate("/home"); // Reindirizza alla home
        } catch (error) {
            setError(error.message);
        }
    };

    const handleNavigateToRegister = () => {
        navigate("/signup");
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 className="text-center">Login</h2>
                    <Form onSubmit={handleLogin} className="mt-4">
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Inserisci il tuo username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="password" className="mt-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Inserisci la tua password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-4 w-100">
                            Accedi
                        </Button>
                    </Form>

                    <p className="text-center mt-3">
                        Non sei registrato? 
                        <Button variant="link" onClick={handleNavigateToRegister} className="p-0">
                            Clicca qui
                        </Button>
                        per registrarti.
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
