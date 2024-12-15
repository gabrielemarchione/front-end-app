import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { popolaEventi } from "../redux/actions/index";
import { Card, Container, Row, Col, Button, Modal, Form, Badge, Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import RiquadroStatistiche from "./RiquadroStatistiche";
import RecensioniStatiche from "./RecensioniStatiche";
import Filtro from "./Filtro"


const Home = () => {
    const dispatch = useDispatch();
    const eventi = useSelector((state) => state.eventi.items);
    const nome = useSelector((state) => state.token.nome);
    const token = useSelector((state) => state.token.token);
    const navigate = useNavigate();

    const [caroselloEventi, setCaroselloEventi] = useState([]);
    const [secondoCaroselloEventi, setSecondoCaroselloEventi] = useState([]);

    const [showPrenotazione, setShowPrenotazione] = useState(false);
    const [showDettagli, setShowDettagli] = useState(false);
    const [eventoSelezionato, setEventoSelezionato] = useState(null);
    const [postiPrenotati, setPostiPrenotati] = useState(1);
    const [filters, setFilters] = useState({});
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(4);
    const [sortBy, setSortBy] = useState("data");
    const [hasMore, setHasMore] = useState(true);
    const [paginationInfo, setPaginationInfo] = useState({ totalPages: 1, number: 0 });

    //fetchEventi + filtro

    const fetchEventi = useCallback(async () => {
        try {
            const params = new URLSearchParams();


            if (filters.titolo) params.append("titolo", filters.titolo);
            if (filters.data) params.append("data", filters.data);
            if (filters.categoriaEvento) params.append("categoriaEvento", filters.categoriaEvento);
            if (filters.costo) params.append("costo", filters.costo);
            if (filters.organizzatore) params.append("organizzatore", filters.organizzatore);


            params.append("page", page);
            params.append("size", size);
            params.append("sortBy", sortBy);

            const response = await fetch(`http://localhost:3001/evento?${params.toString()}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error("Errore HTTP");
            }

            const data = await response.json();
            dispatch(popolaEventi(data.content));
            setPaginationInfo({ totalPages: data.totalPages, number: data.number });
            setHasMore(data.number + 1 < data.totalPages);
        } catch (error) {
            console.error("Errore nel recupero degli eventi:", error.message);
        }
    }, [filters, page, size, sortBy, dispatch]);


    useEffect(() => {
        fetchEventi();
    }, [fetchEventi]);




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
                throw new Error("l'organizzatore non puà fare una prenotazione per il suo evento");
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
    //fetchCaroselloEventi
    useEffect(() => {
        const fetchCaroselloEventi = async () => {
            try {
                const response = await fetch("http://localhost:3001/evento/carosello", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) {
                    throw new Error("Errore nel recupero degli eventi del carosello");
                }

                const data = await response.json();
                setCaroselloEventi(data);
            } catch (error) {
                console.error("Errore nel caricamento del carosello:", error.message);
            }
        };

        fetchCaroselloEventi();
    }, []);
    // fetchSecondoCaroselloEventi
    useEffect(() => {
        const fetchSecondoCaroselloEventi = async () => {
            try {
                const response = await fetch("http://localhost:3001/evento/carosello-secondo", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) {
                    throw new Error("Errore nel recupero degli eventi del secondo carosello");
                }

                const data = await response.json();

                setSecondoCaroselloEventi(data);
            } catch (error) {
                console.error("Errore nel caricamento del secondo carosello:", error.message);
            }
        };

        fetchSecondoCaroselloEventi();
    }, []);

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({
                behavior: "smooth", block: "start", // Inizia a mostrare l'elemento dalla parte superiore
                inline: "nearest",
            }); // Scorrimento fluido
        }
    };

    return (
        <Container id="top" className="mt-4">
            {/* Hero Section */}

            <div className="hero-section text-center mt-3 mb-5">
                <div className="hero-content">
                    <h1 className="display-4">
                        {token ? (
                            <>Bentornato <span>{nome}!</span></>
                        ) : (
                            <>Benvenuto!</>
                        )}
                    </h1>
                    <p className="lead"> <span className="keyword" onClick={() => scrollToSection("sezioneEventiFiltro")} style={{ cursor: "pointer", textDecoration: "underline" }}>Partecipa</span>  a concerti,  <span className="keywoord-hero-uno">conferenze</span>, mostre e molto altro. <span className="keyword" onClick={() => scrollToSection("carosello2")} style={{ cursor: "pointer", textDecoration: "underline" }} >Prenota</span>  il tuo posto oggi stesso!</p>
                </div>
            </div>

            <hr />
            {/* Carosello */}
            <div className=" mb-4 text-center my-5  titoloSezione">
                <h2 > esplora gli eventi piu interessanti di Palermo e provincia </h2>
            </div>
            {caroselloEventi && caroselloEventi.length > 0 ? (
                <div className="carousel-container w-100 mx-auto ">
                    <Carousel className="mb-5" interval={4000} >
                        {caroselloEventi.map((evento) => (
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
                                            className="me-2 button-style btn-prenota"
                                            onClick={() => handleShowPrenotazione(evento)}
                                        >
                                            Prenota
                                        </Button>
                                        <Button
                                            className="text-dark btn-dettagli"
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
            ) : (
                <p className="text-center">Nessun evento disponibile per il carosello.</p>
            )}
            <hr id="sezioneEventiFiltro" />

            <div className="mb-3  my-5 text-center titoloSezione">
                <h2 > eventi </h2>
            </div>
            {/* Filtro */}
            <Filtro onApplyFilters={(newFilters) => {

                setFilters(newFilters);
                setPage(0);
            }}
            />

            {/* Card eventi */}

            {!eventi || eventi.length === 0 ? (
                <p className="text-center">Non ci sono eventi disponibili.</p>
            ) : (
                <>
                    <Row>
                        {eventi.map((evento) => (
                            <Col key={evento.eventoId} xs={6} md={6} lg={3} className="mb-4">
                                <Card className="event-card mb-2">
                                    <Card.Img
                                        className="event-card-img"
                                        variant="top"
                                        src={evento.immagine || "https://via.placeholder.com/300x200"}
                                    />
                                    <Card.Body>
                                        <Badge pill className="badge-card-custom-rosa mb-2" bg="info" >
                                            {evento.categoriaEvento}
                                        </Badge>
                                        <Card.Title>{evento.titolo}</Card.Title>
                                        <Card.Text >
                                            <strong>Luogo:</strong> {evento.luogo}
                                        </Card.Text>
                                        <Card.Text >
                                            <strong>Data:</strong> {new Date(evento.data).toLocaleDateString()}
                                        </Card.Text>
                                        <Card.Text >
                                            <strong>Orario di inizio:</strong>{" "}
                                            {new Date(evento.orarioInizio).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                        </Card.Text>
                                        <Card.Text >
                                            <strong>Costo:</strong>{" "}
                                            {evento.costo === 0 ? "Gratis" : `€${evento.costo.toFixed(2)}`}
                                        </Card.Text>
                                        <Card.Text>
                                            <Badge bg={evento.postiDisponibili < 5 ? "danger" : "success"}>
                                                {evento.postiDisponibili} posti disponibili
                                            </Badge>
                                        </Card.Text>
                                        <Button
                                            variant="secondary"
                                            className="text-black mb-1 btn-dettagli"
                                            onClick={() => handleShowDettagli(evento)}
                                        >
                                            Dettagli Evento
                                        </Button>
                                        <Button className="btn-prenota" variant="primary" onClick={() => handleShowPrenotazione(evento)}>
                                            Prenota
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    {/* Bottoni di navigazione */}
                    <div className="text-center mt-4">
                        {page > 0 && (
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    setPage((prevPage) => prevPage - 1);
                                }}
                                className="btn-modifica me-2"
                            >
                                Pagina precedente
                            </Button>
                        )}
                        {paginationInfo.totalPages > 1 && page + 1 < paginationInfo.totalPages && (
                            <Button
                                className="btn-modifica"
                                variant="primary"
                                onClick={() => {
                                    setPage((prevPage) => prevPage + 1);
                                }}
                            >
                                Pagina successiva
                            </Button>
                        )}
                    </div>

                </>
            )}

            <hr id="carosello2" />
            {/* Carosello 2 */}
            <div className="mb-3 my-5 text-center titoloSezione">
                <h2 > Eventi in tendenza </h2>
            </div>

            {secondoCaroselloEventi && secondoCaroselloEventi.length > 0 ? (
                <div className="carousel-container w-80 mx-auto">
                    <Carousel className="mb-5" interval={4000} >
                        {secondoCaroselloEventi.map((evento) => (
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
                                            className="me-2 button-style btn-prenota"
                                            onClick={() => handleShowPrenotazione(evento)}
                                        >
                                            Prenota
                                        </Button>
                                        <Button
                                            className="text-dark btn-dettagli"
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
            ) : (
                <p className="text-center">Nessun evento disponibile per il carosello.</p>
            )}

            <hr />
            <RiquadroStatistiche />
            <hr />
          
            <RecensioniStatiche />

           

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
