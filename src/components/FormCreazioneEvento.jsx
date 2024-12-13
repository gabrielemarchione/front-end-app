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
  const [isGratis, setGratis] = useState(false);
  const [randomImage, setRandomImage] = useState(""); // Stato per l'immagine casuale

  const token = useSelector((state) => state.token.token);
  const ruoliUtente = useSelector((state) => state.token.ruoli);
  const navigate = useNavigate();

  if (!ruoliUtente.includes("ADMIN") && !ruoliUtente.includes("ORGANIZZATORE")) {
    return <p>Non sei autorizzato a creare un evento.</p>;
  }

  //enum per form evento
  const categorieDisponibili = [
    "Concerto",
    "Conferenza",
    "Corso",
    "EventoAziendale",
    "EventoBenefico",
    "EventoComunitario",
    "FestaCompleanno",
    "FestaPrivata",
    "FestivalCibo",
    "FestivalMusica",
    "Hackathon",
    "MostraArte",
    "MostraFotografia",
    "PresentazioneLibro",
    "SportBasket",
    "SportCalcio",
    "SportTennis",
    "Teatro",
    "Webinar",
    "Workshop"
  ];
  
  //validazione form
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
  const handleGratis = (e) => {
    setGratis(e.target.checked);
    if (e.target.checked) {
      setCosto(0); 
    }
  };
  //generazione img random in base all'enum 
  const fetchRandomImage = async () => {
    try {
      console.log("Categoria evento selezionata:", categoriaEvento); 
      console.log("Tentativo di fetch per l'immagine casuale...");
      const response = await fetch(`http://localhost:3001/api/random-event-image?categoriaEvento=${categoriaEvento}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      if (!response.ok) throw new Error(`Errore nel fetch: ${response.status}`);

      const imageUrl = await response.text();
      console.log("URL immagine ricevuto:", imageUrl);
      setRandomImage(imageUrl);
    } catch (error) {
      console.error("Errore durante il fetch dell'immagine:", error.message);
    }
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
      postiDisponibili: parseFloat(postiMassimi),
      categoriaEvento,
      immagine: randomImage || null, 
    };
    console.log("Payload inviato:", nuovoEvento); // Log per debug
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
                    checked={isOnline} 
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
                    disabled={isOnline} 
                  />
                  <Form.Control.Feedback type="invalid">{errors.luogo}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="isFree" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Gratis"
                    checked={isGratis}
                    onChange={handleGratis}
                  />
                </Form.Group>


                <Form.Group controlId="costo" className="mb-3">
                  <Form.Label>Costo (€)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Inserisci il costo"
                    value = { isGratis? 0: costo } 
                    onChange={(e) => setCosto(e.target.value)}
                    isInvalid={!!errors.costo}
                    disabled={isGratis} 
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
                <Form.Group controlId="randomImage" className="mb-3">
                  <Form.Label>Immagine Evento</Form.Label>
                  <div className="mb-3">
                    {randomImage ? (
                      <img src={randomImage} alt="Immagine Evento" className="img-fluid" />
                    ) : (
                      <p>Nessuna immagine selezionata</p>
                    )}
                  </div>
                  <Button variant="secondary" onClick={fetchRandomImage} className="mb-3">
                    Genera Immagine Casuale
                  </Button>
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
