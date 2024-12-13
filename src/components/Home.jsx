import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { popolaEventi } from "../redux/actions/index";
import { Card, Container, Row, Col, Button, Modal, Form, Badge, Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch();
    const eventi = useSelector((state) => state.eventi.items);
    const nome = useSelector((state) => state.token.nome);
    const token = useSelector((state) => state.token.token);
    const navigate = useNavigate();

    const [showPrenotazione, setShowPrenotazione] = useState(false);
    const [showDettagli, setShowDettagli] = useState(false);
    const [eventoSelezionato, setEventoSelezionato] = useState(null);
    const [postiPrenotati, setPostiPrenotati] = useState(1);
//fetchEventi
    useEffect(() => {
        const fetchEventi = async () => {
            try {
                const response = await fetch("http://localhost:3001/evento", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) {
                    throw new Error("Errore HTTP");
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

        if (eventoSelezionato.postiDisponibili < postiPrenotati) {
            alert("Posti terminati! Non puoi prenotare.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/prenotazioni", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    eventoId: eventoSelezionato.eventoId,
                    postiPrenotati,
                }),
            });

            if (!response.ok) {
                throw new Error("Errore durante la prenotazione");
            }

            // aggiorna senza necessità di fetch
            const updatedEventi = eventi.map((evento) =>
                evento.eventoId === eventoSelezionato.eventoId
                    ? { ...evento, postiDisponibili: evento.postiDisponibili - postiPrenotati }
                    : evento
            );

            dispatch(popolaEventi(updatedEventi));
            alert("Prenotazione effettuata con successo!");
            navigate("/home");
        } catch (error) {
            alert("Errore: " + error.message);
        } finally {
            setShowPrenotazione(false);
            setEventoSelezionato(null);
            setPostiPrenotati(1);
        }
    };

    const handleShowPrenotazione = (evento) => {
        if (!token) {
            alert("Devi essere loggato per effettuare una prenotazione.");
            navigate("/login");
            return;
        }
        setEventoSelezionato(evento);
        setShowPrenotazione(true);
    };

    const handleShowDettagli = (evento) => {
        setEventoSelezionato(evento);
        setShowDettagli(true);
    };

    const handleCloseDettagli = () => {
        setShowDettagli(false);
        setEventoSelezionato(null);
    };

    const handleClosePrenotazione = () => {
        setShowPrenotazione(false);
        setEventoSelezionato(null);
        setPostiPrenotati(1);
    };

   

    return (
        <Container className="mt-4">
            {/* Hero Section */}
            <div className="hero-section text-center mb-5 p-5" >
                <h1 className="display-4">Benvenuto {nome}!</h1>
                <p className="lead">Esplora gli eventi più interessanti di Palermo e provincia.</p>
            </div>

            {/* Carosello */}

            {eventi && eventi.length > 0 && (
                <div className="carousel-container w-80 mx-auto">
                    <Carousel
                        className="mb-5"
                        interval={5000} // Intervallo globale in millisecondi
                    >
                        {eventi.slice(0, 3).map((evento) => ( 
                            
                            <Carousel.Item key={evento.eventoId}>
                                <img
                                    className="d-block w-100"
                                    src={evento.immagine || "https://via.placeholder.com/800x400"}
                                    alt={evento.titolo}
                                />
                                <Carousel.Caption>
                                    <h3>{evento.titolo}</h3>
                                    <div className="d-flex justify-content-end">
                                        <Button
                                            variant="primary"
                                            className="me-2 button-style"
                                            onClick={() => handleShowPrenotazione(evento)}
                                        >
                                            Prenota
                                        </Button>
                                        <Button
                                        className="text-dark "
                                            variant="secondary"
                                            onClick={() => handleShowDettagli(evento)}
                                        >
                                            Dettagli Evento
                                        </Button>
                                    </div>
                                </Carousel.Caption>
                            </Carousel.Item>
                        ))}
                        
                    </Carousel>
                </div>
            )}


            {/* Card eventi */}
            {!eventi || eventi.length === 0 ? (
                <p className="text-center">Non ci sono eventi disponibili.</p>
            ) : (
                <Row>
                    {eventi.map((evento) => (
                        <Col key={evento.eventoId} md={4} className="mb-4">
                            <Card className="event-card">
                                <Card.Img
                                    variant="top"
                                    src={evento.immagine || "https://via.placeholder.com/300x200"}
                                />
                                <Card.Body>
                                    <Badge pill bg="info" className="mb-2">
                                        {evento.categoriaEvento}
                                    </Badge>
                                    <Card.Title>{evento.titolo}</Card.Title>
                                    <Card.Text>
                                        <strong>Luogo:</strong> {evento.luogo}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Data:</strong> {new Date(evento.data).toLocaleDateString()}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Costo:</strong> {evento.costo === 0 ? "Gratis" : `€${evento.costo.toFixed(2)}`}
                                    </Card.Text>

                                    <Card.Text>
                                        <Badge bg={evento.postiDisponibili < 5 ? "danger" : "success"}>
                                            {evento.postiDisponibili} posti disponibili
                                        </Badge>
                                    </Card.Text>
                                    <Button
                                        variant="secondary"
                                        className="text-black mb-1"
                                        onClick={() => handleShowDettagli(evento)}
                                    >
                                        Dettagli Evento
                                    </Button>
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

            {/* Modal Dettagli Evento */}
            <Modal show={showDettagli} onHide={handleCloseDettagli}>
                <Modal.Header closeButton>
                    <Modal.Title>Dettagli Evento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {eventoSelezionato && (
                        <>
                            <p>
                                <strong>Titolo:</strong> {eventoSelezionato.titolo}
                            </p>
                            <p>
                                <strong>Descrizione:</strong> {eventoSelezionato.descrizione}
                            </p>
                            <p>
                                <strong>Data:</strong> {new Date(eventoSelezionato.data).toLocaleDateString()}
                            </p>
                            <p>
                                <strong>Luogo:</strong> {eventoSelezionato.luogo}
                            </p>
                            <p>
                                <strong>Posti Disponibili:</strong> {eventoSelezionato.postiDisponibili}
                            </p>
                            <p>
                                <strong>Costo:</strong> €{eventoSelezionato.costo.toFixed(2)}
                            </p>
                            <p>
                                <strong>Categoria:</strong> {eventoSelezionato.categoriaEvento}
                            </p>
                            <p>
                                <strong>Organizzatore:</strong> {`${eventoSelezionato.organizzatore.nome} ${eventoSelezionato.organizzatore.cognome}`}
                            </p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDettagli}>
                        Chiudi
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal Prenotazione */}
            <Modal show={showPrenotazione} onHide={handleClosePrenotazione}>
                <Modal.Header closeButton>
                    <Modal.Title>Conferma Prenotazione</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Sei sicuro di voler prenotare l'evento "{eventoSelezionato?.titolo}"?</p>
                    <Form>
                        <Form.Group controlId="postiPrenotati">
                            <Form.Label>Numero di posti:</Form.Label>
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
