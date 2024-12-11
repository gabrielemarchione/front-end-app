import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";

const Registrazione = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        nome: "",
        cognome: "",
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRegistrazione = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Errore durante la registrazione");
            }

            alert("Registrazione completata con successo!");
            navigate("/login"); // Reindirizza al login dopo la registrazione
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center">Registrati</h2>
            <Form onSubmit={handleRegistrazione} className="mt-4">
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        placeholder="Inserisci il tuo username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="password" className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Inserisci la tua password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="email" className="mt-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Inserisci la tua email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="nome" className="mt-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        type="text"
                        name="nome"
                        placeholder="Inserisci il tuo nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="cognome" className="mt-3">
                    <Form.Label>Cognome</Form.Label>
                    <Form.Control
                        type="text"
                        name="cognome"
                        placeholder="Inserisci il tuo cognome"
                        value={formData.cognome}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-4 w-100">
                    Registrati
                </Button>
            </Form>

            <p className="text-center mt-3">
                Hai già un account? 
                <Button variant="link" onClick={() => navigate("/login")} className="p-0">
                    Clicca qui
                </Button>
                per accedere.
            </p>
        </Container>
    );
};

export default Registrazione;
