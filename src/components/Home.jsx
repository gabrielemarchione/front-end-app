import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { popolaEventi } from "../redux/actions/index";
import { Card, Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch();
    const eventi = useSelector((state) => state.eventi.items);
    const nome = useSelector((state) => state.token.nome);
    const token = useSelector((state) => state.token.token);
    const navigate = useNavigate();

    const [showPrenotazione, setShowPrenotazione] = useState(false);
    const [eventoSelezionato, setEventoSelezionato] = useState(null);
    const [postiPrenotati, setPostiPrenotati] = useState(1);

    useEffect(() => {
        const fetchEventi = async () => {
            try {
                const response = await fetch("http://localhost:3001/evento", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`Errore HTTP`);
                }

                const data = await response.json();
                dispatch(popolaEventi(data.content));
            } catch (error) {
                console.error("Errore nel recupero degli eventi:", error.message);
            }
        };

        fetchEventi();
    }, [dispatch]);

    const handlePrenotazione = async () => {
        if (!eventoSelezionato) return;

        try {
            const response = await fetch("http://localhost:3001/prenotazioni", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    eventoId: eventoSelezionato.eventoId,
                    postiPrenotati: postiPrenotati, // Numero di posti selezionati
                }),
            });

            if (!response.ok) {
                throw new Error("Posti terminati");
            }

            const updatedEventi = eventi.map((evento) =>
                evento.eventoId === eventoSelezionato.eventoId
                    ? { ...evento, postiDisponibili: evento.postiDisponibili - postiPrenotati }
                    : evento
            );

            dispatch(popolaEventi(updatedEventi));
            alert("Prenotazione effettuata con successo!");
        } catch (error) {
            alert("Errore: " + error.message);
        } finally {
            setShowPrenotazione(false);
            setEventoSelezionato(null);
            setPostiPrenotati(1); // Reset posti prenotati
        }
    };

    const handleShowPrenotazione = (evento) => {
        if (!token) {
            alert("Devi essere loggato per effettuare una prenotazione.");
            navigate("/login"); // Redireziona al login
            return;
        }
        setEventoSelezionato(evento);
        setShowPrenotazione(true);
    };

    const handleClosePrenotazione = () => {
        setShowPrenotazione(false);
        setEventoSelezionato(null);
        setPostiPrenotati(1); // Reset posti prenotati
    };

    return (
        <Container className="mt-4">
            <h1 className="text-center mb-4">Benvenuto {nome}!</h1>
            {!eventi || eventi.length === 0 ? (
                <p className="text-center">Non ci sono eventi disponibili.</p>
            ) : (
                <Row>
                    {eventi.map((evento) => (
                        <Col key={evento.eventoId} md={4} className="mb-4">
                            <Card>
                                <Card.Img
                                    variant="top"
                                    src={
                                        evento.organizzatore.avatarUrl ||
                                        "https://via.placeholder.com/150"
                                    }
                                />
                                <Card.Body>
                                    <Card.Title>{evento.titolo}</Card.Title>
                                    <Card.Text>
                                        <strong>Descrizione:</strong> {evento.descrizione}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Data:</strong> {new Date(evento.data).toLocaleDateString()}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Luogo:</strong> {evento.luogo}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Costo:</strong> €{evento.costo.toFixed(2)}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Posti Disponibili:</strong> {evento.postiDisponibili} / {evento.postiMassimi}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Categoria:</strong> {evento.categoriaEvento}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Organizzatore:</strong> {`${evento.organizzatore.nome} ${evento.organizzatore.cognome}`}
                                    </Card.Text>
                                    <Button
                                        variant="primary"
                                        onClick={() => handleShowPrenotazione(evento)}
                                    >
                                        Prenota
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            {/* Modal per confermare la prenotazione */}
            <Modal show={showPrenotazione} onHide={handleClosePrenotazione}>
                <Modal.Header closeButton>
                    <Modal.Title>Conferma Prenotazione</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Sei sicuro di voler prenotare l'evento "{eventoSelezionato?.titolo}"?</p>
                    <Form>
                        <Form.Group controlId="postiPrenotati">
                            <Form.Label>Numero di posti da prenotare:</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max={eventoSelezionato?.postiDisponibili || 1}
                                value={postiPrenotati}
                                onChange={(e) => setPostiPrenotati(Number(e.target.value))}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClosePrenotazione}>
                        Annulla
                    </Button>
                    <Button variant="success" onClick={handlePrenotazione}>
                        Conferma
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Home;
