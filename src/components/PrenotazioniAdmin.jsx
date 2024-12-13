import React, { useEffect, useState } from "react";
import { Table, Button, Spinner, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { popolaEventi } from "../redux/actions/index";

const PrenotazioniAdmin = () => {
    const [prenotazioni, setPrenotazioni] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = useSelector((state) => state.token.token);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPrenotazioni = async () => {
            try {
                const response = await fetch("http://localhost:3001/prenotazioni", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) throw new Error("Errore nel caricamento delle prenotazioni.");

                const data = await response.json();
                setPrenotazioni(data.content || data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPrenotazioni();
    }, [token]);

    const handleDelete = async (prenotazioneId) => {
        try {
            const response = await fetch(`http://localhost:3001/prenotazioni/lemieprenotazioni/${prenotazioneId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error("Errore durante l'eliminazione della prenotazione.");

            setPrenotazioni(prenotazioni.filter((p) => p.prenotazioneId !== prenotazioneId));

            // ricarica gli eventi dal backend per aggiornare i posti disponibili
            const fetchResponse = await fetch("http://localhost:3001/evento", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!fetchResponse.ok) {
                throw new Error("Errore nel recupero degli eventi");
            }

            const data = await fetchResponse.json();
            dispatch(popolaEventi(data.content));

            alert("Prenotazione cancellata con successo!");
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <div>
            <h2>Gestione Prenotazioni</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Evento</th>
                        <th>Utente</th>
                        <th>Posti Prenotati</th>
                        <th>Azioni</th>
                    </tr>
                </thead>
                <tbody>
                    {prenotazioni.map((prenotazione) => (
                        <tr key={prenotazione.prenotazioneId}>
                            <td>{prenotazione.prenotazioneId}</td>
                            <td>{prenotazione.evento?.titolo || "Non disponibile"}</td>
                            <td>{prenotazione.utente ? `${prenotazione.utente.nome} ${prenotazione.utente.cognome}` : "Anonimo"}</td>
                            <td>{prenotazione.postiPrenotati}</td>
                            <td>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(prenotazione.prenotazioneId)}
                                >
                                    Elimina
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default PrenotazioniAdmin;
