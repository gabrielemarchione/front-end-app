import { useState } from "react";
import { Button, Form, Row, Col, Collapse } from "react-bootstrap";

const Filtro = ({ onApplyFilters }) => {
    const [titolo, setTitolo] = useState("");
    const [data, setData] = useState("");
    const [categoriaEvento, setCategoriaEvento] = useState("");
    const [costo, setCosto] = useState("");
    const [open, setOpen] = useState(false);
    const [organizzatore, setOrganizzatore] = useState("");

    const handleFilter = () => {
        console.log("Data inviata: " + data);
        onApplyFilters({ titolo, data, categoriaEvento, costo, organizzatore });
    };

    const handleReset = () => {
        setTitolo("");
        setData("");
        setCategoriaEvento("");
        setCosto("");
        setOrganizzatore("");
        onApplyFilters({});
    };

    return (
        <div className="mb-4">
            {/* Pulsante per mostrare/nascondere il filtro */}
            <div className="d-flex justify-content-end" >
                <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="filtro-collapse"
                    aria-expanded={open}
                    variant="info"
                    className="mb-2 btn-filtro"
                >
                    {open ? "Nascondi filtri" : "Mostra filtri evento"}
                </Button>
            </div>
            <Collapse in={open}>
                <div id="filtro-collapse" className="filtro-container">
                    <Form className="p-3 border rounded shadow">
                        <Row className="align-items-end">

                            <Col xs={12} md={3} className="mb-2 ">
                                <Form.Group controlId="titolo">
                                    <Form.Label>Titolo</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Inserisci titolo"
                                        value={titolo}
                                        onChange={(e) => setTitolo(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={3} className="mb-2">
                                <Form.Group controlId="data">
                                    <Form.Label>Data</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={data}
                                        onChange={(e) => setData(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={3} className="mb-2">
                                <Form.Group controlId="categoriaEvento">
                                    <Form.Label>Categoria Evento</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={categoriaEvento}
                                        onChange={(e) => setCategoriaEvento(e.target.value)}
                                    >
                                        <option value="">Tutte</option>
                                        <option value="Concerto">Concerto</option>
                                        <option value="Conferenza">Conferenza</option>
                                        <option value="Corso">Corso</option>
                                        <option value="EventoAziendale">Evento Aziendale</option>
                                        <option value="EventoBenefico">Evento Benefico</option>
                                        <option value="EventoComunitario">Evento Comunitario</option>
                                        <option value="FestaCompleanno">Festa di Compleanno</option>
                                        <option value="FestaPrivata">Festa Privata</option>
                                        <option value="FestivalCibo">Festival del Cibo</option>
                                        <option value="FestivalMusica">Festival della Musica</option>
                                        <option value="Hackathon">Hackathon</option>
                                        <option value="MostraArte">Mostra d'Arte</option>
                                        <option value="MostraFotografia">Mostra Fotografica</option>
                                        <option value="PresentazioneLibro">Presentazione Libro</option>
                                        <option value="SportBasket">Sport - Basket</option>
                                        <option value="SportCalcio">Sport - Calcio</option>
                                        <option value="SportTennis">Sport - Tennis</option>
                                        <option value="Teatro">Teatro</option>
                                        <option value="Webinar">Webinar</option>
                                        <option value="Workshop">Workshop</option>

                                    </Form.Control>
                                </Form.Group>
                            </Col>

                            <Col xs={12} md={3} className="mb-2">
                                <Form.Group controlId="costo">
                                    <Form.Label>Costo Massimo</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Inserisci costo"
                                        value={costo}
                                        onChange={(e) => setCosto(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>

                            <Col xs={12} md={3} className="mb-2 ">
                                <Form.Group controlId="organizzatore">
                                    <Form.Label>Organizzatore</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Inserisci organizzatore"
                                        value={organizzatore}
                                        onChange={(e) => setOrganizzatore(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>

                        </Row>
                        <Row className="justify-content-end mt-3">
                            <Col xs="auto">
                                <Button variant="primary" className="btn-modifica" onClick={handleFilter}>
                                    Applica
                                </Button>
                            </Col>
                            <Col xs="auto">
                                <Button variant="secondary" className="btn-cancella" onClick={handleReset}>
                                    Resetta
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Collapse>
        </div>
    );
};

export default Filtro;
