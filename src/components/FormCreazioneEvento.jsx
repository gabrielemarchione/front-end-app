import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Card, Container } from "react-bootstrap";

const FormCreazioneEvento = () => {
  const [titolo, setTitolo] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [data, setData] = useState("");
  const [luogo, setLuogo] = useState("");
  const [costo, setCosto] = useState("");
  const [postiMassimi, setPostiMassimi] = useState("");
  const [categoriaEvento, setCategoriaEvento] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({}); 
  const [isOnline, setIsOnline] = useState(false);


  
  const token = useSelector((state) => state.token.token);
  const ruoliUtente = useSelector((state) => state.token.ruoli);
  const navigate = useNavigate();

  if (!ruoliUtente.includes("ADMIN") && !ruoliUtente.includes("ORGANIZZATORE")) {
    return <p>Non sei autorizzato a creare un evento.</p>;
  }
  //enum per form evento
  const categorieDisponibili = [
    "LAN_PARTY",
    "LECTIO_MAGISTRALIS",
    "CORSO",
    "RACCOLTA_FONDI",
    "MOSTRA_VIDEOGIOCHI",
    "BASKET",
    "WORKSHOP",
    "WEBINAR",
    "RITIRO_SPIRITUALE",
    "MOSTRA_ARTE",
    "HACKATHON",
    "PRESENTAZIONE_LIBRO",
    "FIERE_COMMERCIALI",
    "CERIMONIA_RELGIOSA",
    "PARTITA_CALCIO",
    "DANZA",
    "SPETTACOLO_BAMBINI",
    "FESTIVAL_CIBO",
    "TENNIS",
    "MUSICA",
    "TEATRO",
    "EVENTO_COMUNITA",
    "DEGUSTAZIONE_VINI",
    "SAGRA",
    "SPORT_ACQUATICI",
    "PALLAVOLO",
    "ANNIVERSARIO",
    "CINEMA",
    "FESTA_FAMIGLIA",
    "CORSA",
    "COMPLEANNO",
    "SEMINARIO",
    "MATRIMONIO",
    "FESTIVAL_CULTURALE",
    "LABORATORIO_BAMBINI",
    "ESCURSIONE",
    "FESTA_PRIVATA",
    "CAREER_FAIR",
    "CONFERENZA_TECNOLOGIA",
    "GALA",
    "CICLISMO",
    "CONFERENZA",
    "CORSO_CUCINA",
    "PELLEGRINAGGIO",
    "EVENTO_SOLIDARIETA",
    "ALTRO",
    "MERCATO_LOCALE"
  ];
  const validate = () => {
    const newErrors = {};

    if (!titolo) {
      newErrors.titolo = "Il titolo deve essere fornito";
    } else if (titolo.length < 5 || titolo.length > 255) {
      newErrors.titolo = "Il titolo deve avere almeno 5 caratteri e massimo 255";
    }

    if (!descrizione) {
      newErrors.descrizione = "La descrizione deve essere fornita";
    } else if (descrizione.length < 10 || descrizione.length > 255) {
      newErrors.descrizione = "La descrizione deve avere almeno 10 caratteri e massimo 255";
    }

    if (!data) {
      newErrors.data = "La data dell'evento è obbligatoria";
    }

    if (!luogo) {
      newErrors.luogo = "Il luogo deve essere fornito";
    } else if (luogo.length < 3 || luogo.length > 255) {
      newErrors.luogo = "Il luogo deve avere almeno 3 caratteri e massimo 255";
    }

    if (costo === "" || costo < 0) {
      newErrors.costo = "Il costo non può essere negativo";
    }

    if (postiMassimi === "" || postiMassimi < 1) {
      newErrors.postiMassimi = "L'evento deve avere almeno 1 posto";
    }

    if (!categoriaEvento) {
      newErrors.categoriaEvento = "La categoria dell'evento deve essere fornita";
    }

    setErrors(newErrors);

    // Ritorna true se non ci sono errori
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const nuovoEvento = {
      titolo,
      descrizione,
      data,
      luogo,
      costo: parseFloat(costo),
      postiMassimi: parseInt(postiMassimi),
      categoriaEvento,
    };

    try {
      const response = await fetch("http://localhost:3001/evento/crea", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(nuovoEvento),
      });

      if (!response.ok) {
        throw new Error("Errore nella creazione dell'evento");
      }

      navigate("/");
    } catch (error) {
      console.error("Errore:", error.message);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <Col md={8}>
          <Card className="shadow-lg">
            <Card.Header className="text-center bg-primary text-white">
              <h4>Crea un Nuovo Evento</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="titolo" className="mb-3">
                  <Form.Label>Titolo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Inserisci il titolo"
                    value={titolo}
                    onChange={(e) => setTitolo(e.target.value)}
                    isInvalid={!!errors.titolo}
                  />
                  <Form.Control.Feedback type="invalid">{errors.titolo}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="descrizione" className="mb-3">
                  <Form.Label>Descrizione</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Inserisci una descrizione"
                    value={descrizione}
                    onChange={(e) => setDescrizione(e.target.value)}
                    isInvalid={!!errors.descrizione}
                  />
                  <Form.Control.Feedback type="invalid">{errors.descrizione}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="data" className="mb-3">
                  <Form.Label>Data</Form.Label>
                  <Form.Control
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    isInvalid={!!errors.data}
                  />
                  <Form.Control.Feedback type="invalid">{errors.data}</Form.Control.Feedback>
                </Form.Group>


                <Form.Group controlId="isOnline" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="È online?"
                    checked={isOnline} // Stato per la checkbox
                    onChange={(e) => {
                      setIsOnline(e.target.checked);
                      if (e.target.checked) {
                        setLuogo("Online"); 
                      } else {
                        setLuogo(""); 
                      }
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="luogo" className="mb-3">
                  <Form.Label>Luogo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Inserisci il luogo"
                    value={luogo}
                    onChange={(e) => setLuogo(e.target.value)}
                    isInvalid={!!errors.luogo}
                    disabled={isOnline} // Disabilita il campo se l'evento è online
                  />
                  <Form.Control.Feedback type="invalid">{errors.luogo}</Form.Control.Feedback>
                </Form.Group>


                <Form.Group controlId="costo" className="mb-3">
                  <Form.Label>Costo (€)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Inserisci il costo"
                    value={costo}
                    onChange={(e) => setCosto(e.target.value)}
                    isInvalid={!!errors.costo}
                  />
                  <Form.Control.Feedback type="invalid">{errors.costo}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="postiMassimi" className="mb-3">
                  <Form.Label>Posti Massimi</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Inserisci il numero massimo di posti"
                    value={postiMassimi}
                    onChange={(e) => setPostiMassimi(e.target.value)}
                    isInvalid={!!errors.postiMassimi}
                  />
                  <Form.Control.Feedback type="invalid">{errors.postiMassimi}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="categoriaEvento" className="mb-3">
                  <Form.Label>Categoria Evento</Form.Label>
                  <Form.Control
                    as="select"
                    value={categoriaEvento}
                    onChange={(e) => setCategoriaEvento(e.target.value)}
                    isInvalid={!!errors.categoriaEvento}
                  >
                    <option value="">Seleziona una categoria</option>
                    {categorieDisponibili.map((categoria) => (
                      <option key={categoria} value={categoria}>
                        {categoria}
                      </option>))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">{errors.categoriaEvento}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="termsAccepted" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Accetto i termini di servizio"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                  />
                </Form.Group>

                <Button variant="success" type="submit" className="w-100 mt-3" disabled={!termsAccepted}>
                  Crea Evento
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FormCreazioneEvento;
