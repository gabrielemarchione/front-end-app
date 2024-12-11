import React, { useEffect, useState } from 'react';
import { Card, Button, Spinner, Container, Row, Col, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const VisualizzaPrenotazioni = () => {
  const [prenotazioni, setPrenotazioni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [prenotazioneToDelete, setPrenotazioneToDelete] = useState(null);
  const token = useSelector((state) => state.token.token);

  useEffect(() => {
    const fetchPrenotazioni = async () => {
      try {
        const response = await fetch('http://localhost:3001/prenotazioni/lemieprenotazioni', {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          });

        if (!response.ok) {
          throw new Error('Errore durante il recupero delle prenotazioni');
        }

        const data = await response.json();
        setPrenotazioni(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrenotazioni();
  }, [token]);

  const handleCloseConfirmDelete = () => {
    setShowConfirmDelete(false);
    setPrenotazioneToDelete(null);
  };

  const confirmDelete = (prenotazione) => {
    setPrenotazioneToDelete(prenotazione);
    setShowConfirmDelete(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!prenotazioneToDelete) return;

    try {
      const response = await fetch(`http://localhost:3001/prenotazioni/lemieprenotazioni/${prenotazioneToDelete.prenotazioneId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Errore durante la cancellazione della prenotazione');
      }

      setPrenotazioni((prevPrenotazioni) => prevPrenotazioni.filter(
        (prenotazione) => prenotazione.prenotazioneId !== prenotazioneToDelete.prenotazioneId
      ));
      alert('Prenotazione cancellata con successo');
    } catch (error) {
      alert('Errore: ' + error.message);
    } finally {
      handleCloseConfirmDelete();
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Caricamento...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <h3 className="text-danger mt-4">Errore: {error}</h3>
      </Container>
    );
  }
  if (prenotazioni.length === 0) {
    return (
      <Container className="text-center mt-4">
        <h3>Non hai prenotazioni effettuate!</h3>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Le mie prenotazioni</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {prenotazioni.map((prenotazione) => (
          <Col key={prenotazione.prenotazioneId}>
            <Card>
              <Card.Body>
                <Card.Title>{prenotazione.evento?.titolo || 'Titolo non disponibile'}</Card.Title>
                <Card.Text>
                  <strong>Data Evento:</strong> {prenotazione.evento?.data || 'Non disponibile'} <br />
                  <strong>Luogo:</strong> {prenotazione.evento?.luogo || 'Non disponibile'} <br />
                  <strong>Posti Prenotati:</strong> {prenotazione.postiPrenotati || 'Non disponibile'} <br />
                </Card.Text>
                <Button variant="danger" onClick={() => confirmDelete(prenotazione)}>
                  Cancella Prenotazione
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal per confermare la cancellazione */}
      <Modal show={showConfirmDelete} onHide={handleCloseConfirmDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma Cancellazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sei sicuro di voler cancellare la prenotazione relativa all'evento "{prenotazioneToDelete?.evento?.titolo}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmDelete}>
            Annulla
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirmed}>
            Cancella
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default VisualizzaPrenotazioni;
